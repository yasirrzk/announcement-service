import React from "react";
import { announcementData } from "./data";
import { Avatar, Box, Button, Chip, Container, Divider, List, ListItem, ListItemText, Stack, TextField, Typography } from "@mui/material";

const AnnouncementHeader = ({ title, author, date, image }) => {
  return (
    <Box>
      <Box
        sx={{
          height: 250,
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          borderRadius: 2,
          mb: 3,
        }}
      />
      <Typography variant="h5" fontWeight={700} gutterBottom>
        {title}
      </Typography>
      <Stack direction="row" spacing={2} alignItems="center">
        <Avatar alt={author} src="/images/avatar.png" />
        <Box>
          <Typography variant="subtitle2" fontWeight={600}>
            {author}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {date}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

const AnnouncementContent = ({ content, sections }) => {
  return (
    <Box mt={4}>
      <Typography variant="body1" color="text.secondary" paragraph>
        {content}
      </Typography>

      {sections.map((section, index) => (
        <Box key={index} mt={3}>
          <Typography
            variant="h6"
            fontWeight={600}
            color="primary.main"
            gutterBottom
          >
            {section.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={2}>
            {section.description}
          </Typography>

          {section.points.map((point, idx) => (
            <Box key={idx} mb={2}>
              <Typography variant="subtitle1" fontWeight={600}>
                {point.subtitle}
              </Typography>
              <List dense>
                {point.details.map((d, i) => (
                  <ListItem key={i} sx={{ py: 0 }}>
                    <ListItemText
                      primaryTypographyProps={{ variant: "body2" }}
                      primary={d}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          ))}
        </Box>
      ))}
    </Box>
  );
};

const AnnouncementTags = ({ tags }) => {
  return (
    <Box mt={3} display="flex" flexWrap="wrap" gap={1}>
      {tags.map((tag, i) => (
        <Chip key={i} label={tag} variant="outlined" />
      ))}
    </Box>
  );
};

const CommentSection = ({ comments }) => {
  return (
    <Box mt={6}>
      <Typography variant="h6" gutterBottom>
        Comments ({comments.length})
      </Typography>

      <Stack spacing={2} mb={3}>
        <TextField
          multiline
          rows={2}
          placeholder="Write your comment..."
          fullWidth
        />
        <Button variant="contained" sx={{ alignSelf: "flex-end" }}>
          Post Comment
        </Button>
      </Stack>

      <Divider sx={{ mb: 3 }} />

      <Stack spacing={3}>
        {comments.map((c) => (
          <Stack direction="row" spacing={2} key={c.id}>
            <Avatar src="/images/user.png" alt={c.name} />
            <Box>
              <Typography variant="subtitle2" fontWeight={600}>
                {c.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {c.date}
              </Typography>
              <Typography variant="body2" mt={0.5}>
                {c.message}
              </Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Box>
  );
};

const AnnouncementDetail = () => {
  const data = announcementData;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <AnnouncementHeader
        title={data.title}
        author={data.author}
        date={data.date}
        image={data.headerImage}
      />

      <AnnouncementContent content={data.content} sections={data.sections} />

      <AnnouncementTags tags={data.tags} />

      <CommentSection comments={data.comments} />
    </Container>
  );
};

export default AnnouncementDetail;
