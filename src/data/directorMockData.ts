// src/data/directorMockData.ts
import { ClassroomKPIs, Evidence, Mission, Student } from '../types/director';

export const CLASSROOM_ID = '10-02';

export const mockClassroomKPIs: ClassroomKPIs = {
  classroomId: CLASSROOM_ID,
  classroomName: '10-02',
  totalStudents: 28,
  activeMissions: 3,
  pendingReviews: 3,
  completionRate: 82,
  totalPointsAwarded: 12400,
};

export const mockStudents: Student[] = [
  {
    id: 'std-1',
    name: 'Carlos Mendoza',
    email: 'carlos.mendoza@colegio.edu',
    classroomId: CLASSROOM_ID,
    points: 650,
    completedMissionsCount: 12,
    completedMissions: 12,
    totalMissions: 15,
    pendingReviewsCount: 1,
    status: 'active',
  },
  {
    id: 'std-2',
    name: 'Valeria Gómez',
    email: 'valeria.gomez@colegio.edu',
    classroomId: CLASSROOM_ID,
    points: 820,
    completedMissionsCount: 15,
    completedMissions: 15,
    totalMissions: 15,
    pendingReviewsCount: 0,
    status: 'active',
  },
  {
    id: 'std-3',
    name: 'Mateo Hernández',
    email: 'mateo.hernandez@colegio.edu',
    classroomId: CLASSROOM_ID,
    points: 410,
    completedMissionsCount: 8,
    completedMissions: 8,
    totalMissions: 15,
    pendingReviewsCount: 1,
    status: 'warning',
  },
  {
    id: 'std-4',
    name: 'Sofia Torres',
    email: 'sofia.torres@colegio.edu',
    classroomId: CLASSROOM_ID,
    points: 740,
    completedMissionsCount: 14,
    completedMissions: 14,
    totalMissions: 15,
    pendingReviewsCount: 1,
    status: 'active',
  },
];

export const mockMissions: Mission[] = [
  {
    id: 'mis-101',
    title: 'Proyecto de Lectura Crítica',
    description: 'Subir el enlace al ensayo o documento sobre el análisis del texto guía.',
    points: 100,
    dueDate: '2026-08-20',
    classroomId: CLASSROOM_ID,
    evidenceType: 'link',
    status: 'ACTIVE',
  },
  {
    id: 'mis-102',
    title: 'Resolución de Taller de Algoritmos',
    description: 'Subir una imagen fotográfica clara del taller resuelto a mano.',
    points: 150,
    dueDate: '2026-08-18',
    classroomId: CLASSROOM_ID,
    evidenceType: 'image',
    status: 'ACTIVE',
  },
  {
    id: 'mis-103',
    title: 'Reflexión de Trabajo en Equipo',
    description: 'Redactar una breve reflexión sobre la colaboración durante el proyecto.',
    points: 50,
    dueDate: '2026-08-15',
    classroomId: CLASSROOM_ID,
    evidenceType: 'text',
    status: 'ACTIVE',
  },
];

export const mockEvidences: Evidence[] = [
  {
    id: 'ev-201',
    missionId: 'mis-101',
    missionTitle: 'Proyecto de Lectura Crítica',
    studentId: 'std-1',
    studentName: 'Carlos Mendoza',
    submittedAt: '2026-08-11 14:30',
    content: 'https://docs.google.com/document/d/ejemplo-ensayo-carlos',
    evidenceType: 'link',
    status: 'PENDING',
  },
  {
    id: 'ev-202',
    missionId: 'mis-102',
    missionTitle: 'Resolución de Taller de Algoritmos',
    studentId: 'std-3',
    studentName: 'Mateo Hernández',
    submittedAt: '2026-08-11 16:45',
    content: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173',
    evidenceType: 'image',
    status: 'PENDING',
  },
  {
    id: 'ev-203',
    missionId: 'mis-103',
    missionTitle: 'Reflexión de Trabajo en Equipo',
    studentId: 'std-4',
    studentName: 'Sofia Torres',
    submittedAt: '2026-08-10 10:15',
    content: 'El trabajo colaborativo en el salón 10-02 permitió organizar mejor el tiempo y resolver las dudas de forma conjunta.',
    evidenceType: 'text',
    status: 'PENDING',
  },
];