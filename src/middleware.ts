import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  const basicAuth = req.headers.get('authorization');
  const url = req.nextUrl;

  if (url.pathname.startsWith('/dashboard')) {
    if (basicAuth) {
      const authValue = basicAuth.split(' ')[1];
      const [user, pwd] = atob(authValue).split(':');

      // Usa variables de entorno o estos valores por defecto
      const validUser = process.env.ADMIN_USER || 'admin';
      const validPassword = process.env.ADMIN_PASSWORD || 'Admin123!';

      if (user === validUser && pwd === validPassword) {
        return NextResponse.next();
      }
    }
    
    return new NextResponse('Autenticación requerida. Solicítale las credenciales al administrador.', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Panel de Administracion Seguro"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
