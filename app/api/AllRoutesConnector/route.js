import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import SetRoutes from "../../../models/SetRoutes";

export async function POST() {
    try {
        await connectDB();

        const allRoutes = await SetRoutes.find({});
        
        return new NextResponse(JSON.stringify({ body: allRoutes }), { status: 201 });

    } catch (err) {
        console.error(err);
        return new NextResponse(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
    }
}