import type { CSSProperties } from 'react';

export type VisualKind = 'formulasi' | 'stabilitas' | 'cpp' | 'cma' | 'rcaCapa' | 'regulation' | 'coa';

/** Decorative diagrams: motion illustrates the module, never a live measurement. */
export function ModuleVisual({ kind, className = '' }: { kind: VisualKind; className?: string }) {
  return (
    <div className={`module-visual visual-${kind} ${className}`} aria-hidden="true">
      <svg viewBox="0 0 360 220" fill="none">
        <g className="visual-grid" stroke="currentColor" strokeWidth="0.6">
          {[40, 80, 120, 160, 200].map(y => <path key={y} d={`M20 ${y}H340`} />)}
          {[60, 100, 140, 180, 220, 260, 300].map(x => <path key={x} d={`M${x} 20V200`} />)}
        </g>
        <path className="visual-corners" d="M20 48V20H48 M312 20H340V48 M340 172V200H312 M48 200H20V172" />
        {kind === 'formulasi' && <>
          <g className="visual-orbit"><ellipse cx="180" cy="110" rx="111" ry="74" /><ellipse cx="180" cy="110" rx="111" ry="74" transform="rotate(60 180 110)" /></g>
          <g className="molecule-bonds"><path d="M180 110L121 72L73 110M121 72L143 30M180 110L241 74L287 111M180 110L177 174L237 193M177 174L116 191" /></g>
          {[[180,110,23],[121,72,13],[73,110,8],[143,30,6],[241,74,15],[287,111,8],[177,174,13],[237,193,7],[116,191,6]].map(([x,y,r], i) => <g key={i} className="visual-node" style={{ '--i': i } as CSSProperties}><circle cx={x} cy={y} r={r+5} className="node-halo" /><circle cx={x} cy={y} r={r} className="node-core" /></g>)}
          <text x="180" y="115" textAnchor="middle" className="visual-core-label">R&amp;D</text>
        </>}
        {kind === 'stabilitas' && <>
          <path className="visual-outline" d="M84 50V143A26 26 0 1 0 116 143V50A16 16 0 0 0 84 50Z" />
          <path className="visual-line" d="M100 75V155" /><circle className="visual-pulse" cx="100" cy="163" r="13" fill="currentColor" />
          <path className="visual-outline" d="M152 57H306M152 110H306M152 163H306" strokeDasharray="3 7" />
          <path className="visual-band" d="M150 122C175 130 184 65 213 94S256 141 309 71V111C259 177 245 110 213 127S175 165 150 155Z" />
          <path className="visual-trace" d="M150 139C175 148 184 88 213 111S256 159 309 91" />
          <circle cx="308" cy="92" r="5" className="visual-pulse" fill="currentColor" />
          <text x="159" y="190" className="visual-caption">STABILITY PROFILE</text>
        </>}
        {kind === 'cpp' && <>
          <rect x="49" y="42" width="262" height="137" rx="13" className="visual-outline" />
          <path className="visual-band" d="M64 83H296V139H64Z" />
          <path className="visual-outline" d="M64 83H296M64 139H296" strokeDasharray="4 6" />
          <path className="visual-trace" d="M65 115H99L112 95L134 128L155 109H177L190 70L211 150L230 110H252L265 95L282 115H296" />
          <path className="visual-scanner" d="M74 54V165" />
          <text x="65" y="196" className="visual-caption">CRITICAL PROCESS PARAMETERS</text>
        </>}
        {kind === 'cma' && <>
          {[0,1,2].map(i => <g key={i} className="visual-layer" style={{ '--i': i } as CSSProperties}>
            <path d={`M180 ${44+i*39}L268 ${85+i*39}L180 ${126+i*39}L92 ${85+i*39}Z`} className="visual-layer-face" />
            <path d={`M92 ${85+i*39}V${99+i*39}L180 ${140+i*39}L268 ${99+i*39}V${85+i*39}`} className="visual-outline" />
          </g>)}
          <path className="visual-trace" d="M42 61H74V163H94M269 84H297V151H322" />
          <circle cx="42" cy="61" r="5" fill="currentColor" /><circle cx="322" cy="151" r="5" fill="currentColor" />
        </>}
        {kind === 'rcaCapa' && <>
          <path className="visual-outline" d="M69 111H144M179 87V49H269M179 135V176H269" />
          <path className="visual-flow" d="M69 111H179V49H269M179 111V176H269" />
          <circle cx="64" cy="111" r="22" className="visual-layer-face" /><path className="visual-line" d="M64 101V114M64 121V122" />
          <rect x="148" y="81" width="62" height="61" rx="18" className="visual-layer-face" />
          <circle cx="179" cy="110" r="14" className="visual-orbit" /><circle cx="179" cy="110" r="5" fill="currentColor" />
          {[49,176].map((y,i) => <g key={y} className="visual-node" style={{ '--i': i*2 } as CSSProperties}><circle cx="280" cy={y} r="23" className="visual-layer-face" /><path d={`M270 ${y}L277 ${y+7}L290 ${y-7}`} className="visual-line" /></g>)}
          <text x="44" y="154" className="visual-caption">RCA</text><text x="250" y="112" className="visual-caption">CAPA</text>
        </>}
        {kind === 'regulation' && <>
          <circle cx="180" cy="109" r="83" className="visual-orbit" />
          <path className="visual-layer-face" d="M180 37L237 60V111C237 151 209 172 180 188C151 172 123 151 123 111V60Z" />
          <path className="visual-check" d="M151 108L171 128L210 86" />
          <path className="visual-flow" d="M49 82H106M254 82H311M49 139H106M254 139H311" />
          <circle cx="49" cy="82" r="4" fill="currentColor" /><circle cx="311" cy="139" r="4" fill="currentColor" />
        </>}
        {kind === 'coa' && <>
          <path className="visual-layer-face" d="M120 26H208L244 63V191H120Z" />
          <path className="visual-outline" d="M208 26V63H244M141 83H220M141 101H205M141 119H220M141 137H180" />
          <path className="document-scan" d="M100 52H264" />
          <circle cx="236" cy="162" r="29" className="visual-layer-face" /><path className="visual-check" d="M222 161L232 171L252 150" />
          <path className="visual-flow" d="M61 93H103M61 125H103M261 83H306" />
          <text x="144" y="170" className="visual-caption">CoA</text>
        </>}
      </svg>
    </div>
  );
}
