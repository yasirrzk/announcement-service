// File: src/Components/FileUpload.jsx

import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { drop } from "../assets/Icons/icons"; 

const FileUpload = ({ onDrop, file, onRemove }) => {
  const [preview, setPreview] = useState(null);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.jpg', '.webp'] }, 
    multiple: false, 
  });

  useEffect(() => {
    if (file && file.type && file.type.startsWith('image/')) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]); 

  const handleRemoveFile = (event) => {
    event.stopPropagation(); 
    if (onRemove) onRemove();
  };

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #E0E0E0",
        borderRadius: 2,
        p: 2,
        textAlign: "center",
        backgroundColor: isDragActive ? "rgba(14, 165, 233, 0.08)" : "rgba(14, 165, 233, 0.08)",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
        "&:hover": { borderColor: "primary.main" },
        minHeight: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <input {...getInputProps()} />

      {preview ? (
        <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
          <img
            src={preview}
            alt="Pratinjau"
            style={{
              width: '100%',
              height: '100%',
              maxHeight: '180px',
              objectFit: 'cover',
              borderRadius: '4px',
            }}
          />
          <IconButton
            size="small"
            onClick={handleRemoveFile}
            sx={{
              position: 'absolute',
              top: 8,
              right: 8,
              bgcolor: 'rgba(255, 255, 255, 0.8)',
              '&:hover': { bgcolor: 'white' }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      ) : (
        <Box>
          <Box
            component="img"
            src={drop}
            alt="Upload Icon"
            sx={{ width: 48, height: 48, mb: 1 }}
          />
          <Typography variant="h6" color="primary.main" fontWeight={600}>
            Drop or select file
          </Typography>
          <Typography variant="caption" color="textSecondary">
            Drop files here or click to browse.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;