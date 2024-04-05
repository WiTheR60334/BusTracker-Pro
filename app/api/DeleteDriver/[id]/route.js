import connectDB from "../../../../util/DB";
import Driver from "../../../../models/Driver";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const urlParts = request.url.split('/');
    const id = urlParts[urlParts.length - 1];

  try {
    await connectDB();

    const deletedDriver = await Driver.findByIdAndDelete(id);

    if (!deletedDriver) {
      return new NextResponse(
        JSON.stringify({ error: "Driver not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Driver deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Driver:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
