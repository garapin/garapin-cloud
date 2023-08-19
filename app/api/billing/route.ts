import dbConnect from "@/lib/mongodb";
import { Application, InstalledApp, Review } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  await dbConnect();

  const searchParams = new URLSearchParams(req?.url?.split("?")[1]);
  const user_id = searchParams.get("user_id");

  try {
    const dueDate = await InstalledApp.find({
      user_id,
      app_status: "Active",
      next_billing_date: {
        $gt: new Date(),
        $lt: new Date(new Date().setDate(new Date().getDate() + 7)),
      },
    });

    const dueDateApIds = dueDate.map((app) => app.app_id);
    const dueDateApps = await Application.find({ _id: { $in: dueDateApIds } });

    for (let i = 0; i < dueDateApps.length; i++) {
      const app = dueDateApps[i];
      const id = app._id.toString();
      const installedApp = dueDate.find((app) => app.app_id === id);
      dueDateApps[i] = {
        ...app._doc,
        next_billing_date: installedApp.next_billing_date,
        app_status: installedApp.app_status,
      };
    }

    const inActive = await InstalledApp.find({
      user_id,
      app_status: "Inactive",
    });

    const inActiveApIds = inActive.map((app) => app.app_id);
    const inActiveApps = await Application.find({
      _id: { $in: inActiveApIds },
    });

    for (let i = 0; i < inActiveApps.length; i++) {
      const app = inActiveApps[i];
      const id = app._id.toString();
      const installedApp = inActive.find((app) => app.app_id === id);
      inActiveApps[i] = {
        ...app._doc,
        next_billing_date: installedApp.next_billing_date,
        app_status: installedApp.app_status,
      };
    }

    const deleted = await InstalledApp.find({
      user_id,
      app_status: "Deleted",
    });

    const deletedApIds = deleted.map((app) => app.app_id);
    const deletedApps = await Application.find({ _id: { $in: deletedApIds } });

    for (let i = 0; i < deletedApps.length; i++) {
      const app = deletedApps[i];
      const id = app._id.toString();
      const installedApp = deleted.find((app) => app.app_id === id);
      deletedApps[i] = {
        ...app._doc,
        next_billing_date: installedApp.next_billing_date,
        app_status: installedApp.app_status,
        deleted_at: installedApp.deleted_at,
      };
    }

    return NextResponse.json({
      dueDate: dueDateApps,
      inActive: inActiveApps,
      deleted: deletedApps,
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
