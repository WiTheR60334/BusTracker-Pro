import { NextResponse } from "next/server";
import connectDB from '../../../util/DB';
const Student = require('../../../models/Student'); 
import User from "../../../models/User";

export async function POST(request) {
  const { email,password, role } = await request.json();
  await connectDB();
  await User.create({ email,password, role });
  return NextResponse.json({ message: "User Registered" }, { status: 201 });
}