import { Schema, model, models, Document } from "mongoose";

export interface IRoom extends Document {
    roomName: string;
    bedCount: number;
    peopleCount: number;
    childCount: number;
    originalPrice: number;
    discountedPrice: number;
    discountPercentage: number;
    images: string[]; // Explicitly typed as string[]
    availableRooms: number;
    roomIds: string[];
    hotel: Schema.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
  }

const RoomSchema = new Schema(
  {
    roomName: {
      type: String,
      required: [true, "Room name is required!"],
    },
    bedCount: {
      type: Number,
      required: [true, "Bed count is required!"],
    },
    peopleCount: {
      type: Number,
      required: [true, "People count is required!"],
    },
    childCount: {
      type: Number,
      required: [true, "Child count is required!"],
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
      required: [true, "Discount percentage is required!"],
    },
    images: [
      {
        type: String,
        required: [true, "Room image is required!"],
      },
    ],
    availableRooms: {
      type: Number,
      required: [true, "Number of available rooms is required!"],
    },
    roomIds: [
      {
        type: String,
        required: [true, "Room ID is required!"],
      },
    ],
  },
  { timestamps: true }
);

const Room = models.Room || model("Room", RoomSchema);
console.log("Room model registered");

export default Room;