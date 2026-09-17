# PhormulAI: pembelajaran fungsi ingredient

## Hasil audit input dummy

Sumber: `output_full_dummy_completed.csv`, 49 baris ingredient, 37 kolom.
Total concentration_pct = 100%. Tidak ada formula_id, batch_id atau outcome
eksperimen. Jangan menganggap 49 ingredient sebagai 49 formula independen.

Label awal dari teks function: 12 emollient, 3 surfactant, 3 emulsifier.
Ketiga surfactant juga emulsifier; tidak tersedia surfactant non-emulsifier.
Label tersebut merupakan anotasi sementara dari dummy, bukan kebenaran terverifikasi.

## Makna label dan HLB

- Emollient: fungsi melembutkan/melicinkan kulit; dapat bersamaan dengan fungsi lain.
- Surfactant: aktivitas pada permukaan/antarmuka, dengan fungsi spesifik seperti cleansing atau emulsifying.
- Emulsifier: membantu pembentukan emulsi; bedakan dari bahan yang hanya menstabilkan emulsi lewat viskositas.
- HLB: karakteristik keseimbangan hidrofilik/lipofilik surfaktan pada sistem yang sesuai.
- rHLB: kebutuhan emulsifikasi fase minyak dalam kondisi dan jenis emulsi tertentu.

rHLB bukan ambang klasifikasi emollient. Pada dummy ini UV filter, antioxidant,
perfuming dan pigment-treatment ingredient juga memiliki rHLB. Emollient
Dimethicone Crosspolymer tidak memiliki rHLB. HLB/rHLB saja tidak membuktikan fungsi.
Jangan menganggap nilai HLB ionic/silicone surfactant otomatis sebanding dengan
sistem HLB nonionic klasik. Periksa grade supplier, metode, jenis emulsi dan kondisi.

Perhitungan screening: rHLB fase minyak = sum(massa minyak_i * rHLB_i) /
sum(massa minyak_i). HLB blend emulsifier memakai pembobotan massa emulsifier.
Pilih komponen secara eksplisit; jangan mengambil semua baris bernilai rHLB.
Nilai hilang membuat perhitungan tidak lengkap; tidak boleh diganti nol.
Kecocokan HLB tidak membuktikan stabilitas formula.

## Workflow supervised learning

1. Audit fungsi dummy dengan `app.ingredient_intelligence.audit_ingredient`.
2. Review INCI, grade supplier, fungsi CosIng, HLB/rHLB dan provenance bersama ahli.
3. Isi reviewed_emollient, reviewed_surfactant, reviewed_emulsifier (0/1),
   review_source dan label_status=expert_reviewed pada salinan data review.
4. Tambah contoh cleansing/solubilizing surfactant yang bukan emulsifier serta
   bahan multifungsi. Gunakan anotasi independen, bukan label hasil threshold HLB.
5. Jalankan `app.ingredient_learning.train_reviewed_baseline` sebagai baseline HLB-only.
   Fungsi, flag emulgator, SKU dan regulatory flag tidak dipakai sebagai fitur.
6. Evaluasi per label dengan split grouped ingredient; dataset eksternal harus
   mencakup bahan/keluarga kimia baru dan data nyata. Jangan melaporkan skor dummy
   sebagai performa produksi. Baseline bisa belajar pola missingness data generator.

Belum ada model yang dilatih, skor performa atau rekomendasi formula terbaik.
Training ditolak jika label belum direview atau cakupan train/test tidak memadai.

## Hubungan dengan lima fitur hackathon

| Fitur | Data tambahan yang diperlukan |
|---|---|
| Prediksi formula terbaik | Banyak formula_id/batch_id, komposisi, CPP, CQA, stability, microbial, packaging dan objective terdefinisi |
| RCA / 5 Whys | Laporan deviasi, evidence, investigasi, sumber kutipan dan review ahli |
| Similarity CAPA | Riwayat laporan de-identified, teks tindakan dan relevansi yang dinilai ahli |
| Efektivitas CAPA | Outcome follow-up, waktu evaluasi, recurrence dan fitur yang tersedia sebelum CAPA |
| RL efisiensi | State/action/reward, trajectory, batas tindakan dan simulator atau histori tervalidasi |

CSV ini memiliki dummy komposisi, supply-chain dan CPP, tetapi tidak memiliki
outcome stability/microbial/packaging/RCA/CAPA effectiveness. Flag bpom_yes_no
dan halal_yes_no adalah dummy, bukan bukti izin atau sertifikasi. Jangan memulai
RL atau klaim efektivitas tanpa trajectory/outcome. Optimasi eksperimen berbatas
dapat dipertimbangkan setelah tersedia data eksperimen yang memadai.

## Referensi konsep

- European Commission, CosIng functions: https://ec.europa.eu/growth/tools-databases/cosing/assets/images/CosIng_FO.pdf
- Croda, HLB System: https://www.crodabeauty.com/en-gb/resources/technical-library/resource-finder/resource/7209-hlb-system-personal-care-edition
- Croda, emulsification: https://www.crodahomecare.com/en-gb/effects/emulsification-and-solubilisation
- CosIng bersifat informatif, bukan izin regulasi: https://single-market-economy.ec.europa.eu/sectors/cosmetics/cosmetic-ingredient-database_en

Kandidat tetap memerlukan uji laboratorium, stabilitas, mikrobiologi, keamanan,
dan review regulasi. Typical usage range bukan maksimum regulasi; missing
restriction tidak berarti bebas digunakan. Tidak ada kredensial dalam modul ini.
