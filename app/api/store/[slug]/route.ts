import dbConnect from "@/lib/mongodb";
import { Application, Review } from "@/models";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  const pathname = new URL(request.url).pathname;
  const slug = pathname.split("/").pop();

  console.log('pathname', pathname)
  console.log('slug', slug)

  try {
    let application = await Application.findOne({ slug });

    const id = new ObjectId(application._id).toString();

    const reviews = await Review.find({ app_id: id });

    const stars = reviews.reduce((acc, review) => {
        return acc + review.star;
    }, 0);

    application = {
        ...application._doc,
        reviews: stars,
        reviews_count: reviews.length,
    };

    return NextResponse.json(application);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
