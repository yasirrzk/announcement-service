import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  OutlinedInput,
  Chip,
  Stack,
  Link,
  Typography,
} from "@mui/material";

const departmentList = ["Engineer", "Programmer", "UI UX", "HR", "Management"];

const RecipientStep = ({ onPrevious, onNext }) => {
  const [recipient, setRecipient] = useState("");
  const [departments, setDepartments] = useState([]);

  const handleDepartmentChange = (event) => {
    const {
      target: { value },
    } = event;
    setDepartments(typeof value === "string" ? value.split(",") : value);
  };

  const handleDelete = (deptToDelete) => {
    setDepartments((prev) => prev.filter((dept) => dept !== deptToDelete));
  };

  return (
    <Box
     
    >
      <Typography fontWeight={600} mb={1}>
        Recipient
      </Typography>

      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="recipient-label">Recipient Type</InputLabel>
        <Select
          labelId="recipient-label"
          label="Recipient Type"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
        >
          <MenuItem value="Department">Department</MenuItem>
          <MenuItem value="Employee">Employee</MenuItem>
        </Select>
      </FormControl>

      <Link href="#" underline="hover" color="primary.main">
        Department List
      </Link>

      <Typography fontWeight={600} mt={3} mb={1}>
        Department
      </Typography>

      <FormControl fullWidth>
        <Select
          multiple
          value={departments}
          onChange={handleDepartmentChange}
          input={<OutlinedInput />}
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip
                  key={value}
                  label={value}
                  onDelete={() => handleDelete(value)}
                  onMouseDown={(e) => e.stopPropagation()} 
                />
              ))}
            </Box>
          )}
        >
          {departmentList.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Stack direction="row" justifyContent="space-between" mt={4}>
        <Button variant="outlined" onClick={onPrevious}>
          Previous
        </Button>
        <Button variant="contained" onClick={onNext}>
          Next
        </Button>
      </Stack>
    </Box>
  );
};

export default RecipientStep;
