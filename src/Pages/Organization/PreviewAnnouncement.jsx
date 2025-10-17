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
      {/* Cover */}
      {data.pageCover && (
        <Box
          sx={{
            borderRadius: 2,
            overflow: "hidden",
            mb: 4,
          }}
        >
          <img
            src={data.pageCover}
            alt="Page Cover"
            style={{ width: "100%", height: 300, objectFit: "cover" }}
          />
        </Box>
      )}

      {/* Judul */}
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        {data.postTitle}
      </Typography>

      {/* Avatar + tanggal */}
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

      {/* Deskripsi */}
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

      {/* Detail */}
      <Box
        sx={{
          "& img": { maxWidth: "100%" },
          "& p": { mb: 2 },
        }}
        dangerouslySetInnerHTML={{ __html: data.details }}
      />

      {/* Tags */}
      <Stack direction="row" spacing={1} mt={3} flexWrap="wrap">
        {data.tags?.map((tag, i) => (
          <Chip key={i} label={tag} />
        ))}
      </Stack>

      {/* Tombol Back */}
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
