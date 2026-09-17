import React, { useState } from 'react';
import { QtppProfile } from '../types';
import { DEFAULT_QTPP } from '../data/mockData';
import { 
  X, 
  FileCheck2, 
  UploadCloud, 
  ShieldCheck, 
  CheckCircle2, 
  Layers, 
  Sparkles, 
  FileText 
} from 'lucide-react';

interface QtppModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (qtpp: QtppProfile) => void;
}

export const QtppModal: React.FC<QtppModalProps> = ({ isOpen, onClose, onSave }) => {
  const [qtpp, setQtpp] = useState<QtppProfile>(DEFAULT_QTPP);
  
  // Document upload simulation
  const [coaUploaded, setCoaUploaded] = useState<boolean>(true);
  const [coaFileName, setCoaFileName] = useState<string>('CoA_Niacinamide_PC_Lot2026.pdf');
  const [halalUploaded, setHalalUploaded] = useState<boolean>(true);
  const [halalFileName, setHalalFileName] = useState<string>('Halal_Cert_LPPOM_MUI_2026.pdf');
  const [isAiScanning, setIsAiScanning] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleSimulateUploadCoa = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsAiScanning(true);
      const name = e.target.files[0].name;
      setTimeout(() => {
        setCoaFileName(name);
        setCoaUploaded(true);
        setIsAiScanning(false);
      }, 700);
    }
  };

  const handleSimulateUploadHalal = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setIsAiScanning(true);
      const name = e.target.files[0].name;
      setTimeout(() => {
        setHalalFileName(name);
        setHalalUploaded(true);
        setIsAiScanning(false);
      }, 700);
    }
  };

  const handleSaveAll = () => {
    onSave(qtpp);
    onClose();
  };

  return (
    <div className="qtpp-overlay" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(15, 23, 42, 0.45)',
      backdropFilter: 'blur(6px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 100,
      padding: '20px'
    }}>
      <div className="glass-panel-elevated" style={{
        width: '100%',
        maxWidth: '780px',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        background: '#ffffff',
        border: '1px solid #cbd5e1',
        boxShadow: '0 20px 45px -10px rgba(15,23,42,0.18)'
      }}>
        {/* Modal Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }} data-mobile-wrap="true">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }} data-mobile-wrap="true">
              <div style={{
                background: 'linear-gradient(135deg, #002b5c 0%, #0284c7 100%)',
                padding: '7px',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <FileCheck2 size={20} color="#ffffff" />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#002b5c' }}>
                Quality Target Product Profile (QTPP) & Evidence Ingestion
              </h2>
            </div>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Definisikan profil mutu produk di awal. AI otomatis memverifikasi status BPOM dan Halal saat CoA/MSDS diunggah.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: '#f1f5f9',
              border: 'none',
              color: 'var(--text-secondary)',
              borderRadius: '6px',
              padding: '6px',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Section 1: QTPP Attributes */}
        <div style={{
          background: '#f8fafc',
          padding: '18px',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002b5c', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Layers size={16} /> 1. Parameter Target Mutu (QTPP)
          </h4>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }} data-mobile-grid="true">
            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Nama Produk & Tipe Sediaan
              </label>
              <input 
                type="text"
                value={qtpp.product_name}
                onChange={(e) => setQtpp({ ...qtpp, product_name: e.target.value })}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#0f172a',
                  padding: '7px 10px',
                  fontSize: '0.82rem'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Target Rentang pH
              </label>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} data-mobile-wrap="true">
                <input 
                  type="number"
                  step="0.1"
                  value={qtpp.target_ph_min}
                  onChange={(e) => setQtpp({ ...qtpp, target_ph_min: parseFloat(e.target.value) || 0 })}
                  style={{
                    width: '70px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    color: '#0f172a',
                    padding: '6px 8px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
                <span style={{ color: 'var(--text-muted)' }}>s/d</span>
                <input 
                  type="number"
                  step="0.1"
                  value={qtpp.target_ph_max}
                  onChange={(e) => setQtpp({ ...qtpp, target_ph_max: parseFloat(e.target.value) || 0 })}
                  style={{
                    width: '70px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    color: '#0f172a',
                    padding: '6px 8px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Target Viskositas (cPs)
              </label>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }} data-mobile-wrap="true">
                <input 
                  type="number"
                  step="500"
                  value={qtpp.target_viscosity_min}
                  onChange={(e) => setQtpp({ ...qtpp, target_viscosity_min: parseFloat(e.target.value) || 0 })}
                  style={{
                    width: '85px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    color: '#0f172a',
                    padding: '6px 8px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
                <span style={{ color: 'var(--text-muted)' }}>-</span>
                <input 
                  type="number"
                  step="500"
                  value={qtpp.target_viscosity_max}
                  onChange={(e) => setQtpp({ ...qtpp, target_viscosity_max: parseFloat(e.target.value) || 0 })}
                  style={{
                    width: '85px',
                    background: '#ffffff',
                    border: '1px solid #cbd5e1',
                    borderRadius: '6px',
                    color: '#0f172a',
                    padding: '6px 8px',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                Maksimal Target COGS (IDR/kg)
              </label>
              <input 
                type="number"
                step="5000"
                value={qtpp.target_cogs_max_idr}
                onChange={(e) => setQtpp({ ...qtpp, target_cogs_max_idr: parseFloat(e.target.value) || 0 })}
                style={{
                  width: '100%',
                  background: '#ffffff',
                  border: '1px solid #cbd5e1',
                  borderRadius: '6px',
                  color: '#0f172a',
                  padding: '7px 10px',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)'
                }}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Document Ingestion & Auto-Verification */}
        <div style={{
          background: '#f8fafc',
          padding: '18px',
          borderRadius: '10px',
          border: '1px solid #e2e8f0',
          display: 'flex',
          flexDirection: 'column',
          gap: '14px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-mobile-wrap="true">
            <h4 style={{ fontSize: '0.9rem', fontWeight: 700, color: '#002b5c', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <ShieldCheck size={16} color="#059669" /> 2. Upload Dokumen Bukti (CoA / MSDS & Sertifikat Halal)
            </h4>
            {isAiScanning && (
              <span className="badge-pill badge-cyan animate-pulse-subtle">
                <Sparkles size={12} /> AI OCR Scanning...
              </span>
            )}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '14px' }} data-mobile-grid="true">
            {/* CoA / MSDS Dropzone */}
            <div style={{
              background: '#ffffff',
              border: coaUploaded ? '1px solid #a7f3d0' : '1px dashed #cbd5e1',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 1px 3px rgba(15,23,42,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-mobile-wrap="true">
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Certificate of Analysis (CoA) atau MSDS</span>
                {coaUploaded ? (
                  <span className="badge-pill badge-emerald">
                    <CheckCircle2 size={12} /> BPOM Verified
                  </span>
                ) : (
                  <span className="badge-pill badge-neutral">Belum Diunggah</span>
                )}
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                {coaUploaded ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a', fontWeight: 600 }} data-mobile-wrap="true">
                    <FileText size={14} color="#059669" /> {coaFileName}
                  </div>
                ) : (
                  'Unggah berkas CoA atau MSDS dari supplier untuk auto-check regulasi BPOM.'
                )}
              </div>

              <label style={{
                marginTop: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '7px 12px',
                background: '#f1f5f9',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                color: '#0f172a',
                fontWeight: 600,
                border: '1px solid #cbd5e1'
              }}>
                <UploadCloud size={14} /> Upload / Ganti CoA
                <input type="file" accept=".pdf,.doc,.docx" onChange={handleSimulateUploadCoa} style={{ display: 'none' }} />
              </label>
            </div>

            {/* Halal Certificate Dropzone */}
            <div style={{
              background: '#ffffff',
              border: halalUploaded ? '1px solid #a7f3d0' : '1px dashed #cbd5e1',
              borderRadius: '8px',
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              boxShadow: '0 1px 3px rgba(15,23,42,0.03)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} data-mobile-wrap="true">
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0f172a' }}>Sertifikat Halal (BPJPH / MUI)</span>
                {halalUploaded ? (
                  <span className="badge-pill badge-emerald">
                    <CheckCircle2 size={12} /> Halal Verified
                  </span>
                ) : (
                  <span className="badge-pill badge-neutral">Belum Diunggah</span>
                )}
              </div>

              <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                {halalUploaded ? (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#0f172a', fontWeight: 600 }} data-mobile-wrap="true">
                    <FileText size={14} color="#059669" /> {halalFileName}
                  </div>
                ) : (
                  'Unggah sertifikat halal bahan baku untuk auto-centang status Halal oleh AI.'
                )}
              </div>

              <label style={{
                marginTop: 'auto',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                padding: '7px 12px',
                background: '#f1f5f9',
                borderRadius: '6px',
                fontSize: '0.75rem',
                cursor: 'pointer',
                color: '#0f172a',
                fontWeight: 600,
                border: '1px solid #cbd5e1'
              }}>
                <UploadCloud size={14} /> Upload / Ganti Sertifikat Halal
                <input type="file" accept=".pdf,.jpg,.png" onChange={handleSimulateUploadHalal} style={{ display: 'none' }} />
              </label>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px' }} data-mobile-wrap="true">
          <button onClick={onClose} className="btn-secondary" style={{ fontSize: '0.82rem' }}>
            Batal
          </button>
          <button onClick={handleSaveAll} className="btn-primary" style={{ fontSize: '0.82rem' }}>
            Simpan & Terapkan ke Formulasi
          </button>
        </div>
      </div>
    </div>
  );
};
