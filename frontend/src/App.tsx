import React, { useEffect, useRef, useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FormulationPage } from './pages/FormulationPage';
import { StabilityPage } from './pages/StabilityPage';
import { CppPage } from './pages/CppPage';
import { CmaPage } from './pages/CmaPage';
import { QtppModal } from './components/QtppModal';
import { InitialDataInputView } from './components/InitialDataInputView';
import { RcaCapaPage } from './pages/RcaCapaPage';
import { FormulaCandidate, QtppProfile } from './types';
import { DEFAULT_QTPP } from './data/mockData';

export const App: React.FC = () => {
  const [isGenerated, setIsGenerated] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<string>('formulasi');
  const [isQtppModalOpen, setIsQtppModalOpen] = useState<boolean>(false);
  const [_currentQtpp, setCurrentQtpp] = useState<QtppProfile>(DEFAULT_QTPP);
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        menuButtonRef.current?.focus();
      }
    };
    const viewport = window.matchMedia('(max-width: 767px)');
    const closeOnResize = () => { if (!viewport.matches) setMobileMenuOpen(false); };
    const previousOverflow = document.body.style.overflow;
    if (viewport.matches) document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    viewport.addEventListener('change', closeOnResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
      viewport.removeEventListener('change', closeOnResize);
    };
  }, [mobileMenuOpen]);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
    menuButtonRef.current?.focus();
  };

  const handleGenerateComplete = (newQtpp: QtppProfile, _selectedIngredients: string[]) => {
    setCurrentQtpp(newQtpp);
    setIsGenerated(true);
    setCurrentTab('formulasi');
  };

  const handleResetToNewInput = () => {
    setIsGenerated(false);
  };

  const handleSelectCandidateForTrial = (_candidate: FormulaCandidate) => {
    setCurrentTab('stabilitas');
  };

  const handleNavigateToRcaCapa = () => {
    setCurrentTab('rcaCapa');
  };

  if (!isGenerated) {
    return (
      <InitialDataInputView onGenerateComplete={handleGenerateComplete} />
    );
  }

  const SIDEBAR_WIDTH = sidebarCollapsed ? 60 : 248;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--surface-ground)' }}>
      <QtppModal
        isOpen={isQtppModalOpen}
        onClose={() => setIsQtppModalOpen(false)}
        onSave={(newQtpp) => setCurrentQtpp(newQtpp)}
      />

      {/* Fixed Sidebar */}
      {mobileMenuOpen && (
        <button className="mobile-menu-backdrop" onClick={closeMobileMenu} aria-label="Tutup menu navigasi" tabIndex={-1} />
      )}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          if (mobileMenuOpen) closeMobileMenu();
        }}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(c => !c)}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={closeMobileMenu}
      />

      {/* Main content - offset by sidebar width, transitions with it */}
      <div
        className="workspace-content"
        style={{
          marginLeft: `${SIDEBAR_WIDTH}px`,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          minHeight: '100vh',
          transition: 'margin-left 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
          minWidth: 0,
        }}
      >
        <TopBar
          activeTab={currentTab}
          onOpenQtpp={() => setIsQtppModalOpen(true)}
          onResetToNewInput={handleResetToNewInput}
          mobileMenuOpen={mobileMenuOpen}
          onToggleMobileMenu={() => setMobileMenuOpen(open => !open)}
          menuButtonRef={menuButtonRef}
        />

        <main style={{ flex: 1, overflowY: 'auto' }}>
          {currentTab === 'formulasi' && (
            <FormulationPage
              onSelectForTrial={handleSelectCandidateForTrial}
              onNavigateToRca={handleNavigateToRcaCapa}
            />
          )}
          {currentTab === 'stabilitas' && (
            <StabilityPage onNavigateToRca={handleNavigateToRcaCapa} />
          )}
          {currentTab === 'cpp' && (
            <CppPage onNavigateToCapa={handleNavigateToRcaCapa} />
          )}
          {currentTab === 'cma' && <CmaPage />}
          {currentTab === 'rcaCapa' && <RcaCapaPage />}
        </main>
      </div>
    </div>
  );
};

export default App;
