import dbConnect from "@/lib/mongodb";
import { Application, InstalledApp } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();
  const { app_id, user_id }: any = body;

  try {
    const application = await Application.findById(app_id);

    if (!application) {
        return new NextResponse("Application not found", { status: 404 });
    }

    const installedApp = await InstalledApp.findOne({ app_id, user_id });

    if(installedApp) {
        return new NextResponse("Application already installed", { status: 400 });
    }

    const newInstalledApp = new InstalledApp({
        app_id,
        user_id,
        next_billing_date: new Date(new Date().setDate(new Date().getDate() + 30)),
        app_status: "Active",
    });

    await newInstalledApp.save();

    return NextResponse.json(newInstalledApp);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
