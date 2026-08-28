export interface CatechismQuestion {
  id: number;
  lessonId?: number;
  question: string;
  answer: string;
}

export interface LessonAction {
  type: string;
  instruction: string;
}

export interface LessonSpecialNote {
  label: string;
  text: string;
}

export interface Lesson {
  id: number;
  title: string;
  remember: string;
  explanation: string[];
  talkAboutIt: {
    question: string;
    guide: string;
  };
  questions: CatechismQuestion[];
  prayer: string;
  action: LessonAction;
  specialNote?: LessonSpecialNote;
}

export interface ExaminationCategory {
  id: string;
  title: string;
  items: {
    id: string;
    text: string;
  }[];
}

export interface ConfessionStep {
  step: number;
  title: string;
  whatHappens: string;
  whatIDo: string;
}

export interface PrayerItem {
  id: string;
  title: string;
  label?: string;
  text: string;
}

export interface ReadinessItem {
  id: string;
  area: string;
  looksLike: string;
}

export interface UserProfile {
  candidateName: string;
  parishName: string;
  mentorName: string;
  mentorEmail: string;
  startedDate: string;
  formspreeNotified: boolean;
  formspreeEndpoint: string;
}

export interface UserProgress {
  completedLessons: number[];
  bookmarkedLessons: number[];
  drillMastery: Record<number, { correct: number; attempts: number; mastered: boolean }>;
  examinationChecked: string[];
  readinessChecked: string[];
  notes: Record<string, string>;
}

export type ActiveTab = 'home' | 'lessons' | 'drill' | 'catechism' | 'appendices' | 'profile';
export type AppendixTab = 'examination' | 'step-by-step' | 'prayers' | 'readiness' | 'sources';
