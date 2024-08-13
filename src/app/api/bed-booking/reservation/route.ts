import { decrypt } from "@/utils/crypto";

export async function POST(req: Request) {
  try {
    // Extract the hotel name or city from the request
    const { bearerToken, calendarId, checkInDate, checkOutDate } =
      await req.json();
    const decryptedbearerToken = decrypt(bearerToken);
    console.log(decrypt);

    // Fetch data from the API
    const response = await fetch(
      `https://api.bed-booking.com/api/v2/reservation/list/id_calendar/${calendarId}/page_size/1000/page/0/include_deleted/0/date_from/${checkInDate}/date_to/${checkOutDate}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${decryptedbearerToken}`,
        },
      }
    );

    // Parse the response body
    const data = await response.json();

    // Check if the response was not ok and handle the error
    if (!response.ok) {
      throw new Error(`Error: ${data.message || response.statusText}`);
    }

    console.log("data", data);

    // Ensure data.items exists before trying to access it
    // const items = data.items || [];

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error: any) {
    console.error("Error fetching calendar data:", error); // Log the error for debugging
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message || error.toString(),
      }),
      { status: 500 }
    );
  }
}
