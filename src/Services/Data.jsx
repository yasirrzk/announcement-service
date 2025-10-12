import CampaignIcon from '@mui/icons-material/Campaign';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import content from "../assets/image.png"

export const stats = [
  { title: 'Total Announcement', count: 10, icon: <CampaignIcon />, color: 'primary.main' },
  { title: 'Total Published', count: 8, icon: <CheckCircleIcon />, color: 'success.main' },
  { title: 'Total Draft', count: 1, icon: <EditIcon />, color: 'info.main' },
  { title: 'Total Unpublished', count: 1, icon: <CancelIcon />, color: 'error.main' },
];

export const announcements = [
  {
    status: 'Published',
    date: '12 Aug 2022 10:00 PM',
    title: 'Penyesuaian Aturan dan Kebijakan Kerja PT ABC 2025',
    description: 'PT ABC mengumumkan penyesuaian signifikan terhadap beberapa aturan dan kebijakan kantor yang akan mulai berlaku efektif pada 1 November 2025. Perubahan ini merupakan bagian dari upaya ber...',
    views: 5,
    comments: 12,
    shares: 4,
    image: content,
  },
  {
    status: 'Draft',
    date: '12 Aug 2022 10:00 PM',
    title: 'Penyesuaian Aturan dan Kebijakan Kerja PT ABC 2025',
    description: 'PT ABC mengumumkan penyesuaian signifikan terhadap beberapa aturan dan kebijakan kantor yang akan mulai berlaku efektif pada 1 November 2025. Perubahan ini merupakan bagian dari upaya ber...',
    views: 0,
    comments: 0,
    shares: 0,
    image: content,
  },
   {
    status: 'Unpublished',
    date: '12 Aug 2022 10:00 PM',
    title: 'Penyesuaian Aturan dan Kebijakan Kerja PT ABC 2025',
    description: 'PT ABC mengumumkan penyesuaian signifikan terhadap beberapa aturan dan kebijakan kantor yang akan mulai berlaku efektif pada 1 November 2025. Perubahan ini merupakan bagian dari upaya ber...',
    views: 5,
    comments: 12,
    shares: 4,
    image: content,
  },
  {
    status: 'Published',
    date: '12 Aug 2022 10:00 PM',
    title: 'Penyesuaian Aturan dan Kebijakan Kerja PT ABC 2025',
    description: 'PT ABC mengumumkan penyesuaian signifikan terhadap beberapa aturan dan kebijakan kantor yang akan mulai berlaku efektif pada 1 November 2025. Perubahan ini merupakan bagian dari upaya ber...',
    views: 5,
    comments: 12,
    shares: 4,
    image: content,
  },
  {
    status: 'Draft',
    date: '12 Aug 2022 10:00 PM',
    title: 'Penyesuaian Aturan dan Kebijakan Kerja PT ABC 2025',
    description: 'PT ABC mengumumkan penyesuaian signifikan terhadap beberapa aturan dan kebijakan kantor yang akan mulai berlaku efektif pada 1 November 2025. Perubahan ini merupakan bagian dari upaya ber...',
    views: 0,
    comments: 0,
    shares: 0,
    image: content,
  },
   {
    status: 'Published',
    date: '12 Aug 2022 10:00 PM',
    title: 'Penyesuaian Aturan dan Kebijakan Kerja PT ABC 2025',
    description: 'PT ABC mengumumkan penyesuaian signifikan terhadap beberapa aturan dan kebijakan kantor yang akan mulai berlaku efektif pada 1 November 2025. Perubahan ini merupakan bagian dari upaya ber...',
    views: 5,
    comments: 12,
    shares: 4,
    image: content,
  },
];