export interface ImageMoment {
  url: string;
  caption: string;
}

export interface YearGallery {
  year: number;
  images: ImageMoment[];
}

export interface SocialPost {
  id: string;
  year: number;
  likes: number;
  isLikedByUser: boolean;
  caption: string;
  image: string;
  comments: {
    id: string;
    author: string;
    text: string;
    date: string;
  }[];
}

export interface GuestbookWish {
  id: string;
  name: string;
  relation: string;
  message: string;
  date: string;
}

export const YEAR_GALLERIES: YearGallery[] = [
  {
    year: 2021,
    images: [
      { url: "/images/sample2021_1.jpeg", caption: "Where our eyes first met." },
      { url: "/images/sample2021_2.jpeg", caption: "Our very first coffee date." },
      { url: "/images/sample2021_3.jpeg", caption: "Laughing under the city lights." },
      { url: "/images/sample2021_4.jpeg", caption: "A spontaneous drive to nowhere." },
      { url: "/images/sample2021_5.jpeg", caption: "Cozy Sunday walks." },
      { url: "/images/sample2021_3.jpeg", caption: "Dancing on the empty streets." }
    ]
  },
  {
    year: 2022,
    images: [
      { url: "/images/sample2022_1.jpeg", caption: "Our first major trip together." },
      { url: "/images/sample2022_2.jpeg", caption: "Watching sunset by the coast." },
      { url: "/images/sample2022_3.jpeg", caption: "Sand in our shoes, love in our hearts." },
      { url: "/images/sample2022_4.jpeg", caption: "Picnics on sunny afternoons." },
      { url: "/images/sample2022_5.jpeg", caption: "Winter warm blankets." },
      { url: "/images/sample2022_3.jpeg", caption: "Sharing sweet dessert cravings." }
    ]
  },
  {
    year: 2023,
    images: [
      { url: "/images/sample2023_1.jpeg", caption: "Celebrating milestones in style." },
      { url: "/images/sample2023_2.jpeg", caption: "A romantic candle-lit dinner." },
      { url: "/images/sample2023_3.jpeg", caption: "Walking hand in hand through the garden." },
      { url: "/images/sample2023_4.jpeg", caption: "Under the magical canopy of fairy lights." },
      { url: "/images/sample2023_5.jpeg", caption: "Ringing in another year together." },
      { url: "/images/sample2023_3.jpeg", caption: "Our quiet lakeside conversations." }
    ]
  },
  {
    year: 2024,
    images: [
      { url: "/images/sample2024_1.jpeg", caption: "Mountain adventures." },
      { url: "/images/sample2024_2.jpeg", caption: "Fresh mountain air and pure joy." },
      { url: "/images/sample2024_3.jpeg", caption: "Road trips through scenic valleys." },
      { url: "/images/sample2024_4.jpeg", caption: "Finding beauty in the deep forests." },
      { url: "/images/sample2024_5.jpeg", caption: "Dancing to our favorite vinyl track." },
      { url: "/images/sample2024_6.jpeg", caption: "Stargazing on a clear summer night." },
      { url: "/images/sample2024_7.jpeg", caption: "Stargazing on a clear summer night." },
      { url: "/images/sample2024_8.jpeg", caption: "Stargazing on a clear summer night." }
    ]
  },
  {
    year: 2025,
    images: [
      { url: "/images/sample2025_1.jpeg", caption: "Waking up to snowy mornings." },
      { url: "/images/sample2025_2.jpeg", caption: "Baking our first homemade cake." },
      { url: "/images/sample2025_3.jpeg", caption: "Concert nights filled with lights." },
      { url: "/images/sample2025_4.jpeg", caption: "Cozy rainy days inside." },
      { url: "/images/sample2025_5.jpeg", caption: "Promise of a beautiful future." },
      { url: "/images/sample2025_3.jpeg", caption: "A romantic walk under cherry blossoms." }
    ]
  },
  {
    year: 2026,
    images: [
      { url: "/images/sample2026_1.jpeg", caption: "Half a decade of love and countles memories." },
      { url: "/images/sample2026_2.jpeg", caption: "Building our dream home together." },
      { url: "/images/sample2026_3.jpeg", caption: "Sunset kisses on the terrace." },
      { url: "/images/sample2026_4.jpeg", caption: "Looking back at how far we came." },
      { url: "/images/sample2026_5.jpeg", caption: "Hand in hand, into the forever." },
      { url: "/images/sample2026_3.jpeg", caption: "Celebrating our 5th Golden Anniversary!" }
    ]
  }
];

