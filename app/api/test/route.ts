import connectDB from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();
    return NextResponse.json({
      status: "ok",
      message: "DB connected!",
    });
  } catch (error) {
    console.error("MongoDB connection error:", error);

    return NextResponse.json(
      {
        status: "error",
        message: "Failed to connect to MongoDB",
      },
      { status: 500 },
    );
  }
}

// export async function GET() {
//   await connectDB();
//   const org = await organizationModel.create({ name: "Test Org" });
//   return NextResponse.json(org);
// }

// export async function GET() {
//   await connectDB();

//   const org = await organizationModel.create({
//     name: "Test Org",
//   });

//   const user = await userModel.create({
//     name: "Test User",
//     email: "testuser@example.com",
//     passwordHash: "hashed_password_here",
//     orgId: org._id,
//   });

//   return NextResponse.json(user);
// }
