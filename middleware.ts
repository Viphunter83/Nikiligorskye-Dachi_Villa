import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
    if (req.nextUrl.pathname.startsWith('/admin')) {
        const basicAuth = req.headers.get('authorization');

        if (basicAuth) {
            const authValue = basicAuth.split(' ')[1];
            const [user, pwd] = atob(authValue).split(':');

            if (user === 'admin' && pwd === 'kp2026') {
                return NextResponse.next();
            }
        }

        return new NextResponse('Auth Required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            },
        });
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/admin/:path*',
};
