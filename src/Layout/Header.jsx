// src/Components/Layout/Header.jsx
import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton, Avatar } from '@mui/material';
import { Search, NotificationsOutlined, SettingsOutlined } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar 
      position="static" 
      elevation={0} 
      sx={{ 
        bgcolor: 'rgba(26, 32, 44, 1)',
        borderBottom: '1px solid #34495e' 
      }}
    >
      <Toolbar>
        {/* Sisi Kiri */}
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
          OFA
        </Typography>
        <Box sx={{ borderLeft: '1px solid #4a6572', height: 24, mx: 2 }} />
        <Typography variant="body1" component="div">
          Dashboard
        </Typography>

        {/* Spacer */}
        <Box sx={{ flexGrow: 1 }} />

        {/* Sisi Kanan */}
        <IconButton color=" rgba(113, 128, 150, 1)">
          <Search />
        </IconButton>
        <IconButton color="rgba(113, 128, 150, 1)">
          <NotificationsOutlined />
        </IconButton>
        

        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Avatar sx={{ width: 40, height: 40, bgcolor: 'orange' }}>I</Avatar>
          <Box sx={{ ml: 1.5 }}>
            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>Iphone Doe</Typography>
            <Typography variant="caption" sx={{ color: 'text.secondary' }}>
              UI UX, Super Admin
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;