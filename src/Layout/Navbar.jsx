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
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import {
  attendance,
  claim,
  configuration,
  dashboard,
  inventory,
  leave,
  organization,
  overtime,
  workspace,
} from "../assets/Icons/icons";

const navItems = [
  { label: "Dashboard", icon: dashboard },
  { label: "Organization", icon: organization },
  { label: "Attendance", icon: attendance },
  { label: "Leave", icon: leave },
  { label: "Claim", icon: claim },
  { label: "Workspace", icon: workspace },
  { label: "Overtime", icon: overtime },
  { label: "Inventory", icon: inventory },
  { label: "Configuration", icon: configuration },
];

const Navbar = () => {
  const [value, setValue] = useState(1);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const breadcrumbs = [
    <Typography key="1" color="inherit" variant="body2">
      Organization
    </Typography>,
    <Chip key="2" label="" size="small" sx={{ fontWeight: "bold" }} />,
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
            icon={
              <img src={item.icon} alt={item.label} width="20" height="20" />
            }
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
