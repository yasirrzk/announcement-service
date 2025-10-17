import React, { useEffect, useRef } from "react";
import {
  Box,
  TextField,
  Typography,
  FormControl,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  InputLabel,
} from "@mui/material";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../Styles/quill-better-table.css";
import QuillTableBetter from "quill-table-better";
import FileUpload from "../Components/FileUpload";
import { useAnnouncementForm } from "../Hooks/UseAnnouncementForm";

Quill.register(
  {
    "modules/better-table": QuillTableBetter,
  },
  true
);

const quillModules = {
  toolbar: {
    container: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },  
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["insertTable"],
      ["clean"],
    ],
  },
  "better-table": {
    operationMenu: {
      items: {
        unmergeCells: {
          text: "Unmerge cells",
        },
      },
    },
  },
  keyboard: {
    bindings: QuillTableBetter.keyboardBindings,
  },
};

const AnnouncementContentStep = () => {
  const {
    formData,
    handleChange,
    handleQuillChange,
    handleFileDrop,
    handleRemoveFile,
  } = useAnnouncementForm();

  const quillRef = useRef(null); 

  useEffect(() => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const toolbar = quill.getModule("toolbar");
    if (toolbar) {
      toolbar.addHandler("insertTable", () => {
        const betterTable = quill.getModule("better-table");
        if (betterTable) {
          betterTable.insertTable(3, 3);
        }
      });
    }
  }, []);

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
            ref={quillRef}
            theme="snow"
            value={formData.details}
            onChange={handleQuillChange}
            modules={quillModules}
          />
        </Box>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Tags
        </Typography>
        <FormControl fullWidth>
          <InputLabel id="tags-select-label">Tags</InputLabel>
          <Select
            labelId="tags-select-label"
            multiple
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            input={<OutlinedInput label="Tags" />}
            renderValue={(selected) => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {selected.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => {
                      const newTags = formData.tags.filter((tag) => tag !== value);
                      handleChange({ target: { name: 'tags', value: newTags } });
                    }}
                    onMouseDown={(event) => event.stopPropagation()}
                  />
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