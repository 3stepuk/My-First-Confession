import { UserProfile, UserProgress } from '../types';

const PROFILE_KEY = 'mfc_user_profile_v1';
const PROGRESS_KEY = 'mfc_user_progress_v1';

export const DEFAULT_PROFILE: UserProfile = {
  candidateName: '',
  parishName: '',
  mentorName: '',
  mentorEmail: '',
  startedDate: new Date().toISOString().split('T')[0],
  formspreeNotified: false,
  formspreeEndpoint: 'https://formspree.io/f/mqkvpzae'
};

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  bookmarkedLessons: [],
  drillMastery: {},
  examinationChecked: [],
  readinessChecked: [],
  notes: {}
};

export function loadProfile(): UserProfile {
  try {
    const saved = localStorage.getItem(PROFILE_KEY);
    if (saved) {
      return { ...DEFAULT_PROFILE, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load profile from localStorage', e);
  }
  return DEFAULT_PROFILE;
}

export function saveProfile(profile: UserProfile): void {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    console.error('Failed to save profile to localStorage', e);
  }
}

export function loadProgress(): UserProgress {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      return { ...DEFAULT_PROGRESS, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.error('Failed to load progress from localStorage', e);
  }
  return DEFAULT_PROGRESS;
}

export function saveProgress(progress: UserProgress): void {
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress to localStorage', e);
  }
}

export function resetAllData(): void {
  try {
    localStorage.removeItem(PROFILE_KEY);
    localStorage.removeItem(PROGRESS_KEY);
  } catch (e) {
    console.error('Failed to reset localStorage data', e);
  }
}
