import connectDB from "../../../util/DB";
import Driver from "../../../models/Driver";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    await connectDB();

    const { _id, ...updatedBusDetails } = await request.json();
    // console.log("registration_no: ", updatedBusDetails.registration_no);

    const updatedBus = await Driver.findByIdAndUpdate(_id, updatedBusDetails, {
      new: true, 
    });

    console.log("Updated done : ",updatedBus)

    if (!updatedBus) {
      return new NextResponse(JSON.stringify({ error: "Driver not found" }), {
        status: 404,
      });
    }
    return new NextResponse(JSON.stringify({ body: updatedBus }), { status: 200 });

  } catch (error) {

    console.error("Error updating bus details:", error);
    return new NextResponse(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}