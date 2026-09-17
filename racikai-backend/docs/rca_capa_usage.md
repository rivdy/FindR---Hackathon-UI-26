# RCA/CAPA berbasis korpus pengguna

## Perubahan yang sudah berjalan

- 100 laporan masuk ke data/processed/capa_v1/rca_records.json dengan provenance.
- Parser memisahkan Man, Machine, Material, Method, Environment, Measurement dan
  root cause yang dinyatakan penulis. Unknown labels tetap disimpan.
- Pencarian NLP lokal menggunakan TF-IDF kata/bigram dan karakter, cosine similarity.
  Fitur pencarian hanya problem description agar template RCA dan outcome berulang
  tidak mendominasi ranking. Ini retrieval baseline, bukan LLM atau prediksi efektivitas.
- RCA draft memuat kasus sumber, hipotesis dari laporan lama, pertanyaan 5 Whys,
  missing evidence dan bias checks. Root cause final dan probability tetap null.
- Daftar halal Inggris menjadi sumber tambahan: 523 baris → 506 pasangan
  category/name; 17 duplikat digabung dengan source_rows tetap terlacak.
  Daftar Indonesia tidak diganti dan pencocokan nama tidak memberi approval.

## Audit dan batas bukti

100 laporan hanya memiliki 11 pola teks RCA. Status: Closed 61, Open 20,
Extended 19. Semua 100 laporan tidak memiliki cabang Measurement eksplisit.
39 laporan belum Closed tetapi memiliki teks evaluasi efektivitas. Teks tersebut
belum dapat dibedakan sebagai rencana uji atau hasil aktual yang diverifikasi.

Tidak ada foreign key formula/batch, dokumen hasil lab, tanggal implementasi,
tanggal verifikasi efektivitas, reviewer, atau outcome recurrence terstruktur.
Karena itu source status USER_PROVIDED_UNVERIFIED, bukan otomatis data nyata
terverifikasi atau otomatis data sintetis. Nama file/ID bukan bukti asal perusahaan.
Temuan ini tidak digunakan untuk mengarang accuracy atau probability.

Semua hasil retrieval menyertakan report_id, source_file, source_row, date,
problem, risk, status, fishbone, corrective/preventive action, effectiveness_text
dan warnings. Similarity score adalah kemiripan teks, bukan probabilitas penyebab
atau keberhasilan CAPA. Nilai rendah tetap perlu penilaian relevansi manusia.
Filter as_of hanya memakai tanggal record; jangan mengklaim evaluasi temporal
terhadap outcome tanpa tanggal implementasi dan follow-up.

## Menjalankan

Dari racikai-backend:

```python
from app.capa_search import CapaSearch
from app.rca_copilot import generate_rca

# Pertahankan engine selama sesi aplikasi agar indeks tidak dihitung berulang.
engine = CapaSearch()
cases = engine.search('Phase separation antara fase air dan fase minyak setelah penyimpanan.', limit=3)
draft = generate_rca(
    'Phase separation antara fase air dan fase minyak setelah penyimpanan.',
    evidence=[],
    search_engine=engine,
    ingredient_names=['Mica', 'Sodium Chloride', 'BHT'],
)
```

Evidence kosong sah, tetapi tidak menghasilkan bukti terkonfirmasi. Bila teks
bukti diberikan, tetap berlabel USER_SUPPLIED_UNVERIFIED. Optional ingredient_names
menampilkan lookup kedua daftar halal; tidak melakukan auto-approval dan tidak
mengubah keputusan pada app/halal.py.

```powershell
python -m scripts.import_rca_knowledge --rca 'C:\Users\Acer\Downloads\rca_capa_effectiveness (1).csv' --halal 'C:\Users\Acer\Downloads\Halal_Exempted_Ingredients_English.csv'
python -m unittest discover -s tests -v
```

Importer menolak versi yang sudah ada; gunakan --version capa_v2 untuk sumber baru.
Sesuaikan path CapaSearch dan path supplemental jika aplikasi berpindah versi.
Tidak ada dependency baru, API key, network call atau endpoint FastAPI tambahan.
Input arsip berada di data/raw/capa/capa_v1 dan data/raw/regulations/halal/capa_v1_english.
Raw, processed dan gambar output tetap diabaikan Git.

## Fishbone yang dibuat

### Pemilihan kasus dan diagram interaktif

Buka `data/processed/capa_v1/rca_fishbone_explorer.html` dengan browser lokal.
Halaman berdiri sendiri dan dapat dipakai offline tanpa server, API key, atau
instalasi frontend. Halaman ini adalah viewer lokal; belum menjadi route React/FastAPI.

1. Cari ID, potongan ID seperti `003`, atau uraian masalah seperti `pigmen`.
2. Pilih record dari daftar; status bisa difilter Open, Closed atau Extended.
3. Kepala diagram menampilkan masalah record tersebut. Enam cabang menampilkan
   rincian Man, Machine, Material, Method, Environment dan Measurement dari record
   yang sama. Kategori kosong diberi garis putus-putus dan tidak diisi penyebab palsu.
