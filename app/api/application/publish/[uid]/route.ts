import dbConnect from "@/lib/mongodb";
import { Application, Review } from "@/models";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();
  const pathname = new URL(request.url).pathname;
  const id = pathname.split("/").pop();

  try {
    let myApps = await Application.find({ user_id: id });

    for (let i = 0; i < myApps.length; i++) {
      const app = myApps[i];
      const id = new ObjectId(app._id).toString();
      const reviews = await Review.find({ app_id: id });

      const stars = reviews.reduce((acc, review) => {
        return acc + review.star;
      }, 0);

      myApps[i] = {
        ...app._doc,
        reviews: stars,
        reviews_count: reviews.length,
      };
    }

    return NextResponse.json(myApps);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
