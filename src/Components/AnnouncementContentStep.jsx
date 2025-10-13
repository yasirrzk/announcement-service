import React from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Chip, 
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import FileUpload from "../Components/FileUpload";
import { useAnnouncementForm } from "../Hooks/UseAnnouncementForm"; 

const quillModules = {
    toolbar: [
        [{ header: "1" }, { header: "2" }, { font: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [
            { list: "ordered" },
            { list: "bullet" },
            { indent: "-1" },
            { indent: "+1" },
        ],
        ["link", "image", "video"],
        ["clean"],
    ],
};

const AnnouncementContentStep = () => {
  const {
    formData,
    handleChange,
    handleQuillChange,
    handleFileDrop,
    handleRemoveFile,
  } = useAnnouncementForm();

  const availableTags = ["Urgent", "Important", "Update", "Event"];

  return (
    <Box component="form" noValidate autoComplete="off">
       {/* Post Title */}
       <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Post Title
        </Typography>
        <TextField
          fullWidth
          name="postTitle"
          placeholder="Iklan"
          value={formData.postTitle}
          onChange={handleChange}
        />
      </Box>

      {/* Description */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Description
        </Typography>
        <TextField
          fullWidth
          name="description"
          placeholder="Iklan"
          value={formData.description}
          onChange={handleChange}
          multiline
          rows={2}
        />
      </Box>

      {/* Announcement Covers */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Announcement Covers
        </Typography>
        <FileUpload
          onDrop={(files) => handleFileDrop("announcementCover", files)}
          file={formData.announcementCover}
          onRemove={() => handleRemoveFile("announcementCover")}
        />
      </Box>

      {/* Page Cover */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Page Cover
        </Typography>
        <FileUpload
          onDrop={(files) => handleFileDrop("pageCover", files)}
          file={formData.pageCover}
          onRemove={() => handleRemoveFile("pageCover")}
        />
      </Box>

      {/* Announcement Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Announcement Details
        </Typography>
        <Box
          sx={{
            ".ql-editor": {
              minHeight: "200px",
              bgcolor: "rgba(14, 165, 233, 0.08)",
            },
          }}
        >
          <ReactQuill
            theme="snow"
            value={formData.details}
            onChange={handleQuillChange}
            modules={quillModules}
          />
        </Box>
      </Box>

      {/* Tags */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Tags
        </Typography>
        <FormControl fullWidth>
          <Select
            multiple
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            input={<OutlinedInput label="Tags" />} 
            renderValue={(selected) => (
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip key={value} label={value} />
                ))}
              </Box>
            )}
          >
            {availableTags.map((tag) => (
              <MenuItem key={tag} value={tag}>
                {tag}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
    </Box>
  );
};

export default AnnouncementContentStep;