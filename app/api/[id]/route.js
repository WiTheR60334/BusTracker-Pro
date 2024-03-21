import connectDB from "../../../util/DB";
import Student from "../../../models/Student";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const { name, enrollment_no, address, father_mobile, mother_mobile } = request.body;

    await connectDB();

    const updatedStudent = await Student.findByIdAndUpdate(id, {
      name,
      enrollment_no,
      address,
      father_mobile,
      mother_mobile
    }, { new: true });

    if (!updatedStudent) {
      return new NextResponse("Student not found", { status: 404 });
    }

    return new NextResponse(JSON.stringify(updatedStudent), { status: 200 });
  } catch (error) {
    return new NextResponse("Error updating student details: " + error, { status: 500 });
  }
}