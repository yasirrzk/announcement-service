import React, { useState } from 'react';
import { Box, TextField, Typography, FormControl, Select, MenuItem, OutlinedInput } from '@mui/material';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import FileUpload from '../Components/FileUpload'; 

const quillModules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
};

const AnnouncementContentStep = () => {
  const [formData, setFormData] = useState({
    postTitle: '',
    description: '',
    announcementCover: null,
    pageCover: null,
    details: '',
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData(prev => ({ ...prev, details: value }));
  };

  const handleFileDrop = (name, files) => {
    // Biasanya Anda hanya mengambil file pertama
    if (files.length > 0) {
      setFormData(prev => ({ ...prev, [name]: files[0] }));
      console.log(`File for ${name}:`, files[0]); // Untuk debugging
    }
  };

  const availableTags = ['Urgent', 'Important', 'Update', 'Event'];

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
        <FileUpload onDrop={(files) => handleFileDrop('announcementCover', files)} />
      </Box>

      {/* Page Cover */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Page Cover
        </Typography>
        <FileUpload onDrop={(files) => handleFileDrop('pageCover', files)} />
      </Box>

      {/* Announcement Details */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Announcement Details
        </Typography>
        {/* Menggunakan ReactQuill untuk text editor yang fungsional */}
        <Box sx={{ '.ql-editor': { minHeight: '200px' } }}>
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
            input={<OutlinedInput label="Select Tags" />}
            displayEmpty
            renderValue={(selected) => {
              if (selected.length === 0) {
                return <em>Select Tags</em>;
              }
              return selected.join(', ');
            }}
          >
            <MenuItem disabled value="">
              <em>Select Tags</em>
            </MenuItem>
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