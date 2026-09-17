import React, { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { FormulationPage } from './pages/FormulationPage';
import { StabilityPage } from './pages/StabilityPage';
import { CppPage } from './pages/CppPage';
import { CmaPage } from './pages/CmaPage';
import { QtppModal } from './components/QtppModal';
import { InitialDataInputView } from './components/InitialDataInputView';
import { FormulaCandidate, QtppProfile } from './types';
import { DEFAULT_QTPP } from './data/mockData';

export const App: React.FC = () => {
  // LANDING STATE: false means user starts from inputting data from scratch!
  const [isGenerated, setIsGenerated] = useState<boolean>(false);

  // 4 MAIN TABS: 'formulasi' | 'stabilitas' | 'cpp' | 'cma'
  const [currentTab, setCurrentTab] = useState<string>('formulasi');
  const [isQtppModalOpen, setIsQtppModalOpen] = useState<boolean>(false);
  const [_currentQtpp, setCurrentQtpp] = useState<QtppProfile>(DEFAULT_QTPP);

  const handleGenerateComplete = (newQtpp: QtppProfile, _selectedIngredients: string[]) => {
    setCurrentQtpp(newQtpp);
    setIsGenerated(true);
    setCurrentTab('formulasi');
  };

  const handleResetToNewInput = () => {
    setIsGenerated(false);
  };

  const handleSelectCandidateForTrial = (_candidate: FormulaCandidate) => {
    // Jump to Stabilitas module with SOP execution
    setCurrentTab('stabilitas');
  };

  const handleNavigateToRca = () => {
    // Jump to CPP module with RCA 6M Fishbone
    setCurrentTab('cpp');
  };

  const handleNavigateToCapa = () => {
    // Jump to CMA module with CAPA Knowledge Hub
    setCurrentTab('cma');
  };

  // IF NOT YET GENERATED: Show the initial input onboarding view!
  if (!isGenerated) {
    return (
      <InitialDataInputView onGenerateComplete={handleGenerateComplete} />
    );
  }

  // ONCE GENERATED: Reveal full 4-tab studio workspace!
  return (
    <div className="app-container">
      {/* QTPP Configuration & Document Ingestion Modal */}
      <QtppModal 
        isOpen={isQtppModalOpen}
        onClose={() => setIsQtppModalOpen(false)}
        onSave={(newQtpp) => setCurrentQtpp(newQtpp)}
      />

      {/* Fixed Sidebar with strictly 4 tabs */}
      <Sidebar 
        currentTab={currentTab} 
        onSelectTab={(tab) => setCurrentTab(tab)} 
      />

      {/* Main Content Area */}
      <div className="main-content">
        <TopBar 
          activeTab={currentTab} 
          onOpenQtpp={() => setIsQtppModalOpen(true)}
          onResetToNewInput={handleResetToNewInput}
        />
        
        <main style={{ flex: 1, overflowY: 'auto' }}>
          {currentTab === 'formulasi' && (
            <FormulationPage 
              onSelectForTrial={handleSelectCandidateForTrial} 
              onNavigateToRca={handleNavigateToRca}
            />
          )}

          {currentTab === 'stabilitas' && (
            <StabilityPage 
              onNavigateToRca={handleNavigateToRca}
            />
          )}

          {currentTab === 'cpp' && (
            <CppPage 
              onNavigateToCapa={handleNavigateToCapa} 
            />
          )}

          {currentTab === 'cma' && (
            <CmaPage />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
