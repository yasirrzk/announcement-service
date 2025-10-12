import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Box, Typography } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const FileUpload = ({ onDrop }) => {
  const onDropCallback = useCallback(acceptedFiles => {
    onDrop(acceptedFiles);
  }, [onDrop]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop: onDropCallback });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: '2px dashed #E0E0E0',
        borderRadius: 2,
        p: 5,
        textAlign: 'center',
        backgroundColor: isDragActive ? '#E6F7FF' : '#F7FAFC', 
        cursor: 'pointer',
        transition: 'background-color 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'primary.main',
        },
      }}
    >
      <input {...getInputProps()} />
      <CloudUploadIcon sx={{ fontSize: 48, color: '#00BFFF', mb: 1 }} />
      <Typography variant="h6" sx={{ color: '#00BFFF', fontWeight: 600 }}>
        Drop or select file
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Drop files here or click to browse through your machine.
      </Typography>
    </Box>
  );
};

export default FileUpload;