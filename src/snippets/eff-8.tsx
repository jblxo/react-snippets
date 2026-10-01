// EFF-8 · Dítě hlásí rodiči pozici
// Child komponenta hlásí parent komponentě svou pozici. Proč useLayoutEffect, co to stojí a jde to jinak?
import { useCallback, useLayoutEffect, useState } from 'react'

type Point = { x: number; y: number }
type Props = { cx?: number; cy?: number; onPositionChange: (p: Point) => void }

function PillAnchor({ cx, cy, onPositionChange }: Props) {
  useLayoutEffect(() => {
    if (typeof cx === 'number' && typeof cy === 'number') {
      onPositionChange({ x: cx, y: cy })
    }
  }, [cx, cy, onPositionChange])
  return <circle cx={cx} cy={cy} r={0} />
}

// --- ukázka: graf s „pilulkou“ nad posledním bodem ---
export default function Demo() {
  const [value, setValue] = useState(60)
  const [pos, setPos] = useState<Point | null>(null)
  const handlePosition = useCallback((p: Point) => setPos(p), [])
  const cy = 140 - value

  return (
    <>
      <input type="range" min={10} max={120} value={value} onChange={(e) => setValue(Number(e.target.value))} />
      <div style={{ position: 'relative', width: 320, height: 160 }}>
        <svg width={320} height={160} className="chart">
          <polyline points={`20,120 100,90 180,100 260,${cy}`} fill="none" stroke="currentColor" strokeWidth={2} />
          <PillAnchor cx={260} cy={cy} onPositionChange={handlePosition} />
        </svg>
        {pos && (
          <span className="pill" style={{ left: pos.x, top: pos.y - 28 }}>{value} Kč</span>
        )}
      </div>
    </>
  )
}
