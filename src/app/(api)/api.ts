import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export const host_path = (path: string = '') => (process.env.SPRING_BOOT_HOST as string).replace(/\/$/, '') + path;

export const defaultTo = (value: any, defaultValue: any) => value === undefined ? defaultValue : value;

export async function api(path: string, options?: RequestInit & { auth_redirect_url?: string }) {
  const response = await fetch(host_path(path), {
    ...options,
    headers: {
      ...options?.headers,
      cookie: `JSESSIONID=${cookies().get('JSESSIONID')?.value}`
    },
    redirect: 'manual'
  })

  const auth_redirect_url = defaultTo(options?.auth_redirect_url, '/login');
  
  if (!response.ok && response.status === 302 && response.headers.get('location')?.endsWith('/login') && auth_redirect_url) {
    return redirect(auth_redirect_url);
  }

  const json = await response.json();

  if (!response.ok) {
    throw JSON.stringify(json, null, 2);
  }

  return json;
}