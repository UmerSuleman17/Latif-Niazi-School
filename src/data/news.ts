export type NewsCategory = 
  | 'Announcement'
  | 'Examination'
  | 'Admissions'
  | 'Achievement'
  | 'School Activity'
  | 'Sports'
  | 'Competition'
  | 'Event'
  | 'Holiday'
  | 'Notice'
  | 'General';

export type NewsItem = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  category: NewsCategory;
  date: string;
  image: string;
  featured: boolean;
};

export type EventStatus = 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

export type EventItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  date: string;
  day: string;
  month: string;
  time?: string;
  location?: string;
  status: EventStatus;
  image?: string;
};

export const newsCategories: NewsCategory[] = [
  'Announcement',
  'Examination',
  'Admissions',
  'Achievement',
  'School Activity',
  'Sports',
  'Competition',
  'Event',
  'Holiday',
  'Notice',
  'General'
];

export const getCategoryColor = (category: NewsCategory): string => {
  switch (category) {
    case 'Announcement':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Examination':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Admissions':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Achievement':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'School Activity':
      return 'bg-sky-100 text-sky-800 border-sky-200';
    case 'Sports':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'Notice':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
};

export const getStatusColor = (status: EventStatus): string => {
  switch (status) {
    case 'upcoming':
      return 'bg-blue-100 text-blue-800';
    case 'ongoing':
      return 'bg-green-100 text-green-800';
    case 'completed':
      return 'bg-gray-100 text-gray-800';
    case 'cancelled':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    slug: 'annual-sports-day-2026',
    title: 'Annual Sports Day 2026 Announced',
    excerpt: 'Join us for an exciting day of athletic competition and team spirit at our upcoming Annual Sports Day.',
    content: 'Full details about the upcoming Annual Sports Day will be posted soon. Students are encouraged to start preparing and sign up for their preferred events through their class teachers.',
    category: 'Sports',
    date: '2026-08-01',
    image: '/images/students/sports.png',
    featured: true
  },
  {
    id: 'news-2',
    slug: 'admissions-open-2026-2027',
    title: 'Admissions Open for Academic Year 2026-2027',
    excerpt: 'We are now accepting applications for the upcoming academic year. Secure your child\'s future with LNMHS.',
    content: 'The admission process for the academic year 2026-2027 has officially commenced. Parents can collect the admission forms from the school office during working hours or apply online through our portal.',
    category: 'Admissions',
    date: '2026-07-25',
    image: '/images/events/admissions.png',
    featured: false
  },
  {
    id: 'news-3',
    slug: 'mid-term-examinations-schedule',
    title: 'Mid-Term Examinations Schedule Released',
    excerpt: 'The detailed schedule for the upcoming mid-term examinations is now available for all classes.',
    content: 'Please find the attached schedule for the mid-term examinations. We wish all our students the best of luck in their preparations.',
    category: 'Examination',
    date: '2026-08-05',
    image: '/images/students/classroom.png',
    featured: false
  },
  {
    id: 'news-4',
    slug: 'independence-day-celebration',
    title: 'Independence Day Celebration at Campus',
    excerpt: 'A grand celebration is planned for Independence Day with student performances and flag hoisting ceremony.',
    content: 'We invite all parents and students to join us in celebrating our nation\'s Independence Day. The event will feature patriotic songs, speeches, and special performances by our talented students.',
    category: 'School Activity',
    date: '2026-08-10',
    image: '/images/events/school-event.png',
    featured: true
  },
  {
    id: 'news-5',
    slug: 'science-fair-winners-announced',
    title: 'Inter-School Science Fair Winners Announced',
    excerpt: 'Congratulations to our students for securing the first position in the regional science fair.',
    content: 'Our team of brilliant young scientists has made us proud by winning the top prize at the Regional Inter-School Science Fair. Their project on renewable energy sources impressed the judges.',
    category: 'Achievement',
    date: '2026-07-20',
    image: '/images/students/competition.png',
    featured: false
  },
  {
    id: 'news-6',
    slug: 'new-library-books-arrival',
    title: 'New Collection of Books Added to Library',
    excerpt: 'We have updated our library with over 500 new titles across various subjects and genres.',
    content: 'Students are encouraged to visit the school library to explore the newly added collection of books, ranging from classic literature to modern science fiction and reference materials.',
    category: 'Announcement',
    date: '2026-08-08',
    image: '/images/social/news.jpeg',
    featured: false
  },
  {
    id: 'news-7',
    slug: 'parent-teacher-meeting-august',
    title: 'Parent-Teacher Meeting Scheduled',
    excerpt: 'A mandatory PTM is scheduled for all classes to discuss student progress and academic goals.',
    content: 'The upcoming Parent-Teacher Meeting will provide an opportunity to discuss your child\'s academic progress, behavioral development, and strategies for improvement.',
    category: 'Notice',
    date: '2026-08-12',
    image: '/images/social/add.jpeg',
    featured: false
  },
  {
    id: 'news-8',
    slug: 'art-competition-call-for-entries',
    title: 'Annual Art Competition: Call for Entries',
    excerpt: 'Showcase your creativity in the upcoming school-wide art competition. Theme: Nature\'s Harmony.',
    content: 'Calling all budding artists! Submit your original artworks for the Annual Art Competition. The winning entries will be displayed in the school corridor and featured in the annual magazine.',
    category: 'Competition',
    date: '2026-08-15',
    image: '/images/students/activities.png',
    featured: false
  }
];

export const upcomingEvents: EventItem[] = [
  {
    id: 'event-1',
    slug: 'independence-day-2026',
    title: 'Independence Day Ceremony',
    description: 'Flag hoisting ceremony followed by student performances and speeches to celebrate Independence Day.',
    date: '2026-08-14',
    day: '14',
    month: 'Aug',
    time: '08:00 AM - 11:30 AM',
    location: 'Main School Ground',
    status: 'upcoming'
  },
  {
    id: 'event-2',
    slug: 'parent-teacher-meeting-aug-2026',
    title: 'Parent-Teacher Meeting',
    description: 'First term progress review and interaction between parents and subject teachers.',
    date: '2026-08-20',
    day: '20',
    month: 'Aug',
    time: '09:00 AM - 01:00 PM',
    location: 'Respective Classrooms',
    status: 'upcoming'
  },
  {
    id: 'event-3',
    slug: 'mid-term-exams-start',
    title: 'Mid-Term Examinations Begin',
    description: 'Commencement of the mid-term examinations for classes 1 through 10.',
    date: '2026-09-05',
    day: '05',
    month: 'Sep',
    time: '08:30 AM',
    location: 'Examination Halls',
    status: 'upcoming'
  },
  {
    id: 'event-4',
    slug: 'science-exhibition-2026',
    title: 'Annual Science Exhibition',
    description: 'Students showcase their innovative science projects and models to parents and guests.',
    date: '2026-09-25',
    day: '25',
    month: 'Sep',
    time: '10:00 AM - 02:00 PM',
    location: 'School Auditorium',
    status: 'upcoming'
  }
];