4. Buka rincian cabang untuk membaca teks lengkap. Root cause, correction, proposed
   CAPA, corrective action, preventive action, timeframe dan evaluasi mengikuti pilihan.
5. Perbesar diagram atau unduh SVG untuk kasus terpilih. SVG dapat diperbesar tanpa
   pecah dan menyertakan ID/sumber. PNG contoh sebelumnya tetap tersedia terpisah.

Beberapa kasus memiliki fishbone serupa karena sumber menggunakan 11 pola untuk
100 kasus. Viewer tidak menciptakan perbedaan penyebab agar kasus terlihat unik.
Hasil berasal langsung dari data terstruktur; pemilihan diagram tidak membutuhkan
LLM atau image generation ulang. Lampiran diperlakukan sebagai teks, bukan kode.

Pembuat viewer: `python -m scripts.build_fishbone_viewer`. Output yang sudah ada
ditolak; gunakan `--output <path-baru.html>` saat memperbarui data. Halaman memuat
snapshot lokal korpus, sehingga perubahan CSV memerlukan ingestion dan build ulang.

Backend dapat mengakses data/gambar per ID melalui:

```python
from app.fishbone import FishboneRepository
repository = FishboneRepository()
cases = repository.list_cases()
record = repository.get('CAPA-PTI-26-003')
svg = repository.diagram('CAPA-PTI-26-003')
```

Unknown ID menghasilkan KeyError, bukan fallback ke kasus lain. HTML viewer
menampilkan empty state ketika filter tidak memiliki hasil. Tidak ada record
asli yang diubah lewat viewer. Halaman membawa isi korpus, jadi perlakukan file
HTML yang diekspor dengan kebijakan kerahasiaan yang sama seperti CSV sumber.

### PNG contoh

Gambar PNG utama: data/processed/capa_v1/fishbone_CAPA-PTI-26-001.png.
Diagram menjelaskan satu kasus pemisahan fase, bukan menggabungkan 100 kasus
dengan masalah berbeda. Pernyataan 5 cabang diringkas dari kolom
Investigation_Fishbone_RCA. Cabang Measurement berwarna amber dan diberi status
belum tercatat; tidak dijadikan penyebab tambahan. Root cause diberi label
pernyataan CSV belum terverifikasi. JSON menyimpan teks asli seluruh 100 fishbone.

Gambar dibuat melalui built-in imagegen dan diperiksa secara visual terhadap
record CAPA-PTI-26-001. Prompt yang digunakan:

> Create a polished, accurate Indonesian scientific Ishikawa fishbone diagram for PhormulAI, landscape 1800x1100 or similar. White/off-white background, navy and teal branches, amber dashed branch for missing data. Clear large legible typography, plentiful spacing, precise straight lines. Title 'PhormulAI | Fishbone RCA'. Subtitle 'CAPA-PTI-26-001 — Pemisahan fase setelah penyimpanan'. A true fishbone: horizontal spine with arrow pointing to a right-hand effect box 'PEMISAHAN FASE' with subtitle 'Fase air dan minyak terpisah'. Six diagonal branches, 3 above and 3 below, each with a heading and two short lines, no overlap. Top branches left to right: 'MANUSIA' / 'Rasio HLB belum dioptimasi' / 'pada fase R&D'; 'MESIN' / 'Kecepatan rotor/stator' / 'homogenizer menurun'; 'MATERIAL' / 'Profil emulsifier berbeda' / 'antar supplier'. Bottom branches left to right: 'METODE' / 'Waktu homogenisasi' / 'dalam batch record kurang'; 'LINGKUNGAN' / 'Pendinginan mendadak' / 'setpoint chiller terlalu rendah'; 'PENGUKURAN' in amber dashed / 'Belum tercatat dalam CSV' / 'Perlu bukti pengukuran'. Lower separate navy panel exact label 'Root cause yang dinyatakan dalam CSV' followed by 'Ketidaksesuaian HLB dan shear homogenizer → droplet besar dan tidak stabil'. Smaller separate explanatory line 'Pernyataan sumber belum diverifikasi dengan hasil laboratorium.' Footer 'Sumber: Investigation_Fishbone_RCA | CAPA-PTI-26-001' and 'Diagram satu kasus, bukan kesimpulan seluruh dataset.' This is an evidence-aware educational diagram; do not add numerical laboratory results, measured proof, halal certification symbols, company logos, success rates or causal certainty. Do not treat Measurement as a confirmed cause. Make diagram useful for a hackathon presentation with accurate Indonesian text.

## Agar kualitas dapat diukur berikutnya

Tambahkan label relevansi query→report dari reviewer, kemudian ukur Precision@k
atau nDCG dengan query terpisah. Untuk efektivitas, siapkan outcome terverifikasi
dengan horizon follow-up dan split kelompok pola/kejadian; status Closed bukan
label sukses. Jangan mengukur generalisasi menggunakan salinan template RCA yang
tersebar di train dan test. Integrasi LLM dapat memakai hasil retrieval ini sebagai
evidence dengan ID sumber, tetapi tetap memerlukan evaluasi grounding dan audit.
