import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Chip,
  CardActions,
  IconButton,
  Stack,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ShareIcon from "@mui/icons-material/Share";

const statusColors = {
  Published: "success",
  Draft: "info",
  Unpublished: "error",
};

const AnnouncementCard = ({ announcement }) => {
  const { status, date, title, description, views, comments, shares, image } =
    announcement;

  return (
    <Card
      elevation={3}
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        transition: "transform 0.25s ease, box-shadow 0.25s ease",
        "&:hover": {
          transform: "translateY(-6px)",
          boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
        },
        display: "flex",
        flexDirection: "column",
        height: "100%", // biar semua card tingginya sama
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image={image}
        alt={title}
        sx={{
          objectFit: "cover",
        }}
      />

      <CardContent sx={{ flexGrow: 1, pb: 0 }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={1}
        >
          <Chip
            label={status}
            color={statusColors[status]}
            size="small"
            sx={{
              fontSize: "0.7rem",
              fontWeight: 500,
              textTransform: "capitalize",
            }}
          />
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        </Box>

        <Typography
          gutterBottom
          variant="subtitle1"
          fontWeight="bold"
          sx={{ mb: 0.5, lineHeight: 1.3 }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ mb: 2, lineHeight: 1.5 }}
        >
          {description}
        </Typography>
      </CardContent>

      <CardActions
        sx={{
          mt: "auto",
          justifyContent: "space-between",
          px: 2,
          pb: 1.5,
        }}
      >
        <IconButton size="small">
          <MoreHorizIcon fontSize="small" />
        </IconButton>

        <Stack direction="row" spacing={1.5} alignItems="center">
          <Stack direction="row" spacing={0.5} alignItems="center">
            <VisibilityIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2">{views}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <ChatBubbleOutlineIcon
              sx={{ fontSize: 18, color: "text.secondary" }}
            />
            <Typography variant="body2">{comments}</Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} alignItems="center">
            <ShareIcon sx={{ fontSize: 18, color: "text.secondary" }} />
            <Typography variant="body2">{shares}</Typography>
          </Stack>
        </Stack>
      </CardActions>
    </Card>
  );
};

export default AnnouncementCard;
