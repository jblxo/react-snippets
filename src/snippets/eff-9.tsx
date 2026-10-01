// EFF-9 · useEffectEvent
// Na co je v React 19.2 useEffectEvent a jaký problém řeší?
import { useEffect, useRef, useState } from 'react'
import { connect, showToast } from '../mocks'

type Props = { roomId: string; theme: string }

// Špatně 1: motiv v závislostech, změna motivu = reconnect
function ChatRoom({ roomId, theme }: Props) {
  useEffect(() => {
    const conn = connect(roomId)
    conn.on('connected', () => showToast('Připojeno', theme))
    return () => conn.disconnect()
  }, [roomId, theme])
  return <p>Místnost {roomId} (varianta 1)</p>
}

// Špatně 2: „latest ref“, zápis do ref v renderu
function ChatRoomRef({ roomId, theme }: Props) {
  const themeRef = useRef(theme)
  themeRef.current = theme
  useEffect(() => {
    const conn = connect(roomId)
    conn.on('connected', () => showToast('Připojeno', themeRef.current))
    return () => conn.disconnect()
  }, [roomId])
  return <p>Místnost {roomId} (varianta 2)</p>
}

// --- ukázka ---
export default function Demo() {
  const [roomId, setRoomId] = useState('general')
  const [theme, setTheme] = useState('light')
  const [variant, setVariant] = useState<1 | 2>(1)
  const Room = variant === 1 ? ChatRoom : ChatRoomRef
  return (
    <>
      <select value={roomId} onChange={(e) => setRoomId(e.target.value)}>
        <option value="general">general</option>
        <option value="travel">travel</option>
      </select>{' '}
      <button onClick={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))}>Motiv: {theme}</button>{' '}
      <button onClick={() => setVariant((v) => (v === 1 ? 2 : 1))}>Varianta {variant}</button>
      <Room key={variant} roomId={roomId} theme={theme} />
    </>
  )
}
