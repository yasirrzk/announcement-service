// src/hooks/useAnnouncementForm.js

import { useState } from "react";

export const useAnnouncementForm = () => {
  const [formData, setFormData] = useState({
    postTitle: "",
    description: "",
    announcementCover: null,
    pageCover: null,
    details: "",
    tags: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, details: value }));
  };

  const handleFileDrop = (name, files) => {
    if (files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleRemoveFile = (name) => {
    setFormData((prev) => ({ ...prev, [name]: null }));
  };

  return {
    formData,
    handleChange,
    handleQuillChange,
    handleFileDrop,
    handleRemoveFile, 
  };
};