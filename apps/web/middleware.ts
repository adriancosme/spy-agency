import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // Only BOSS can access to hitmen pages

  if (req.nextUrl.pathname.startsWith('/hitmen')) {
    const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    // @ts-ignore
    if (session?.user.role !== 'BOSS') {
      return NextResponse.redirect(new URL('/hits', req.url));
    }
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();
    url.pathname = `/`;
    url.search = `p=${requestedPage}`;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ['/hits', '/hitmen', '/hits/:id', '/hitmen/:id']
};
