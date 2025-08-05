import { NextRequest, NextResponse } from 'next/server';
import { connectToDB } from '@/utils/database';
import Hotel from '@/models/hotel';
import Room from '@/models/room';
import cloudinary from '@/utils/cloudinary';

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectToDB();
    const formData = await req.formData();
    const hotel = await Hotel.findById(params.id);
    if (!hotel) return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });

    // Handle main image (expecting an array, but we'll take the first file if multiple are sent)
    const mainImageFiles = formData.getAll('mainImage') as File[];
    if (mainImageFiles.length > 0) {
      const file = mainImageFiles[0]; // Take only the first file for mainImage
      const buffer = Buffer.from(await file.arrayBuffer()); // Await the ArrayBuffer
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }).end(buffer);
      });
      hotel.mainImage = (result as any).secure_url;
    }

    // Handle carousel images
    const carouselFiles = formData.getAll('carouselImages') as File[];
    if (carouselFiles.length > 0) {
      const uploads = await Promise.all(
        carouselFiles.map(async (file) => {
          const buffer = Buffer.from(await file.arrayBuffer()); // Await the ArrayBuffer
          return new Promise<string>((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
              if (error) reject(error);
              else resolve((result as any).secure_url);
            }).end(buffer);
          });
        })
      );
      hotel.carouselImages = [...hotel.carouselImages, ...uploads];
    }

    // Handle room images
    const roomImageKeys = Array.from(formData.keys()).filter((key) =>
      key.startsWith('roomImages[')
    );
    for (const key of roomImageKeys) {
      const roomIdMatch = key.match(/roomImages\[(.*?)\]/);
      const roomId = roomIdMatch ? roomIdMatch[1] : null;
      if (!roomId) continue;

      const files = formData.getAll(key) as File[];
      if (files.length > 0) {
        const uploads = await Promise.all(
          files.map(async (file) => {
            const buffer = Buffer.from(await file.arrayBuffer()); // Await the ArrayBuffer
            return new Promise<string>((resolve, reject) => {
              cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) reject(error);
                else resolve((result as any).secure_url);
              }).end(buffer);
            });
          })
        );
        const room = await Room.findById(roomId);
        if (room) {
          room.images = [...room.images, ...uploads];
          await room.save();
        }
      }
    }

    await hotel.save();
    return NextResponse.json({ message: 'Images uploaded successfully', hotel });
  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}