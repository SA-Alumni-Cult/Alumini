// app/api/upload-from-file/route.ts
import { NextResponse } from 'next/server';
import dbConnect from '@/lib/DbConnect';
import Alumni from '@/models/Login';

export async function POST(req: Request) {
    try {
        await dbConnect();

        const body = await req.json();
        const data = body.data;

        if (!Array.isArray(data)) {
            return NextResponse.json({ error: 'Invalid data format' }, { status: 400 });
        }

        console.log('✅ Incoming data from frontend:', data);

        const inserted = await Alumni.insertMany(data);

        return NextResponse.json({
            message: 'Data inserted successfully',
            insertedCount: inserted.length,
        });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
