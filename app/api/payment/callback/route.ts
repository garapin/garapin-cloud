import dbConnect from "@/lib/mongodb";
import { Application, Billings, InstalledApp } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const body: any = await request.json();

    if (!body.user_id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const billing = await Billings.findOne({
      invoice_id: body.external_id,
    });

    if (billing) {
      billing.status = body.status === "PAID" ? "success" : "failed";
      billing.payment_method = body.payment_method;
      billing.payment_channel = body.payment_channel;
      await billing.save();

      const application = await Application.findById(billing.app_id);

      if (!application) {
        return new NextResponse("Application not found", { status: 404 });
      }

      const installedApp = await InstalledApp.findOne({
        app_id: billing.app_id,
        user_id: billing.user_id,
        install_app_name: billing.install_app_name,
      });

      if (installedApp) {
        if (new Date(installedApp.next_billing_date) < new Date()) {
          installedApp.next_billing_date = new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          );
          installedApp.app_status = "Active";
          await installedApp.save();
        } else if (new Date(installedApp.next_billing_date) > new Date()) {
          installedApp.next_billing_date = new Date(
            new Date(installedApp.next_billing_date).setMonth(
              new Date(installedApp.next_billing_date).getMonth() + 1
            )
          );
          installedApp.app_status = "Active";
          await installedApp.save();
        }
      }

      if (!installedApp) {
        const newInstalledApp = new InstalledApp({
          app_id: billing.app_id,
          user_id: billing.user_id,
          install_app_name: billing.install_app_name,
          next_billing_date: new Date(
            new Date().setMonth(new Date().getMonth() + 1)
          ),
          app_status: "Active",
        });

        // update installed count on application
        application.installed_count = application.installed_count + 1;
        await application.save();

        await newInstalledApp.save();
      }
    }

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.log("[BILLING_CALLBACK_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
