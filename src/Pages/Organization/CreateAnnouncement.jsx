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
import ScheduleStep from "./ScheduleStep"; // <-- 1. Impor komponen baru
import { useNavigate } from "react-router-dom";
import { useAnnouncementForm } from "../../Hooks/UseAnnouncementForm";

const steps = ["Contents", "Recipient", "Schedule"];

const CreateAnnouncement = () => {
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();

  const formHook = useAnnouncementForm();

  const handleNavigateBack = () => {
    // Logic ini mungkin sudah di-handle oleh hook, tapi oke
    localStorage.setItem(
      "announcementFormData",
      JSON.stringify(formHook.formData)
    );
    navigate("/announcement");
  };

  const handlePreview = () => {
    // Hati-hati, formHook.formData mungkin belum yang terbaru
    // Ambil langsung dari localStorage lebih aman
    const data = JSON.parse(localStorage.getItem("announcementFormData"));
    localStorage.setItem("announcementData", JSON.stringify(data));
    navigate("/announcement/preview");
  };

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);

  // 2. Buat fungsi untuk submit
  const handleSubmit = () => {
    console.log("FORM DATA LENGKAP:", formHook.formData);
    // Di sini kamu bisa kirim data (formHook.formData) ke API
    
    // Setelah sukses, hapus draft dari localStorage
    localStorage.removeItem("announcementFormData");
    
    // Pindahkan ke halaman sukses/dashboard
    alert("Announcement Created!");
    navigate("/announcement");
  };

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
            onPreview={handlePreview} // Prop ini mungkin tidak terpakai di RecipientStep
          />
        );
      // 3. Tambahkan case 2
      case 2:
        return (
          <ScheduleStep
            {...formHook}
            onPrevious={handleBack}
            onSubmit={handleSubmit} // Pass fungsi submit
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
          {/* ... (breadcrumbs kamu) ... */}
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