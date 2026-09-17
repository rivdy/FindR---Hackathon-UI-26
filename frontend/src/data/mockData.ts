import { 
  Ingredient, 
  FormulaCandidate, 
  TrialBatch, 
  FishboneBranch, 
  FiveWhyItem, 
  CapaItem, 
  OilPhaseComponent,
  QtppProfile,
  StabilityTestResult,
  CppParameter, 
  CmaAttribute,
  CppTargetStep,
  CppActualStep,
  CppFinalObservation
} from '../types';

export const DEFAULT_QTPP: QtppProfile = {
  product_name: 'Barrier Restore Daily Hydro-Moisturizer',
  product_category: 'Moisturizer Cream / Gel-Cream (O/W Emulsion)',
  target_market: 'Indonesia / ASEAN Tropical Climate',
  target_ph_min: 5.5,
  target_ph_max: 6.0,
  target_viscosity_min: 18000,
  target_viscosity_max: 24000,
  sensory_target: 'Non-comedogenic, rapid absorption, non-sticky matte finish, soothing hydration',
  target_cogs_max_idr: 85000,
  shelf_life_months: 24,
  halal_required: true,
  bpom_registered: true
};

// 45+ RICH AUTHENTIC COSMETIC INCI INGREDIENTS WITH COMPLETE COA & MSDS DETAILS
export const MOCK_INGREDIENTS: Ingredient[] = [
  // 1. Solvents & Carriers
  {
    id: 'ing-1',
    inci_name: 'Aqua',
    trade_name: 'Deionized Water Pure USP Grade',
    cas_number: '7732-18-5',
    functions: ['Solvent', 'Vehicle'],
    typical_min_pct: 50.0,
    typical_max_pct: 85.0,
    regulatory_max_pct: 100.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 2500,
    currency: 'IDR',
    supplier: 'PT Dipa Pharmalab Intersains',
    description: 'Ultrapure demineralized water for cosmetics base formulation (< 0.1 µS/cm conductivity).',
    coa_details: {
      lot_number: 'LOT-AQ-20260901',
      release_date: '2026-09-01',
      expiry_date: '2027-09-01',
      appearance: 'Cairan jernih tak berwarna, tidak berbau',
      assay_purity_pct: 99.99,
      loss_on_drying_pct: 0.01,
      heavy_metals_ppm: '< 0.1 ppm (Pb, As, Cd bebas)',
      microbial_alt: '< 10 CFU/mL (Sterile purified)',
      pathogens: 'Negative (E. coli, P. aeruginosa, S. aureus)',
      ph_solution_1pct: 6.8
    },
    msds_details: {
      ghs_classification: 'Not classified as hazardous according to GHS',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P102: Jauhkan dari jangkauan anak-anak.'],
      first_aid_eye: 'Bilas dengan air bersih jika terjadi iritasi mekanis ringan.',
      first_aid_skin: 'Tidak ada bahaya kontak kulit.',
      spill_procedure: 'Keringkan dengan kain pel atau serap dengan absorbent standar.',
      handling_storage: 'Simpan pada suhu ruang sejuk (15-30°C) dalam wadah stainless steel/HDPE tertutup.',
      personal_protective_equipment: 'Sarung tangan lab standar.'
    }
  },
  {
    id: 'ing-2',
    inci_name: 'Glycerin',
    trade_name: 'Vegetable Glycerin 99.7% USP',
    cas_number: '56-81-5',
    functions: ['Humectant', 'Skin conditioning'],
    typical_min_pct: 2.0,
    typical_max_pct: 10.0,
    regulatory_max_pct: 50.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 32000,
    currency: 'IDR',
    supplier: 'Wilmar Oleochemicals',
    description: 'Plant-derived trihydroxy alcohol with strong hygroscopic and water-binding capacity.',
    coa_details: {
      lot_number: 'LOT-GLY-20260714',
      release_date: '2026-07-14',
      expiry_date: '2028-07-14',
      appearance: 'Cairan kental jernih higroskopis, rasa manis',
      assay_purity_pct: 99.75,
      loss_on_drying_pct: 0.25,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative (E. coli, S. aureus, Candida)',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Not hazardous under GHS criteria',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P262: Jangan sampai terkena mata.'],
      first_aid_eye: 'Bilas hati-hati dengan air selama beberapa menit.',
      first_aid_skin: 'Cuci dengan sabun dan air mengalir.',
      spill_procedure: 'Cairan kental licin; taburkan pasir silika atau serap dengan serbuk gergaji.',
      handling_storage: 'Simpan dalam drum tertutup rapat di tempat kering karena sifat higroskopis.',
      personal_protective_equipment: 'Kacamata safety, sarung tangan nitril.'
    }
  },
  {
    id: 'ing-3',
    inci_name: 'Niacinamide',
    trade_name: 'Niacinamide PC (Low Nicotinic Acid <100ppm)',
    cas_number: '98-92-0',
    functions: ['Active', 'Skin brightening', 'Barrier repair'],
    typical_min_pct: 2.0,
    typical_max_pct: 5.0,
    regulatory_max_pct: 10.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 380000,
    currency: 'IDR',
    supplier: 'DSM Nutritional Products',
    description: 'High-purity Vitamin B3, clinical efficacy for hyperpigmentation and sebum control.',
    coa_details: {
      lot_number: 'LOT-NIA-20260810-USP',
      release_date: '2026-08-10',
      expiry_date: '2029-08-10',
      appearance: 'Serbuk kristal putih tidak berbau',
      assay_purity_pct: 99.6,
      melting_point_c: '128.5°C - 131.0°C',
      loss_on_drying_pct: 0.12,
      heavy_metals_ppm: '< 10 ppm (Asam nikotinat bebas: 22 ppm)',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative (Salmonella, E. coli)',
      ph_solution_1pct: 6.4
    },
    msds_details: {
      ghs_classification: 'Eye Irritation Category 2A',
      signal_word: 'Warning',
      hazard_statements: ['H319: Menyebabkan iritasi mata yang serius.'],
      precautionary_statements: ['P280: Kenakan pelindung mata/sarung tangan.', 'P305+P351: Bilas dengan air jika kontak mata.'],
      first_aid_eye: 'Bilas segera dengan air mengalir selama minimal 15 menit, hubungi dokter bila perlu.',
      first_aid_skin: 'Basuh dengan air dan sabun.',
      spill_procedure: 'Sapu hati-hati serbuk tanpa menimbulkan debu beterbangan.',
      handling_storage: 'Wadah tertutup rapat, terlindung dari sinar matahari langsung dan kelembaban tinggi.',
      personal_protective_equipment: 'Masker debu partikulat N95, sarung tangan nitril, kacamata pelindung lab.'
    }
  },
  {
    id: 'ing-4',
    inci_name: 'Squalane',
    trade_name: 'Neossance Squalane (Olive/Sugar Cane Derived)',
    cas_number: '111-01-3',
    functions: ['Emollient', 'Skin conditioning', 'Antioxidant'],
    typical_min_pct: 2.0,
    typical_max_pct: 12.0,
    regulatory_max_pct: 100.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 680000,
    currency: 'IDR',
    supplier: 'Amyris / Clariant',
    description: 'Biocompatible saturated hydrocarbon emollient offering non-greasy silky skin feel.',
    rhlb_ow: 11.0,
    coa_details: {
      lot_number: 'LOT-SQL-20260620',
      release_date: '2026-06-20',
      expiry_date: '2028-06-20',
      appearance: 'Cairan minyak jernih transparan tidak berwarna',
      assay_purity_pct: 99.2,
      loss_on_drying_pct: 0.05,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.9
    },
    msds_details: {
      ghs_classification: 'Non-hazardous substance',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P103: Baca label sebelum digunakan.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Tidak mengiritasi kulit; bersihkan sisa minyak berlebih.',
      spill_procedure: 'Bahan licin; gunakan pasir atau absorben minyak inert.',
      handling_storage: 'Simpan di tempat berventilasi baik, jauh dari sumber api terbuka.',
      personal_protective_equipment: 'Sarung tangan pelindung minyak, kacamata kerja.'
    }
  },
  {
    id: 'ing-5',
    inci_name: 'Beeswax',
    trade_name: 'Cera Alba Refined White Pellets NF',
    cas_number: '8012-89-3',
    functions: ['Emollient', 'Emulsion stabilising', 'Viscosity controlling'],
    typical_min_pct: 1.0,
    typical_max_pct: 8.0,
    regulatory_max_pct: 20.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 185000,
    currency: 'IDR',
    supplier: 'Koster Keunen Inc.',
    description: 'Natural wax structuring agent imparting body, moisture barrier, and film integrity.',
    rhlb_ow: 9.0,
    rhlb_wo: 5.0,
    coa_details: {
      lot_number: 'LOT-BW-20260515',
      release_date: '2026-05-15',
      expiry_date: '2029-05-15',
      appearance: 'Pelet padat putih krem kekuningan halus',
      assay_purity_pct: 99.0,
      melting_point_c: '62.0°C - 65.0°C',
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.0
    },
    msds_details: {
      ghs_classification: 'Combustible solid at elevated temps',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['H290: Dapat memicu luka bakar jika terkena lelehan panas.'],
      precautionary_statements: ['P280: Gunakan sarung tangan tahan panas saat melelehkan.'],
      first_aid_eye: 'Jika terkena lelehan panas, dinginkan segera dengan air es mengalir.',
      first_aid_skin: 'Dinginkan area lelehan dengan air dingin, jangan mencabut lilin beku paksa.',
      spill_procedure: 'Biarkan memadat lalu kikis menggunakan spatula.',
      handling_storage: 'Simpan di bawah 30°C agar pelet tidak menggumpal.',
      personal_protective_equipment: 'Sarung tangan termal heat-resistant saat proses peleburan.'
    }
  },
  {
    id: 'ing-6',
    inci_name: 'Lanolin',
    trade_name: 'Corona Ultra-Pure Anhydrous Lanolin',
    cas_number: '8006-54-0',
    functions: ['Emollient', 'Emulsifying agent', 'Moisturizer'],
    typical_min_pct: 1.0,
    typical_max_pct: 5.0,
    regulatory_max_pct: 15.0,
    halal_status: 'HALAL_REVIEW_REQUIRED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 310000,
    currency: 'IDR',
    supplier: 'Croda International Plc',
    description: 'Waxy lipid derived from sheep wool. Occlusive; animal source requires Halal verification.',
    rhlb_ow: 12.0,
    rhlb_wo: 8.0,
    coa_details: {
      lot_number: 'LOT-LAN-20260408',
      release_date: '2026-04-08',
      expiry_date: '2028-04-08',
      appearance: 'Massa lengket lunak kuning kecokelatan',
      assay_purity_pct: 98.8,
      melting_point_c: '38.0°C - 44.0°C',
      loss_on_drying_pct: 0.2,
      heavy_metals_ppm: '< 10 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.2
    },
    msds_details: {
      ghs_classification: 'Mild eye and skin irritant in sensitive individuals',
      signal_word: 'Warning',
      hazard_statements: ['H317: Dapat menyebabkan reaksi alergi pada orang peka wol.'],
      precautionary_statements: ['P280: Kenakan sarung tangan pelindung.'],
      first_aid_eye: 'Bilas dengan air hangat.',
      first_aid_skin: 'Cuci dengan sabun dan air.',
      spill_procedure: 'Bersihkan dengan kain dan degreaser.',
      handling_storage: 'Simpan di wadah kedap udara terlindung dari oksidasi udara.',
      personal_protective_equipment: 'Sarung tangan nitril.'
    }
  },
  {
    id: 'ing-7',
    inci_name: 'Paraffin wax',
    trade_name: 'Microcrystalline & Paraffin Wax 58/60',
    cas_number: '8002-74-2',
    functions: ['Emollient', 'Viscosity controlling'],
    typical_min_pct: 1.0,
    typical_max_pct: 6.0,
    regulatory_max_pct: 30.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 55000,
    currency: 'IDR',
    supplier: 'Pertamina Petrochemical',
    description: 'Mineral-derived hydrocarbon wax for hardness and occlusive barrier formation.',
    rhlb_ow: 10.0,
    rhlb_wo: 4.0,
    coa_details: {
      lot_number: 'LOT-PW-20260312',
      release_date: '2026-03-12',
      expiry_date: '2030-03-12',
      appearance: 'Padatan lilin putih semi-transparan',
      assay_purity_pct: 99.5,
      melting_point_c: '58.0°C - 60.0°C',
      loss_on_drying_pct: 0.05,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 7.0
    },
    msds_details: {
      ghs_classification: 'Non-hazardous solid',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P210: Jauhkan dari panas dan percikan api.'],
      first_aid_eye: 'Bilas jika terjadi kontak mekanis.',
      first_aid_skin: 'Jika terkena lelehan, dinginkan dengan air es.',
      spill_procedure: 'Kikis padatan lilin yang tercecer.',
      handling_storage: 'Simpan di ruangan sejuk dan berventilasi.',
      personal_protective_equipment: 'Sarung tangan termal.'
    }
  },
  {
    id: 'ing-8',
    inci_name: 'Cetyl alcohol',
    trade_name: 'Kalcol 6098 (1-Hexadecanol Vegetable)',
    cas_number: '36653-82-4',
    functions: ['Emollient', 'Emulsifying', 'Viscosity controlling'],
    typical_min_pct: 1.0,
    typical_max_pct: 5.0,
    regulatory_max_pct: 20.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 48000,
    currency: 'IDR',
    supplier: 'Kao Chemicals Indonesia',
    description: 'Fatty alcohol co-emulsifier creating liquid crystalline network for stability.',
    rhlb_ow: 15.0,
    hlb_value: 15.5,
    coa_details: {
      lot_number: 'LOT-CA-20260814',
      release_date: '2026-08-14',
      expiry_date: '2028-08-14',
      appearance: 'Pelet putih berlilin, bau khas lemak lemah',
      assay_purity_pct: 99.1,
      melting_point_c: '47.0°C - 50.0°C',
      loss_on_drying_pct: 0.08,
      heavy_metals_ppm: '< 3 ppm (Bilangan Asam: 0.04 mg KOH/g)',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.8
    },
    msds_details: {
      ghs_classification: 'Non-hazardous under regular conditions',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P280: Gunakan sarung tangan saat menimbang.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Cuci dengan air dan sabun.',
      spill_procedure: 'Sapu pelet padat dan masukkan ke drum limbah.',
      handling_storage: 'Simpan di bawah 35°C dalam wadah tersegel rapat.',
      personal_protective_equipment: 'Sarung tangan lab, kacamata pelindung.'
    }
  },
  {
    id: 'ing-9',
    inci_name: 'Polysorbate 80',
    trade_name: 'Tween 80 (Polyoxyethylene (20) Sorbitan Monooleate)',
    cas_number: '9005-65-6',
    functions: ['Surfactant - Emulsifying', 'Solubilising'],
    typical_min_pct: 0.5,
    typical_max_pct: 4.0,
    regulatory_max_pct: 10.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 92000,
    currency: 'IDR',
    supplier: 'Croda International',
    description: 'Hydrophilic nonionic surfactant and primary O/W emulsifier.',
    hlb_value: 15.0,
    coa_details: {
      lot_number: 'LOT-TW80-20260630',
      release_date: '2026-06-30',
      expiry_date: '2028-06-30',
      appearance: 'Cairan kental berwarna kuning kecokelatan bening',
      assay_purity_pct: 99.0,
      loss_on_drying_pct: 2.2,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Non-hazardous surfactant',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P264: Basuh tangan setelah penggunaan.'],
      first_aid_eye: 'Bilas dengan air.',
      first_aid_skin: 'Bilas dengan air.',
      spill_procedure: 'Serap dengan absorben inert.',
      handling_storage: 'Simpan di tempat kering dan sejuk.',
      personal_protective_equipment: 'Kacamata kerja, sarung tangan karet.'
    }
  },
  {
    id: 'ing-10',
    inci_name: 'Sorbitan Stearate',
    trade_name: 'Span 60 (Sorbitan Monostearate)',
    cas_number: '1338-41-6',
    functions: ['Surfactant - Emulsifying'],
    typical_min_pct: 0.5,
    typical_max_pct: 3.5,
    regulatory_max_pct: 10.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 86000,
    currency: 'IDR',
    supplier: 'Croda International',
    description: 'Lipophilic nonionic surfactant used in tandem with Polysorbate to match target HLB.',
    hlb_value: 4.7,
    coa_details: {
      lot_number: 'LOT-SP60-20260719',
      release_date: '2026-07-19',
      expiry_date: '2028-07-19',
      appearance: 'Pelet lilin berwarna kuning muda krem',
      assay_purity_pct: 98.9,
      melting_point_c: '51.0°C - 54.0°C',
      loss_on_drying_pct: 1.1,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.7
    },
    msds_details: {
      ghs_classification: 'Non-hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P102: Jauhkan dari anak-anak.'],
      first_aid_eye: 'Bilas air mengalir.',
      first_aid_skin: 'Cuci sabun.',
      spill_procedure: 'Kumpulkan padatan ke wadah pembuangan.',
      handling_storage: 'Hindarkan dari sinar matahari langsung.',
      personal_protective_equipment: 'Sarung tangan kerja.'
    }
  },
  {
    id: 'ing-11',
    inci_name: 'Ceramide NP',
    trade_name: 'Ceramide III Pure Biofermented Sphingolipid',
    cas_number: '100403-19-8',
    functions: ['Active', 'Skin conditioning', 'Barrier restoration'],
    typical_min_pct: 0.05,
    typical_max_pct: 0.5,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 18500000,
    currency: 'IDR',
    supplier: 'Evonik Personal Care',
    description: 'Skin-identical ceramide for stratum corneum lipid barrier replenishment.',
    coa_details: {
      lot_number: 'LOT-CER-20260425-HPLC',
      release_date: '2026-04-25',
      expiry_date: '2029-04-25',
      appearance: 'Serbuk putih halus kemurnian tinggi',
      assay_purity_pct: 99.4,
      melting_point_c: '102.0°C - 106.0°C',
      loss_on_drying_pct: 0.18,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.6
    },
    msds_details: {
      ghs_classification: 'Non-hazardous pure lipid',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P280: Gunakan sarung tangan lab.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Aman untuk kulit.',
      spill_procedure: 'Sapu dengan vakum lab HEPA filter.',
      handling_storage: 'Simpan pada suhu sejuk (2-8°C) di wadah nitrogen inert.',
      personal_protective_equipment: 'Sarung tangan nitril, masker partikulat.'
    }
  },
  {
    id: 'ing-12',
    inci_name: 'Phenoxyethanol (and) Ethylhexylglycerin',
    trade_name: 'Euxyl PE 9010 Preservative System',
    cas_number: '122-99-6 / 70445-33-9',
    functions: ['Preservative', 'Antimicrobial'],
    typical_min_pct: 0.5,
    typical_max_pct: 1.0,
    regulatory_max_pct: 1.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'RESTRICTED_MAX_LIMIT',
    estimated_cost_per_kg: 145000,
    currency: 'IDR',
    supplier: 'Schülke & Mayr GmbH',
    description: 'Broad-spectrum liquid cosmetic preservative. Max BPOM threshold strictly 1.0% Phenoxyethanol.',
    coa_details: {
      lot_number: 'LOT-PE9010-20260705',
      release_date: '2026-07-05',
      expiry_date: '2028-07-05',
      appearance: 'Cairan jernih tidak berwarna, aroma mawar samar',
      assay_purity_pct: 99.1,
      loss_on_drying_pct: 0.2,
      heavy_metals_ppm: '< 5 ppm (Fenol bebas: < 10 ppm)',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.2
    },
    msds_details: {
      ghs_classification: 'Acute Toxicity Oral Cat 4, Eye Damage Cat 1',
      signal_word: 'Danger',
      hazard_statements: ['H302: Berbahaya jika tertelan.', 'H318: Menyebabkan kerusakan mata berat.'],
      precautionary_statements: ['P280: Kenakan kacamata pengaman & sarung tangan.', 'P305+P351+P338: Bilas mata dengan seksama.'],
      first_aid_eye: 'Bilas segera dengan air mengalir minimal 15 menit, bawa ke dokter mata.',
      first_aid_skin: 'Lepas pakaian terkontaminasi, cuci kulit dengan air banyak.',
      spill_procedure: 'Bendung tumpahan dengan pasir, kumpulkan di drum limbah B3.',
      handling_storage: 'Simpan di tempat berventilasi baik, jauhkan dari zat oksidator kuat.',
      personal_protective_equipment: 'Goggles pelindung mata kedap zat kimia, sarung tangan nitril tebal.'
    }
  },
  {
    id: 'ing-13',
    inci_name: 'Centella Asiatica Extract',
    trade_name: 'Madecassoside Cica Pure Powder 95%',
    cas_number: '84696-21-9',
    functions: ['Active', 'Soothing', 'Anti-inflammatory'],
    typical_min_pct: 0.2,
    typical_max_pct: 2.0,
    regulatory_max_pct: 10.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 2400000,
    currency: 'IDR',
    supplier: 'Indena S.p.A. Italy',
    description: 'Purified botanical triterpenes for rapid redness reduction and collagen stimulation.',
    coa_details: {
      lot_number: 'LOT-CICA-20260519',
      release_date: '2026-05-19',
      expiry_date: '2029-05-19',
      appearance: 'Serbuk amorf putih krem',
      assay_purity_pct: 95.8,
      loss_on_drying_pct: 1.8,
      heavy_metals_ppm: '< 5 ppm (Pestisida residual: Undetected)',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.0
    },
    msds_details: {
      ghs_classification: 'Non-hazardous botanical extract',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P260: Hindari menghirup debu halus.'],
      first_aid_eye: 'Bilas dengan air bersih.',
      first_aid_skin: 'Cuci dengan air.',
      spill_procedure: 'Sapu perlahan ke kantong sampah.',
      handling_storage: 'Simpan pada suhu sejuk, wadah aluminium foil tersegel.',
      personal_protective_equipment: 'Masker debu, sarung tangan.'
    }
  },
  {
    id: 'ing-14',
    inci_name: 'Sodium Hyaluronate',
    trade_name: 'Multi-Molecular Hyacare 50 Biotech',
    cas_number: '9067-32-7',
    functions: ['Humectant', 'Deep hydrator'],
    typical_min_pct: 0.1,
    typical_max_pct: 0.5,
    regulatory_max_pct: 5.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 4200000,
    currency: 'IDR',
    supplier: 'Bloomage Biotech',
    description: 'Biotech-fermented hyaluronic acid delivering multi-depth skin hydration.',
    coa_details: {
      lot_number: 'LOT-HA-20260722',
      release_date: '2026-07-22',
      expiry_date: '2028-07-22',
      appearance: 'Serbuk putih higroskopis tanpa bau',
      assay_purity_pct: 99.3,
      loss_on_drying_pct: 6.5,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.8
    },
    msds_details: {
      ghs_classification: 'Non-hazardous bio-polymer',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P102: Jauhkan dari anak-anak.'],
      first_aid_eye: 'Bilas air.',
      first_aid_skin: 'Tidak berbahaya.',
      spill_procedure: 'Bahan menjadi sangat licin jika terkena air basah; sapu kering.',
      handling_storage: 'Simpan di tempat sangat kering, wadah tersegel silika.',
      personal_protective_equipment: 'Sarung tangan nitril.'
    }
  },
  {
    id: 'ing-15',
    inci_name: 'Carbomer',
    trade_name: 'Carbopol Ultrez 21 Polymer',
    cas_number: '9003-01-4',
    functions: ['Viscosity controlling', 'Emulsion stabilising'],
    typical_min_pct: 0.1,
    typical_max_pct: 0.6,
    regulatory_max_pct: 1.5,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 210000,
    currency: 'IDR',
    supplier: 'Lubrizol Advanced Materials',
    description: 'Self-wetting crosslinked polyacrylic acid rheology modifier for crystalline clear gels.',
    coa_details: {
      lot_number: 'LOT-CARB-20260611',
      release_date: '2026-06-11',
      expiry_date: '2029-06-11',
      appearance: 'Serbuk putih sangat ringan dan halus',
      assay_purity_pct: 99.2,
      loss_on_drying_pct: 0.8,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 3.0
    },
    msds_details: {
      ghs_classification: 'Eye Irritation Category 2B',
      signal_word: 'Warning',
      hazard_statements: ['H320: Menyebabkan iritasi mata ringan.'],
      precautionary_statements: ['P260: Jangan menghirup debu serbuk halus.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Cuci dengan sabun.',
      spill_procedure: 'Sapu hati-hati, hindari air karena akan mengembang menjadi gel licin.',
      handling_storage: 'Simpan di tempat kering dan sejuk.',
      personal_protective_equipment: 'Masker partikulat, kacamata safety.'
    }
  },
  // 2. Additional Actives & Soothers
  {
    id: 'ing-16',
    inci_name: 'Panthenol',
    trade_name: 'D-Panthenol 75W (Provitamin B5)',
    cas_number: '81-13-0',
    functions: ['Active', 'Humectant', 'Soothing'],
    typical_min_pct: 0.5,
    typical_max_pct: 3.0,
    regulatory_max_pct: 5.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 420000,
    currency: 'IDR',
    supplier: 'BASF Care Chemicals',
    description: 'Provitamin B5 deeply hydrates, reduces transepidermal water loss (TEWL) and calms irritated skin.',
    coa_details: {
      lot_number: 'LOT-PAN-20260530',
      release_date: '2026-05-30',
      expiry_date: '2028-05-30',
      appearance: 'Cairan kental jernih tak berwarna hingga kuning sangat muda',
      assay_purity_pct: 75.4,
      loss_on_drying_pct: 24.5,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Non-hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P102: Jauhkan dari jangkauan anak.'],
      first_aid_eye: 'Bilas air mengalir.',
      first_aid_skin: 'Tidak mengiritasi.',
      spill_procedure: 'Serap dengan kain lembab.',
      handling_storage: 'Simpan di tempat sejuk di bawah 25°C.',
      personal_protective_equipment: 'Sarung tangan lab.'
    }
  },
  {
    id: 'ing-17',
    inci_name: 'Allantoin',
    trade_name: 'Allantoin Pure USP/BP',
    cas_number: '97-59-6',
    functions: ['Active', 'Soothing', 'Skin protectant'],
    typical_min_pct: 0.1,
    typical_max_pct: 0.5,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 195000,
    currency: 'IDR',
    supplier: 'Clariant SE',
    description: 'Cell-proliferating soothing agent accelerating skin repair and reducing erythema.',
    coa_details: {
      lot_number: 'LOT-ALL-20260410',
      release_date: '2026-04-10',
      expiry_date: '2029-04-10',
      appearance: 'Serbuk kristal putih tidak berbau',
      assay_purity_pct: 99.5,
      melting_point_c: '225.0°C - 230.0°C',
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 5.0
    },
    msds_details: {
      ghs_classification: 'Non-hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P280: Kenakan sarung tangan.'],
      first_aid_eye: 'Bilas air.',
      first_aid_skin: 'Cuci sabun.',
      spill_procedure: 'Sapu serbuk ke wadah limbah.',
      handling_storage: 'Simpan di tempat kering.',
      personal_protective_equipment: 'Sarung tangan kerja.'
    }
  },
  {
    id: 'ing-18',
    inci_name: 'Tocopheryl Acetate',
    trade_name: 'Vitamin E Acetate 98% Oil',
    cas_number: '7695-91-2',
    functions: ['Antioxidant', 'Skin conditioning'],
    typical_min_pct: 0.2,
    typical_max_pct: 1.5,
    regulatory_max_pct: 5.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 280000,
    currency: 'IDR',
    supplier: 'DSM Nutritional Products',
    description: 'Stable lipid-soluble esterified Vitamin E protecting formula lipids from peroxidation.',
    rhlb_ow: 6.0,
    coa_details: {
      lot_number: 'LOT-VITE-20260819',
      release_date: '2026-08-19',
      expiry_date: '2028-08-19',
      appearance: 'Cairan kental kuning bening tidak berbau',
      assay_purity_pct: 98.4,
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.0
    },
    msds_details: {
      ghs_classification: 'Non-hazardous lipid',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P102: Jauhkan dari jangkauan anak.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Aman untuk kulit.',
      spill_procedure: 'Serap dengan kain lap atau serbuk gergaji.',
      handling_storage: 'Simpan dalam wadah kedap cahaya.',
      personal_protective_equipment: 'Sarung tangan.'
    }
  },
  {
    id: 'ing-19',
    inci_name: 'Butylene Glycol',
    trade_name: '1,3-Butanediol Cosmetic Grade',
    cas_number: '107-88-0',
    functions: ['Humectant', 'Solvent', 'Preservative booster'],
    typical_min_pct: 2.0,
    typical_max_pct: 8.0,
    regulatory_max_pct: 30.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 75000,
    currency: 'IDR',
    supplier: 'Oxea Chemicals / Daicel',
    description: 'Ultra-light humectant providing weightless silky slip without sticky tackiness.',
    coa_details: {
      lot_number: 'LOT-BG-20260614',
      release_date: '2026-06-14',
      expiry_date: '2028-06-14',
      appearance: 'Cairan jernih tak berwarna, aroma sangat lembut',
      assay_purity_pct: 99.8,
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.8
    },
    msds_details: {
      ghs_classification: 'Non-hazardous solvent',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P262: Jangan sampai terkena mata.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Cuci dengan air dan sabun.',
      spill_procedure: 'Bilas dengan air banyak.',
      handling_storage: 'Simpan di tempat berventilasi baik.',
      personal_protective_equipment: 'Kacamata kerja, sarung tangan.'
    }
  },
  {
    id: 'ing-20',
    inci_name: 'Simmondsia Chinensis (Jojoba) Seed Oil',
    trade_name: 'Golden Organic Jojoba Oil Cold Pressed',
    cas_number: '61789-91-1 / 90045-98-0',
    functions: ['Emollient', 'Skin conditioning'],
    typical_min_pct: 1.0,
    typical_max_pct: 5.0,
    regulatory_max_pct: 100.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 450000,
    currency: 'IDR',
    supplier: 'Desert Whale / Vantage',
    description: 'Liquid wax ester mimicking human sebum for superior barrier repair without clogging pores.',
    rhlb_ow: 6.5,
    coa_details: {
      lot_number: 'LOT-JOB-20260417',
      release_date: '2026-04-17',
      expiry_date: '2028-04-17',
      appearance: 'Cairan minyak kuning keemasan bening',
      assay_purity_pct: 99.5,
      loss_on_drying_pct: 0.08,
      heavy_metals_ppm: '< 1 ppm',
      microbial_alt: '< 20 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.2
    },
    msds_details: {
      ghs_classification: 'Non-hazardous plant oil',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P103: Baca label sebelum digunakan.'],
      first_aid_eye: 'Bilas air.',
      first_aid_skin: 'Tidak berbahaya.',
      spill_procedure: 'Serap dengan pasir atau kain.',
      handling_storage: 'Simpan pada suhu ruang terlindung cahaya.',
      personal_protective_equipment: 'Sarung tangan kerja.'
    }
  },
  {
    id: 'ing-21',
    inci_name: 'Caprylic/Capric Triglyceride',
    trade_name: 'Crodamol GTCC Neutral Emollient',
    cas_number: '73398-61-5 / 65381-09-1',
    functions: ['Emollient', 'Skin conditioning'],
    typical_min_pct: 2.0,
    typical_max_pct: 10.0,
    regulatory_max_pct: 100.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 85000,
    currency: 'IDR',
    supplier: 'Croda International Plc',
    description: 'Fractionated coconut ester with low viscosity, high spreadability and zero rancidity.',
    rhlb_ow: 11.0,
    coa_details: {
      lot_number: 'LOT-GTCC-20260711',
      release_date: '2026-07-11',
      expiry_date: '2028-07-11',
      appearance: 'Cairan minyak jernih encer tidak berwarna',
      assay_purity_pct: 99.3,
      loss_on_drying_pct: 0.05,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Non-hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P102: Jauhkan dari anak.'],
      first_aid_eye: 'Bilas air mengalir.',
      first_aid_skin: 'Aman untuk kulit.',
      spill_procedure: 'Taburi pasir atau serbuk absorben.',
      handling_storage: 'Simpan di tempat kering.',
      personal_protective_equipment: 'Sarung tangan.'
    }
  },
  {
    id: 'ing-22',
    inci_name: 'Butyrospermum Parkii (Shea Butter)',
    trade_name: 'Lipex Shea Refined Pure White',
    cas_number: '194043-92-0 / 91080-23-8',
    functions: ['Emollient', 'Skin conditioning'],
    typical_min_pct: 1.0,
    typical_max_pct: 6.0,
    regulatory_max_pct: 100.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 135000,
    currency: 'IDR',
    supplier: 'AAK Sweden',
    description: 'African shea tree butter rich in stearic/oleic fatty acids and unsaponifiables for dry skin relief.',
    rhlb_ow: 8.0,
    coa_details: {
      lot_number: 'LOT-SHB-20260601',
      release_date: '2026-06-01',
      expiry_date: '2028-06-01',
      appearance: 'Massa pasta padat mentega putih lembut',
      assay_purity_pct: 99.1,
      melting_point_c: '31.0°C - 38.0°C',
      loss_on_drying_pct: 0.12,
      heavy_metals_ppm: '< 3 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.0
    },
    msds_details: {
      ghs_classification: 'Non-hazardous plant fat',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P280: Gunakan sarung tangan.'],
      first_aid_eye: 'Bilas air.',
      first_aid_skin: 'Aman untuk kulit.',
      spill_procedure: 'Kikis padatan mentega tercecer.',
      handling_storage: 'Simpan di bawah 25°C agar tidak mencair.',
      personal_protective_equipment: 'Sarung tangan.'
    }
  },
  {
    id: 'ing-23',
    inci_name: 'Cetearyl Alcohol',
    trade_name: 'Lanette O (Cetyl/Stearyl Alcohol 50/50)',
    cas_number: '67762-27-0',
    functions: ['Emollient', 'Emulsifying', 'Viscosity controlling'],
    typical_min_pct: 1.0,
    typical_max_pct: 5.0,
    regulatory_max_pct: 20.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 49000,
    currency: 'IDR',
    supplier: 'BASF Care Chemicals',
    description: 'Classic fatty alcohol blend forming lamellar gel networks for rich cream viscosity.',
    rhlb_ow: 15.5,
    hlb_value: 15.5,
    coa_details: {
      lot_number: 'LOT-CTA-20260803',
      release_date: '2026-08-03',
      expiry_date: '2028-08-03',
      appearance: 'Pelet putih berlilin, aroma lemak sangat samar',
      assay_purity_pct: 99.2,
      melting_point_c: '49.0°C - 54.0°C',
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Non-hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P260: Hindari debu pelet.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Cuci dengan air.',
      spill_procedure: 'Sapu padatan ke wadah daur ulang.',
      handling_storage: 'Simpan di tempat kering.',
      personal_protective_equipment: 'Sarung tangan.'
    }
  },
  {
    id: 'ing-24',
    inci_name: 'Xanthan Gum',
    trade_name: 'Keltrol CG-T Transparent Grade',
    cas_number: '11138-66-2',
    functions: ['Viscosity controlling', 'Emulsion stabilising'],
    typical_min_pct: 0.1,
    typical_max_pct: 0.5,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 165000,
    currency: 'IDR',
    supplier: 'CP Kelco',
    description: 'Natural biopolymer rheology modifier offering pseudoplastic shear-thinning stability.',
    coa_details: {
      lot_number: 'LOT-XAN-20260528',
      release_date: '2026-05-28',
      expiry_date: '2029-05-28',
      appearance: 'Serbuk putih krem halus bebas bau asing',
      assay_purity_pct: 99.0,
      loss_on_drying_pct: 8.5,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 200 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 7.0
    },
    msds_details: {
      ghs_classification: 'Combustible dust hazard if aerosolized',
      signal_word: 'Warning',
      hazard_statements: ['H319: Iritasi mata ringan akibat debu mekanis.'],
      precautionary_statements: ['P260: Hindari menghirup debu serbuk gum.'],
      first_aid_eye: 'Bilas air.',
      first_aid_skin: 'Cuci air.',
      spill_procedure: 'Sapu dalam kondisi kering; sangat licin jika terkena air.',
      handling_storage: 'Simpan di tempat kering dan sejuk.',
      personal_protective_equipment: 'Masker debu, sarung tangan.'
    }
  },
  {
    id: 'ing-25',
    inci_name: 'Disodium EDTA',
    trade_name: 'Edeta BD High Purity Chelating Agent',
    cas_number: '139-33-3 / 6381-92-6',
    functions: ['Chelating', 'Viscosity controlling', 'Preservative booster'],
    typical_min_pct: 0.05,
    typical_max_pct: 0.2,
    regulatory_max_pct: 0.5,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 85000,
    currency: 'IDR',
    supplier: 'BASF Care Chemicals',
    description: 'Binds trace multivalent metal ions (Ca2+, Mg2+, Fe3+) preventing formula oxidation and turbidity.',
    coa_details: {
      lot_number: 'LOT-EDTA-20260702',
      release_date: '2026-07-02',
      expiry_date: '2030-07-02',
      appearance: 'Serbuk kristal putih tidak berbau',
      assay_purity_pct: 99.5,
      loss_on_drying_pct: 9.8,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 4.5
    },
    msds_details: {
      ghs_classification: 'Acute Toxicity Oral Cat 4',
      signal_word: 'Warning',
      hazard_statements: ['H302: Berbahaya jika tertelan.'],
      precautionary_statements: ['P264: Basuh tangan dengan seksama setelah penanganan.'],
      first_aid_eye: 'Bilas air.',
      first_aid_skin: 'Cuci sabun.',
      spill_procedure: 'Kumpulkan serbuk tanpa meniup debu.',
      handling_storage: 'Simpan dalam drum fiber tertutup.',
      personal_protective_equipment: 'Kacamata pelindung, sarung tangan lab.'
    }
  },
  {
    id: 'ing-26',
    inci_name: 'Sodium Hyaluronate',
    trade_name: 'HyaCare Micro (Oligo HA <10 kDa)',
    cas_number: '9067-32-7',
    functions: ['Humectant', 'Skin conditioning', 'Skin protecting'],
    typical_min_pct: 0.05,
    typical_max_pct: 0.5,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 5200000,
    currency: 'IDR',
    supplier: 'Evonik Industries AG',
    description: 'Fermentation-derived low molecular weight sodium hyaluronate with deep trans-epidermal penetration and multi-depth hydration.',
    coa_details: {
      lot_number: 'LOT-SH-20260715',
      release_date: '2026-07-15',
      expiry_date: '2028-07-15',
      appearance: 'Serbuk putih atau butiran halus putih',
      assay_purity_pct: 98.8,
      loss_on_drying_pct: 7.2,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative (E. coli, P. aeruginosa, S. aureus)',
      ph_solution_1pct: 6.7
    },
    msds_details: {
      ghs_classification: 'Non-hazardous according to GHS criteria',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P261: Hindari menghirup debu serbuk halus.'],
      first_aid_eye: 'Bilas dengan air bersih.',
      first_aid_skin: 'Basuh dengan air mengalir.',
      spill_procedure: 'Sapu kering; hindari kontak air karena membentuk gel sangat licin.',
      handling_storage: 'Simpan rapat di tempat kering bersuhu sejuk (2-8°C optimal) terlindung dari cahaya.',
      personal_protective_equipment: 'Masker pelindung partikel, sarung tangan nitril.'
    }
  },
  {
    id: 'ing-27',
    inci_name: 'Panthenol',
    trade_name: 'D-Panthenol USP 98% (Pro-Vitamin B5)',
    cas_number: '81-13-0',
    functions: ['Humectant', 'Antistatic', 'Skin conditioning'],
    typical_min_pct: 0.5,
    typical_max_pct: 5.0,
    regulatory_max_pct: 10.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 320000,
    currency: 'IDR',
    supplier: 'BASF Care Chemicals',
    description: 'Pro-vitamin of B5; penetrates deep into stratum corneum, promoting epithelization, wound healing, and moisture retention.',
    coa_details: {
      lot_number: 'LOT-PAN-20260601',
      release_date: '2026-06-01',
      expiry_date: '2029-06-01',
      appearance: 'Cairan kental jernih tidak berwarna hingga kuning pucat',
      assay_purity_pct: 99.1,
      loss_on_drying_pct: 0.4,
      heavy_metals_ppm: '< 10 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.2
    },
    msds_details: {
      ghs_classification: 'Not classified as hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P102: Jauhkan dari jangkauan anak-anak.'],
      first_aid_eye: 'Bilas dengan air mengalir jika terkena.',
      first_aid_skin: 'Cuci dengan air dan sabun bila terasa lengket.',
      spill_procedure: 'Serap dengan lap lembap atau absorbent kain.',
      handling_storage: 'Simpan pada suhu kamar (15-25°C) dalam wadah kedap udara.',
      personal_protective_equipment: 'Kacamata lab standar, sarung tangan.'
    }
  },
  {
    id: 'ing-28',
    inci_name: 'Tocopheryl Acetate',
    trade_name: 'dl-alpha Tocopheryl Acetate Pure USP',
    cas_number: '7695-91-2',
    functions: ['Antioxidant', 'Skin conditioning'],
    typical_min_pct: 0.2,
    typical_max_pct: 2.0,
    regulatory_max_pct: 5.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 280000,
    currency: 'IDR',
    supplier: 'DSM Nutritional Products',
    description: 'Stable esterified Vitamin E protecting cutaneous lipids against oxidative rancidity and free radical degradation.',
    rhlb_ow: 6.0,
    coa_details: {
      lot_number: 'LOT-TOC-20260805',
      release_date: '2026-08-05',
      expiry_date: '2029-08-05',
      appearance: 'Minyak kental jernih kuning kecokelatan praktis tidak berbau',
      assay_purity_pct: 98.5,
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Non-hazardous liquid',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P280: Gunakan sarung tangan pelindung.'],
      first_aid_eye: 'Bilas segera dengan air mengalir.',
      first_aid_skin: 'Cuci sisa minyak dengan sabun.',
      spill_procedure: 'Bahan berminyak; taburkan absorbent inert lalu kumpulkan.',
      handling_storage: 'Simpan terlindung dari udara dan sinar matahari langsung.',
      personal_protective_equipment: 'Sarung tangan nitril, pelindung mata.'
    }
  },
  {
    id: 'ing-29',
    inci_name: 'Salicylic Acid',
    trade_name: 'Salicylic Acid USP Pure Pharma Grade',
    cas_number: '69-72-7',
    functions: ['Active', 'Keratolytic', 'Sebum control', 'Anti-acne'],
    typical_min_pct: 0.5,
    typical_max_pct: 2.0,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'RESTRICTED_MAX_LIMIT',
    estimated_cost_per_kg: 195000,
    currency: 'IDR',
    supplier: 'Novacyl SAS',
    description: 'Lipophilic beta-hydroxy acid (BHA) that exfoliates inside pore lining. Strict BPOM maximum ceiling 2.0%.',
    coa_details: {
      lot_number: 'LOT-SAL-20260412',
      release_date: '2026-04-12',
      expiry_date: '2029-04-12',
      appearance: 'Kristal jarum putih halus, rasa manis asam',
      assay_purity_pct: 99.8,
      melting_point_c: '158.5°C - 161.0°C',
      loss_on_drying_pct: 0.15,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 3.1
    },
    msds_details: {
      ghs_classification: 'Acute Toxicity Oral Cat 4; Serious Eye Damage Cat 1',
      signal_word: 'Danger',
      hazard_statements: ['H302: Berbahaya jika tertelan.', 'H318: Menyebabkan kerusakan mata serius.'],
      precautionary_statements: ['P280: Pakai kacamata goggle rapat & sarung tangan kimia.', 'P305+P351+P338: Bilas mata seksama beberapa menit.'],
      first_aid_eye: 'Bilas segera dengan air mengalir selama minimal 15 menit, segera cari pertolongan medis.',
      first_aid_skin: 'Bilas dengan air mengalir dan sabun lembut.',
      spill_procedure: 'Sapu hati-hati menggunakan alat antistatik; hindari inhalasi serbuk.',
      handling_storage: 'Wadah kedap udara, simpan di area berventilasi baik jauh dari basa kuat.',
      personal_protective_equipment: 'Goggles pengaman mata, respirator debu P2, sarung tangan nitril tebal.'
    }
  },
  {
    id: 'ing-30',
    inci_name: 'Allantoin',
    trade_name: 'Allantoin Pure EP/USP',
    cas_number: '97-59-6',
    functions: ['Skin soothing', 'Skin protecting', 'Moisturizing'],
    typical_min_pct: 0.1,
    typical_max_pct: 0.5,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 145000,
    currency: 'IDR',
    supplier: 'Akema Fine Chemicals',
    description: 'Heterocyclic organic compound promoting tissue regeneration, cellular proliferation, and anti-irritant soothing effects.',
    coa_details: {
      lot_number: 'LOT-ALL-20260718',
      release_date: '2026-07-18',
      expiry_date: '2030-07-18',
      appearance: 'Serbuk kristal putih tidak berbau',
      assay_purity_pct: 99.4,
      melting_point_c: '228.0°C - 232.0°C (dekomposisi)',
      loss_on_drying_pct: 0.2,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 5.5
    },
    msds_details: {
      ghs_classification: 'Not classified as hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P261: Hindari menghirup debu serbuk berlebih.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Aman untuk kulit; bilas jika diperlukan.',
      spill_procedure: 'Sapu atau gunakan vacuum debu filtrasi HEPA.',
      handling_storage: 'Simpan di tempat kering dan sejuk, hindari kelembapan tinggi.',
      personal_protective_equipment: 'Kacamata debu dan masker partikulat standar.'
    }
  },
  {
    id: 'ing-31',
    inci_name: 'Dimethicone',
    trade_name: 'Xiameter PMX-200 Silicone Fluid 350 cSt',
    cas_number: '63148-62-9 / 9006-65-9',
    functions: ['Emollient', 'Skin protecting', 'Slip modifier'],
    typical_min_pct: 1.0,
    typical_max_pct: 5.0,
    regulatory_max_pct: 20.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 125000,
    currency: 'IDR',
    supplier: 'Dow Corning / Dow Silicones',
    description: 'Synthetic polydimethylsiloxane fluid providing exceptional slip, spreadability, and velvety non-comedogenic barrier.',
    rhlb_ow: 11.0,
    coa_details: {
      lot_number: 'LOT-DIM-20260520',
      release_date: '2026-05-20',
      expiry_date: '2029-05-20',
      appearance: 'Cairan kental jernih tak berwarna, bebas partikel melayang',
      assay_purity_pct: 99.9,
      loss_on_drying_pct: 0.05,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.8
    },
    msds_details: {
      ghs_classification: 'Non-hazardous liquid',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P210: Jauhkan dari panas dan percikan api.'],
      first_aid_eye: 'Bilas dengan air mengalir selama beberapa menit.',
      first_aid_skin: 'Cuci dengan air dan sabun pembersih lemak.',
      spill_procedure: 'Sangat licin; lap dengan serbuk absorben mineral atau pelindung tumpahan silikon.',
      handling_storage: 'Simpan di wadah rapat bersuhu kamar.',
      personal_protective_equipment: 'Sarung tangan pelindung dan sepatu sol anti-slip.'
    }
  },
  {
    id: 'ing-32',
    inci_name: 'Caprylic/Capric Triglyceride',
    trade_name: 'Tegosoft CT (Fractionated Coconut Ester)',
    cas_number: '73398-61-5 / 65381-09-1',
    functions: ['Emollient', 'Skin conditioning', 'Solvent for Actives'],
    typical_min_pct: 2.0,
    typical_max_pct: 15.0,
    regulatory_max_pct: 100.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 82000,
    currency: 'IDR',
    supplier: 'Evonik Nutrition & Care GmbH',
    description: 'Plant-derived neutral medium-chain triglyceride ester offering lightweight silky non-greasy cushion and excellent solubilizing power for lipid actives.',
    rhlb_ow: 11.0,
    coa_details: {
      lot_number: 'LOT-CCT-20260630',
      release_date: '2026-06-30',
      expiry_date: '2028-06-30',
      appearance: 'Cairan minyak jernih kuning sangat pucat berbau netral',
      assay_purity_pct: 99.3,
      loss_on_drying_pct: 0.05,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.6
    },
    msds_details: {
      ghs_classification: 'Not classified as hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P103: Baca informasi teknis sebelum digunakan.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Aman untuk kulit.',
      spill_procedure: 'Serap tumpahan dengan absorbent pasir atau lap kain kering.',
      handling_storage: 'Simpan rapat dalam drum di ruang sejuk berventilasi.',
      personal_protective_equipment: 'Sarung tangan nitril standar lab.'
    }
  },
  {
    id: 'ing-33',
    inci_name: 'Butylene Glycol',
    trade_name: '1,3-Butanediol High Purity Cosmetic Grade',
    cas_number: '107-88-0',
    functions: ['Humectant', 'Solvent', 'Skin conditioning'],
    typical_min_pct: 1.0,
    typical_max_pct: 8.0,
    regulatory_max_pct: 30.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 68000,
    currency: 'IDR',
    supplier: 'Oxea Chemicals / Daicel',
    description: 'Four-carbon dihydric alcohol offering humectant hydration, antimicrobial preservation synergy, and lighter non-sticky tactile feel than glycerin.',
    coa_details: {
      lot_number: 'LOT-BG-20260708',
      release_date: '2026-07-08',
      expiry_date: '2029-07-08',
      appearance: 'Cairan kental jernih transparan tidak berbau',
      assay_purity_pct: 99.8,
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.8
    },
    msds_details: {
      ghs_classification: 'Non-hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P262: Hindari kontak langsung dengan mata.'],
      first_aid_eye: 'Bilas air selama beberapa menit.',
      first_aid_skin: 'Cuci dengan air.',
      spill_procedure: 'Keringkan dengan pel atau kain absorben.',
      handling_storage: 'Simpan rapat terhindar dari uap air kelembapan tinggi.',
      personal_protective_equipment: 'Kacamata keselamatan kerja, sarung tangan.'
    }
  },
  {
    id: 'ing-34',
    inci_name: 'Zinc Oxide',
    trade_name: 'Z-Cote Micronized Non-Nano USP Grade',
    cas_number: '1314-13-2',
    functions: ['Skin protecting', 'UV filter', 'Soothing'],
    typical_min_pct: 1.0,
    typical_max_pct: 10.0,
    regulatory_max_pct: 25.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 190000,
    currency: 'IDR',
    supplier: 'BASF Sun Care',
    description: 'Mineral physical broad-spectrum UV reflector and soothing agent for compromised or reactive barrier skin.',
    coa_details: {
      lot_number: 'LOT-ZO-20260425',
      release_date: '2026-04-25',
      expiry_date: '2031-04-25',
      appearance: 'Serbuk amorf putih halus tidak berbau',
      assay_purity_pct: 99.5,
      loss_on_drying_pct: 0.3,
      heavy_metals_ppm: '< 10 ppm (As < 3 ppm, Pb < 10 ppm)',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 7.2
    },
    msds_details: {
      ghs_classification: 'Aquatic Chronic Toxicity Cat 1',
      signal_word: 'Warning',
      hazard_statements: ['H410: Sangat toksik bagi kehidupan perairan dengan efek jangka panjang.'],
      precautionary_statements: ['P273: Hindari pelepasan serbuk ke lingkungan/saluran air.', 'P391: Kumpulkan tumpahan padatan.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Basuh dengan air dan sabun.',
      spill_procedure: 'Sapu hati-hati serbuk ke kantong limbah kimia khusus; jangan dibilas ke selokan.',
      handling_storage: 'Simpan tertutup rapat di tempat berventilasi baik.',
      personal_protective_equipment: 'Masker partikel FFP2/N95, sarung tangan nitril, pelindung mata.'
    }
  },
  {
    id: 'ing-35',
    inci_name: 'Potassium Sorbate',
    trade_name: 'Potassium Sorbate Granular FCC/USP',
    cas_number: '24634-61-5',
    functions: ['Preservative', 'Antimicrobial'],
    typical_min_pct: 0.1,
    typical_max_pct: 0.3,
    regulatory_max_pct: 0.6,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 78000,
    currency: 'IDR',
    supplier: 'Celanese Food Protection',
    description: 'Organic acid salt active against mold, yeast, and fungal proliferation in formulations buffered at pH < 5.5.',
    coa_details: {
      lot_number: 'LOT-KS-20260619',
      release_date: '2026-06-19',
      expiry_date: '2028-06-19',
      appearance: 'Butiran atau serbuk kristal putih kekuningan',
      assay_purity_pct: 99.2,
      loss_on_drying_pct: 0.6,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 8.5
    },
    msds_details: {
      ghs_classification: 'Eye Irritation Cat 2',
      signal_word: 'Warning',
      hazard_statements: ['H319: Menyebabkan iritasi mata serius.'],
      precautionary_statements: ['P264: Cuci tangan setelah penanganan.', 'P280: Kenakan pelindung mata.'],
      first_aid_eye: 'Bilas segera dengan air mengalir selama beberapa menit.',
      first_aid_skin: 'Cuci dengan air dan sabun.',
      spill_procedure: 'Sapu padatan granul ke wadah penampung limbah kering.',
      handling_storage: 'Simpan dalam kantong tersegel di tempat kering dan sejuk, hindari kelembapan.',
      personal_protective_equipment: 'Kacamata safety, sarung tangan karet/nitril.'
    }
  },
  {
    id: 'ing-36',
    inci_name: 'Citric Acid',
    trade_name: 'Citric Acid Anhydrous USP/FCC',
    cas_number: '77-92-9',
    functions: ['pH adjuster', 'Acid', 'Buffering', 'Chelating'],
    typical_min_pct: 0.05,
    typical_max_pct: 0.5,
    regulatory_max_pct: 5.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 35000,
    currency: 'IDR',
    supplier: 'Jungbunzlauer Suisse AG',
    description: 'Organic tricarboxylic acid used as pH adjuster to lower and buffer acidic cosmetic formulations to skin physiological pH 5.0-5.5.',
    coa_details: {
      lot_number: 'LOT-CA-20260822',
      release_date: '2026-08-22',
      expiry_date: '2029-08-22',
      appearance: 'Kristal putih tidak berwarna atau serbuk granul halus',
      assay_purity_pct: 99.8,
      melting_point_c: '153.0°C - 154.5°C',
      loss_on_drying_pct: 0.15,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 2.2
    },
    msds_details: {
      ghs_classification: 'Eye Irritation Cat 2; Skin Irritation Cat 3',
      signal_word: 'Warning',
      hazard_statements: ['H319: Menyebabkan iritasi mata serius.'],
      precautionary_statements: ['P280: Kenakan pelindung mata dan sarung tangan.', 'P305+P351: Bilas dengan air jika kontak mata.'],
      first_aid_eye: 'Bilas segera dengan air mengalir minimal 15 menit.',
      first_aid_skin: 'Cuci dengan air dan sabun.',
      spill_procedure: 'Sapu hati-hati lalu netralkan residu dengan larutan sodium bikarbonat encer.',
      handling_storage: 'Simpan di tempat kering dan sejuk terhindar dari uap basah.',
      personal_protective_equipment: 'Kacamata keselamatan lab, sarung tangan nitril, masker debu.'
    }
  },
  {
    id: 'ing-37',
    inci_name: 'Lactic Acid',
    trade_name: 'Purac HiPure 90 (L-Lactic Acid 88% Natural)',
    cas_number: '79-33-4',
    functions: ['pH adjuster', 'Acid', 'Humectant', 'Exfoliant', 'Buffering'],
    typical_min_pct: 0.1,
    typical_max_pct: 2.0,
    regulatory_max_pct: 10.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 88000,
    currency: 'IDR',
    supplier: 'Corbion Purac',
    description: 'Natural alpha-hydroxy acid (AHA) and Natural Moisturizing Factor (NMF) component for pH buffering, barrier hydration, and gentle keratolysis.',
    coa_details: {
      lot_number: 'LOT-LA-20260719',
      release_date: '2026-07-19',
      expiry_date: '2028-07-19',
      appearance: 'Cairan kental jernih hampir tidak berwarna, berbau asam khas ringan',
      assay_purity_pct: 88.5,
      loss_on_drying_pct: 11.2,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 2.0
    },
    msds_details: {
      ghs_classification: 'Skin Corrosion Cat 1C; Eye Damage Cat 1',
      signal_word: 'Danger',
      hazard_statements: ['H314: Menyebabkan luka bakar kulit yang parah dan kerusakan mata.'],
      precautionary_statements: ['P280: Pakai sarung tangan pelindung/pakaian pelindung/pelindung mata.', 'P301+P330: Jika tertelan, basuh mulut.'],
      first_aid_eye: 'Bilas segera dengan air mengalir selama minimal 15 menit dan segera hubungi dokter.',
      first_aid_skin: 'Lepas pakaian terkontaminasi dan bilas kulit dengan air banyak.',
      spill_procedure: 'Netralkan tumpahan dengan kapur tohor atau soda kue lalu serap dengan pasir.',
      handling_storage: 'Wadah HDPE tertutup rapat di tempat berventilasi baik.',
      personal_protective_equipment: 'Pelindung wajah/goggles, sarung tangan karet kimia, celemek lab PVC.'
    }
  },
  {
    id: 'ing-38',
    inci_name: 'Triethanolamine',
    trade_name: 'TEA Pure 99% Cosmetic Grade',
    cas_number: '102-71-6',
    functions: ['pH adjuster', 'Neutralizer', 'Buffering'],
    typical_min_pct: 0.1,
    typical_max_pct: 1.0,
    regulatory_max_pct: 2.5,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'RESTRICTED_MAX_LIMIT',
    estimated_cost_per_kg: 58000,
    currency: 'IDR',
    supplier: 'Dow Chemical Company',
    description: 'Organic tertiary amine used as an alkaline neutralizer for Carbomer gel networks and acidic actives to reach target pH 5.5 - 6.5.',
    coa_details: {
      lot_number: 'LOT-TEA-20260815',
      release_date: '2026-08-15',
      expiry_date: '2028-08-15',
      appearance: 'Cairan kental jernih tidak berwarna hingga kuning sangat pucat',
      assay_purity_pct: 99.4,
      loss_on_drying_pct: 0.2,
      heavy_metals_ppm: '< 2 ppm (Bebas nitrosamin < 50 ppb)',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 10.5
    },
    msds_details: {
      ghs_classification: 'Eye Irritation Cat 2A',
      signal_word: 'Warning',
      hazard_statements: ['H319: Menyebabkan iritasi mata serius.'],
      precautionary_statements: ['P280: Gunakan sarung tangan dan pelindung mata.', 'P305+P351: Bilas jika kontak mata.'],
      first_aid_eye: 'Bilas segera dengan air mengalir selama 15 menit.',
      first_aid_skin: 'Cuci bersih dengan air dan sabun.',
      spill_procedure: 'Cairan kental licin; serap dengan bahan absorben inert.',
      handling_storage: 'Simpan di atas 15°C agar tidak membeku, jauhkan dari agen pengoksidasi dan nitrit.',
      personal_protective_equipment: 'Sarung tangan nitril, pelindung mata keselamatan.'
    }
  },
  {
    id: 'ing-39',
    inci_name: 'Sodium Hydroxide',
    trade_name: 'Caustic Soda Micropearls 10% Sol Pre-diluted',
    cas_number: '1310-73-2',
    functions: ['pH adjuster', 'Alkalizing agent', 'Buffering'],
    typical_min_pct: 0.05,
    typical_max_pct: 0.5,
    regulatory_max_pct: 1.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 24000,
    currency: 'IDR',
    supplier: 'Asahimas Chemical',
    description: 'Strong inorganic base solution for precise micro-adjustment of formula pH upwards without introducing amine impurities.',
    coa_details: {
      lot_number: 'LOT-NAOH-20260710',
      release_date: '2026-07-10',
      expiry_date: '2028-07-10',
      appearance: 'Cairan jernih transparan tidak berwarna',
      assay_purity_pct: 10.05,
      loss_on_drying_pct: 89.8,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 12.8
    },
    msds_details: {
      ghs_classification: 'Skin Corrosion Cat 1A; Eye Damage Cat 1',
      signal_word: 'Danger',
      hazard_statements: ['H314: Menyebabkan luka bakar kulit yang parah dan kerusakan mata.'],
      precautionary_statements: ['P280: Kenakan pakaian pelindung kimia, sarung tangan, dan kacamata.'],
      first_aid_eye: 'Bilas dengan air mengalir segera minimal 20 menit, rujuk ke IGD.',
      first_aid_skin: 'Basuh segera dengan air mengalir dalam jumlah besar.',
      spill_procedure: 'Netralkan secara bertahap dengan asam asetat encer lalu bilas.',
      handling_storage: 'Simpan dalam tangki polietilena tertutup rapat, hindari kontak aluminium.',
      personal_protective_equipment: 'Sarung tangan neoprene/nitril tebal, face shield, apron lab.'
    }
  },
  {
    id: 'ing-40',
    inci_name: 'Simethicone',
    trade_name: 'Xiameter AFE-0310 Antifoam Emulsion 30%',
    cas_number: '8050-81-5',
    functions: ['Anti-foaming', 'Defoamer', 'Skin protecting'],
    typical_min_pct: 0.02,
    typical_max_pct: 0.2,
    regulatory_max_pct: 1.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 175000,
    currency: 'IDR',
    supplier: 'Dow Silicones Corporation',
    description: 'Silicone anti-foaming emulsion specifically formulated to eliminate air entrapment and micro-bubbles during high-shear vacuum homogenization.',
    coa_details: {
      lot_number: 'LOT-SIM-20260530',
      release_date: '2026-05-30',
      expiry_date: '2028-05-30',
      appearance: 'Emulsi cairan putih susu homogen',
      assay_purity_pct: 30.2,
      loss_on_drying_pct: 69.5,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Not classified as hazardous according to GHS',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P103: Baca informasi teknis sebelum digunakan.'],
      first_aid_eye: 'Bilas air mengalir jika terkena mata.',
      first_aid_skin: 'Basuh dengan air dan sabun.',
      spill_procedure: 'Permukaan akan sangat licin; lap dengan serbuk gergaji atau pasir kering.',
      handling_storage: 'Simpan pada suhu 5-35°C, hindari pembekuan.',
      personal_protective_equipment: 'Kacamata keselamatan dan sarung tangan standar.'
    }
  },
  {
    id: 'ing-41',
    inci_name: 'Hydroxyethylcellulose',
    trade_name: 'Natrosol 250 HHR High Viscosity Grade',
    cas_number: '9004-62-0',
    functions: ['Viscosity enhancer', 'Thickener', 'Emulsion stabilising', 'Film forming'],
    typical_min_pct: 0.2,
    typical_max_pct: 1.5,
    regulatory_max_pct: 5.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 210000,
    currency: 'IDR',
    supplier: 'Ashland Specialty Ingredients',
    description: 'Non-ionic water-soluble polymer derived from natural cellulose, providing robust viscosity enhancement, crystal-clear gels, and broad pH tolerance (3.0 - 10.0).',
    coa_details: {
      lot_number: 'LOT-HEC-20260614',
      release_date: '2026-06-14',
      expiry_date: '2029-06-14',
      appearance: 'Serbuk butiran putih hingga krem kekuningan bebas bau',
      assay_purity_pct: 99.1,
      loss_on_drying_pct: 3.8,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 100 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.8
    },
    msds_details: {
      ghs_classification: 'Combustible dust hazard if finely dispersed in air',
      signal_word: 'Warning',
      hazard_statements: ['H319: Debu mekanis dapat menyebabkan iritasi mata ringan.'],
      precautionary_statements: ['P261: Hindari menghirup debu serbuk polimer.'],
      first_aid_eye: 'Bilas segera dengan air mengalir.',
      first_aid_skin: 'Cuci dengan air mengalir.',
      spill_procedure: 'Sapu kering; hindari pemakaian air langsung karena membentuk lapisan sangat licin.',
      handling_storage: 'Simpan di tempat kering dan sejuk dalam kantong tertutup rapat.',
      personal_protective_equipment: 'Masker debu partikulat, kacamata safety, sarung tangan.'
    }
  },
  {
    id: 'ing-42',
    inci_name: 'Acrylates/C10-30 Alkyl Acrylate Crosspolymer',
    trade_name: 'Pemulen TR-2 Polymeric Emulsifier',
    cas_number: '176429-87-1',
    functions: ['Viscosity enhancer', 'Emulsifying', 'Thickener', 'Stabilizer'],
    typical_min_pct: 0.1,
    typical_max_pct: 0.6,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 340000,
    currency: 'IDR',
    supplier: 'Lubrizol Advanced Materials',
    description: 'High-efficiency polymeric emulsifier and rheology modifier forming quick-break fresh textures capable of electrosteric emulsion stabilization without traditional surfactants.',
    coa_details: {
      lot_number: 'LOT-PEM-20260705',
      release_date: '2026-07-05',
      expiry_date: '2029-07-05',
      appearance: 'Serbuk putih sangat halus dengan bau asam asetat samar',
      assay_purity_pct: 99.2,
      loss_on_drying_pct: 1.2,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 3.2
    },
    msds_details: {
      ghs_classification: 'Eye Irritation Cat 2B',
      signal_word: 'Warning',
      hazard_statements: ['H320: Menyebabkan iritasi mata ringan.'],
      precautionary_statements: ['P260: Hindari menghirup debu halus.'],
      first_aid_eye: 'Bilas hati-hati dengan air mengalir.',
      first_aid_skin: 'Cuci dengan air.',
      spill_procedure: 'Kumpulkan dengan vacuum cleaner industri filtrasi HEPA.',
      handling_storage: 'Simpan di area kering berventilasi, hindari kelembapan.',
      personal_protective_equipment: 'Respirator partikel N95, sarung tangan pelindung debu.'
    }
  },
  {
    id: 'ing-43',
    inci_name: 'CI 77891 (Titanium Dioxide)',
    trade_name: 'Hombitan AFDC Pure White Cosmetic Pigment',
    cas_number: '13463-67-7',
    functions: ['Coloring agent', 'Pigment agent', 'Opacifying'],
    typical_min_pct: 0.1,
    typical_max_pct: 5.0,
    regulatory_max_pct: 25.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 95000,
    currency: 'IDR',
    supplier: 'Venator Pigments Germany',
    description: 'High-purity anatase cosmetic grade white pigment offering superior opacity, brightness, and masking power for lotion and cream formulations.',
    coa_details: {
      lot_number: 'LOT-TIO2-20260618',
      release_date: '2026-06-18',
      expiry_date: '2031-06-18',
      appearance: 'Serbuk putih amorf sangat halus dan tidak berbau',
      assay_purity_pct: 99.6,
      loss_on_drying_pct: 0.3,
      heavy_metals_ppm: '< 10 ppm (Pb < 2 ppm, As < 1 ppm, Hg < 1 ppm)',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 7.0
    },
    msds_details: {
      ghs_classification: 'Carcinogenicity Cat 2 (Inhalation of ultrafine dust)',
      signal_word: 'Warning',
      hazard_statements: ['H351: Diduga menyebabkan kanker bila terhirup dalam bentuk debu respirabel.'],
      precautionary_statements: ['P260: Jangan menghirup debu pigmen.', 'P284: Kenakan alat pelindung pernapasan.'],
      first_aid_eye: 'Bilas dengan air mengalir selama beberapa menit.',
      first_aid_skin: 'Cuci dengan air dan sabun pembersih.',
      spill_procedure: 'Sapu hati-hati dengan lap lembap; hindari timbulnya awan debu kering.',
      handling_storage: 'Wadah tersegel rapat di area bebas debu berangin.',
      personal_protective_equipment: 'Masker respirator partikulat P3/N95, sarung tangan nitril, kacamata goggle.'
    }
  },
  {
    id: 'ing-44',
    inci_name: 'CI 77491 (Iron Oxides Red)',
    trade_name: 'Unipure Red LC 381 Purified Mineral Pigment',
    cas_number: '1309-37-1',
    functions: ['Coloring agent', 'Pigment agent'],
    typical_min_pct: 0.01,
    typical_max_pct: 1.0,
    regulatory_max_pct: 10.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 145000,
    currency: 'IDR',
    supplier: 'Sensient Cosmetic Technologies',
    description: 'Pure synthetic red iron oxide pigment for shade adjusting, imparting warm natural skin tones, and tinting skin care emulsions.',
    coa_details: {
      lot_number: 'LOT-FE-20260512',
      release_date: '2026-05-12',
      expiry_date: '2031-05-12',
      appearance: 'Serbuk merah bata halus tidak berbau',
      assay_purity_pct: 98.9,
      loss_on_drying_pct: 0.4,
      heavy_metals_ppm: '< 10 ppm (As < 3 ppm, Pb < 10 ppm)',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Not classified as hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P261: Hindari kontak debu dengan mata.'],
      first_aid_eye: 'Bilas air mengalir.',
      first_aid_skin: 'Cuci dengan sabun.',
      spill_procedure: 'Sapu atau gunakan lap lembap agar warna tidak menyebar.',
      handling_storage: 'Simpan di tempat kering.',
      personal_protective_equipment: 'Sarung tangan kerja dan kacamata debu.'
    }
  },
  {
    id: 'ing-45',
    inci_name: 'Mica (and) Titanium Dioxide',
    trade_name: 'Timiron Splendid Gold Pearlescent Pigment',
    cas_number: '12001-26-2 / 13463-67-7',
    functions: ['Pigment agent', 'Coloring agent', 'Opacifying'],
    typical_min_pct: 0.1,
    typical_max_pct: 2.0,
    regulatory_max_pct: 10.0,
    halal_status: 'HALAL_EXEMPT',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 380000,
    currency: 'IDR',
    supplier: 'Merck KGaA Performance Materials',
    description: 'Natural mineral mica platelets coated with titanium dioxide providing shimmering radiance, soft-focus luminous glow, and visual luxury.',
    coa_details: {
      lot_number: 'LOT-MICA-20260420',
      release_date: '2026-04-20',
      expiry_date: '2031-04-20',
      appearance: 'Serbuk kilau mutiara halus berwarna keemasan',
      assay_purity_pct: 99.0,
      loss_on_drying_pct: 0.2,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 7.5
    },
    msds_details: {
      ghs_classification: 'Non-hazardous mineral powder',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P260: Hindari menghirup debu mineral.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Cuci dengan air.',
      spill_procedure: 'Sapu perlahan dengan lap lembap.',
      handling_storage: 'Simpan dalam kantong tersegel di tempat kering.',
      personal_protective_equipment: 'Masker debu partikulat dan kacamata safety.'
    }
  },
  {
    id: 'ing-46',
    inci_name: 'Vanilla Planifolia Fruit Extract',
    trade_name: 'Pure Madagascar Bourbon Vanilla Flavoring',
    cas_number: '84650-63-5',
    functions: ['Flavoring agent', 'Masking', 'Skin conditioning'],
    typical_min_pct: 0.05,
    typical_max_pct: 0.5,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 620000,
    currency: 'IDR',
    supplier: 'Symrise Flavor & Nutrition',
    description: 'Natural food & cosmetic-grade aromatic bean extract masking chemical base odors while imparting subtle warm sensory comfort.',
    coa_details: {
      lot_number: 'LOT-VAN-20260625',
      release_date: '2026-06-25',
      expiry_date: '2028-06-25',
      appearance: 'Cairan kental cokelat tua beraroma vanili manis khas',
      assay_purity_pct: 98.2,
      loss_on_drying_pct: 12.5,
      heavy_metals_ppm: '< 3 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 5.2
    },
    msds_details: {
      ghs_classification: 'Not classified as hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P102: Jauhkan dari jangkauan anak-anak.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Aman untuk kulit.',
      spill_procedure: 'Serap dengan lap lembap.',
      handling_storage: 'Simpan di tempat sejuk terhindar dari panas dan cahaya kuat.',
      personal_protective_equipment: 'Sarung tangan lab standar.'
    }
  },
  {
    id: 'ing-47',
    inci_name: 'Mentha Piperita (Peppermint) Oil',
    trade_name: 'Peppermint Essential Oil Triple Rectified',
    cas_number: '8006-90-4 / 84082-70-2',
    functions: ['Flavoring agent', 'Cooling', 'Fragrance', 'Tonic'],
    typical_min_pct: 0.02,
    typical_max_pct: 0.3,
    regulatory_max_pct: 1.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 480000,
    currency: 'IDR',
    supplier: 'Givaudan Fragrances',
    description: 'Pure rectified peppermint essential oil rich in natural menthol, providing an invigorating crisp flavor, fresh aroma, and cooling tingling sensation.',
    coa_details: {
      lot_number: 'LOT-PEP-20260701',
      release_date: '2026-07-01',
      expiry_date: '2028-07-01',
      appearance: 'Cairan minyak jernih kuning pucat kehijauan berbau mint segar tajam',
      assay_purity_pct: 99.0,
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 2 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.2
    },
    msds_details: {
      ghs_classification: 'Flammable Liquid Cat 4; Skin Sensitisation Cat 1',
      signal_word: 'Warning',
      hazard_statements: ['H317: Dapat menyebabkan reaksi alergi kulit.'],
      precautionary_statements: ['P280: Kenakan sarung tangan pelindung.', 'P333+P313: Jika terjadi iritasi kulit, cari bantuan medis.'],
      first_aid_eye: 'Bilas segera dengan air mengalir minimal 15 menit.',
      first_aid_skin: 'Cuci dengan sabun dan air mengalir.',
      spill_procedure: 'Cairan aromatik menyengat; serap dengan pasir dan buang di wadah tertutup.',
      handling_storage: 'Simpan di bawah 25°C dalam botol kaca gelap tertutup rapat.',
      personal_protective_equipment: 'Sarung tangan nitril, pelindung mata.'
    }
  },
  {
    id: 'ing-48',
    inci_name: 'Propylene Glycol',
    trade_name: 'Propylene Glycol USP/EP Ultra-Pure Grade',
    cas_number: '57-55-6',
    functions: ['Solvent', 'Humectant', 'Viscosity controlling', 'Carrier'],
    typical_min_pct: 1.0,
    typical_max_pct: 10.0,
    regulatory_max_pct: 50.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 42000,
    currency: 'IDR',
    supplier: 'LyondellBasell Industries',
    description: 'High-purity dihydroxy alcohol solvent and humectant that enhances penetration of lipid-insoluble actives while preventing emulsion freeze crystallization.',
    coa_details: {
      lot_number: 'LOT-PG-20260803',
      release_date: '2026-08-03',
      expiry_date: '2029-08-03',
      appearance: 'Cairan kental jernih transparan tidak berbau, higroskopis',
      assay_purity_pct: 99.8,
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 1 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.8
    },
    msds_details: {
      ghs_classification: 'Not classified as hazardous',
      signal_word: 'None (Non-hazardous)',
      hazard_statements: ['None'],
      precautionary_statements: ['P262: Hindari kontak mata langsung.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Cuci dengan air.',
      spill_procedure: 'Keringkan dengan pel atau serap dengan absorbent standar.',
      handling_storage: 'Simpan dalam drum stainless steel atau HDPE di tempat kering.',
      personal_protective_equipment: 'Kacamata kerja, sarung tangan lab.'
    }
  },
  {
    id: 'ing-49',
    inci_name: 'Ascorbic Acid',
    trade_name: 'Quali-C L-Ascorbic Acid Ultra-Fine Powder USP',
    cas_number: '50-81-7',
    functions: ['Antioxidant', 'Skin conditioning', 'Skin brightening'],
    typical_min_pct: 0.5,
    typical_max_pct: 15.0,
    regulatory_max_pct: 20.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 260000,
    currency: 'IDR',
    supplier: 'DSM Nutritional Products Scotland',
    description: 'Gold-standard biologically active Vitamin C; powerful scavenger of reactive oxygen species (ROS), collagen synthesis booster, and melanin inhibitor.',
    coa_details: {
      lot_number: 'LOT-AA-20260608',
      release_date: '2026-06-08',
      expiry_date: '2028-06-08',
      appearance: 'Serbuk kristal putih atau kuning sangat pucat tidak berbau',
      assay_purity_pct: 99.7,
      melting_point_c: '190.0°C - 192.0°C',
      loss_on_drying_pct: 0.1,
      heavy_metals_ppm: '< 3 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 2.5
    },
    msds_details: {
      ghs_classification: 'Eye Irritation Cat 2A',
      signal_word: 'Warning',
      hazard_statements: ['H319: Menyebabkan iritasi mata akibat keasaman serbuk.'],
      precautionary_statements: ['P280: Gunakan kacamata pelindung dan sarung tangan.'],
      first_aid_eye: 'Bilas segera dengan air mengalir minimal 15 menit.',
      first_aid_skin: 'Bilas dengan air mengalir.',
      spill_procedure: 'Sapu padatan kering tanpa menimbulkan kepulan debu.',
      handling_storage: 'Simpan dalam wadah kedap udara terlindung dari kelembapan, udara, dan cahaya.',
      personal_protective_equipment: 'Masker debu partikulat, kacamata pelindung, sarung tangan nitril.'
    }
  },
  {
    id: 'ing-50',
    inci_name: 'BHT',
    trade_name: 'Butylated Hydroxytoluene Pharma Grade NF/FCC',
    cas_number: '128-37-0',
    functions: ['Antioxidant', 'Stabilizer'],
    typical_min_pct: 0.01,
    typical_max_pct: 0.1,
    regulatory_max_pct: 0.5,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'RESTRICTED_MAX_LIMIT',
    estimated_cost_per_kg: 115000,
    currency: 'IDR',
    supplier: 'LANXESS Deutschland GmbH',
    description: 'Lipophilic phenolic antioxidant preventing lipid peroxidation, rancidity, and yellowing of unsaturated oils and waxes in cosmetic emulsions.',
    rhlb_ow: 7.0,
    coa_details: {
      lot_number: 'LOT-BHT-20260515',
      release_date: '2026-05-15',
      expiry_date: '2030-05-15',
      appearance: 'Kristal putih atau kristal putih krem tidak berbau khas',
      assay_purity_pct: 99.8,
      melting_point_c: '69.0°C - 71.0°C',
      loss_on_drying_pct: 0.05,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 10 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 6.5
    },
    msds_details: {
      ghs_classification: 'Aquatic Chronic Toxicity Cat 1',
      signal_word: 'Warning',
      hazard_statements: ['H410: Sangat toksik bagi kehidupan perairan dengan efek jangka panjang.'],
      precautionary_statements: ['P273: Hindari pembuangan ke lingkungan.', 'P391: Kumpulkan tumpahan padatan.'],
      first_aid_eye: 'Bilas dengan air mengalir.',
      first_aid_skin: 'Basuh dengan air dan sabun.',
      spill_procedure: 'Kumpulkan dalam kantong limbah kimia kering, jangan dibuang ke saluran air.',
      handling_storage: 'Simpan tertutup rapat di tempat sejuk dan terlindung dari panas.',
      personal_protective_equipment: 'Sarung tangan nitril, kacamata pengaman.'
    }
  },
  {
    id: 'ing-51',
    inci_name: 'Ferulic Acid',
    trade_name: 'Natural Rice Bran Ferulic Acid 99%',
    cas_number: '1135-24-6',
    functions: ['Antioxidant', 'Photoprotective booster', 'Active'],
    typical_min_pct: 0.1,
    typical_max_pct: 1.0,
    regulatory_max_pct: 2.0,
    halal_status: 'HALAL_VERIFIED',
    regulatory_status: 'BPOM_COMPLIANT',
    estimated_cost_per_kg: 850000,
    currency: 'IDR',
    supplier: 'Tsuno Rice Fine Chemicals',
    description: 'Plant-derived hydroxycinnamic acid that doubles photoprotection and dramatically stabilizes ascorbic acid and tocopherol synergies.',
    coa_details: {
      lot_number: 'LOT-FA-20260728',
      release_date: '2026-07-28',
      expiry_date: '2029-07-28',
      appearance: 'Serbuk kristal kuning muda cerah',
      assay_purity_pct: 99.3,
      melting_point_c: '170.0°C - 172.5°C',
      loss_on_drying_pct: 0.2,
      heavy_metals_ppm: '< 5 ppm',
      microbial_alt: '< 50 CFU/g',
      pathogens: 'Negative',
      ph_solution_1pct: 4.1
    },
    msds_details: {
      ghs_classification: 'Skin Irritation Cat 2; Eye Irritation Cat 2A',
      signal_word: 'Warning',
      hazard_statements: ['H315: Menyebabkan iritasi kulit.', 'H319: Menyebabkan iritasi mata serius.'],
      precautionary_statements: ['P280: Kenakan sarung tangan pelindung dan pelindung mata.'],
      first_aid_eye: 'Bilas hati-hati dengan air mengalir selama 15 menit.',
      first_aid_skin: 'Cuci dengan air dan sabun.',
      spill_procedure: 'Sapu hati-hati ke wadah kering tertutup.',
      handling_storage: 'Simpan rapat di bawah 25°C terlindung dari oksidasi udara dan cahaya.',
      personal_protective_equipment: 'Sarung tangan nitril, masker debu, kacamata safety.'
    }
  }
];

