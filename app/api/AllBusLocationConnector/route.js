import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import BusLocation from "../../../models/BusLocation";

export async function POST() {
    try {
        await connectDB();

        const busLocation = await BusLocation.find({});
        
        return new NextResponse(JSON.stringify({ body: busLocation }), { status: 201 });

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}