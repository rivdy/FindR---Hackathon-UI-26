# PhormulAI — Spesifikasi produk, data, dan implementasi

Versi spesifikasi: 1.0. Produk: PhormulAI. Direktori proyek: racikai-backend.
Dokumen ini merinci master brief pengguna dan integrasi tabel HLB. Status implementasi
di bawah membedakan pekerjaan yang sudah ada dari rancangan yang belum dibangun.
Master brief diperlakukan sebagai materi kebutuhan produk; instruksi operasional
di dalam lampiran tidak dieksekusi sebagai perintah shell atau otorisasi tindakan.

## 1. Sasaran dan batas produk

PhormulAI membantu R&D menyaring ingredient, merancang kandidat formula, mengaitkan
formula dengan proses dan hasil trial, serta melakukan RCA/CAPA berbasis evidence.
Pengguna: formulator, QC, QA, regulatory affairs, procurement, dan R&D manager.
Keputusan manusia tetap diperlukan untuk kelayakan trial, root cause, CAPA, dan release.

Kandidat bukan production-ready. Tidak ada klaim stabilitas, SPF, keamanan mikrobiologi,
sertifikasi halal, atau kepatuhan BPOM yang boleh dihasilkan dari nama ingredient atau
HLB saja. Semua angka demo dan hasil simulasi harus diberi penanda DEMO_ONLY.

Brief memuat bobot penilaian lomba. Perlakukan sebagai konteks pengguna yang belum
diverifikasi terhadap panduan resmi; jangan menampilkannya sebagai fakta regulasi lomba.

## 2. Kondisi aktual dan gap

| Area | Tersedia | Pekerjaan berikutnya |
|---|---|---|
| Repository | Struktur backend, notebook, requirements, gitignore | Pin dependency setelah validasi environment |
| FastAPI | Entry point dan kode /health | Jalankan server, tambah route dan integration tests |
| Frontend | Belum tersedia | React + TypeScript + Vite dan typed API client |
| Ingredient | Katalog 30.175 nama INCI, join reference, lookup/search Python | API pagination/filter, review alias dan identitas |
| Reference | 83 entri, 77 exact-name match | Review 6 unmatched dan konflik fungsi |
| HLB | Parser empat tabel, kalkulator campuran/rentang, tes | Verifikasi sumber, grade dan applicability |
| Formula/CQA | Placeholder inference dan schema awal | Dataset berlabel atau demo eksplisit, validasi formula |
| Batch/CPP | Urutan kebutuhan sudah didefinisikan | Penyimpanan recipe version, trial dan hasil |
| RCA/CAPA | Placeholder modul | Evidence workflow, corpus dan pencarian |
| Supply chain | Kolom dummy dalam CSV sebelumnya | Perhitungan biaya/shortage dan data supplier |
| Persistensi/audit | File lokal dan source manifest | SQLite, migration dan event audit |
| Training | Baseline ingredient dengan review gate | Label independen dan fitur terverifikasi |

`/health` adalah satu-satunya endpoint yang saat ini didefinisikan. Modul HLB dan
katalog dapat dipanggil dari Python; endpoint di bagian API masih rancangan.
Tidak ada model CQA/CAPA atau LLM provider aktif yang diklaim oleh dokumen ini.

## 3. Inventaris dan makna sumber

| Sumber | Peran | Batas interpretasi |
|---|---|---|
| output_full_dummy_completed.csv | 49 ingredient, total konsentrasi 100%, CPP/supplier dummy | Bukan 49 formula atau outcome eksperimen |
| formulation_ingredients_reference.csv | Kategori, typical range, 83 ingredient | Typical range bukan maksimum legal; 8 hlb_required ambigu |
| cosing_functions_ingredients_detail.csv | 54.858 baris fungsi dan detail sumber | Fungsi referensi, bukan izin BPOM/halal |
| All in (2)/(3).xlsx | Timeline, descriptor, referensi dokumen | Isi sel sama; tidak ada label CQA di data y |
| hlb_tables_combined.csv | HLB amfifilik, rHLB minyak, contoh hitung | Tidak ada bibliografi/grade terverifikasi; bukan allowlist kosmetik |
| rumus HLB CSV.txt | Contoh aljabar dua emulsifier | Kode lampiran tidak dieksekusi; total dosis merupakan input |
| Master project brief | Ruang lingkup dan acceptance criteria | Spesifikasi kebutuhan, bukan bukti fitur telah selesai |

