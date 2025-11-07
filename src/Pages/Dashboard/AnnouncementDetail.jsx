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
  import {
    getAnnouncementById,
    getCommentsByAnnouncementId,
  } from "../../Services/Data";

  // ====================== Main Component ======================
  const AnnouncementDetail = () => {
    const { id } = useParams();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchData = async () => {
        try {
          setLoading(true);

          const announcement = await getAnnouncementById(id);
          const commentsResponse = await getCommentsByAnnouncementId(id);

          setData(announcement);
          setComments(commentsResponse);

        } catch (err) {
          setError("Gagal memuat data pengumuman.");
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [id]);

    const formatDate = (date) =>
      new Date(date).toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });

    if (loading) {
      return (
        <Container maxWidth="md" sx={{ py: 10, textAlign: "center" }}>
          <CircularProgress size={60} />
          <Typography mt={2}>Memuat pengumuman...</Typography>
        </Container>
      );
    }

    if (error) {
      return (
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography variant="h6" color="error" textAlign="center">
            {error}
          </Typography>
        </Container>
      );
    }

    if (!data) {
      return (
        <Container maxWidth="md" sx={{ py: 10 }}>
          <Typography textAlign="center">Data tidak ditemukan.</Typography>
        </Container>
      );
    }

    const headerImage =
      data.page_cover_url?.includes("google.com")
        ? data.announcement_cover_url
        : data.page_cover_url || data.announcement_cover_url;

    return (
      <Box>
        {/* ✅ Full Width Header Banner */}
        <Box
          sx={{
            width: "100%",
            height: 380,
            backgroundImage: `url(${headerImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
            borderBottom: "1px solid #eee",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              bottom: 30,
              left: { xs: 20, md: 60 },
              color: "#fff",
              textShadow: "0 2px 10px rgba(0,0,0,0.6)",
              maxWidth: "70%",
            }}
          >
            <Typography variant="h3" fontWeight={700} sx={{ lineHeight: 1.2 }}>
              {data.title}
            </Typography>

            <Stack direction="row" spacing={2} alignItems="center" mt={2}>
              <Avatar
                src={data.employees?.avatar_url}
                sx={{ width: 48, height: 48 }}
              />
              <Box>
                <Typography fontWeight={600} fontSize={15}>
                  {data.employees?.full_name}
                </Typography>
                <Typography fontSize={13}>
                  {formatDate(data.publish_date)}
                </Typography>
              </Box>
            </Stack>
          </Box>
        </Box>

        {/* ✅ Main Content Wrapper */}
        <Container maxWidth="md" sx={{ mt: -8, mb: 5 }}>
          <Paper
            elevation={2}
            sx={{
              p: { xs: 2, md: 4 },
              borderRadius: 3,
            }}
          >
            {/* ✅ Description */}
            {data.description && (
              <Typography
                variant="body1"
                color="text.secondary"
                sx={{ mb: 3, lineHeight: 1.8 }}
              >
                {data.description}
              </Typography>
            )}

            {/* ✅ HTML Content */}
            <Box
              sx={{
                "& img": { width: "100%", borderRadius: 2, my: 3 },
                "& h1": { fontSize: 28, mt: 3, fontWeight: 600 },
                "& h2": { fontSize: 22, mt: 3, fontWeight: 600 },
                "& h3": { fontSize: 18, mt: 2, fontWeight: 600 },
                "& p": { lineHeight: 1.8, mt: 2 },
                "& ul": { pl: 4, mt: 1 },
                "& li": { mt: 1 },
              }}
              dangerouslySetInnerHTML={{ __html: data.content }}
            />

            {/* ✅ Tags */}
            <Box mt={4}>
              {data.announcement_tags?.map((tag, i) => (
                <Chip
                  key={i}
                  label={tag.tag_name}
                  variant="outlined"
                  sx={{ mr: 1, mb: 1 }}
                />
              ))}
            </Box>

            {/* ✅ Recipients */}
            <Box mt={3}>
              <Typography variant="subtitle2" fontWeight={700} mb={1}>
                Ditujukan untuk:
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {data.announcement_recipients?.map((r, i) => (
                  <Chip
                    key={i}
                    label={r.department?.name || r.employee?.full_name}
                    size="small"
                  />
                ))}
              </Stack>
            </Box>

            {/* ✅ COMMENTS SECTION */}
            <Box mt={6}>
              <Typography variant="h6" fontWeight={700} mb={2}>
                Comments ({comments.length})
              </Typography>

              {/* Write Comment */}
              <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Write some of your comments..."
                />
                <Button variant="contained" sx={{ mt: 2 }}>
                  Post Comment
                </Button>
              </Paper>

              <Divider sx={{ mb: 3 }} />

              {/* Comment List */}
              <Stack spacing={3}>
                {comments.map((c) => (
                  <Box key={c.id}>
                    <Stack direction="row" spacing={2}>
                      <Avatar src={c.employees?.avatar_url} />

                      <Box>
                        <Typography fontWeight={600}>
                          {c.employees?.full_name}
                        </Typography>
                        <Typography fontSize={12} color="text.secondary">
                          {formatDate(c.created_at)}
                        </Typography>
                        <Typography sx={{ mt: 1 }}>
                          {c.comment_text}
                        </Typography>

                        {/* Replies */}
                        {c.other_announcement_comments?.map((reply) => (
                          <Stack
                            key={reply.id}
                            direction="row"
                            spacing={2}
                            sx={{ mt: 2, ml: 5 }}
                          >
                            <Avatar
                              src={reply.employees?.avatar_url}
                              sx={{ width: 35, height: 35 }}
                            />

                            <Box>
                              <Typography fontWeight={600} fontSize={14}>
                                {reply.employees?.full_name}
                              </Typography>
                              <Typography
                                fontSize={12}
                                color="text.secondary"
                                mb={0.5}
                              >
                                {formatDate(reply.created_at)}
                              </Typography>
                              <Typography fontSize={14}>
                                {reply.comment_text}
                              </Typography>
                            </Box>
                          </Stack>
                        ))}
                      </Box>
                    </Stack>
                  </Box>
                ))}
              </Stack>
            </Box>
          </Paper>
        </Container>
      </Box>
    );
  };

  export default AnnouncementDetail;
