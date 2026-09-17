# Penempatan dataset halal dan kode sampling PhormulAI

## File dan tanggung jawab

| Path | Isi |
|---|---|
| data/raw/regulations/halal/halal_v1/Daftar_Bahan_Dikecualikan_Sertifikat_Halal.csv | Salinan utuh sumber pengguna |
| data/processed/halal_v1/halal_exemptions.csv | Record ternormalisasi, ID internal, nama, kategori, provenance |
| data/processed/halal_v1/manifest.json | Audit baris/kolom, missing, duplikat, hash, konteks sumber resmi |
| scripts/import_halal.py | Ingestion versioned; menolak overwrite |
| app/halal.py | Lookup kandidat pengecualian dan pemeriksaan review bahan/supplier |
| app/formula_sampling.py | Sampling konsentrasi dan wrapper dengan syarat review halal |
| tests/test_halal_sampling.py | Uji matching, review, supplier scope, tanggal, dan rentang sampling |

CSV tidak memiliki nomor sertifikat halal, supplier SKU, tanggal review, atau
kolom kondisi rinci setiap entri. CSV belum direkonsiliasi baris per baris terhadap
lampiran resmi. Data masuk sebagai referensi pengguna yang memerlukan review.

Referensi konteks: BPJPH menjelaskan daftar pengecualian dalam KMA 1360/2021
dan kondisi pengolahan/penambahan bahan untuk kelompok terkait:
https://bpjph.halal.go.id/read/penting-diketahui-ini-bahan-yang-dikecualikan-dari-kewajiban-bersertifikat-halal .
Dokumen resmi tersedia di JDIH Kemenag:
https://jdih.kemenag.go.id/regulation/keputusan-menteri-agama-nomor-1360-tahun-2021-tentang-bahan-yang-dikecualikan-dari-kewajiban-bersertifikat-halal .
Referensi ini bukan klaim bahwa seluruh baris CSV atau penggunaan tertentu sudah diverifikasi.

## Apa yang dimaksud kode halal di aplikasi

`HALAL-REF-<hash>-<nomor>` adalah ID internal record sumber, bukan nomor sertifikat
BPJPH. Kolom `No` berulang per kategori; jangan menjadikannya primary key tunggal.

| halal_status_code | Arti | Boleh sampling yang mensyaratkan halal? |
|---|---|---|
| EXEMPTION_REFERENCE_ONLY | Baris dalam CSV sumber | Tidak |
| EXEMPTION_CANDIDATE_REQUIRES_REVIEW | Nama cocok dengan sumber | Tidak |
| UNKNOWN_REQUIRES_REVIEW | Belum ada pencocokan/bukti | Tidak; bukan berarti haram |
| REVIEW_INCOMPLETE_OR_INAPPLICABLE | Review kurang, beda SKU, future-dated atau lewat deadline | Tidak |
| NOT_ACCEPTED_BY_REVIEW | Tidak diterima reviewer untuk scope ini | Tidak |
| EXEMPTION_REVIEWED | Reviewer memeriksa sumber resmi dan kondisi pengecualian bahan/SKU | Ya, hanya kandidat riset |
| CERTIFICATE_REVIEWED | Reviewer memeriksa nomor, dokumen, dan scope sertifikat bahan/SKU | Ya, hanya kandidat riset |

Pengecualian kewajiban sertifikat bahan tidak menerbitkan sertifikat untuk produk
akhir. Semua output tetap `product_halal_status=NOT_EVALUATED`.
`valid_until` adalah deadline review internal, bukan asumsi masa berlaku legal
universal semua sertifikat. Perubahan supplier, grade, proses, bahan penolong,
atau scope memerlukan review ulang meskipun deadline belum tercapai.

Nama hanya dinormalisasi kapitalisasi dan whitespace; substring tidak cukup.
Kolom internasional juga memuat keterangan sehingga kecocokan utuh tetap perlu
review. Alias INCI harus dibuktikan manusia; "buah segar" tidak otomatis mencakup
semua ekstrak buah komersial. Nilai halal_yes_no dari dummy lama tidak digunakan.

## Menjalankan ingestion

Dari racikai-backend:

```powershell
python -m scripts.import_halal --source 'C:\Users\Acer\Downloads\Daftar_Bahan_Dikecualikan_Sertifikat_Halal.csv'
```

