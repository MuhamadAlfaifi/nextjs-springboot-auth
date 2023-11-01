'use client'

import { useFormState, useFormStatus } from 'react-dom'
import { springbootFormLogin } from './action'

function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button type="submit" aria-disabled={pending}>
      {pending ? 'Logging in...' : 'Login'}
    </button>
  )
}

export function LoginForm() {
  const [state, formAction] = useFormState(springbootFormLogin, { message: 'N/A' });
 
  return (
    <form action={formAction}>
      <input type="text" name="username" placeholder="username" />
      <input type="password" name="password" placeholder="password" />
      <SubmitButton />
      <p>Message: {state.message}</p>
    </form>
  )
}