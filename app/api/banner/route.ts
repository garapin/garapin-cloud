import dbConnect from "@/lib/mongodb";
import { Banners } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();
  try {
    const dummies = [
      {
        banner_name: "Inventory Sistem",
        image:
          "https://firebasestorage.googleapis.com/v0/b/garapin-cloud.appspot.com/o/images%2FScreenshot%202023-08-12%20at%2013.42.55.png?alt=media&token=852550a5-47e4-4d0f-8a1a-01eb033f296b",
        url: "https://jubelio.com/produk/omnichannel/persediaan/",
      },
      {
        banner_name: "Warehouse Management Sistem",
        image:
          "https://firebasestorage.googleapis.com/v0/b/garapin-cloud.appspot.com/o/images%2FScreenshot%202023-08-12%20at%2013.48.34.png?alt=media&token=1a9ade42-f0c5-49c0-b245-b4313a6caeff",
        url: "https://jubelio.com/produk/omnichannel/gudang/",
      },
    ];

    const banners = await Banners.insertMany(dummies);

    return NextResponse.json({
      message: "Banners inserted successfully",
      data: {
        banners,
      },
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET(request: Request) {
  await dbConnect();
  try {
    const banners = await Banners.find({});

    return NextResponse.json({
      message: "Banners fetched successfully",
      data: banners,
    });
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
