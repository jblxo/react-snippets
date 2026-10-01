// RCT-1 · Pure komponenty
// Co znamená, že je komponenta „pure“, a proč na tom záleží? Co je špatně tady?
import { useState } from 'react'

type Props = { items: string[] }
const byName = (a: string, b: string) => a.localeCompare(b)
const renderItem = (item: string) => <li key={item}>{item}</li>

let guest = 0
function Guest() {
  guest++                 // mění proměnnou mimo komponentu
  return <li>Host #{guest}</li>
}

function List({ items }: Props) {
  items.sort(byName)      // mutuje props
  return <ul>{items.map(renderItem)}</ul>
}

// --- ukázka ---
const NAMES = ['Zuzana', 'Adam', 'Marek', 'Bára']

export default function Demo() {
  const [, rerender] = useState(0)
  return (
    <>
      <h4>Hosté</h4>
      <ul>
        <Guest />
        <Guest />
        <Guest />
      </ul>
      <h4>Seřazený seznam</h4>
      <List items={NAMES} />
      <p>Původní pole v rodiči: {NAMES.join(', ')}</p>
      <button onClick={() => rerender((n) => n + 1)}>Přerenderovat</button>
    </>
  )
}