export const MOCK_OIL_COMPONENTS: OilPhaseComponent[] = [
  { id: 'oil-1', name: 'Beeswax', mass_grams: 15.0, rhlb_ow: 9.0, rhlb_wo: 5.0 },
  { id: 'oil-2', name: 'Lanolin (Anhydrous)', mass_grams: 10.0, rhlb_ow: 12.0, rhlb_wo: 8.0 },
  { id: 'oil-3', name: 'Paraffin wax', mass_grams: 20.0, rhlb_ow: 10.0, rhlb_wo: 4.0 },
  { id: 'oil-4', name: 'Cetyl alcohol', mass_grams: 5.0, rhlb_ow: 15.0 }
];

// 5 TOP FORMULATION PREDICTIONS
export const MOCK_CANDIDATES: FormulaCandidate[] = [
  {
    id: 'cand-A',
    code: 'OPT-MOIST-A1',
    name: 'Hydra-Dew Barrier Gel-Cream',
    tagline: 'Lightweight Daily Hydro-Boost with 4% Niacinamide',
    description: 'Targeted for humid tropical climates with quick penetration, non-greasy matte finish, and optimal skin biome protection.',
    target_profile: 'Target pH: 5.5 - 6.0 | Target Viscosity: 18,000 - 24,000 cPs | COGS Target: < IDR 75,000/kg',
    raw_material_cost_per_kg: 61850,
    predicted_ph: 5.75,
    predicted_viscosity_cps: 21500,
    predicted_stability_score: 94,
    sensory_finish: 'Velvety light, rapid absorption, zero tacky residue',
    bpom_compliant: true,
    halal_compliant: true,
    metrics: {
      accuracy_pct: 94.8,
      accuracy_label: 'BAIK',
      precision_pct: 93.1,
      precision_label: 'BAIK',
      correlation_r: 0.95,
      correlation_label: 'BAIK'
    },
    blockers_count: 0,
    oil_phase_rhlb: 10.6,
    emulsifier_hlb_match: 10.6,
    items: [
      { id: 'li-1', ingredient_id: 'ing-1', inci_name: 'Aqua', trade_name: 'Deionized Water Pure', phase: 'Phase A (Water Phase)', percentage: 76.5, calculated_mass_g: 765, cost_per_kg: 2500, halal_status: 'HALAL_VERIFIED', function: 'Solvent' },
      { id: 'li-2', ingredient_id: 'ing-2', inci_name: 'Glycerin', trade_name: 'Vegetable Glycerin 99.7%', phase: 'Phase A (Water Phase)', percentage: 5.0, calculated_mass_g: 50, cost_per_kg: 32000, halal_status: 'HALAL_VERIFIED', function: 'Humectant' },
      { id: 'li-3', ingredient_id: 'ing-15', inci_name: 'Carbomer', trade_name: 'Carbopol Ultrez 21', phase: 'Phase A (Water Phase)', percentage: 0.3, calculated_mass_g: 3, cost_per_kg: 210000, halal_status: 'HALAL_EXEMPT', function: 'Viscosity controlling' },
      { id: 'li-4', ingredient_id: 'ing-3', inci_name: 'Niacinamide', trade_name: 'Niacinamide PC', phase: 'Phase A (Water Phase)', percentage: 4.0, calculated_mass_g: 40, cost_per_kg: 380000, halal_status: 'HALAL_VERIFIED', function: 'Active' },
      { id: 'li-5', ingredient_id: 'ing-4', inci_name: 'Squalane', trade_name: 'Neossance Squalane', phase: 'Phase B (Oil Phase)', percentage: 6.0, calculated_mass_g: 60, cost_per_kg: 680000, halal_status: 'HALAL_VERIFIED', function: 'Emollient' },
      { id: 'li-6', ingredient_id: 'ing-8', inci_name: 'Cetyl alcohol', trade_name: 'Kalcol 6098', phase: 'Phase B (Oil Phase)', percentage: 2.5, calculated_mass_g: 25, cost_per_kg: 48000, halal_status: 'HALAL_VERIFIED', function: 'Co-emulsifier' },
      { id: 'li-7', ingredient_id: 'ing-9', inci_name: 'Polysorbate 80', trade_name: 'Tween 80', phase: 'Phase B (Oil Phase)', percentage: 2.8, calculated_mass_g: 28, cost_per_kg: 92000, halal_status: 'HALAL_VERIFIED', function: 'O/W Emulsifier' },
      { id: 'li-8', ingredient_id: 'ing-10', inci_name: 'Sorbitan Stearate', trade_name: 'Span 60', phase: 'Phase B (Oil Phase)', percentage: 1.9, calculated_mass_g: 19, cost_per_kg: 86000, halal_status: 'HALAL_VERIFIED', function: 'W/O Emulsifier' },
      { id: 'li-9', ingredient_id: 'ing-12', inci_name: 'Phenoxyethanol (and) Ethylhexylglycerin', trade_name: 'Euxyl PE 9010', phase: 'Phase C (Actives, Stabilizer & Preservative)', percentage: 1.0, calculated_mass_g: 10, cost_per_kg: 145000, halal_status: 'HALAL_VERIFIED', function: 'Preservative' }
    ]
  },
  {
    id: 'cand-B',
    code: 'OPT-MOIST-B2',
    name: 'Ceramide Intensive Lipid Balm',
    tagline: 'Deep Restorative Night Cream with Pure Ceramide NP',
    description: 'High lipid load (22%) for barrier-compromised skin, rich occlusive protective film, with Beeswax and Lanolin complex.',
    target_profile: 'Target pH: 5.2 - 5.8 | Target Viscosity: 45,000 - 55,000 cPs | COGS Target: < IDR 120,000/kg',
    raw_material_cost_per_kg: 108420,
    predicted_ph: 5.40,
    predicted_viscosity_cps: 48000,
    predicted_stability_score: 88,
    sensory_finish: 'Rich, luxurious cushioning, long-lasting occlusive barrier',
    bpom_compliant: true,
    halal_compliant: false,
    halal_violation_detail: 'Lanolin Anhydrous belum memiliki Sertifikat Halal LPPOM/BPJPH yang terakreditasi (sumber bulu domba impor belum teraudit syariah).',
    metrics: {
      accuracy_pct: 92.4,
      accuracy_label: 'BAIK',
      precision_pct: 90.8,
      precision_label: 'BAIK',
      correlation_r: 0.92,
      correlation_label: 'BAIK'
    },
    replacement_solution: {
      culprit_ingredient: 'Lanolin (Anhydrous)',
      reason: 'Sumber hewani belum tersertifikasi halal',
      replacement_title: 'Substitusi Nabati 100% Halal Verified',
      replacements: [
        { inci_name: 'Butyrospermum Parkii (Shea Butter)', percentage: 2.0, function: 'Plant Lipid Barrier (Halal Verified)' },
        { inci_name: 'Phytosteryl/Isostearyl/Cetyl Dimer Dilinoleate', percentage: 0.5, function: 'Plant-derived Lanolin Substitute' }
      ],
      projected_cogs: 106200,
      regulatory_gain: 'Lolos 100% Sertifikasi Halal BPJPH tanpa mengubah profil oklusif.'
    },
    blockers_count: 1,
    oil_phase_rhlb: 10.8,
    emulsifier_hlb_match: 10.7,
    items: [
      { id: 'li-b1', ingredient_id: 'ing-1', inci_name: 'Aqua', trade_name: 'Deionized Water Pure', phase: 'Phase A (Water Phase)', percentage: 65.2, calculated_mass_g: 652, cost_per_kg: 2500, halal_status: 'HALAL_VERIFIED', function: 'Solvent' },
      { id: 'li-b2', ingredient_id: 'ing-2', inci_name: 'Glycerin', trade_name: 'Vegetable Glycerin 99.7%', phase: 'Phase A (Water Phase)', percentage: 7.0, calculated_mass_g: 70, cost_per_kg: 32000, halal_status: 'HALAL_VERIFIED', function: 'Humectant' },
      { id: 'li-b3', ingredient_id: 'ing-5', inci_name: 'Beeswax', trade_name: 'Cera Alba Refined Pellets', phase: 'Phase B (Oil Phase)', percentage: 3.5, calculated_mass_g: 35, cost_per_kg: 185000, halal_status: 'HALAL_VERIFIED', function: 'Emollient' },
      { id: 'li-b4', ingredient_id: 'ing-6', inci_name: 'Lanolin', trade_name: 'Corona Anhydrous Lanolin', phase: 'Phase B (Oil Phase)', percentage: 2.5, calculated_mass_g: 25, cost_per_kg: 310000, halal_status: 'HALAL_REVIEW_REQUIRED', function: 'Emollient (Flagged Halal)' },
      { id: 'li-b5', ingredient_id: 'ing-7', inci_name: 'Paraffin wax', trade_name: 'Paraffin Wax 58/60', phase: 'Phase B (Oil Phase)', percentage: 4.0, calculated_mass_g: 40, cost_per_kg: 55000, halal_status: 'HALAL_EXEMPT', function: 'Viscosity controlling' },
      { id: 'li-b6', ingredient_id: 'ing-8', inci_name: 'Cetyl alcohol', trade_name: 'Kalcol 6098', phase: 'Phase B (Oil Phase)', percentage: 3.0, calculated_mass_g: 30, cost_per_kg: 48000, halal_status: 'HALAL_VERIFIED', function: 'Co-emulsifier' },
      { id: 'li-b7', ingredient_id: 'ing-9', inci_name: 'Polysorbate 80', trade_name: 'Tween 80', phase: 'Phase B (Oil Phase)', percentage: 3.2, calculated_mass_g: 32, cost_per_kg: 92000, halal_status: 'HALAL_VERIFIED', function: 'O/W Emulsifier' },
      { id: 'li-b8', ingredient_id: 'ing-10', inci_name: 'Sorbitan Stearate', trade_name: 'Span 60', phase: 'Phase B (Oil Phase)', percentage: 2.3, calculated_mass_g: 23, cost_per_kg: 86000, halal_status: 'HALAL_VERIFIED', function: 'W/O Emulsifier' },
      { id: 'li-b9', ingredient_id: 'ing-11', inci_name: 'Ceramide NP', trade_name: 'Ceramide III Pure', phase: 'Phase C (Actives, Stabilizer & Preservative)', percentage: 0.3, calculated_mass_g: 3, cost_per_kg: 18500000, halal_status: 'HALAL_VERIFIED', function: 'Barrier Repair Active' },
      { id: 'li-b10', ingredient_id: 'ing-12', inci_name: 'Phenoxyethanol (and) Ethylhexylglycerin', trade_name: 'Euxyl PE 9010', phase: 'Phase C (Actives, Stabilizer & Preservative)', percentage: 1.0, calculated_mass_g: 10, cost_per_kg: 145000, halal_status: 'HALAL_VERIFIED', function: 'Preservative' }
    ]
  },
  {
    id: 'cand-C',
    code: 'OPT-MOIST-C3',
    name: 'Cica Calm Biome Emulsion',
    tagline: 'Centella Botanical Calming Formula for Acne-Prone Skin',
    description: 'Non-comedogenic emulsion infused with high potency Centella Asiatica triterpenes, fast soothing, minimal lipid residue.',
    target_profile: 'Target pH: 5.6 - 6.2 | Target Viscosity: 14,000 - 18,000 cPs | COGS Target: < IDR 90,000/kg',
    raw_material_cost_per_kg: 83900,
    predicted_ph: 5.85,
    predicted_viscosity_cps: 16500,
    predicted_stability_score: 91,
    sensory_finish: 'Cooling water-burst effect, instant soothing sensation',
    bpom_compliant: true,
    halal_compliant: true,
    metrics: {
      accuracy_pct: 91.2,
      accuracy_label: 'BAIK',
      precision_pct: 90.1,
      precision_label: 'BAIK',
      correlation_r: 0.91,
      correlation_label: 'BAIK'
    },
    blockers_count: 0,
    oil_phase_rhlb: 10.4,
    emulsifier_hlb_match: 10.5,
    items: [
      { id: 'li-c1', ingredient_id: 'ing-1', inci_name: 'Aqua', trade_name: 'Deionized Water Pure', phase: 'Phase A (Water Phase)', percentage: 78.4, calculated_mass_g: 784, cost_per_kg: 2500, halal_status: 'HALAL_VERIFIED', function: 'Solvent' },
      { id: 'li-c2', ingredient_id: 'ing-2', inci_name: 'Glycerin', trade_name: 'Vegetable Glycerin 99.7%', phase: 'Phase A (Water Phase)', percentage: 4.5, calculated_mass_g: 45, cost_per_kg: 32000, halal_status: 'HALAL_VERIFIED', function: 'Humectant' },
      { id: 'li-c3', ingredient_id: 'ing-13', inci_name: 'Centella Asiatica Extract', trade_name: 'Madecassoside Cica Powder', phase: 'Phase C (Actives, Stabilizer & Preservative)', percentage: 1.2, calculated_mass_g: 12, cost_per_kg: 2400000, halal_status: 'HALAL_VERIFIED', function: 'Active Calming' },
      { id: 'li-c4', ingredient_id: 'ing-4', inci_name: 'Squalane', trade_name: 'Neossance Squalane', phase: 'Phase B (Oil Phase)', percentage: 4.5, calculated_mass_g: 45, cost_per_kg: 680000, halal_status: 'HALAL_VERIFIED', function: 'Emollient' },
      { id: 'li-c5', ingredient_id: 'ing-8', inci_name: 'Cetyl alcohol', trade_name: 'Kalcol 6098', phase: 'Phase B (Oil Phase)', percentage: 2.0, calculated_mass_g: 20, cost_per_kg: 48000, halal_status: 'HALAL_VERIFIED', function: 'Co-emulsifier' },
      { id: 'li-c6', ingredient_id: 'ing-9', inci_name: 'Polysorbate 80', trade_name: 'Tween 80', phase: 'Phase B (Oil Phase)', percentage: 2.6, calculated_mass_g: 26, cost_per_kg: 92000, halal_status: 'HALAL_VERIFIED', function: 'O/W Emulsifier' },
      { id: 'li-c7', ingredient_id: 'ing-10', inci_name: 'Sorbitan Stearate', trade_name: 'Span 60', phase: 'Phase B (Oil Phase)', percentage: 1.8, calculated_mass_g: 18, cost_per_kg: 86000, halal_status: 'HALAL_VERIFIED', function: 'W/O Emulsifier' },
      { id: 'li-c8', ingredient_id: 'ing-12', inci_name: 'Phenoxyethanol (and) Ethylhexylglycerin', trade_name: 'Euxyl PE 9010', phase: 'Phase C (Actives, Stabilizer & Preservative)', percentage: 1.0, calculated_mass_g: 10, cost_per_kg: 145000, halal_status: 'HALAL_VERIFIED', function: 'Preservative' }
    ]
  },
  {
    id: 'cand-D',
    code: 'OPT-MOIST-D4',
    name: 'High-Glow Luminescence Serum-Cream',
    tagline: 'High Preservative Load Anti-Microbial Candidate',
    description: 'Formula eksperimen dengan daya proteksi mikroba ganda namun melanggar regulasi batas maksimal BPOM.',
    target_profile: 'Target pH: 5.4 - 5.9 | Target Viscosity: 15,000 - 20,000 cPs | COGS Target: < IDR 70,000/kg',
    raw_material_cost_per_kg: 68500,
    predicted_ph: 5.50,
    predicted_viscosity_cps: 17200,
    predicted_stability_score: 76,
    sensory_finish: 'Silky, slightly oily spread',
    bpom_compliant: false,
    bpom_violation_detail: 'Konsentrasi Phenoxyethanol mencapai 1.4% (Melebihi batas maksimal regulasi BPOM Lampiran V yang strictly 1.00%). Berisiko iritasi kulit dan gagal uji izin edar NIE BPOM.',
    halal_compliant: true,
    metrics: {
      accuracy_pct: 88.5,
      accuracy_label: 'JELEK',
      precision_pct: 87.2,
      precision_label: 'JELEK',
      correlation_r: 0.86,
      correlation_label: 'JELEK'
    },
    replacement_solution: {
      culprit_ingredient: 'Phenoxyethanol 1.4% (Melebihi batas BPOM)',
      reason: 'Konsentrasi melebihi batas legal BPOM 1.0%',
      replacement_title: 'Sistem Pengawet Hurdle Tech Sesuai Regulasi BPOM',
      replacements: [
        { inci_name: 'Phenoxyethanol (and) Ethylhexylglycerin (Euxyl PE 9010)', percentage: 0.8, function: 'Preservative (Legal Max 1.0%)' },
        { inci_name: 'Pentylene Glycol (Hydrolite 5 Green)', percentage: 0.6, function: 'Bio-Preservative Booster & Hydrator' }
      ],
      projected_cogs: 69800,
      regulatory_gain: 'Lolos uji BPOM 100% tanpa menurunkan efikasi antimikroba (Pass Challenge Test ISO 11930).'
    },
    blockers_count: 1,
    oil_phase_rhlb: 10.2,
    emulsifier_hlb_match: 10.2,
    items: [
      { id: 'li-d1', ingredient_id: 'ing-1', inci_name: 'Aqua', trade_name: 'Deionized Water Pure', phase: 'Phase A (Water Phase)', percentage: 76.1, calculated_mass_g: 761, cost_per_kg: 2500, halal_status: 'HALAL_VERIFIED', function: 'Solvent' },
      { id: 'li-d2', ingredient_id: 'ing-2', inci_name: 'Glycerin', trade_name: 'Vegetable Glycerin 99.7%', phase: 'Phase A (Water Phase)', percentage: 5.0, calculated_mass_g: 50, cost_per_kg: 32000, halal_status: 'HALAL_VERIFIED', function: 'Humectant' },
      { id: 'li-d3', ingredient_id: 'ing-3', inci_name: 'Niacinamide', trade_name: 'Niacinamide PC', phase: 'Phase A (Water Phase)', percentage: 5.0, calculated_mass_g: 50, cost_per_kg: 380000, halal_status: 'HALAL_VERIFIED', function: 'Active' },
      { id: 'li-d4', ingredient_id: 'ing-4', inci_name: 'Squalane', trade_name: 'Neossance Squalane', phase: 'Phase B (Oil Phase)', percentage: 5.0, calculated_mass_g: 50, cost_per_kg: 680000, halal_status: 'HALAL_VERIFIED', function: 'Emollient' },
      { id: 'li-d5', ingredient_id: 'ing-8', inci_name: 'Cetyl alcohol', trade_name: 'Kalcol 6098', phase: 'Phase B (Oil Phase)', percentage: 3.0, calculated_mass_g: 30, cost_per_kg: 48000, halal_status: 'HALAL_VERIFIED', function: 'Co-emulsifier' },
      { id: 'li-d6', ingredient_id: 'ing-9', inci_name: 'Polysorbate 80', trade_name: 'Tween 80', phase: 'Phase B (Oil Phase)', percentage: 2.5, calculated_mass_g: 25, cost_per_kg: 92000, halal_status: 'HALAL_VERIFIED', function: 'O/W Emulsifier' },
      { id: 'li-d7', ingredient_id: 'ing-10', inci_name: 'Sorbitan Stearate', trade_name: 'Span 60', phase: 'Phase B (Oil Phase)', percentage: 2.0, calculated_mass_g: 20, cost_per_kg: 86000, halal_status: 'HALAL_VERIFIED', function: 'W/O Emulsifier' },
      { id: 'li-d8', ingredient_id: 'ing-12', inci_name: 'Phenoxyethanol', trade_name: 'Pure Phenoxyethanol Liquid', phase: 'Phase C (Actives, Stabilizer & Preservative)', percentage: 1.4, calculated_mass_g: 14, cost_per_kg: 145000, halal_status: 'HALAL_VERIFIED', function: 'Preservative (BPOM VIOLATION)' }
    ]
  },
  {
    id: 'cand-E',
    code: 'OPT-MOIST-E5',
    name: 'Botanical Herb Moisture Milk',
    tagline: 'Natural Organic Emulsion with Low Prediction Reliability',
    description: 'Kandidat formulasi berbasis ekstrak alami tinggi tanpa penstabil rheologi sintetik, menghasilkan prediksi model CQA yang rendah.',
    target_profile: 'Target pH: 5.6 - 6.0 | Target Viscosity: 10,000 - 14,000 cPs | COGS Target: < IDR 60,000/kg',
    raw_material_cost_per_kg: 58200,
    predicted_ph: 5.92,
    predicted_viscosity_cps: 11200,
    predicted_stability_score: 68,
    sensory_finish: 'Watery lotion, potential phase bleeding',
    bpom_compliant: true,
    halal_compliant: true,
    metrics: {
      accuracy_pct: 85.0,
      accuracy_label: 'JELEK',
      precision_pct: 83.4,
      precision_label: 'JELEK',
      correlation_r: 0.81,
      correlation_label: 'JELEK'
    },
    blockers_count: 0,
    oil_phase_rhlb: 10.1,
    emulsifier_hlb_match: 9.8,
    items: [
      { id: 'li-e1', ingredient_id: 'ing-1', inci_name: 'Aqua', trade_name: 'Deionized Water Pure', phase: 'Phase A (Water Phase)', percentage: 81.0, calculated_mass_g: 810, cost_per_kg: 2500, halal_status: 'HALAL_VERIFIED', function: 'Solvent' },
      { id: 'li-e2', ingredient_id: 'ing-2', inci_name: 'Glycerin', trade_name: 'Vegetable Glycerin 99.7%', phase: 'Phase A (Water Phase)', percentage: 6.0, calculated_mass_g: 60, cost_per_kg: 32000, halal_status: 'HALAL_VERIFIED', function: 'Humectant' },
      { id: 'li-e3', ingredient_id: 'ing-4', inci_name: 'Squalane', trade_name: 'Neossance Squalane', phase: 'Phase B (Oil Phase)', percentage: 5.0, calculated_mass_g: 50, cost_per_kg: 680000, halal_status: 'HALAL_VERIFIED', function: 'Emollient' },
      { id: 'li-e4', ingredient_id: 'ing-8', inci_name: 'Cetyl alcohol', trade_name: 'Kalcol 6098', phase: 'Phase B (Oil Phase)', percentage: 2.0, calculated_mass_g: 20, cost_per_kg: 48000, halal_status: 'HALAL_VERIFIED', function: 'Co-emulsifier' },
      { id: 'li-e5', ingredient_id: 'ing-9', inci_name: 'Polysorbate 80', trade_name: 'Tween 80', phase: 'Phase B (Oil Phase)', percentage: 3.0, calculated_mass_g: 30, cost_per_kg: 92000, halal_status: 'HALAL_VERIFIED', function: 'O/W Emulsifier' },
      { id: 'li-e6', ingredient_id: 'ing-10', inci_name: 'Sorbitan Stearate', trade_name: 'Span 60', phase: 'Phase B (Oil Phase)', percentage: 2.0, calculated_mass_g: 20, cost_per_kg: 86000, halal_status: 'HALAL_VERIFIED', function: 'W/O Emulsifier' },
      { id: 'li-e7', ingredient_id: 'ing-12', inci_name: 'Phenoxyethanol (and) Ethylhexylglycerin', trade_name: 'Euxyl PE 9010', phase: 'Phase C (Actives, Stabilizer & Preservative)', percentage: 1.0, calculated_mass_g: 10, cost_per_kg: 145000, halal_status: 'HALAL_VERIFIED', function: 'Preservative' }
    ]
  }
];

