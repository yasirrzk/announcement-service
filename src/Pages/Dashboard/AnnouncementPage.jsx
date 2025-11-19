import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StatCard from "../../Components/StatCard";
import AnnouncementCard from "../../Components/AnnouncementCard";
import { useNavigate } from "react-router-dom";
import { getAnnouncementStats, getAnnouncements } from "../../Services/Data";

const STATUS_MAPPING = {
  All: "",
  Published: "published",
  Draft: "draft",
  Unpublished: "unpublished",
};

const AnnouncementPage = () => {
  const [filter, setFilter] = useState("All");
  const [stats, setStats] = useState({
    totalAnnouncement: 0,
    totalPublished: 0,
    totalDraft: 0,
    totalUnpublished: 0,
  });
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        setLoading(true);
        setAnnouncements([]);

        const statsData = await getAnnouncementStats();
        if (!isMounted) return;
        setStats(statsData.data || {});

        const statusParam = STATUS_MAPPING[filter];
        const announcementsData = await getAnnouncements(statusParam, 1, 10);

        if (!isMounted) return;
        setAnnouncements(announcementsData);
      } catch (err) {
        console.error("❌ Error:", err);
        if (isMounted) setAnnouncements([]);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filter]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ mt: 4, pb: 5 }}>
      <Typography variant="h5" component="h1" fontWeight="bold" mb={4}>
        Announcement
      </Typography>

      <Box mb={4}>
        <StatCard />
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={4}
      >
        <Stack direction="row" spacing={1}>
          {["All", "Published", "Draft", "Unpublished"].map((item) => (
            <Button
              key={item}
              variant={filter === item ? "contained" : "outlined"}
              onClick={() => setFilter(item)}
            >
              {item}
            </Button>
          ))}
        </Stack>

        <IconButton
          sx={{
            bgcolor: "primary.main",
            color: "white",
            borderRadius: "10px",
            width: 40,
            height: 40,
            "&:hover": { bgcolor: "primary.dark" },
          }}
          onClick={() => navigate("/organization/create-announcement")}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* ✅ BOX FLEX - 3 CARDS PER BARIS */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 3,
        }}
      >
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Box
              key={announcement.id}
              onClick={() => navigate(`/announcement/${announcement.id}`)}
              sx={{
                flexBasis: {
                  xs: "100%",
                  sm: "calc(50% - 12px)",
                  md: "calc(33.333% - 16px)",
                },
                cursor: "pointer",
              }}
            >
              <AnnouncementCard announcement={announcement} />
            </Box>
          ))
        ) : (
          <Typography>No announcements found</Typography>
        )}
      </Box>
    </Container>
  );
};

export default AnnouncementPage;