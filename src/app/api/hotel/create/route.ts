import { connectToDB } from "@/utils/database";
import Hotel from "@/models/hotel";
import Room from "@/models/room";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    await connectToDB();

    // Parse the incoming JSON payload
    const hotelData = await req.json();

    // Validate required fields
    const requiredFields = [
      "name",
      "address",
      "city",
      "headings",
      "rating",
      "reviews",
      "mainImage",
      "carouselImages",
      "amenities",
      "rooms",
    ];
    for (const field of requiredFields) {
      if (!hotelData[field]) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate headings
    if (!Array.isArray(hotelData.headings) || hotelData.headings.length === 0) {
      return NextResponse.json(
        { error: "At least one heading is required" },
        { status: 400 }
      );
    }
    for (const heading of hotelData.headings) {
      if (!heading.title || !heading.description) {
        return NextResponse.json(
          { error: "Each heading must have a title and description" },
          { status: 400 }
        );
      }
    }

    // Validate amenities
    if (!Array.isArray(hotelData.amenities) || hotelData.amenities.length === 0) {
      return NextResponse.json(
        { error: "At least one amenity is required" },
        { status: 400 }
      );
    }
    for (const amenity of hotelData.amenities) {
      if (!amenity.name || !amenity.icon) {
        return NextResponse.json(
          { error: "Each amenity must have a name and icon" },
          { status: 400 }
        );
      }
    }

    // Validate rooms
    if (!Array.isArray(hotelData.rooms) || hotelData.rooms.length === 0) {
      return NextResponse.json(
        { error: "At least one room is required" },
        { status: 400 }
      );
    }
    for (const room of hotelData.rooms) {
      const requiredRoomFields = [
        "roomName",
        "bedCount",
        "peopleCount",
        "childCount",
        "originalPrice",
        "discountedPrice",
        "discountPercentage",
        "images",
        "availableRooms",
        "roomIds",
      ];
      for (const field of requiredRoomFields) {
        if (room[field] === undefined || room[field] === null) {
          return NextResponse.json(
            { error: `Room ${field} is required` },
            { status: 400 }
          );
        }
      }
      if (!Array.isArray(room.images) || room.images.length === 0) {
        return NextResponse.json(
          { error: "Each room must have at least one image" },
          { status: 400 }
        );
      }
      if (!Array.isArray(room.roomIds) || room.roomIds.length === 0) {
        return NextResponse.json(
          { error: "Each room must have at least one room ID" },
          { status: 400 }
        );
      }
    }

    // Create hotel first without rooms
    const hotelPayload = {
      name: hotelData.name,
      address: hotelData.address,
      city: hotelData.city,
      headings: hotelData.headings,
      rating: Number(hotelData.rating),
      reviews: Number(hotelData.reviews),
      amenities: hotelData.amenities,
      mainImage: hotelData.mainImage,
      carouselImages: hotelData.carouselImages,
      rooms: [],
    };

    const newHotel = new Hotel(hotelPayload);
    await newHotel.save();

    // Create rooms with hotel reference
    const roomIds = [];
    for (const roomData of hotelData.rooms) {
      const roomPayload = {
        ...roomData,
        hotel: newHotel._id,
      };
      const newRoom = new Room(roomPayload);
      await newRoom.save();
      roomIds.push(newRoom._id);
    }

    // Update hotel with room IDs
    newHotel.rooms = roomIds;
    await newHotel.save();

    // Fetch the populated hotel data
    const populatedHotel = await Hotel.findById(newHotel._id).populate("rooms");

    return NextResponse.json(
      {
        message: "Hotel and rooms created successfully",
        hotel: populatedHotel,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating hotel:", error);
    return NextResponse.json(
      { error: "Failed to create hotel"},
      { status: 500 }
    );
  }
}