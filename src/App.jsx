import "./App.css";
import AnnouncementDashboard from "./Pages/Dashboard/AnnouncementPage";
import Header from "./Layout/Header";
import Navbar from "./Layout/Navbar";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    background: {
      default: '#f5f5f5' 
    }
  },
  components: {
    MuiButton: {
        styleOverrides: {
            root: {
                textTransform: 'none',
            }
        }
    }
  }
});

function App() {

  return (
    <>
   <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
        <Header />
        <Navbar />
        {/* Area konten utama */}
        <Box 
          component="main" 
          sx={{ 
            flexGrow: 1, 
            overflow: 'auto', 
            p: 3 
          }}
        >
          <AnnouncementDashboard />
        </Box>
      </Box>
    </ThemeProvider>
    </>
  );
}

export default App;
