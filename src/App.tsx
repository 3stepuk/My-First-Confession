import React, { useState, useEffect } from 'react';
import { ActiveTab, AppendixTab, UserProfile, UserProgress } from './types';
import { 
  loadProfile, 
  saveProfile, 
  loadProgress, 
  saveProgress, 
  resetAllData,
  DEFAULT_PROFILE,
  DEFAULT_PROGRESS
} from './utils/storage';
import { Header } from './components/Header';
import { HeroHome } from './components/HeroHome';
import { LessonsList } from './components/LessonsList';
import { LessonDetail } from './components/LessonDetail';
import { MemoryDrill } from './components/MemoryDrill';
import { SummaryCatechismView } from './components/SummaryCatechismView';
import { AppendicesView } from './components/AppendicesView';
import { ProfileView } from './components/ProfileView';
import { Footer } from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('home');
  const [activeAppendixTab, setActiveAppendixTab] = useState<AppendixTab>('examination');
  const [selectedLessonId, setSelectedLessonId] = useState<number | null>(null);

  const [profile, setProfile] = useState<UserProfile>(loadProfile);
  const [progress, setProgress] = useState<UserProgress>(loadProgress);

  // Sync state to localStorage
  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  // Handle lesson selection
  const handleSelectLesson = (lessonId: number) => {
    setSelectedLessonId(lessonId);
    setActiveTab('lessons');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle open appendix tab
  const handleOpenAppendix = (tab: AppendixTab) => {
    setActiveAppendixTab(tab);
    setActiveTab('appendices');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle complete lesson
  const handleToggleCompleteLesson = (lessonId: number) => {
    setProgress(prev => {
      const exists = prev.completedLessons.includes(lessonId);
      const newCompleted = exists
        ? prev.completedLessons.filter(id => id !== lessonId)
        : [...prev.completedLessons, lessonId];
      return { ...prev, completedLessons: newCompleted };
    });
  };

  // Toggle bookmark lesson
  const handleToggleBookmarkLesson = (lessonId: number) => {
    setProgress(prev => {
      const exists = prev.bookmarkedLessons.includes(lessonId);
      const newBookmarks = exists
        ? prev.bookmarkedLessons.filter(id => id !== lessonId)
        : [...prev.bookmarkedLessons, lessonId];
      return { ...prev, bookmarkedLessons: newBookmarks };
    });
  };

  // Toggle question mastery
  const handleToggleQuestionMastery = (questionId: number) => {
    setProgress(prev => {
      const current = prev.drillMastery[questionId] || { correct: 0, attempts: 0, mastered: false };
      const updated = {
        ...prev.drillMastery,
        [questionId]: {
          ...current,
          mastered: !current.mastered
        }
      };
      return { ...prev, drillMastery: updated };
    });
  };

  // Update score from memory drill
  const handleUpdateDrillScore = (questionId: number, isCorrect: boolean) => {
    setProgress(prev => {
      const current = prev.drillMastery[questionId] || { correct: 0, attempts: 0, mastered: false };
      const updated = {
        ...prev.drillMastery,
        [questionId]: {
          correct: isCorrect ? current.correct + 1 : current.correct,
          attempts: current.attempts + 1,
          mastered: isCorrect || current.mastered
        }
      };
      return { ...prev, drillMastery: updated };
    });
  };

  // Reset drill scores
  const handleResetDrillScores = () => {
    setProgress(prev => ({
      ...prev,
      drillMastery: {}
    }));
  };

  // Toggle examination item checked
  const handleToggleExaminationItem = (id: string) => {
    setProgress(prev => {
      const exists = prev.examinationChecked.includes(id);
      const updated = exists
        ? prev.examinationChecked.filter(item => item !== id)
        : [...prev.examinationChecked, id];
      return { ...prev, examinationChecked: updated };
    });
  };

  // Clear all examination items
  const handleClearExamination = () => {
    setProgress(prev => ({
      ...prev,
      examinationChecked: []
    }));
  };

  // Toggle readiness checklist item
  const handleToggleReadinessItem = (id: string) => {
    setProgress(prev => {
      const exists = prev.readinessChecked.includes(id);
      const updated = exists
        ? prev.readinessChecked.filter(item => item !== id)
        : [...prev.readinessChecked, id];
      return { ...prev, readinessChecked: updated };
    });
  };

  // Reset all application data
  const handleResetData = () => {
    resetAllData();
    setProfile(DEFAULT_PROFILE);
    setProgress(DEFAULT_PROGRESS);
    setSelectedLessonId(null);
    setActiveTab('home');
  };

  // Import application data
  const handleImportData = (imported: { profile: UserProfile; progress: UserProgress }) => {
    setProfile(imported.profile);
    setProgress(imported.progress);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-neutral-200 flex flex-col font-sans-main antialiased selection:bg-[#D4A936]/30 selection:text-[#F3E5AB]">
      {/* Sticky Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'lessons') {
            // keep selectedLessonId if already inside or reset to list
          }
          setActiveTab(tab);
        }}
        progress={progress}
        profile={profile}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {activeTab === 'home' && (
          <HeroHome
            progress={progress}
            profile={profile}
            onUpdateProfile={setProfile}
            onSelectLesson={handleSelectLesson}
            setActiveTab={setActiveTab}
            onOpenAppendix={handleOpenAppendix}
          />
        )}

        {activeTab === 'lessons' && (
          selectedLessonId ? (
            <LessonDetail
              lessonId={selectedLessonId}
              progress={progress}
              onBack={() => setSelectedLessonId(null)}
              onSelectLesson={(id) => setSelectedLessonId(id)}
              onToggleComplete={handleToggleCompleteLesson}
              onToggleBookmark={handleToggleBookmarkLesson}
              onToggleQuestionMastery={handleToggleQuestionMastery}
            />
          ) : (
            <LessonsList
              progress={progress}
              onSelectLesson={handleSelectLesson}
              onToggleComplete={handleToggleCompleteLesson}
              onToggleBookmark={handleToggleBookmarkLesson}
            />
          )
        )}

        {activeTab === 'drill' && (
          <MemoryDrill
            progress={progress}
            onUpdateDrillScore={handleUpdateDrillScore}
            onResetDrillScores={handleResetDrillScores}
          />
        )}

        {activeTab === 'catechism' && (
          <SummaryCatechismView
            progress={progress}
            onSelectLesson={handleSelectLesson}
            onToggleQuestionMastery={handleToggleQuestionMastery}
          />
        )}

        {activeTab === 'appendices' && (
          <AppendicesView
            initialTab={activeAppendixTab}
            progress={progress}
            onToggleExaminationItem={handleToggleExaminationItem}
            onToggleReadinessItem={handleToggleReadinessItem}
            onClearExamination={handleClearExamination}
          />
        )}

        {activeTab === 'profile' && (
          <ProfileView
            profile={profile}
            progress={progress}
            onUpdateProfile={setProfile}
            onResetData={handleResetData}
            onImportData={handleImportData}
          />
        )}
      </main>

      {/* Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}
