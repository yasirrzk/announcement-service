import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  CardActions,
  IconButton,
  Stack,
  Avatar,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";
import { getAnnouncements } from "../Services/Data";

const statusColors = {
  published: "success",
  draft: "warning",
  unpublished: "error",
};

const AnnouncementCard = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      setLoading(true);
      try {
        const res = await getAnnouncements();
        console.log("📢 Data dari API:", res);
        setAnnouncements(res);
      } catch (err) {
        console.error("❌ Gagal memuat data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, []);

  if (loading) return <Typography>Loading announcements...</Typography>;
  if (!announcements || announcements.length === 0)
    return <Typography>Tidak ada pengumuman ditemukan.</Typography>;

  return (
    <Grid container spacing={3} sx={{ mt: 1, alignItems: "stretch" }}>
      {announcements.map((announcement) => (
        <Grid item key={announcement.id} xs={12} sm={6} md={4} size={4}>
          <SingleAnnouncementCard announcement={announcement} />
        </Grid>
      ))}
    </Grid>
  );
};

const SingleAnnouncementCard = ({ announcement }) => {
  const {
    title,
    description,
    announcement_cover_url,
    status,
    views_count,
    likes_count,
    comments_count,
    shares_count,
    created_at,
    publish_date,
    employees,
    announcement_tags,
    enable_comments,
  } = announcement;

  const defaultImage =
    "https://via.placeholder.com/400x200.png?text=No+Image+Available";

  const handleImageError = (e) => (e.target.src = defaultImage);

  const formatDate = (dateString) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <Card
      elevation={3}
      sx={{
        border: "0.2px solid #e0e0e0",
        borderRadius: 4,
        overflow: "hidden",
        width: "100%",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
          cursor: "pointer",
        },
        display: "flex",
        flexDirection: "column",
        height: "100%",
      }}
    >
      {/* Gambar */}
      <CardMedia
        component="img"
        height="160"
        image={announcement_cover_url || defaultImage}
        alt={title}
        onError={handleImageError}
        sx={{ padding: "10px" }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 1 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Chip
            label={status || "draft"}
            color={statusColors[status?.toLowerCase()] || "default"}
            size="small"
            sx={{
              fontSize: "0.7rem",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {formatDate(created_at)}
          </Typography>
        </Box>

        <Typography
          gutterBottom
          variant="subtitle1"
          fontWeight="bold"
          sx={{
            mb: 0.5,
            lineHeight: 1.3,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            mb: 2,
            lineHeight: 1.5,
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </Typography>

        {employees && (
          <Box display="flex" alignItems="center" mb={1}>
            <Avatar
              src={employees.avatar_url}
              alt={employees.full_name}
              sx={{ width: 32, height: 32, mr: 1 }}
            >
              {employees.full_name?.charAt(0)}
            </Avatar>
            <Box>
              <Typography variant="body2" fontWeight="medium">
                {employees.full_name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {employees.position}
              </Typography>
            </Box>
          </Box>
        )}

        {announcement_tags && announcement_tags.length > 0 && (
          <Box display="flex" gap={0.5} flexWrap="wrap" mb={1}>
            {announcement_tags.slice(0, 3).map((tag) => (
              <Chip
                key={tag.id}
                label={tag.tag_name}
                size="small"
                variant="outlined"
                sx={{ fontSize: "0.65rem", height: 20 }}
              />
            ))}
          </Box>
        )}

        {publish_date && status === "published" && (
          <Typography
            variant="caption"
            color="primary"
            display="block"
            mb={0.5}
          >
            📅 Published: {formatDate(publish_date)}
          </Typography>
        )}

        {enable_comments && (
          <Typography variant="caption" color="text.secondary" display="block">
            💬 Comments enabled
          </Typography>
        )}
      </CardContent>

      <CardActions
        sx={{
          mt: "auto",
          justifyContent: "space-between",
          px: 2,
          pb: 1.5,
          pt: 0,
        }}
      >
        <IconButton size="small">
          <MoreHorizIcon fontSize="small" />
        </IconButton>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Stack direction="row" spacing={0.3} alignItems="center">
            <VisibilityIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="caption" fontWeight="medium">
              {views_count ?? 0}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.3} alignItems="center">
            <FavoriteIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="caption" fontWeight="medium">
              {likes_count ?? 0}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.3} alignItems="center">
            <ChatBubbleOutlineIcon
              sx={{ fontSize: 16, color: "text.secondary" }}
            />
            <Typography variant="caption" fontWeight="medium">
              {comments_count ?? 0}
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.3} alignItems="center">
            <ShareIcon sx={{ fontSize: 16, color: "text.secondary" }} />
            <Typography variant="caption" fontWeight="medium">
              {shares_count ?? 0}
            </Typography>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default AnnouncementCard;
