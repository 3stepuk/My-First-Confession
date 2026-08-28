import React, { useState } from 'react';
import { CatechismQuestion, UserProgress } from '../types';
import { SUMMARY_CATECHISM_QUESTIONS } from '../data/summaryCatechismData';
import { 
  HelpCircle, 
  Search, 
  ChevronDown, 
  ChevronUp, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  BookOpen, 
  Printer, 
  CheckCircle2, 
  Circle
} from 'lucide-react';

interface SummaryCatechismViewProps {
  progress: UserProgress;
  onSelectLesson: (id: number) => void;
  onToggleQuestionMastery: (questionId: number) => void;
}

export const SummaryCatechismView: React.FC<SummaryCatechismViewProps> = ({
  progress,
  onSelectLesson,
  onToggleQuestionMastery
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedQuestions, setExpandedQuestions] = useState<Record<number, boolean>>({});
  const [selectedLessonFilter, setSelectedLessonFilter] = useState<number | 'all'>('all');
  const [isSpeaking, setIsSpeaking] = useState<number | null>(null);

  const toggleExpand = (id: number) => {
    setExpandedQuestions(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const toggleExpandAll = () => {
    const allExpanded = SUMMARY_CATECHISM_QUESTIONS.every(q => expandedQuestions[q.id]);
    const newState: Record<number, boolean> = {};
    SUMMARY_CATECHISM_QUESTIONS.forEach(q => {
      newState[q.id] = !allExpanded;
    });
    setExpandedQuestions(newState);
  };

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
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    setIsSpeaking(qId);
    window.speechSynthesis.speak(utterance);
  };

  const filteredQuestions = SUMMARY_CATECHISM_QUESTIONS.filter(q => {
    const matchesSearch = 
      q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (!matchesSearch) return false;

    if (selectedLessonFilter !== 'all') {
      return q.lessonId === selectedLessonFilter;
    }

    return true;
  });

  const totalMastered = Object.values(progress.drillMastery).filter((m: { correct: number; attempts: number; mastered: boolean }) => m?.mastered).length;

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="card-bg border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1C1C1C] border border-[#D4A936]/30 gold-text text-xs font-semibold uppercase tracking-widest mb-2">
              <HelpCircle className="w-3.5 h-3.5 gold-text" />
              <span>Appendix D</span>
            </div>
            <h1 className="heading-font text-2xl sm:text-3xl font-bold text-slate-100 tracking-wider">
              Summary Catechism
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              These 28 questions gather the essential truths from the twelve lessons. Children should understand the meaning before being asked to remember the wording.
            </p>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-xl p-4 min-w-[170px] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400">Mastery</div>
              <div className="text-lg font-bold gold-text">
                {totalMastered} / 28
              </div>
            </div>
            <button
              onClick={() => window.print()}
              className="p-2 rounded bg-[#222] hover:bg-[#2A2A2A] text-slate-300 hover:text-[#D4A936] transition-colors"
              title="Print Summary Catechism"
            >
              <Printer className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-white/5">
          <div className="sm:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by topic, e.g. 'contrition', 'absolution', 'sin'..."
              className="w-full card-bg border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2 text-xs text-slate-100 placeholder-slate-600 outline-none transition-all"
            />
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={toggleExpandAll}
              className="w-full py-2 px-3 card-bg hover:bg-[#202020] border border-white/10 text-slate-300 uppercase tracking-wider rounded text-xs font-semibold transition-colors"
            >
              {SUMMARY_CATECHISM_QUESTIONS.every(q => expandedQuestions[q.id]) ? 'Collapse All' : 'Expand All'}
            </button>
          </div>
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-3">
        {filteredQuestions.length === 0 ? (
          <div className="card-bg border border-white/5 rounded-xl p-10 text-center space-y-2">
            <p className="text-slate-400 text-sm">No catechism questions matched your search query.</p>
            <button
              onClick={() => setSearchQuery('')}
              className="text-xs gold-text hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          filteredQuestions.map((q) => {
            const isExpanded = expandedQuestions[q.id] ?? true;
            const isMastered = !!progress.drillMastery[q.id]?.mastered;

            return (
              <div
                key={q.id}
                className="card-bg border border-white/5 hover:border-white/10 rounded-xl p-5 transition-colors space-y-3"
              >
                <div 
                  onClick={() => toggleExpand(q.id)}
                  className="flex items-start justify-between gap-3 cursor-pointer"
                >
                  <div className="flex items-start space-x-3">
                    <span className="w-7 h-7 rounded bg-[#1C1C1C] gold-text heading-font text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 border border-[#D4A936]/30">
                      {q.id}
                    </span>
                    <div>
                      <h3 className="text-sm sm:text-base font-semibold text-slate-100 leading-snug">
                        {q.question}
                      </h3>
                      {q.lessonId && (
                        <span className="text-[10px] uppercase tracking-wider text-slate-500 font-sans-main">
                          From Conversation {q.lessonId}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0" onClick={(e) => e.stopPropagation()}>
                    {/* Mastery toggle */}
                    <button
                      onClick={() => onToggleQuestionMastery(q.id)}
                      title={isMastered ? 'Mark unmastered' : 'Mark as mastered'}
                      className={`p-1.5 rounded border transition-colors cursor-pointer ${
                        isMastered
                          ? 'bg-emerald-950/60 border-emerald-600/50 text-emerald-400'
                          : 'bg-[#1C1C1C] border-white/10 text-slate-500 hover:text-slate-300'
                      }`}
                    >
                      {isMastered ? <CheckCircle2 className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                    </button>

                    {/* Speech audio */}
                    <button
                      onClick={() => handleSpeak(`${q.question}. ${q.answer}`, q.id)}
                      className={`p-1.5 rounded border transition-colors cursor-pointer ${
                        isSpeaking === q.id
                          ? 'gold-bg text-black gold-border'
                          : 'bg-[#1C1C1C] border-white/10 text-slate-400 hover:text-slate-200'
                      }`}
                      title="Listen"
                    >
                      {isSpeaking === q.id ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>

                    {/* Expand/Collapse arrow */}
                    <button
                      onClick={() => toggleExpand(q.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-200"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {isExpanded && (
                  <div className="pl-10 pt-2 border-t border-white/5 animate-fadeIn">
                    <p className="body-font text-base sm:text-lg italic text-[#F3E5AB] leading-relaxed bg-[#191919] p-3.5 rounded border-l-2 gold-border">
                      "{q.answer}"
                    </p>
                    {q.lessonId && (
                      <div className="mt-2 text-right">
                        <button
                          onClick={() => onSelectLesson(q.lessonId!)}
                          className="text-[11px] gold-text hover:underline inline-flex items-center space-x-1 uppercase tracking-wider"
                        >
                          <BookOpen className="w-3 h-3" />
                          <span>Review Full Lesson {q.lessonId}</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
