// EFF-10 · setInterval a stale closure
// Proč se čítač zastaví na 1? A proč si v Reactu nemůžu napsat useInterval tak, jak bych čekal?
import { useEffect, useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    const id = setInterval(() => setCount(count + 1), 1000)
    return () => clearInterval(id)
  }, [])

  return <h1>{count}</h1>
}

// --- ukázka ---
export default function Demo() {
  return <Counter />
}
