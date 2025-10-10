// src/Components/Layout/Navbar.jsx
import React, { useState } from 'react';
import { Box, Tabs, Tab, Breadcrumbs, Typography, Chip } from '@mui/material';
import {
  Dashboard,
  CorporateFare,
  CoPresent,
  Logout,
  ReceiptLong,
  Work,
  Schedule,
  Inventory,
  Settings,
} from '@mui/icons-material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';


const navItems = [
  { label: 'Dashboard', icon: <Dashboard /> },
  { label: 'Organization', icon: <CorporateFare /> },
  { label: 'Attendance', icon: <CoPresent /> },
  { label: 'Leave', icon: <Logout /> },
  { label: 'Claim', icon: <ReceiptLong /> },
  { label: 'Workspace', icon: <Work /> },
  { label: 'Overtime', icon: <Schedule /> },
  { label: 'Inventory', icon: <Inventory /> },
  { label: 'Configuration', icon: <Settings /> },
];

const Navbar = () => {
  const [value, setValue] = useState(1); // Set 'Organization' sebagai tab aktif

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  
  // Untuk breadcrumbs di dalam tab "Organization"
  const breadcrumbs = [
    <Typography key="1" color="inherit" variant="body2">
      Dashboard
    </Typography>,
    <Chip key="2" label="Organization" size="small" sx={{ fontWeight: 'bold' }}/>,
  ];

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="nav tabs example"
      >
        {navItems.map((item, index) => (
          <Tab 
            key={item.label}
            icon={item.icon} 
            iconPosition="start"
            label={
              // Trik untuk menampilkan breadcrumbs di tab yang aktif
              index === 1 ? (
                <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
                  {breadcrumbs}
                </Breadcrumbs>
              ) : (
                item.label
              )
            }
            sx={{ textTransform: 'none', fontWeight: 'medium' }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default Navbar;