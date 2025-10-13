import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Stepper,
  Step,
  StepLabel,
  Stack,
  Typography,
  Breadcrumbs,
  Link,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AnnouncementContentStep from "../../Components/AnnouncementContentStep";
import { useNavigate } from "react-router-dom";

const steps = ["Contents", "Recipient", "Schedule"];

const CreateAnnouncement = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const handleNavigateBack = () => {
    navigate("/announcement");
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <AnnouncementContentStep />;
      case 1:
        return <Typography>Recipient selection form goes here.</Typography>;
      case 2:
        return <Typography>Scheduling options go here.</Typography>;
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header dan Breadcrumbs */}
      <Stack spacing={1} mb={4}>
        <Breadcrumbs
          separator={<NavigateNextIcon fontSize="small" />}
          aria-label="breadcrumb"
        >
          <Link underline="hover" color="inherit" href="#">
            Organization
          </Link>
          <Link underline="hover" color="inherit" href="#">
            Announcement
          </Link>
          <Typography color="text.primary">Create Announcement</Typography>
        </Breadcrumbs>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={handleNavigateBack} aria-label="go back">
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" fontWeight={700}>
            Create Announcement
          </Typography>
        </Box>
      </Stack>

      {/* Stepper */}
      <Stepper activeStep={activeStep} sx={{ mb: 5 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {/* Konten Form*/}
      <Box>{getStepContent(activeStep)}</Box>

      {/* Tombol Aksi */}
      <Stack
        direction="row"
        justifyContent="flex-end"
        spacing={2}
        sx={{ mt: 4 }}
      >
        {activeStep !== 0 && (
          <Button variant="outlined" onClick={handleBack}>
            Back
          </Button>
        )}
        <Button variant="outlined" color="secondary">
          Preview
        </Button>
        <Button variant="contained" onClick={handleNext}>
          {activeStep === steps.length - 1 ? "Publish" : "Next"}
        </Button>
      </Stack>
    </Container>
  );
};

export default CreateAnnouncement;
