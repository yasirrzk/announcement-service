import React, { createContext, useContext, useState } from "react";

const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const [announcementData, setAnnouncementData] = useState({
    title: "",
    category: "",
    content: "",
    recipients: [],
  });

  return (
    <AnnouncementContext.Provider value={{ announcementData, setAnnouncementData }}>
      {children}
    </AnnouncementContext.Provider>
  );
};

export const useAnnouncement = () => useContext(AnnouncementContext);
