import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Hotel from '@/models/hotel';
import Room, { IRoom } from '@/models/room';
import cloudinary from '@/utils/cloudinary';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();

    const hotel = await Hotel.findById(params.id);
    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    // Parse form data (assuming images are sent as files)
    const formData = await req.formData();

    const roomData: Partial<IRoom> = {
      roomName: formData.get('roomName') as string,
      bedCount: Number(formData.get('bedCount')),
      peopleCount: Number(formData.get('peopleCount')),
      childCount: Number(formData.get('childCount')),
      originalPrice: Number(formData.get('originalPrice')),
      discountedPrice: Number(formData.get('discountedPrice')),
      discountPercentage: Number(formData.get('discountPercentage')),
      availableRooms: Number(formData.get('availableRooms')),
      roomIds: JSON.parse(formData.get('roomIds') as string), // Expecting a JSON string like '["1317801", ...]'
      hotel: hotel._id, // Associate with the hotel
      images: [], // Will be populated with uploaded image URLs
    };

    // Handle image uploads
    const imageFiles = formData.getAll('images') as File[];
    if (imageFiles.length > 0) {
      const uploads = await Promise.all(
        imageFiles.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer());
          return new Promise<string>((resolve, reject) => {
            cloudinary.uploader.upload_stream(
              { resource_type: 'image' },
              (error, result) => {
                if (error) reject(error);
                else resolve((result as any).secure_url);
              }
            ).end(buffer);
          });
        })
      );
      roomData.images = uploads;
    }

    // Create new room
    const newRoom = new Room(roomData);
    await newRoom.save();

    // Add room reference to hotel
    hotel.rooms.push(newRoom._id);
    await hotel.save();

    return NextResponse.json({
      message: 'Room added successfully',
      room: newRoom,
      hotel,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error adding room:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}