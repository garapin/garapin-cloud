import dbConnect from "@/lib/mongodb";
import { Application, InstalledApp, Review } from "@/models";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  await dbConnect();

  // get params
  const params: any = new URL(request.url).searchParams;
  const query = params.get("q");
  const user_id = params.get("user_id");

  try {
    let myApps = await Application.find({
      status: "Published",
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { support_detail: { $regex: query, $options: "i" } }
      ],
    });

    for (let i = 0; i < myApps.length; i++) {
      const app = myApps[i];
      const id = new ObjectId(app._id).toString();
      const reviews = await Review.find({ app_id: id });

      const stars = reviews.reduce((acc, review) => {
        const sum = acc + review.star;
        return sum / reviews.length;
      }, 0);

      const installedApp = await InstalledApp.findOne({
        app_id: id,
        user_id: user_id,
      });

      myApps[i] = {
        ...app._doc,
        reviews: stars,
        reviews_count: reviews.length,
        installed: installedApp ? true : false,
      };
    }

    return NextResponse.json(myApps);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
