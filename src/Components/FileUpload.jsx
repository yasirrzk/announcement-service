import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Box, Typography } from "@mui/material";
import {drop} from "../assets/Icons/icons";

const FileUpload = ({ onDrop }) => {
  const onDropCallback = useCallback(
    (acceptedFiles) => {
      onDrop(acceptedFiles);
    },
    [onDrop]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: onDropCallback,
  });

  return (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed #E0E0E0",
        borderRadius: 2,
        p: 5,
        textAlign: "center",
        backgroundColor: isDragActive
          ? "rgba(14, 165, 233, 0.2)"
          : "rgba(14, 165, 233, 0.2)",
        cursor: "pointer",
        transition: "background-color 0.2s ease-in-out",
        "&:hover": {
          borderColor: "primary.main",
        },
      }}
    >
      <input {...getInputProps()} />
      <Box
        component="img"
        src={drop}
        alt="Upload Icon"
        sx={{
          width: 48,
          height: 48,
          mb: 1,
        }}
      />
      <Typography variant="h6" sx={{ color: "", fontWeight: 600 }}>
        Drop or select file
      </Typography>
      <Typography variant="caption" color="textSecondary">
        Drop files here or click to browse through your machine.
      </Typography>
    </Box>
  );
};

export default FileUpload;
