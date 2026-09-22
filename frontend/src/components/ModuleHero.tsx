import { ArrowUpRight, FlaskConical, Activity, Layers, ShieldCheck, Thermometer } from 'lucide-react';
import { ModuleVisual, type VisualKind } from './ModuleVisual';

const moduleContent: Record<string, { number: string; eyebrow: string; title: string; description: string; tags: string[] }> = {
  formulasi: { number: '01', eyebrow: 'FORMULATION INTELLIGENCE', title: 'Formula presisi, dari setiap komposisi.', description: 'Eksplorasi kandidat, optimasi emulsifier, dan susun formula sesuai target kualitas produk.', tags: ['Prediksi formula', 'Optimasi HLB', 'BPOM & Halal'] },
  stabilitas: { number: '02', eyebrow: 'STABILITY INTELLIGENCE', title: 'Kualitas terjaga, sepanjang waktu.', description: 'Evaluasi ketahanan formula dan telusuri hasil uji fisik hingga eksekusi batch trial.', tags: ['Uji stabilitas', 'Profil viskositas', 'Batch trial'] },
  cpp: { number: '03', eyebrow: 'PROCESS INTELLIGENCE', title: 'Setiap parameter, dalam kendali.', description: 'Bandingkan target dan hasil aktual untuk memahami deviasi pada setiap tahap proses.', tags: ['Suhu & waktu', 'Kecepatan proses', 'Target vs aktual'] },
  cma: { number: '04', eyebrow: 'MATERIAL INTELLIGENCE', title: 'Bahan yang tepat. Kualitas yang konsisten.', description: 'Telusuri atribut kritis bahan, spesifikasi mutu, dan efisiensi biaya dalam satu ruang kerja.', tags: ['Spesifikasi material', 'Supply chain', 'COGS & MOCS'] },
  rcaCapa: { number: '05', eyebrow: 'QUALITY INTELLIGENCE', title: 'Temukan penyebab. Rancang perbaikan.', description: 'Hubungkan deviasi dengan akar masalah, tindakan korektif, dan langkah pencegahan.', tags: ['Root cause analysis', 'Corrective action', 'Preventive action'] },
  coa: { number: '01', eyebrow: 'INGREDIENT & DOCUMENT INTELLIGENCE', title: 'Kenali bahan, hingga bukti kualitasnya.', description: 'Telusuri katalog INCI, Certificate of Analysis, dan dokumen keamanan bahan baku.', tags: ['Katalog INCI', 'CoA & MSDS', 'Dokumen Halal'] },
};

export function ModuleHero({ module }: { module: VisualKind }) {
  const content = moduleContent[module] ?? moduleContent.formulasi;
  return <section className={`module-hero theme-${module}`} aria-label={content.eyebrow}>
    <div className="hero-copy">
      <div className="hero-eyebrow"><span className="hero-index">{content.number}</span>{content.eyebrow}</div>
      <h1>{content.title}</h1>
      <p>{content.description}</p>
      <div className="hero-tags">{content.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
    </div>
    <div className="hero-art"><ModuleVisual kind={module} /><span className="visual-footnote">ILUSTRASI MODUL <span>R / {content.number}</span></span></div>
  </section>;
}

export function LaboratoryIntro() {
  return <section className="lab-intro">
    <div className="intro-main">
      <div className="intro-copy">
        <div className="hero-eyebrow"><span className="intro-spark" />COSMETIC RESEARCH WORKSPACE</div>
        <h1>Dari ide menjadi<br />formula yang <em>presisi.</em></h1>
        <p>Rangkai riset, formulasi, dan kendali kualitas.<br className="desktop-break" /> Satu ruang kerja untuk setiap tahap inovasi Anda.</p>
        <div className="intro-caption"><span>5 modul terintegrasi</span><span className="intro-caption-dot" /><span>Didukung kecerdasan AI</span><ArrowUpRight size={15} /></div>
      </div>
      <div className="intro-art"><span className="intro-art-label">MOLECULAR DESIGN / 01</span><ModuleVisual kind="formulasi" /><span className="intro-art-caption">FORMULATE · VALIDATE · REFINE</span></div>
    </div>
    <div className="intro-modules" aria-label="Lima modul ruang kerja">
      {[{ label: 'Formulasi', icon: FlaskConical }, { label: 'Stabilitas', icon: Thermometer }, { label: 'Proses Kritis', icon: Activity }, { label: 'Material Kritis', icon: Layers }, { label: 'RCA & CAPA', icon: ShieldCheck }].map(({ label, icon: Icon }, i) => <div key={label}><span className="intro-module-number">0{i+1}</span><Icon size={16} /><span>{label}</span></div>)}
    </div>
  </section>;
}

export function ContextSignal({ kind }: { kind: 'regulation' | 'coa' }) {
  return <div className={`context-signal theme-${kind}`}>
    <ModuleVisual kind={kind} />
    <div><span className="signal-eyebrow">{kind === 'regulation' ? 'REGULATORY SCREENING' : 'DOCUMENT INTELLIGENCE'}</span>
      <h3>{kind === 'regulation' ? 'Kepatuhan di setiap kandidat' : 'Bukti mutu, dalam satu dokumen'}</h3>
      <p>{kind === 'regulation' ? 'Tinjau status BPOM dan Halal sebelum melanjutkan formula ke tahap trial.' : 'Tinjau hasil pengujian, spesifikasi, dan identitas bahan pada CoA yang dipilih.'}</p>
    </div>
    <span className="signal-note">Ilustrasi alur</span>
  </div>;
}
