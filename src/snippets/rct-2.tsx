// RCT-2 · Lifecycle komponenty a efektu
// Jak vypadá lifecycle komponenty a lifecycle efektu? V jakém pořadí se tohle vypíše při prvním zobrazení?
import { useEffect, useState } from 'react'

function Child() {
  console.log('child render')
  useEffect(() => {
    console.log('child effect')
    return () => console.log('child cleanup')
  })
  return null
}

function Parent() {
  console.log('parent render')
  useEffect(() => console.log('parent effect'))
  return <Child />
}

// --- ukázka ---
export default function Demo() {
  const [shown, setShown] = useState(false)
  const [, rerender] = useState(0)
  return (
    <>
      <button onClick={() => setShown((s) => !s)}>{shown ? 'Odmountovat' : 'Zobrazit'} Parent</button>{' '}
      <button onClick={() => rerender((n) => n + 1)} disabled={!shown}>Přerenderovat</button>
      {shown && <Parent />}
    </>
  )
}
