import React from 'react';
import { Container, Grid, Typography, Box, Button, ButtonGroup, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import StatCard from '../../Components/StatCard'; 
import AnnouncementCard from '../../Components/StatCard';
import { stats, announcements } from '../../Services/Data';

const AnnouncementPage = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4, bgcolor: '#f5f5f5', p: 3 }}>
      {/* Header */}
      <Typography variant="h4" component="h1" gutterBottom fontWeight="bold">
        Announcement
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3} mb={4}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.title}>
            {/* Pastikan Anda membuat komponen StatCard.jsx */}
            <StatCard icon={stat.icon} title={stat.title} count={stat.count} color={stat.color} />
          </Grid>
        ))}
      </Grid>

      {/* Filter and Actions */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <ButtonGroup variant="contained" aria-label="filter button group">
          <Button>All</Button>
          <Button variant="outlined">Published</Button>
          <Button variant="outlined">Draft</Button>
          <Button variant="outlined">Unpublished</Button>
        </ButtonGroup>
        <IconButton color="primary" sx={{ bgcolor: 'primary.main', color: 'white', '&:hover': { bgcolor: 'primary.dark' } }}>
          <AddIcon />
        </IconButton>
      </Box>

      {/* Announcement Cards */}
      <Grid container spacing={3}>
        {announcements.map((announcement, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <AnnouncementCard announcement={announcement} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default AnnouncementPage;