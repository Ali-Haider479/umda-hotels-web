import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import crypto from "crypto";
const bcrypt = require("bcrypt");

export async function POST(req: Request) {
  const { token, userId, newPassword } = await req.json();
  console.log("REQUEST Payload", token, userId, newPassword);

  if (!token || !userId || !newPassword) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await User.findOne({
      _id: userId,
      resetToken: hashedToken,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid or expired token" }),
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    // Use delete operator to remove keys
    delete user.resetToken;
    delete user.resetTokenExpiry;

    await user.save();

    return new Response(
      JSON.stringify({ message: "Password has been reset successfully" }),
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error resetting password:", error);
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
