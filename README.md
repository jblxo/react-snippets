# FE snippety k 2. kolu

Spustitelné snippety z databáze FE otázek (React 19, Vite, bez Next.js). Každá ukázka je v `src/snippets/<id>.tsx`: nahoře kód přesně jako v otázce, pod `// --- ukázka ---` jen kostra, která ho spustí. Falešné závislosti (fetch, connect, toast) jsou v `src/mocks.ts`.

Správná řešení tu schválně nejsou, jsou jen v databázi otázek.

## Spuštění

- **StackBlitz:** `https://stackblitz.com/github/<owner>/<repo>` (repo musí být veřejné). Konkrétní soubor otevřeš přidáním `?file=src/snippets/eff-10.tsx`.
- **Lokálně:** `npm install && npm run dev`

V aplikaci je vlevo seznam ukázek a přepínač StrictMode (výchozí zapnutý, jako v Next.js v dev módu). Dole je panel Konzole, který zrcadlí `console.log`.

## Ukázky

| ID | Otázka |
|---|---|
| JS-1 | Event loop, call stack, microtasky |
| JS-2 | Capturing, bubbling, delegace |
| RCT-1 | Pure komponenty |
| RCT-2 | Lifecycle komponenty a efektu |
| RCT-3 | Ref vs state |
| RCT-4 | Memoizace a React Compiler |
| EFF-1 | Proč se `useEffect` v dev volá dvakrát |
| EFF-3 | Odvozený stav v efektu |
| EFF-4 | Reset stavu při změně propu |
| EFF-5 | Reset jen části stavu |
| EFF-6 | Načítání dat v efektu |
| EFF-7 | Logika události v efektu |
| EFF-8 | Dítě hlásí rodiči pozici |
| EFF-9 | `useEffectEvent` |
| EFF-10 | `setInterval` a stale closure |
| DAT-9 | `useActionState` a `useFormStatus` |
