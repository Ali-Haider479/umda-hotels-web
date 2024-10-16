import { Schema, model, models } from "mongoose";
import crypto from "crypto"; // For generating random strings

const BookingSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
      required: true,
    },
    fullName: {
      type: String,
      required: [true, "Full Name is required!"],
    },
    telephone: {
      type: String,
      required: [true, "Telephone number is required!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
    },
    rooms: [
      {
        roomName: {
          type: String,
          required: [true, "Room name is required!"],
        },
        originalPrice: {
          type: Number,
          required: [true, "Original price is required!"],
        },
        discountedPrice: {
          type: Number,
          required: [true, "Discounted price is required!"],
        },
        discountPercentage: {
          type: Number,
          required: false,
        },
        roomsBooked: {
          type: Number,
          required: [true, "Number of rooms booked is required!"],
        },
        guests: {
          type: Number,
          required: [true, "Number of guests is required!"],
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: [true, "Total price is required!"],
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    checkInDate: {
      type: Date,
      required: [true, "Check-in date is required!"],
    },
    checkOutDate: {
      type: Date,
      required: [true, "Check-out date is required!"],
    },
    bookingStatus: {
      type: String,
      enum: ["pending", "confirmed", "cancelled"],
      default: "pending",
    },
    paymentType: {
      type: String,
      enum: ["onSite", "online"], // Changed to "onSite" or "online"
      required: [true, "Payment type is required!"],
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    referenceNo: {
      type: String,
      unique: true, // Ensure it's unique
      required: true,
    },
  },
  { timestamps: true }
);

// Generate a unique reference number before saving the booking
BookingSchema.pre("save", function (next) {
  if (!this.referenceNo) {
    // Generate a random string of 8 characters (you can change this to any format you prefer)
    this.referenceNo = `UMDA-${crypto
      .randomBytes(4)
      .toString("hex")
      .toUpperCase()}`;
  }
  next();
});

const Booking = models.Booking || model("Booking", BookingSchema);

export default Booking;
