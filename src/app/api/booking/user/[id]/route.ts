import Booking from "@/models/bookings";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { sendEmail } from "@/utils/mail.utils";
import crypto from "crypto";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const userId = params.id;

    // Check if userId exists in the URL
    if (!userId) {
      return new Response(JSON.stringify({ message: "User ID is required" }), {
        status: 400,
      });
    }

    // Fetch the user's bookings from the database
    const userBookings = await Booking.find({ user: userId }).populate("user");

    // If no bookings found, return an empty array
    if (!userBookings || userBookings.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }

    // Return the user's bookings as a response
    return new Response(JSON.stringify(userBookings), { status: 200 });
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
