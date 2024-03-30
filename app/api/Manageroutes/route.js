import connectDB from "../../../util/DB";
import SetRoutes from "../../../models/SetRoutes";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    await connectDB();

    const { _id, ...updatedBusDetails } = await request.json();
    console.log("registration_no: ", updatedBusDetails.registration_no);

    const updatedBus = await SetRoutes.findByIdAndUpdate(_id, updatedBusDetails, {
      new: true, 
    });

    console.log("Updated done : ",updatedBus)

    if (!updatedBus) {
      return new NextResponse(JSON.stringify({ error: "Route not found" }), {
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