import React from "react";
import {
  Box,
  Button,
  Stack,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";

const ScheduleStep = ({
  onPrevious,
  onSubmit,
  formData,
  handleSwitchChange,
  handleDateChange,
}) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box
       
      >
        <Typography fontWeight={600} mb={1}>
          Schedule
        </Typography>

        {/* Enable Comments */}
       

        {/* Publish Section */}
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems="flex-start"
          spacing={2}
        >
          {/* Enable Comments */}
          <FormControlLabel
            control={
              <Switch
                checked={formData.enableComments}
                onChange={handleSwitchChange}
                name="enableComments"
              />
            }
            label="Enable comments"
          />

          {/* Publish Section */}
          <Stack
            direction={{ xs: "column", md: "row" }}
            spacing={2}
            alignItems="center"
          >
            <FormControlLabel
              control={
                <Switch
                  checked={formData.isPublished}
                  onChange={handleSwitchChange}
                  name="isPublished"
                />
              }
              label="Publish"
            />

            {/* Date Pickers */}
            <DatePicker
              label="Publish Start Date"
              format="DD/MM/YYYY"
              value={
                formData.publishStartDate
                  ? dayjs(formData.publishStartDate)
                  : null
              }
              onChange={(newValue) =>
                handleDateChange("publishStartDate", newValue)
              }
              slotProps={{ textField: { fullWidth: true, margin: "none" } }}
            />
            <DatePicker
              label="Publish End Date"
              format="DD/MM/YYYY"
              value={
                formData.publishEndDate ? dayjs(formData.publishEndDate) : null
              }
              onChange={(newValue) =>
                handleDateChange("publishEndDate", newValue)
              }
              slotProps={{ textField: { fullWidth: true, margin: "none" } }}
            />
          </Stack>
        </Stack>

        {/* Tombol Navigasi */}
        <Stack direction="row" justifyContent="space-between" mt={4}>
          <Button variant="outlined" onClick={onPrevious}>
            Previous
          </Button>
          <Button variant="contained" onClick={onSubmit}>
            Create Announcement
          </Button>
        </Stack>
      </Box>
    </LocalizationProvider>
  );
};

export default ScheduleStep;
