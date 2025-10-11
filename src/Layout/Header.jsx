import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Avatar,
  Divider,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import icon from "../assets/icon.png";
import icon2 from "../assets/icon.jpg";


const Header = () => {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "rgba(26, 32, 44, 1)",
        boxShadow: "none",
        height: 56,
        justifyContent: "center",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Kiri - Logo dan Dashboard */}
        <Box display="flex" alignItems="center" gap={2}>
          <Box display="flex" alignItems="center" gap={1}>
            <img src={icon} alt="logo" style={{ width: 28, height: 28 }} />
            <Typography
              variant="h6"
              sx={{ color: "white", fontWeight: 500, fontSize: "1rem" }}
            >
              OFA
            </Typography>
          </Box>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "white" }}
          />

          <Typography
            variant="body1"
            sx={{ color: "white", fontSize: "0.95rem" }}
          >
            Dashboard
          </Typography>
        </Box>

        {/* Kanan - Search, Notification, Profile */}
        <Box display="flex" alignItems="center" gap={2}>
          <IconButton sx={{ color: "rgba(113, 128, 150, 1)" }}>
            <SearchIcon />
          </IconButton>

          <IconButton sx={{ color: "rgba(113, 128, 150, 1)" }}>
            <NotificationsNoneIcon />
          </IconButton>

          <Divider
            orientation="vertical"
            flexItem
            sx={{ borderColor: "rgba(113, 128, 150, 1)" }}
          />

          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar
              alt="Jhone Dae"
              src={icon2}
              sx={{ width: 32, height: 32 }}
            />
            <Box>
              <Typography
                sx={{ color: "white", fontSize: "0.9rem", lineHeight: 1 }}
              >
                Jhone Dae
              </Typography>
              <Typography
                sx={{ color: "#9ca3af", fontSize: "0.75rem", lineHeight: 1 }}
              >
                UI UX, Super Admin
              </Typography>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