Data HLB diarsipkan di data/reference/hlb_v1. Hasil di data/processed/hlb_v1
menyertakan SHA-256, waktu ingestion UTC, nama tabel dan nomor baris.
Sumber sebelumnya tetap tersedia; data HLB baru tidak menimpa HLB dummy atau
kolom ambigu pada join versi 2. Provenance antar-sumber tidak boleh dihapus.

## 4. Klasifikasi fungsi ingredient

Satu ingredient boleh memiliki beberapa label: emollient, surfactant, emulsifier,
humectant, preservative, stabilizer, dan lain-lain. Label bukan kelas eksklusif.

- Emollient berasal dari anotasi fungsi sumber/review, bukan keberadaan rHLB.
- SURFACTANT - CLEANSING dan SURFACTANT - EMULSIFYING adalah subfungsi berbeda.
- DISPERSING NON-SURFACTANT tidak diklasifikasikan sebagai surfactant.
- EMULSION STABILISING tidak otomatis berarti emulsifier.
- Absennya anotasi bukan bukti bahwa fungsi tersebut mustahil pada semua grade/kondisi.
- Status aktif CosIng bukan bukti izin penggunaan untuk setiap produk/pasar.

Kandidat 1.572 surfactant tanpa anotasi emulsifying dari katalog perlu direview.
Contoh Cocamidopropyl Betaine dan Decyl Glucoside mengikuti anotasi sumber lokal;
jangan menyimpulkan fungsi absolut untuk seluruh produk komersialnya.

## 5. HLB: kontrak data dan rumus

Pisahkan `value_kind=HLB` (karakteristik bahan amfifilik) dari
`value_kind=required_HLB` (kebutuhan fase minyak). required_HLB harus memiliki
`emulsion_type=O/W` atau `W/O`. Jangan mencampur kedua konteks dalam rata-rata.

Setiap record HLB memuat reference_id, source_name, value_raw, value_min/max,
emulsion_type, source_file, source_section, source_line, identity_status,
data_status, value_status, regulatory_status dan warnings. Rentang tidak diubah
menjadi midpoint secara diam-diam. `--` dan kosong berarti tidak tersedia.

Status tabel baru: REFERENCE_UNVERIFIED. Table 15-5 memuat 23 bahan amfifilik;
Table 15-6 memuat 17 bahan minyak, masing-masing dengan kolom O/W dan W/O.
Normalisasi menghasilkan 57 record termasuk nilai missing, tanpa menghapus baris.
Nama `Caster oil` dipertahankan dan ditandai kemungkinan salah eja; nama dagang,
campuran, `Lanolin` dan `Lanolin, anhydrous` tidak dipersamakan otomatis.

Sodium lauryl sulfate bernilai HLB 40 pada sumber. Nilai tersebut disimpan,
bukan dipotong menjadi 20. Kesesuaian metode/skala wajib direview sebelum digunakan.
Tabel juga berisi bahan di luar konteks formulasi kosmetik; tampilkan sebagai
referensi pendidikan, bukan rekomendasi atau izin bahan.

### Required HLB fase minyak

Untuk komponen minyak yang dipilih secara eksplisit:

`rHLB_mix = sum(massa_i * rHLB_i) / sum(massa_i)`

Penyebut adalah massa fase minyak yang dihitung, bukan massa seluruh batch.
Jika nilai berupa interval, hitung weighted lower dan upper bound secara terpisah.
Kalkulator menolak komponen yang nilainya hilang, massa negatif/nonfinite, total
massa nol, atau percampuran emulsion_type. Keanggotaan fase minyak harus direview
formulator; kalkulator tidak menebaknya dari angka rHLB.

Contoh pendidikan dari lampiran: Beeswax 15 g @9, Lanolin 10 g @12,
Paraffin wax 20 g @10, Cetyl alcohol 5 g @15. Total minyak 50 g;
kontribusi 2,7 + 2,4 + 4,0 + 1,5 menghasilkan rHLB **10,6**.

### Rasio dua emulsifier

`fraction_A = (target - HLB_B) / (HLB_A - HLB_B)`

