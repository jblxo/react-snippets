// Falešné závislosti, aby snippety šly spustit bez backendu.

export function showToast(message: string, theme?: string) {
  console.log(`🔔 toast: ${message}${theme ? ` (motiv: ${theme})` : ''}`)
}

export function postOrder(form: unknown) {
  console.log('📤 POST /api/orders', form)
}

export function select(id: string) {
  console.log(`vybráno: ${id}`)
}

export function connect(roomId: string) {
  console.log(`🔌 connect(${roomId})`)
  let timer: ReturnType<typeof setTimeout> | undefined
  return {
    on(_event: 'connected', cb: () => void) {
      timer = setTimeout(cb, 300)
    },
    disconnect() {
      clearTimeout(timer)
      console.log(`❌ disconnect(${roomId})`)
    },
  }
}

export type Product = { id: string; name: string }

export const PRODUCTS: Product[] = [
  { id: 'p1', name: 'Klávesnice' },
  { id: 'p2', name: 'Monitor' },
  { id: 'p3', name: 'Myš' },
  { id: 'p4', name: 'Sluchátka' },
  { id: 'p5', name: 'Mikrofon' },
]

// fetch('/api/todos?user=…') odpoví s náhodným zpožděním 200–1500 ms
const realFetch = window.fetch.bind(window)
window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  const url = new URL(String(input), window.location.origin)
  if (url.pathname === '/api/todos') {
    const user = url.searchParams.get('user') ?? '?'
    const delay = 200 + Math.random() * 1300
    await new Promise((r) => setTimeout(r, delay))
    console.log(`📥 /api/todos?user=${user} (${Math.round(delay)} ms)`)
    const todos = [1, 2, 3].map((n) => ({ title: `Úkol ${n} uživatele ${user}` }))
    return new Response(JSON.stringify(todos), { headers: { 'content-type': 'application/json' } })
  }
  return realFetch(input, init)
}
