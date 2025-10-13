import React, { useState, useEffect, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { drop } from "../assets/Icons/icons";

const FileUpload = ({ onDrop, file, onRemove }) => {
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState('');

  const MAX_SIZE_BYTES = 1048576;

  const onDropValidated = useCallback((acceptedFiles, fileRejections) => {
    setError('');

    if (fileRejections.length > 0) {
      const firstRejection = fileRejections[0];
      if (firstRejection.errors[0].code === 'file-too-large') {
        setError('Ukuran file terlalu besar. Maksimal 1MB.');
      } else {
        setError(firstRejection.errors[0].message);
      }
      if (onRemove) onRemove();
      return;
    }

    if (acceptedFiles.length > 0) {
      onDrop(acceptedFiles);
    }
  }, [onDrop, onRemove]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropValidated,
    accept: { 'image/*': ['.jpeg', '.png', '.gif', '.jpg', '.webp'] },
    multiple: false,
    maxSize: MAX_SIZE_BYTES,
  });

  useEffect(() => {
    if (file && file.type && file.type.startsWith('image/')) {
      setPreview(URL.createObjectURL(file));
      setError(''); 
    } else {
      setPreview(null);
    }

    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [file]);

  const handleRemoveFile = (event) => {
    event.stopPropagation();
    setError(''); 
    if (onRemove) onRemove();
  };

  return (
    <Box>
      <Box
        {...getRootProps()}
        sx={{
          border: `2px dashed ${error ? 'red' : '#E0E0E0'}`, 
          borderRadius: 2,
          p: 2,
          textAlign: "center",
          backgroundColor: isDragActive ? "rgba(14, 165, 233, 0.08)" : "#F7FAFC",
          cursor: "pointer",
          transition: "all 0.2s ease-in-out",
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
            <IconButton /* ... */ onClick={handleRemoveFile}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>
        ) : (
          <Box>
            <Box component="img" src={drop} /* ... */ />
            <Typography variant="h6" color="primary.main" fontWeight={600}>
              Drop or select file
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Drop files here or click to browse.
            </Typography>
          </Box>
        )}
      </Box>
      
      {error && (
        <Typography color="error" variant="caption" sx={{ mt: 1, display: 'block' }}>
          {error}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;