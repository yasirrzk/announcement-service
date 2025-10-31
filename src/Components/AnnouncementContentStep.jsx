import React, { useEffect, useMemo, useRef } from "react";
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
  Button,
  Stack,
  CircularProgress, 
} from "@mui/material";
import ReactQuill, { Quill } from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import QuillTableBetter from "quill-table-better";
import "quill-table-better/dist/quill-table-better.css";
import FileUpload from "../Components/FileUpload";

Quill.register({ "modules/table-better": QuillTableBetter }, true);

const AnnouncementContentStep = ({
  onNext,
  onPreview,
  formData,
  isLoading, 
  handleChange, 
  handleQuillChange, 
  handleFileDrop, 
  handleRemoveFile, 
}) => {
  const quillRef = useRef(null);

  const quillModules = useMemo(
    () => ({
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
          ["clean"],
          ["tableUI"],
          ["table-better"],
        ],
      },
      table: false,
      "table-better": {
        language: "en_US",
        menus: [
          "column",
          "row",
          "merge",
          "table",
          "cell",
          "wrap",
          "copy",
          "delete",
        ],
        toolbarTable: true,
      },
      keyboard: {
        bindings: QuillTableBetter.keyboardBindings,
      },
    }),
    []
  );


  useEffect(() => {
    if (isLoading) return;

    const quill = quillRef.current?.getEditor();
    if (!quill) return;

    const toolbar = quill.getModule("toolbar");
    if (toolbar) {
      toolbar.addHandler("insertTable", () => {
        const betterTable = quill.getModule("better-table");
        if (betterTable) betterTable.insertTable(3, 3);
      });
    }
  }, [isLoading]);

  const availableTags = ["Urgent", "Important", "Update", "Event"];

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: 400,
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  
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
          placeholder="Deskripsi pengumuman..."
          value={formData.description}
          onChange={handleChange} 
          multiline
          rows={2}
        />
      </Box>

      {/* File Uploads */}
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
            theme={"snow"}
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
                    onDelete={() =>
                      handleChange({
                        target: {
                          name: "tags",
                          value: formData.tags.filter((t) => t !== value),
                        },
                      })
                    }
                    onMouseDown={(e) => e.stopPropagation()}
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

      {/* Tombol Aksi */}
      <Stack direction="row" justifyContent="flex-end" spacing={2} mt={4}>
        <Button variant="outlined" color="secondary" onClick={onPreview}>
          Preview
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default AnnouncementContentStep;