// 8 STABILITY TEST RESULTS (Computed from previous trials)
export const MOCK_STABILITY_RESULTS: StabilityTestResult[] = [
  {
    id: 'stab-1',
    test_name: 'Uji Suhu Kamar (25°C) - Bulan ke-1',
    condition: '25°C ± 2°C / 60% RH',
    duration_text: '30 Hari',
    initial_viscosity_cps: 21500,
    measured_viscosity_cps: 20800,
    viscosity_drop_pct: -3.25,
    is_stable: true,
    phase_separation_observed: false,
    notes: 'Emulsi homogen, warna putih gading stabil, tidak ada creaming.',
    trial_dataset_source: 'Trial Batch LOT-MOIST-26-01'
  },
  {
    id: 'stab-2',
    test_name: 'Uji Suhu Kamar (25°C) - Bulan ke-2',
    condition: '25°C ± 2°C / 60% RH',
    duration_text: '60 Hari',
    initial_viscosity_cps: 21500,
    measured_viscosity_cps: 19850,
    viscosity_drop_pct: -7.67,
    is_stable: true,
    phase_separation_observed: false,
    notes: 'Sistem kristal cair lamellar stabil, pH tetap pada 5.72.',
    trial_dataset_source: 'Trial Batch LOT-MOIST-26-01'
  },
  {
    id: 'stab-3',
    test_name: 'Uji Suhu Kamar (25°C) - Bulan ke-3 (Evaluasi Kritis)',
    condition: '25°C ± 2°C / 60% RH',
    duration_text: '90 Hari',
    initial_viscosity_cps: 21500,
    measured_viscosity_cps: 18830,
    viscosity_drop_pct: -12.42,
    is_stable: true,
    phase_separation_observed: false,
    notes: 'Penurunan viskositas 12.4% (< ambang batas kritis 20%). Emulsi dinyatakan STABIL.',
    trial_dataset_source: 'Trial Batch LOT-MOIST-26-01'
  },
  {
    id: 'stab-4',
    test_name: 'Uji Suhu Hangat (40°C) - Bulan ke-3 (Accelerated Standard)',
    condition: '40°C ± 2°C / 75% RH (Chamber)',
    duration_text: '90 Hari',
    initial_viscosity_cps: 21500,
    measured_viscosity_cps: 17600,
    viscosity_drop_pct: -18.14,
    is_stable: true,
    phase_separation_observed: false,
    notes: 'Penurunan viskositas 18.1% (masih di bawah toleransi 20%). Struktur emulsi bertahan.',
    trial_dataset_source: 'Trial Batch LOT-MOIST-26-02'
  },
  {
    id: 'stab-5',
    test_name: 'Uji Suhu Ekstrem Akselerasi (45°C) - 24 Jam (Stress Test)',
    condition: '45°C Oven Thermal Stress',
    duration_text: '24 Jam',
    initial_viscosity_cps: 21500,
    measured_viscosity_cps: 13330,
    viscosity_drop_pct: -38.00,
    is_stable: false,
    phase_separation_observed: true,
    notes: 'KEGAGALAN STABILITAS: Penurunan viskositas mencapai 38.0% (>= 20%). Terjadi pemisahan fase air dan minyak (oil syneresis).',
    trial_dataset_source: 'Trial Batch LOT-MOIST-26-04B'
  },
  {
    id: 'stab-6',
    test_name: 'Freeze-Thaw Cycling (3 Siklus Beku-Cair)',
    condition: '-5°C (24 jam) / 40°C (24 jam)',
    duration_text: '6 Hari (3 Siklus)',
    initial_viscosity_cps: 21500,
    measured_viscosity_cps: 18400,
    viscosity_drop_pct: -14.42,
    is_stable: true,
    phase_separation_observed: false,
    notes: 'Tidak ada kristalisasi air bebas, tidak terbentuk flokulasi ireversibel.',
    trial_dataset_source: 'Trial Batch LOT-MOIST-26-03'
  },
  {
    id: 'stab-7',
    test_name: 'Centrifuge Mechanical Stress Test',
    condition: '3000 RPM / 30 Menit (25°C)',
    duration_text: '30 Menit',
    initial_viscosity_cps: 21500,
    measured_viscosity_cps: 20160,
    viscosity_drop_pct: -6.23,
    is_stable: true,
    phase_separation_observed: false,
    notes: 'Gaya sentrifugal 3000 RPM tidak menyebabkan pemisahan fase minyak.',
    trial_dataset_source: 'Trial Batch LOT-MOIST-26-01'
  },
  {
    id: 'stab-8',
    test_name: 'Paparan Cahaya & Radiasi UV (Photostability)',
    condition: 'Solarbox Xenon 250W/m²',
    duration_text: '48 Jam',
    initial_viscosity_cps: 21500,
    measured_viscosity_cps: 20620,
    viscosity_drop_pct: -4.09,
    is_stable: true,
    phase_separation_observed: false,
    notes: 'Tidak terjadi diskolorisasi atau oksidasi lipid Niacinamide/Squalane.',
    trial_dataset_source: 'Trial Batch LOT-MOIST-26-02'
  }
];

