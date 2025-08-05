"use client";
import { Box, Button, Card, CardContent, CardMedia, IconButton, Modal, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import CustomImageUpload from '@/components/customimageupload/CustomImageUpload'; // Adjust the import path
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useRouter } from 'next/navigation';

interface Hotel {
  _id: string;
  name: string;
  address: string;
  city: string;
  mainImage: string;
  carouselImages: string[];
  rooms: Room[];
}

interface Room {
  _id: string;
  roomName: string;
  images: string[];
}

const HotelsPage = () => {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [open, setOpen] = useState(false);
  const [mainImageFile, setMainImageFile] = useState<File[]>([]);
  const [carouselFiles, setCarouselFiles] = useState<File[]>([]);
  const [roomFiles, setRoomFiles] = useState<{ [key: string]: File[] }>({});
  const router = useRouter();

  // Fetch all hotels on mount
  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const hotelsResponse = await fetch('/api/hotel', { method: 'GET' });
        if (!hotelsResponse.ok) throw new Error('Failed to fetch hotels');
        const hotelsData = await hotelsResponse.json();
        setHotels(hotelsData); // Adjust based on your API response structure
      } catch (error) {
        console.error('Error fetching hotels:', error);
      }
    };
    fetchHotels();
  }, []);

  // Open modal for selected hotel
  const handleOpen = (hotel: Hotel) => {
    setSelectedHotel(hotel);
    setOpen(true);
  };

  // Close modal and reset state
  const handleClose = () => {
    setOpen(false);
    setSelectedHotel(null);
    setMainImageFile([]);
    setCarouselFiles([]);
    setRoomFiles({});
  };

  // Handle image upload submission
  const handleUpload = async () => {
    if (!selectedHotel) return;

    const formData = new FormData();

    mainImageFile.forEach((file) => formData.append('mainImage', file));
    carouselFiles.forEach((file) => formData.append('carouselImages', file));
    Object.entries(roomFiles).forEach(([roomId, files]) => {
      files.forEach((file) => formData.append(`roomImages[${roomId}]`, file));
    });

    try {
      const uploadResponse = await fetch(`/api/hotel/${selectedHotel._id}/upload-images`, {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error(`Upload failed with status: ${uploadResponse.status}`);
      }

      const uploadData = await uploadResponse.json();
      console.log('Upload successful:', uploadData);
      handleClose();

      const hotelsResponse = await fetch('/api/hotel', { method: 'GET' });
      if (!hotelsResponse.ok) throw new Error('Failed to fetch hotels');
      const hotelsData = await hotelsResponse.json();
      setHotels(hotelsData);
    } catch (error) {
      console.error('Error uploading images:', error);
    }
  };

  // Handle image deletion
  const handleDeleteImage = async (type: 'main' | 'carousel' | 'room', imageUrl: string, roomId?: string) => {
    if (!selectedHotel) return;

    try {
      const response = await fetch(`/api/hotel/${selectedHotel._id}/delete-image`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type, imageUrl, roomId }),
      });

      if (!response.ok) {
        throw new Error(`Delete failed with status: ${response.status}`);
      }

      const updatedHotelData = await response.json();
      setSelectedHotel(updatedHotelData.hotel); // Update local state with refreshed hotel data

      // Refresh the full hotels list
      const hotelsResponse = await fetch('/api/hotel', { method: 'GET' });
      if (!hotelsResponse.ok) throw new Error('Failed to fetch hotels');
      const hotelsData = await hotelsResponse.json();
      setHotels(hotelsData);
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };

  const modalStyle = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
    maxHeight: '80vh',
    overflowY: 'auto',
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{display: 'flex', flexDirection:"row"}}>
      <Typography variant="h4" gutterBottom>
        Manage Hotels
      </Typography>
      <AddCircleOutlineOutlinedIcon fontSize='medium' sx={{color:"#5391F9", paddingY:1, paddingX: 2, cursor:"pointer" }} onClick={()=> router.push('/account/hotels/create')}/>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {hotels?.map((hotel) => (
          <Card key={hotel._id} sx={{ width: 300 }}>
            <CardMedia component="img" height="140" image={hotel.mainImage} alt={hotel.name} />
            <CardContent>
              <Typography variant="h6">{hotel.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {hotel.address}
              </Typography>
              <Button onClick={()=> router.push(`/account/hotels/${hotel._id}/edit`)}>Edit</Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <IconButton
            onClick={handleClose}
            sx={{
              position: 'absolute',
              top: 12,
              right: 12,
              color: 'grey.800',
              '&:hover': { color: 'grey.900' },
            }}
          >
            <CloseIcon sx={{ fontSize: 32 }} /> {/* Larger and bolder */}
          </IconButton>
          {selectedHotel && (
            <>
              <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
                Manage Images for {selectedHotel.name}
              </Typography>

              {/* Main Image Section */}
              <Box sx={{ borderBottom: '1px solid grey.300', pb: 3, mb: 3 }}>
                {/* <Typography variant="h6" gutterBottom>
                  Main Image
                </Typography> */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CustomImageUpload
                    label="Upload Main Image"
                    multiple={false}
                    onFilesChange={(files) => setMainImageFile(files)}
                    accept="image/*"
                  />
                  {selectedHotel.mainImage && mainImageFile.length === 0 && (
                    <Box sx={{ position: 'relative', ml: 'auto' }}>
                      <img
                        src={selectedHotel.mainImage}
                        alt="Current Main"
                        style={{ maxWidth: '200px' }}
                      />
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteImage('main', selectedHotel.mainImage)}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                          bgcolor: 'rgba(0, 0, 0, 0.6)',
                          color: 'white',
                          '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
              </Box>

              {/* Carousel Images Section */}
              <Box sx={{ borderBottom: '1px solid grey.300', pb: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Carousel Images
                </Typography>
                <CustomImageUpload
                  label="Upload Carousel Images"
                  multiple={true}
                  onFilesChange={(files) => setCarouselFiles(files)}
                  accept="image/*"
                  maxFiles={10}
                />
                {selectedHotel.carouselImages.length > 0 && carouselFiles.length === 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Current Carousel Images:</Typography>
                    <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                      {selectedHotel.carouselImages.map((img, index) => (
                        <Box key={index} sx={{ position: 'relative' }}>
                          <img src={img} alt={`Carousel ${index}`} style={{ maxWidth: '100px' }} />
                          <IconButton
                            size="small"
                            onClick={() => handleDeleteImage('carousel', img)}
                            sx={{
                              position: 'absolute',
                              top: 0,
                              right: 0,
                              bgcolor: 'rgba(0, 0, 0, 0.6)',
                              color: 'white',
                              '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                            }}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      ))}
                    </div>
                  </Box>
                )}
              </Box>

              {/* Rooms Section */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Room Images
                </Typography>
                {selectedHotel.rooms.map((room) => (
                  <Box key={room._id} sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {room.roomName}
                    </Typography>
                    <CustomImageUpload
                      label={`Upload Images for ${room.roomName}`}
                      multiple={true}
                      onFilesChange={(files) => setRoomFiles((prev) => ({ ...prev, [room._id]: files }))}
                      accept="image/*"
                      maxFiles={5}
                    />
                    {room.images.length > 0 && !roomFiles[room._id]?.length && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2">Current Room Images:</Typography>
                        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                          {room.images.map((img, index) => (
                            <Box key={index} sx={{ position: 'relative' }}>
                              <img src={img} alt={`Room ${index}`} style={{ maxWidth: '100px' }} />
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteImage('room', img, room._id)}
                                sx={{
                                  position: 'absolute',
                                  top: 0,
                                  right: 0,
                                  bgcolor: 'rgba(0, 0, 0, 0.6)',
                                  color: 'white',
                                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.8)' },
                                }}
                              >
                                <DeleteIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          ))}
                        </div>
                      </Box>
                    )}
                  </Box>
                ))}
              </Box>

              {/* Action Buttons */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={handleClose}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleUpload}>
                  Update Images
                </Button>
              </Box>
            </>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default HotelsPage;