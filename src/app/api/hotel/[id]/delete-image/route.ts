import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Hotel from '@/models/hotel';
import Room from '@/models/room';
import cloudinary from '@/utils/cloudinary';

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    let hotel = await Hotel.findById(params.id).populate('rooms');
    if (!hotel) return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });

    const { type, imageUrl, roomId } = await req.json();

    // Extract public ID from Cloudinary URL
    const publicId = imageUrl.split('/').pop()?.split('.')[0];
    if (!publicId) {
      return NextResponse.json({ error: 'Invalid image URL' }, { status: 400 });
    }

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Update database based on image type
    switch (type) {
      case 'main':
        hotel.mainImage = ''; // Or set to a default image if preferred
        await hotel.save();
        break;
      case 'carousel':
        hotel.carouselImages = hotel.carouselImages.filter((img: string) => img !== imageUrl);
        await hotel.save();
        break;
      case 'room':
        if (!roomId) {
          return NextResponse.json({ error: 'Room ID required for room image deletion' }, { status: 400 });
        }
        const room = await Room.findById(roomId);
        if (!room) {
          return NextResponse.json({ error: 'Room not found' }, { status: 404 });
        }
        room.images = room.images.filter((img: string) => img !== imageUrl);
        await room.save();
        // No need to save hotel here since rooms are a separate collection
        break;
      default:
        return NextResponse.json({ error: 'Invalid image type' }, { status: 400 });
    }

    // Re-fetch the hotel with populated rooms to ensure the response includes updated data
    hotel = await Hotel.findById(params.id).populate('rooms');
    return NextResponse.json({ message: 'Image deleted successfully', hotel });
  } catch (error: any) {
    console.error('Delete error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}