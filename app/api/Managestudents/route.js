import connectDB from "../../../util/DB";
import Student from "../../../models/Student";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    await connectDB();

    const { _id, ...updatedBusDetails } = await request.json();

    const updatedBus = await Student.findByIdAndUpdate(_id, updatedBusDetails, {
      new: true, 
    });

    if (!updatedBus) {
      return new NextResponse(JSON.stringify({ error: "Bus not found" }), {
        status: 404,
      });
    }

    console.log("Updated bus:", updatedBus);
    return new NextResponse(JSON.stringify({ body: updatedBus }), { status: 200 });

  } catch (error) {

    console.error("Error updating bus details:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}