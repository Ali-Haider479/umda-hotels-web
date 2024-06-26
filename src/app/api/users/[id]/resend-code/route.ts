import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { sendEmail } from "@/utils/mail.utils";

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const randomFiveDigitCode = Math.floor(10000 + Math.random() * 90000);

    const updatedUser = await User.findByIdAndUpdate(
      params.id,
      { verificationCode: randomFiveDigitCode },
      { new: true }
    );

    //Email Verification with 5 Digit code
    const sender = {
      name: "Umda Hotels",
      address: "no-reply@umdahotels.com",
    };

    const recipients = [
      {
        name: `${updatedUser.firstName} ${updatedUser.lastName}`,
        address: updatedUser.email,
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

    return new Response(JSON.stringify(updatedUser), { status: 200 });
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
