// src/types/director.ts

export type EvidenceType = 'link' | 'image' | 'text';
export type TabType = 'metrics' | 'missions' | 'reviews' | 'students';

export interface Mission {
  id: string;
  title: string;
  description: string;
  points: number;
  dueDate: string;
  evidenceType: EvidenceType;
  status: 'ACTIVE' | 'COMPLETED' | 'active' | 'completed';
  classroomId?: string;
  isMandatory?: boolean;
}

export interface Evidence {
  id: string;
  missionId: string;
  missionTitle: string;
  studentId?: string;
  studentName: string;
  avatar?: string;
  submittedAt: string;
  evidenceType: EvidenceType;
  content: string;
  feedback?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'pending' | 'approved' | 'rejected';
}

export interface Student {
  id: string;
  name: string;
  email?: string;
  classroomId?: string;
  points: number;
  completedMissionsCount?: number;
  completedMissions?: number;
  totalMissions?: number;
  pendingReviewsCount?: number;
  status?: 'active' | 'warning' | 'inactive';
}

export interface ClassroomKPIs {
  classroomId?: string;
  classroomName: string;
  totalStudents: number;
  activeMissions: number;
  pendingReviews: number;
  completionRate: number;
  totalPointsAwarded: number;
}

export interface FeaturedStudent {
  classroomId: string;
  studentId: string;
  studentName: string;
  reason: string;
  updatedAt: string;
}