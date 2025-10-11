import "./App.css";
import AnnouncementPage from "./Pages/Dashboard/AnnouncementPage";
import Header from "./Layout/Header";
import Navbar from "./Layout/Navbar";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: "#f5f5f5",
      paper: "#ffffff"
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: { textTransform: "none" },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Header />
        <Navbar />
        {/* Konten utama */}
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            overflowY: "auto",
            px: 4,
            py: 3,
            bgcolor: "background.default",
          }}
        >
          <AnnouncementPage />
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
