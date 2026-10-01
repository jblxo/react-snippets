// RCT-3 · Ref vs state
// Jaký je rozdíl mezi useRef a useState? Proč se tady číslo na tlačítku nemění?
import { useRef } from 'react'

function Counter() {
  const count = useRef(0)
  return (
    <button onClick={() => { count.current++ }}>
      Kliknuto {count.current}×
    </button>
  )
}

// --- ukázka ---
export default function Demo() {
  return <Counter />
}
