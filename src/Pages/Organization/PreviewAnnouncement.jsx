import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Avatar,
  Stack,
  Chip,
  Button,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";

// WAJIB supaya tabel tampil di preview
import "react-quill-new/dist/quill.snow.css";
import "quill-table-better/dist/quill-table-better.css";

const AnnouncementPreview = () => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const saved = localStorage.getItem("announcementFormData");
    if (saved) setData(JSON.parse(saved));
  }, []);

  if (!data) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      {/* Page Cover */}
      {data.pageCover && (
        <Box sx={{ borderRadius: 2, overflow: "hidden", mb: 4 }}>
          <img
            src={data.pageCover}
            alt="Page Cover"
            style={{ width: "100%", height: 300, objectFit: "cover" }}
          />
        </Box>
      )}

      {/* Title */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {data.postTitle}
      </Typography>

      {/* Avatar + Date */}
      <Stack direction="row" spacing={2} alignItems="center" mb={3}>
        <Avatar src="/default-avatar.png" />
        <Box>
          <Typography variant="body1" fontWeight={600}>
            Jhone Dae
          </Typography>
          <Typography variant="body2" color="text.secondary">
            17 Oct 2025
          </Typography>
        </Box>
      </Stack>

      {/* Description */}
      <Typography variant="body1" mb={3}>
        {data.description}
      </Typography>

      {/* Announcement Cover */}
      {data.announcementCover && (
        <Box sx={{ mb: 3 }}>
          <img
            src={data.announcementCover}
            alt="Announcement Cover"
            style={{ width: "100%", borderRadius: 10 }}
          />
        </Box>
      )}

      {/* DETAILS (HTML from Quill) */}
      <Box
        sx={{
          "& img": { maxWidth: "100%" },
          "& p": { mb: 2 },

          "& table": {
            width: "100%",
            borderCollapse: "collapse",
            marginBottom: 2,
          },
          "& td, & th": {
            border: "1px solid #ccc",
            padding: "8px",
          },
        }}
        dangerouslySetInnerHTML={{ __html: data.details }}
      />

      {/* Tags */}
      <Stack direction="row" spacing={1} mt={3} flexWrap="wrap">
        {data.tags?.map((tag, i) => (
          <Chip key={i} label={tag} />
        ))}
      </Stack>

      {/* Back Button */}
      <Stack direction="row" justifyContent="flex-end" mt={4}>
        <Button
          variant="contained"
          startIcon={<ArrowBackIcon />}
          onClick={() => {
            localStorage.setItem("returningFromPreview", "true");
            navigate(-1);
          }}
        >
          Back
        </Button>
      </Stack>
    </Container>
  );
};

export default AnnouncementPreview;
