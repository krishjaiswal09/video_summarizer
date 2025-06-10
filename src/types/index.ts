export interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
  role: 'user' | 'admin';
  dailyUsage: number;
  totalUsage: number;
  createdAt: string;
}

export interface VideoSummary {
  id: string;
  userId: string;
  youtubeUrl: string;
  videoTitle: string;
  videoThumbnail: string;
  videoDuration: string;
  summary: string;
  createdAt: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}