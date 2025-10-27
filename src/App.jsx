import "./App.css";
import AnnouncementPage from "./Pages/Dashboard/AnnouncementPage";
import CreateAnnouncement from "./Pages/Organization/CreateAnnouncement";
import Header from "./Layout/Header";
import Navbar from "./Layout/Navbar";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PreviewAnnouncement from "./Pages/Organization/PreviewAnnouncement";
import AnnouncementDetail from "./Pages/Dashboard/AnnouncementDetail";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          borderRadius: 2,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
        },
      },
    },
  },
  typography: {
    fontFamily: `"Inter", "Roboto", "Helvetica", "Arial", sans-serif`,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
          <Header />
          <Navbar />

          <Box
            component="main"
            sx={{
              flexGrow: 1,
              overflowY: "auto",
              px: { xs: 2, sm: 3, md: 4 },
              py: { xs: 2, sm: 3 },
              bgcolor: "background.default",
            }}
          >
            <Routes>
              <Route path="/" element={<AnnouncementPage />} />
              <Route path="/announcement" element={<AnnouncementPage />} />
              <Route path="/announcement/:id" element={<AnnouncementDetail />} />
              <Route path="/organization/create-announcement" element={<CreateAnnouncement />} />
              <Route path="/announcement/preview" element={<PreviewAnnouncement/>} />
              <Route path="/announcement/:id" element={<AnnouncementDetail/>}/>
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;
