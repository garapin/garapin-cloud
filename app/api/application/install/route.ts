import dbConnect from "@/lib/mongodb";
import { Application, InstalledApp, Review } from "@/models";
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

    if (installedApp) {
      await InstalledApp.deleteOne({ app_id, user_id });
    }

    const newInstalledApp = new InstalledApp({
      app_id,
      user_id,
      next_billing_date: new Date(
        new Date().setDate(new Date().getDate() + 30)
      ),
      app_status: "Active",
    });

    await newInstalledApp.save();

    return NextResponse.json(newInstalledApp);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(req: Request, res: Response) {
  await dbConnect();

  const searchParams = new URLSearchParams(req?.url?.split("?")[1]);
  const user_id = searchParams.get("user_id");

  try {
    const installedApps = await InstalledApp.find({
      user_id,
      app_status: "Active",
      next_billing_date: { $gt: new Date() },
    });

    // get application details
    const appIds = installedApps.map((app) => app.app_id);
    const applications = await Application.find({ _id: { $in: appIds } });

    for (let i = 0; i < applications.length; i++) {
      const app = applications[i];
      const id = app._id.toString();
      const installedApp = installedApps.find((app) => app.app_id === id);
      // const reviews = await Review.find({ app_id: id });

      // const stars = reviews.reduce((acc, review) => {
      //   const sum = acc + review.star;
      //   return sum / reviews.length;
      // }, 0);

      applications[i] = {
        ...app._doc,
        next_billing_date: installedApp.next_billing_date,
        app_status: installedApp.app_status,
        // reviews: stars,
        // reviews_count: reviews.length,
      };
    }

    const inactiveApps = await InstalledApp.find({
      user_id,
      next_billing_date: { $lt: new Date() },
    });

    for (let i = 0; i < inactiveApps.length; i++) {
      const app = inactiveApps[i];
      const currentDate = new Date();
      const nextBillingDate = new Date(app.next_billing_date);
      const timeUntilBilling =
        nextBillingDate.getTime() - currentDate.getTime();
      const daysUntilBilling = timeUntilBilling / (1000 * 3600 * 24);

      if (daysUntilBilling < 0 && daysUntilBilling > -30) {
        app.app_status = "Inactive"; // Status: Inactive
      } else if (daysUntilBilling < -30) {
        app.app_status = "Deleted"; // Status: Deleted
      }

      await app.save(); // Simpan perubahan status
    }

    return NextResponse.json(applications);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// delete installed Apps
export async function DELETE(req: Request, res: Response) {
  await dbConnect();

  const searchParams = new URLSearchParams(req?.url?.split("?")[1]);
  const user_id = searchParams.get("user_id");
  const app_id = searchParams.get("app_id");

  try {
    await InstalledApp.deleteOne({ app_id, user_id });

    return NextResponse.json({ message: "success" });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
