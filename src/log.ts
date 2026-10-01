import { useSyncExternalStore } from 'react'

// Zrcadlí console.log do panelu „Konzole“ v aplikaci (vedle devtools).
type Entry = { id: number; text: string }

let entries: Entry[] = []
let nextId = 1
const listeners = new Set<() => void>()
const emit = () => listeners.forEach((l) => l())

const format = (v: unknown) => (typeof v === 'string' ? v : JSON.stringify(v))

const original = console.log.bind(console)
console.log = (...args: unknown[]) => {
  original(...args)
  const text = args.map(format).join(' ')
  // zápis mimo render, aby log z renderu nevyvolal update jiné komponenty během renderu
  queueMicrotask(() => {
    entries = [...entries, { id: nextId++, text }]
    emit()
  })
}

export function clearLog() {
  queueMicrotask(() => {
    entries = []
    emit()
  })
}

export function useLog() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => entries,
  )
}
