import connectDB from "../../../../util/DB";
import BusDetails from "../../../../models/BusDetails";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const urlParts = request.url.split('/');
    const id = urlParts[urlParts.length - 1];

  try {
    await connectDB();

    const deletedBus = await BusDetails.findByIdAndDelete(id);

    if (!deletedBus) {
      return new NextResponse(
        JSON.stringify({ error: "Bus not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Bus deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting bus:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
