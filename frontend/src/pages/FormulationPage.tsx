import React, { useState } from 'react';
import { ModuleHero } from '../components/ModuleHero';
import { CandidateComparison } from '../components/CandidateComparison';
import { HlbCalculator } from '../components/HlbCalculator';
import { FormulaEditor } from '../components/FormulaEditor';
import { IngredientPage } from './IngredientPage';
import { FormulaCandidate } from '../types';
import { MOCK_CANDIDATES } from '../data/mockData';
import { exportFormulationPdf } from '../utils/pdfGenerator';
import { Sparkles, Calculator, Layers, Database, Download } from 'lucide-react';

interface FormulationPageProps {
  onSelectForTrial: (candidate: FormulaCandidate) => void;
  onNavigateToRca: () => void;
}

export const FormulationPage: React.FC<FormulationPageProps> = ({
  onSelectForTrial,
  onNavigateToRca
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'candidates' | 'hlb' | 'editor' | 'ingredients'>('candidates');
  const [selectedCandidate, setSelectedCandidate] = useState<FormulaCandidate>(MOCK_CANDIDATES[0]);

  const handleDownloadPdf = () => {
    exportFormulationPdf(selectedCandidate);
  };

  return (
    <div className="module-page" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <ModuleHero key={activeSubTab === 'ingredients' ? 'coa' : 'formulasi'} module={activeSubTab === 'ingredients' ? 'coa' : 'formulasi'} />
      {/* Sub navigation bar with PDF download button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px',
        flexWrap: 'wrap',
        gap: '12px'
      }} data-mobile-wrap="true">
        <div className="ui-tabs">
          <button
            onClick={() => setActiveSubTab('candidates')}
            className="ui-tab"
           aria-pressed={activeSubTab === 'candidates'}>
            <Sparkles size={14} /> Kandidat Formula
          </button>

          <button
            onClick={() => setActiveSubTab('hlb')}
            className="ui-tab"
           aria-pressed={activeSubTab === 'hlb'}>
            <Calculator size={14} /> Kalkulator HLB
          </button>

          <button
            onClick={() => setActiveSubTab('editor')}
            className="ui-tab"
           aria-pressed={activeSubTab === 'editor'}>
            <Layers size={14} /> Lembar Formulasi
          </button>

          <button
            onClick={() => setActiveSubTab('ingredients')}
            className="ui-tab"
           aria-pressed={activeSubTab === 'ingredients'}>
            <Database size={14} /> Bahan & CoA / MSDS
          </button>

        </div>

        {/* PDF Download Button */}
        <button
          onClick={handleDownloadPdf}
          className="ui-download"
          title="Download dokumen spesifikasi formula standar CPKB BPOM / ISO 22716"
        >
          <Download size={14} /> Unduh PDF
        </button>
      </div>

      {/* Render active subtab */}
      {activeSubTab === 'candidates' && (
        <CandidateComparison
          onSelectForTrial={(cand) => {
            setSelectedCandidate(cand);
            onSelectForTrial(cand);
          }}
          onNavigateToRca={onNavigateToRca}
        />
      )}

      {activeSubTab === 'hlb' && (
        <HlbCalculator />
      )}

      {activeSubTab === 'editor' && (
        <FormulaEditor candidate={selectedCandidate} />
      )}

      {activeSubTab === 'ingredients' && (
        <div>
          <IngredientPage />
        </div>
      )}

    </div>
  );
};
