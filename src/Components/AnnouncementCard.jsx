import React from 'react';
import { Card, CardContent, CardMedia, Typography, Box, Chip, CardActions, IconButton } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ShareIcon from '@mui/icons-material/Share';

const statusColors = {
  Published: 'success',
  Draft: 'info',
  Unpublished: 'error',
};

const AnnouncementCard = ({ announcement }) => {
  const { status, date, title, description, views, comments, shares, image } = announcement;
  
  return (
    <Card elevation={2}>
      <CardMedia
        component="img"
        height="140"
        image={image}
        alt={title}
      />
      <CardContent sx={{ pb: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
          <Chip label={status} color={statusColors[status]} size="small" />
          <Typography variant="caption" color="text.secondary">{date}</Typography>
        </Box>
        <Typography gutterBottom variant="h6" component="div" sx={{ mb: 1 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <IconButton size="small">
          <MoreHorizIcon />
        </IconButton>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <VisibilityIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{views}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <ChatBubbleOutlineIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{comments}</Typography>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: 'text.secondary' }}>
            <ShareIcon sx={{ fontSize: 18 }} />
            <Typography variant="body2">{shares}</Typography>
          </Box>
        </Box>
      </CardActions>
    </Card>
  );
};

export default AnnouncementCard;