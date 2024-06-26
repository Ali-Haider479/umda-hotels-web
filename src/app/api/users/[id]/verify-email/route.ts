import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const { verificationCode } = await req.json();

    if (!verificationCode) {
      return new Response(
        JSON.stringify({ message: "Verification code is required" }),
        { status: 400 }
      );
    }

    const user = await User.findById(params.id);

    if (!user) {
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 404,
      });
    }

    if (Number(verificationCode) !== user.verificationCode) {
      return new Response(JSON.stringify({ message: "Code is incorrect" }), {
        status: 401,
      });
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    return new Response(
      JSON.stringify({ message: "Email Verified successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