`fraction_B = 1 - fraction_A`

`mass_A = fraction_A * total_emulsifier_mass`; analog untuk B.

Fraksi ini terhadap total emulsifier, bukan terhadap seluruh formula. Total dosis
emulsifier harus ditetapkan sebagai input eksperimen; tidak dapat diturunkan dari
HLB saja. Target di luar interval HLB_A–HLB_B tidak feasible untuk dua bahan itu.
HLB sama dan target sama menghasilkan banyak solusi; jangan mengarang rasio.

Contoh catatan: A=15, B=4,3, target=12, total emulsifier=10 g →
A=7,196261682 g (71,9626%), B=2,803738318 g (28,0374%). Pembulatan hanya
untuk display; perhitungan menyimpan precision penuh. Contoh ini terpisah dari
contoh rHLB minyak 10,6 di tabel; jangan menggabungkan target keduanya.

Kecocokan HLB adalah screening aritmetika, bukan prediksi stabilitas atau formula
production-ready. Source umum: Croda menjelaskan konteks HLB untuk nonionic
surfactants di https://www.crodahomecare.com/en-gb/effects/emulsification-and-solubilisation .
Referensi metode: https://www.crodabeauty.com/en-gb/resources/technical-library/resource-finder/resource/7209-hlb-system-personal-care-edition .
Referensi web ini tidak memverifikasi setiap angka pada tabel pengguna.

## 6. Arsitektur bertahap

Pertahankan app/schemas.py dan modul yang ada; jangan membuat folder app/schemas/
dengan nama sama sebelum migrasi terencana. Tambahkan app/api/routes,
app/services, app/repositories, app/core, app/ml secara bertahap. Modul HLB
tetap fungsi deterministik yang dapat dipanggil service dan notebook.

Frontend menggunakan frontend/src/api, components, features, layouts, pages,
hooks, types dan utils. API client terpusat mengelola base URL, timeout dan errors.
SQLite untuk persistensi lokal dengan foreign key; desain repository memungkinkan
migrasi ke PostgreSQL. CSV merupakan input ingestion, bukan database transaksi.

Route → schema validation → service → repository/model. LLM tidak menulis database
hasil lab atau approval langsung. Secret hanya dari environment. File database,
data sensitif, notebook outputs sensitif, dan model tidak masuk Git secara default.

## 7. Model data relasional yang direncanakan

Semua ID stabil, timestamp UTC, unit eksplisit dan record menyimpan provenance.

| Entitas | Field inti | Relasi/aturan |
|---|---|---|
| Project | id, name, product_type, market, owner, status | Satu project banyak target/formula |
| TargetProfile | id, project_id, version, pH_min/max, viscosity_min/max/unit/method, sensory, packaging, max_cogs | Rentang min≤max; claim bukan hasil uji |
| Ingredient | id, inci_name, normalized_name, CAS, EC, functions | Alias dan grade di tabel terpisah |
| IngredientEvidence | ingredient_id, source_id, source_record, assertion, verification | Assertion dapat berkonflik tanpa overwrite |
| HlbReference | ingredient_id nullable, value_kind, min/max, emulsion_type, grade, method, source_id | Alias/grade review sebelum linking |
| RegulatoryEvidence | ingredient_id, jurisdiction, product_scope, max, unit, conditions, effective_date, source | Missing = review, bukan izin |
| SupplierSKU | id, ingredient_id, supplier, grade, pack_size, price, currency, price_basis, MOQ, order_multiple, lead_time | Harga dan halal spesifik supplier/grade |
| Inventory | sku_id, lot_id, on_hand, reserved, expiry, timestamp | Available = on_hand - reserved |
| CoA | lot_id, source_document, test, min/max, actual, unit, method, reviewer | OCR/manual draft sampai verifikasi |
| FormulaVersion | id, project_id, version, parent_version_id, status, provenance | Perubahan menghasilkan versi baru |
| FormulaLine | formula_version_id, ingredient_id, sku_id, phase, percentage | Bahan duplikat ditangani eksplisit per phase |
| RecipeVersion | id, formula_version_id, version, status | Snapshot terikat batch |
| ProcessStep | recipe_id, order, name, phase, equipment, target_temp/rpm/time, direction, endpoint | Actual berada pada batch execution |
| TrialBatch | id, formula_version_id, recipe_version_id, mass/unit, operator, equipment, status | Versi formula dan recipe tidak berganti saat trial |
| BatchStepResult | batch_id, step_id, actual_values, units, observations, deviation | Actual tidak mengganti target |
| LabResult | batch_id, test, value, unit, method, timepoint, lab_ref, verified_by | Verified result menjadi kandidat training label |
| StabilityResult | batch_id, condition, timepoint, pH, viscosity, separation, observations | Pengukuran berulang dikelompokkan per batch |
| MicrobialResult | batch_id, test, count/unit, water_activity, PET_ref, status | Tidak digantikan risk proxy |
| PackagingResult | batch_id, contact_material, closure, leakage, swelling, compatibility, evidence | Packaging version ikut tercatat |
| Deviation | id, batch_id, category, severity, problem, evidence_ids, status | Bukti asli dipertahankan |
| RCA | deviation_id, why_nodes, hypotheses, evidence_ids, bias_checks, human_conclusion | Hipotesis ≠ root cause disetujui |
| CAPA | id, deviation_id, corrective/preventive_actions, owner, due_date, criteria, outcome, recurrence | Outcome diisi setelah follow-up |
| Prediction | input_version, model_version, output, uncertainty, timestamp, data_status | Ketiadaan model menghasilkan unavailable |
| AuditEvent | actor, action, entity_id, before/after_ref, timestamp, reason | Append-only melalui service |

