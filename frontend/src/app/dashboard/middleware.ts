import { NextRequest, NextResponse } from "next/server";
import { parse } from 'cookie'; // Importing cookie parser

export async function middleware(req: NextRequest) {
    try {
        console.log("Middleware triggered");

        // Parse cookies from the request header
        const cookies = parse(req.headers.get('cookie') || '');
        const accessToken = cookies.access; // Retrieve access token from cookies
        const user = cookies.user ? JSON.parse(cookies.user) : null; // Parse user data from cookies

        console.log("USER COOKIES", user);

        // If the access token does not exist or user data is invalid, redirect to the login page
        if (!accessToken || !user) {
            return NextResponse.redirect(new URL('/dashboard/login', req.url));
        }

        // Check subscription status
        if (user.subscription_status === 'inactive') {
            // Redirect to pricing page if the account is inactive
            return NextResponse.redirect(new URL('/dashboard/pricing', req.url));
        }

        // Allow the request to continue to the requested page
        return NextResponse.next();
    } catch (error) {
        console.error("Error in middleware:", error);
        return NextResponse.redirect(new URL('/dashboard/login', req.url));
    }
}
