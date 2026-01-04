
import { User, UserRole } from './types';

export const GEMINI_MODELS = {
  TEXT: 'gemini-3-flash-preview',
  IMAGE_EDIT: 'gemini-2.5-flash-image',
  VOICE: 'gemini-2.5-flash-native-audio-preview-09-2025',
  VEO: 'veo-3.1-fast-generate-preview'
};

export const MOCK_EDITORS: User[] = [
  {
    id: "ed_001",
    name: "Alex Chen",
    email: "alex@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Motion Design",
    rate: 75,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    tags: ["2D Animation", "Explainer Videos", "Commercial"],
    bio: "8 years crafting motion graphics for brands like Nike, Spotify, and Airbnb. Specialized in kinetic typography and brand storytelling.",
    location: "Los Angeles, CA",
    timezone: "PST",
    completedProjects: 47,
    rating: 4.9,
    turnaround: "2-3 days",
    skills: ["After Effects", "Premiere Pro", "Cinema 4D", "Lottie"],
    portfolioItems: [
      { id: 1, title: "Nike Spring Campaign", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/nike/400/225", client: "Nike" },
      { id: 2, title: "Spotify Wrapped 2023", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/spotify/400/225", client: "Spotify" }
    ],
    reviews: [
      { clientName: "Sarah M.", company: "TechCorp", rating: 5, text: "Alex delivered beyond expectations. Fast turnaround and creative solutions.", projectType: "Product Demo", date: "2025-12-15" }
    ],
    packages: [
      { name: "Basic Edit", price: 500, delivery: "3 days", revisions: 2 },
      { name: "Standard", price: 850, delivery: "5 days", revisions: 3 },
      { name: "Premium", price: 1200, delivery: "7 days", revisions: "Unlimited" }
    ]
  },
  {
    id: "ed_002",
    name: "Maria Rodriguez",
    email: "maria@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Color Grading",
    rate: 90,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maria",
    tags: ["DaVinci Resolve", "Feature Film", "Music Videos"],
    bio: "Focused on mood and atmosphere. I bring high-end cinematic looks to indie films and luxury brand commercials.",
    location: "Madrid, Spain",
    timezone: "CET",
    completedProjects: 124,
    rating: 5.0,
    turnaround: "4-5 days",
    skills: ["DaVinci Resolve", "Color Science", "Baselight"],
    portfolioItems: [
      { id: 1, title: "Sunset over Madrid", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/madrid/400/225", client: "Tourist Board" }
    ],
    reviews: [
      { clientName: "Juan P.", company: "CinemaLight", rating: 5, text: "The color palette was breathtaking.", projectType: "Short Film", date: "2025-11-20" }
    ],
    packages: [
      { name: "Basic Grade", price: 400, delivery: "3 days", revisions: 1 },
      { name: "Master Grade", price: 1500, delivery: "7 days", revisions: 5 }
    ]
  },
  {
    id: "ed_003",
    name: "James Wilson",
    email: "james@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "VFX Supervisor",
    rate: 120,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=James",
    tags: ["Compositing", "3D Tracking", "Clean Plate"],
    bio: "Invisible VFX specialist. If you can't tell it was edited, I've done my job. 10 years in feature film post-production.",
    location: "London, UK",
    timezone: "GMT",
    completedProjects: 82,
    rating: 4.8,
    turnaround: "7 days",
    skills: ["Nuke", "Houdini", "Maya"],
    portfolioItems: [
      { id: 1, title: "The Martian Project", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/mars/400/225", client: "SciFi Channel" }
    ],
    reviews: [
      { clientName: "Robert D.", company: "PostHouse", rating: 4, text: "Solid technical skills. Very reliable.", projectType: "Clean up", date: "2025-10-05" }
    ],
    packages: [
      { name: "Single Shot Cleanup", price: 200, delivery: "2 days", revisions: 2 },
      { name: "Full Scene Composite", price: 2000, delivery: "14 days", revisions: 3 }
    ]
  },
  {
    id: "ed_004",
    name: "Yuki Tanaka",
    email: "yuki@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Social Content",
    rate: 55,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Yuki",
    tags: ["TikTok", "Reels", "Engagement"],
    bio: "I edit for the attention economy. High-retention cuts for creators who want to go viral.",
    location: "Tokyo, Japan",
    timezone: "JST",
    completedProjects: 215,
    rating: 4.9,
    turnaround: "24 hours",
    skills: ["CapCut", "Premiere Pro", "Subtitles"],
    portfolioItems: [
      { id: 1, title: "Street Food Tour", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/tokyo/400/225", client: "FoodieVlogs" }
    ],
    reviews: [
      { clientName: "Ken S.", company: "CreatorLab", rating: 5, text: "Turned my raw footage into a viral hit.", projectType: "TikTok Series", date: "2025-12-01" }
    ],
    packages: [
      { name: "Single Reel", price: 150, delivery: "24h", revisions: 1 },
      { name: "Weekly Batch (5)", price: 600, delivery: "3 days", revisions: 2 }
    ]
  },
  {
    id: "ed_005",
    name: "Liam O'Connor",
    email: "liam@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Documentary",
    rate: 85,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Liam",
    tags: ["Storytelling", "Interview", "Archive"],
    bio: "Sifting through hours of footage to find the human story. I specialize in character-driven narratives.",
    location: "Dublin, Ireland",
    timezone: "GMT",
    completedProjects: 31,
    rating: 5.0,
    turnaround: "10 days",
    skills: ["Premiere Pro", "Storyboarding", "Transcriptions"],
    portfolioItems: [
      { id: 1, title: "The Last Fisherman", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/fish/400/225", client: "Indie Docs" }
    ],
    reviews: [
      { clientName: "Alice H.", company: "GreenStory", rating: 5, text: "Emotional and perfectly paced.", projectType: "Feature Doc", date: "2025-09-12" }
    ],
    packages: [
      { name: "Short Doc Edit", price: 1500, delivery: "10 days", revisions: 3 }
    ]
  },
  {
    id: "ed_006",
    name: "Chloe Dubois",
    email: "chloe@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Fashion & Beauty",
    rate: 100,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Chloe",
    tags: ["Vogue Style", "Luxury", "Dynamic"],
    bio: "Fast, rhythmic, and stylish. I edit for luxury fashion houses and high-end beauty brands.",
    location: "Paris, France",
    timezone: "CET",
    completedProjects: 64,
    rating: 4.7,
    turnaround: "3-4 days",
    skills: ["Final Cut Pro", "Motion Graphics", "Color Grading"],
    portfolioItems: [
      { id: 1, title: "Paris Fashion Week", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/paris/400/225", client: "LVMH" }
    ],
    reviews: [
      { clientName: "Marc L.", company: "Moda Paris", rating: 4, text: "Great energy in the cuts.", projectType: "Promo", date: "2025-08-30" }
    ],
    packages: [
      { name: "Brand Promo", price: 1000, delivery: "4 days", revisions: 2 }
    ]
  },
  {
    id: "ed_007",
    name: "Zoe Wang",
    email: "zoe@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Corporate",
    rate: 65,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Zoe",
    tags: ["Interviews", "Clean", "Corporate"],
    bio: "Professional, clean, and reliable edits for corporate communications and internal events.",
    location: "Singapore",
    timezone: "SGT",
    completedProjects: 95,
    rating: 4.8,
    turnaround: "2 days",
    skills: ["Premiere Pro", "Audio Cleanup", "Branding"],
    portfolioItems: [
      { id: 1, title: "Annual Report 2024", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/corp/400/225", client: "GlobalBank" }
    ],
    reviews: [
      { clientName: "Derek T.", company: "HR Direct", rating: 5, text: "Very professional and followed brand guidelines perfectly.", projectType: "Training Video", date: "2025-07-22" }
    ],
    packages: [
      { name: "Interview Edit", price: 400, delivery: "2 days", revisions: 2 }
    ]
  },
  {
    id: "ed_008",
    name: "Oliver Smith",
    email: "oliver@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Wedding & Events",
    rate: 50,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Oliver",
    tags: ["Cinematic", "Emotional", "Multi-cam"],
    bio: "Capturing the magic of your special day. I create heirloom-quality wedding films.",
    location: "Sydney, Australia",
    timezone: "AEST",
    completedProjects: 156,
    rating: 4.9,
    turnaround: "14 days",
    skills: ["Premiere Pro", "Music Bed", "Color Correction"],
    portfolioItems: [
      { id: 1, title: "Summer Wedding in Bali", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/wedding/400/225", client: "The Browns" }
    ],
    reviews: [
      { clientName: "Sophie B.", company: "Personal", rating: 5, text: "We cried watching it. Thank you Oliver!", projectType: "Wedding Film", date: "2025-06-15" }
    ],
    packages: [
      { name: "Highlight Reel", price: 800, delivery: "14 days", revisions: 1 },
      { name: "Full Documentary", price: 2000, delivery: "30 days", revisions: 2 }
    ]
  },
  {
    id: "ed_009",
    name: "Aisha Khan",
    email: "aisha@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Music Videos",
    rate: 110,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Aisha",
    tags: ["Trippy", "Glitches", "Rhythmic"],
    bio: "Experimental music video editor. I push the boundaries of rhythm and visual effects.",
    location: "New York, NY",
    timezone: "EST",
    completedProjects: 42,
    rating: 5.0,
    turnaround: "5 days",
    skills: ["After Effects", "Plugins", "Premiere Pro"],
    portfolioItems: [
      { id: 1, title: "Underground Beats", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/music/400/225", client: "RecordLabel" }
    ],
    reviews: [
      { clientName: "Jay Z.", company: "SoundCloud", rating: 5, text: "The energy is unmatched.", projectType: "Music Video", date: "2025-05-01" }
    ],
    packages: [
      { name: "Music Video Cut", price: 1200, delivery: "5 days", revisions: 3 }
    ]
  },
  {
    id: "ed_010",
    name: "Finn Nelson",
    email: "finn@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Gaming",
    rate: 45,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Finn",
    tags: ["Montage", "Twitch", "Fast-paced"],
    bio: "Ex-semi-pro gamer turned editor. I know exactly how to time a kill-feed to the beat.",
    location: "Berlin, Germany",
    timezone: "CET",
    completedProjects: 310,
    rating: 4.6,
    turnaround: "2 days",
    skills: ["Premiere Pro", "Memes", "Sound FX"],
    portfolioItems: [
      { id: 1, title: "CS2 Global Elite Clips", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/gaming/400/225", client: "ProGamer" }
    ],
    reviews: [
      { clientName: "X-God", company: "Esports", rating: 4, text: "Good edits, very fast.", projectType: "Montage", date: "2025-04-10" }
    ],
    packages: [
      { name: "10-min Episode", price: 300, delivery: "2 days", revisions: 2 }
    ]
  },
  {
    id: "ed_011",
    name: "Sophie Clark",
    email: "sophie@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Documentary",
    rate: 95,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sophie",
    tags: ["Nature", "Cinematic", "Pacing"],
    bio: "Nature and wildlife documentary specialist. Experience with 8K footage and complex soundscapes.",
    location: "Vancouver, Canada",
    timezone: "PST",
    completedProjects: 22,
    rating: 5.0,
    turnaround: "14 days",
    skills: ["DaVinci Resolve", "Sound Design", "Nature Grading"],
    portfolioItems: [
      { id: 1, title: "The Grizzly Cycle", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/bear/400/225", client: "WildLife TV" }
    ],
    reviews: [
      { clientName: "G. Attenborough", company: "NatureWatch", rating: 5, text: "Superb eye for nature storytelling.", projectType: "Series", date: "2025-03-05" }
    ],
    packages: [
      { name: "Nature Segment", price: 1000, delivery: "14 days", revisions: 2 }
    ]
  },
  {
    id: "ed_012",
    name: "Noah Kim",
    email: "noah@tsunagi.com",
    role: UserRole.EDITOR,
    specialty: "Motion Design",
    rate: 80,
    portfolioVideo: "https://vjs.zencdn.net/v/oceans.mp4",
    profilePhoto: "https://api.dicebear.com/7.x/avataaars/svg?seed=Noah",
    tags: ["3D", "Unreal Engine", "Tech"],
    bio: "Merging Unreal Engine 5 with traditional motion design for next-gen product reveals.",
    location: "Seoul, Korea",
    timezone: "KST",
    completedProjects: 51,
    rating: 4.9,
    turnaround: "5 days",
    skills: ["Unreal Engine", "Blender", "After Effects"],
    portfolioItems: [
      { id: 1, title: "Phone X Reveal", video: "https://vjs.zencdn.net/v/oceans.mp4", thumbnail: "https://picsum.photos/seed/phone/400/225", client: "TechGiant" }
    ],
    reviews: [
      { clientName: "Mr. Lee", company: "Samsung", rating: 5, text: "Unbelievable quality and technical depth.", projectType: "Product Reveal", date: "2025-02-15" }
    ],
    packages: [
      { name: "3D Product Intro", price: 1500, delivery: "7 days", revisions: 3 }
    ]
  }
];
