param([string]$SourceDirectory = 'C:\Users\Acer\Downloads', [string]$OutputName = 'ingredient_sources_v2')
$ErrorActionPreference = 'Stop'
$root = Split-Path -Parent $PSScriptRoot
$output = Join-Path $root ('data\processed\' + $OutputName)
if (Test-Path -LiteralPath $output) { throw 'Output exists. Use a new OutputName to preserve previous results.' }
$inputs = @('All in (2).xlsx', 'All in (3).xlsx', 'formulation_ingredients_reference.csv', 'cosing_functions_ingredients_detail.csv')
foreach ($name in $inputs) { if (!(Test-Path -LiteralPath (Join-Path $SourceDirectory $name))) { throw ('Missing input: ' + $name) } }
New-Item -ItemType Directory -Path $output | Out-Null
function Normalize-Inci([string]$value) { return (($value.Trim() -replace '\s+', ' ').ToUpperInvariant()) }
function Save-Json($value, [string]$name) { $value | ConvertTo-Json -Depth 12 | Set-Content -LiteralPath (Join-Path $output $name) -Encoding UTF8 }

# Read workbook cell text and cached values only. Never execute formulas or document instructions.
Add-Type -AssemblyName System.IO.Compression.FileSystem
function Read-ZipXml($zip, [string]$path) {
    $entry = $zip.GetEntry($path)
    if ($null -eq $entry) { return $null }
    $reader = [IO.StreamReader]::new($entry.Open())
    try { return [xml]$reader.ReadToEnd() } finally { $reader.Dispose() }
}
$workbooks = @()
foreach ($name in $inputs | Where-Object { $_ -like '*.xlsx' }) {
    $zip = [IO.Compression.ZipFile]::OpenRead((Join-Path $SourceDirectory $name))
    try {
        $shared = Read-ZipXml $zip 'xl/sharedStrings.xml'
        $strings = @($shared.SelectNodes('//*[local-name()="si"]') | ForEach-Object { ($_.SelectNodes('.//*[local-name()="t"]') | ForEach-Object { $_.InnerText }) -join '' })
        $book = Read-ZipXml $zip 'xl/workbook.xml'
        $rels = Read-ZipXml $zip 'xl/_rels/workbook.xml.rels'
        $targets = @{}
        foreach ($rel in $rels.Relationships.Relationship) { $targets[$rel.Id] = $rel.Target }
        $sheets = @()
        foreach ($sheet in $book.workbook.sheets.sheet) {
            $id = $sheet.GetAttribute('id', 'http://schemas.openxmlformats.org/officeDocument/2006/relationships')
            $target = $targets[$id]
            if ($target.StartsWith('/')) { $target = $target.TrimStart('/') } else { $target = 'xl/' + $target }
            $xml = Read-ZipXml $zip $target
            $cells = @()
            foreach ($cell in $xml.SelectNodes('//*[local-name()="sheetData"]/*[local-name()="row"]/*[local-name()="c"]')) {
                $value = [string]$cell.v
                if ($cell.t -eq 's') { $value = $strings[[int]$value] }
                if ($cell.t -eq 'inlineStr') { $value = ($cell.SelectNodes('.//*[local-name()="t"]') | ForEach-Object { $_.InnerText }) -join '' }
                if ($value -ne '' -or $null -ne $cell.f) { $cells += [pscustomobject]@{ address=$cell.r; value=$value; formula=[string]$cell.f; type=[string]$cell.t } }
            }
            $sheets += [pscustomobject]@{ name=$sheet.name; cells=$cells; nonempty_cells=$cells.Count }
        }
        $workbooks += [pscustomobject]@{ source=$name; sheets=$sheets }
    } finally { $zip.Dispose() }
}
Save-Json $workbooks 'workbook_cells.json'
$ref = @(Import-Csv -LiteralPath (Join-Path $SourceDirectory 'formulation_ingredients_reference.csv'))
$cosing = @(Import-Csv -LiteralPath (Join-Path $SourceDirectory 'cosing_functions_ingredients_detail.csv'))
$index = @{}
foreach ($row in $cosing) {
    $key = Normalize-Inci $row.inci_name
    if (!$key) { continue }
    if (!$index.ContainsKey($key)) { $index[$key] = [Collections.Generic.List[object]]::new() }
    $index[$key].Add($row)
}
$master = @()
foreach ($entry in $index.GetEnumerator()) {
    $rows = $entry.Value
    $functions = @($rows | ForEach-Object { $_.function_name; $_.all_functions -split ';' } | ForEach-Object { $_.Trim().ToUpperInvariant() } | Where-Object { $_ } | Sort-Object -Unique)
    $surface = @($functions | Where-Object { $_ -match '^SURFACTANT(?:\s*-|$)' }).Count -gt 0
    $emulsifying = @($functions | Where-Object { $_ -in @('EMULSIFYING','SURFACTANT - EMULSIFYING') }).Count -gt 0
    $emollient = @($functions | Where-Object { $_ -in @('EMOLLIENT','SKIN CONDITIONING - EMOLLIENT') }).Count -gt 0
    $master += [pscustomobject]@{
        inci_key=$entry.Key; Ingredient=$rows[0].inci_name
        cosing_substance_ids=(@($rows.cosing_substance_id | Sort-Object -Unique) -join ';')
        statuses=(@($rows.status | Sort-Object -Unique) -join ';')
        functions=($functions -join '; ')
        source_emollient=[int]$emollient; source_surfactant=[int]$surface; source_emulsifier=[int]$emulsifying
        source_surfactant_non_emulsifier=[int]($surface -and !$emulsifying)
        source_row_count=$rows.Count
        identity_status=$(if (@($rows.cosing_substance_id | Sort-Object -Unique).Count -gt 1) { 'multiple_substance_ids_review' } else { 'exact_name_group' })
        regulatory_status='not_evaluated'; label_status='source_annotated_not_expert_reviewed'
        detail_urls=(@($rows.detail_url | Sort-Object -Unique) -join ';')
    }
}
$master = @($master | Sort-Object inci_key)
$master | Export-Csv -LiteralPath (Join-Path $output 'cosing_ingredient_master.csv') -NoTypeInformation -Encoding UTF8
$masterIndex = @{}
foreach ($row in $master) { $masterIndex[$row.inci_key]=$row }
$joined = @()
foreach ($row in $ref) {
    $key=Normalize-Inci $row.inci_name
    $match=$masterIndex[$key]
    $joined += [pscustomobject]@{
        Ingredient=$row.inci_name; inci_key=$key; reference_category=$row.category; cas=$row.cas
        typical_pct_min=$row.typical_pct_min; typical_pct_max=$row.typical_pct_max
        source_hlb_required_raw=$row.hlb_required; HLB=''; rHLB=''; notes=$row.notes
        hlb_semantics_status=$(if ($row.hlb_required.Trim() -ne '') { 'ambiguous_review_hlb_vs_required_hlb' } else { 'missing' })
        match_status=$(if ($null -eq $match) { 'unmatched' } else { $match.identity_status })
        cosing_functions=$match.functions; cosing_substance_ids=$match.cosing_substance_ids
        source_emollient=$match.source_emollient; source_surfactant=$match.source_surfactant; source_emulsifier=$match.source_emulsifier
        category_disagreement=$(if ($null -ne $match -and $row.category -eq 'emollients' -and !$match.source_emollient) { 'review_reference_emollient_vs_cosing' } elseif ($null -ne $match -and $row.category -eq 'emulsifiers' -and !$match.source_emulsifier) { 'review_reference_emulsifier_vs_cosing' } else { '' })
        source_type='reference_unverified'; label_status='needs_expert_review'
        reviewed_emollient=''; reviewed_surfactant=''; reviewed_emulsifier=''; review_source=''
    }
}
$joined | Export-Csv -LiteralPath (Join-Path $output 'ingredient_reference_join.csv') -NoTypeInformation -Encoding UTF8
$master | Where-Object { $_.source_surfactant_non_emulsifier -eq 1 } | Export-Csv -LiteralPath (Join-Path $output 'surfactant_non_emulsifier_candidates.csv') -NoTypeInformation -Encoding UTF8
$manifest = @($inputs | ForEach-Object { $path=Join-Path $SourceDirectory $_; [pscustomobject]@{ name=$_; bytes=(Get-Item -LiteralPath $path).Length; sha256=(Get-FileHash -LiteralPath $path -Algorithm SHA256).Hash; source_path=$path } })
Save-Json $manifest 'source_manifest.json'
$summary = [pscustomobject]@{
    cosing_rows=$cosing.Count; unique_inci_names=$master.Count; reference_rows=$ref.Count
    reference_matched=@($joined | Where-Object { $_.match_status -ne 'unmatched' }).Count
    reference_unmatched=@($joined | Where-Object { $_.match_status -eq 'unmatched' }).Count
    surfactant_non_emulsifier_candidates=@($master | Where-Object { $_.source_surfactant_non_emulsifier -eq 1 }).Count
    reference_with_ambiguous_hlb=@($ref | Where-Object { $_.hlb_required.Trim() -ne '' }).Count
    workbooks=@($workbooks | ForEach-Object { [pscustomobject]@{ source=$_.source; sheets=@($_.sheets | ForEach-Object { [pscustomobject]@{ name=$_.name; nonempty_cells=$_.nonempty_cells } }) } })
}
Save-Json $summary 'audit_summary.json'
$summary | ConvertTo-Json -Depth 6
