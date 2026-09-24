import { useEffect, useRef, type CSSProperties } from 'react';
import { FlaskConical, Thermometer, Activity, Layers, ChevronLeft, ChevronRight, ShieldCheck, X, Atom, ArrowUpRight } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

const navItems = [
  { id: 'formulasi', label: 'Formulasi', desc: 'Prediksi & optimasi formula', icon: FlaskConical, color: '#36d3bc' },
  { id: 'stabilitas', label: 'Stabilitas', desc: 'Uji fisik & batch trial', icon: Thermometer, color: '#63c9ef' },
  { id: 'cpp', label: 'Proses Kritis', desc: 'Parameter & kendali proses', icon: Activity, color: '#88adff' },
  { id: 'cma', label: 'Material Kritis', desc: 'Atribut bahan & biaya', icon: Layers, color: '#b6a1f4' },
  { id: 'rcaCapa', label: 'RCA & CAPA', desc: 'Investigasi & tindakan', icon: ShieldCheck, color: '#edbf78' },
];

export function Sidebar({ currentTab, onSelectTab, collapsed, onToggleCollapse, mobileOpen, onCloseMobile }: SidebarProps) {
  const sidebarRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!mobileOpen) return;
    const controls = () => Array.from(sidebarRef.current?.querySelectorAll<HTMLButtonElement>('button') ?? []).filter(button => button.getClientRects().length > 0);
    const focusFrame = requestAnimationFrame(() => controls()[0]?.focus());
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const buttons = controls();
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (!sidebarRef.current?.contains(document.activeElement)) { event.preventDefault(); (event.shiftKey ? last : first)?.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
    };
    document.addEventListener('keydown', trapFocus);
    return () => { cancelAnimationFrame(focusFrame); document.removeEventListener('keydown', trapFocus); };
  }, [mobileOpen]);
  const compact = collapsed && !mobileOpen;

  return <aside ref={sidebarRef} id="module-navigation" className={`module-sidebar${mobileOpen ? ' mobile-open' : ''}${compact ? ' is-compact' : ''}`} aria-label="Navigasi modul" style={{ width: compact ? 60 : 248 }}>
    <div className="sidebar-brand">
      {!compact ? (
        <img src="/logo.png" alt="rangkAI Logo" style={{ height: '30px', marginLeft: '6px' }} />
      ) : (
        <div className="brand-symbol"><img src="/logo.png" alt="Logo" style={{ height: '24px', objectFit: 'contain', objectPosition: 'left' }} /></div>
      )}
      <button className="mobile-menu-close" onClick={onCloseMobile} aria-label="Tutup menu navigasi"><X size={19} /></button>
    </div>
    {!compact && <div className="sidebar-workspace"><span className="workspace-avatar">R</span><div><strong>Cosmetics R&D</strong><span>Ruang kerja formulasi</span></div><ArrowUpRight size={14} /></div>}
    <div className="sidebar-nav-label">{compact ? 'R&D' : 'MODUL PENELITIAN'}{!compact && <span>05</span>}</div>
    <nav>
      {navItems.map((item, index) => {
        const Icon = item.icon;
        const active = currentTab === item.id;
        return <button key={item.id} className="sidebar-nav-item" style={{ '--nav-accent': item.color } as CSSProperties} onClick={() => onSelectTab(item.id)} aria-current={active ? 'page' : undefined} aria-label={item.label} title={compact ? item.label : undefined}>
          <span className="nav-icon"><Icon size={19} /></span>
          {!compact && <><span className="nav-copy"><strong>{item.label}</strong><small>{item.desc}</small></span><span className="nav-index">0{index+1}</span></>}
        </button>;
      })}
    </nav>
    {!compact && <div className="sidebar-note"><span className="sidebar-note-icon"><ShieldCheck size={17} /></span><strong>Dari riset ke kualitas.</strong><p>Formulasi, regulasi, dan dokumentasi saling terhubung.</p><div><span />Data simulasi R&D</div></div>}
    <div className="sidebar-footer">{!compact && <div><strong>rangkAI Lab</strong><small>Cosmetics innovation workspace</small></div>}<button className="sidebar-collapse-toggle" onClick={onToggleCollapse} aria-label={compact ? 'Perluas panel navigasi' : 'Ciutkan panel navigasi'} title={compact ? 'Perluas panel navigasi' : 'Ciutkan panel navigasi'}>{compact ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}</button></div>
  </aside>;
}
