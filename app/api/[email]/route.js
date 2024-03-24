import connectDB from "../../../util/DB";
import Student from "../../../models/Student";
import { NextResponse } from "next/server";

export async function PUT(request) {
  const { email, name, enrollment_no, address, father_mobile, mother_mobile  } = await request.json();
  console.log("Received POST request for student email:", email);
  console.log(name)
  try {
    await connectDB();
    const updatedStudent = await Student.findOneAndUpdate(
      { email }, // Query to find the student by email
      { $set: { name, enrollment_no, address, father_mobile, mother_mobile } }, // Update fields
      { new: true } // Return the updated document
    );
      console.log("got it");   
      console.log(Student.name)     
  
      if (!updatedStudent) {
        return new NextResponse("Student not found", { status: 404 });
      }
      return new NextResponse(JSON.stringify(updatedStudent), { status: 200 });

  } catch (err) {
      console.error(err);
      return new NextResponse("Error updating student details: ", { status: 500 });  }
}