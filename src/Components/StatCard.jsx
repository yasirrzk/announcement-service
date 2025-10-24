import React, { useEffect, useState } from 'react';
import { Paper, Typography, Box, Avatar, Grid } from '@mui/material';
import { getAnnouncementStats } from '../Services/Data';
import CampaignIcon from '@mui/icons-material/Campaign';
import DraftsIcon from '@mui/icons-material/Drafts';
import PublicIcon from '@mui/icons-material/Public';
import UnpublishedIcon from '@mui/icons-material/Unpublished';

const StatCard = () => {
  const [stats, setStats] = useState({
    totalAnnouncement: 0,
    totalPublished: 0,
    totalDraft: 0,
    totalUnpublished: 0,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const statsRes = await getAnnouncementStats();
        console.log("📊 Stats fetched:", statsRes);
        
        // Set stats dari response API
        if (statsRes && statsRes.data) {
          setStats(statsRes.data);
        }
      } catch (error) {
        console.error("❌ Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const cards = [
    {
      title: 'Total Pengumuman',
      count: stats.totalAnnouncement,
      icon: <CampaignIcon />,
      color: '#2196f3',
    },
    {
      title: 'Published',
      count: stats.totalPublished,
      icon: <PublicIcon />,
      color: '#4caf50',
    },
    {
      title: 'Draft',
      count: stats.totalDraft,
      icon: <DraftsIcon />,
      color: '#ff9800',
    },
    {
      title: 'Unpublished',
      count: stats.totalUnpublished,
      icon: <UnpublishedIcon />,
      color: '#f44336',
    },
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <Paper
            elevation={3}
            sx={{
              p: 2,
              display: 'flex',
              alignItems: 'center',
              borderLeft: `5px solid ${card.color}`,
            }}
          >
            <Avatar sx={{ bgcolor: card.color, mr: 2 }}>
              {card.icon}
            </Avatar>
            <Box>
              <Typography variant="h6">{card.title}</Typography>
              <Typography variant="h5" fontWeight="bold">
                {loading ? '...' : card.count}
              </Typography>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default StatCard;