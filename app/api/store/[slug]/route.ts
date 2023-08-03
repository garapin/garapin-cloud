import dbConnect from "@/lib/mongodb";
import { Application, Review, User, InstalledApp } from "@/models";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  const pathname = new URL(request.url).pathname;
  const slug = pathname.split("/").pop();

  try {
    let application = await Application.findOne({ slug });

    const id = new ObjectId(application._id).toString();

    const reviews = await Review.find({ app_id: id });

    const stars = reviews.reduce((acc, review) => {
      return acc + review.star;
    }, 0);

    const user = await User.findOne({
      provider_uid: application.user_id
    });

    const installedApp = await InstalledApp.findOne({
      app_id: id,
      user_id: user.provider_uid
    });

    application = {
      ...application._doc,
      reviews: stars,
      reviews_count: reviews.length,
      user: user,
      installed: installedApp ? true : false
    };

    return NextResponse.json(application);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