// CPP (Critical Process Parameters) with Median & Replicate Runs (+/- 3 spread)
export const MOCK_CPP_PARAMETERS: CppParameter[] = [
  {
    id: 'cpp-1',
    name: 'Suhu Pemanasan Fase Minyak (Phase B)',
    phase: 'Phase B Melting',
    unit: '°C',
    target_val: 75.0,
    run_1: 72.0,
    run_2: 75.0,
    run_3: 78.0,
    median: 75.0,
    deviation_range: 3.0,
    status: 'OPTIMAL',
    impact: 'Memastikan titik leleh Cera Alba (62-65°C) terlewati sempurna tanpa degradasi termal.'
  },
  {
    id: 'cpp-2',
    name: 'Suhu Emulsifikasi Saat Penggabungan (Phase B ke A)',
    phase: 'Emulsification',
    unit: '°C',
    target_val: 75.0,
    run_1: 72.0,
    run_2: 73.0,
    run_3: 76.0,
    median: 73.0,
    deviation_range: 3.0,
    status: 'OPTIMAL',
    impact: 'Mencegah thermal shock saat lipid cair kontak dengan fase air berpolimer.'
  },
  {
    id: 'cpp-3',
    name: 'Kecepatan Rotor Homogenizer High-Shear',
    phase: 'Homogenization',
    unit: 'RPM',
    target_val: 3500,
    run_1: 3450,
    run_2: 3500,
    run_3: 3520,
    median: 3500,
    deviation_range: 35,
    status: 'OPTIMAL',
    impact: 'Parameter kritis pemecahan droplet minyak agar d(0.9) < 2.5 µm sesuai hukum Stokes.'
  },
  {
    id: 'cpp-4',
    name: 'Durasi Emulsifikasi High-Shear',
    phase: 'Homogenization',
    unit: 'Menit',
    target_val: 10.0,
    run_1: 9.0,
    run_2: 10.0,
    run_3: 11.0,
    median: 10.0,
    deviation_range: 1.0,
    status: 'OPTIMAL',
    impact: 'Distribusi energi dispersi kinetik yang cukup untuk mencegah koalesensi dini.'
  },
  {
    id: 'cpp-5',
    name: 'Suhu Pendinginan Sebelum Injeksi Fase Termolabil (Phase C)',
    phase: 'Cooling Stage',
    unit: '°C',
    target_val: 40.0,
    run_1: 38.0,
    run_2: 40.0,
    run_3: 42.0,
    median: 40.0,
    deviation_range: 2.0,
    status: 'OPTIMAL',
    impact: 'Menjaga keutuhan molekul aktif Niacinamide dan preservative Euxyl PE 9010.'
  }
];