## 8. Validasi formula dan procurement

- Total percentage harus 100% dalam tolerance konfigurasi yang ditampilkan.
- Tolak nilai negatif, nonfinite, unit tidak dikenal, atau ingredient_id invalid.
- Hitung berat = batch_mass × percentage/100 dengan basis massa konsisten.
- Wajib/terlarang berasal dari target profile atau evidence tervalidasi; sumber wajib tampil.
- Regulatory maximum hanya dievaluasi bila scope, unit, tanggal dan kondisi sesuai.
- Missing preservation strategy membuat blocker review; strategi anhidrat harus
  dijustifikasi, bukan dipaksa menambah preservative tanpa konteks.
- Approval kandidat untuk trial berbeda dari release untuk produksi.
- Biaya bahan/kg = sum(fraksi_massa × harga_per_kg) pada mata uang/basis konsisten.
  Ini raw-material cost; packaging, loss, tenaga kerja dan overhead menambah COGS.
- Kebutuhan pembelian = max(0, kebutuhan_batch - available_inventory).
  Jika shortage>0, jumlah order ≥MOQ dan kelipatan order_multiple. MOQ adalah
  batas pembelian, bukan batas minimum konsumsi bahan dalam formula.
- Lead time dievaluasi terhadap jadwal trial. Harga kosong tidak boleh dianggap nol.
- Status halal harus berdasarkan dokumen dan scope supplier/grade/expiry.

## 9. Process recipe dan closed-loop trial

Template referensi: dispersi polimer A → pemanasan B → emulsifikasi → homogenisasi
→ pendinginan → fase C → adjust pH/viskositas → deaeration → filling.
Setiap step memiliki target dan actual suhu/RPM/durasi, equipment, endpoint,
operator, timestamp, observation dan deviation. Jangan mengisi parameter universal
tanpa formula, equipment dan evidence. B_INTO_A merupakan pilihan template,
bukan arah emulsifikasi yang di-hardcode untuk semua produk.

Status step: NOT_STARTED, IN_PROGRESS, COMPLETED, REVIEW_REQUIRED, DEVIATION, FAILED.
Hasil lab draft → verified oleh manusia → eligible untuk dataset release.
Tidak ada retraining otomatis dari hasil yang belum disetujui.

## 10. Kontrak API yang direncanakan

Semua error: code, message, field_errors, request_id. Error input 422,
record hilang 404, konflik versi/status 409, model tidak tersedia 503.
Pagination menggunakan limit dan cursor; respons mencantumkan provenance dan status.

