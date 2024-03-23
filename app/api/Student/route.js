import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
import User from "../../../models/User";

// export const GET = async (request) => {
//     try {
//         await connectDB();
//         const students = await Student.find();
//         const busDetails = await BusDetails.find();

//         // return new NextResponse("Posts fetched successfully", { status: 200 });
//         return new NextResponse(JSON.stringify(students), { status: 200 });
//         // return new NextResponse(JSON.stringify(busDetails), { status: 200 });
//     } catch (error) {
//         return new NextResponse("Error in fetching posts: " + error, { status: 500 });
//     }
// };
export async function POST(request) {
  const { email, password } = await request.json();
  await connectDB();
  await User.create({ email, password });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}