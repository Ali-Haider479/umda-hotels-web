import { Schema, model, models } from "mongoose";
import Room from "./room";

const HotelSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Hotel name is required!"],
    },
    address: {
      type: String,
      required: [true, "Hotel address is required!"],
    },
    city: {
      type: String,
      required: [true, "City is required!"],
    },
    headings: [
      {
        title: {
          type: String,
          required: [true, "Heading title is required!"],
        },
        description: {
          type: String,
          required: [true, "Heading description is required!"],
        },
      },
    ],
    rating: {
      type: Number,
      required: [true, "Rating is required!"],
    },
    reviews: {
      type: Number,
      required: [true, "Number of reviews is required!"],
    },
    amenities: [
      {
        name: {
          type: String,
          required: [true, "Amenity name is required!"],
        },
        icon: {
          type: String,
          required: [true, "Amenity icon is required!"],
        },
      },
    ],
    mainImage: {
      type: String,
      required: [true, "Main image is required!"],
    },
    carouselImages: [
      {
        type: String,
        required: [true, "Carousel image is required!"],
      },
    ],
    rooms: [
      {
        type: Schema.Types.ObjectId,
        ref: "Room",
      },
    ],
  },
  { timestamps: true }
);

const Hotel = models.Hotel || model("Hotel", HotelSchema);

export default Hotel;