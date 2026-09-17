import React, { useEffect, useRef } from 'react';
import { FlaskConical, Thermometer, Activity, Layers, ChevronLeft, ChevronRight, Award, ShieldAlert, TrendingUp, X } from 'lucide-react';

interface SidebarProps {
  currentTab: string;
  onSelectTab: (tab: string) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
}

type ModuleStatus = 'clear' | 'review' | 'violation' | 'pending';

interface NavItem {
  id: string;
  label: string;
  shortLabel: string;
  desc: string;
  icon: React.ElementType;
  status: ModuleStatus;
  statusLabel: string;
  metaValue?: string;
}

const statusConfig: Record<ModuleStatus, { color: string; bg: string; dot: string }> = {
  clear:     { color: '#1A6B5A', bg: 'rgba(26,107,90,0.08)',  dot: '#1A6B5A' },
  review:    { color: '#D4860A', bg: 'rgba(232,163,64,0.08)', dot: '#E8A340' },
  violation: { color: '#C55242', bg: 'rgba(197,82,66,0.08)',  dot: '#C55242' },
  pending:   { color: '#94A3B8', bg: 'rgba(148,163,184,0.08)', dot: '#CBD5E1' },
};

export const Sidebar: React.FC<SidebarProps> = ({
  currentTab,
  onSelectTab,
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onCloseMobile,
}) => {
  const sidebarRef = useRef<HTMLElement>(null);
  // The drawer traps keyboard focus while open; desktop navigation stays unchanged.
  useEffect(() => {
    if (!mobileOpen) return;
    const sidebar = sidebarRef.current;
    const controls = () => Array.from(sidebar?.querySelectorAll<HTMLButtonElement>('button') ?? [])
      .filter(button => button.getClientRects().length > 0);
    controls()[0]?.focus();
    const trapFocus = (event: KeyboardEvent) => {
      if (event.key !== 'Tab') return;
      const buttons = controls();
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault(); last?.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault(); first?.focus();
      }
    };
    document.addEventListener('keydown', trapFocus);
    return () => document.removeEventListener('keydown', trapFocus);
  }, [mobileOpen]);
  const compact = collapsed && !mobileOpen;
  const navItems: NavItem[] = [
    {
      id: 'formulasi',
      label: 'Formulasi',
      shortLabel: 'Form.',
      desc: '5 kandidat formula & kalkulasi HLB',
      icon: FlaskConical,
      status: 'clear',
      statusLabel: 'BPOM & Halal lolos',
      metaValue: '94.8%',
    },
    {
      id: 'stabilitas',
      label: 'Stabilitas',
      shortLabel: 'Stab.',
      desc: '8 uji fisik & eksekusi SOP batch',
      icon: Thermometer,
      status: 'review',
      statusLabel: 'Batch B perlu evaluasi',
      metaValue: '2 flag',
    },
    {
      id: 'cpp',
      label: 'Proses Kritis',
      shortLabel: 'CPP',
      desc: 'Median, simpangan ±3σ & RCA',
      icon: Activity,
      status: 'clear',
      statusLabel: 'Semua parameter terkendali',
      metaValue: 'σ ±2.1',
    },
    {
      id: 'cma',
      label: 'Material Kritis',
      shortLabel: 'CMA',
      desc: 'Critical Material Attributes & Supply Chain',
      icon: TrendingUp,
      statusLabel: 'Belum ada data batch aktif',
      status: 'pending',
    },
    {
      id: 'rcaCapa',
      label: 'RCA & CAPA',
      shortLabel: 'RCA',
      desc: 'Root Cause Analysis & Corrective Action',
      icon: ShieldAlert,
      status: 'review',
      statusLabel: 'Menunggu investigasi (1)',
      metaValue: 'Action',
    },
  ];

  return (
    <aside
      ref={sidebarRef}
      id="module-navigation"
      className={`module-sidebar${mobileOpen ? ' mobile-open' : ''}`}
      aria-label="Navigasi modul"
      style={{
        width: compact ? '60px' : '248px',
        flexShrink: 0,
        background: '#FFFFFF',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        height: '100vh',
        zIndex: 200,
        transition: 'width 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
        overflow: 'hidden',
        borderRight: '1px solid #E8ECF1',
      }}
    >
      {/* Logo area */}
      <div
        className="sidebar-brand"
        style={{
          padding: compact ? '16px 0' : '16px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: compact ? 'center' : 'space-between',
          borderBottom: '1px solid #F0F2F5',
          minHeight: '60px',
          flexShrink: 0,
          gap: '8px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            opacity: compact ? 0 : 1,
            transition: 'opacity 0.15s',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
          }}
        >
          <img
            src="/rangkai-logo.png"
            alt="rangkAI"
            style={{ height: '40px', width: 'auto', objectFit: 'contain', flexShrink: 0 }}
          />
        </div>

        {compact && (
          <img
            src="/rangkai-logo.png"
            alt="rangkAI"
            style={{
              height: '32px',
              width: '32px',
              objectFit: 'contain',
              objectPosition: 'left center',
            }}
          />
        )}

        <button className="mobile-menu-close" onClick={onCloseMobile} aria-label="Tutup menu navigasi">
          <X size={20} />
        </button>
        <button
          className="sidebar-collapse-toggle"
          onClick={onToggleCollapse}
          title={compact ? 'Perluas panel navigasi' : 'Ciutkan panel navigasi'}
          style={{
            width: '28px',
            height: '28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'transparent',
            border: '1px solid #E8ECF1',
            borderRadius: '8px',
            color: '#94A3B8',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#F5F6F9';
            (e.currentTarget as HTMLElement).style.color = '#64748B';
            (e.currentTarget as HTMLElement).style.borderColor = '#CBD5E1';
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = 'transparent';
            (e.currentTarget as HTMLElement).style.color = '#94A3B8';
            (e.currentTarget as HTMLElement).style.borderColor = '#E8ECF1';
          }}
        >
          {compact ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
        </button>
      </div>

      {/* Navigation */}
      <nav
        style={{
          flex: 1,
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '2px',
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          const sc = statusConfig[item.status];

          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              aria-current={isActive ? 'page' : undefined}
              title={compact ? `${item.label}: ${item.statusLabel}` : undefined}
              style={{
                display: 'flex',
                alignItems: compact ? 'center' : 'flex-start',
                justifyContent: compact ? 'center' : 'flex-start',
                padding: compact ? '10px 0' : '10px 12px',
                borderRadius: '10px',
                border: 'none',
                background: isActive ? '#F0FAF7' : 'transparent',
                cursor: 'pointer',
                textAlign: 'left',
                width: '100%',
                transition: 'all 0.15s',
                position: 'relative',
                gap: compact ? '0' : '10px',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = '#F8F9FB';
              }}
              onMouseLeave={e => {
                if (!isActive) (e.currentTarget as HTMLElement).style.background = 'transparent';
              }}
            >
              {/* Active indicator */}
              {isActive && (
                <div
                  style={{
                    position: 'absolute',
                    left: '0',
                    top: '20%',
                    bottom: '20%',
                    width: '3px',
                    borderRadius: '0 3px 3px 0',
                    background: '#FFFFFF',
                  }}
                />
              )}

              {/* Icon */}
              <div style={{ position: 'relative', flexShrink: 0 }}>
                <Icon
                  size={19}
                  style={{
                    color: isActive ? '#1A6B5A' : '#94A3B8',
                    transition: 'color 0.15s',
                    display: 'block',
                  }}
                />
                <span
                  style={{
                    position: 'absolute',
                    bottom: '-1px',
                    right: '-3px',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: sc.dot,
                    border: '1.5px solid #FFFFFF',
                  }}
                />
              </div>

              {/* Label + description */}
              {!compact && (
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div
                    style={{
                      fontSize: '0.8125rem',
                      fontWeight: isActive ? 600 : 500,
                      color: isActive ? '#0F1C2E' : '#475569',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      lineHeight: 1.3,
                      transition: 'color 0.15s',
                    }}
                  >
                    {item.label}
                  </div>
                  <div
                    style={{
                      fontSize: '0.6875rem',
                      color: isActive ? '#64748B' : '#94A3B8',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      marginTop: '2px',
                      transition: 'color 0.15s',
                    }}
                  >
                    {item.desc}
                  </div>
                  {/* Status badge */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '4px',
                    }}
                  >
                    <span
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px',
                        padding: '1px 7px',
                        borderRadius: '4px',
                        fontSize: '0.625rem',
                        fontWeight: 500,
                        background: sc.bg,
                        color: sc.color,
                      }}
                    >
                      {item.statusLabel}
                    </span>
                    {item.metaValue && (
                      <span
                        style={{
                          fontFamily: 'var(--font-data)',
                          fontSize: '0.625rem',
                          fontWeight: 500,
                          color: '#94A3B8',
                        }}
                      >
                        {item.metaValue}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div
        style={{
          borderTop: '1px solid #F0F2F5',
          padding: compact ? '12px 0' : '12px 14px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: compact ? 'center' : 'flex-start',
          gap: '8px',
          flexShrink: 0,
        }}
      >
        <Award size={14} style={{ color: '#CBD5E1', flexShrink: 0 }} />
        {!compact && (
          <div style={{ overflow: 'hidden' }}>
            <div
              style={{
                fontSize: '0.6875rem',
                fontWeight: 600,
                color: '#94A3B8',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              rangkAI · FindR UI 26
            </div>
            <div style={{ fontSize: '0.625rem', color: '#CBD5E1' }}>
              Cosmetics R&D Track
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};