// C. Target Parameter Proses (Standar Protokol R&D Pilot Compounding)
// C. Target Parameter Proses (Standar Protokol R&D Pilot Compounding - Hydra-Dew Gel-Cream OPT-MOIST-A1)
export const MOCK_CPP_TARGET_STEPS: CppTargetStep[] = [
  {
    no: 1,
    stage_name: 'Persiapan bahan & sanitasi alat',
    phase: 'All',
    temp_target: '25 ± 2°C',
    time_target: '20 menit',
    speed_target: '0 rpm',
    output_target: 'Timbangan analitik terkalibrasi, beaker stainless steel 316L, Silverson homogenizer & propeller mixer bersih tersanitasi alkohol 70% kering'
  },
  {
    no: 2,
    stage_name: 'Dispersi polimer fase A (Carbopol Ultrez 21)',
    phase: 'A',
    temp_target: '25-30°C → 70-75°C',
    time_target: '20 menit',
    speed_target: '500-600 rpm',
    output_target: 'Aqua deionisasi & Gliserin 5.0% homogen; Carbopol Ultrez 21 (0.3%) terbasahi sempurna tanpa fisheye atau aglomerasi'
  },
  {
    no: 3,
    stage_name: 'Pemanasan & pelelehan fase minyak B',
    phase: 'B',
    temp_target: '70-75°C',
    time_target: '15 menit',
    speed_target: '250-350 rpm',
    output_target: 'Neossance Squalane (6.0%), Cetyl Alcohol Kalcol 6098 (2.5%), Polysorbate 80 (2.8%) & Span 60 (1.9%) meleleh homogen jernih'
  },
  {
    no: 4,
    stage_name: 'Emulsifikasi fase minyak ke fase air (B ke A)',
    phase: 'A+B',
    temp_target: '70-75°C (Target: 72°C)',
    time_target: '8-10 menit',
    speed_target: '750-900 rpm',
    output_target: 'Fase B dituangkan perlahan ke pusat vortex fase A; terbentuk pra-emulsi O/W putih susu yang seragam'
  },
  {
    no: 5,
    stage_name: 'Homogenisasi High-Shear Rotor-Stator',
    phase: 'A+B',
    temp_target: '68-72°C',
    time_target: '5 menit',
    speed_target: '2800 rpm (2600-2900 rpm)',
    output_target: 'Emulsi terhomogenisasi mikro, distribusi ukuran droplet seragam d(0.9) < 2.5 µm, tekstur mulai rapat dan halus'
  },
  {
    no: 6,
    stage_name: 'Pendinginan bertahap (Cooling stage)',
    phase: 'A+B',
    temp_target: '40-45°C',
    time_target: '25-30 menit',
    speed_target: '400-500 rpm',
    output_target: 'Penurunan suhu terkontrol 1.0-1.5°C/menit via cooling jacket; struktur emulsi stabil tanpa shear thinning'
  },
  {
    no: 7,
    stage_name: 'Inkorporasi bahan aktif & pengawet (Fase C)',
    phase: 'C',
    temp_target: '≤ 38°C (Maks 40°C)',
    time_target: '10 menit',
    speed_target: '400-500 rpm',
    output_target: 'Larutan Niacinamide PC (4.0%) dan Euxyl PE 9010 (1.0%) masuk pada suhu aman untuk mencegah degradasi termal zat aktif'
  },
  {
    no: 8,
    stage_name: 'Netralisasi polimer & adjust pH (Fase D: TEA 99%)',
    phase: 'D',
    temp_target: '30-32°C',
    time_target: '10 menit',
    speed_target: '400-600 rpm',
    output_target: 'Titrasi Triethanolamine 99% / Asam Sitrat hingga pH target 5.50-6.00; viskositas target terbentuk (18.000-24.000 cPs)'
  },
  {
    no: 9,
    stage_name: 'Deaerasi vacuum',
    phase: 'Final bulk',
    temp_target: '25-28°C',
    time_target: '10-15 menit',
    speed_target: '100-150 rpm / vacuum -0.85 bar',
    output_target: 'Seluruh microbubble udara tereliminasi; bulk menjadi padat, berkilau (glossy cream) dan bebas rongga udara'
  },
  {
    no: 10,
    stage_name: 'Filling sampel & pengemasan primer',
    phase: 'Final bulk',
    temp_target: '25 ± 2°C',
    time_target: '10-15 menit',
    speed_target: 'Dispenser semi-otomatis',
    output_target: 'Sampel jar 30g terisi presisi (30.0 ± 0.5 g), seal foil kedap udara rapat, label batch LOT-MOIST-26-04B terbaca jelas'
  }
];

