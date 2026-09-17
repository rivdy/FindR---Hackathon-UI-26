import React, { useState } from 'react';
import { CandidateComparison } from '../components/CandidateComparison';
import { HlbCalculator } from '../components/HlbCalculator';
import { FormulaEditor } from '../components/FormulaEditor';
import { IngredientPage } from './IngredientPage';
import { FormulaCandidate } from '../types';
import { MOCK_CANDIDATES } from '../data/mockData';
import { exportFormulationPdf } from '../utils/pdfGenerator';
import { Sparkles, Calculator, Layers, Database, TrendingUp, Download, FileText } from 'lucide-react';

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
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Sub navigation bar with PDF download button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto' }}>
          <button
            onClick={() => setActiveSubTab('candidates')}
            className={activeSubTab === 'candidates' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '8px 14px', whiteSpace: 'nowrap' }}
          >
            <Sparkles size={14} /> 5 Prediksi & Metrik Model
          </button>

          <button
            onClick={() => setActiveSubTab('hlb')}
            className={activeSubTab === 'hlb' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '8px 14px', whiteSpace: 'nowrap' }}
          >
            <Calculator size={14} /> Kalkulator HLB & Emulsifier
          </button>

          <button
            onClick={() => setActiveSubTab('editor')}
            className={activeSubTab === 'editor' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '8px 14px', whiteSpace: 'nowrap' }}
          >
            <Layers size={14} /> Formulation Sheet (100% Massa)
          </button>

          <button
            onClick={() => setActiveSubTab('ingredients')}
            className={activeSubTab === 'ingredients' ? 'btn-primary' : 'btn-secondary'}
            style={{ fontSize: '0.8rem', padding: '8px 14px', whiteSpace: 'nowrap' }}
          >
            <Database size={14} /> Katalog Bahan & CoA atau MSDS
          </button>

        </div>

        {/* PDF Download Button */}
        <button
          onClick={handleDownloadPdf}
          className="btn-secondary"
          style={{
            fontSize: '0.78rem',
            padding: '7px 14px',
            color: 'var(--emerald-neon)',
            borderColor: 'rgba(16, 185, 129, 0.35)',
            background: 'rgba(16, 185, 129, 0.08)',
            fontWeight: 700,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px'
          }}
          title="Download dokumen spesifikasi formula standar CPKB BPOM / ISO 22716"
        >
          <Download size={14} /> Download Laporan PDF (Standar BPOM)
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
        <div style={{ marginTop: '-12px' }}>
          <IngredientPage />
        </div>
      )}

    </div>
  );
};
