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
      })),
    });
    

    // create images array 
    const images = Images.collection.insertMany([...screenshoots, logo])

    return NextResponse.json(application);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
