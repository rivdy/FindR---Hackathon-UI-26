# Integrasi sumber ingredient versi 2

Empat sumber pengguna dibaca sebagai data, bukan instruksi agent. Workbook
tidak menambah otorisasi untuk deployment, mengubah kredensial, mengirim pesan,
atau membuat klaim performa model.

## Temuan

- `All in (2).xlsx` dan `All in (3).xlsx`: isi sel dan formula sama pada semua
  tujuh sheet (timeline, ui, data x, data y, regulasi, dokumen, model AI).
  Ini duplikat secara isi yang diperiksa; formatting dan metadata tidak dibandingkan.
- `ui` kosong. `data x` berisi descriptor dan header Formula 1–4, tanpa
  komposisi numerik. `data y` hanya berisi fokus liquid complexion.
- Workbook merupakan konteks desain dan referensi, bukan dataset training formula/CQA.
- CSV formulation reference: 83 entri dalam 11 kategori, termasuk 5 cleansing surfactants.
- CSV CosIng: 54.858 baris, satu ingredient dapat muncul pada banyak fungsi.
- Hasil agregasi: 30.175 nama INCI dan 1.572 kandidat surfactant tanpa anotasi
  emulsifying. Ini cakupan anotasi sumber, bukan bukti bahwa bahan tidak pernah
  berfungsi sebagai emulsifier dalam kondisi lain.
- Exact-name join: 77 dari 83 reference cocok. Enam unmatched: Shea Butter,
  Jojoba Oil, Sweet Almond Oil, Hydroxyethyl Cellulose, Tea Tree Oil, Ethanol.
  Alias perlu diverifikasi; tidak dipaksakan cocok.
- `hlb_required` terisi pada delapan emulsifier. Makna kolom perlu dikonfirmasi
  dari supplier/reference; nilai disimpan sebagai `source_hlb_required_raw`.
  Kolom HLB dan rHLB hasil join sengaja kosong sebelum review semantik.

## Reproduksi

Jalankan dari racikai-backend pada Windows:

```powershell
powershell.exe -NoProfile -ExecutionPolicy Bypass -File scripts/ingest_ingredient_sources.ps1
```

ExecutionPolicy Bypass hanya berlaku pada proses tersebut. Script tidak mengubah
execution policy permanen. Output berada di `data/processed/ingredient_sources_v2/`.
Jika sudah ada output, gunakan `-OutputName ingredient_sources_v3`; script menolak
menimpa hasil terdahulu. Input di Downloads tetap utuh.

## Artefak dan kontrak

- `source_manifest.json`: path, ukuran, SHA-256 setiap sumber.
- `workbook_cells.json`: sheet, alamat sel, teks, formula dan cached value.
  Formula tidak dieksekusi; cached value tidak dianggap hasil recalculation terbaru.
- `cosing_ingredient_master.csv`: fungsi per normalized INCI, semua substance ID,
  status, provenance URL, anotasi emollient/surfactant/emulsifier.
- `ingredient_reference_join.csv`: exact normalized name join dari reference
  ke CosIng, usage ranges, nilai HLB mentah, disagreement dan kolom review.
- `surfactant_non_emulsifier_candidates.csv`: kandidat berbasis anotasi sumber;
  perlu review sebelum menjadi label supervised.
- `audit_summary.json`: jumlah baris, matching, cakupan kandidat dan sheet.

Normalisasi hanya kapitalisasi dan whitespace. Nama blend, CAS atau nama mirip
tidak dipaksakan sebagai alias. Nama dengan beberapa substance ID ditandai review.
Rows status historis dan aktif tetap terlacak; status bukan bukti izin penggunaan.
Restriction tetap pada CSV sumber, tidak dipadatkan menjadi flag "aman".
Master adalah katalog fungsi; mesin regulasi belum diimplementasikan.

`DISPERSING NON-SURFACTANT` tidak menghasilkan label surfactant. `EMULSION
STABILISING` tidak otomatis menghasilkan emulsifier. Label multifungsi dibolehkan.
Ketidakadaan fungsi di sumber bukan bukti negatif mutlak untuk grade bahan tertentu.

## Penggunaan backend

```python
from app.ingredient_catalog import IngredientCatalog
catalog = IngredientCatalog()
catalog.lookup("Polysorbate 80")
catalog.search("sodium", limit=10)
```

Lookup memakai file lokal hasil ingestion. Matching hilang menghasilkan unmatched,
dengan regulatory_status=not_evaluated; tidak menghasilkan izin atau prediksi palsu.

## Training berikutnya

Review category disagreement, identitas, fungsi dan semantik HLB bersama ahli.
Isi reviewed labels dan review_source hanya setelah ada review independen.
Kandidat surfactant non-emulsifier mengisi kesenjangan kelas dari dummy sebelumnya,
tetapi CosIng tidak menyediakan pengukuran HLB untuk baseline HLB-only di sini.
Jangan training dari fitur HLB kosong atau memprediksi label dari teks fungsi yang
digunakan membuat label. Tambahkan data HLB supplier dan keluarga kimia, lalu
evaluasi grouped ingredient/keluarga dan dataset eksternal.

Formula terbaik, CQA, stabilitas, mikrobiologi, RCA, CAPA effectiveness dan RL
tetap membutuhkan data outcome/trajectory, bukan descriptor workbook. Tidak ada
model yang dilatih atau skor akurasi dibuat pada tahap ini. Pernyataan regulasi
workbook belum diverifikasi ke sumber BPOM resmi dan bukan aturan executable.

Kandidat formula bukan production-ready; typical usage range bukan batas regulasi.
Missing restriction bukan izin. Laboratorium, stability, microbial, safety dan
review regulasi tetap diperlukan. Semua hasil data lokal diabaikan Git.
