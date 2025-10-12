import React from 'react';
import { Paper, Typography, Box, Avatar } from '@mui/material';

const StatCard = ({ icon, title, count, color }) => {
  return (
    <Paper elevation={2} sx={{ p: 2, width:'100%' , gap:2 ,borderRadius:'8px', display: 'flex', flexDirection:"column", justifyContent: 'center' }}>
      <Avatar sx={{ bgcolor: color, mr: 2 }}>
        {icon}
      </Avatar>
      <Box>
        <Typography variant="body2" color="text.secondary">{title}</Typography>
        <Typography variant="h5" component="p" fontWeight="bold">{count}</Typography>
      </Box>
    </Paper>
  );
};

export default StatCard;