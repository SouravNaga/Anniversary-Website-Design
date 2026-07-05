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
      { url: "/images/memory3.jpeg", caption: "Where our eyes first met." },
      { url: "/images/memory4.jpeg", caption: "Our very first coffee date." },
      { url: "/images/memory2.jpeg", caption: "Laughing under the city lights." },
      { url: "/images/memory1.jpeg", caption: "A spontaneous drive to nowhere." },
      { url: "/images/memory5.jpeg", caption: "Cozy Sunday walks." },
      { url: "/images/sample2022_4.jpeg", caption: "Dancing on the empty streets." }
    ]
  },
  {
    year: 2022,
    images: [
      { url: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=500&auto=format&fit=crop&q=80", caption: "Our first major trip together." },
      { url: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=500&auto=format&fit=crop&q=80", caption: "Watching sunset by the coast." },
      { url: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=500&auto=format&fit=crop&q=80", caption: "Sand in our shoes, love in our hearts." },
      { url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=500&auto=format&fit=crop&q=80", caption: "Picnics on sunny afternoons." },
      { url: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=500&auto=format&fit=crop&q=80", caption: "Winter warm blankets." },
      { url: "https://images.unsplash.com/photo-1465408913361-a9e3fc951c27?w=500&auto=format&fit=crop&q=80", caption: "Sharing sweet dessert cravings." }
    ]
  },
  {
    year: 2023,
    images: [
      { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80", caption: "Celebrating milestones in style." },
      { url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&auto=format&fit=crop&q=80", caption: "A romantic candle-lit dinner." },
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=500&auto=format&fit=crop&q=80", caption: "Walking hand in hand through the garden." },
      { url: "https://images.unsplash.com/photo-1519225495810-7512c696505a?w=500&auto=format&fit=crop&q=80", caption: "Under the magical canopy of fairy lights." },
      { url: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?w=500&auto=format&fit=crop&q=80", caption: "Ringing in another year together." },
      { url: "https://images.unsplash.com/photo-1501901633158-7f6229571e1b?w=500&auto=format&fit=crop&q=80", caption: "Our quiet lakeside conversations." }
    ]
  },
  {
    year: 2024,
    images: [
      { url: "https://images.unsplash.com/photo-1546032994-dd20c39fc52a?w=500&auto=format&fit=crop&q=80", caption: "Mountain adventures." },
      { url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=500&auto=format&fit=crop&q=80", caption: "Fresh mountain air and pure joy." },
      { url: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=500&auto=format&fit=crop&q=80", caption: "Road trips through scenic valleys." },
      { url: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=500&auto=format&fit=crop&q=80", caption: "Finding beauty in the deep forests." },
      { url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=500&auto=format&fit=crop&q=80", caption: "Dancing to our favorite vinyl track." },
      { url: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=500&auto=format&fit=crop&q=80", caption: "Stargazing on a clear summer night." }
    ]
  },
  {
    year: 2025,
    images: [
      { url: "https://images.unsplash.com/photo-1482484310237-33677a28e744?w=500&auto=format&fit=crop&q=80", caption: "Waking up to snowy mornings." },
      { url: "https://images.unsplash.com/photo-1498837167922-ddd27525d352?w=500&auto=format&fit=crop&q=80", caption: "Baking our first homemade cake." },
      { url: "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=500&auto=format&fit=crop&q=80", caption: "Concert nights filled with lights." },
      { url: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=500&auto=format&fit=crop&q=80", caption: "Cozy rainy days inside." },
      { url: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?w=500&auto=format&fit=crop&q=80", caption: "Promise of a beautiful future." },
      { url: "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=500&auto=format&fit=crop&q=80", caption: "A romantic walk under cherry blossoms." }
    ]
  },
  {
    year: 2026,
    images: [
      { url: "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=500&auto=format&fit=crop&q=80", caption: "Half a decade of love and countles memories." },
      { url: "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?w=500&auto=format&fit=crop&q=80", caption: "Building our dream home together." },
      { url: "https://images.unsplash.com/photo-1531747118685-ca8fa6e08806?w=500&auto=format&fit=crop&q=80", caption: "Sunset kisses on the terrace." },
      { url: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?w=500&auto=format&fit=crop&q=80", caption: "Looking back at how far we came." },
      { url: "https://images.unsplash.com/photo-1515934751635-c81c6bc9a2d8?w=500&auto=format&fit=crop&q=80", caption: "Hand in hand, into the forever." },
      { url: "https://images.unsplash.com/photo-1513829096999-4978602297f7?w=500&auto=format&fit=crop&q=80", caption: "Celebrating our 5th Golden Anniversary!" }
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
      { id: "c5", author: "Amit's Mom", text: "So beautiful. God bless you both.", date: "2023-08-16" }
    ]
  },
  {
    id: "post4",
    year: 2024,
    likes: 98,
    isLikedByUser: false,
    caption: "Dancing on the empty streets under the romantic yellow glow of the city lights. 💃🕺✨ #SpontaneousMoments #MidnightDance",
    image: "/images/memory5.jpeg",
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
    image: "/images/sample2022_5.jpeg",
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
    message: "Cheers to the most beautiful couple in the world! Ekta and Amit, your love story is truly inspirational. Keep shining, laughing, and irritating each other! 😂🥂",
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
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-young-couple-running-in-a-golden-wheat-field-42793-large.mp4",
    poster: "https://images.unsplash.com/photo-1475503572774-15a45e5d60b9?w=300"
  },
  {
    id: "reel3",
    title: "Moments by the Beach",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-on-the-beach-at-sunset-12001-large.mp4",
    poster: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300"
  },
  {
    id: "reel4",
    title: "Under the Cozy Umbrella",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-couple-under-an-umbrella-walking-in-the-rain-34190-large.mp4",
    poster: "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300"
  },
  {
    id: "reel5",
    title: "Fireplace Conversations",
    videoUrl: "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-couple-warming-themselves-by-the-fire-40913-large.mp4",
    poster: "https://images.unsplash.com/photo-1543807535-eceef0bc6599?w=300"
  }
];

export const MUSIC_PLAYLIST = [
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