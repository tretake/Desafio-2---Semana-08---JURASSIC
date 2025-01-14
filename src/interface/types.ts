export interface Task {
  id: number;
  title: string;
  description: string;
  priority: "High" | "Mid" | "Low";
  people: string[];
  startTime: string;
  endTime: string;
  status: string;
  commentsCount: number;
  completedTasksCount: number;
  progress: number;
  startDate: string;
  endDate: string;
  estimatedTime: string;
  createdBy: string;
  photo?: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  userName: string;
  createdAt: string;
  email: string;
  password: string;
  hasImage: boolean;
  photo?: string;
  role: string;
  projects: string[];
  tasks: string[];
  notifications: string[];
  social: {
    twitter: string;
    instagram: string;
    linkedin: string;
  };
}

