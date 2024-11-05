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

// PATCH request to update booking details
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();

    const data = await req.json();
    const booking = await Booking.findById(params.id);

    if (!booking) {
      return new Response(JSON.stringify({ message: "Booking not found" }), {
        status: 404,
      });
    }

    // Update only the allowed fields
    booking.bookingStatus = data.bookingStatus || booking.bookingStatus;
    booking.paymentStatus = data.paymentStatus || booking.paymentStatus;

    await booking.save();

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
