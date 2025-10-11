import React from "react";
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

const AnnouncementPage = () => {
  return (
    <Container maxWidth="xl" sx={{ mt: 3 }}>
      {/* Header */}
      <Typography
        variant="h5"
        component="h1"
        gutterBottom
        fontWeight="bold"
        textAlign="start"
      >
        Announcement
      </Typography>

      {/* Stats */}
      <Grid container spacing={3} justifyContent="center" mb={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            <StatCard
              icon={stat.icon}
              title={stat.title}
              count={stat.count}
              color={stat.color}
            />
          </Grid>
        ))}
      </Grid>

      {/* Filter & Action */}
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <ButtonGroup variant="outlined" aria-label="filter buttons">
          <Button variant="contained">All</Button>
          <Button>Published</Button>
          <Button>Draft</Button>
          <Button>Unpublished</Button>
        </ButtonGroup>
        <IconButton
          color="primary"
          sx={{
            bgcolor: "primary.main",
            color: "white",
            "&:hover": { bgcolor: "primary.dark" },
          }}
        >
          <AddIcon />
        </IconButton>
      </Box>

      {/* Announcements List */}
      <Grid container spacing={3}>
        {announcements.map((announcement, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <AnnouncementCard announcement={announcement} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AnnouncementPage;
