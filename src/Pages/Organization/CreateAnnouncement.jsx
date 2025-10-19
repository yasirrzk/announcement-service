import React, { useState } from "react";
import {
  Box,
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
import RecipientStep from "../Organization/RecepientStep";
import { useNavigate } from "react-router-dom";
import { useAnnouncementForm } from "../../Hooks/UseAnnouncementForm"; 

const steps = ["Contents", "Recipient", "Schedule"];

const CreateAnnouncement = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const formHook = useAnnouncementForm();

  const handleNavigateBack = () => {
    localStorage.setItem(
      "announcementFormData",
      JSON.stringify(formHook.formData)
    );
    navigate("/announcement");
  };

  const handlePreview = () => {
    const data = JSON.parse(localStorage.getItem("announcementFormData"));
    localStorage.setItem("announcementData", JSON.stringify(data));
    navigate("/announcement/preview");
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AnnouncementContentStep
            {...formHook} 
            onNext={handleNext}
            onPreview={handlePreview}
          />
        );
      case 1:
        return (
          <RecipientStep
            {...formHook} 
            onPrevious={handleBack}
            onNext={handleNext}
            onPreview={handlePreview}
          />
        );
      case 2:
        return <Typography>Scheduling options go here.</Typography>;
      default:
        return "Unknown step";
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
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

      {/* Konten Form */}
      <Box>{getStepContent(activeStep)}</Box>
    </Container>
  );
};

export default CreateAnnouncement;