Untuk sumber baru, gunakan `--version halal_v2` dan inisialisasi HalalCatalog
dengan direktori versi baru. Raw serta processed diabaikan Git. Tidak ada package
tambahan untuk modul ini; importer dan service memakai standard library Python.

## Memakai fungsi sampling yang Anda kirim

Fungsi ada di app/formula_sampling.py. `FORMULA_ROLE_LIMITS` belum didefinisikan
di proyek sebelumnya. Konfigurasi tersebut sekarang diberikan sebagai argumen
`role_limits` agar tidak mengarang rentang universal untuk semua jenis produk.

```python
from random import Random
from app.formula_sampling import sample_ingredient_concentration

# Contoh angka untuk demonstrasi kode, bukan rekomendasi konsentrasi bahan.
FORMULA_ROLE_LIMITS = {
    "demo_role": {"minimum_pct": 2.0, "maximum_pct": 4.0},
}
ingredient_row = {
    "inci_name": "DEMO_INGREDIENT",
    "typical_pct_min": 1.0,
    "typical_pct_max": 5.0,
}
value = sample_ingredient_concentration(
    ingredient_row, "demo_role", Random(42),
    role_limits=FORMULA_ROLE_LIMITS,
)
```

Fungsi menghitung intersection typical usage dan role limits. Ditambahkan
validasi NaN/infinity, rentang terbalik, persen di luar 0–100, role tidak ada,
serta pembulatan yang tetap berada dalam interval. Interval tanpa nilai yang
bisa direpresentasikan dengan empat desimal ditolak. Seed membuat demo reproducible.

Typical range dan role limit bukan batas maksimum regulasi. Fungsi ini tidak
menjamin total formula 100%, kompatibilitas bahan, stabilitas, atau BPOM compliance.
Jangan menormalisasi hasil beberapa sampling ke 100% secara buta karena dapat
melanggar batas; formula validator harus memeriksa seluruh komposisi setelahnya.

## Pemakaian wajib halal

Gunakan wrapper `sample_halal_ingredient_concentration` pada alur kandidat yang
mensyaratkan halal; helper numerik saja tidak melakukan halal gate.

```python
from app.halal import HalalCatalog

catalog = HalalCatalog()
assessment = catalog.lookup("Kaolin")
print(assessment["halal_status_code"])
# Pencocokan sumber hanya kandidat review; eligible tetap False.
```

Setelah review manusia tersimpan melalui workflow internal tepercaya:

```python
from random import Random
from app.formula_sampling import sample_halal_ingredient_concentration

# ingredient_row harus punya inci_name, supplier_sku, typical_pct_min/max.
# reviewed_record berasal dari reviewer berwenang, bukan flag dari frontend.
proposal = sample_halal_ingredient_concentration(
    ingredient_row,
    formula_role,
    Random(42),
    role_limits=FORMULA_ROLE_LIMITS,
    halal_catalog=catalog,
    halal_review=reviewed_record,
)
```

Review record wajib: review_id, ingredient, supplier_sku, reviewer,
evidence_reference, reviewed_on, valid_until, decision,
supplier_and_process_scope_verified.

Untuk EXEMPTION_REVIEWED, tambahkan exemption_reference_id dari katalog,
official_source_checked=true dan exemption_conditions_verified=true setelah
review selesai. Bukti harus menyertakan penelusuran sumber resmi, asal bahan,
grade/proses/bahan penolong, serta justifikasi alias bila nama berbeda.

Untuk CERTIFICATE_REVIEWED, tambahkan certificate_number dan
certificate_scope_verified=true setelah memeriksa dokumen yang mencakup SKU.
Tidak ada nilai review nyata yang dibuat otomatis oleh script ini.

Service memvalidasi kelengkapan, scope dan tanggal; service tidak dapat membuktikan
keaslian dokumen atau identitas reviewer. Sebelum diekspos ke frontend, tambahkan
repository review, autentikasi/otorisasi reviewer dan audit trail. Jangan menerima
review lengkap dari public request lalu mempercayainya. Saat ini tidak ada endpoint
publik baru; integrasi berupa modul backend Python.

## Pengujian

```powershell
python -m unittest discover -s tests -v
```

Test approval menggunakan fixture sintetis, bukan sertifikat/keputusan nyata.
Belum ada supplier nyata yang otomatis disetujui untuk memenuhi syarat halal.
