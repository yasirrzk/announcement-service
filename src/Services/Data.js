import axios from "axios";

const API_BASE_URL = "https://phototypically-unexcluding-roland.ngrok-free.dev";
const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MjExN2RjLTE2MDgtNDQ4OS1hM2ZkLWRlMGNlZWY3ZjNmYSIsImVtYWlsIjoiam9obi5kb2VAY29tcGFueS5jb20iLCJlbXBsb3llZU51bWJlciI6IkVNUDAwMSIsImlhdCI6MTc2MTIwMTkzMSwiZXhwIjoxNzYxODA2NzMxfQ.bzLDTqMZ3VH9E0znVghfECmYXdX24WubfKm5960qJd8";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

// Response interceptor untuk error handling
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
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// ========== ANNOUNCEMENTS ==========
export const getAnnouncements = async (status = "draft", page = 1, limit = 6) => {
  try {
    const res = await api.get(`/api/announcements`, {
      params: { status, page, limit }
    });
    return res.data.data;
  } catch (error) {
    throw error;
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

// ========== DEPARTMENTS ==========
export const getDepartments = async () => {
  try {
    const res = await api.get("/api/departments");
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// ========== STEP-BY-STEP FUNCTIONS ==========

// Step 1: Create announcement with basic info
export const createAnnouncementStep1 = async ({
  title,
  description,
  content,
  announcement_cover_url,
  page_cover_url,
  tags,
  status = "draft"
}) => {
  try {
    const payload = {
      title,
      description,
      content,
      announcement_cover_url,
      page_cover_url,
      tags,
      status
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
    // Format: [{ type: "Engineering", id: "607f5fee-..." }, ...]
    const payload = { recipients };
    const res = await api.put(`/api/announcements/${announcementId}`, payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// Step 3: Update schedule and publish
export const updateScheduleStep3 = async (announcementId, {
  enable_comments,
  status,
  publish_date
}) => {
  try {
    const payload = {
      enable_comments,
      status,
      publish_date
    };
    const res = await api.put(`/api/announcements/${announcementId}`, payload);
    return res.data.data;
  } catch (error) {
    throw error;
  }
};

// ========== HELPER FUNCTIONS ==========

// Complete flow untuk membuat announcement
export const createCompleteAnnouncement = async ({
  // Step 1 data
  title,
  description,
  content,
  announcement_cover_url,
  page_cover_url,
  tags,
  // Step 2 data
  recipients,
  // Step 3 data
  enable_comments,
  status,
  publish_date
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
      status: "draft" // Always start as draft
    });

    const announcementId = announcement.id;

    if (recipients && recipients.length > 0) {
      await updateRecipientsStep2(announcementId, recipients);
    }

    const finalAnnouncement = await updateScheduleStep3(announcementId, {
      enable_comments,
      status,
      publish_date
    });

    return finalAnnouncement;
  } catch (error) {
    throw error;
  }
};

export default api;