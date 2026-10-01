// EFF-6 · Načítání dat v efektu
// Jaké vidíš problémy a jak bys to udělal?
import { useEffect, useState } from 'react'

export function Todos({ userId }: { userId: string }) {
  const [todos, setTodos] = useState<any[]>([])

  useEffect(() => {
    fetch(`/api/todos?user=${userId}`)
      .then((r) => r.json())
      .then(setTodos)
  }, [userId])

  return <ul>{todos.map((t, i) => <li key={i}>{t.title}</li>)}</ul>
}

// --- ukázka ---
// /api/todos je falešné API (src/mocks.ts).
const USERS = ['alice', 'bob', 'cyril']

export default function Demo() {
  const [userId, setUserId] = useState(USERS[0])
  return (
    <>
      {USERS.map((u) => (
        <button key={u} onClick={() => setUserId(u)} disabled={u === userId}>{u}</button>
      ))}
      <p>Vybraný uživatel: <strong>{userId}</strong></p>
      <Todos userId={userId} />
    </>
  )
}
