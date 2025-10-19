import { useState, useEffect } from "react";

export const useAnnouncementForm = () => {
  const [formData, setFormData] = useState({
    postTitle: "",
    description: "",
    announcementCover: null,
    pageCover: null,
    details: "", // Awalnya kosong
    tags: [],
  });
  
  // 1. Tambah state loading
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 2. Set loading jadi true (meskipun default-nya sudah true, ini untuk kejelasan)
    setIsLoading(true); 
    try {
      const returningFromPreview = localStorage.getItem("returningFromPreview");
      if (returningFromPreview === "true") {
        const savedData = localStorage.getItem("announcementFormData");
        if (savedData) {
          // 3. Langsung set data yang sudah di-parse
          const parsedData = JSON.parse(savedData);
          // Pakai merge untuk jaga-jaga kalau ada key baru di state default
          setFormData(prev => ({ ...prev, ...parsedData })); 
        }
        localStorage.removeItem("returningFromPreview");
      } else {
        localStorage.removeItem("announcementFormData");
      }
    } catch (error) {
      console.error("Gagal memuat data form:", error);
      localStorage.removeItem("announcementFormData");
    }
    
    // 4. Set loading jadi false SETELAH semua logika selesai
    setIsLoading(false); 
  }, []); // Biarkan dependency array kosong, ini hanya jalan sekali saat mount

  useEffect(() => {
    // Efek ini tetap jalan untuk menyimpan perubahan, TAPI kita cegah
    // penyimpanan saat pertama kali load (pas isLoading)
    if (!isLoading) {
      localStorage.setItem("announcementFormData", JSON.stringify(formData));
    }
  }, [formData, isLoading]); // Tambahkan isLoading sebagai dependency

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
    isLoading, // 5. Kembalikan (return) isLoading
    handleChange,
    handleQuillChange,
    handleFileDrop,
    handleRemoveFile,
  };
};