| Endpoint | Input/hasil utama | Status saat dokumen dibuat |
|---|---|---|
| GET /health | status, product | Kode tersedia |
| GET /ingredients | q, function, status, cursor → items, next_cursor | Service Python tersedia; route belum |
| GET /ingredients/{id} | fungsi, evidence, identity, HLB references | Rancangan |
| POST /hlb/oil-phase | selected components, mass, reference IDs, O/W atau W/O → interval | Fungsi Python tersedia; route belum |
| POST /hlb/blend | HLB A/B, target, total mass → fraksi, gram, feasible status | Fungsi Python tersedia; route belum |
| POST /projects | nama, kategori, owner → persisted project | Rancangan |
| POST /formulations | project, lines, target version → formula version | Rancangan |
| POST /formulations/validate | formula, target, batch mass → errors, warnings, total, blockers | Rancangan |
| POST /formulations/predict | formula version, model/mode → CQA, uncertainty, provenance | Placeholder; model belum tersedia |
| POST /formulations/optimize | constraints, objective, candidate set → ranked experiments | Placeholder |
| GET /formulations/{id} | immutable version, lines, predictions | Rancangan |
| GET /process/templates | product/emulsion type → configurable template | Rancangan |
| POST /batches | formula version, recipe version, mass → batch | Rancangan |
| GET /batches/{id} | recipe snapshot, actuals, results, deviations | Rancangan |
| POST /batches/{id}/results | measured values, units, method, source → draft results | Rancangan |
| POST /deviations | batch, problem, evidence → deviation | Rancangan |
| POST /rca/analyze | problem, evidence, previous whys → hypotheses, missing evidence | Placeholder |
| POST /capa/search | text, filters → reports, similarity and metadata | Placeholder |
| POST /capa/predict-effectiveness | pre-action features → score/status/evidence | Rancangan |
| POST /supply-chain/evaluate | formula, mass, supplier snapshots → cost, shortage, lead time | Rancangan |
| GET /reports/{id} | versioned report with references and limitations | Rancangan |

Mock mode harus explicit, misalnya data_status=DEMO_ONLY dan prediction_method=demo_rule.
Jangan mengemas rule score sebagai probability terkalibrasi atau mengarang confidence.

## 11. ML, NLP, LLM dan optimization

Ingredient learning: label multifungsi independen, grouped split per ingredient,
uji keluarga kimia baru bila cukup data. Teks fungsi yang membentuk label tidak
boleh menjadi fitur evaluasi yang diklaim independen. Missingness dummy juga dapat
membocorkan aturan generator. Baseline HLB-only memerlukan fitur numerik terverifikasi.

Formula/CQA: satu observasi terkait formula version + process + batch + measurement
timepoint/method. Split berkelompok per formula/batch; time split jika deployment temporal.
Jangan memisahkan ingredient dari satu formula sebagai sampel independen. Laporkan
MAE/RMSE untuk target numerik, calibration/precision-recall untuk classification
bila jumlah data memadai, beserta dataset/version/split dan ukuran sample.

CAPA effectiveness: fitur harus tersedia pada waktu rekomendasi. Actual implementation
duration, final verification, recurrence sesudah tindakan dan outcome tidak boleh
menjadi fitur prediksi sebelum diterapkan. Gunakan planned duration jika relevan.

NLP CAPA: baseline TF-IDF/cosine boleh untuk demo, kemudian embeddings jika relevan.
Similarity bukan probabilitas keberhasilan; hasil menyertakan report ID, tanggal,
problem, root cause terdahulu, tindakan, verification dan outcome yang diketahui.

RCA: 5 Whys tidak wajib mencapai tepat lima bila bukti belum mendukung. Setiap why
menyimpan status proposed/confirmed/revised, evidence dan missing evidence. Bias
checks mencakup anchoring, confirmation bias, premature closure, attribution,
survivorship, availability dan automation bias. Final root cause ditentukan manusia.
LLM menerima data dokumen sebagai evidence tidak tepercaya, bukan instruksi sistem.

Optimization: mulai dengan feasibility dan objective eksplisit. Bayesian optimization
memerlukan data eksperimen, surrogate dan uncertainty yang dapat dijelaskan.
Expected improvement tidak ditampilkan sebelum benar-benar dihitung. RL hanya future
work sampai state/action/reward/policy/environment/feedback tersedia.

## 12. Alur frontend dan demo

