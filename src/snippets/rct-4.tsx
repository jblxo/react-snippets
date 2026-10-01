// RCT-4 · Memoizace a React Compiler
// K čemu je tu memo, useMemo a useCallback? Co udělá React Compiler a potřebuješ je s ním ještě?
import { memo, useCallback, useMemo, useState } from 'react'
import { PRODUCTS, select, type Product } from '../mocks'

type RowProps = { product: Product; onSelect: (id: string) => void }
type Props = { products: Product[]; filter: string }

const ProductRow = memo(function ProductRow({ product, onSelect }: RowProps) {
  console.log(`render řádku ${product.name}`)
  return <li onClick={() => onSelect(product.id)}>{product.name}</li>
})

function ProductList({ products, filter }: Props) {
  const visible = useMemo(
    () => products.filter((p) => p.name.includes(filter)),
    [products, filter],
  )
  const handleSelect = useCallback((id: string) => select(id), [])

  return <ul>{visible.map((p) => <ProductRow key={p.id} product={p} onSelect={handleSelect} />)}</ul>
}

// --- ukázka ---
export default function Demo() {
  const [filter, setFilter] = useState('')
  const [clicks, setClicks] = useState(0)
  return (
    <>
      <input placeholder="Filtr" value={filter} onChange={(e) => setFilter(e.target.value)} />{' '}
      <button onClick={() => setClicks((c) => c + 1)}>Nesouvisející stav: {clicks}</button>
      <ProductList products={PRODUCTS} filter={filter} />
    </>
  )
}
