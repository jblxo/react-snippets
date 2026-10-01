// JS-2 · Capturing, bubbling, delegace
// Jak funguje propagace událostí? Co se vypíše po kliknutí na tlačítko?

export default function Demo() {
  return (
    <div
      className="box"
      onClick={() => console.log('div')}
      onClickCapture={() => console.log('div capture')}
    >
      <button onClick={() => console.log('button')}>Klik</button>
    </div>
  )
}
