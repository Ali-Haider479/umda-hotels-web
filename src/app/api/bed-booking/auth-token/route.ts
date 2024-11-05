import crypto from "crypto";
import { encrypt } from "@/utils/crypto";

export async function POST(req: Request) {
  try {
    // Extract the hotel name or city from the request
    const { city } = (await req.json()) as { city: string };

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

    // Map city names to corresponding environment variables
    const cityConfig: Record<
      string,
      { email: string | undefined; password: string | undefined }
    > = {
      Abbottabad: {
        email: process.env.HOTEL_MONTANA_EMAIL,
        password: process.env.HOTEL_MONTANA_PASSWORD,
      },
      Islamabad: {
        email: process.env.HOTEL_SAFARI_EMAIL,
        password: process.env.HOTEL_SAFARI_PASSWORD,
      },
      "Nathia Gali": {
        email: process.env.HOTEL_GALAXY_EMAIL,
        password: process.env.HOTEL_GALAXY_PASSWORD,
      },
      // Add other city configurations as needed
    };

    // Get email and password based on the city
    const config = cityConfig["Abbottabad"];

    // Validate if the city configuration exists
    if (!config || !config.email || !config.password) {
      throw new Error("Invalid hotel name or city");
    }

    const { email, password } = config;

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
