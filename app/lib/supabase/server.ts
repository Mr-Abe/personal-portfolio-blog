import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { Database } from './database.types';

export function createClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          // @ts-expect-error - Next.js cookies() has wrong types
          return cookies().get(name)?.value ?? '';
        },
        set(name: string, value: string, options: CookieOptions) {
          // @ts-expect-error - Next.js cookies() has wrong types
          cookies().set(name, value, { ...options, path: '/' });
        },
        remove(name: string, options: CookieOptions) {
          // @ts-expect-error - Next.js cookies() has wrong types
          cookies().delete(name, { ...options, path: '/' });
        },
      },
    }
  );
} 