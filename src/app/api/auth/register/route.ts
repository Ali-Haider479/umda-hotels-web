import User from "@/models/user"; // Adjust the import based on your project structure
import { connectToDB } from "@/utils/database"; // Adjust the import based on your project structure
import { sendEmail } from "@/utils/mail.utils";
const bcrypt = require("bcrypt");

export async function POST(req: Request) {
  const { email, password, firstName, lastName } = await req.json();
  console.log("REQUEST Payload", email, password, firstName, lastName);

  if (!email || !password || !firstName || !lastName) {
    return new Response(
      JSON.stringify({ message: "Missing required fields" }),
      { status: 400 }
    );
  }

  try {
    await connectToDB();

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), {
        status: 400,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const randomFiveDigitCode = Math.floor(10000 + Math.random() * 90000);

    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      isAdmin: false,
      isVerified: false,
      verificationCode: randomFiveDigitCode,
    });

    await newUser.save();

    //Email Verification with 5 Digit code
    const sender = {
      name: "Umda Hotels",
      address: "no-reply@umdahotels.com",
    };

    const recipients = [
      {
        name: `${firstName} ${lastName}`,
        address: email,
      },
    ];

    try {
      const result = await sendEmail({
        sender,
        recipients,
        subject: "Verify Account",
        message: `Hello Sir, this is your verification code: ${randomFiveDigitCode}`,
      });
      return new Response(
        JSON.stringify({
          accepted: result.accepted,
          message:
            "User registered successfully And Verificaiton Email is Sent.",
        }),
        { status: 201 }
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

    return new Response(
      JSON.stringify({ message: "User registered successfully" }),
      { status: 201 }
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
