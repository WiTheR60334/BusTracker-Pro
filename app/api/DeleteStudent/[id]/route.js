import connectDB from "../../../../util/DB";
import Student from "../../../../models/Student";
import { NextResponse } from "next/server";

export async function DELETE(request) {
    const urlParts = request.url.split('/');
    const id = urlParts[urlParts.length - 1];

  try {
    await connectDB();

    const deletedBus = await Student.findByIdAndDelete(id);

    if (!deletedBus) {
      return new NextResponse(
        JSON.stringify({ error: "Student not found" }),
        { status: 404 }
      );
    }

    return new NextResponse(
      JSON.stringify({ message: "Student deleted successfully" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting Student:", error);
    return new NextResponse(
      JSON.stringify({ error: "Internal Server Error" }),
      { status: 500 }
    );
  }
}
