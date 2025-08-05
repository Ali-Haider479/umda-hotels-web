import Hotel from "@/models/hotel";
import { connectToDB } from "@/utils/database";

export async function GET(
  req: Request,
  { params }: { params: { city: string } }
) {
  try {
    await connectToDB();

    const hotel = await Hotel.find({city: params.city}).populate('rooms');
    console.log("Hotel", hotel);

    return new Response(JSON.stringify(hotel), { status: 200 });
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