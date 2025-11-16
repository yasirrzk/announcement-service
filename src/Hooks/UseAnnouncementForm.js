import { useState, useEffect } from "react";

export const useAnnouncementForm = () => {
  const [formData, setFormData] = useState({
    postTitle: "",
    description: "",
    announcementCover: null,
    pageCover: null,
    details: "",
    tags: [],
  });

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedData = localStorage.getItem("announcementFormData");
    const returningFromPreview = localStorage.getItem("returningFromPreview");

    if (returningFromPreview === "true" && savedData) {
      setFormData(JSON.parse(savedData));
      localStorage.removeItem("returningFromPreview");
    } else {
      localStorage.removeItem("announcementFormData");
    }

    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("announcementFormData", JSON.stringify(formData));
    }
  }, [formData, isLoading]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, details: value }));
  };

  const handleFileDrop = (name, files) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, [name]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveFile = (name) => {
    setFormData((prev) => ({ ...prev, [name]: null }));
  };

  return {
    formData,
    isLoading,
    handleChange,
    handleQuillChange,
    handleFileDrop,
    handleRemoveFile,
  };
};