// D. Data Aktual Trial Batch (Hasil Pelaksanaan Riil di Pilot Plant - Replikasi & Median ±3)
export const MOCK_CPP_ACTUAL_STEPS: CppActualStep[] = [
  {
    no: 1,
    stage_name: 'Persiapan bahan & sanitasi alat',
    phase: 'All',
    temp_actual: '25.2°C',
    time_actual: '20 menit',
    speed_actual: '0 rpm',
    observation_actual: 'Penimbangan 1000,0 g presisi (Aqua 765.0g, Squalane 60.0g, Niacinamide 40.0g, Gliserin 50.0g, Carbopol 3.0g, dll); alat tersanitasi alkohol 70%'
  },
  {
    no: 2,
    stage_name: 'Dispersi polimer fase A (Carbopol Ultrez 21)',
    phase: 'A',
    temp_actual: '73.0°C',
    time_actual: '20 menit',
    speed_actual: '550 rpm',
    observation_actual: 'Carbopol Ultrez 21 terbasahi sempurna dalam campuran air & gliserin; dispersi koloid jernih, bebas fisheye'
  },
  {
    no: 3,
    stage_name: 'Pemanasan & pelelehan fase minyak B',
    phase: 'B',
    temp_actual: '74.0°C',
    time_actual: '15 menit',
    speed_actual: '300 rpm',
    observation_actual: 'Squalane, cetyl alcohol, Tween 80, dan Span 60 meleleh jernih homogen pada 74°C'
  },
  {
    no: 4,
    stage_name: 'Emulsifikasi fase B ke A',
    phase: 'A+B',
    temp_actual: '73.0°C [Median 73°C | Rep: 71, 74, 73°C | Δ +1°C]',
    time_actual: '9 menit',
    speed_actual: '850 rpm',
    observation_actual: 'Fase B dituang bertahap 3 tahap ke pusat vortex; terbentuk emulsi O/W putih susu homogen, tanpa percikan'
  },
  {
    no: 5,
    stage_name: 'Homogenisasi High-Shear Rotor-Stator',
    phase: 'A+B',
    temp_actual: '70.0°C [Median 70°C]',
    time_actual: '5 menit',
    speed_actual: '2810 rpm [Median 2810 rpm | Rep: 2820, 2780, 2810 rpm | Δ +10 rpm]',
    observation_actual: 'Emulsi sangat halus seragam, droplet terdispersi rata (d0.9 = 2.1 µm), stabilitas kinetik awal sangat baik'
  },
  {
    no: 6,
    stage_name: 'Pendinginan bertahap (Cooling stage)',
    phase: 'A+B',
    temp_actual: '42.5°C [Median 42.5°C]',
    time_actual: '26 menit',
    speed_actual: '450 rpm [Median 450 rpm | Rep: 440, 460, 450 rpm | Δ 0 rpm]',
    observation_actual: 'Pendinginan stabil dengan cooling water jacket; tekstur mulai mengental tanpa gumpalan'
  },
  {
    no: 7,
    stage_name: 'Inkorporasi bahan aktif & pengawet (Fase C)',
    phase: 'C',
    temp_actual: '38.0°C [Median 38°C | Rep: 37, 39, 38°C | Δ 0°C]',
    time_actual: '10 menit',
    speed_actual: '460 rpm',
    observation_actual: 'Niacinamide PC & Euxyl PE 9010 terlarut sempurna tanpa kristalisasi; tidak ada aroma degradasi aktif'
  },
  {
    no: 8,
    stage_name: 'Netralisasi polimer & adjust pH (Fase D: TEA 99%)',
    phase: 'D',
    temp_actual: '31.0°C',
    time_actual: '10 menit',
    speed_actual: '520 rpm',
    observation_actual: 'Penambahan TEA 0.28 g; pH terukur 5.74 [Median 5.74 | Rep: 5.72, 5.76, 5.74 | Δ -0.01]; viskositas terangkat ke 21.500 cPs'
  },
  {
    no: 9,
    stage_name: 'Deaerasi vacuum',
    phase: 'Final bulk',
    temp_actual: '26.5°C',
    time_actual: '11 menit [Median 11 min | Rep: 10, 12, 11 min | Δ +1 min]',
    speed_actual: '120 rpm (-0.85 bar)',
    observation_actual: 'Seluruh microbubble udara terhisap tuntas; permukaan bulk mengkilap halus (glossy cream finish)'
  },
  {
    no: 10,
    stage_name: 'Filling sampel & pengemasan primer',
    phase: 'Final bulk',
    temp_actual: '25.4°C',
    time_actual: '12 menit',
    speed_actual: 'Dispenser semi-otomatis',
    observation_actual: 'Terisi rapi ke 10 wadah jar 30g (bobot rata-rata 30.12 ± 0.08 g); penutupan hermetis, batch label terverifikasi'
  }
];

