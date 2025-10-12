import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  Card,
  CardContent,
  Typography,
  FormControl,
  Select,
  MenuItem,
  Chip,
  Stack,
} from "@mui/material";
import {
  CloudUpload as CloudUploadIcon,
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  FormatListBulleted,
  FormatListNumbered,
  FormatAlignLeft,
  FormatAlignCenter,
  FormatAlignRight,
  Link as LinkIcon,
  Image as ImageIcon,
  AttachFile as AttachFileIcon,
  Code as CodeIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

const CreateAnnouncement = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [postTitle, setPostTitle] = useState("");
  const [description, setDescription] = useState("");
  const [announcementDetails, setAnnouncementDetails] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);

  const steps = ["Contents", "Recipient", "Schedule"];

  const handleNext = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleTagChange = (event) => {
    setSelectedTags(event.target.value);
  };

  const uploadArea = (label) => (
    <Box
      sx={{
        border: "2px dashed #E0E0E0",
        borderRadius: "8px",
        padding: "40px 20px",
        textAlign: "center",
        backgroundColor: "#F0F8FF",
        cursor: "pointer",
        transition: "all 0.3s ease",
        "&:hover": {
          borderColor: "rgba(99, 179, 237, 1)",
          backgroundColor: "#E6F7FF",
        },
      }}
    >
      <CloudUploadIcon sx={{ fontSize: "48px", color: "#00BFFF", mb: 1 }} />
      <Typography
        variant="subtitle1"
        sx={{ color: "#00BFFF", fontWeight: 600 }}
      >
        Drop or select file
      </Typography>
      <Typography variant="caption" sx={{ color: "#888" }}>
        Drop files here or click to browse through your machine.
      </Typography>
    </Box>
  );

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 1 }}>
          Create Announcement
        </Typography>
        <Typography variant="body2" sx={{ color: "#666" }}>
          Organization &gt; Announcement &gt; Create Announcement
        </Typography>
      </Box>

      {/* Stepper */}
      <Box sx={{ mb: 4 }}>
        <Stepper activeStep={activeStep}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Box>

      {/* Step 1: Contents */}
      {activeStep === 0 && (
        <Box>
          {/* Post Title */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Post Title
            </Typography>
            <TextField
              fullWidth
              placeholder="Enter post title"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
              variant="outlined"
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F5F5",
                },
              }}
            />
          </Box>

          {/* Description */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              Description
            </Typography>
            <TextField
              fullWidth
              placeholder="Start"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              variant="outlined"
              size="small"
              multiline
              rows={2}
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F5F5F5",
                },
              }}
            />
          </Box>

          {/* Announcement Covers */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Announcement Covers
            </Typography>
            {uploadArea("Announcement Covers")}
          </Box>

          {/* Page Cover */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Page Cover
            </Typography>
            {uploadArea("Page Cover")}
          </Box>

          {/* Announcement Details */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Announcement Details
            </Typography>

            {/* Text Editor Toolbar */}
            <Box
              sx={{
                display: "flex",
                gap: 0.5,
                flexWrap: "wrap",
                p: 1,
                backgroundColor: "#F5F5F5",
                borderRadius: "4px 4px 0 0",
                borderBottom: "1px solid #E0E0E0",
              }}
            >
              <FormControl size="small" sx={{ minWidth: 100 }}>
                <Select
                  defaultValue="heading"
                  sx={{ backgroundColor: "white" }}
                >
                  <MenuItem value="heading">Heading 1</MenuItem>
                  <MenuItem value="body">Body</MenuItem>
                  <MenuItem value="code">Code</MenuItem>
                </Select>
              </FormControl>

              <Box sx={{ display: "flex", gap: 0.5, ml: 1 }}>
                <Button size="small" variant="text">
                  <FormatBold sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <FormatItalic sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <FormatUnderlined sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <FormatListBulleted sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <FormatListNumbered sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <FormatAlignLeft sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <FormatAlignCenter sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <FormatAlignRight sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <LinkIcon sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <ImageIcon sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <AttachFileIcon sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <CodeIcon sx={{ fontSize: 18 }} />
                </Button>
                <Button size="small" variant="text">
                  <MoreVertIcon sx={{ fontSize: 18 }} />
                </Button>
              </Box>
            </Box>

            {/* Editor Area */}
            <TextField
              fullWidth
              multiline
              rows={8}
              value={announcementDetails}
              onChange={(e) => setAnnouncementDetails(e.target.value)}
              variant="outlined"
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "0 0 4px 4px",
                  backgroundColor: "#F9F9F9",
                },
              }}
            />
          </Box>

          {/* Tags */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 2 }}>
              Tags
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                multiple
                value={selectedTags}
                onChange={handleTagChange}
                placeholder="Select Tags"
                sx={{
                  backgroundColor: "#F5F5F5",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#F5F5F5",
                  },
                }}
              >
                <MenuItem value="urgent">Urgent</MenuItem>
                <MenuItem value="important">Important</MenuItem>
                <MenuItem value="update">Update</MenuItem>
                <MenuItem value="announcement">Announcement</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Box>
      )}

      {/* Step 2 & 3 Placeholder */}
      {activeStep > 0 && (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" sx={{ color: "#999" }}>
            Step {activeStep + 1}: {steps[activeStep]}
          </Typography>
          <Typography variant="body2" sx={{ color: "#999", mt: 1 }}>
            Content for this step will be displayed here
          </Typography>
        </Box>
      )}

      {/* Action Buttons */}
      <Stack
        direction="row"
        spacing={2}
        sx={{ mt: 4, justifyContent: "flex-end" }}
      >
        <Button
          variant="outlined"
          onClick={handleBack}
          disabled={activeStep === 0}
        >
          Back
        </Button>
        <Button variant="outlined">Preview</Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            backgroundColor: "#87CEEB",
            color: "white",
            "&:hover": {
              backgroundColor: "#5DADE2",
            },
          }}
        >
          {activeStep === steps.length - 1 ? "Submit" : "Next"}
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateAnnouncement;
