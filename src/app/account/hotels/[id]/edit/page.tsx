"use client"

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Grid, TextField, Button, IconButton, Typography, FormControl, InputLabel, Select, MenuItem, SvgIconTypeMap } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TvIcon from "@mui/icons-material/Tv";
import WifiIcon from "@mui/icons-material/Wifi";
import LocalParkingIcon from "@mui/icons-material/LocalParking";
import AcUnitIcon from "@mui/icons-material/AcUnit";
import RestaurantIcon from "@mui/icons-material/Restaurant";
import FireplaceIcon from "@mui/icons-material/Fireplace";
import { OverridableComponent } from '@mui/material/OverridableComponent';

interface Heading {
  title: string;
  description: string;
}

interface Room {
  roomName: string;
  bedCount: number;
  peopleCount: number;
  childCount: number;
  originalPrice: number;
  discountedPrice: number;
  discountPercentage: number;
  images: string[];
  availableRooms: number;
  roomIds: string[];
}

interface Amenity {
  name: string;
  icon: string;
}

interface IconComponents {
  [key: string]: OverridableComponent<SvgIconTypeMap<{}, 'svg'>>;
}

interface FormData {
  name: string;
  address: string;
  city: string;
  headings: Heading[];
  rating: number;
  reviews: number;
  mainImage: string;
  carouselImages: string[];
  amenities: Amenity[];
  rooms: Room[];
}

const availableAmenities: Amenity[] = [
  { name: 'Air Conditioning', icon: 'AcUnitIcon' },
  { name: 'Flat TV', icon: 'TvIcon' },
  { name: 'Heater', icon: 'FireplaceIcon' },
  { name: 'Internet - Wifi', icon: 'WifiIcon' },
  { name: 'Parking', icon: 'LocalParkingIcon' },
  { name: 'Restaurant', icon: 'RestaurantIcon' },
];

const iconComponents: IconComponents = {
  AcUnitIcon: AcUnitIcon,
  TvIcon: TvIcon,
  FireplaceIcon: FireplaceIcon,
  WifiIcon: WifiIcon,
  LocalParkingIcon: LocalParkingIcon,
  RestaurantIcon: RestaurantIcon,
};

