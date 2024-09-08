import { decrypt } from "@/utils/crypto";

export async function POST(req: Request) {
  try {
    const { bearerToken } = await req.json();
    const decryptedbearerToken = decrypt(bearerToken);
    console.log(decrypt);

    return new Response(JSON.stringify({}), { status: 200 });
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
