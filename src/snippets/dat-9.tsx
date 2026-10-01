// DAT-9 · useActionState a useFormStatus
// K čemu je useActionState a useFormStatus a kdy který použiješ? Proč se tady tlačítko při odesílání nikdy nezablokuje?
import { useActionState } from 'react'
import { useFormStatus } from 'react-dom'

type State = { status: 'idle' | 'ok' | 'error'; message?: string }

// V Next by to byla server action ('use server'), tady obyčejná async funkce se zpožděním.
async function subscribe(_prev: State, formData: FormData): Promise<State> {
  await new Promise((r) => setTimeout(r, 1500))
  const email = String(formData.get('email') ?? '')
  console.log(`subscribe(${email})`)
  if (!email.includes('@')) return { status: 'error', message: 'Neplatný e-mail' }
  return { status: 'ok' }
}

export function NewsletterForm() {
  const [state, formAction] = useActionState(subscribe, { status: 'idle' })
  const { pending } = useFormStatus()

  return (
    <form action={formAction}>
      <input name="email" type="email" />
      <button disabled={pending}>Přihlásit</button>
      {state.status === 'error' && <p>{state.message}</p>}
    </form>
  )
}

// --- ukázka ---
export default function Demo() {
  return <NewsletterForm />
}