const EditHotelPage = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await fetch(`/api/hotel/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch hotel data');
        }
        const data = await response.json();
        setFormData(data);
        setLoading(false);
      } catch (err) {
        setError((err as Error).message);
        setLoading(false);
      }
    };
    fetchHotel();
  }, [id]);

  const addHeading = () => {
    if (formData) {
      setFormData({
        ...formData,
        headings: [...formData.headings, { title: '', description: '' }],
      });
    }
  };

  const removeHeading = (index: number) => {
    if (formData) {
      const newHeadings = formData.headings.filter((_, i) => i !== index);
      setFormData({ ...formData, headings: newHeadings });
    }
  };

  const handleHeadingChange = (index: number, field: string, value: string) => {
    if (formData) {
      const newHeadings = [...formData.headings];
      newHeadings[index] = { ...newHeadings[index], [field]: value };
      setFormData({ ...formData, headings: newHeadings });
    }
  };

  const uploadImage = async (file: any) => {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
      console.error('Cloudinary configuration missing');
      return null;
    }
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET);
    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) {
        throw new Error('Upload failed');
      }
      const data = await response.json();
      return data.secure_url;
    } catch (error) {
      console.error('Error uploading image:', error);
      return null;
    }
  };

  const handleMainImageUpload = async (e: any) => {
    const file = e.target.files?.[0];
    if (file && formData) {
      const url = await uploadImage(file);
      if (url) {
        setFormData({ ...formData, mainImage: url });
      }
    }
  };

  const addCarouselImage = async (file: any) => {
    const url = await uploadImage(file);
    if (url && formData) {
      setFormData({
        ...formData,
        carouselImages: [...formData.carouselImages, url],
      });
    }
  };

  const removeCarouselImage = (index: number) => {
    if (formData) {
      const newImages = formData.carouselImages.filter((_, i) => i !== index);
      setFormData({ ...formData, carouselImages: newImages });
    }
  };

  const addAmenity = () => {
    if (formData) {
      setFormData({
        ...formData,
        amenities: [...formData.amenities, { name: '', icon: '' }],
      });
    }
  };

  const removeAmenity = (index: number) => {
    if (formData) {
      const newAmenities = formData.amenities.filter((_, i) => i !== index);
      setFormData({
        ...formData,
        amenities: newAmenities,
      });
    }
  };

  const handleAmenityChange = (index: number, field: keyof Amenity, value: string) => {
    if (formData) {
      const newAmenities = [...formData.amenities];
      newAmenities[index][field] = value;
      setFormData({ ...formData, amenities: newAmenities });
    }
  };

  const addRoom = () => {
    if (formData) {
      setFormData({
        ...formData,
        rooms: [...formData.rooms, {
          roomName: '',
          bedCount: 0,
          peopleCount: 0,
          childCount: 0,
          originalPrice: 0,
          discountedPrice: 0,
          discountPercentage: 0,
          images: [],
          availableRooms: 0,
          roomIds: [''],
        }],
      });
    }
  };

  const removeRoom = (roomIndex: number) => {
    if (formData) {
      const newRooms = formData.rooms.filter((_, i) => i !== roomIndex);
      setFormData({
        ...formData,
        rooms: newRooms,
      });
    }
  };

  const addRoomImage = async (roomIndex: number, file: File) => {
    const url = await uploadImage(file);
    if (url && formData) {
      const newRooms = [...formData.rooms];
      newRooms[roomIndex].images = [...newRooms[roomIndex].images, url];
      setFormData({
        ...formData,
        rooms: newRooms,
      });
    }
  };

  const removeRoomImage = (roomIndex: number, imageIndex: number) => {
    if (formData) {
      const newRooms = [...formData.rooms];
      newRooms[roomIndex].images = newRooms[roomIndex].images.filter((_, i) => i !== imageIndex);
      setFormData({
        ...formData,
        rooms: newRooms,
      });
    }
  };

  const addRoomId = (roomIndex: number) => {
    if (formData) {
      const newRooms = [...formData.rooms];
      newRooms[roomIndex].roomIds.push('');
      setFormData({
        ...formData,
        rooms: newRooms,
      });
    }
  };

  const removeRoomId = (roomIndex: number, idIndex: number) => {
    if (formData) {
      const newRooms = [...formData.rooms];
      newRooms[roomIndex].roomIds = newRooms[roomIndex].roomIds.filter((_, i) => i !== idIndex);
      setFormData({
        ...formData,
        rooms: newRooms,
      });
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!formData) return;
    try {
      const response = await fetch(`/api/hotel/${id}/edit`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        console.log('Hotel updated successfully');
      } else {
        throw new Error('Failed to update hotel');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!formData) {
    return <div>No hotel data found.</div>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h5">Edit Hotel Details</Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="City"
            value={formData.city}
            onChange={(e) => setFormData({ ...formData, city: e.target.value })}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Headings</Typography>
        </Grid>
        <Grid item xs={12}>
          {formData.headings.map((heading, index) => (
            <Grid container spacing={2} key={index} sx={{marginBottom:2}}>
              <Grid item xs={12}>
                <Typography variant="h6">Heading {index + 1}</Typography>
              </Grid>
              <Grid item xs={10}>
                <TextField
                  fullWidth
                  label="Title"
                  value={heading.title}
                  onChange={(e) => handleHeadingChange(index, 'title', e.target.value)}
                />
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => removeHeading(index)} disabled={formData.headings.length === 1}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={4}
                  label="Description"
                  value={heading.description}
                  onChange={(e) => handleHeadingChange(index, 'description', e.target.value)}
                />
              </Grid>
            </Grid>
          ))}
        </Grid>
        <Grid item xs={12} sx={{marginBottom: 2}}>
          <Button variant="contained" color="primary" onClick={addHeading}>
            Add Heading
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Ratings</Typography>
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Rating"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: Number(e.target.value) })}
            inputProps={{ step: 0.1 }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            fullWidth
            type="number"
            label="Reviews"
            value={formData.reviews}
            onChange={(e) => setFormData({ ...formData, reviews: Number(e.target.value) })}
          />
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Images</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Main Image</Typography>
          {formData.mainImage ? (
            <div>
              <img src={formData.mainImage} alt="Main Image" style={{ width: '200px' }} />
              <Button onClick={() => setFormData({ ...formData, mainImage: '' })}>Remove</Button>
            </div>
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleMainImageUpload}
                style={{ display: 'none' }}
                id="main-image-upload"
              />
              <label htmlFor="main-image-upload">
                <Button
                  variant="contained"
                  component="span"
                  color="primary"
                >
                  Upload Main Image
                </Button>
              </label>
            </div>
          )}
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">Carousel Images</Typography>
          {formData.carouselImages.map((image, index) => (
            <Grid container spacing={1} key={index} alignItems="center">
              <Grid item xs={10}>
                <img src={image} alt={`Carousel Image ${index + 1}`} style={{ width: '100px' }} />
              </Grid>
              <Grid item xs={2}>
                <Button onClick={() => removeCarouselImage(index)}>Remove</Button>
              </Grid>
            </Grid>
          ))}
          <Button component="label">
            Add Carousel Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (file) {
                  await addCarouselImage(file);
                }
              }}
            />
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Amenities</Typography>
          {formData.amenities.map((amenity, index) => (
            <Grid container spacing={2} key={index} alignItems="center" sx={{marginBottom:2}}>
              <Grid item xs={5}>
                <TextField
                  fullWidth
                  label="Name"
                  value={amenity.name}
                  onChange={(e) => handleAmenityChange(index, 'name', e.target.value)}
                />
              </Grid>
              <Grid item xs={5}>
                <FormControl fullWidth>
                  <InputLabel>Icon</InputLabel>
                  <Select
                    value={amenity.icon}
                    label="Icon"
                    onChange={(e) => handleAmenityChange(index, 'icon', e.target.value)}
                  >
                    {availableAmenities.map((option) => {
                      const Icon = iconComponents[option.icon];
                      return (
                        <MenuItem key={option.icon} value={option.icon}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <Icon />
                            {option.name}
                          </div>
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={2}>
                <IconButton onClick={() => removeAmenity(index)}>
                  <DeleteIcon />
                </IconButton>
              </Grid>
            </Grid>
          ))}
          <Button variant='contained' onClick={addAmenity}>Add Amenity</Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h5">Rooms</Typography>
          {formData.rooms.map((room, roomIndex) => (
            <div key={roomIndex} style={{marginTop: 4}}>
              <Typography variant="h6" sx={{marginBottom:2}}>Room {roomIndex + 1}</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Room Name"
                    value={room.roomName}
                    onChange={(e) => {
                      const newRooms = [...formData.rooms];
                      newRooms[roomIndex].roomName = e.target.value;
                      setFormData({ ...formData, rooms: newRooms });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Bed Count"
                    value={room.bedCount}
                    onChange={(e) => {
                      const newRooms = [...formData.rooms];
                      newRooms[roomIndex].bedCount = Number(e.target.value);
                      setFormData({ ...formData, rooms: newRooms });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="People Count"
                    value={room.peopleCount}
                    onChange={(e) => {
                      const newRooms = [...formData.rooms];
                      newRooms[roomIndex].peopleCount = Number(e.target.value);
                      setFormData({ ...formData, rooms: newRooms });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Child Count"
                    value={room.childCount}
                    onChange={(e) => {
                      const newRooms = [...formData.rooms];
                      newRooms[roomIndex].childCount = Number(e.target.value);
                      setFormData({ ...formData, rooms: newRooms });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Original Price"
                    value={room.originalPrice}
                    onChange={(e) => {
                      const newRooms = [...formData.rooms];
                      newRooms[roomIndex].originalPrice = Number(e.target.value);
                      setFormData({ ...formData, rooms: newRooms });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Discounted Price"
                    value={room.discountedPrice}
                    onChange={(e) => {
                      const newRooms = [...formData.rooms];
                      newRooms[roomIndex].discountedPrice = Number(e.target.value);
                      setFormData({ ...formData, rooms: newRooms });
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Discount Percentage"
                    value={room.discountPercentage}
                    onChange={(e) => {
                      const newRooms = [...formData.rooms];
                      newRooms[roomIndex].discountPercentage = Number(e.target.value);
                      setFormData({ ...formData, rooms: newRooms });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    type="number"
                    label="Available Rooms"
                    value={room.availableRooms}
                    onChange={(e) => {
                      const newRooms = [...formData.rooms];
                      newRooms[roomIndex].availableRooms = Number(e.target.value);
                      setFormData({ ...formData, rooms: newRooms });
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Room Images</Typography>
                  {room.images.map((image, imageIndex) => (
                    <Grid container spacing={1} key={imageIndex} alignItems="center">
                      <Grid item xs={10}>
                        <img src={image} alt={`Room Image ${imageIndex + 1}`} style={{ width: '200px' }} />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => removeRoomImage(roomIndex, imageIndex)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <div>
                    <input
                      type="file"
                      accept="image/*"
                      style={{ display: 'none' }}
                      id={`room-image-upload-${roomIndex}`}
                      onChange={async (e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          await addRoomImage(roomIndex, file);
                        }
                      }}
                    />
                    <label htmlFor={`room-image-upload-${roomIndex}`}>
                      <Button
                        variant="contained"
                        component="span"
                        color="primary"
                      >
                        Add Room Image
                      </Button>
                    </label>
                  </div>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Room IDs</Typography>
                  {room.roomIds.map((roomId, idIndex) => (
                    <Grid container spacing={1} key={idIndex} alignItems="center" sx={{marginBottom:2}}>
                      <Grid item xs={10}>
                        <TextField
                          fullWidth
                          label={`Room ID ${idIndex + 1}`}
                          value={roomId}
                          onChange={(e) => {
                            const newRooms = [...formData.rooms];
                            newRooms[roomIndex].roomIds[idIndex] = e.target.value;
                            setFormData({ ...formData, rooms: newRooms });
                          }}
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <IconButton onClick={() => removeRoomId(roomIndex, idIndex)}>
                          <DeleteIcon />
                        </IconButton>
                      </Grid>
                    </Grid>
                  ))}
                  <Button onClick={() => addRoomId(roomIndex)}>Add Room ID</Button>
                </Grid>
              </Grid>
              <IconButton onClick={() => removeRoom(roomIndex)}>
                <DeleteIcon />
              </IconButton>
            </div>
          ))}
          <Button onClick={addRoom}>Add Room</Button>
        </Grid>

        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Update Hotel
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditHotelPage;