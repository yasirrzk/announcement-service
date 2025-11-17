import { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  CircularProgress,
  Chip,
  Box,
  Typography,
} from "@mui/material";

import { getTags } from "../Services/Data";

export default function TagSelector({ formData, setFormData }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [tagOptions, setTagOptions] = useState([]);
  const [loadingTags, setLoadingTags] = useState(false);

  useEffect(() => {
    if (!searchTerm.trim()) {
      setTagOptions([]);
      return;
    }

    const load = async () => {
      try {
        setLoadingTags(true);
        const results = await getTags(searchTerm, 10);
        setTagOptions(results);
      } catch (err) {
        console.error("Failed to fetch tags:", err);
      } finally {
        setLoadingTags(false);
      }
    };

    const debounce = setTimeout(load, 350);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  return (
    <Box sx={{ mb: 3 }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        Tags
      </Typography>

      <Autocomplete
        multiple
        freeSolo
        filterSelectedOptions
        options={tagOptions}        
        value={formData.tags}       
        loading={loadingTags}
        onInputChange={(e, value) => setSearchTerm(value)}
        onChange={(e, newValue) => {
          setFormData({
            ...formData,
            tags: newValue            
          });
        }}
        renderTags={(selected, getTagProps) =>
          selected.map((tag, i) => (
            <Chip key={tag} label={tag} {...getTagProps({ index: i })} />
          ))
        }
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search tags"
            placeholder="Type to search..."
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {loadingTags && <CircularProgress size={18} />}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />
    </Box>
  );
}
