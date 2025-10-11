import React, { useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Breadcrumbs,
  Typography,
  Chip,
  Divider,
} from "@mui/material";
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
} from "@mui/icons-material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

const navItems = [
  { label: "Dashboard", icon: <Dashboard /> },
  { label: "Organization", icon: <CorporateFare /> },
  { label: "Attendance", icon: <CoPresent /> },
  { label: "Leave", icon: <Logout /> },
  { label: "Claim", icon: <ReceiptLong /> },
  { label: "Workspace", icon: <Work /> },
  { label: "Overtime", icon: <Schedule /> },
  { label: "Inventory", icon: <Inventory /> },
  { label: "Configuration", icon: <Settings /> },
];

const Navbar = () => {
  const [value, setValue] = useState(1); // tab aktif: Organization

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const breadcrumbs = [
    <Typography key="1" color="inherit" variant="body2">
      Dashboard
    </Typography>,
    <Chip
      key="2"
      label="Organization"
      size="small"
      sx={{ fontWeight: "bold" }}
    />,
  ];

  return (
    <Box sx={{ bgcolor: "#fff", borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="navigation tabs"
      >
        {navItems.map((item, index) => (
          <Tab
            key={item.label}
            icon={item.icon}
            iconPosition="start"
            label={
              index === 1 ? (
                <Breadcrumbs
                  separator={<NavigateNextIcon fontSize="small" />}
                  aria-label="breadcrumb"
                >
                  {breadcrumbs}
                </Breadcrumbs>
              ) : (
                item.label
              )
            }
            sx={{
              textTransform: "none",
              fontWeight: 500,
              minHeight: "60px",
              px: 3,
            }}
          />
        ))}
      </Tabs>
      <Divider />
    </Box>
  );
};

export default Navbar;
