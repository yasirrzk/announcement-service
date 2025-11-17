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
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import AnnouncementContentStep from "../../Components/AnnouncementContentStep";
import RecipientStep from "../Organization/RecepientStep";
import ScheduleStep from "./ScheduleStep";
import { useNavigate } from "react-router-dom";
import { useAnnouncementForm } from "../../Hooks/UseAnnouncementForm";

const steps = ["Contents", "Recipient", "Schedule"];

const CreateAnnouncement = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  // ----------------------------
  // ✅ gunakan satu sumber truth
  // ----------------------------
  const formHook = useAnnouncementForm();
  const { formData, setFormData } = formHook;

  const handleNavigateBack = () => {
    localStorage.setItem("announcementFormData", JSON.stringify(formData));
    navigate("/announcement");
  };

  const handlePreview = () => {
    localStorage.setItem("announcementFormData", JSON.stringify(formData));
    localStorage.setItem("returningFromPreview", "true");
    navigate("/announcement/preview");
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleSubmit = () => {
    console.log("FINAL FORM:", formData);
    localStorage.removeItem("announcementFormData");

    alert("Announcement Created!");
    navigate("/announcement");
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <AnnouncementContentStep
            {...formHook}
            formData={formData}
            setFormData={setFormData}
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
        return (
          <ScheduleStep
            {...formHook}
            onPrevious={handleBack}
            onSubmit={handleSubmit}
          />
        );

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
          <Typography color="text.primary">Create Announcement</Typography>
        </Breadcrumbs>

        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <IconButton onClick={handleNavigateBack}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
          <Typography variant="h4" fontWeight={700}>
            Create Announcement
          </Typography>
        </Box>
      </Stack>

      <Box
        sx={{
          p: 3,
          border: "1px solid #E0E0E0",
          borderRadius: 2,
          backgroundColor: "#fff",
        }}
      >
        <Stepper
          activeStep={activeStep}
          sx={{
            mb: 5,
            "& .MuiStepLabel-root .Mui-active": { color: "primary.main" },
            "& .MuiStepIcon-root.Mui-completed": { color: "green !important" },
          }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        {getStepContent(activeStep)}
      </Box>
    </Container>
  );
};

export default CreateAnnouncement;
