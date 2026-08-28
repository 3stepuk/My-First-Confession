import React, { useState, useMemo } from 'react';
import { CatechismQuestion, UserProgress } from '../types';
import { SUMMARY_CATECHISM_QUESTIONS } from '../data/summaryCatechismData';
import { 
  Sparkles, 
  RotateCw, 
  CheckCircle2, 
  XCircle, 
  Volume2, 
  VolumeX, 
  ArrowRight, 
  ArrowLeft, 
  Trophy, 
  BookOpen,
  Filter,
  Check,
  RefreshCw
} from 'lucide-react';

interface MemoryDrillProps {
  progress: UserProgress;
  onUpdateDrillScore: (questionId: number, isCorrect: boolean) => void;
  onResetDrillScores: () => void;
}

export const MemoryDrill: React.FC<MemoryDrillProps> = ({
  progress,
  onUpdateDrillScore,
  onResetDrillScores
}) => {
  const [selectedScope, setSelectedScope] = useState<'all' | 'part1' | 'part2' | 'part3' | 'part4' | 'unmastered'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [sessionCompleted, setSessionCompleted] = useState(false);
  const [sessionStats, setSessionStats] = useState({ correct: 0, incorrect: 0, total: 0 });

  // Filter pool based on selected scope
  const questionPool = useMemo(() => {
    switch (selectedScope) {
      case 'part1':
        return SUMMARY_CATECHISM_QUESTIONS.filter(q => q.id >= 1 && q.id <= 7);
      case 'part2':
        return SUMMARY_CATECHISM_QUESTIONS.filter(q => q.id >= 8 && q.id <= 14);
      case 'part3':
        return SUMMARY_CATECHISM_QUESTIONS.filter(q => q.id >= 15 && q.id <= 23);
      case 'part4':
        return SUMMARY_CATECHISM_QUESTIONS.filter(q => q.id >= 24 && q.id <= 28);
      case 'unmastered':
        const unmastered = SUMMARY_CATECHISM_QUESTIONS.filter(q => !progress.drillMastery[q.id]?.mastered);
        return unmastered.length > 0 ? unmastered : SUMMARY_CATECHISM_QUESTIONS;
      case 'all':
      default:
        return SUMMARY_CATECHISM_QUESTIONS;
    }
  }, [selectedScope, progress.drillMastery]);

  const currentQuestion = questionPool[currentIndex] || questionPool[0];

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleNext = (knewIt: boolean) => {
    if (!currentQuestion) return;

    onUpdateDrillScore(currentQuestion.id, knewIt);
    setSessionStats(prev => ({
      ...prev,
      correct: knewIt ? prev.correct + 1 : prev.correct,
      incorrect: knewIt ? prev.incorrect : prev.incorrect + 1,
      total: prev.total + 1
    }));

    if (currentIndex + 1 < questionPool.length) {
      setCurrentIndex(prev => prev + 1);
      setIsFlipped(false);
    } else {
      setSessionCompleted(true);
    }
  };

  const restartDrill = () => {
    setCurrentIndex(0);
    setIsFlipped(false);
    setSessionCompleted(false);
    setSessionStats({ correct: 0, incorrect: 0, total: 0 });
  };

  // Text-to-speech
  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const totalMastered = Object.values(progress.drillMastery).filter((m: { correct: number; attempts: number; mastered: boolean }) => m?.mastered).length;
  const progressPercent = Math.round(((currentIndex + 1) / questionPool.length) * 100);

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-16">
      {/* Header Banner */}
      <div className="card-bg border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1C1C1C] border border-[#D4A936]/30 gold-text text-xs font-semibold uppercase tracking-widest mb-2">
              <Sparkles className="w-3.5 h-3.5 gold-text" />
              <span>Interactive Memory Drills</span>
            </div>
            <h1 className="heading-font text-2xl sm:text-3xl font-bold text-slate-100 tracking-wider">
              Catechism Recall Drills
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Practice recalling the 28 essential truths. Flip each flashcard to test your understanding.
            </p>
          </div>

          <div className="bg-[#181818] border border-white/10 rounded-xl p-4 min-w-[180px] flex items-center justify-between">
            <div>
              <div className="text-[10px] uppercase tracking-widest text-slate-400">Total Mastered</div>
              <div className="text-lg font-bold gold-text">
                {totalMastered} / 28
              </div>
            </div>
            <div className="w-10 h-10 rounded-full bg-[#1F1F1F] border border-white/10 flex items-center justify-center text-xs font-bold gold-text">
              {Math.round((totalMastered / 28) * 100)}%
            </div>
          </div>
        </div>

        {/* Scope Selector Tabs */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pt-2 border-t border-white/5 pb-1">
          <button
            onClick={() => { setSelectedScope('all'); restartDrill(); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedScope === 'all'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            All 28 Truths
          </button>
          <button
            onClick={() => { setSelectedScope('part1'); restartDrill(); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedScope === 'part1'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            Part 1: God & Grace (1–7)
          </button>
          <button
            onClick={() => { setSelectedScope('part2'); restartDrill(); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedScope === 'part2'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            Part 2: Love & Sin (8–14)
          </button>
          <button
            onClick={() => { setSelectedScope('part3'); restartDrill(); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedScope === 'part3'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            Part 3: Penance & Contrition (15–23)
          </button>
          <button
            onClick={() => { setSelectedScope('part4'); restartDrill(); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedScope === 'part4'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            Part 4: Confession & Living (24–28)
          </button>
          <button
            onClick={() => { setSelectedScope('unmastered'); restartDrill(); }}
            className={`px-3 py-1.5 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors cursor-pointer ${
              selectedScope === 'unmastered'
                ? 'gold-bg text-black'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            Needs Practice
          </button>
        </div>
      </div>

      {!sessionCompleted ? (
        <div className="space-y-6">
          {/* Progress indicators */}
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              Question <strong className="gold-text">{currentIndex + 1}</strong> of {questionPool.length}
            </span>
            <span>
              Score: <strong className="text-emerald-400">{sessionStats.correct}</strong> correct
            </span>
          </div>

          <div className="w-full bg-[#1E1E1E] h-2 rounded-full overflow-hidden">
            <div
              className="gold-bg h-full transition-all duration-300 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          {/* Flashcard Component */}
          <div
            onClick={handleFlip}
            className={`relative min-h-[280px] sm:min-h-[320px] bg-[#161616] border rounded-2xl p-8 sm:p-10 flex flex-col justify-between cursor-pointer transition-all duration-300 shadow-xl ${
              isFlipped 
                ? 'border-[#D4A936] bg-[#181818]' 
                : 'border-white/10 hover:border-[#D4A936]/40'
            }`}
          >
            {/* Top metadata */}
            <div className="flex items-center justify-between border-b border-white/5 pb-3">
              <div className="flex items-center space-x-2">
                <span className="w-7 h-7 rounded bg-[#222] gold-text heading-font text-xs font-bold flex items-center justify-center">
                  {currentQuestion.id}
                </span>
                <span className="text-xs uppercase tracking-widest text-slate-400 font-semibold">
                  Catechism Question {currentQuestion.id}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSpeak(
                      isFlipped 
                        ? `${currentQuestion.question}. ${currentQuestion.answer}` 
                        : currentQuestion.question
                    );
                  }}
                  className="p-1.5 rounded bg-[#222] hover:bg-[#2A2A2A] text-slate-300 hover:text-[#D4A936] transition-colors"
                  title="Listen"
                >
                  {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>

                <span className="text-[11px] text-slate-500 font-mono">
                  {isFlipped ? 'Answer Revealed' : 'Click to Flip'}
                </span>
              </div>
            </div>

            {/* Card Content */}
            <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
              <h2 className="heading-font text-xl sm:text-2xl font-bold text-slate-100 leading-snug max-w-xl tracking-wider">
                {currentQuestion.question}
              </h2>

              {isFlipped && (
                <div className="w-full pt-4 border-t border-white/10 animate-fadeIn">
                  <p className="body-font text-lg sm:text-2xl italic text-[#F3E5AB] font-medium leading-relaxed max-w-xl mx-auto">
                    "{currentQuestion.answer}"
                  </p>
                </div>
              )}
            </div>

            {/* Bottom hint */}
            <div className="text-center text-xs text-slate-500 pt-2 border-t border-white/5">
              {isFlipped ? 'Evaluate your answer below' : 'Tap anywhere on the card to reveal the answer'}
            </div>
          </div>

          {/* Action Assessment Buttons */}
          {isFlipped ? (
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleNext(false)}
                className="py-3.5 px-4 rounded card-bg hover:bg-[#201414] border border-red-900/50 hover:border-red-600/60 text-red-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer"
              >
                <XCircle className="w-4 h-4 text-red-400" />
                <span>Need Review</span>
              </button>

              <button
                onClick={() => handleNext(true)}
                className="py-3.5 px-4 rounded card-bg hover:bg-[#142016] border border-emerald-800/50 hover:border-emerald-500/60 text-emerald-300 font-semibold text-xs uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-lg"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>I Knew It! (Mastered)</span>
              </button>
            </div>
          ) : (
            <button
              onClick={handleFlip}
              className="w-full py-3.5 px-4 rounded gold-bg hover:bg-[#E5BE4E] text-black font-semibold text-xs uppercase tracking-widest flex items-center justify-center space-x-2 transition-all cursor-pointer shadow-md"
            >
              <RotateCw className="w-4 h-4" />
              <span>Reveal Answer</span>
            </button>
          )}
        </div>
      ) : (
        /* Completion Screen */
        <div className="card-bg border border-white/5 rounded-2xl p-8 sm:p-12 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-full bg-[#1F1B10] border-2 gold-border flex items-center justify-center mx-auto gold-text">
            <Trophy className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h2 className="heading-font text-2xl sm:text-3xl font-bold text-slate-100 tracking-wider">
              Drill Session Completed!
            </h2>
            <p className="text-sm text-slate-300 max-w-md mx-auto">
              Well done! You reviewed {sessionStats.total} questions in this practice session.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
            <div className="bg-[#181818] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-emerald-400">{sessionStats.correct}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Mastered</div>
            </div>
            <div className="bg-[#181818] border border-white/10 rounded-xl p-4">
              <div className="text-2xl font-bold text-amber-400">{sessionStats.incorrect}</div>
              <div className="text-xs text-slate-400 uppercase tracking-wider">Need Review</div>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={restartDrill}
              className="px-6 py-3 gold-bg hover:bg-[#E5BE4E] text-black font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center space-x-2 cursor-pointer shadow-md"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Practice Again</span>
            </button>

            <button
              onClick={() => { setSelectedScope('unmastered'); restartDrill(); }}
              className="px-5 py-3 card-bg hover:bg-[#222] text-slate-200 border border-white/10 font-semibold text-xs uppercase tracking-wider rounded transition-all flex items-center space-x-2 cursor-pointer"
            >
              <span>Practice Unmastered Only</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
