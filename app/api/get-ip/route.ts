import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
    try {
        let clientIP =
            request.headers.get('x-forwarded-for') ||
            request.headers.get('x-real-ip') ||
            request.headers.get('cf-connecting-ip') ||
            'Unknown';

        // If x-forwarded-for contains multiple IPs, take the first one
        if (clientIP && clientIP.includes(',')) {
            clientIP = clientIP.split(',')[0].trim();
        }

        return NextResponse.json({ ip: clientIP });
    } catch (error) {
        return NextResponse.json({ ip: 'Unknown' }, { status: 500 });
    }
}
