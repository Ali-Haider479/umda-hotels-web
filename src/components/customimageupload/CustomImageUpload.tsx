"use client";
import React, { useState, ChangeEvent } from 'react';
import {
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CustomImageUploadProps {
  label: string; // Label for the upload button
  multiple?: boolean; // Whether to allow multiple file uploads
  onFilesChange: (files: File[]) => void; // Callback to pass selected files to parent
  accept?: string; // File types to accept (e.g., "image/*")
  maxFiles?: number; // Maximum number of files (for multiple mode)
}

const CustomImageUpload: React.FC<CustomImageUploadProps> = ({
  label,
  multiple = false,
  onFilesChange,
  accept = 'image/*',
  maxFiles = Infinity,
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);

  // Handle file selection
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const updatedFiles = multiple
        ? [...selectedFiles, ...newFiles].slice(0, maxFiles) // Append and limit by maxFiles
        : newFiles.slice(0, 1); // Only take the first file for single mode

      setSelectedFiles(updatedFiles);
      setPreviews(updatedFiles.map((file) => URL.createObjectURL(file)));
      onFilesChange(updatedFiles); // Pass updated files to parent
    }
  };

  // Remove a file from the list
  const handleRemoveFile = (index: number) => {
    const updatedFiles = selectedFiles.filter((_, i) => i !== index);
    const updatedPreviews = previews.filter((_, i) => i !== index);

    // Revoke the URL of the removed preview to free memory
    URL.revokeObjectURL(previews[index]);

    setSelectedFiles(updatedFiles);
    setPreviews(updatedPreviews);
    onFilesChange(updatedFiles); // Pass updated files to parent
  };

  // Clean up previews on unmount
  React.useEffect(() => {
    return () => {
      previews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [previews]);

  return (
    <Box sx={{ mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        {label}
      </Typography>
      <Button
        variant="contained"
        component="label"
        sx={{ mb: 2 }}
      >
        Upload {multiple ? 'Images' : 'Image'}
        <input
          type="file"
          hidden
          multiple={multiple}
          accept={accept}
          onChange={handleFileChange}
        />
      </Button>

      {/* Render previews */}
      {previews.length > 0 && (
        <Grid container spacing={2}>
          {previews.map((preview, index) => (
            <Grid item key={index}>
              <Box sx={{ position: 'relative', width: 100, height: 100 }}>
                <img
                  src={preview}
                  alt={`Preview ${index}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                <IconButton
                  size="small"
                  onClick={() => handleRemoveFile(index)}
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
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default CustomImageUpload;