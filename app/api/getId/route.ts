import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/DbConnect'
import Alumni from '@/models/Login'

export async function GET(request: NextRequest) {
    try {
        await dbConnect()
        
        // Fetch alumni data from MongoDB
        const alumniData = await Alumni.find({}, { _id: 1, name: 1 }).lean()

        
        // Transform the data to match your expected format
        const alumniIds = alumniData.map(alumni => ({
            id: (alumni._id as any).toString(),
            name: alumni.name
        }))
        console.log('Alumni IDs fetched:', alumniIds)
        
        return NextResponse.json(alumniIds)
    } catch (error) {
        console.error('Failed to fetch alumni IDs:', error)
        return NextResponse.json(
            { error: 'Failed to fetch alumni IDs' },
            { status: 500 }
        )
    }
}