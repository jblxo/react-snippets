// EFF-1 · Proč se useEffect v dev volá dvakrát
// Proč se v dev módu useEffect zavolá dvakrát? (Otázka je verbální, tohle je jen ukázka.)
import { useEffect, useState } from 'react'

function Clock() {
  useEffect(() => {
    console.log('effect: start')
    const id = setInterval(() => console.log('tick'), 1000)
  }, [])

  return <p>Sleduj konzoli: kolik „tick“ přijde za sekundu?</p>
}

// --- ukázka ---
export default function Demo() {
  const [shown, setShown] = useState(false)
  return (
    <>
      <button onClick={() => setShown((s) => !s)}>{shown ? 'Skrýt' : 'Zobrazit'} hodiny</button>
      {shown && <Clock />}
      <p className="hint">Pro reset obnov stránku.</p>
    </>
  )
}
