import Booking from "@/models/bookings";
import { connectToDB } from "@/utils/database";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const booking = await Booking.findById(params.id);
    console.log("BOOKING", booking);

    return new Response(JSON.stringify(booking), { status: 200 });
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
