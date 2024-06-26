import { sendEmail } from "@/utils/mail.utils";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    const sender = {
      name: "Umda Hotels",
      address: "no-reply@umdahotels.com",
    };

    const recipients = [
      {
        name: "",
        address: "alihaider15915a@gmail.com",
      },
    ];

    const result = await sendEmail({
      sender,
      recipients,
      subject: `Message from ${name}: ${email}`,
      message: message,
    });

    return new Response(
      JSON.stringify({
        accepted: result.accepted,
        message: "Your form has been submitted successfully.",
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
}
