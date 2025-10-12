/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  ButtonGroup,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import StatCard from "../../Components/StatCard";
import { stats, announcements } from "../../Services/Data"; 
import AnnouncementCard from "../../Components/AnnouncementCard";
import { useNavigate } from "react-router-dom";

const AnnouncementPage = () => {
  const [filter, setFilter] = useState("All");
const navigate = useNavigate();
  const handleFilterChange = (event, newFilter) => {
    if (newFilter !== null) {
      setFilter(newFilter);
    }
  };

  const filteredAnnouncements = announcements.filter((ann) => {
    if (filter === "All") {
      return true;
    }
    return ann.status === filter;
  });

  return (
    <Container
      maxWidth="xl"
      sx={{ mt: 4, display: "flex", flexDirection: "column", gap: 4, pb: 5 }}
    >
      {/* Header */}
      <Typography variant="h5" component="h1" fontWeight="bold" textAlign="start">
        Announcement
      </Typography>

      {/* Stats */}
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item size={3} key={stat.title}>
            <StatCard icon={stat.icon} title={stat.title} count={stat.count} color={stat.color} />
          </Grid>
        ))}
      </Grid>

      {/* Filter & Action */}
      <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap" gap={2}>
        <ButtonGroup variant="outlined" aria-label="filter buttons" sx={{ "& .MuiButton-root": { textTransform: "none", borderRadius: "8px" } }}>
          <Button variant={filter === 'All' ? 'contained' : 'outlined'} onClick={() => setFilter('All')}>All</Button>
          <Button variant={filter === 'Published' ? 'contained' : 'outlined'} onClick={() => setFilter('Published')}>Published</Button>
          <Button variant={filter === 'Draft' ? 'contained' : 'outlined'} onClick={() => setFilter('Draft')}>Draft</Button>
          <Button variant={filter === 'Unpublished' ? 'contained' : 'outlined'} onClick={() => setFilter('Unpublished')}>Unpublished</Button>
        </ButtonGroup>

        <IconButton
          color="primary"
          aria-label="Tambah pengumuman baru"
          sx={{ bgcolor: "primary.main", color: "white", borderRadius: "10px", width: 40, height: 40, "&:hover": { bgcolor: "primary.dark" } }}
          onClick={() => navigate("/Organization/CreateAnnouncement")}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Announcements List */}
      <Grid container spacing={3} sx={{ mt: 1, alignItems: "stretch" }}>
        {filteredAnnouncements.map((announcement) => (
          <Grid item key={announcement.id} size={4} sx={{ display: "flex" }}>
            <AnnouncementCard announcement={announcement} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AnnouncementPage;