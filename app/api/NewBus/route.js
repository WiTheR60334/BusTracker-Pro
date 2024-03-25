import connectDB from "../../../util/DB";
import BusDetails from "../../../models/BusDetails";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB(); 

    const newBusDetails = await request.json();

    const newBus = new BusDetails(newBusDetails);

    await newBus.save();

    return new NextResponse(JSON.stringify({ body: newBus }), { status: 201 });
  } catch (error) {
    console.error("Error adding new bus:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