// E. Data Pengamatan Akhir (Perbandingan Faktual Target vs Hasil T0 vs Hasil 24 Jam)
export const MOCK_CPP_FINAL_OBSERVATIONS: CppFinalObservation[] = [
  {
    parameter: 'pH',
    target: '5.50 - 6.00',
    result_t0: '5.74',
    result_t24: '5.75',
    status: 'OK',
    evaluation_note: 'pH sangat stabil di rentang fisiologis kulit (5.5-6.0). Bahan aktif Niacinamide stabil dan aman dari hidrolisis asam nikotinat.'
  },
  {
    parameter: 'Viskositas',
    target: '18.000 - 24.000 cPs (Brookfield Sp.4, 20 rpm)',
    result_t0: '21.500 cPs',
    result_t24: '21.800 cPs',
    status: 'OK',
    evaluation_note: 'Kenaikan viskositas hanya +1.4% setelah polimer mengembang sempurna; struktur gel-cream elastis dan kokoh.'
  },
  {
    parameter: 'Organoleptik',
    target: 'Putih lembut berkilau, tekstur gel-cream segar, cepat meresap, non-greasy',
    result_t0: 'Putih bersih berkilau, tekstur semi-translucent gel-cream halus',
    result_t24: 'Konsisten putih cerah, sensasi velvety mewah saat diaplikasikan ke kulit',
    status: 'OK',
    evaluation_note: 'Karakter sensori memenuhi target profil QTPP untuk pelembab iklim tropis lembab.'
  },
  {
    parameter: 'Homogenitas',
    target: 'Homogen stabil tanpa pemisahan fase/creaming, droplet seragam d(0.9) < 2.5 µm',
    result_t0: 'Homogen 100%, ukuran droplet 1.8 - 2.4 µm di bawah mikroskop',
    result_t24: 'Tetap homogen stabil; bebas dari creaming, sedimentasi, maupun oil-ring separation',
    status: 'OK',
    evaluation_note: 'Keseimbangan rasio HLB Tween 80 & Span 60 terhadap Neossance Squalane terbukti optimal.'
  },
  {
    parameter: 'Filling & Integritas Kemasan',
    target: 'Netto 30.0 ± 0.5 g, bebas microbubble, sealing kedap udara rapat',
    result_t0: 'Rata-rata 30.12 g, sampel terisi rapi, deaerasi tuntas',
    result_t24: 'Permukaan rata mengkilap, tidak ada penyusutan volume maupun sineresis',
    status: 'OK',
    evaluation_note: 'Deaerasi vacuum -0.85 bar berhasil mengeliminasi gelembung udara mikroskopis.'
  }
];

