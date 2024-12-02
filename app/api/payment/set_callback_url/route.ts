import dbConnect from "@/lib/mongodb";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST() {
  await dbConnect();
  const authToken = Buffer.from(`${process.env.XENDIT_API_KEY!}:`).toString(
    "base64"
  );
  try {
    await axios.post(
      "https://api.xendit.co/callback_urls/invoice",
      {
        url: `${process.env.XENDIT_REDIRECT_URL}/api/payment/callback`, // prod
        // url: `https://aa95-103-82-15-21.ngrok.io/api/payment/callback`, // local
      },
      {
        headers: {
          Authorization: `Basic ${authToken}`,
          "for-user-id": process.env.XENDIT_FOR_USER_ID,
        },
      }
    );

    return NextResponse.json({
      message: "Success",
    });
  } catch (error) {
    console.log("[SET_CALLBACK_URL_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
