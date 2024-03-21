import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import Student from "../../../models/Student";
import BusDetails from "../../../models/BusDetails";

export const GET = async (request) => {
    try {
        await connectDB();
        const students = await Student.find();
        const busDetails = await BusDetails.find();

        // return new NextResponse("Posts fetched successfully", { status: 200 });
        return new NextResponse(JSON.stringify(students), { status: 200 });
        // return new NextResponse(JSON.stringify(busDetails), { status: 200 });
    } catch (error) {
        return new NextResponse("Error in fetching posts: " + error, { status: 500 });
    }
};