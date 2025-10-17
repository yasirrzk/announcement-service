import { useState, useEffect } from "react";

export const useAnnouncementForm = () => {
  const [formData, setFormData] = useState(() => {
    const savedData = localStorage.getItem("announcementFormData");
    return savedData
      ? JSON.parse(savedData)
      : {
          postTitle: "",
          description: "",
          announcementCover: null, // base64 string / URL
          pageCover: null, // base64 string / URL
          details: "",
          tags: [],
        };
  });

  // Simpan setiap perubahan ke localStorage
  useEffect(() => {
    localStorage.setItem("announcementFormData", JSON.stringify(formData));
  }, [formData]);

  // Handle input teks biasa
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle perubahan editor (ReactQuill)
  const handleQuillChange = (value) => {
    setFormData((prev) => ({ ...prev, details: value }));
  };

  // Handle upload gambar (mengubah File → base64)
  const handleFileDrop = (name, files) => {
    if (files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          [name]: reader.result, // simpan base64 string
        }));
      };

      reader.readAsDataURL(file); // convert ke base64
    }
  };

  // Hapus gambar
  const handleRemoveFile = (name) => {
    setFormData((prev) => ({ ...prev, [name]: null }));
  };

  // Reset form (kalau butuh clear draft)
  const resetForm = () => {
    localStorage.removeItem("announcementFormData");
    setFormData({
      postTitle: "",
      description: "",
      announcementCover: null,
      pageCover: null,
      details: "",
      tags: [],
    });
  };

  return {
    formData,
    handleChange,
    handleQuillChange,
    handleFileDrop,
    handleRemoveFile,
    resetForm,
  };
};
