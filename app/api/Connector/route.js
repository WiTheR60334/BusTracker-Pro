import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import Student from "../../../models/Student"; 
import User from "../../../models/User";

export async function POST(request) {
    const { email } = await request.json();
    console.log("Received POST request for student email:", email);
    try {
        await connectDB();

        // Retrieve student document using the email
        const student = await Student.findOne({ email });
        console.log("Student:", student);

        if (!student) {
            return { status: 404, body: { error: 'Student not found' } };
        }
        return NextResponse.json({ message: "User Registered", body: student }, { status: 201 });
    // return NextResponse.json({ message: "User Registered" }, {body: student}, { status: 201 });

    } catch (err) {
        console.error(err);
        return { status: 500, body: { error: 'Internal Server Error' } };
    }
}