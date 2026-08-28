import React, { useState } from 'react';
import { Lesson, UserProgress } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  MessageCircle, 
  Volume2, 
  VolumeX, 
  Check, 
  Sparkles, 
  Heart, 
  ShieldAlert, 
  HelpCircle,
  Eye,
  EyeOff,
  Copy
} from 'lucide-react';

interface LessonDetailProps {
  lessonId: number;
  progress: UserProgress;
  onBack: () => void;
  onSelectLesson: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
  onToggleQuestionMastery: (questionId: number) => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  lessonId,
  progress,
  onBack,
  onSelectLesson,
  onToggleComplete,
  onToggleBookmark,
  onToggleQuestionMastery
}) => {
  const lesson = LESSONS_DATA.find(l => l.id === lessonId) || LESSONS_DATA[0];
  const isCompleted = progress.completedLessons.includes(lesson.id);
  const isBookmarked = progress.bookmarkedLessons.includes(lesson.id);

  const [showTalkGuide, setShowTalkGuide] = useState(false);
  const [revealedAnswers, setRevealedAnswers] = useState<Record<number, boolean>>({});
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);
  const [copiedPrayer, setCopiedPrayer] = useState(false);

  // Toggle reveal answer for an individual question
  const toggleAnswerReveal = (qId: number) => {
    setRevealedAnswers(prev => ({
      ...prev,
      [qId]: !prev[qId]
    }));
  };

  // Reveal all answers
  const toggleRevealAll = () => {
    const allRevealed = lesson.questions.every(q => revealedAnswers[q.id]);
    const newState: Record<number, boolean> = {};
    lesson.questions.forEach(q => {
      newState[q.id] = !allRevealed;
    });
    setRevealedAnswers(newState);
  };

  // Text-to-speech for children and mentors
  const handleSpeak = (text: string, qId: number) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking === qId) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    setIsSpeaking(qId);
    window.speechSynthesis.speak(utterance);
  };

  const copyPrayerToClipboard = () => {
    navigator.clipboard.writeText(lesson.prayer);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2000);
  };

  const prevLesson = LESSONS_DATA.find(l => l.id === lesson.id - 1);
  const nextLesson = LESSONS_DATA.find(l => l.id === lesson.id + 1);

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between gap-4 border-b border-white/5 pb-4">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-slate-400 hover:text-slate-100 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4 gold-text" />
          <span>All Conversations</span>
        </button>

        <div className="flex items-center space-x-2">
          {/* Bookmark Button */}
          <button
            onClick={() => onToggleBookmark(lesson.id)}
            className={`p-2 rounded border transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-[#2A2312] border-[#D4A936] gold-text'
                : 'card-bg border-white/10 text-slate-400 hover:text-slate-200'
            }`}
            title={isBookmarked ? 'Bookmarked' : 'Bookmark lesson'}
          >
            <Bookmark className="w-4 h-4" fill={isBookmarked ? '#D4A936' : 'none'} />
          </button>

          {/* Mark Completed Toggle */}
          <button
            onClick={() => onToggleComplete(lesson.id)}
            className={`px-3.5 py-2 rounded border text-xs font-semibold uppercase tracking-wider transition-all flex items-center space-x-1.5 cursor-pointer ${
              isCompleted
                ? 'bg-emerald-950/50 border-emerald-600/50 text-emerald-300'
                : 'card-bg border-white/10 text-slate-300 hover:border-[#D4A936]/40 hover:text-[#D4A936]'
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span>Completed</span>
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5 text-slate-500" />
                <span>Mark Done</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Lesson Header */}
      <div className="space-y-4 text-center sm:text-left">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#181818] border border-[#D4A936]/30 text-xs font-bold uppercase tracking-widest gold-text">
          <span>☩</span>
          <span>Lesson {lesson.id} of 12</span>
        </div>

        <h1 className="heading-font text-2xl sm:text-4xl font-bold text-slate-100 leading-tight tracking-wider">
          {lesson.title}
        </h1>
      </div>

      {/* Central Truth Banner (REMEMBER) */}
      <div className="relative overflow-hidden bg-gradient-to-r from-[#181818] to-[#141414] border-l-2 gold-border rounded-r-xl p-5 sm:p-6 border-y border-r border-white/5 shadow-md">
        <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest gold-text mb-2">
          <span>☩</span>
          <span>Remember</span>
        </div>
        <p className="body-font text-lg sm:text-2xl italic text-slate-100 font-medium leading-relaxed">
          "{lesson.remember}"
        </p>
      </div>

      {/* Lesson Explanation / Body */}
      <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-5">
        <div className="flex items-center space-x-2 text-xs font-semibold uppercase tracking-widest text-slate-400 border-b border-white/5 pb-3">
          <span>The Teaching</span>
        </div>

        <div className="space-y-4 text-slate-300 font-sans-main text-sm sm:text-base leading-relaxed">
          {lesson.explanation.map((paragraph, index) => (
            <p key={index} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>

      {/* Special Callout Note if present */}
      {lesson.specialNote && (
        <div className="bg-[#1A1610] border border-[#D4A936]/40 rounded-xl p-5 sm:p-6 space-y-2">
          <div className="flex items-center space-x-2 gold-text text-xs font-bold uppercase tracking-widest">
            <ShieldAlert className="w-4 h-4 gold-text" />
            <span>{lesson.specialNote.label}</span>
          </div>
          <p className="text-xs sm:text-sm text-[#F3E5AB] leading-relaxed font-sans-main">
            {lesson.specialNote.text}
          </p>
        </div>
      )}

      {/* "Talk About It" Discussion Prompt */}
      <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-7 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest gold-text">
            <MessageCircle className="w-4 h-4 gold-text" />
            <span>Talk About It</span>
          </div>
          <button
            onClick={() => setShowTalkGuide(!showTalkGuide)}
            className="text-xs text-slate-400 hover:text-[#D4A936] flex items-center space-x-1 transition-colors cursor-pointer"
          >
            {showTalkGuide ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            <span>{showTalkGuide ? 'Hide Guidance' : 'Parent & Mentor Guidance'}</span>
          </button>
        </div>

        <div className="bg-[#181818] border border-white/10 rounded-lg p-4">
          <p className="body-font text-base sm:text-lg italic text-slate-100 font-medium leading-relaxed">
            "{lesson.talkAboutIt.question}"
          </p>
        </div>

        {showTalkGuide && (
          <div className="bg-[#161B16] border border-emerald-800/40 rounded-lg p-4 text-xs sm:text-sm text-emerald-200/90 leading-relaxed animate-fadeIn">
            <span className="font-semibold text-emerald-300 block mb-1">Guiding the discussion:</span>
            {lesson.talkAboutIt.guide}
          </div>
        )}
      </div>

      {/* "Learn These Answers" Catechism Questions */}
      <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
          <div>
            <h2 className="heading-font text-lg sm:text-xl font-bold text-slate-100 flex items-center space-x-2 tracking-wider">
              <span className="gold-text">☩</span>
              <span>Learn These Answers</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Encourage the child to explain in their own words before learning the formal answer.
            </p>
          </div>

          <button
            onClick={toggleRevealAll}
            className="text-xs px-3 py-1.5 bg-[#1C1C1C] hover:bg-[#252525] border border-white/10 text-slate-300 uppercase tracking-wider rounded transition-colors cursor-pointer self-start sm:self-auto"
          >
            {lesson.questions.every(q => revealedAnswers[q.id]) ? 'Hide All Answers' : 'Reveal All Answers'}
          </button>
        </div>

        <div className="space-y-4">
          {lesson.questions.map((q, idx) => {
            const isRevealed = !!revealedAnswers[q.id];

            return (
              <div
                key={q.id}
                className="bg-[#181818] border border-white/5 hover:border-white/10 rounded-xl p-5 space-y-3 transition-colors"
              >
                {/* Question Row */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start space-x-3">
                    <span className="w-6 h-6 rounded bg-[#222] gold-text heading-font text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                      {q.question}
                    </h3>
                  </div>

                  <div className="flex items-center space-x-1.5 flex-shrink-0">
                    {/* Audio Read Aloud */}
                    <button
                      onClick={() => handleSpeak(`${q.question}. ${q.answer}`, q.id)}
                      className={`p-1.5 rounded border transition-colors cursor-pointer ${
                        isSpeaking === q.id 
                          ? 'gold-bg text-black gold-border' 
                          : 'bg-[#202020] border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Listen"
                    >
                      {isSpeaking === q.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                    </button>

                    {/* Reveal toggle */}
                    <button
                      onClick={() => toggleAnswerReveal(q.id)}
                      className="px-2.5 py-1 bg-[#222] hover:bg-[#2A2A2A] border border-white/10 rounded text-xs text-slate-300 uppercase tracking-wider transition-colors cursor-pointer"
                    >
                      {isRevealed ? 'Hide' : 'Reveal'}
                    </button>
                  </div>
                </div>

                {/* Answer Box */}
                {isRevealed && (
                  <div className="pl-9 pt-2 border-t border-white/5 animate-fadeIn">
                    <p className="text-sm body-font text-slate-100 italic bg-[#1E1E1E] p-3 rounded border-l-2 gold-border">
                      {q.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Prayer Section */}
      <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest gold-text">
            <Heart className="w-4 h-4 gold-text" />
            <span>Prayer</span>
          </div>

          <button
            onClick={copyPrayerToClipboard}
            className="text-xs text-slate-400 hover:text-[#D4A936] flex items-center space-x-1 transition-colors cursor-pointer"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>{copiedPrayer ? 'Copied!' : 'Copy Prayer'}</span>
          </button>
        </div>

        <div className="bg-[#181818] border border-white/10 rounded-lg p-5 text-center sm:text-left">
          <p className="body-font text-base sm:text-lg italic text-slate-100 leading-relaxed">
            "{lesson.prayer}"
          </p>
        </div>
      </div>

      {/* Practical Action Section */}
      <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-7 space-y-3">
        <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest gold-text">
          <Sparkles className="w-4 h-4 gold-text" />
          <span>Practical Action: {lesson.action.type}</span>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 font-sans-main leading-relaxed">
          {lesson.action.instruction}
        </p>
      </div>

      {/* Bottom Navigation Controls */}
      <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
        {prevLesson ? (
          <button
            onClick={() => {
              onSelectLesson(prevLesson.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded card-bg hover:bg-[#1C1C1C] text-slate-300 hover:text-white border border-white/10 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="w-4 h-4 gold-text" />
            <span>Lesson {prevLesson.id}: {prevLesson.title}</span>
          </button>
        ) : (
          <div />
        )}

        <button
          onClick={() => onToggleComplete(lesson.id)}
          className={`w-full sm:w-auto px-6 py-3 rounded font-semibold text-xs uppercase tracking-widest transition-colors flex items-center justify-center space-x-2 cursor-pointer ${
            isCompleted
              ? 'bg-emerald-950/60 border border-emerald-600/50 text-emerald-300'
              : 'gold-bg hover:bg-[#E5BE4E] text-black shadow-md'
          }`}
        >
          {isCompleted ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Lesson Completed</span>
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              <span>Mark Lesson {lesson.id} as Done</span>
            </>
          )}
        </button>

        {nextLesson ? (
          <button
            onClick={() => {
              onSelectLesson(nextLesson.id);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="w-full sm:w-auto px-5 py-3 rounded card-bg hover:bg-[#1C1C1C] text-slate-300 hover:text-white border border-white/10 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 cursor-pointer transition-colors"
          >
            <span>Lesson {nextLesson.id}: {nextLesson.title}</span>
            <ArrowRight className="w-4 h-4 gold-text" />
          </button>
        ) : (
          <button
            onClick={onBack}
            className="w-full sm:w-auto px-5 py-3 rounded card-bg hover:bg-[#1C1C1C] text-slate-300 hover:text-white border border-white/10 text-xs uppercase tracking-wider font-semibold flex items-center justify-center space-x-2 cursor-pointer transition-colors"
          >
            <span>Back to All Lessons</span>
          </button>
        )}
      </div>
    </div>
  );
};
