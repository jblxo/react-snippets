// EFF-3 · Odvozený stav v efektu
// Co je tu špatně?
import { useEffect, useState } from 'react'
import { PRODUCTS, type Product } from '../mocks'

type Props = { products: Product[]; query: string }
const List = ({ items }: { items: Product[] }) => (
  <ul>{items.map((p) => <li key={p.id}>{p.name}</li>)}</ul>
)

function ProductList({ products, query }: Props) {
  const [filtered, setFiltered] = useState<Product[]>([])
  console.log(`render, filtered: ${filtered.length}`)

  useEffect(() => {
    setFiltered(products.filter((p) => p.name.includes(query)))
  }, [products, query])

  return <List items={filtered} />
}

// --- ukázka ---
export default function Demo() {
  const [query, setQuery] = useState('')
  return (
    <>
      <input placeholder="Hledat" value={query} onChange={(e) => setQuery(e.target.value)} />
      <ProductList products={PRODUCTS} query={query} />
    </>
  )
}