export const INITIAL_SOCIAL_POSTS: SocialPost[] = [
  {
    id: "post1",
    year: 2021,
    likes: 31,
    isLikedByUser: false,
    caption: "Where our beautiful story began. Coffee dates, endless laughter, and butterflies in our stomachs. ☕️💖 #FirstYear #LoveStory",
    image: "/images/memory3.jpeg",
    comments: [
      { id: "c1", author: "Anika", text: "I still remember this day! You were so nervous!", date: "2021-01-05" },
      { id: "c2", author: "Rahul", text: "The start of something legendary!", date: "2021-01-06" },
      { id: "c3", author: "Riya", text: "Touchwood, stay happy forever! 🌟", date: "2021-01-08" }
    ]
  },
  {
    id: "post2",
    year: 2022,
    likes: 56,
    isLikedByUser: false,
    caption: "A quiet, cozy rainy day inside, sharing hot tea and dreaming of a warm future together. ☔️🍵 #CozyDays #UsAgainstTheWorld",
    image: "/images/memory2.jpeg",
    comments: [
      { id: "c2-1", author: "Joy", text: "Major couple goals right here!", date: "2022-11-12" },
      { id: "c2-2", author: "Pooja", text: "Raining outside, but warm inside! So cute.", date: "2022-11-13" }
    ]
  },
  {
    id: "post3",
    year: 2023,
    likes: 84,
    isLikedByUser: false,
    caption: "Shared sunsets and ocean breezes. There's nobody else I'd rather explore the world with. 🌊⛵️ #AdventurePartners #ForeverLove",
    image: "/images/memory4.jpeg",
    comments: [
      { id: "c4", author: "Sneha", text: "Breathtaking click! You two look adorable.", date: "2023-08-15" },
      { id: "c5", author: "Sourav's Mom", text: "So beautiful. God bless you both.", date: "2023-08-16" }
    ]
  },
  {
    id: "post4",
    year: 2024,
    likes: 98,
    isLikedByUser: false,
    caption: "Dancing on the empty streets under the romantic yellow glow of the city lights. 💃🕺✨ #SpontaneousMoments #MidnightDance",
    image: "/images/sample2026_1.jpeg",
    comments: [
      { id: "c4-1", author: "Debasish", text: "Is this a movie scene? Simply gorgeous!", date: "2024-04-10" },
      { id: "c4-2", author: "Mimi", text: "I want a photoshoot like this too! 😍", date: "2024-04-11" }
    ]
  },
  {
    id: "post5",
    year: 2026,
    likes: 120,
    isLikedByUser: false,
    caption: "To the future and beyond! Celebrating 5 years of our union, and I would still choose you in every lifetime. Happy 5th Anniversary! ♾️❤️ #AnniversaryCelebration #HalfDecade",
    image: "/images/sample2026_2.jpeg",
    comments: [
      { id: "c6", author: "Riya", text: "Happy 5 Years! stay happy forever!", date: "2026-07-01" },
      { id: "c7", author: "Sourav", text: "Congratulations on the milestone guys! 🎉", date: "2026-07-02" }
    ]
  }
];

export const INITIAL_GUESTBOOK_WISHES: GuestbookWish[] = [
  {
    id: "w1",
    name: "Anika Sen",
    relation: "Best Friend",
    message: "Happy 5th Anniversary, guys! Watching you two grow together over these five years has been a true privilege. Wishing you eternal happiness and countless more adventures!",
    date: "2026-07-04"
  },
  {
    id: "w2",
    name: "Rahul Mehta",
    relation: "Brother",
    message: "Cheers to the most beautiful couple in the world! Atri and Sourav, your love story is truly inspirational. Keep shining, laughing, and irritating each other! 😂🥂",
    date: "2026-07-03"
  },
  {
    id: "w3",
    name: "Dr. Alok Sharma",
    relation: "Family",
    message: "Wishing you both a blessed 5th marriage anniversary. May your love grow stronger with each passing day and your home continue to overflow with laughter and blessings.",
    date: "2026-07-02"
  }
];

export const ROMANCE_REELS = [
  {
    id: "reel1",
    title: "Sweet Sunset Memories",
    videoUrl: "/videos/beach_2.mp4",
    poster: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=300"
  },
  {
    id: "reel2",
    title: "Walking in Golden Fields",
    videoUrl: "/videos/v1.mp4",
    poster: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=300"
  },
  {
    id: "reel3",
    title: "Moments by the Beach",
    videoUrl: "/videos/v2.mp4",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300"
  },
  {
    id: "reel4",
    title: "Under the Cozy Umbrella",
    videoUrl: "/videos/v3.mp4",
    poster: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300"
  },
  {
    id: "reel5",
    title: "Fireplace Conversations",
    videoUrl: "/videos/v4.mp4",
    poster: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=300"
  }
];

export const MUSIC_PLAYLIST = [
  {
    id: "track4",
    title: "Soft Lofi Romance",
    artist: "Acoustic Whispers",
    url: "/music/music3.mp3"
  },
  {
    id: "track3",
    title: "Soft Lofi Romance",
    artist: "Acoustic Whispers",
    url: "/music/music4.mp3"
  },
  {
    id: "track1",
    title: "Soft Lofi Romance",
    artist: "Acoustic Whispers",
    url: "/music/tum hi.mp3"
  },
  {
    id: "track2",
    title: "Paris Rain Kiss",
    artist: "Melodic Piano Solo",
    url: "/music/music1.mp3"
  },
  {
    id: "track3",
    title: "Midnight Café Jazz",
    artist: "The Smooth Trio",
    url: "/music/music2.mp3"
  }
];