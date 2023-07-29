import dbConnect from "@/lib/mongodb";
import { User } from "@/models";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  await dbConnect();

  const body = await request.json();
  const { name, email, provider, provider_uid, publisher_name = '' }: any = body;
  try {
    const userExist = await User.findOne({ provider, provider_uid });

    if (userExist) {
        return NextResponse.json({ message: 'User already exist' });
    }

    const user = await User.create({
      name,
      email,
      provider,
      provider_uid,
      publisher_name,
    });

    return NextResponse.json(user);
  } catch (error) {
    console.log("error", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
