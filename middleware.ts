import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export default function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    const isAuthenticated = token ? token.value.length > 1 : false;

    const isStaticOrMedia =
        req.nextUrl.pathname.startsWith("/_next/static/") ||
        req.nextUrl.pathname.startsWith("/media/") ||
        req.nextUrl.pathname.startsWith("/_next/image");

    if (isStaticOrMedia) {
        return NextResponse.next();
    }

    if (req.nextUrl.pathname === "/login") {
        if (isAuthenticated) {
            const usersURL = new URL("/users", req.nextUrl.origin);
            return NextResponse.redirect(usersURL.toString());
        }
        return NextResponse.next();
    }

    if (isAuthenticated && req.nextUrl.pathname === "/") {
        const usersURL = new URL("/users", req.nextUrl.origin);
        return NextResponse.redirect(usersURL.toString());
    }

    if (!isAuthenticated) {
        const loginURL = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(loginURL.toString());
    }

    return NextResponse.next();
}
