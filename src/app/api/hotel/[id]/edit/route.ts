import { connectToDB } from "@/utils/database";
import Hotel from "@/models/hotel";
import Room from "@/models/room";
import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    const id = params.id;
    const hotelData = await req.json();

    // Validation
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
        return NextResponse.json({ error: `${field} is required` }, { status: 400 });
      }
    }

    // Validate headings
    if (!Array.isArray(hotelData.headings) || hotelData.headings.length === 0) {
      return NextResponse.json({ error: "At least one heading is required" }, { status: 400 });
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
      return NextResponse.json({ error: "At least one amenity is required" }, { status: 400 });
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
      return NextResponse.json({ error: "At least one room is required" }, { status: 400 });
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
          return NextResponse.json({ error: `Room ${field} is required` }, { status: 400 });
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

    // Find the hotel
    const hotel = await Hotel.findById(id);
    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    // Update hotel fields excluding rooms
    await Hotel.findByIdAndUpdate(
      id,
      {
        name: hotelData.name,
        address: hotelData.address,
        city: hotelData.city,
        headings: hotelData.headings,
        rating: Number(hotelData.rating),
        reviews: Number(hotelData.reviews),
        mainImage: hotelData.mainImage,
        carouselImages: hotelData.carouselImages,
        amenities: hotelData.amenities,
      },
      { new: true }
    );

    // Handle rooms
    const currentRoomIds = hotel.rooms.map((id: { toString: () => any; }) => id.toString());
    const updatedRoomIds: string[] = [];

    for (const roomData of hotelData.rooms) {
      if (roomData._id) {
        // Update existing room
        const roomId = new Types.ObjectId(roomData._id);
        await Room.findByIdAndUpdate(roomId, roomData);
        updatedRoomIds.push(roomId.toString());
      } else {
        // Create new room
        const newRoom = new Room({ ...roomData, hotel: id });
        await newRoom.save();
        updatedRoomIds.push(newRoom._id.toString());
      }
    }

    // Delete rooms that are no longer associated with the hotel
    const roomsToDelete = currentRoomIds.filter((roomId: string) => !updatedRoomIds.includes(roomId));
    await Room.deleteMany({ _id: { $in: roomsToDelete.map((id: string) => new Types.ObjectId(id)) } });

    // Update hotel's rooms array
    hotel.rooms = updatedRoomIds.map((id) => new Types.ObjectId(id));
    await hotel.save();

    // Fetch the populated hotel
    const populatedHotel = await Hotel.findById(id).populate("rooms");

    return NextResponse.json(
      {
        message: "Hotel updated successfully",
        hotel: populatedHotel,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating hotel:", error);
    return NextResponse.json({ error: "Failed to update hotel" }, { status: 500 });
  }
}