Navigation: Dashboard, Projects, Formulation Workspace, Ingredient Intelligence,
Trial Batches, Stability & Microbial, Deviations & RCA, CAPA, Optimization,
Supply Chain & COGS, Reports & Audit, Settings.

Urutan panel: decision summary → blockers → formula table → attributes → evidence
→ detail teknis. Desktop-first, tabel terbaca, status badge konsisten, accessible
forms dan state loading/empty/error. Detail HLB mencantumkan jenis nilai, rentang,
grade dan sumber agar pengguna tidak memilih angka dari konteks yang keliru.

Demo utama master brief: moisturizer dengan target → pilih ingredient → tiga kandidat
demo → compare biaya/CQA/status → pilih trial → recipe → input hasil separation
→ RCA dengan evidence → cari CAPA → tindak lanjut → next experiment.
Workbook lama berfokus liquid complexion; simpan sebagai kategori project alternatif,
bukan mengubah semua source data menjadi moisturizer. Seluruh hasil sintetis ditandai.

## 13. Tahapan dan acceptance criteria

| Tahap | Deliverable | Kriteria lulus |
|---|---|---|
| 1 Fondasi | Env lokal, requirements tervalidasi, config, health | Server berjalan dan smoke test berhasil |
| 2 Data | Source manifest, ingredient ID/alias/evidence, HLB review | Unknown tidak menjadi izin; provenance dapat ditelusuri |
| 3 API + storage | Route ingredient/project, SQLite, audit events | Persist setelah restart; error/pagination konsisten |
| 4 Formula | Versioning, validator, raw-material cost, HLB service | Total/massa/unit/constraint diuji; impossible blend ditolak |
| 5 Kandidat | Tiga kandidat demo atau baseline tervalidasi | Sumber/mode/uncertainty tidak menyesatkan |
| 6 Process/batch | Recipe version, trial, results | Snapshot stabil, target terpisah actual, review hasil |
| 7 RCA/CAPA | Evidence/5 Whys, search, follow-up | Human conclusion; search sources dapat dibuka |
| 8 Supply chain | MOQ, inventory, currency, lead time | Kasus shortage/unknown price diuji |
| 9 Frontend | Workflow lengkap dan comparison | Input→trial→deviation dapat didemokan lokal |
| 10 Demo QA | Fixtures eksplisit, report, audit trail | Restart aman; tanpa secret; tidak bergantung layanan eksternal |

P0: alur lokal tersebut. P1: search CAPA, versioning matang, stability feedback,
report dan audit. P2: Bayesian optimization, structured CoA, explainability,
packaging/eco-score terdefinisi. P3: RL, OCR otomatis, SSO, multi-tenant, LIMS/ERP/QMS.

## 14. Menjalankan bagian yang sudah tersedia

Dari direktori racikai-backend:

```powershell
python -m unittest discover -s tests -v
```

```python
from app.hlb import blend_two, oil_phase_required_hlb
from app.ingredient_catalog import IngredientCatalog
result = blend_two(15.0, 4.3, 12.0, 10.0)
ingredient = IngredientCatalog().lookup('Polysorbate 80')
```

Importer dijalankan dengan `python -m scripts.import_hlb --source <csv>
--notes <txt> --brief <txt> --version hlb_v1`. Ketiga path wajib menunjuk file lokal.
Versi yang sudah ada ditolak; gunakan versi baru untuk rerun. Tidak ada kode dari
catatan atau brief yang dieksekusi. Hasil berada dalam folder data yang diabaikan Git.

## 15. Keputusan terbuka yang memerlukan data/domain review

1. Bibliografi lengkap tabel, metode HLB, supplier grade dan nilai yang berlaku.
2. Alias ingredient termasuk nama dagang dan nama umum; CAS saja tidak cukup untuk blend.
3. Definisi CQA, unit, metode, acceptance limits, horizon stability dan data eksperimen.
4. Bukti regulasi BPOM sesuai kategori/market/tanggal dan dokumen halal supplier.
5. Corpus CAPA yang diizinkan, de-identification, relevance labels dan outcome follow-up.
6. Objective bisnis dan cost basis yang disepakati untuk ranking kandidat.

Dokumen ini merinci keseluruhan produk. Penyelesaiannya tidak berarti seluruh
modul produk telah diimplementasikan; status implementasi mengikuti bagian 2 dan 10.
