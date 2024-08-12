import fetch from "node-fetch";
import { createHash } from "crypto";

// Use Node.js built-in Buffer for Base64 encoding
export const getAuthToken = async () => {
  try {
    const username = process.env.API_USERNAME;
    const password = process.env.API_PASSWORD;

    if (!username || !password) {
      throw new Error("API credentials are not set in environment variables");
    }

    // Generate SHA1 hash of the password
    const sha1Password = createHash("sha1").update(password).digest("hex");

    // Concatenate username and SHA1 hashed password with a colon
    const credentials = `${username}:${sha1Password}`;

    // Encode the credentials in Base64
    const encodedCredentials = Buffer.from(credentials).toString("base64");

    // Define the API endpoint and headers
    const url = "https://panel.bed-booking.com/api/v2/authorize";
    const headers = {
      Authorization: `Basic ${encodedCredentials}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    // Define the body of the request
    const body = new URLSearchParams();
    body.append("grant_type", "client_credentials");

    // Make the POST request
    const response = await fetch(url, {
      method: "POST",
      headers: headers,
      body: body.toString(),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log("RESPONSE TOKEN", responseData);
    return responseData.access_token;
  } catch (error) {
    console.error("Error fetching auth token:", error.message);
    throw error;
  }
};
