import Booking from "@/models/bookings";
import User from "@/models/user";
import { connectToDB } from "@/utils/database";
import { sendEmail } from "@/utils/mail.utils";
import crypto from "crypto";
const bcrypt = require("bcrypt");

export async function GET(req: Request) {
  try {
    await connectToDB();

    const allBookings = await Booking.find();

    return new Response(JSON.stringify(allBookings), { status: 200 });
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

export async function POST(req: Request) {
  try {
    await connectToDB();

    // Parse the request body
    const {
      userId,
      firstName,
      lastName,
      telephone,
      email,
      selectedRooms,
      startDate,
      endDate,
      totalPrice,
      paymentType,
      paymentStatus = "pending", // Default to pending if not provided
    } = await req.json();

    let user;

    // If userId is not provided, check by email
    if (!userId) {
      user = await User.findOne({ email });

      // If user does not exist, create a new user
      if (!user) {
        // Generate a random 5-character alphanumeric password
        const generatedPassword = crypto.randomBytes(3).toString("hex");

        const hashedGeneratedPassword = await bcrypt.hash(
          generatedPassword,
          10
        );

        const randomFiveDigitCode = Math.floor(10000 + Math.random() * 90000);
        // Create new user
        user = new User({
          firstName,
          lastName,
          email,
          telephone,
          password: hashedGeneratedPassword, // Store the password securely
          isAdmin: false,
          isVerified: false,
          verificationCode: randomFiveDigitCode,
        });

        // Save the new user to the database
        await user.save();

        const sender = {
          name: "Umda Hotels",
          address: "no-reply@umdahotels.com",
        };

        const recipients = [
          {
            name: `${firstName} ${lastName}`,
            address: email,
          },
        ];

        // Send email to the user with their new account details
        await sendEmail({
          sender,
          recipients,
          subject: "Your New Account Has Been Created",
          message: `Hello ${firstName}, your account has been created. Your password is: ${generatedPassword}`,
        });

        await sendEmail({
          sender,
          recipients,
          subject: "Verify Account",
          message: `Hello Sir, this is your verification code: ${randomFiveDigitCode}`,
        });
      }
    } else {
      // If userId is provided, find the user by userId
      user = await User.findById(userId);
      if (!user) {
        return new Response(JSON.stringify({ message: "User not found" }), {
          status: 404,
        });
      }
    }

    // Check if required fields are provided
    if (
      !firstName ||
      !lastName ||
      !telephone ||
      !email ||
      !selectedRooms ||
      !startDate ||
      !endDate ||
      !totalPrice ||
      !paymentType
    ) {
      return new Response(
        JSON.stringify({ message: "All fields are required" }),
        { status: 400 }
      );
    }

    // Check if at least one room is selected
    const selectedRoomList = selectedRooms.filter(
      (room: any) => room.checked === true
    );

    if (selectedRoomList.length === 0) {
      return new Response(
        JSON.stringify({ message: "At least one room must be selected" }),
        { status: 400 }
      );
    }

    // Generate a reference number manually
    const referenceNo = `UMDA-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;

    // Prepare the data to be saved
    const newBooking = new Booking({
      user: user._id, // Use the userId from either lookup or newly created user
      fullName: `${firstName} ${lastName}`,
      telephone,
      email,
      rooms: selectedRoomList.map((room: any) => ({
        roomName: room.roomName,
        originalPrice: room.originalPrice,
        discountedPrice: room.discountedPrice,
        discountPercentage: room.discountPercentage,
        roomsBooked: room.rooms, // Change from `rooms` to `roomsBooked`
        guests: room.guests,
      })),
      totalPrice,
      bookingDate: new Date(), // Automatically set the booking date
      checkInDate: new Date(startDate),
      checkOutDate: new Date(endDate),
      bookingStatus: "pending", // Default to "pending"
      paymentType,
      paymentStatus,
      referenceNo,
    });

    // Save the booking to the database
    await newBooking.save();

    // Send email to the user confirming their booking
    const sender = {
      name: "Umda Hotels",
      address: "no-reply@umdahotels.com",
    };

    const recipients = [
      {
        name: `${firstName} ${lastName}`,
        address: email,
      },
    ];

    const message = `
      Dear ${firstName} ${lastName},

      Thank you for your booking at Umda Hotels! Here are your booking details:
      
      - Check-in Date: ${new Date(startDate).toLocaleDateString()}
      - Check-out Date: ${new Date(endDate).toLocaleDateString()}
      - Total Price: Rs. ${totalPrice}
      - Booking Reference No: ${referenceNo}

      We look forward to welcoming you!

      Best regards,
      Umda Hotels
    `;

    await sendEmail({
      sender,
      recipients,
      subject: "Booking Confirmation",
      message,
    });

    // Return the created booking as a response
    return new Response(JSON.stringify(newBooking), { status: 201 });
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
