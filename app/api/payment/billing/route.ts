import dbConnect from "@/lib/mongodb";
import { Billings, User } from "@/models";
import axios from "axios";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

export async function POST(request: Request) {
  await dbConnect();
  const authToken = Buffer.from(`${process.env.XENDIT_API_KEY!}:`).toString(
    "base64"
  );
  try {
    const body = await request.json();
    const { user_id, amount, app_name, app_category, app_id, app_slug }: any =
      body;

    if (!user_id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const user = await User.findOne({
      where: {
        provider_uid: user_id,
      },
    });

    const invoiceId = uuidv4();

    const { data, status } = await axios.post(
      "https://api.xendit.co/v2/invoices",
      {
        external_id: invoiceId,
        amount: amount,
        currency: "IDR",
        customer: {
          given_names: user?.name,
          surname: user?.name,
          email: user?.email,
        },
        customer_notification_preference: {
          invoice_paid: ["email"],
        },
        success_redirect_url: `${process.env.XENDIT_REDIRECT_URL}/store/${app_slug}?status=success`,
        failure_redirect_url: `${process.env.XENDIT_REDIRECT_URL}/store/${app_slug}?status=failed`,
        items: [
          {
            name: app_name,
            app_id: app_id,
            quantity: 1,
            price: amount,
            category: app_category,
          },
        ],
      },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
          "for-user-id": process.env.XENDIT_FOR_USER_ID,
        },
      }
    );

    if (status === 200) {
      const res = await Billings.create({
        invoice_id: invoiceId,
        user_id: user_id,
        app_id: app_id,
        amount: amount,
        status: "pending",
        invoice_url: data.invoice_url,
        currency: "IDR",
        quantity: 1,
      });

      return NextResponse.json({
        message: "Success",
        link: res.invoice_url,
      });
    }

    return NextResponse.json(
      {
        message: "Failed",
      },
      { status: 500 }
    );
  } catch (error) {
    console.log("[BILLING_PURCHASE_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
