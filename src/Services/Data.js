import axios from "axios";

const API_BASE_URL =
  "https://phototypically-unexcluding-roland.ngrok-free.dev/";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjRlYzFlZGYxLTMyMTItNDAyZi1iNzgzLWU5ZjU4YTYwYTM2OSIsImVtYWlsIjoiam9obi5kb2VAY29tcGFueS5jb20iLCJuaWsiOiIxMjMyMzQiLCJpYXQiOjE3NjMzNDc0MDYsImV4cCI6MTc2Mzk1MjIwNn0.wrJa738gJA8DH5m8kj-etk8PldVkHeLn5ISpJOfpzMI";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
    "ngrok-skip-browser-warning": "true",
  },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// ========== STATISTICS ==========
export const getAnnouncementStats = async () => {
  try {
    const res = await api.get("/api/announcements/stats");
    console.log("🔹 API Response:", res.data);
    return res.data;
  } catch (error) {
    console.error("❌ getAnnouncementStats error:", error);
    throw error;
  }
};

// ========== ANNOUNCEMENTS ==========
export const getAnnouncements = async (status = "", page = 1, limit = 6) => {
  try {
    const params = { page, limit };

    if (status) {
      params.status = status;
    }

    const res = await api.get("/api/announcements", { params });

    console.log("Raw response:", res.data);

    return res.data?.data?.data || [];
  } catch (error) {
    console.error("Error fetching announcements:", error);
    return [];
  }
};

export const getAnnouncementById = async (id) => {
  try {
    const res = await api.get(`/api/announcements/${id}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const createAnnouncement = async (payload) => {
  try {
    const res = await api.post("/api/announcements", payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const updateAnnouncement = async (announcementId, payload) => {
  try {
    const res = await api.put(`/api/announcements/${announcementId}`, payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

export const deleteAnnouncement = async (announcementId) => {
  try {
    const res = await api.delete(`/api/announcements/${announcementId}`);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// ========== TAGS ==========

export const getTags = async (q = "", limit = 10) => {
  try {
    const res = await api.get(`/api/announcements/tags/popular`, {
      params: { q, limit }
    });
    return res.data.data.map((tag) => tag.name);
  } catch (error) {
    throw error;
  }
};


// ========== DEPARTMENTS ==========
export const getDepartments = async () => {
  try {
    const res = await api.get("/api/departments");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// ============ COMMENTS =================

export const getCommentsByAnnouncementId = async (announcementId) => {
  try {
    const res = await api.get(`/api/announcements/${announcementId}/comments`);
    return res.data.data.data;
  } catch (error) {
    throw error;
  }
};

// ========== STEP-BY-STEP FUNCTIONS ==========

export const createAnnouncementStep1 = async ({
  title,
  description,
  content,
  announcement_cover_url,
  page_cover_url,
  tags,
  status = "draft",
}) => {
  try {
    const payload = {
      title,
      description,
      content,
      announcement_cover_url,
      page_cover_url,
      tags,
      status,
    };
    const res = await api.post("/api/announcements", payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// Step 2: Update recipients
export const updateRecipientsStep2 = async (announcementId, recipients) => {
  try {
    const payload = { recipients };
    const res = await api.put(`/api/announcements/${announcementId}`, payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// Step 3: Update schedule and publish
export const updateScheduleStep3 = async (
  announcementId,
  { enable_comments, status, publish_date }
) => {
  try {
    const payload = {
      enable_comments,
      status,
      publish_date,
    };
    const res = await api.put(`/api/announcements/${announcementId}`, payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// ========== HELPER FUNCTIONS ==========

export const createCompleteAnnouncement = async ({
  title,
  description,
  content,
  announcement_cover_url,
  page_cover_url,
  tags,
  recipients,
  enable_comments,
  status,
  publish_date,
}) => {
  try {
    // Step 1: Create announcement
    const announcement = await createAnnouncementStep1({
      title,
      description,
      content,
      announcement_cover_url,
      page_cover_url,
      tags,
      status: "draft",
    });

    const announcementId = announcement.id;

    if (recipients && recipients.length > 0) {
      await updateRecipientsStep2(announcementId, recipients);
    }

    const finalAnnouncement = await updateScheduleStep3(announcementId, {
      enable_comments,
      status,
      publish_date,
    });

    return finalAnnouncement;
  } catch (error) {
    throw error;
  }
};

export default api;
