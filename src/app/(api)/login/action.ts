'use server'
 
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import request from 'request';
import util from 'util';

const host_path = (path: string) => (process.env.SPRING_BOOT_HOST as string).replace(/\/$/, '') + path;
 
export async function springbootFormLogin(_: any, formData: FormData) {
  const response = await util.promisify(request.post)({ 
    url: host_path('/login'),
    form: { 
      username: formData.get('username'),
      password: formData.get('password'),
    }
  });

  const isAuthorized = response.headers?.['location'] === host_path('/');
  const JSESSIONID = response.headers?.['set-cookie']?.pop()?.replace(/JSESSIONID=([^;]+);.*/, '$1');
  
  if (!isAuthorized || !JSESSIONID) {
    return { message: 'provided credentials doesn\'t match our records.' }
  }

  cookies().set('JSESSIONID', JSESSIONID);
  
  redirect('/');
}