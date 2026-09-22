import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { Pause, Play } from 'lucide-react';

const MotionContext = createContext({ paused: false, toggle: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem('rangkai-motion') === 'paused'; } catch { return false; }
  });
  useEffect(() => {
    document.documentElement.dataset.motion = paused ? 'paused' : 'active';
    try { localStorage.setItem('rangkai-motion', paused ? 'paused' : 'active'); } catch { /* Storage is optional. */ }
  }, [paused]);
  return <MotionContext.Provider value={{ paused, toggle: () => setPaused(value => !value) }}>{children}</MotionContext.Provider>;
}

export function MotionControl() {
  const { paused, toggle } = useContext(MotionContext);
  return <button type="button" className="motion-control" onClick={toggle} aria-pressed={paused} aria-label={paused ? 'Aktifkan animasi dekoratif' : 'Jeda animasi dekoratif'} title={paused ? 'Aktifkan animasi' : 'Jeda animasi'}>
    {paused ? <Play size={13} /> : <Pause size={13} />}<span>Animasi {paused ? 'dijeda' : 'aktif'}</span>
  </button>;
}
