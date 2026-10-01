import { StrictMode, Fragment, useEffect, useState, type ComponentType } from 'react'
import { clearLog, useLog } from './log'
import JS1 from './snippets/js-1'
import JS2 from './snippets/js-2'
import RCT1 from './snippets/rct-1'
import RCT2 from './snippets/rct-2'
import RCT3 from './snippets/rct-3'
import RCT4 from './snippets/rct-4'
import EFF1 from './snippets/eff-1'
import EFF3 from './snippets/eff-3'
import EFF4 from './snippets/eff-4'
import EFF5 from './snippets/eff-5'
import EFF6 from './snippets/eff-6'
import EFF7 from './snippets/eff-7'
import EFF8 from './snippets/eff-8'
import EFF9 from './snippets/eff-9'
import EFF10 from './snippets/eff-10'
import DAT9 from './snippets/dat-9'

type Snippet = { id: string; title: string; question: string; Demo: ComponentType }

const SNIPPETS: Snippet[] = [
  { id: 'js-1', title: 'Event loop, call stack, microtasky', question: 'V jakém pořadí se to vypíše a proč?', Demo: JS1 },
  { id: 'js-2', title: 'Capturing, bubbling, delegace', question: 'Jak funguje propagace událostí? Co se vypíše po kliknutí na tlačítko?', Demo: JS2 },
  { id: 'rct-1', title: 'Pure komponenty', question: 'Co znamená, že je komponenta „pure“, a proč na tom záleží? Co je špatně tady?', Demo: RCT1 },
  { id: 'rct-2', title: 'Lifecycle komponenty a efektu', question: 'Jak vypadá lifecycle komponenty a lifecycle efektu? V jakém pořadí se tohle vypíše při prvním zobrazení?', Demo: RCT2 },
  { id: 'rct-3', title: 'Ref vs state', question: 'Jaký je rozdíl mezi useRef a useState? Proč se tady číslo na tlačítku nemění?', Demo: RCT3 },
  { id: 'rct-4', title: 'Memoizace a React Compiler', question: 'K čemu je tu memo, useMemo a useCallback? Co udělá React Compiler a potřebuješ je s ním ještě?', Demo: RCT4 },
  { id: 'eff-1', title: 'Proč se useEffect v dev volá dvakrát', question: 'Proč se v dev módu useEffect zavolá dvakrát?', Demo: EFF1 },
  { id: 'eff-3', title: 'Odvozený stav v efektu', question: 'Co je tu špatně?', Demo: EFF3 },
  { id: 'eff-4', title: 'Reset stavu při změně propu', question: 'Přehrávač má při změně src začít od nuly. Jak bys to udělal jinak?', Demo: EFF4 },
  { id: 'eff-5', title: 'Reset jen části stavu', question: 'Při změně items chci zrušit jen výběr, zbytek stavu nechat. Co je špatně a jak to udělat správně?', Demo: EFF5 },
  { id: 'eff-6', title: 'Načítání dat v efektu', question: 'Jaké vidíš problémy a jak bys to udělal?', Demo: EFF6 },
  { id: 'eff-7', title: 'Logika události v efektu', question: 'Co je tu špatně?', Demo: EFF7 },
  { id: 'eff-8', title: 'Dítě hlásí rodiči pozici', question: 'Child komponenta hlásí parent komponentě svou pozici. Proč useLayoutEffect, co to stojí a jde to jinak?', Demo: EFF8 },
  { id: 'eff-9', title: 'useEffectEvent', question: 'Na co je v React 19.2 useEffectEvent a jaký problém řeší?', Demo: EFF9 },
  { id: 'eff-10', title: 'setInterval a stale closure', question: 'Proč se čítač zastaví na 1? A proč si v Reactu nemůžu napsat useInterval tak, jak bych čekal?', Demo: EFF10 },
  { id: 'dat-9', title: 'useActionState a useFormStatus', question: 'K čemu je useActionState a useFormStatus a kdy který použiješ? Proč se tady tlačítko při odesílání nikdy nezablokuje?', Demo: DAT9 },
]

const currentId = () => window.location.hash.replace('#/', '') || SNIPPETS[0].id

export default function App() {
  const [id, setId] = useState(currentId)
  const [strict, setStrict] = useState(true)

  useEffect(() => {
    const onHash = () => setId(currentId())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const snippet = SNIPPETS.find((s) => s.id === id) ?? SNIPPETS[0]
  const { Demo } = snippet
  const Wrapper = strict ? StrictMode : Fragment

  return (
    <div className="layout">
      <nav>
        <label className="strict">
          <input type="checkbox" checked={strict} onChange={(e) => { clearLog(); setStrict(e.target.checked) }} /> StrictMode
        </label>
        {SNIPPETS.map((s) => (
          <a key={s.id} href={`#/${s.id}`} className={s.id === snippet.id ? 'active' : ''} onClick={() => clearLog()}>
            <span className="id">{s.id.toUpperCase()}</span> {s.title}
          </a>
        ))}
      </nav>
      <main>
        <h2>{snippet.id.toUpperCase()} · {snippet.title}</h2>
        <p className="question">{snippet.question}</p>
        <p className="file">Kód: <code>src/snippets/{snippet.id}.tsx</code></p>
        <section className="demo">
          <Wrapper key={`${snippet.id}-${strict}`}>
            <Demo />
          </Wrapper>
        </section>
        <ConsolePanel />
      </main>
    </div>
  )
}

// Samostatná komponenta: nový log přerenderuje jen panel, ne ukázku (jinak by log z renderu vyvolal smyčku).
function ConsolePanel() {
  const log = useLog()
  return (
    <section className="console">
      <header>
        Konzole <button onClick={clearLog}>Vymazat</button>
      </header>
      <pre>{log.map((e) => e.text).join('\n') || '–'}</pre>
    </section>
  )
}
