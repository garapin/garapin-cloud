import dbConnect from "@/lib/mongodb";
import { createSlug } from "@/lib/utils";
import { Application, Images } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();
  const {
    logo,
    title,
    category,
    description,
    price,
    source,
    support_detail,
    isPublished,
    base_image,
    user_id,
    screenshoots,
  }: any = body;

  try {
    const application = await Application.create({
      user_id,
      logo: {
        url: logo.url,
        name: logo.image_name,
      },
      title,
      slug: createSlug(title),
      category,
      description,
      price,
      source,
      support_detail,
      status: isPublished ? "Published" : "Unpublished",
      base_image,
      screenshoots: screenshoots.map((screenshoot: any) => ({
        url: screenshoot.url,
        name: screenshoot.image_name,
        isCover: screenshoot.isCover,
        bucket: screenshoot.bucket,
        size: screenshoot.size,
        full_path: screenshoot.full_path,
      })),
      installed_count: 0,
    });

    // create images array
    const images = Images.collection.insertMany([...screenshoots, logo]);

    return NextResponse.json(application);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PUT(request: Request) {
  await dbConnect();

  const body = await request.json();
  const {
    logo,
    title,
    category,
    description,
    price,
    source,
    support_detail,
    isPublished,
    base_image,
    user_id,
    screenshoots,
    id,
  }: any = body;

  try {
    const application = await Application.findByIdAndUpdate(id, {
      user_id,
      logo: {
        url: logo.url,
        name: logo.image_name,
      },
      title,
      slug: createSlug(title),
      category,
      description,
      price,
      source,
      support_detail,
      status: isPublished ? "Published" : "Unpublished",
      base_image,
      screenshoots: screenshoots.map((screenshoot: any) => ({
        url: screenshoot.url,
        name: screenshoot.image_name,
        isCover: screenshoot.isCover,
        bucket: screenshoot.bucket,
        size: screenshoot.size,
        full_path: screenshoot.full_path,
      })),
    });

    // create images array
    const images = Images.collection.insertMany([...screenshoots, logo]);

    return NextResponse.json(application);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function DELETE(request: Request) {
  await dbConnect();
  // get search params id
  const searchParams = new URLSearchParams(request?.url?.split("?")[1]);
  const app_id = searchParams.get("id");

  try {
    const application = await Application.findByIdAndDelete(app_id);

    return NextResponse.json({
      message: "Application deleted successfully",
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
