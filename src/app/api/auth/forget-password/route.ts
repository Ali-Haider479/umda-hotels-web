import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { sendEmail } from "@/utils/mail.utils";
import crypto from "crypto";
const bcrypt = require("bcrypt");

export async function POST(req: Request) {
  const { email } = await req.json();
  console.log("REQUEST Payload", email);

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return new Response(JSON.stringify({ message: "Email does not exist" }), {
        status: 400,
      });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const passwordResetToken = crypto
      .createHash("sha256")
      .update(resetToken)
      .digest("hex");

    const passwordResetExpires = Date.now() + 3600000; // 1 hour

    existingUser.resetToken = passwordResetToken;
    existingUser.resetTokenExpiry = passwordResetExpires;

    const resetUrl = `${process.env.BASE_URL}/reset-password/${resetToken}`;

    console.log(resetUrl);

    const sender = {
      name: "Umda Hotels",
      address: "no-reply@umdahotels.com",
    };

    const recipients = [
      {
        name: "",
        address: email,
      },
    ];

    try {
      const result = await sendEmail({
        sender,
        recipients,
        subject: "Reset Password",
        message: `Hello, reset your password by clicking on the following URL: ${resetUrl}`,
      });

      await existingUser.save();
      return new Response(
        JSON.stringify({
          accepted: result.accepted,
          message: "Reset password link has been sent to your email.",
        }),
        { status: 201 }
      );
    } catch (error: any) {
      existingUser.resetToken = undefined;
      existingUser.resetTokenExpiry = undefined;
      await existingUser.save();

      return new Response(
        JSON.stringify({
          message: "Failed to send email. Please try again later.",
          error: error.message,
        }),
        { status: 500 }
      );
    }
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
