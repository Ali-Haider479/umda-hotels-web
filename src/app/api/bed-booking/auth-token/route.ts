import crypto from "crypto";
import { encrypt } from "@/utils/crypto";

export async function POST(req: Request) {
  try {
    // Extract the hotel name or city from the request
    const { city } = await req.json();

    // Validate that hotelName or city is provided
    if (!city) {
      return new Response(
        JSON.stringify({
          message: "Bad Request",
          error: "Hotel name or city is required.",
        }),
        { status: 400 }
      );
    }

    // Determine the correct environment variables based on the hotel name or city
    let email, password;
    if (city === "Abbottabad") {
      email = process.env.HOTEL_MONTANA_EMAIL;
      password = process.env.HOTEL_MONTANA_PASSWORD;
    }
    // Add other hotel cases as needed

    if (!email || !password) {
      throw new Error("Invalid hotel name or city");
    }

    // Hash the password using SHA-1
    const hashedPassword = crypto
      .createHash("sha1")
      .update(password)
      .digest("hex");

    // Create the authorization header value
    const authValue = Buffer.from(`${email}:${hashedPassword}`).toString(
      "base64"
    );
    console.log("auth", authValue);

    // const controller = new AbortController();
    // const timeout = setTimeout(() => {
    //   controller.abort();
    // }, 10000);

    // Make the POST request to the BedBooking API
    const response = await fetch(
      "https://panel.bed-booking.com/api/v2/authorize",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${authValue}`,
        },
        body: new URLSearchParams({
          grant_type: "client_credentials",
        }).toString(),
      }
    );

    // clearTimeout(timeout);

    if (!response.ok) {
      const errorData = await response.json();
      console.log("Response error data:", errorData);
      throw new Error(`Error: ${errorData.message || response.statusText}`);
    }

    const data = await response.json();

    const encryptedToken = encrypt(data.access_token);
    console.log("Post req", encryptedToken);

    return new Response(JSON.stringify({ encryptedToken }), { status: 200 });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        message: "Internal Server Error",
        error: error.message || error,
      }),
      { status: 500 }
    );
  }
}
