import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import Student from "../../../models/Student";

export async function POST() {
    try {
        await connectDB();

        const allBuses = await Student.find({});
        
        return new NextResponse(JSON.stringify({ body: allBuses }), { status: 201 });

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}