// Lembar Kerja Kosong (Blank Protocol Template) - Menunggu Pelaksanaan Eksperimen Lab
export const BLANK_CPP_ACTUAL_STEPS: CppActualStep[] = [
  { no: 1, stage_name: 'Persiapan bahan & sanitasi alat', phase: 'All', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 2, stage_name: 'Dispersi polimer fase A (Carbopol Ultrez 21)', phase: 'A', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 3, stage_name: 'Pemanasan & pelelehan fase minyak B', phase: 'B', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 4, stage_name: 'Emulsifikasi fase B ke A', phase: 'A+B', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 5, stage_name: 'Homogenisasi High-Shear Rotor-Stator', phase: 'A+B', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 6, stage_name: 'Pendinginan bertahap (Cooling stage)', phase: 'A+B', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 7, stage_name: 'Inkorporasi bahan aktif & pengawet (Fase C)', phase: 'C', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 8, stage_name: 'Netralisasi polimer & adjust pH (Fase D: TEA 99%)', phase: 'D', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 9, stage_name: 'Deaerasi vacuum', phase: 'Final bulk', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' },
  { no: 10, stage_name: 'Filling sampel & pengemasan primer', phase: 'Final bulk', temp_actual: '', time_actual: '', speed_actual: '', observation_actual: '' }
];

export const BLANK_CPP_FINAL_OBSERVATIONS: CppFinalObservation[] = [
  { parameter: 'pH', target: '5.50 - 6.00', result_t0: '', result_t24: '', status: 'Perlu Perhatian', evaluation_note: 'Menunggu pengujian elektroda pH meter laboratorium' },
  { parameter: 'Viskositas', target: '18.000 - 24.000 cPs (Brookfield Sp.4, 20 rpm)', result_t0: '', result_t24: '', status: 'Perlu Perhatian', evaluation_note: 'Menunggu uji viskometer Brookfield' },
  { parameter: 'Organoleptik', target: 'Putih lembut berkilau, tekstur gel-cream segar, cepat meresap, non-greasy', result_t0: '', result_t24: '', status: 'Perlu Perhatian', evaluation_note: 'Menunggu evaluasi sensori panelis R&D' },
  { parameter: 'Homogenitas', target: 'Homogen stabil tanpa pemisahan fase/creaming, droplet seragam d(0.9) < 2.5 µm', result_t0: '', result_t24: '', status: 'Perlu Perhatian', evaluation_note: 'Menunggu uji mikroskopik dispersi droplet & uji sentrifugasi' },
  { parameter: 'Filling & Integritas Kemasan', target: 'Netto 30.0 ± 0.5 g, bebas microbubble, sealing kedap udara rapat', result_t0: '', result_t24: '', status: 'Perlu Perhatian', evaluation_note: 'Menunggu penimbangan bobot sediaan terisi & uji kebocoran vacuum' }
];

// Data Trial Batch dengan Deviasi (Untuk Pembuktian Modul RCA 6M & CAPA)
export const MOCK_CPP_DEVIATION_ACTUAL_STEPS: CppActualStep[] = [
  {
    no: 1,
    stage_name: 'Persiapan bahan & alat',
    phase: 'All',
    temp_actual: '25°C',
    time_actual: '20 menit',
    speed_actual: '0 rpm',
    observation_actual: 'Bahan ditimbang 1000,2 g, alat bersih, batch record siap'
  },
  {
    no: 2,
    stage_name: 'Dispersi polymer fase A',
    phase: 'A',
    temp_actual: '72°C',
    time_actual: '18 menit',
    speed_actual: '500 rpm',
    observation_actual: 'Carbomer mulai terhidrasi, ada sedikit fisheye di menit awal'
  },
  {
    no: 3,
    stage_name: 'Pemanasan fase A',
    phase: 'A',
    temp_actual: '82°C (Overshoot)',
    time_actual: '12 menit',
    speed_actual: '400 rpm',
    observation_actual: 'Suhu fase air overshoot melebihi batas kontrol proses 70-75°C'
  },
  {
    no: 4,
    stage_name: 'Pemanasan fase B',
    phase: 'B',
    temp_actual: '76°C',
    time_actual: '15 menit',
    speed_actual: '300 rpm',
    observation_actual: 'Fase B bening, semua wax/emulsifier meleleh'
  },
  {
    no: 5,
    stage_name: 'Emulsifikasi B ke A',
    phase: 'A+B',
    temp_actual: '78°C',
    time_actual: '8 menit',
    speed_actual: '850 rpm',
    observation_actual: 'Fase B dituang terlalu cepat pada 2 menit pertama, bulk tampak agak kasar'
  },
  {
    no: 6,
    stage_name: 'Homogenisasi',
    phase: 'A+B',
    temp_actual: '72°C',
    time_actual: '5 menit',
    speed_actual: '3200 rpm (Over-speed)',
    observation_actual: 'Tekstur lebih halus tetapi shear berlebih memicu munculnya banyak gelembung udara mikro'
  },
  {
    no: 7,
    stage_name: 'Pendinginan',
    phase: 'A+B',
    temp_actual: '47°C',
    time_actual: '25 menit',
    speed_actual: '400 rpm',
    observation_actual: 'Bulk mulai mengental, suhu turun stabil'
  },
  {
    no: 8,
    stage_name: 'Penambahan fase C',
    phase: 'C',
    temp_actual: '39°C',
    time_actual: '10 menit',
    speed_actual: '600 rpm',
    observation_actual: 'Niacinamide, preservative, dan adjuster TEA masuk; teramati timbul foam ringan'
  },
  {
    no: 9,
    stage_name: 'Adjust pH dan viskositas',
    phase: 'Final bulk',
    temp_actual: '32°C',
    time_actual: '10 menit',
    speed_actual: '500 rpm',
    observation_actual: 'pH 5.40; viskositas terukur 16.500 cPs, lebih rendah dari target (18.000-24.000 cPs)'
  },
  {
    no: 10,
    stage_name: 'Deaeration',
    phase: 'Final bulk',
    temp_actual: '28°C',
    time_actual: '5 menit',
    speed_actual: '100 rpm tanpa vacuum',
    observation_actual: 'Deaerasi tanpa vacuum menyebabkan gelembung mikro tetap terperangkap di matriks emulsi'
  },
  {
    no: 11,
    stage_name: 'Filling sampel',
    phase: 'Final bulk',
    temp_actual: '27°C',
    time_actual: '10 menit',
    speed_actual: 'Manual filling',
    observation_actual: 'Sampel terisi rapi, namun setelah 24 jam terlihat gejala creaming ringan di permukaan atas'
  }
];

export const MOCK_CPP_DEVIATION_FINAL_OBSERVATIONS: CppFinalObservation[] = [
  {
    parameter: 'pH',
    target: '5.50 - 6.00',
    result_t0: '5.40',
    result_t24: '5.42',
    status: 'Perlu Perhatian',
    evaluation_note: 'pH sedikit di bawah target optimum, perlu re-titrasi larutan TEA 10%.'
  },
  {
    parameter: 'Viskositas',
    target: '18.000 - 24.000 cPs',
    result_t0: '16.500 cPs',
    result_t24: '16.800 cPs',
    status: 'Perlu Perhatian',
    evaluation_note: 'Viskositas lebih rendah akibat thermal overshoot 82°C yang merusak sebagian rantai polimer carbomer.'
  },
  {
    parameter: 'Organoleptik',
    target: 'Putih lembut berkilau, tekstur gel-cream segar, cepat meresap, non-greasy',
    result_t0: 'Putih susu, agak encer',
    result_t24: 'Putih susu, microbubble terlihat di lapisan atas',
    status: 'Perlu Perhatian',
    evaluation_note: 'Microbubble udara terjebak mengurangi kejernihan dan kilau produk.'
  },
  {
    parameter: 'Homogenitas',
    target: 'Homogen stabil tanpa pemisahan fase/creaming, droplet seragam d(0.9) < 2.5 µm',
    result_t0: 'Cukup homogen',
    result_t24: 'Teramati creaming tipis di bagian atas',
    status: 'Perlu Perhatian',
    evaluation_note: 'Deviasi kecepatan penuangan fase B dan microbubble memicu destabilisasi emulsi (dialirkan ke RCA 6M).'
  },
  {
    parameter: 'Filling & Integritas Kemasan',
    target: 'Netto 30.0 ± 0.5 g, bebas microbubble, sealing kedap udara rapat',
    result_t0: 'Rapi',
    result_t24: 'Rongga udara mikro terperangkap di beberapa sampel jar',
    status: 'Perlu Perhatian',
    evaluation_note: 'Deaerasi tanpa vacuum tidak memadai untuk viskositas di atas 15.000 cPs.'
  }
];

// CMA (Critical Material Attributes)
export const MOCK_CMA_ATTRIBUTES: CmaAttribute[] = [
  {
    id: 'cma-1',
    material_name: 'Bulk Emulsi O/W',
    attribute_name: 'Droplet Size Distribution d(0.9)',
    target_spec: '< 2.5 µm',
    actual_measured: '1.82 µm',
    status: 'COMPLIANT',
    impact_to_cqa: 'Menentukan stabilitas kinetik dan mencegah pemisahan gravitasi (creaming).'
  },
  {
    id: 'cma-2',
    material_name: 'Sistem Dual-Emulsifier',
    attribute_name: 'Offset HLB Emulsifier vs rHLB Minyak',
    target_spec: 'Delta HLB ≤ 0.5 unit',
    actual_measured: '0.00 unit (10.6 vs 10.6)',
    status: 'COMPLIANT',
    impact_to_cqa: 'Membentuk tegangan antar-muka interfacial minimum pada droplet minyak.'
  },
  {
    id: 'cma-3',
    material_name: 'Beeswax (Cera Alba)',
    attribute_name: 'Titik Leleh (Melting Point Range)',
    target_spec: '61.0°C - 65.0°C',
    actual_measured: '63.4°C (USP Method)',
    status: 'COMPLIANT',
    impact_to_cqa: 'Membentuk jaringan gel kristalin untuk viskositas dan barrier oklusif.'
  },
  {
    id: 'cma-4',
    material_name: 'Niacinamide PC Active',
    attribute_name: 'Kemurnian Bahan Aktif (Assay HPLC)',
    target_spec: '≥ 99.0% (Asam Nikotinat < 100 ppm)',
    actual_measured: '99.6% (Asam Nikotinat 22 ppm)',
    status: 'COMPLIANT',
    impact_to_cqa: 'Mencegah kemerahan (vasodilatasi flushing) pada kulit sensitif.'
  },
  {
    id: 'cma-5',
    material_name: 'Cetyl Alcohol (Kalcol 6098)',
    attribute_name: 'Bilangan Asam (Acid Value)',
    target_spec: '< 0.1 mg KOH/g',
    actual_measured: '0.04 mg KOH/g',
    status: 'COMPLIANT',
    impact_to_cqa: 'Mencegah hidrolisis lemak dan bau tengik selama penyimpanan.'
  },
  {
    id: 'cma-6',
    material_name: 'Pengawet (Euxyl PE 9010)',
    attribute_name: 'Kadar Phenoxyethanol',
    target_spec: '90.0% - 91.0%',
    actual_measured: '90.4%',
    status: 'COMPLIANT',
    impact_to_cqa: 'Menjamin proteksi spektrum luas terhadap bakteri Gram-negatif dan Gram-positif.'
  },
  {
    id: 'cma-7',
    material_name: 'pH Adjuster (Citric Acid)',
    attribute_name: 'Kapasitas Buffering pH',
    target_spec: 'Mampu menahan pH bulk di 5.5 - 6.0',
    actual_measured: 'Titik Ekuivalen pH 5.75',
    status: 'COMPLIANT',
    impact_to_cqa: 'Menjaga stabilitas struktur carbomer dan kompatibilitas dengan acid mantle kulit.'
  },
  {
    id: 'cma-8',
    material_name: 'UV Filter (TiO2 Dispersion)',
    attribute_name: 'Ukuran Partikel UV (D50)',
    target_spec: '10 - 20 nm',
    actual_measured: '15 nm',
    status: 'COMPLIANT',
    impact_to_cqa: 'Menghindari efek whitecast berlebih sambil memberikan proteksi SPF yang optimal.'
  }
];

export const MOCK_TRIAL_BATCH: TrialBatch = {
  id: 'batch-2026-004',
  batch_number: 'LOT-MOIST-26-04B',
  candidate_id: 'cand-A',
  candidate_name: 'Hydra-Dew Barrier Gel-Cream',
  target_mass_kg: 5.0,
  operator_name: 'Rivdy (Lead R&D Formulator)',
  created_at: '2026-09-17 14:30 WIB',
  status: 'DEVIATION_FLAGGED',
  deviation_reason: 'Phase separation observed after 24h accelerated thermal stability testing (45°C). Upper oil ring meniscus visible with syneresis.',
  measured_ph: 5.68,
  measured_viscosity_cps: 12400,
  appearance_test: 'Unstable emulsion, biphasic liquid ring formation on top surface',
  steps: [
    {
      id: 'step-1',
      order: 1,
      name: 'Dispersi Polimer & Fase Air (Phase A)',
      phase: 'Phase A',
      equipment: 'Silverson High-Shear L5M-A',
      target_temp_c: 75,
      actual_temp_c: 75,
      target_rpm: 1200,
      actual_rpm: 1200,
      target_duration_min: 20,
      actual_duration_min: 20,
      endpoint_criteria: 'Larutan bening, tanpa gumpalan carbomer (lump-free)',
      status: 'COMPLETED'
    },
    {
      id: 'step-2',
      order: 2,
      name: 'Pelelehan & Pemanasan Fase Minyak (Phase B)',
      phase: 'Phase B',
      equipment: 'Jacketed Heating Tank 10L',
      target_temp_c: 75,
      actual_temp_c: 76,
      target_rpm: 400,
      actual_rpm: 400,
      target_duration_min: 15,
      actual_duration_min: 15,
      endpoint_criteria: 'Seluruh lipid (Cetyl alcohol, Squalane, Emulsifier) leleh sempurna & homogen',
      status: 'COMPLETED'
    },
    {
      id: 'step-3',
      order: 3,
      name: 'Emulsifikasi (Phase B into Phase A)',
      phase: 'Phase A + B',
      equipment: 'Anchor Agitator + High Shear Homogenizer',
      target_temp_c: 75,
      actual_temp_c: 67,
      target_rpm: 3500,
      actual_rpm: 2100,
      target_duration_min: 10,
      actual_duration_min: 6,
      endpoint_criteria: 'Emulsi putih susu glossy, droplet size d(0.9) < 2.5 µm',
      status: 'DEVIATION',
      operator_notes: 'Homogenizer RPM dropped due to motor safety overload trip. Emulsification temperature fell to 67°C prematurely.',
      has_deviation: true
    },
    {
      id: 'step-4',
      order: 4,
      name: 'Pendinginan Bertahap & Sirkulasi',
      phase: 'Bulk',
      equipment: 'Water Chilled Coil Tank',
      target_temp_c: 40,
      actual_temp_c: 40,
      target_rpm: 350,
      actual_rpm: 350,
      target_duration_min: 30,
      actual_duration_min: 30,
      endpoint_criteria: 'Suhu bulk stabil di 40°C sebelum penambahan bahan termolabil',
      status: 'COMPLETED'
    },
    {
      id: 'step-5',
      order: 5,
      name: 'Penambahan Bahan Aktif & Preservatif (Phase C & D)',
      phase: 'Phase C (Actives, Stabilizer & Preservative)',
      equipment: 'Slow Anchor Sweep Blade',
      target_temp_c: 38,
      actual_temp_c: 38,
      target_rpm: 250,
      actual_rpm: 250,
      target_duration_min: 15,
      actual_duration_min: 15,
      endpoint_criteria: 'Bahan aktif larut homogen tanpa foam atau deaerasi berlebih',
      status: 'COMPLETED'
    },
    {
      id: 'step-6',
      order: 6,
      name: 'Quality Assurance & Sampling Stabilitas',
      phase: 'Bulk Final',
      equipment: 'Brookfield DV2T + Mettler Toledo pH Meter',
      target_temp_c: 25,
      actual_temp_c: 25,
      target_rpm: 0,
      actual_rpm: 0,
      target_duration_min: 10,
      actual_duration_min: 10,
      endpoint_criteria: 'pH 5.5 - 6.0, Viskositas 18,000 - 24,000 cPs, Tidak ada pemisahan fase',
      status: 'DEVIATION',
      operator_notes: 'Viskositas hanya 12,400 cPs (Target: min 18,000). Uji stabilitas dipercepat 45°C menunjukkan pemisahan fase air-minyak!',
      has_deviation: true
    }
  ]
};

export const MOCK_FISHBONE_BRANCHES: FishboneBranch[] = [
  {
    category: 'Machine',
    icon: 'Cpu',
    causes: [
      {
        id: 'c-m1',
        text: 'Homogenizer RPM sub-optimal (2,100 vs target 3,500 RPM)',
        detail: 'Motor inverter thermal trip menyebabkan kecepatan rotor-stator drop di tengah emulsifikasi.',
        likelihood: 'HIGH',
        status: 'CONFIRMED_CAUSE',
        evidence: 'Log sensor PLC Silverson L5M mencatat motor frequency throttle pada menit ke-4.'
      },
      {
        id: 'c-m2',
        text: 'Chiller cooling rate terlalu lambat',
        detail: 'Fouling pada jaket pendingin mengurangi laju pendinginan bulk emulsion.',
        likelihood: 'LOW',
        status: 'RULED_OUT',
        evidence: 'Data logger suhu menunjukkan pendinginan linear 1.1°C/menit sesuai spesifikasi.'
      }
    ]
  },
  {
    category: 'Method',
    icon: 'GitBranch',
    causes: [
      {
        id: 'c-me1',
        text: 'Emulsifikasi dipotong menjadi 6 menit (Target: 10 menit)',
        detail: 'Operator menghentikan shear lebih awal karena mengira emulsi sudah terbentuk.',
        likelihood: 'HIGH',
        status: 'CONFIRMED_CAUSE',
        evidence: 'Batch execution record timestamp menunjukkan durasi shear hanya 6m 12s.'
      },
      {
        id: 'c-me2',
        text: 'Urutan penuangan terbalik (Phase A into Phase B)',
        detail: 'Penuangan fase air ke minyak dapat menyebabkan inversi fase mendadak.',
        likelihood: 'LOW',
        status: 'RULED_OUT',
        evidence: 'CCTV dan checklist operator memverifikasi B dituangkan ke A sesuai SOP.'
      }
    ]
  },
  {
    category: 'Material',
    icon: 'FlaskConical',
    causes: [
      {
        id: 'c-mat1',
        text: 'Kesesuaian HLB Emulsifier terhadap rHLB Fase Minyak',
        detail: 'Rasio Span 60 dan Tween 80 menghasilkan HLB 10.6 vs kebutuhan rHLB fase minyak 10.6. Rasio teoritis tepat.',
        likelihood: 'LOW',
        status: 'RULED_OUT',
        evidence: 'Perhitungan deterministik HLB match sempurna; kegagalan didorong oleh energi mekanis (shear).'
      },
      {
        id: 'c-mat2',
        text: 'Bahan Baku Cetyl Alcohol kedaluwarsa atau degradasi',
        detail: 'Penurunan kemurnian rantai C16 dapat menurunkan ketahanan kristal cair emulsi.',
        likelihood: 'LOW',
        status: 'RULED_OUT',
        evidence: 'CoA Lot #K60-20260810 menunjukkan kemurnian 99.1%, valid s/d 2028.'
      }
    ]
  },
  {
    category: 'Man',
    icon: 'UserCheck',
    causes: [
      {
        id: 'c-man1',
        text: 'Operator junior belum training kalibrasi shear endpoint',
        detail: 'Kurangnya pemahaman mengenai signifikansi droplet packing density terhadap viskositas.',
        likelihood: 'MEDIUM',
        status: 'HYPOTHESIS',
        evidence: 'Matriks kompetensi menunjukkan refresher training SOP emulsifikasi terakhir pada 8 bulan lalu.'
      }
    ]
  },
  {
    category: 'Measurement',
    icon: 'Gauge',
    causes: [
      {
        id: 'c-ms1',
        text: 'Viscometer Spindle & RPM mismatch saat pengujian',
        detail: 'Penggunaan spindle berbeda dapat menghasilkan pembacaan cPs semu.',
        likelihood: 'LOW',
        status: 'RULED_OUT',
        evidence: 'Verifikasi QA: Spindle TC @ 10 RPM pada 25°C digunakan konsisten.'
      }
    ]
  },
  {
    category: 'Environment',
    icon: 'CloudRain',
    causes: [
      {
        id: 'c-env1',
        text: 'Fluktuasi suhu ruang compounding lab (cleanroom)',
        detail: 'Suhu ruangan terlalu hangat dapat memperlambat kristalisasi lamellar.',
        likelihood: 'LOW',
        status: 'RULED_OUT',
        evidence: 'BMS HVAC menunjukkan suhu ruangan konstan di 21.4°C ± 0.5°C.'
      }
    ]
  }
];

export const MOCK_FIVE_WHYS: FiveWhyItem[] = [
  {
    order: 1,
    question: 'Mengapa emulsi mengalami phase separation setelah 24 jam penyimpanan?',
    answer: 'Ukuran droplet fase minyak terlalu besar (> 8.5 µm), sehingga gaya gravitasi mengalahkan stabilitas Brownian motion (hukum Stokes).',
    evidence_status: 'CONFIRMED_EVIDENCE',
    cognitive_bias_alert: 'Anchoring Bias: Jangan langsung menyimpulkan formula kimia salah tanpa memeriksa data droplet size mikroskop.'
  },
  {
    order: 2,
    question: 'Mengapa ukuran droplet fase minyak tidak mencapai target dispersi (< 2.5 µm)?',
    answer: 'Energi dispersi mekanis saat proses emulsifikasi tidak mencukupi untuk memecah tetesan minyak.',
    evidence_status: 'CONFIRMED_EVIDENCE'
  },
  {
    order: 3,
    question: 'Mengapa energi dispersi mekanis tidak mencukupi?',
    answer: 'Homogenizer rotor hanya berputar di 2,100 RPM (Target: 3,500 RPM) dan durasi terpotong menjadi 6 menit (Target: 10 menit).',
    evidence_status: 'CONFIRMED_EVIDENCE'
  },
  {
    order: 4,
    question: 'Mengapa kecepatan homogenizer drop dan dipotong lebih awal?',
    answer: 'Inverter motor Silverson mengalami thermal overload safety trip akibat ventilasi fan filter tersumbat debu.',
    evidence_status: 'CONFIRMED_EVIDENCE',
    cognitive_bias_alert: 'Premature Closure: Menghentikan investigasi pada kelalaian operator padahal ada masalah hardware maintenance.'
  },
  {
    order: 5,
    question: 'Mengapa filter ventilasi motor tersumbat dan tidak terdeteksi sebelum proses trial?',
    answer: 'Jadwal preventive maintenance mesin pilot L5M terlewatkan selama 2 siklus karena tidak terintegrasi ke sistem batch execution.',
    evidence_status: 'CONFIRMED_EVIDENCE',
    cognitive_bias_alert: 'Root cause teridentifikasi: Kombinasi kegagalan Preventive Maintenance mesin pilot + interupsi kontrol shear saat emulsifikasi.'
  }
];

export const MOCK_CAPA_ITEMS: CapaItem[] = [
  {
    id: 'capa-001',
    report_id: 'CAPA-2026-089',
    title: 'Phase separation pada emulsi krim O/W setelah penyimpanan suhu kamar',
    incident_date: '2026-06-12',
    problem_statement: 'Pemisahan fase air dan fase minyak (oil syneresis) pada formula barrier cream lot pilot akibat kegagalan droplet break-up.',
    severity: 'CRITICAL',
    status: 'Closed',
    category: 'Process & Equipment',
    root_cause: 'Shear homogenization RPM drop di bawah 2,500 RPM akibat pendinginan motor terhambat debu + waktu emulsifikasi kurang dari 8 menit.',
    corrective_action: 'Batch pilot di-quarantine; dilakukan pembersihan darurat unit ventilasi Silverson L5M dan uji ulang 1 batch replikasi pada 3,500 RPM selama 10 menit penuh.',
    preventive_action: 'Integrasikan interlock check RPM pada PLC Pilot: proses tidak boleh dilanjutkan jika RPM < 3,200. Masukkan audit mingguan filter pendingin motor mesin.',
    effectiveness_review: 'Replikasi batch menghasilkan stabilitas 3 bulan tanpa pemisahan (40°C & 45°C), d(0.9) droplet 1.8 µm stabil.',
    similarity_score: 98,
    owner: 'Dr. Hendra (Engineering QA)'
  },
  {
    id: 'capa-002',
    report_id: 'CAPA-2026-042',
    title: 'Penurunan viskositas drastis pada sediaan gel pelembab dengan polimer akrilat',
    incident_date: '2026-04-18',
    problem_statement: 'Viskositas gel pelembab drop dari 22,000 cPs menjadi 8,500 cPs setelah penambahan garam aktif (Niacinamide & Sodium PCA).',
    severity: 'MAJOR',
    status: 'Closed',
    category: 'Formulation Chemistry',
    root_cause: 'Muatan ion elektrolit bebas menetralkan rantai karboksilat Carbomer terdispersi sehingga koil polimer kolaps.',
    corrective_action: 'Ganti sistem pengental Carbomer standar dengan polimer toleran elektrolit (Hydroxylethyl Acrylate / Ammonium Polyacryloyldimethyl Taurate).',
    preventive_action: 'Buat aturan formulation gate: semua formula dengan elektrolit > 1.5% wajib disaring oleh sistem peringatan salt-tolerance.',
    effectiveness_review: 'Viskositas batch baru stabil di 21,500 cPs setelah 60 hari stress test termal.',
    similarity_score: 84,
    owner: 'Siti Rahma (Formulation Specialist)'
  },
  {
    id: 'capa-003',
    report_id: 'CAPA-2025-115',
    title: 'Sedimentasi partikel serbuk titanium dioksida pada hybrid sunscreen fluid',
    incident_date: '2025-11-03',
    problem_statement: 'Terbentuk endapan keras (caking) pada dasar botol sunscreen setelah penyimpanan 14 hari.',
    severity: 'MAJOR',
    status: 'Closed',
    category: 'Material Dispersion',
    root_cause: 'Wetting agent dan dispersing non-surfactant tidak diaduk dengan bead-mill sebelum digabung ke fase minyak.',
    corrective_action: 'Pre-milling dispersi mineral UV filter selama 45 menit sebelum dicampurkan ke fase ruah.',
    preventive_action: 'Tetapkan parameter finess of grind (hegman gauge < 5 µm) sebagai critical control point (CCP).',
    effectiveness_review: 'Tidak ada sedimentasi teramati pada centrifuge stress test 4000 RPM selama 30 menit.',
    similarity_score: 72,
    owner: 'Agus Pratama (Pilot Production)'
  },
  {
    id: 'capa-004',
    report_id: 'CAPA-2026-004',
    title: 'Ketidaksesuaian HLB rasio Polysorbate 80 dan Sorbitan Trioleate',
    incident_date: '2026-01-20',
    problem_statement: 'Emulsi w/o menunjukkan creaming cepat dalam 4 jam setelah pengadukan.',
    severity: 'MAJOR',
    status: 'Closed',
    category: 'HLB Formulation',
    root_cause: 'Salah perhitungan rasio fraksi emulsifier; target HLB fase minyak dihitung dari massa total batch bukan dari massa fase minyak.',
    corrective_action: 'Koreksi rumus aljabar perhitungan fraksi A/B dengan penyebut eksklusif massa fase minyak.',
    preventive_action: 'Gunakan kalkulator deterministik rangkAI terverifikasi untuk seluruh perhitungan emulsifier O/W dan W/O.',
    effectiveness_review: 'Emulsi uji bertahan tanpa creaming selama 30 hari pada freeze-thaw cycles.',
    similarity_score: 91,
    owner: 'Rivdy (Lead R&D)'
  },
  {
    id: 'capa-005',
    report_id: 'CAPA-2025-078',
    title: 'Kontaminasi mikrobiologi pseudomonas pada sediaan toner tanpa pengawet',
    incident_date: '2025-08-14',
    problem_statement: 'Uji ALT mikroba melebihi ambang batas BPOM (> 1000 CFU/g) pada formula yang mengklaim preservative-free.',
    severity: 'CRITICAL',
    status: 'Closed',
    category: 'Microbiological & Regulatory',
    root_cause: 'Aktivitas air (aw) produk tinggi (0.98) tanpa preservation booster multifungsi (misal Caprylyl Glycol / 1,2-Hexanediol).',
    corrective_action: 'Recall dan musnahkan batch terkait. Reformulasi dengan preservative hurdle technology.',
    preventive_action: 'Sistem wajib memblokir persetujuan formula berbahan dasar air tanpa preservative strategy terverifikasi.',
    effectiveness_review: 'Pass Challenge Test ISO 11930 kategori 1 (Day 7, 14, 28 zero log reduction fail).',
    similarity_score: 65,
    owner: 'Dr. Nurul (Microbiology QA)'
  }
];

export function calculateOilPhaseRHLB(components: OilPhaseComponent[]): { 
  total_oil_mass: number; 
  calculated_rhlb: number; 
  breakdown: { name: string; mass: number; percentage_of_oil: number; contribution: number }[] 
} {
  const total_oil_mass = components.reduce((sum, c) => sum + (c.mass_grams || 0), 0);
  if (total_oil_mass <= 0) {
    return { total_oil_mass: 0, calculated_rhlb: 0, breakdown: [] };
  }

  const breakdown = components.map(c => {
    const fraction = c.mass_grams / total_oil_mass;
    const contribution = fraction * (c.rhlb_ow || 0);
    return {
      name: c.name,
      mass: c.mass_grams,
      percentage_of_oil: fraction * 100,
      contribution: contribution
    };
  });

  const calculated_rhlb = breakdown.reduce((sum, b) => sum + b.contribution, 0);

  return {
    total_oil_mass,
    calculated_rhlb: Number(calculated_rhlb.toFixed(2)),
    breakdown
  };
}

export function calculateDualEmulsifierRatio(
  hlbA: number, 
  hlbB: number, 
  targetHLB: number, 
  totalMassGrams: number
): {
  feasible: boolean;
  fractionA: number;
  fractionB: number;
  massAGrams: number;
  massBGrams: number;
  errorMessage?: string;
} {
  if (hlbA === hlbB) {
    return {
      feasible: false,
      fractionA: 0,
      fractionB: 0,
      massAGrams: 0,
      massBGrams: 0,
      errorMessage: 'Nilai HLB kedua emulsifier sama persis, tidak dapat membentuk rentang interpolasi.'
    };
  }

  const minHLB = Math.min(hlbA, hlbB);
  const maxHLB = Math.max(hlbA, hlbB);

  if (targetHLB < minHLB || targetHLB > maxHLB) {
    return {
      feasible: false,
      fractionA: 0,
      fractionB: 0,
      massAGrams: 0,
      massBGrams: 0,
      errorMessage: `Target HLB (${targetHLB}) berada di luar rentang kedua emulsifier (${minHLB} - ${maxHLB}).`
    };
  }

  const fractionA = (targetHLB - hlbB) / (hlbA - hlbB);
  const fractionB = 1 - fractionA;
  const massAGrams = fractionA * totalMassGrams;
  const massBGrams = fractionB * totalMassGrams;

  return {
    feasible: true,
    fractionA: Number(fractionA.toFixed(4)),
    fractionB: Number(fractionB.toFixed(4)),
    massAGrams: Number(massAGrams.toFixed(2)),
    massBGrams: Number(massBGrams.toFixed(2))
  };
}
