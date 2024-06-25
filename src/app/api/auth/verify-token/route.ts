import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import crypto from "crypto";

export async function POST(req: Request) {
  const { token } = await req.json();
  console.log("REQUEST Payload", token);

  try {
    await connectToDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid token or token has expired" }),
        { status: 400 }
      );
    }

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error: any) {
    console.error("Internal Server Error", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
