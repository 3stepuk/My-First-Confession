import React, { useState } from 'react';
import { Lesson, UserProgress } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { 
  BookOpen, 
  CheckCircle2, 
  Circle, 
  Bookmark, 
  Search, 
  ChevronRight, 
  Sparkles,
  HelpCircle
} from 'lucide-react';

interface LessonsListProps {
  progress: UserProgress;
  onSelectLesson: (id: number) => void;
  onToggleComplete: (id: number) => void;
  onToggleBookmark: (id: number) => void;
}

export const LessonsList: React.FC<LessonsListProps> = ({
  progress,
  onSelectLesson,
  onToggleComplete,
  onToggleBookmark
}) => {
  const [filter, setFilter] = useState<'all' | 'todo' | 'completed' | 'bookmarked'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const completedCount = progress.completedLessons.length;
  const progressPercent = Math.round((completedCount / 12) * 100);

  const filteredLessons = LESSONS_DATA.filter((lesson) => {
    // Search query filter
    const matchesSearch = 
      lesson.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.remember.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lesson.explanation.some(p => p.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;

    // Status filter
    if (filter === 'completed') return progress.completedLessons.includes(lesson.id);
    if (filter === 'todo') return !progress.completedLessons.includes(lesson.id);
    if (filter === 'bookmarked') return progress.bookmarkedLessons.includes(lesson.id);
    return true;
  });

  return (
    <div className="space-y-8 pb-16">
      {/* Header Banner */}
      <div className="card-bg border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1C1C1C] border border-[#D4A936]/30 gold-text text-xs font-semibold uppercase tracking-widest mb-2">
              <span>☩</span>
              <span>12 Conversations</span>
            </div>
            <h1 className="heading-font text-2xl sm:text-3xl font-bold text-slate-100 tracking-wider">
              The Catechetical Journey
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Twelve gentle conversations preparing the child's heart to receive Christ's forgiveness.
            </p>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-xl p-4 min-w-[200px] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400">Total Completion</div>
              <div className="text-lg font-bold gold-text">
                {completedCount} / 12 Lessons
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs px-2.5 py-1 rounded-full bg-[#D4A936]/15 gold-text font-bold">
                {progressPercent}%
              </span>
            </div>
          </div>
        </div>

        {/* Golden Progress Bar */}
        <div className="w-full bg-[#1F1F1F] h-2 rounded-full overflow-hidden">
          <div 
            className="gold-bg h-full transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Filter buttons */}
        <div className="flex items-center space-x-1.5 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              filter === 'all'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            All (12)
          </button>
          <button
            onClick={() => setFilter('todo')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              filter === 'todo'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            To Do ({12 - completedCount})
          </button>
          <button
            onClick={() => setFilter('completed')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              filter === 'completed'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            Completed ({completedCount})
          </button>
          <button
            onClick={() => setFilter('bookmarked')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              filter === 'bookmarked'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            Bookmarked ({progress.bookmarkedLessons.length})
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search lesson or truth..."
            className="w-full card-bg border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none transition-all"
          />
        </div>
      </div>

      {/* Lessons List */}
      <div className="space-y-3">
        {filteredLessons.length === 0 ? (
          <div className="card-bg border border-white/5 rounded-xl p-10 text-center space-y-2">
            <p className="text-slate-400 text-sm">No conversations match your filter.</p>
            <button
              onClick={() => { setFilter('all'); setSearchQuery(''); }}
              className="text-xs gold-text hover:underline"
            >
              Reset filters
            </button>
          </div>
        ) : (
          filteredLessons.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isBookmarked = progress.bookmarkedLessons.includes(lesson.id);

            return (
              <div
                key={lesson.id}
                className={`group card-bg hover:bg-[#181818] border transition-all duration-200 rounded-xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                  isCompleted 
                    ? 'border-white/5 opacity-95' 
                    : 'border-white/5 hover:border-[#D4A936]/40'
                }`}
              >
                {/* Left Side: Number & Info */}
                <div 
                  onClick={() => onSelectLesson(lesson.id)}
                  className="flex items-start space-x-4 cursor-pointer flex-1"
                >
                  <div className={`w-10 h-10 rounded flex-shrink-0 flex items-center justify-center heading-font text-sm font-bold transition-colors ${
                    isCompleted
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-700/50'
                      : 'bg-[#1C1C1C] gold-text border border-[#D4A936]/30 group-hover:border-[#D4A936]'
                  }`}>
                    {lesson.id}
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                        Conversation {lesson.id}
                      </span>
                      {isCompleted && (
                        <span className="text-[10px] font-medium text-emerald-400 flex items-center space-x-1 uppercase tracking-wider">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Completed</span>
                        </span>
                      )}
                    </div>
                    <h3 className="heading-font text-base sm:text-lg font-bold text-slate-100 group-hover:text-[#D4A936] transition-colors leading-snug">
                      {lesson.title}
                    </h3>
                    <p className="body-font italic text-xs sm:text-sm text-slate-300 leading-relaxed">
                      "{lesson.remember}"
                    </p>
                  </div>
                </div>

                {/* Right Side: Actions */}
                <div className="flex items-center justify-between sm:justify-end space-x-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-white/5">
                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleBookmark(lesson.id);
                    }}
                    title={isBookmarked ? 'Remove bookmark' : 'Bookmark conversation'}
                    className={`p-2 rounded border transition-colors cursor-pointer ${
                      isBookmarked
                        ? 'bg-[#2A2312] border-[#D4A936] gold-text'
                        : 'bg-[#181818] border-white/10 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    <Bookmark className="w-4 h-4" fill={isBookmarked ? '#D4A936' : 'none'} />
                  </button>

                  {/* Mark Completed Toggle */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleComplete(lesson.id);
                    }}
                    title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
                    className={`px-3 py-2 rounded border text-xs font-semibold uppercase tracking-wider transition-colors flex items-center space-x-1.5 cursor-pointer ${
                      isCompleted
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300 hover:bg-emerald-950/70'
                        : 'bg-[#181818] border-white/10 text-slate-300 hover:border-[#D4A936]/40 hover:text-[#D4A936]'
                    }`}
                  >
                    {isCompleted ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Done</span>
                      </>
                    ) : (
                      <>
                        <Circle className="w-3.5 h-3.5 text-slate-500" />
                        <span>Mark Done</span>
                      </>
                    )}
                  </button>

                  {/* Open Button */}
                  <button
                    onClick={() => onSelectLesson(lesson.id)}
                    className="px-4 py-2 gold-bg hover:bg-[#E5BE4E] text-black font-semibold rounded text-xs uppercase tracking-wider transition-colors flex items-center space-x-1 cursor-pointer"
                  >
                    <span>Open</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
