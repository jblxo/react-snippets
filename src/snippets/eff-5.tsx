// EFF-5 · Reset jen části stavu
// Při změně items chci zrušit jen výběr, zbytek stavu nechat. Co je špatně a jak to udělat správně?
import { useEffect, useState } from 'react'

type Item = { id: string; name: string }
type Props = { items: Item[] }

function List({ items }: Props) {
  const [isReverse, setIsReverse] = useState(false)
  const [selection, setSelection] = useState<Item | null>(null)

  useEffect(() => {
    setSelection(null)
  }, [items])
  // …

  // --- zobrazení (není součást otázky) ---
  console.log(`render, výběr: ${selection?.name ?? 'nic'}`)
  const shown = isReverse ? [...items].reverse() : items
  return (
    <>
      <label>
        <input type="checkbox" checked={isReverse} onChange={(e) => setIsReverse(e.target.checked)} /> obráceně
      </label>
      <ul>
        {shown.map((i) => (
          <li key={i.id} onClick={() => setSelection(i)} className={selection?.id === i.id ? 'selected' : ''}>
            {i.name}
          </li>
        ))}
      </ul>
      <p>Vybráno: {selection?.name ?? '–'}</p>
    </>
  )
}

// --- ukázka ---
const OVOCE = [{ id: 'a', name: 'Jablko' }, { id: 'b', name: 'Hruška' }, { id: 'c', name: 'Švestka' }]
const ZELENINA = [{ id: 'd', name: 'Mrkev' }, { id: 'e', name: 'Paprika' }]

export default function Demo() {
  const [items, setItems] = useState(OVOCE)
  return (
    <>
      <button onClick={() => setItems(OVOCE)}>Ovoce</button>{' '}
      <button onClick={() => setItems(ZELENINA)}>Zelenina</button>
      <List items={items} />
    </>
  )
}
