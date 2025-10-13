// // src/Components/AnnouncementPreview.jsx

// import React from 'react';
// import { Box, Typography, Avatar, Stack, Chip } from '@mui/material';
// import { Facebook, Instagram, LinkedIn, Share } from '@mui/icons-material';

// // Komponen untuk merender HTML dari ReactQuill dengan aman
// const RenderHTML = ({ htmlString }) => {
//   // PENTING: dangerouslySetInnerHTML bisa berisiko XSS.
//   // Di aplikasi produksi, selalu sanitize HTML Anda sebelum merendernya.
//   // Contoh library: DOMPurify (npm install dompurify)
//   return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
// };

// const PreviewAnnouncement = ({ data, coverPreview, pageCoverPreview }) => {
//   const { postTitle, details, tags } = data;

//   const today = new Date();
//   const formattedDate = today.toLocaleDateString('en-GB', {
//     day: 'numeric',
//     month: 'short',
//     year: 'numeric',

//   });

//   return (
//     <Box sx={{ p: 3, bgcolor: '#fff' }}>
//       {/* Header dengan Gambar Latar */}
//       <Box
//         sx={{
//           position: 'relative',
//           height: '300px',
//           borderRadius: '16px',
//           overflow: 'hidden',
//           color: 'white',
//           display: 'flex',
//           flexDirection: 'column',
//           justifyContent: 'flex-end',
//           p: 4,
//           backgroundSize: 'cover',
//           backgroundPosition: 'center',
//           backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url(${coverPreview || 'https://source.unsplash.com/random/1600x900'})`, // Gunakan cover preview
//         }}
//       >
//         <Typography variant="h4" fontWeight="bold">
//           {postTitle || "Judul Pengumuman Anda"}
//         </Typography>
//         <Stack direction="row" alignItems="center" justifyContent="space-between" mt={2}>
//           <Stack direction="row" alignItems="center" spacing={2}>
//             <Avatar alt="Jhon Doe" />
//             <Box>
//               <Typography fontWeight="bold">Jhon Doe</Typography>
//               <Typography variant="body2">{formattedDate}</Typography>
//             </Box>
//           </Stack>
//           <Stack direction="row" spacing={1}>
//             <Facebook /> <Instagram /> <LinkedIn /> <Share />
//           </Stack>
//         </Stack>
//       </Box>

//       {/* Konten Utama */}
//       <Box sx={{ my: 4, lineHeight: '1.7', fontSize: '16px' }}>
//         {/* Render HTML dari ReactQuill */}
//         <RenderHTML htmlString={details || "<p>Detail pengumuman Anda akan muncul di sini...</p>"} />
//       </Box>
      
//        {/* Page Cover Image Preview */}
//       {pageCoverPreview && (
//         <Box
//           component="img"
//           src={pageCoverPreview}
//           alt="Page Cover Preview"
//           sx={{ width: '100%', borderRadius: '12px', my: 4 }}
//         />
//       )}

//       {/* Tags */}
//       <Stack direction="row" spacing={1}>
//         {(tags && tags.length > 0) ? tags.map((tag) => (
//           <Chip key={tag} label={tag} />
//         )) : <Chip label="Rules" />}
//       </Stack>
//     </Box>
//   );
// };

// export default PreviewAnnouncement;