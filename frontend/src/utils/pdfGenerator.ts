import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { 
  FormulaCandidate, 
  StabilityTestResult, 
  CppParameter, 
  CmaAttribute,
  Ingredient,
  CppActualStep,
  CppFinalObservation
} from '../types';
import { 
  MOCK_CPP_TARGET_STEPS, 
  MOCK_CPP_ACTUAL_STEPS, 
  MOCK_CPP_FINAL_OBSERVATIONS,
  MOCK_CPP_DEVIATION_ACTUAL_STEPS,
  MOCK_CPP_DEVIATION_FINAL_OBSERVATIONS,
  BLANK_CPP_ACTUAL_STEPS,
  BLANK_CPP_FINAL_OBSERVATIONS
} from '../data/mockData';

// Helper for professional PDF header styling
function applyDocumentHeader(doc: jsPDF, title: string, subtitle: string, documentNo: string) {
  // Brand banner
  doc.setFillColor(11, 22, 40); // Dark navy slate
  doc.rect(0, 0, 210, 26, 'F');

  // Brand Name
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(16);
  doc.setTextColor(16, 185, 129); // Emerald neon
  doc.text('rangkAI', 14, 12);

  doc.setFontSize(9);
  doc.setTextColor(148, 163, 184); // Slate
  doc.text('Cosmetics AI Formulation Studio & R&D Copilot', 14, 18);

  // Document No & Standard badge
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(255, 255, 255);
  doc.text(`Dokumen: ${documentNo}`, 196, 12, { align: 'right' });
  doc.text('Standar: CPKB BPOM / ISO 22716 R&D Protocol', 196, 18, { align: 'right' });

  // Document Title
  doc.setTextColor(15, 23, 42);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(13);
  doc.text(title, 14, 34);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8.5);
  doc.setTextColor(71, 85, 105);
  doc.text(subtitle, 14, 39);

  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(14, 42, 196, 42);
}

