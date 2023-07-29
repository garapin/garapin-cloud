import dbConnect from "@/lib/mongodb";
import { Application } from "@/models";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect(); // Tunggu hingga koneksi selesai
  try {
    // get Application
    const applications = await Application.find({}).sort({ created_at: -1 });

    return NextResponse.json(applications);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();
  const {
    title,
    logo,
    version,
    category,
    description,
    price,
    source,
    support_detail,
    status,
    user_id,
    screenshoots,
    software_included,
    base_image
  }: any = body;
  try {
    // get Application
    const applications = await Application.create({
      title,
      logo,
      version,
      category,
      description,
      price,
      source,
      support_detail,
      status,
      user_id,
      screenshoots,
      software_included,
      base_image
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
