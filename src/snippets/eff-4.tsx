// EFF-4 · Reset stavu při změně propu
// Přehrávač má při změně src začít od nuly. Jak bys to udělal jinak?
import { useEffect, useState } from 'react'

function AudioPlayer({ src }: { src: string }) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)

  useEffect(() => {
    setIsPlaying(false)
    setCurrentTime(0)
  }, [src])

  // --- simulace přehrávání (není součást otázky) ---
  useEffect(() => {
    if (!isPlaying) return
    const id = setInterval(() => setCurrentTime((t) => t + 1), 1000)
    return () => clearInterval(id)
  }, [isPlaying])
  console.log(`render ${src}, čas ${currentTime} s`)

  return (
    <div className="box">
      <strong>{src}</strong> · {currentTime} s{' '}
      <button onClick={() => setIsPlaying((p) => !p)}>{isPlaying ? 'Pauza' : 'Přehrát'}</button>
    </div>
  )
}

// --- ukázka ---
const TRACKS = ['podcast-1.mp3', 'podcast-2.mp3', 'podcast-3.mp3']

export default function Demo() {
  const [src, setSrc] = useState(TRACKS[0])
  return (
    <>
      {TRACKS.map((t) => (
        <button key={t} onClick={() => setSrc(t)} disabled={t === src}>{t}</button>
      ))}
      <AudioPlayer src={src} />
    </>
  )
}