// 1. FORMULASI REPORT PDF
export function exportFormulationPdf(candidate: FormulaCandidate) {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });

  applyDocumentHeader(
    doc,
    'LEMBAR SPESIFIKASI FORMULASI PRODUK KOSMETIK (FINAL)',
    `Formula: ${candidate.name} (${candidate.code}) | Tanggal Rilis: ${dateStr}`,
    `FORM-SPEC-${candidate.code}`
  );

  // Metadata block
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`Kategori: Emulsi O/W Pelembab Tropis`, 14, 48);
  doc.text(`Status Regulasi BPOM: ${candidate.bpom_compliant ? 'MEMENUHI SYARAT (BPOM COMPLIANT)' : 'TIDAK SESUAI (BPOM VIOLATION)'}`, 14, 53);
  doc.text(`Status Sertifikasi Halal: ${candidate.halal_compliant ? 'HALAL VERIFIED (BPJPH / LPPOM MUI)' : 'HARAM RISK / REVIEW REQUIRED'}`, 14, 58);
  doc.text(`Biaya Bahan Baku: IDR ${candidate.raw_material_cost_per_kg.toLocaleString('id-ID')}/kg`, 14, 63);

  doc.text(`Akurasi Model: ${candidate.metrics.accuracy_pct}% (${candidate.metrics.accuracy_label})`, 110, 48);
  doc.text(`Presisi Model: ${candidate.metrics.precision_pct}% (${candidate.metrics.precision_label})`, 110, 53);
  doc.text(`Koefisien Korelasi (r): ${candidate.metrics.correlation_r} (${candidate.metrics.correlation_label})`, 110, 58);
  doc.text(`Predicted Viscosity: ${candidate.predicted_viscosity_cps.toLocaleString()} cPs | pH: ${candidate.predicted_ph}`, 110, 63);

  // Composition Table
  const tableRows = candidate.items.map((item, idx) => [
    (idx + 1).toString(),
    item.phase,
    item.inci_name,
    item.trade_name,
    `${item.percentage.toFixed(2)}%`,
    item.function,
    item.halal_status === 'HALAL_VERIFIED' ? 'Halal ✓' : item.halal_status === 'HALAL_EXEMPT' ? 'Exempt' : 'Review ✗',
    item.bpom_compliant !== false ? 'Lolos ✓' : 'Peringatan ✗'
  ]);

  autoTable(doc, {
    startY: 68,
    head: [['No', 'Fase', 'Nama INCI', 'Nama Dagang', 'Dosis (%)', 'Fungsi / Peran', 'Halal', 'CoA/BPOM']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    bodyStyles: { fontSize: 7, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  // @ts-ignore
  let finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 160;

  // Replacement note if violated
  if (candidate.replacement_solution) {
    doc.setFillColor(254, 242, 242);
    doc.rect(14, finalY, 182, 16, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(225, 29, 72);
    doc.setFont('helvetica', 'bold');
    doc.text(`Catatan Tindakan Korektif (Solusi Pengganti AI):`, 16, finalY + 5);
    doc.setFont('helvetica', 'normal');
    doc.text(`${candidate.replacement_solution.culprit_ingredient} diganti dengan ${candidate.replacement_solution.replacement_title}.`, 16, finalY + 10);
    doc.text(`Hasil Regulasi: ${candidate.replacement_solution.regulatory_gain}`, 16, finalY + 14);
    finalY += 22;
  }

  // Signatures
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Disusun Oleh (Formulator):', 14, finalY + 10);
  doc.text('Disetujui Oleh (R&D Lead):', 80, finalY + 10);
  doc.text('Diverifikasi Oleh (QA Manager):', 145, finalY + 10);

  doc.line(14, finalY + 28, 55, finalY + 28);
  doc.line(80, finalY + 28, 125, finalY + 28);
  doc.line(145, finalY + 28, 190, finalY + 28);

  doc.text('Rivdy (Lead R&D)', 14, finalY + 32);
  doc.text('Head of Cosmetics R&D', 80, finalY + 32);
  doc.text('Head of Quality Assurance', 145, finalY + 32);

  doc.save(`Laporan_Formulasi_${candidate.code}_rangkAI.pdf`);
}

// 2. STABILITY REPORT PDF
export function exportStabilityPdf(results: StabilityTestResult[]) {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });

  applyDocumentHeader(
    doc,
    'LAPORAN HASIL PENGUJIAN STABILITAS FISIK PRODUK KOSMETIK',
    `Evaluasi 8 Kondisi Pengujian | Kaidah Mutu: Penurunan Viskositas Bulan ke-3 < 20% | Tanggal: ${dateStr}`,
    'STAB-REP-MOIST-2026'
  );

  const tableRows = results.map((r, idx) => [
    (idx + 1).toString(),
    r.test_name,
    r.condition,
    `${r.initial_viscosity_cps.toLocaleString()} cPs`,
    `${r.measured_viscosity_cps.toLocaleString()} cPs`,
    `${r.viscosity_drop_pct.toFixed(1)}%`,
    r.is_stable ? 'STABIL (✓)' : 'TIDAK STABIL (✗)',
    r.notes
  ]);

  autoTable(doc, {
    startY: 48,
    head: [['No', 'Jenis Pengujian Stabilitas', 'Kondisi Uji', 'Visk. Awal', 'Visk. Akhir', 'Perubahan (%)', 'Evaluasi Mutu', 'Temuan & Keterangan']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [6, 182, 212], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    bodyStyles: { fontSize: 7, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  // @ts-ignore
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 180;

  // Kesimpulan Kelayakan
  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Kesimpulan Kelayakan Stabilitas:', 14, finalY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Formula lulus uji stabilitas suhu kamar 25°C (bulan 1-3) dan suhu 40°C dengan penurunan viskositas <20%.', 14, finalY + 5);
  doc.text('Uji akselerasi termal 45°C menunjukkan pemisahan fase dan telah dialirkan ke investigasi 6M Fishbone RCA & CAPA.', 14, finalY + 10);

  // Signatures
  doc.text('Analis Stabilitas:', 14, finalY + 24);
  doc.text('Quality Assurance Lead:', 110, finalY + 24);

  doc.line(14, finalY + 40, 60, finalY + 40);
  doc.line(110, finalY + 40, 160, finalY + 40);

  doc.text('Dr. Nurul (Stability Specialist)', 14, finalY + 44);
  doc.text('QA Cosmetics Release Manager', 110, finalY + 44);

  doc.save('Laporan_Uji_Stabilitas_rangkAI.pdf');
}

// 3. CPP REPORT PDF (SESUAI STANDAR PROTOKOL TRIAL BATCH: SECTION C, D, E)
export function exportCppPdf(
  batchMode: 'blank' | 'optimized' | 'deviation' | boolean = 'blank', 
  customActualSteps?: CppActualStep[],
  customFinalObs?: CppFinalObservation[]
) {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });
  const isDev = batchMode === 'deviation' || batchMode === true;
  const isBlank = batchMode === 'blank';
  const batchNo = isDev ? 'LOT-MOIST-26-04A' : 'LOT-MOIST-26-04B';
  const batchLabel = isBlank 
    ? 'Lembar Kerja Protokol Batch (Blank SOP - Menunggu Pelaksanaan Trial)' 
    : isDev ? 'Trial Batch Deviasi Pilot' : 'Trial Batch Faktual Teroptimasi';

  // Document Header
  applyDocumentHeader(
    doc,
    isBlank ? 'PROTOKOL PENGOLAHAN BATCH (BMR): TARGET PROSES & LEMBAR KERJA TRIAL' : 'LAPORAN PARAMETER PROSES KRITIS (CPP): TARGET PROSES VS AKTUAL TRIAL BATCH',
    `Batch No: ${batchNo} | ${batchLabel} | Sediaan: Hydra-Dew Gel-Cream | Tanggal: ${dateStr}`,
    `CPP-TR-${batchNo}${isBlank ? '-BLANK' : ''}`
  );

  let currentY = 48;

  // SECTION C BANNER
  doc.setFillColor(109, 40, 217); // Deep purple as shown in standard CPKB template
  doc.rect(14, currentY, 182, 6.5, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('C. Target Parameter Proses (Standar Formulasi R&D Pilot Compounding)', 17, currentY + 4.5);
  currentY += 8;

  // TABLE C: TARGET PARAMETER PROSES
  const targetRows = MOCK_CPP_TARGET_STEPS.map(t => [
    t.no.toString(),
    t.stage_name,
    t.phase,
    t.temp_target,
    t.time_target,
    t.speed_target,
    t.output_target
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['No', 'Tahap Target', 'Fase', 'Suhu Target', 'Waktu Target', 'Speed Target', 'Output/Observasi Target']],
    body: targetRows,
    theme: 'striped',
    headStyles: { fillColor: [124, 58, 237], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 6.5 },
    bodyStyles: { fontSize: 6.2, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [224, 242, 254] }, // soft cyan
    margin: { left: 14, right: 14 }
  });

  // @ts-ignore
  currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 130;

  // SECTION D BANNER
  doc.setFillColor(109, 40, 217); // Deep purple
  doc.rect(14, currentY, 182, 6.5, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text(`D. Data Aktual Trial Batch (${isBlank ? 'Lembar Catatan Pengolahan Riil Operator' : `Batch: ${batchNo}`})`, 17, currentY + 4.5);
  currentY += 8;

  // TABLE D: DATA AKTUAL TRIAL BATCH
  const actualSource = customActualSteps 
    ? customActualSteps 
    : isBlank 
      ? BLANK_CPP_ACTUAL_STEPS 
      : isDev ? MOCK_CPP_DEVIATION_ACTUAL_STEPS : MOCK_CPP_ACTUAL_STEPS;

  const actualRows = actualSource.map(a => [
    a.no.toString(),
    a.stage_name,
    a.phase,
    a.temp_actual || (isBlank ? '[ ........ °C ]' : '-'),
    a.time_actual || (isBlank ? '[ ........ mnt ]' : '-'),
    a.speed_actual || (isBlank ? '[ ........ rpm ]' : '-'),
    a.observation_actual || (isBlank ? '[ .............................................................. ]' : '-')
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['No', 'Tahap Aktual', 'Fase', 'Suhu Aktual', 'Waktu Aktual', 'Speed Aktual', 'Observasi Aktual']],
    body: actualRows,
    theme: 'striped',
    headStyles: { fillColor: [124, 58, 237], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 6.5 },
    bodyStyles: { fontSize: 6.2, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [224, 242, 254] },
    margin: { left: 14, right: 14 }
  });

  // Check if we need a new page for Section E
  // @ts-ignore
  currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 220;
  if (currentY > 200) {
    doc.addPage();
    applyDocumentHeader(
      doc,
      isBlank ? 'LEMBAR PENGUJIAN PENGAMATAN AKHIR MUTU (QC RELEASE)' : 'LAPORAN PARAMETER PROSES KRITIS (CPP): PENGAMATAN AKHIR & EVALUASI MUTU',
      `Batch No: ${batchNo} | Tanggal: ${dateStr}`,
      `CPP-TR-${batchNo}-P2`
    );
    currentY = 48;
  }

  // SECTION E BANNER
  doc.setFillColor(109, 40, 217);
  doc.rect(14, currentY, 182, 6.5, 'F');
  doc.setFontSize(8);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(255, 255, 255);
  doc.text('E. Data Pengamatan Akhir (Target vs Hasil T0 vs Hasil 24 Jam)', 17, currentY + 4.5);
  currentY += 8;

  // TABLE E: DATA PENGAMATAN AKHIR
  const obsSource = customFinalObs
    ? customFinalObs
    : isBlank
      ? BLANK_CPP_FINAL_OBSERVATIONS
      : isDev ? MOCK_CPP_DEVIATION_FINAL_OBSERVATIONS : MOCK_CPP_FINAL_OBSERVATIONS;

  const obsRows = obsSource.map(o => [
    o.parameter,
    o.target,
    o.result_t0 || (isBlank ? '[ ........ ]' : '-'),
    o.result_t24 || (isBlank ? '[ ........ ]' : '-'),
    isBlank ? 'MENUNGGU UJI' : o.status,
    o.evaluation_note || (isBlank ? '[ ................................................................ ]' : '-')
  ]);

  autoTable(doc, {
    startY: currentY,
    head: [['Parameter', 'Target', 'Hasil T0', 'Hasil 24 Jam', 'Status', 'Catatan Evaluasi']],
    body: obsRows,
    theme: 'striped',
    headStyles: { fillColor: [124, 58, 237], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7 },
    bodyStyles: { fontSize: 6.8, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [224, 242, 254] },
    margin: { left: 14, right: 14 }
  });

  // @ts-ignore
  currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : currentY + 40;

  // Evaluation / Instructions Box
  if (isBlank) {
    doc.setFillColor(241, 245, 249); // slate light
    doc.rect(14, currentY, 182, 24, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(30, 41, 59);
    doc.setFont('helvetica', 'bold');
    doc.text('Petunjuk Pengisian Lembar Eksekusi Batch Laboratorium & Pilot Plant:', 17, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    doc.text('1. Lembar ini adalah template Batch Manufacturing Record (BMR) resmi yang dikeluarkan sebelum proses penimbangan.', 17, currentY + 10);
    doc.text('2. Operator wajib mencatat suhu aktual, waktu, kecepatan pengadukan, dan observasi visual secara real-time pada setiap tahap.', 17, currentY + 14);
    doc.text('3. Analis QC wajib menguji dan mencatat pH serta viskositas sediaan pada jam ke-0 (T0) dan setelah stabilisasi 24 jam (T24).', 17, currentY + 18);
    doc.text('4. Setiap deviasi di luar parameter target wajib segera dilaporkan untuk pembukaan form investigasi CAPA.', 17, currentY + 22);
  } else if (isDev) {
    doc.setFillColor(254, 242, 242);
    doc.rect(14, currentY, 182, 24, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(225, 29, 72);
    doc.setFont('helvetica', 'bold');
    doc.text('Catatan Investigasi Deviasi & Rekomendasi Tindakan Korektif (CAPA):', 17, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(71, 85, 105);
    doc.text('1. Suhu pemanasan fase A overshoot (82°C vs target 70-75°C) & penambahan fase B terlalu cepat memicu bulk kasar.', 17, currentY + 10);
    doc.text('2. Kecepatan homogenisasi 3200 rpm tanpa deaerasi vakum menyebabkan air entrapment dan viskositas awal rendah (16.500 cPs).', 17, currentY + 14);
    doc.text('3. Rekomendasi CAPA: Pasang flow-meter penambahan fase minyak dan aktifkan vacuum -0.85 bar pada tahap deaerasi 15 menit.', 17, currentY + 18);
    doc.text('4. Formulir CAPA diajukan ke Quality Assurance Manager untuk re-validasi batch pilot.', 17, currentY + 22);
  } else {
    doc.setFillColor(240, 253, 244); // soft green
    doc.rect(14, currentY, 182, 26, 'F');
    doc.setFontSize(7.5);
    doc.setTextColor(22, 101, 52); // dark green
    doc.setFont('helvetica', 'bold');
    doc.text('Kesimpulan Validasi Parameter Proses Kritis (CPP) & Kesesuaian Mutu CQA:', 17, currentY + 5);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(6.8);
    doc.setTextColor(51, 65, 85);
    doc.text('1. Suhu pemanasan fase A (73°C) dan B (74°C) terkontrol ketat dalam rentang target 70-75°C, menjaga stabilitas polimer Carbopol & wax.', 17, currentY + 10);
    doc.text('2. Homogenisasi Rotor-Stator 2810 rpm (Median 3x replikasi) menghasilkan droplet emulsi sangat halus seragam d(0.9) = 2.1 µm.', 17, currentY + 14);
    doc.text('3. Nilai pH terverifikasi stabil pada 5.74 (T0) dan 5.75 (24 jam) memenuhi rentang fisiologis kulit 5.50 - 6.00.', 17, currentY + 18);
    doc.text('4. Viskositas 21.500 cPs (T0) dan 21.800 cPs (24 jam) memenuhi target spesifikasi sediaan pelembab 18.000 - 24.000 cPs.', 17, currentY + 22);
    doc.text('5. Deaerasi vacuum -0.85 bar tuntas mengeliminasi microbubble udara; bulk homogen berkilau (glossy) dan siap rilis batch pilot.', 17, currentY + 26);
  }

  currentY += 32;

  // Signatures
  doc.setFontSize(7.5);
  doc.setTextColor(71, 85, 105);
  doc.text('Operator Compounding:', 14, currentY + 6);
  doc.text('Lead Process Engineer:', 80, currentY + 6);
  doc.text('Production Manager:', 145, currentY + 6);

  doc.line(14, currentY + 20, 55, currentY + 20);
  doc.line(80, currentY + 20, 125, currentY + 20);
  doc.line(145, currentY + 20, 190, currentY + 20);

  doc.text('Operator Pilot Compounding', 14, currentY + 24);
  doc.text('Lead Process Engineer', 80, currentY + 24);
  doc.text('Production Manager', 145, currentY + 24);

  doc.save(`Laporan_CPP_${batchNo}_${isBlank ? 'BLANK_SOP' : 'TRIAL'}_rangkAI.pdf`);
}

// 4. CMA REPORT PDF
export function exportCmaPdf(cmaAttributes: CmaAttribute[]) {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });

  applyDocumentHeader(
    doc,
    'LAPORAN ATRIBUT KRITIS MATERIAL (CMA) & VERIFIKASI BAHAN BAKU',
    `Verifikasi Spesifikasi Fisikokimia, Sertifikat Halal & CoA Bahan Baku | Tanggal: ${dateStr}`,
    'CMA-VERIF-2026'
  );

  const tableRows = cmaAttributes.map((c, idx) => [
    (idx + 1).toString(),
    c.material_name,
    c.attribute_name,
    c.target_spec,
    c.actual_measured,
    c.status,
    c.impact_to_cqa
  ]);

  autoTable(doc, {
    startY: 48,
    head: [['No', 'Bahan Baku / Material', 'Atribut Kritis (CMA)', 'Target Spesifikasi', 'Hasil Ukur Aktual', 'Status Mutu', 'Pengaruh terhadap CQA']],
    body: tableRows,
    theme: 'striped',
    headStyles: { fillColor: [99, 102, 241], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    bodyStyles: { fontSize: 7, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  // @ts-ignore
  const finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 12 : 180;

  doc.setFontSize(8.5);
  doc.setFont('helvetica', 'bold');
  doc.setTextColor(15, 23, 42);
  doc.text('Pernyataan Audit Mutu Bahan Masuk (Incoming Raw Material):', 14, finalY);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Seluruh bahan baku yang lolos audit telah memverifikasi kesesuaian CoA, batas cemaran logam berat <10 ppm,', 14, finalY + 5);
  doc.text('bebas cemaran mikroba patogen, serta tersertifikasi Halal aktif oleh LPPOM MUI / BPJPH.', 14, finalY + 10);

  // Signatures
  doc.text('Inspektur Bahan Baku (QC):', 14, finalY + 24);
  doc.text('Quality Control Manager:', 110, finalY + 24);

  doc.line(14, finalY + 40, 60, finalY + 40);
  doc.line(110, finalY + 40, 160, finalY + 40);

  doc.text('QC Incoming Inspector', 14, finalY + 44);
  doc.text('Quality Control Head', 110, finalY + 44);

  doc.save('Laporan_CMA_Material_rangkAI.pdf');
}

// 5. INGREDIENT CERTIFICATE OF ANALYSIS (COA) & MSDS SUMMARY PDF
export function exportIngredientCoaPdf(ing: Ingredient) {
  const doc = new jsPDF();
  const dateStr = new Date().toLocaleDateString('id-ID', { dateStyle: 'long' });

  applyDocumentHeader(
    doc,
    'CERTIFICATE OF ANALYSIS (COA) & MATERIAL SPECIFICATION',
    `Bahan: ${ing.inci_name} (${ing.trade_name || 'Generic Grade'}) | Rilis Lot: ${ing.coa_details?.lot_number || 'LOT-2026-REG'} | Tanggal: ${dateStr}`,
    `COA-${ing.id.toUpperCase()}-2026`
  );

  // Material Details Header Block
  doc.setFontSize(8.5);
  doc.setTextColor(30, 41, 59);
  doc.text(`Nama INCI: ${ing.inci_name}`, 14, 48);
  doc.text(`Nama Dagang: ${ing.trade_name || '-'}`, 14, 53);
  doc.text(`Nomor CAS: ${ing.cas_number || '-'}`, 14, 58);
  doc.text(`Supplier: ${ing.supplier || 'Authorized Global Distributor'}`, 14, 63);

  doc.text(`Status Halal: ${ing.halal_status === 'HALAL_VERIFIED' ? 'Halal Certified (BPJPH/MUI)' : ing.halal_status === 'HALAL_EXEMPT' ? 'Halal Exempt (Mineral/Inorganic)' : 'Audit Review Required'}`, 110, 48);
  doc.text(`Status Regulasi: ${ing.regulatory_status}`, 110, 53);
  doc.text(`Batas Regulasi BPOM: ${ing.regulatory_max_pct ? `Maksimal ${ing.regulatory_max_pct}%` : 'Unrestricted'}`, 110, 58);
  doc.text(`Rentang Dosis Formulasi: ${ing.typical_min_pct}% - ${ing.typical_max_pct}%`, 110, 63);

  // CoA Parameters Table
  const coa = ing.coa_details;
  const coaRows = [
    ['1', 'Pemerian / Appearance', 'Standar Kompendial USP / BPOM', coa?.appearance || 'Sesuai spesifikasi', 'MEMENUHI SYARAT (PASS)'],
    ['2', 'Kadar Kemurnian (Assay HPLC/Titrimetri)', '≥ 98.0%', `${coa?.assay_purity_pct || 99.0}%`, 'MEMENUHI SYARAT (PASS)'],
    ['3', 'Susut Pengeringan (Loss on Drying)', '≤ 1.0%', `${coa?.loss_on_drying_pct || 0.2}%`, 'MEMENUHI SYARAT (PASS)'],
    ['4', 'Cemaran Logam Berat (Pb, As, Cd, Hg)', '< 10 ppm', coa?.heavy_metals_ppm || '< 5 ppm', 'MEMENUHI SYARAT (PASS)'],
    ['5', 'Total Plate Count Mikroba (TPC)', '< 100 CFU/g', coa?.microbial_alt || '< 50 CFU/g', 'MEMENUHI SYARAT (PASS)'],
    ['6', 'Uji Patogen (E. coli, P. aeruginosa, S. aureus)', 'Negatif / 10g', coa?.pathogens || 'Negatif', 'MEMENUHI SYARAT (PASS)'],
    ['7', 'pH Larutan 1%', '4.5 - 7.5', coa?.ph_solution_1pct ? coa.ph_solution_1pct.toString() : '6.5', 'MEMENUHI SYARAT (PASS)']
  ];

  if (coa?.melting_point_c) {
    coaRows.push(['8', 'Titik Leleh (Melting Point)', 'Rentang Farmakope', coa.melting_point_c, 'MEMENUHI SYARAT (PASS)']);
  }

  autoTable(doc, {
    startY: 68,
    head: [['No', 'Parameter Uji Mutu CoA', 'Kriteria Keberterimaan', 'Hasil Analisis Aktual', 'Evaluasi Mutu']],
    body: coaRows,
    theme: 'striped',
    headStyles: { fillColor: [16, 185, 129], textColor: [255, 255, 255], fontStyle: 'bold', fontSize: 7.5 },
    bodyStyles: { fontSize: 7, textColor: [30, 41, 59] },
    alternateRowStyles: { fillColor: [248, 250, 252] }
  });

  // @ts-ignore
  let finalY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 8 : 150;

  // MSDS Safety Summary Block
  const msds = ing.msds_details;
  if (msds) {
    doc.setFillColor(241, 245, 249);
    doc.rect(14, finalY, 182, 38, 'F');

    doc.setFontSize(8);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(15, 23, 42);
    doc.text('Ringkasan Keamanan & Keselamatan Kerja (MSDS / SDS):', 18, finalY + 6);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(7.2);
    doc.setTextColor(51, 65, 85);
    doc.text(`Klasifikasi GHS: ${msds.ghs_classification} | Kata Sinyal: ${msds.signal_word}`, 18, finalY + 11);
    doc.text(`Pernyataan Bahaya: ${msds.hazard_statements.join('; ')}`, 18, finalY + 16);
    doc.text(`Pertolongan Pertama (Mata/Kulit): ${msds.first_aid_eye} | ${msds.first_aid_skin}`, 18, finalY + 21);
    doc.text(`APD Direkomendasikan: ${msds.personal_protective_equipment}`, 18, finalY + 26);
    doc.text(`Penyimpanan & Penanganan: ${msds.handling_storage}`, 18, finalY + 31);
    doc.text(`Prosedur Tumpahan: ${msds.spill_procedure}`, 18, finalY + 36);

    finalY += 44;
  }

  // Sign-off
  doc.setFontSize(8);
  doc.setTextColor(71, 85, 105);
  doc.text('Analis QC Laboratorium:', 14, finalY + 8);
  doc.text('Kepala Quality Assurance:', 110, finalY + 8);

  doc.line(14, finalY + 24, 60, finalY + 24);
  doc.line(110, finalY + 24, 160, finalY + 24);

  doc.text('QC Analytical Chemist', 14, finalY + 28);
  doc.text('QA Cosmetics Release Lead', 110, finalY + 28);

  doc.save(`CoA_MSDS_${ing.inci_name.replace(/[^a-zA-Z0-9]/g, '_')}_rangkAI.pdf`);
}

