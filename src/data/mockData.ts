import { VideoSummary } from '../types';

export const mockSummaries: VideoSummary[] = [
  {
    id: '1',
    userId: '1',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    videoTitle: 'Understanding React Hooks in 10 Minutes',
    videoThumbnail: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=480&h=270&dpr=1',
    videoDuration: '10:32',
    summary: 'This comprehensive tutorial covers the fundamentals of React Hooks, including useState, useEffect, and custom hooks. The presenter explains how hooks simplify state management and side effects in functional components, making React development more intuitive and powerful.',
    createdAt: '2024-12-10T10:30:00Z'
  },
  {
    id: '2',
    userId: '1',
    youtubeUrl: 'https://www.youtube.com/watch?v=abc123',
    videoTitle: 'Advanced JavaScript Patterns for Modern Web Development',
    videoThumbnail: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=480&h=270&dpr=1',
    videoDuration: '15:45',
    summary: 'An in-depth exploration of advanced JavaScript patterns including the Module Pattern, Observer Pattern, and Factory Pattern. The video demonstrates practical applications of these patterns in modern web development scenarios with real-world examples.',
    createdAt: '2024-12-09T14:20:00Z'
  },
  {
    id: '3',
    userId: '1',
    youtubeUrl: 'https://www.youtube.com/watch?v=xyz789',
    videoTitle: 'Building Scalable APIs with Node.js and Express',
    videoThumbnail: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=480&h=270&dpr=1',
    videoDuration: '22:18',
    summary: 'A comprehensive guide to building production-ready APIs using Node.js and Express. Topics covered include middleware implementation, error handling, authentication strategies, database integration, and performance optimization techniques.',
    createdAt: '2024-12-08T09:15:00Z'
  }
];