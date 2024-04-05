import connectDB from "../../../util/DB";
import Driver from "../../../models/Driver";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB(); 

    const newDriverDetails = await request.json();

    const newDriver = new Driver(newDriverDetails);

    await newDriver.save();

    return new NextResponse(JSON.stringify({ body: newDriver }), { status: 201 });
  } catch (error) {
    console.error("Error adding new driver:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
