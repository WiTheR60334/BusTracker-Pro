import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import Driver from "../../../models/Driver";

export async function POST() {
    try {
        await connectDB();

        const allDrivers = await Driver.find({});
        
        return new NextResponse(JSON.stringify({ body: allDrivers }), { status: 201 });

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}