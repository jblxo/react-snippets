// EFF-7 · Logika události v efektu
// Co je tu špatně?
import { useEffect, useState } from 'react'
import { postOrder, showToast } from '../mocks'

function OrderForm() {
  const [form, setForm] = useState({ product: 'Monitor', count: 1 })
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    if (submitted) {
      postOrder(form)
      showToast('Objednávka odeslána')
    }
  }, [submitted])

  return (
    <>
      <label>
        Počet kusů:{' '}
        <input type="number" value={form.count} onChange={(e) => setForm({ ...form, count: Number(e.target.value) })} />
      </label>{' '}
      <button onClick={() => setSubmitted(true)}>Odeslat</button>
    </>
  )
}

// --- ukázka ---
export default function Demo() {
  return <OrderForm />
}
