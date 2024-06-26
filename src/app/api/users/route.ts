import User from "@/models/user";
import { connectToDB } from "@/utils/database";

export async function GET(req: Request) {
  try {
    await connectToDB();

    const allUsers = await User.find();

    return new Response(JSON.stringify(allUsers), { status: 200 });
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
