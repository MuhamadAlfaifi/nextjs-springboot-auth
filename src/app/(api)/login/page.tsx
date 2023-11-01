import { redirect } from 'next/navigation';
import { LoginForm } from './form';
import { host_path } from '../api';
import { cookies } from 'next/headers';

export default async function LoginPage() {
  const { status, headers } = await fetch(host_path(), {
    headers: {
      cookie: `JSESSIONID=${cookies().get('JSESSIONID')?.value}`
    },
    redirect: 'manual',
  })
  
  if (status === 302 && headers.get('location')?.endsWith('/login')) {
    return <LoginForm />;
  }

  redirect('/');
}