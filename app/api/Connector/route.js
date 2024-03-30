import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import Student from "../../../models/Student";

export async function POST(request) {
    const { email } = await request.json();
    try {
        await connectDB();

        const student = await Student.findOne({ email });

        if (!student) {
            return new NextResponse(JSON.stringify({ error: 'Student not found' }), { status: 404 });
        }
        
        return new NextResponse(JSON.stringify({ body: student }), { status: 201 });

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}