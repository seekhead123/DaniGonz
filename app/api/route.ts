import { NextResponse } from "next/server";

export async function OPTIONS(request: Request) {
    const allowedOrigin = request.headers.get('origin');
    const response = new NextResponse(null, { status: 204 }); // 204 No Content for successful OPTIONS

    // Set CORS headers
    response.headers.set('Access-Control-Allow-Origin', allowedOrigin || '*');
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours

    return response;
}


export async function GET(_: Request) {
    const r = new Response("hewoo")
    r.headers.set('Access-Control-Allow-Origin', '*')

    return Response.json({ a: 1 })
}


export async function POST(_: Request) {
    const id = Date.now().toString().substring(6, 3)

    const r = new Response()
    r.headers.set('Access-Control-Allow-Origin', '*')
    r.headers.set('location', `/api/users/${id}`)

    console.log('location')

    return r
}
