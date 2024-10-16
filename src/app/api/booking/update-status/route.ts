import Booking from "@/models/bookings";
import { connectToDB } from "@/utils/database";

export async function PATCH(req: Request) {
  try {
    await connectToDB();

    // Parse the request body to get the booking ID and new status
    const { bookingId, bookingStatus } = await req.json();

    // Validate the input: Ensure bookingId and bookingStatus are provided
    if (!bookingId || !bookingStatus) {
      return new Response(
        JSON.stringify({
          message: "Booking ID and Booking Status are required",
        }),
        { status: 400 }
      );
    }

    // Find the booking by ID and update the bookingStatus
    const updatedBooking = await Booking.findByIdAndUpdate(
      bookingId,
      { bookingStatus },
      { new: true } // Return the updated document
    );

    // If booking is not found
    if (!updatedBooking) {
      return new Response(JSON.stringify({ message: "Booking not found" }), {
        status: 404,
      });
    }

    // Return the updated booking
    return new Response(JSON.stringify(updatedBooking), { status: 200 });
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
