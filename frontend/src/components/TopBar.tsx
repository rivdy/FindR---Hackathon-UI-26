import type { RefObject } from 'react';
import { FlaskConical, RotateCcw, FileCog, Menu, ChevronRight } from 'lucide-react';
import { MotionControl } from './MotionControl';

interface TopBarProps {
  activeTab: string;
  onOpenQtpp: () => void;
  onResetToNewInput?: () => void;
  mobileMenuOpen: boolean;
  onToggleMobileMenu: () => void;
  menuButtonRef: RefObject<HTMLButtonElement | null>;
}

const labels: Record<string, string> = { formulasi: 'Formulasi', stabilitas: 'Stabilitas', cpp: 'Proses Kritis', cma: 'Material Kritis', rcaCapa: 'RCA & CAPA' };

export function TopBar({ activeTab, onOpenQtpp, onResetToNewInput, mobileMenuOpen, onToggleMobileMenu, menuButtonRef }: TopBarProps) {
  return <header className="workspace-topbar">
    <div className="topbar-context">
      <button ref={menuButtonRef} className="mobile-menu-trigger" onClick={onToggleMobileMenu} aria-label="Buka menu navigasi" aria-expanded={mobileMenuOpen} aria-controls="module-navigation"><Menu size={20} /></button>
      <span className="topbar-project"><FlaskConical size={15} />Ruang Kerja</span><ChevronRight className="topbar-divider" size={13} />
      <strong>{labels[activeTab] ?? activeTab}</strong><span className="demo-label">DEMO</span>
    </div>
    <div className="topbar-actions"><MotionControl /><button onClick={onOpenQtpp} className="btn-ghost"><FileCog size={15} />QTPP & Dokumen</button>{onResetToNewInput && <button onClick={onResetToNewInput} className="btn-primary"><RotateCcw size={14} />Formulasi baru</button>}</div>
  </header>;
}
