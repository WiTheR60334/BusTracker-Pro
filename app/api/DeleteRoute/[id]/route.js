import connectDB from "../../../../util/DB";
import SetRoutes from "../../../../models/SetRoutes";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const urlParts = request.url.split('/');
    const id = urlParts[urlParts.length - 1];

  try {
    await connectDB();

    const deletedBus = await SetRoutes.findByIdAndDelete(id);

    if (!deletedBus) {
      return new NextResponse(
        JSON.stringify({ error: "Route not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Route deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Route:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
