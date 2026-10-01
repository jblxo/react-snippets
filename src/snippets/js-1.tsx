// JS-1 · Event loop, call stack, microtasky
// V jakém pořadí se to vypíše a proč?

function run() {
  console.log('1')
  setTimeout(() => console.log('2'), 0)
  Promise.resolve().then(() => console.log('3'))
  queueMicrotask(() => console.log('4'))
  console.log('5')
}

// --- ukázka ---
export default function Demo() {
  return <button onClick={run}>Spustit</button>
}
