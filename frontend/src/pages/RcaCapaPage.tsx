import React, { useState } from 'react';
import { CapaItem, FishboneBranch, FiveWhyItem } from '../types';
import { MOCK_CAPA_ITEMS, MOCK_FISHBONE_BRANCHES } from '../data/mockData';
import { 
  GitFork, 
  Search, 
  ShieldCheck, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  BrainCircuit, 
  ArrowRight, 
  Cpu, 
  GitBranch, 
  FlaskConical, 
  UserCheck, 
  Gauge, 
  CloudRain,
  ShieldAlert,
  Thermometer,
  Activity,
  Layers,
  Clock,
  Printer,
  User
} from 'lucide-react';

// CAPA Form component reflecting the user's photo template
const CapaForm: React.FC = () => {
  return (
    <div style={{
      background: '#fff',
      border: '1px solid #000',
      fontFamily: 'Arial, sans-serif',
      fontSize: '0.8rem',
      color: '#000'
    }}>
      <div style={{ textAlign: 'center', padding: '12px', borderBottom: '1px solid #000', fontWeight: 'bold', fontSize: '1rem' }}>
        CORRECTIVE ACTION AND PREVENTIVE ACTION
      </div>
      
      {/* Header Info */}
      <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
        <div style={{ flex: 1, padding: '8px', borderRight: '1px solid #000', fontWeight: 'bold' }}>CAPA No.</div>
        <div style={{ flex: 2, padding: '8px' }}>CAPA-2026-089</div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
        <div style={{ flex: 1, padding: '8px', borderRight: '1px solid #000', fontWeight: 'bold' }}>Date</div>
        <div style={{ flex: 2, padding: '8px' }}>18 Sep 2026</div>
      </div>
      
      {/* Description */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>Description of non-conformance:</div>
        <div style={{ padding: '8px 8px 32px 8px' }}>Phase separation antara fase air dan fase minyak setelah penyimpanan uji stabilitas termal (45°C) pada trial batch LOT-MOIST-26-04B.</div>
      </div>

      {/* Source */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #000' }}>Source of non-conformance (✓):</div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, borderRight: '1px solid #000' }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
              <div style={{ padding: '4px 8px' }}>Internal/External Audit</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
              <div style={{ padding: '4px 8px' }}>Customer Complaint</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
              <div style={{ padding: '4px 8px' }}>Product Recall</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000', textAlign: 'center' }}>✓</div>
              <div style={{ padding: '4px 8px' }}>Deviation</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
              <div style={{ padding: '4px 8px' }}>Others: ____________________</div>
            </div>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
              <div style={{ padding: '4px 8px' }}>Out of Trend/OOS/HULS</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
              <div style={{ padding: '4px 8px' }}>Change Control</div>
            </div>
            <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
              <div style={{ padding: '4px 8px' }}>Product Quality Review/PQR</div>
            </div>
            <div style={{ display: 'flex' }}>
              <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
              <div style={{ padding: '4px 8px' }}>Quality Risk Management/QRM</div>
            </div>
          </div>
        </div>
      </div>

      {/* Risk */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #000' }}>Risk level (✓):</div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, borderRight: '1px solid #000', display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000', textAlign: 'center' }}>✓</div>
            <div style={{ padding: '4px 8px' }}>High</div>
          </div>
          <div style={{ flex: 1, borderRight: '1px solid #000', display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
            <div style={{ padding: '4px 8px' }}>Medium</div>
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
            <div style={{ padding: '4px 8px' }}>Low</div>
          </div>
        </div>
      </div>

      {/* Action */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>Correction/Immediate Action:</div>
        <div style={{ padding: '8px 8px 32px 8px' }}>Karantina seluruh batch trial LOT-MOIST-26-04B. Reject formulasi dan tandai sebagai tidak stabil.</div>
      </div>
      
      {/* Investigation */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>Investigation:</div>
        <div style={{ padding: '8px 8px 32px 8px' }}>Berdasarkan analisis RCA 6M, rasio HLB emulsifier utama terlalu tinggi untuk memfasilitasi fasa minyak, dan laju pendinginan (cooling rate) di reaktor terlalu cepat, menyebabkan ketidakstabilan antar fasa.</div>
      </div>

      {/* Proposed CAPA */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #000' }}>Proposed CAPA:</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #000', fontWeight: 'bold' }}>
              <th style={{ width: '40px', borderRight: '1px solid #000', padding: '4px' }}>No</th>
              <th style={{ borderRight: '1px solid #000', padding: '4px' }}>Action</th>
              <th style={{ width: '100px', borderRight: '1px solid #000', padding: '4px' }}>Person</th>
              <th style={{ width: '100px', borderRight: '1px solid #000', padding: '4px' }}>Due Date</th>
              <th style={{ width: '100px', padding: '4px' }}>Initial & Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}>1</td>
              <td style={{ borderRight: '1px solid #000', padding: '4px', textAlign: 'left' }}>Optimasi ulang HLB dengan dual emulsifier di R&D Copilot</td>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}>Naya</td>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}>19/09/2026</td>
              <td style={{ padding: '4px' }}></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}>2</td>
              <td style={{ borderRight: '1px solid #000', padding: '4px', textAlign: 'left' }}>Turunkan cooling rate jadi -2°C/menit</td>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}>Joko</td>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}>20/09/2026</td>
              <td style={{ padding: '4px' }}></td>
            </tr>
            <tr>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}>3</td>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}></td>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}></td>
              <td style={{ borderRight: '1px solid #000', padding: '4px' }}></td>
              <td style={{ padding: '4px' }}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Supporting Doc */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>Supporting Document (✓):</div>
        <div style={{ padding: '4px 8px' }}>1. Batch Record LOT-MOIST-26-04B</div>
        <div style={{ padding: '4px 8px 8px 8px' }}>2. Stability Report</div>
        <div style={{ display: 'flex', borderTop: '1px solid #000' }}>
          <div style={{ flex: 1, borderRight: '1px solid #000', display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000', textAlign: 'center' }}>✓</div>
            <div style={{ padding: '4px 8px', fontWeight: 'bold' }}>Required</div>
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
            <div style={{ padding: '4px 8px', fontWeight: 'bold' }}>Not Required</div>
          </div>
        </div>
      </div>

      {/* Signatures */}
      <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
        <div style={{ flex: 1, borderRight: '1px solid #000', padding: '8px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>Prepared by:</div>
          <div>
            Signature &nbsp;&nbsp;&nbsp; Date:<br />
            Author
          </div>
        </div>
        <div style={{ flex: 1, borderRight: '1px solid #000', padding: '8px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>Reviewed by:</div>
          <div>
            Signature &nbsp;&nbsp;&nbsp; Date:<br />
            Head of __________
          </div>
        </div>
        <div style={{ flex: 1, padding: '8px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>Approved by:</div>
          <div>
            Signature &nbsp;&nbsp;&nbsp; Date:<br />
            Head of Quality Assurance
          </div>
        </div>
      </div>

      {/* Corrective Action Implemented */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>Corrective Action Implemented:</div>
        <div style={{ padding: '8px 8px 32px 8px' }}></div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
        <div style={{ flex: 1, borderRight: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Person Responsible:</div>
        <div style={{ flex: 1, padding: '8px', fontWeight: 'bold' }}>Completion Date:</div>
      </div>

      {/* Preventive Action Implemented */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>Preventive Action Implemented:</div>
        <div style={{ padding: '8px 8px 32px 8px' }}></div>
      </div>
      <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
        <div style={{ flex: 1, borderRight: '1px solid #000', padding: '8px', fontWeight: 'bold' }}>Person Responsible:</div>
        <div style={{ flex: 1, padding: '8px', fontWeight: 'bold' }}>Completion Date:</div>
      </div>

      {/* Conclusion */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>Conclusion:</div>
        <div style={{ padding: '8px 8px 32px 8px' }}></div>
      </div>
      
      {/* Follow-up */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>
          Non-conformance has been followed up by Dept: ____________________, and corrective and preventive actions have been fully executed.
        </div>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>
          Status (✓): [ &nbsp; ] Closed &nbsp; [ &nbsp; ] Open &nbsp; [ &nbsp; ] Extended &nbsp; [Other] ____________________
        </div>
      </div>

      {/* Verified/Approved */}
      <div style={{ display: 'flex', borderBottom: '1px solid #000' }}>
        <div style={{ flex: 1, borderRight: '1px solid #000', padding: '8px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>Verified by:</div>
          <div>
            Signature &nbsp;&nbsp;&nbsp; Date: _______________<br />
            Quality Assurance Staff
          </div>
        </div>
        <div style={{ flex: 1, padding: '8px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>Approved by:</div>
          <div>
            Signature &nbsp;&nbsp;&nbsp; Date: _______________<br />
            Head of Quality Assurance
          </div>
        </div>
      </div>

      {/* Evaluation */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #000' }}>Evaluation of CAPA Effectiveness:</div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #000', fontWeight: 'bold' }}>
              <th style={{ width: '40px', borderRight: '1px solid #000', padding: '4px' }}>No</th>
              <th style={{ borderRight: '1px solid #000', padding: '4px' }}>Effectiveness Action</th>
              <th style={{ width: '100px', borderRight: '1px solid #000', padding: '4px' }}>Person</th>
              <th style={{ width: '100px', borderRight: '1px solid #000', padding: '4px' }}>Due Date</th>
              <th style={{ width: '100px', padding: '4px' }}>Initial & Date</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}>1</td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px', textAlign: 'left' }}>Monitor hasil batch berikutnya (2 lot berturut-turut) untuk konfirmasi tidak ada pemisahan fase</td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}>QC</td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}>25/10/2026</td>
              <td style={{ padding: '12px 4px' }}></td>
            </tr>
            <tr style={{ borderBottom: '1px solid #000' }}>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}>2</td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}></td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}></td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}></td>
              <td style={{ padding: '12px 4px' }}></td>
            </tr>
            <tr>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}>3</td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}></td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}></td>
              <td style={{ borderRight: '1px solid #000', padding: '12px 4px' }}></td>
              <td style={{ padding: '12px 4px' }}></td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Effectiveness docs */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold' }}>Supporting Documents (✓):</div>
        <div style={{ padding: '4px 8px' }}>1. Laporan Stabilitas Batch Berikutnya</div>
        <div style={{ padding: '4px 8px 8px 8px' }}>2. </div>
        <div style={{ display: 'flex', borderTop: '1px solid #000' }}>
          <div style={{ flex: 1, borderRight: '1px solid #000', display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000', textAlign: 'center' }}>✓</div>
            <div style={{ padding: '4px 8px', fontWeight: 'bold' }}>Required</div>
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
            <div style={{ padding: '4px 8px', fontWeight: 'bold' }}>Not Required</div>
          </div>
        </div>
      </div>
      
      {/* CAPA Outcome */}
      <div style={{ borderBottom: '1px solid #000' }}>
        <div style={{ padding: '8px', fontWeight: 'bold', borderBottom: '1px solid #000' }}>CAPA Outcome (✓):</div>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1, borderRight: '1px solid #000', display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
            <div style={{ padding: '4px 8px', fontWeight: 'bold' }}>Effective</div>
          </div>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ width: '30px', borderRight: '1px solid #000' }}></div>
            <div style={{ padding: '4px 8px', fontWeight: 'bold' }}>Not Effective</div>
          </div>
        </div>
      </div>

      {/* Outcome Signatures */}
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, borderRight: '1px solid #000', padding: '8px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>Verified by:</div>
          <div>
            Signature &nbsp;&nbsp;&nbsp; Date: _______________<br />
            Quality Assurance Staff
          </div>
        </div>
        <div style={{ flex: 1, padding: '8px', minHeight: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontWeight: 'bold' }}>Approved by:</div>
          <div>
            Signature &nbsp;&nbsp;&nbsp; Date: _______________<br />
            Head of Quality Assurance
          </div>
        </div>
      </div>

    </div>
  );
};

export const RcaCapaPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'formulasi' | 'stabilitas' | 'cpp' | 'cma' | 'kb'>('stabilitas');
  const [branches] = useState<FishboneBranch[]>(MOCK_FISHBONE_BRANCHES);
  const [selectedCategory, setSelectedCategory] = useState<string>('Machine');
  const [activeCauseId, setActiveCauseId] = useState<string>('c-m1');
  
  // For CAPA KB
  const [query, setQuery] = useState('Phase separation antara fase air dan fase minyak setelah penyimpanan');
  const [items, setItems] = useState<CapaItem[]>(MOCK_CAPA_ITEMS);
  const [selectedCapa, setSelectedCapa] = useState<CapaItem>(MOCK_CAPA_ITEMS[0]);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const selectedBranch = branches.find(b => b.category === selectedCategory);
  
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'Machine': return <Cpu size={18} />;
      case 'Method': return <GitBranch size={18} />;
      case 'Material': return <FlaskConical size={18} />;
      case 'Man': return <UserCheck size={18} />;
      case 'Measurement': return <Gauge size={18} />;
      case 'Environment': return <CloudRain size={18} />;
      default: return <GitFork size={18} />;
    }
  };

  const filteredItems = items.filter(item => {
    const matchesSearch = 
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.problem_statement.toLowerCase().includes(query.toLowerCase()) ||
      item.root_cause.toLowerCase().includes(query.toLowerCase()) ||
      item.report_id.toLowerCase().includes(query.toLowerCase());
    const matchesSeverity = selectedSeverity === 'ALL' || item.severity === selectedSeverity;
    return (matchesSearch || query.length === 0) && matchesSeverity;
  });

  return (
    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Top Banner */}
      <div className="glass-panel" style={{
        padding: '18px 22px',
        borderLeft: '4px solid var(--amber-warning)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldAlert size={20} color="var(--amber-warning)" />
            <h2 style={{ fontSize: '1.2rem', fontWeight: 800 }}>
              RCA & CAPA Hub Pusat
            </h2>
            <span className="badge-pill badge-amber">1 Deviasi Aktif</span>
          </div>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Pusat investigasi penyimpangan (Root Cause Analysis) dan formulir Corrective Action and Preventive Action (CAPA) dari semua modul.
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div style={{
        display: 'flex',
        gap: '8px',
        borderBottom: '1px solid var(--border-subtle)',
        paddingBottom: '12px',
        flexWrap: 'wrap'
      }}>
        <button
          onClick={() => setActiveTab('formulasi')}
          className={activeTab === 'formulasi' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <FlaskConical size={14} /> Formulasi
        </button>

        <button
          onClick={() => setActiveTab('stabilitas')}
          className={activeTab === 'stabilitas' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <Thermometer size={14} /> Stabilitas
        </button>

        <button
          onClick={() => setActiveTab('cpp')}
          className={activeTab === 'cpp' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <Activity size={14} /> Proses Kritis
        </button>
        
        <button
          onClick={() => setActiveTab('cma')}
          className={activeTab === 'cma' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <Layers size={14} /> Material Kritis
        </button>

        <button
          onClick={() => setActiveTab('kb')}
          className={activeTab === 'kb' ? 'btn-primary' : 'btn-secondary'}
          style={{ fontSize: '0.8rem', padding: '8px 14px' }}
        >
          <ShieldCheck size={14} /> CAPA Knowledge Base
        </button>
      </div>

      {/* Empty States for No Deviation Modules */}
      {(activeTab === 'formulasi' || activeTab === 'cpp' || activeTab === 'cma') && (
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: '#f8fafc',
          border: '1px dashed #cbd5e1',
          borderRadius: '12px',
          color: '#64748b'
        }}>
          <CheckCircle2 size={40} color="var(--emerald-neon)" style={{ margin: '0 auto 12px auto' }} />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600, color: '#0f172a' }}>Tidak ada penyimpangan terdeteksi</h3>
          <p style={{ fontSize: '0.85rem', marginTop: '4px' }}>Modul ini berstatus aman. Semua parameter memenuhi standar.</p>
        </div>
      )}

      {/* Active Deviation for Stabilitas */}
      {activeTab === 'stabilitas' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          
          <div style={{
            background: '#fff1f2',
            border: '1px solid #fecdd3',
            borderRadius: '10px',
            padding: '14px 18px',
            fontSize: '0.82rem',
            color: '#be123c',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <AlertTriangle size={24} style={{ flexShrink: 0 }} />
            <div>
              <strong style={{ fontSize: '0.9rem' }}>Penyimpangan Stabilitas Terdeteksi: LOT-MOIST-26-04B</strong><br />
              Phase separation antara fase air dan fase minyak setelah penyimpanan uji stabilitas termal (45°C). Memerlukan RCA dan CAPA.
            </div>
          </div>

          <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
            
            {/* RCA Panel - 6M Fishbone */}
            <div className="glass-panel" style={{ flex: 1, minWidth: '400px', padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
                    Evidence-Based Root Cause Analysis (6M Ishikawa)
                  </h3>
                  <span style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                    Klik cabang 6M untuk melihat hipotesis. (5-Whys dihilangkan sesuai request)
                  </span>
                </div>
              </div>

              {/* 6M Category Selector Pills */}
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {branches.map(branch => {
                  const isSelected = selectedCategory === branch.category;
                  const hasConfirmed = branch.causes.some(c => c.status === 'CONFIRMED_CAUSE');
                  return (
                    <button
                      key={branch.category}
                      onClick={() => {
                        setSelectedCategory(branch.category);
                        setActiveCauseId(branch.causes[0]?.id);
                      }}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        border: isSelected 
                          ? '1px solid #0284c7' 
                          : '1px solid #cbd5e1',
                        background: isSelected 
                          ? '#eff6ff' 
                          : '#ffffff',
                        color: isSelected ? '#0284c7' : 'var(--text-secondary)',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {getCategoryIcon(branch.category)}
                      <span>{branch.category}</span>
                      {hasConfirmed && (
                        <span style={{
                          width: '6px',
                          height: '6px',
                          borderRadius: '50%',
                          background: 'var(--rose-danger)'
                        }} />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Causes List for Selected 6M */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {selectedBranch?.causes.map(cause => {
                  const isSelected = cause.id === activeCauseId;
                  const getStatusColor = () => {
                    if (cause.status === 'CONFIRMED_CAUSE') return 'var(--rose-danger)';
                    if (cause.status === 'RULED_OUT') return 'var(--text-muted)';
                    return 'var(--amber-warning)';
                  };
                  return (
                    <div 
                      key={cause.id}
                      onClick={() => setActiveCauseId(cause.id)}
                      style={{
                        padding: '12px 14px',
                        border: `1px solid ${isSelected ? getStatusColor() : '#e2e8f0'}`,
                        background: isSelected ? '#f8fafc' : '#ffffff',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        gap: '12px'
                      }}
                    >
                      <div style={{ color: getStatusColor(), marginTop: '2px' }}>
                        {cause.status === 'CONFIRMED_CAUSE' && <CheckCircle2 size={16} />}
                        {cause.status === 'HYPOTHESIS' && <HelpCircle size={16} />}
                        {cause.status === 'RULED_OUT' && <XCircle size={16} />}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ 
                          fontSize: '0.88rem', 
                          fontWeight: isSelected ? 700 : 500,
                          color: cause.status === 'RULED_OUT' ? 'var(--text-muted)' : '#0f172a'
                        }}>
                          {cause.text}
                        </div>
                        {isSelected && (
                          <div style={{
                            marginTop: '8px',
                            padding: '10px',
                            background: '#ffffff',
                            borderRadius: '6px',
                            border: '1px solid #e2e8f0',
                            fontSize: '0.78rem'
                          }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 600, marginBottom: '6px' }}>
                              <BrainCircuit size={14} /> Analisis AI
                            </div>
                            <p style={{ color: '#475569', marginBottom: '8px' }}>
                              {(cause as any).ai_analysis || cause.detail}
                            </p>
                            <div style={{ background: '#f1f5f9', padding: '6px 10px', borderRadius: '4px', display: 'flex', justifyContent: 'space-between' }}>
                              <span style={{ color: '#64748b' }}>Data Sensor / Evidence:</span>
                              <span className="font-mono-calc" style={{ fontWeight: 700, color: '#0f172a' }}>{(cause as any).sensor_data || cause.evidence}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* CAPA Form Preview */}
            <div style={{ flex: 1, minWidth: '450px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>
                  Lembar Evaluasi CAPA Terpadu
                </h3>
                <button className="btn-secondary" style={{ fontSize: '0.75rem', padding: '6px 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Printer size={13} /> Cetak & Download Form
                </button>
              </div>
              <CapaForm />
            </div>

          </div>
        </div>
      )}

      {/* Tab CAPA Knowledge Base (from CapaPage) */}
      {activeTab === 'kb' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* NLP Search Bar */}
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <div style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: '#ffffff',
              border: '1px solid #cbd5e1',
              borderRadius: '8px',
              padding: '10px 14px'
            }}>
              <Search size={18} color="var(--text-muted)" />
              <input 
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Deskripsikan masalah untuk pencarian kemiripan kasus historis..."
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: '#0f172a',
                  fontSize: '0.88rem',
                  width: '100%'
                }}
              />
            </div>

            <select
              value={selectedSeverity}
              onChange={(e) => setSelectedSeverity(e.target.value)}
              style={{
                background: '#ffffff',
                border: '1px solid #cbd5e1',
                color: '#0f172a',
                fontSize: '0.82rem',
                padding: '10px 14px',
                borderRadius: '8px',
                outline: 'none'
              }}
            >
              <option value="ALL">Semua Severity</option>
              <option value="CRITICAL">Critical</option>
              <option value="MAJOR">Major</option>
              <option value="MINOR">Minor</option>
            </select>
          </div>

          {/* Grid: Search Results + Selected CAPA Detail */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
            gap: '20px'
          }}>
            {/* Left: Matched List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Hasil Temuan Kasus ({filteredItems.length} Laporan Serupa):
              </div>

              {filteredItems.map(item => {
                const isSelected = selectedCapa.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedCapa(item)}
                    className={`glass-panel ${isSelected ? 'glass-panel-elevated' : ''}`}
                    style={{
                      padding: '16px',
                      cursor: 'pointer',
                      border: isSelected ? '1px solid var(--emerald-neon)' : '1px solid var(--border-subtle)',
                      background: isSelected ? 'rgba(16, 185, 129, 0.08)' : 'var(--bg-glass)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span className="font-mono-calc" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {item.report_id}
                        </span>
                        {item.severity === 'CRITICAL' ? (
                          <span className="badge-pill badge-rose" style={{ fontSize: '0.65rem' }}>Critical</span>
                        ) : (
                          <span className="badge-pill badge-amber" style={{ fontSize: '0.65rem' }}>Major</span>
                        )}
                      </div>

                      {item.similarity_score && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          background: 'rgba(16, 185, 129, 0.15)',
                          color: 'var(--emerald-neon)',
                          padding: '2px 8px',
                          borderRadius: '4px',
                          fontSize: '0.72rem',
                          fontWeight: 700
                        }}>
                          {Math.round(item.similarity_score * 100)}% Match
                        </div>
                      )}
                    </div>

                    <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: '#0f172a', margin: '4px 0' }}>
                      {item.title}
                    </h4>
                    
                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {item.problem_statement}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Right: Detail View */}
            <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#ffffff', alignSelf: 'start', position: 'sticky', top: '24px' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span className="font-mono-calc" style={{ color: 'var(--brand-blue)', fontWeight: 700, fontSize: '0.85rem' }}>
                    {selectedCapa.report_id}
                  </span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={12} /> {selectedCapa.incident_date}
                  </span>
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#0f172a', lineHeight: 1.3 }}>
                  {selectedCapa.title}
                </h3>
              </div>

              <div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Problem Statement</h4>
                <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: 1.6 }}>
                  {selectedCapa.problem_statement}
                </p>
              </div>

              <div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '6px' }}>Identified Root Cause</h4>
                <div style={{ background: '#f8fafc', padding: '12px', borderLeft: '3px solid var(--amber-warning)', borderRadius: '0 6px 6px 0', fontSize: '0.88rem', color: '#0f172a' }}>
                  {selectedCapa.root_cause}
                </div>
              </div>

              <div>
                <h4 style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '10px' }}>Corrective & Preventive Actions</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[selectedCapa.corrective_action, selectedCapa.preventive_action].map((action, idx) => (
                    <div key={idx} style={{
                      display: 'flex',
                      gap: '10px',
                      padding: '10px',
                      background: '#ffffff',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px'
                    }}>
                      <div style={{
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: '#eff6ff',
                        color: '#0284c7',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        flexShrink: 0
                      }}>
                        {idx + 1}
                      </div>
                      <div style={{ fontSize: '0.85rem', color: '#334155', paddingTop: '2px' }}>
                        {action}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: '10px', paddingTop: '20px', borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <User size={16} color="var(--text-muted)" />
                  <span style={{ fontSize: '0.8rem', color: '#475569' }}>Filed by: <strong>{selectedCapa.owner}</strong></span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--emerald-neon)', fontSize: '0.8rem', fontWeight: 700 }}>
                  <CheckCircle2 size={16} /> Status: CLOSED
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
