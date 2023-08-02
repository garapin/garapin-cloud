import dbConnect from "@/lib/mongodb";
import { Application } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();
  const { app_id, status, user_id }: any = body;

  try {
    const application = await Application.findById(app_id);

    if (!application) {
        return new NextResponse("Application not found", { status: 404 });
    }

    if(application.user_id !== user_id) {
        return new NextResponse("Unauthorized", { status: 401 });
    }

    application.status = status;

    await application.save();

    return NextResponse.json(application);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
