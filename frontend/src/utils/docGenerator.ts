import { CppActualStep, CppFinalObservation } from '../types';
import { 
  MOCK_CPP_TARGET_STEPS, 
  MOCK_CPP_ACTUAL_STEPS, 
  MOCK_CPP_FINAL_OBSERVATIONS,
  MOCK_CPP_DEVIATION_ACTUAL_STEPS,
  MOCK_CPP_DEVIATION_FINAL_OBSERVATIONS,
  BLANK_CPP_ACTUAL_STEPS,
  BLANK_CPP_FINAL_OBSERVATIONS
} from '../data/mockData';

export function exportCppDocs(
  batchMode: 'blank' | 'optimized' | 'deviation' | boolean = 'blank',
  customActualSteps?: CppActualStep[],
  customFinalObs?: CppFinalObservation[]
) {
  const dateStr = new Date().toLocaleDateString('id-ID', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  const isDev = batchMode === 'deviation' || batchMode === true;
  const isBlank = batchMode === 'blank';
  const batchNo = isDev ? 'LOT-MOIST-26-04A' : 'LOT-MOIST-26-04B';
  const batchLabel = isBlank 
    ? 'Lembar Kerja Protokol Batch (Blank SOP - Menunggu Pelaksanaan Trial)' 
    : isDev ? 'Trial Batch Deviasi Pilot Plant' : 'Trial Batch Faktual Teroptimasi';

  const docTitle = isBlank 
    ? 'PROTOKOL PENGOLAHAN BATCH (BMR): TARGET PROSES & LEMBAR KERJA TRIAL' 
    : 'LAPORAN PARAMETER PROSES KRITIS (CPP): TARGET PROSES VS AKTUAL TRIAL BATCH';

  // Determine datasets
  const actualSource = customActualSteps 
    ? customActualSteps 
    : isBlank 
      ? BLANK_CPP_ACTUAL_STEPS 
      : isDev ? MOCK_CPP_DEVIATION_ACTUAL_STEPS : MOCK_CPP_ACTUAL_STEPS;

  const obsSource = customFinalObs
    ? customFinalObs
    : isBlank
      ? BLANK_CPP_FINAL_OBSERVATIONS
      : isDev ? MOCK_CPP_DEVIATION_FINAL_OBSERVATIONS : MOCK_CPP_FINAL_OBSERVATIONS;

  // Build Table C Rows
  const tableCRows = MOCK_CPP_TARGET_STEPS.map(t => `
    <tr>
      <td style="text-align: center; font-weight: bold;">${t.no}</td>
      <td style="font-weight: bold;">${t.stage_name}</td>
      <td style="text-align: center; color: #0284c7; font-weight: bold;">${t.phase}</td>
      <td>${t.temp_target}</td>
      <td>${t.time_target}</td>
      <td style="color: #059669; font-weight: bold;">${t.speed_target}</td>
      <td>${t.output_target}</td>
    </tr>
  `).join('');

  // Build Table D Rows
  const tableDRows = actualSource.map(a => `
    <tr>
      <td style="text-align: center; font-weight: bold;">${a.no}</td>
      <td style="font-weight: bold;">${a.stage_name}</td>
      <td style="text-align: center; color: #0284c7; font-weight: bold;">${a.phase}</td>
      <td style="${a.temp_actual.includes('82°C') ? 'color: #e11d48; font-weight: bold;' : ''}">${a.temp_actual || (isBlank ? '[ ........ °C ]' : '-')}</td>
      <td>${a.time_actual || (isBlank ? '[ ........ mnt ]' : '-')}</td>
      <td style="${a.speed_actual.includes('3200') ? 'color: #d97706; font-weight: bold;' : 'color: #059669; font-weight: bold;'}">${a.speed_actual || (isBlank ? '[ ........ rpm ]' : '-')}</td>
      <td>${a.observation_actual || (isBlank ? '[ ............................................................................ ]' : '-')}</td>
    </tr>
  `).join('');

  // Build Table E Rows
  const tableERows = obsSource.map(o => `
    <tr>
      <td style="font-weight: bold;">${o.parameter}</td>
      <td style="color: #0284c7; font-family: monospace;">${o.target}</td>
      <td style="font-weight: bold;">${o.result_t0 || (isBlank ? '[ ........ ]' : '-')}</td>
      <td style="font-weight: bold; ${o.status === 'OK' ? 'color: #059669;' : 'color: #d97706;'}">${o.result_t24 || (isBlank ? '[ ........ ]' : '-')}</td>
      <td style="text-align: center; font-weight: bold; ${o.status === 'OK' ? 'color: #059669;' : isBlank ? 'color: #64748b;' : 'color: #d97706;'}">
        ${isBlank ? 'MENUNGGU UJI' : o.status}
      </td>
      <td>${o.evaluation_note || (isBlank ? '[ ............................................................................ ]' : '-')}</td>
    </tr>
  `).join('');

  // Evaluation Note Box
  let evaluationHtml = '';
  if (isBlank) {
    evaluationHtml = `
      <div class="box-info">
        <h4 style="margin: 0 0 6px 0; color: #0f172a;">Petunjuk Pengisian Lembar Eksekusi Batch Laboratorium & Pilot Plant:</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 9.5pt; color: #334155;">
          <li>Lembar ini adalah dokumen Batch Manufacturing Record (BMR) resmi yang dikeluarkan sebelum proses penimbangan.</li>
          <li>Operator wajib mencatat suhu aktual, waktu, kecepatan pengadukan, dan observasi visual secara real-time pada setiap tahap di Bagian D.</li>
          <li>Analis QC wajib menguji dan mencatat nilai pH serta viskositas sediaan pada jam ke-0 (T0) dan setelah stabilisasi 24 jam (T24) di Bagian E.</li>
          <li>Setiap deviasi di luar batas target wajib segera dilaporkan untuk investigasi CAPA formulator.</li>
        </ol>
      </div>
    `;
  } else if (isDev) {
    evaluationHtml = `
      <div class="box-danger">
        <h4 style="margin: 0 0 6px 0; color: #991b1b;">Catatan Investigasi Deviasi & Rekomendasi Tindakan Korektif (CAPA):</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 9.5pt; color: #7f1d1d;">
          <li>Suhu pemanasan fase A overshoot (82°C vs target 70-75°C) & penambahan fase B terlalu cepat memicu bulk emulsi tampak agak kasar.</li>
          <li>Kecepatan homogenisasi 3200 rpm tanpa deaerasi vakum menyebabkan microbubble udara terjebak dan viskositas awal rendah (16.500 cPs).</li>
          <li>Rekomendasi CAPA: Pasang thermokopel digital dengan auto-cutoff pada 74°C dan wajibkan deaerasi vacuum -0.85 bar selama minimal 15 menit.</li>
          <li>Formulir CAPA diajukan ke Quality Assurance Manager untuk re-validasi batch pilot berikutnya.</li>
        </ol>
      </div>
    `;
  } else {
    evaluationHtml = `
      <div class="box-success">
        <h4 style="margin: 0 0 6px 0; color: #166534;">Kesimpulan Validasi Parameter Proses Kritis (CPP) & Kesesuaian Mutu CQA:</h4>
        <ol style="margin: 0; padding-left: 20px; font-size: 9.5pt; color: #14532d;">
          <li>Suhu pemanasan fase A (73°C) dan fase B (74°C) terkontrol ketat dalam rentang target 70-75°C, menjaga stabilitas polimer Carbopol & wax.</li>
          <li>Homogenisasi Rotor-Stator 2810 rpm (Median 3x replikasi) menghasilkan droplet emulsi sangat halus seragam d(0.9) = 2.1 µm.</li>
          <li>Nilai pH terverifikasi stabil pada 5.74 (T0) dan 5.75 (24 jam) memenuhi rentang fisiologis kulit 5.50 - 6.00.</li>
          <li>Viskositas 21.500 cPs (T0) dan 21.800 cPs (24 jam) memenuhi target spesifikasi sediaan pelembab 18.000 - 24.000 cPs.</li>
          <li>Deaerasi vacuum -0.85 bar tuntas mengeliminasi microbubble udara; bulk homogen berkilau (glossy) dan siap rilis batch pilot.</li>
        </ol>
      </div>
    `;
  }

  // Full Word / Google Docs HTML Template
  const fileContent = `
    <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
    <head>
      <meta charset='utf-8'>
      <title>${docTitle}</title>
      <style>
        body {
          font-family: 'Calibri', 'Arial', sans-serif;
          font-size: 10pt;
          line-height: 1.4;
          color: #1e293b;
          margin: 24px;
        }
        .header-table {
          width: 100%;
          background-color: #0b1628;
          color: #ffffff;
          padding: 14px 18px;
          border-radius: 6px;
          margin-bottom: 16px;
        }
        .header-title {
          font-size: 16pt;
          font-weight: bold;
          color: #10b981;
          margin: 0;
        }
        .header-subtitle {
          font-size: 9pt;
          color: #94a3b8;
          margin: 2px 0 0 0;
        }
        .meta-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 16px;
          font-size: 9.5pt;
        }
        .meta-table td {
          padding: 4px 8px;
          border: 1px solid #e2e8f0;
        }
        .section-banner {
          background-color: #6d28d9;
          color: #ffffff;
          padding: 8px 12px;
          font-weight: bold;
          font-size: 11pt;
          border-radius: 4px;
          margin-top: 18px;
          margin-bottom: 6px;
        }
        table.data-table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 14px;
          font-size: 9pt;
        }
        table.data-table th {
          background-color: #7c3aed;
          color: #ffffff;
          padding: 8px 10px;
          text-align: left;
          font-weight: bold;
          border: 1px solid #6d28d9;
        }
        table.data-table td {
          padding: 6px 10px;
          border: 1px solid #cbd5e1;
          vertical-align: top;
        }
        table.data-table tr:nth-child(even) {
          background-color: #f0fdfa;
        }
        .box-info {
          background-color: #f8fafc;
          border: 1px solid #cbd5e1;
          padding: 12px 16px;
          border-radius: 6px;
          margin-top: 14px;
        }
        .box-success {
          background-color: #f0fdf4;
          border: 1px solid #86efac;
          padding: 12px 16px;
          border-radius: 6px;
          margin-top: 14px;
        }
        .box-danger {
          background-color: #fef2f2;
          border: 1px solid #fca5a5;
          padding: 12px 16px;
          border-radius: 6px;
          margin-top: 14px;
        }
        .signature-table {
          width: 100%;
          margin-top: 36px;
          border-collapse: collapse;
        }
        .signature-table td {
          text-align: center;
          width: 33.33%;
          font-size: 9pt;
          padding: 6px;
          border: none;
        }
        .signature-line {
          border-bottom: 1px solid #334155;
          width: 75%;
          margin: 48px auto 6px auto;
        }
      </style>
    </head>
    <body>
      <!-- Header Banner -->
      <table class="header-table">
        <tr>
          <td>
            <div class="header-title">rangkAI - Cosmetics AI Formulation Studio</div>
            <div class="header-subtitle">Standar Dokumen: CPKB BPOM / ISO 22716 Cosmetics Good Manufacturing Practice</div>
          </td>
          <td style="text-align: right; font-size: 8.5pt; color: #cbd5e1;">
            <div>Dokumen: CPP-TR-${batchNo}${isBlank ? '-BLANK' : ''}</div>
            <div>Tanggal Cetak: ${dateStr}</div>
          </td>
        </tr>
      </table>

      <!-- Document Title & Meta -->
      <h2 style="font-size: 13pt; color: #0f172a; margin: 12px 0 6px 0; text-align: center;">
        ${docTitle}
      </h2>

      <table class="meta-table">
        <tr>
          <td style="background-color: #f8fafc; width: 18%; font-weight: bold;">Nomor Batch</td>
          <td style="width: 32%;">${batchNo}</td>
          <td style="background-color: #f8fafc; width: 18%; font-weight: bold;">Status Lembar</td>
          <td style="width: 32%; font-weight: bold; ${isDev ? 'color: #e11d48;' : isBlank ? 'color: #0284c7;' : 'color: #059669;'}">${batchLabel}</td>
        </tr>
        <tr>
          <td style="background-color: #f8fafc; font-weight: bold;">Nama Sediaan</td>
          <td>Hydra-Dew Barrier Gel-Cream (OPT-MOIST-A1)</td>
          <td style="background-color: #f8fafc; font-weight: bold;">Skala Batch</td>
          <td>1000,0 gram (1,0 kg Pilot Compounding)</td>
        </tr>
      </table>

      <!-- Section C -->
      <div class="section-banner">C. Target Parameter Proses (Standar Formulasi R&D Pilot Compounding)</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 35px; text-align: center;">No</th>
            <th style="width: 180px;">Tahap Target</th>
            <th style="width: 55px; text-align: center;">Fase</th>
            <th style="width: 95px;">Suhu Target</th>
            <th style="width: 90px;">Waktu Target</th>
            <th style="width: 110px;">Speed Target</th>
            <th>Output/Observasi Target</th>
          </tr>
        </thead>
        <tbody>
          ${tableCRows}
        </tbody>
      </table>

      <!-- Section D -->
      <div class="section-banner">D. Data Aktual Trial Batch (${isBlank ? 'Lembar Catatan Pengolahan Riil Operator' : `Batch: ${batchNo}`})</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 35px; text-align: center;">No</th>
            <th style="width: 180px;">Tahap Aktual</th>
            <th style="width: 55px; text-align: center;">Fase</th>
            <th style="width: 95px;">Suhu Aktual</th>
            <th style="width: 90px;">Waktu Aktual</th>
            <th style="width: 110px;">Speed Aktual</th>
            <th>Observasi Aktual (Catatan Nyata)</th>
          </tr>
        </thead>
        <tbody>
          ${tableDRows}
        </tbody>
      </table>

      <!-- Section E -->
      <div class="section-banner">E. Data Pengamatan Akhir (Target vs Hasil T0 vs Hasil 24 Jam)</div>
      <table class="data-table">
        <thead>
          <tr>
            <th style="width: 150px;">Parameter</th>
            <th style="width: 160px;">Target</th>
            <th style="width: 90px;">Hasil T0</th>
            <th style="width: 90px;">Hasil 24 Jam</th>
            <th style="width: 100px; text-align: center;">Status Mutu</th>
            <th>Catatan Evaluasi Tim Lab</th>
          </tr>
        </thead>
        <tbody>
          ${tableERows}
        </tbody>
      </table>

      <!-- Notes / Evaluation -->
      ${evaluationHtml}

      <!-- Signatures -->
      <table class="signature-table">
        <tr>
          <td>
            <div style="color: #64748b;">Operator Compounding</div>
            <div class="signature-line"></div>
            <div style="font-weight: bold;">( Operator Pilot Compounding )</div>
            <div style="font-size: 8pt; color: #94a3b8;">Tgl: .......................................</div>
          </td>
          <td>
            <div style="color: #64748b;">Lead Process Engineer</div>
            <div class="signature-line"></div>
            <div style="font-weight: bold;">( Lead Process Engineer )</div>
            <div style="font-size: 8pt; color: #94a3b8;">Tgl: .......................................</div>
          </td>
          <td>
            <div style="color: #64748b;">Production Manager</div>
            <div class="signature-line"></div>
            <div style="font-weight: bold;">( Production / QA Manager )</div>
            <div style="font-size: 8pt; color: #94a3b8;">Tgl: .......................................</div>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  // Create downloadable blob with MS Word / Google Docs MIME type
  const blob = new Blob(['\ufeff', fileContent], {
    type: 'application/msword;charset=utf-8'
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `Laporan_CPP_${batchNo}_${isBlank ? 'BLANK_SOP' : 'TRIAL'}_rangkAI.doc`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
