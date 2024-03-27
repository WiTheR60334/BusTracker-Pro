import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import BusDetails from "../../../models/BusDetails";

export async function POST() {
    try {
        await connectDB();

        const allBuses = await BusDetails.find({});
        
        return new NextResponse(JSON.stringify({ body: allBuses }), { status: 201 });

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}