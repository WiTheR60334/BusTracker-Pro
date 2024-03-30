import connectDB from "../../../util/DB";
import Student from "../../../models/Student";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { email, address, father_mobile, mother_mobile } = await request.json();

    const updateObject = {};
    if (address) updateObject.address = address;
    if (father_mobile) updateObject.father_mobile = father_mobile;
    if (mother_mobile) updateObject.mother_mobile = mother_mobile;

    await connectDB();
    const updatedStudent = await Student.findOneAndUpdate(
      { email }, 
      { $set: updateObject }, 
      { new: true } 
    );

    if (!updatedStudent) {
      return new NextResponse("Student not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(updatedStudent), { status: 200 });

  } catch (err) {
      console.error(err);
      return new NextResponse("Error updating student details: ", { status: 500 });  }
}