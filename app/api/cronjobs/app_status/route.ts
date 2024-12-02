import dbConnect from "@/lib/mongodb";
import { InstalledApp } from "@/models";
import { NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  await dbConnect();

  const searchParams = new URLSearchParams(req?.url?.split("?")[1]);
  const user_id = searchParams.get("user_id");

  try {
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

    return NextResponse.json({
      message: "Update apps success",
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
