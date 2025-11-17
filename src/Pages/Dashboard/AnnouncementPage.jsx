import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  ButtonGroup,
  IconButton,
  CircularProgress,
  Stack,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StatCard from "../../Components/StatCard";
import AnnouncementCard from "../../Components/AnnouncementCard";
import { useNavigate } from "react-router-dom";
import { getAnnouncementStats, getAnnouncements } from "../../Services/Data";

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
  const statusMapping = {
    All: "",
    Published: "published",
    Draft: "draft",
    Unpublished: "unpublished",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const statsData = await getAnnouncementStats();
        setStats(statsData.data || {});

        const statusParam = statusMapping[filter];

        const announcementsData = await getAnnouncements(statusParam, 1, 10);

        console.log("FILTER:", filter);
        console.log("STATUS PARAM:", statusParam);
        console.log("API DATA:", announcementsData);

        setAnnouncements(announcementsData);
      } catch (err) {
        console.error("❌ Error fetching announcements:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4, pb: 5 }}
    >
      {/* Header */}
      <Typography
        variant="h5"
        component="h1"
        fontWeight="bold"
        textAlign="start"
      >
        Announcement
      </Typography>

      {/* Stats */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3} sx={{ width: "100%" }}>
          <StatCard />
        </Grid>
      </Grid>

      {/* Filter & Action */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexWrap="wrap"
        gap={2}
      >
        {/* <ButtonGroup
          variant="outlined"
          aria-label="filter buttons"
          sx={{
            "& .MuiButton-root": {
              textTransform: "none",
              borderRadius: "8px",
            },
          }}
        > */}
        <Stack direction="row" spacing={1}>
          {["All", "Published", "Draft", "Unpublished"].map((item, index) => (
            <Button
              key={index}
              variant={filter === item ? "contained" : "outlined"}
              onClick={() => setFilter(item)}
            >
              {item}
            </Button>
          ))}
        </Stack>
        {/* </ButtonGroup> */}

        <IconButton
          color="primary"
          aria-label="Tambah pengumuman baru"
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

      {/* Announcements List */}
      <Grid container spacing={3} sx={{ mt: 1, alignItems: "stretch" }}>
        {announcements && announcements.length > 0 ? (
          announcements.map((announcement) => (
            <Grid
              item
              key={announcement.id}
              xs={12}
              sm={6}
              md={4}
              onClick={() => navigate(`/announcement/${announcement.id}`)}
            >
              <AnnouncementCard announcement={announcement} />
            </Grid>
          ))
        ) : (
          <Typography>No announcements found</Typography>
        )}
      </Grid>
    </Container>
  );
};

export default AnnouncementPage;
