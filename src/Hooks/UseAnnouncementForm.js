import { useState, useEffect } from "react";

export const useAnnouncementForm = () => {
  const [formData, setFormData] = useState({
    // State lama kamu
    postTitle: "",
    description: "",
    announcementCover: null,
    pageCover: null,
    details: "",
    tags: [],
    // State baru untuk Step 3
    enableComments: false,
    isPublished: false,
    publishStartDate: null, // Pakai null untuk date picker
    publishEndDate: null,   // Pakai null untuk date picker
  });

  const [isLoading, setIsLoading] = useState(true);

  // Efek untuk LOAD data (dari chat kita sebelumnya)
  useEffect(() => {
    setIsLoading(true);
    try {
      const savedData = localStorage.getItem("announcementFormData");
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        // Penting: parse string tanggal kembali ke obyek Date
        if (parsedData.publishStartDate) {
          parsedData.publishStartDate = new Date(parsedData.publishStartDate);
        }
        if (parsedData.publishEndDate) {
          parsedData.publishEndDate = new Date(parsedData.publishEndDate);
        }
        setFormData((prev) => ({ ...prev, ...parsedData }));
      }
    } catch (error) {
      console.error("Gagal memuat data form, data dibersihkan:", error);
      localStorage.removeItem("announcementFormData");
    }
    setIsLoading(false);
  }, []);

  // Efek untuk SIMPAN data (dari chat kita sebelumnya)
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem("announcementFormData", JSON.stringify(formData));
    }
  }, [formData, isLoading]);

  // Handler untuk text field/select biasa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handler BARU untuk Switch (toggle)
  const handleSwitchChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  // Handler BARU untuk Date Picker
  const handleDateChange = (name, newValue) => {
    setFormData((prev) => ({ ...prev, [name]: newValue }));
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
    handleSwitchChange, // <-- Return handler baru
    handleDateChange, // <-- Return handler baru
    handleQuillChange,
    handleFileDrop,
    handleRemoveFile,
  };
};