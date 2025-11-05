import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Stack,
  TextField,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getAnnouncementById } from "../../Services/Data";

// ====================== Header ======================
const AnnouncementHeader = ({ title, author, date, image, authorAvatar, position }) => {
  const formattedDate = date
    ? new Date(date).toLocaleDateString("id-ID", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : "Invalid Date";

  return (
    <Box>
      {image && (
        <Box
          sx={{
            height: 300,
            backgroundImage: `url(${image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderRadius: 2,
            mb: 3,
            border: "1px solid #eee",
          }}
        />
      )}
      <Typography variant="h4" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center" mb={2}>
        <Avatar 
          alt={author} 
          src={authorAvatar}
          sx={{ width: 48, height: 48 }}
        />
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            {author}
          </Typography>
          {position && (
            <Typography variant="caption" color="text.secondary" display="block">
              {position}
            </Typography>
          )}
          <Typography variant="caption" color="text.secondary">
            {formattedDate}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

// ====================== Stats ======================
const AnnouncementStats = ({ views, likes, comments, shares }) => {
  return (
    <Stack 
      direction="row" 
      spacing={3} 
      sx={{ 
        py: 2, 
        borderTop: "1px solid #eee",
        borderBottom: "1px solid #eee"
      }}
    >
      <Typography variant="body2" color="text.secondary">
        👁️ {views || 0} views
      </Typography>
      <Typography variant="body2" color="text.secondary">
        ❤️ {likes || 0} likes
      </Typography>
      <Typography variant="body2" color="text.secondary">
        💬 {comments || 0} comments
      </Typography>
      <Typography variant="body2" color="text.secondary">
        🔗 {shares || 0} shares
      </Typography>
    </Stack>
  );
};

// ====================== Content ======================
const AnnouncementContent = ({ content }) => {
  return (
    <Box mt={4}>
      {content ? (
        <Typography
          variant="body1"
          color="text.secondary"
          component="div"
          sx={{
            "& h1": { fontSize: "1.75rem", fontWeight: 700, mt: 3, mb: 2 },
            "& h2": { fontSize: "1.5rem", fontWeight: 600, mt: 2.5, mb: 1.5 },
            "& h3": { fontSize: "1.25rem", fontWeight: 600, mt: 2, mb: 1 },
            "& p": { mb: 2, lineHeight: 1.7 },
            "& ul, & ol": { pl: 3, mb: 2 },
            "& li": { mb: 1 },
          }}
          dangerouslySetInnerHTML={{ __html: content }}
        />
      ) : (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Konten tidak tersedia
        </Typography>
      )}
    </Box>
  );
};

// ====================== Tags ======================
const AnnouncementTags = ({ tags }) => {
  if (!tags?.length) return null;
  
  return (
    <Box mt={3}>
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Tags:
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {tags.map((tag, i) => (
          <Chip 
            key={i} 
            label={tag} 
            variant="outlined" 
            size="small"
            sx={{ borderRadius: 1 }}
          />
        ))}
      </Box>
    </Box>
  );
};

// ====================== Recipients ======================
const AnnouncementRecipients = ({ recipients }) => {
  if (!recipients?.length) return null;

  const departments = recipients
    .filter(r => r.recipient_type === "Department" && r.department)
    .map(r => r.department.name);

  const employees = recipients
    .filter(r => r.recipient_type === "Employee" && r.employee)
    .map(r => r.employee.full_name);

  if (!departments.length && !employees.length) return null;

  return (
    <Box mt={3}>
      <Typography variant="subtitle2" fontWeight={600} mb={1}>
        Ditujukan untuk:
      </Typography>
      <Box display="flex" flexWrap="wrap" gap={1}>
        {departments.map((dept, i) => (
          <Chip 
            key={`dept-${i}`} 
            label={dept} 
            color="primary"
            variant="outlined"
            size="small"
          />
        ))}
        {employees.map((emp, i) => (
          <Chip 
            key={`emp-${i}`} 
            label={emp} 
            color="secondary"
            variant="outlined"
            size="small"
          />
        ))}
      </Box>
    </Box>
  );
};

// ====================== Comments ======================
const CommentSection = ({ count, enableComments }) => {
  // Convert to boolean untuk handle string "true"/"false"
  const isEnabled = enableComments === true || enableComments === "true";
  
  if (!isEnabled) {
    return (
      <Box mt={6}>
        <Typography variant="body2" color="text.secondary" textAlign="center">
          Komentar dinonaktifkan untuk pengumuman ini.
        </Typography>
      </Box>
    );
  }

  return (
    <Box mt={6}>
      <Typography variant="h6" fontWeight={600} gutterBottom>
        Komentar ({count || 0})
      </Typography>

      <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
        <TextField
          multiline
          rows={3}
          placeholder="Tulis komentar Anda..."
          fullWidth
          variant="outlined"
        />
        <Button 
          variant="contained" 
          sx={{ mt: 2, alignSelf: "flex-end" }}
          size="small"
        >
          Kirim Komentar
        </Button>
      </Paper>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        {count === 0 ? (
          <Typography variant="body2" color="text.secondary" textAlign="center" py={3}>
            Belum ada komentar. Jadilah yang pertama berkomentar!
          </Typography>
        ) : (
          <Typography variant="body2" color="text.secondary" textAlign="center">
            {count} komentar tersedia (fitur tampil komentar akan ditambahkan)
          </Typography>
        )}
      </Stack>
    </Box>
  );
};

// ====================== Main Component ======================
const AnnouncementDetail = () => {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) {
        setLoading(false);
        setError("ID pengumuman tidak ditemukan di URL.");
        return;
      }
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await getAnnouncementById(id);
        console.log("📢 Data Announcement:", result);
        setData(result);
      } catch (err) {
        console.error("❌ Error fetching announcement:", err);
        setError(
          err.response?.data?.message || 
          "Gagal memuat data pengumuman. Silakan coba lagi."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: "center", py: 10 }}>
        <CircularProgress size={60} />
        <Typography variant="body2" color="text.secondary" mt={2}>
          Memuat pengumuman...
        </Typography>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper 
          variant="outlined" 
          sx={{ p: 4, textAlign: "center", borderColor: "error.main" }}
        >
          <Typography color="error" variant="h6" gutterBottom>
            ⚠️ Terjadi Kesalahan
          </Typography>
          <Typography color="text.secondary">
            {error}
          </Typography>
          <Button 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => window.location.reload()}
          >
            Muat Ulang
          </Button>
        </Paper>
      </Container>
    );
  }

  // No data state
  if (!data) {
    return (
      <Container maxWidth="md" sx={{ py: 10 }}>
        <Paper variant="outlined" sx={{ p: 4, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom>
            📭 Data Tidak Ditemukan
          </Typography>
          <Typography color="text.secondary">
            Pengumuman yang Anda cari tidak tersedia.
          </Typography>
        </Paper>
      </Container>
    );
  }

  // Main content
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <AnnouncementHeader
        title={data.title}
        author={data.employees?.full_name}
        position={data.employees?.position}
        date={data.publish_date}
        image={data.page_cover_url}
        authorAvatar={data.employees?.avatar_url}
      />

      <AnnouncementStats
        views={data.views_count}
        likes={data.likes_count}
        comments={data.comments_count}
        shares={data.shares_count}
      />

      <AnnouncementContent content={data.content} />

      <AnnouncementTags
        tags={data.announcement_tags?.map((tag) => tag.tag_name)}
      />

      <AnnouncementRecipients 
        recipients={data.announcement_recipients}
      />

      <CommentSection
        count={data.comments_count}
        enableComments={data.enable_comments}
      />

      {/* Debug info - hapus setelah testing */}
      {process.env.NODE_ENV === 'development' && (
        <Box mt={2} p={2} bgcolor="#f5f5f5" borderRadius={1}>
          <Typography variant="caption" display="block">
            Debug: enable_comments = {String(data.enable_comments)}
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default AnnouncementDetail;