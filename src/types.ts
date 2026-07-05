export interface Memory {
  id: string;
  title: string;
  date: string;
  category: string;
  description: string;
  image: string; // Base64 or placeholder URL
  createdAt: string;
}

export interface BucketListItem {
  id: string;
  title: string;
  completed: boolean;
  completedAt?: string;
  note?: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description: string;
  icon: string; // Lucide icon name
}

export interface LoveConfig {
  partner1: string;
  partner2: string;
  anniversaryDate: string;
}
