import connectDB from "../../../util/DB";
import Student from "../../../models/Student";
import { NextResponse } from "next/server";

export async function PUT(request) {
  try {
    const { email, address, father_mobile, mother_mobile } = await request.json();
    console.log("Received PUT request for student email:", email);
    console.log("Received updated data:", { address, father_mobile, mother_mobile });

    // Construct the update object with only the provided fields
    const updateObject = {};
    if (address) updateObject.address = address;
    if (father_mobile) updateObject.father_mobile = father_mobile;
    if (mother_mobile) updateObject.mother_mobile = mother_mobile;

    // Perform the update operation
    await connectDB();
    const updatedStudent = await Student.findOneAndUpdate(
      { email }, // Query to find the student by email
      { $set: updateObject }, // Update fields
      { new: true } // Return the updated document
    );

    console.log("Updated student:", updatedStudent);

    if (!updatedStudent) {
      return new NextResponse("Student not found", { status: 404 });
    }
    return new NextResponse(JSON.stringify(updatedStudent), { status: 200 });

  } catch (err) {
      console.error(err);
      return new NextResponse("Error updating student details: ", { status: 500 });  }
}