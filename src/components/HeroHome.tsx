import React, { useState } from 'react';
import { Lesson, UserProfile, UserProgress, ActiveTab, AppendixTab } from '../types';
import { LESSONS_DATA } from '../data/lessonsData';
import { sendMentorNotification } from '../utils/formspree';
import { 
  BookOpen, 
  Sparkles, 
  ScrollText, 
  HelpCircle, 
  CheckCircle2, 
  ArrowRight, 
  Shield, 
  Heart, 
  Send, 
  User, 
  Church, 
  Mail, 
  Info, 
  Check,
  Award,
  ChevronRight
} from 'lucide-react';

interface HeroHomeProps {
  progress: UserProgress;
  profile: UserProfile;
  onUpdateProfile: (profile: UserProfile) => void;
  onSelectLesson: (lessonId: number) => void;
  setActiveTab: (tab: ActiveTab) => void;
  onOpenAppendix: (tab: AppendixTab) => void;
}

export const HeroHome: React.FC<HeroHomeProps> = ({
  progress,
  profile,
  onUpdateProfile,
  onSelectLesson,
  setActiveTab,
  onOpenAppendix
}) => {
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Determine next uncompleted lesson
  const completedCount = progress.completedLessons.length;
  const nextLessonId = LESSONS_DATA.find(l => !progress.completedLessons.includes(l.id))?.id || 1;

  const handleProfileFieldChange = (field: keyof UserProfile, value: any) => {
    const updated = { ...profile, [field]: value };
    onUpdateProfile(updated);
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile.mentorEmail && !profile.candidateName) {
      setNotifyStatus({
        success: false,
        message: 'Please enter at least a Candidate Name or Sponsor / Mentor Email.'
      });
      return;
    }

    setNotifyLoading(true);
    setNotifyStatus(null);

    const res = await sendMentorNotification(profile.formspreeEndpoint, {
      candidateName: profile.candidateName,
      parishName: profile.parishName,
      mentorName: profile.mentorName,
      mentorEmail: profile.mentorEmail,
      startedDate: profile.startedDate,
      completedLessonsCount: progress.completedLessons.length,
      message: `Candidate ${profile.candidateName || 'New learner'} is preparing for First Confession using the 12-lesson catechism.`
    });

    setNotifyLoading(false);
    setNotifyStatus(res);
    if (res.success) {
      handleProfileFieldChange('formspreeNotified', true);
    }
  };

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-8 pb-12 sm:pt-14 sm:pb-16 border-b border-white/5 bg-gradient-to-b from-[#141414] via-[#0F0F0F] to-[#0F0F0F] rounded-2xl p-6 sm:p-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,169,54,0.12)_0%,_transparent_70%)] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center space-y-6 relative z-10">
          {/* Emblem & Badge */}
          <div className="flex flex-col items-center justify-center space-y-3">
            <div className="w-10 h-10 rounded-full border-2 gold-border flex items-center justify-center bg-[#141414] shadow-md">
              <div className="w-4 h-4 gold-bg rounded-xs rotate-45 flex items-center justify-center">
                <span className="text-[10px] font-bold text-black -rotate-45">☩</span>
              </div>
            </div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#181818] border border-[#D4A936]/30 text-[11px] font-semibold uppercase tracking-widest gold-text">
              <span>Sacramental Reconciliation Catechism</span>
            </div>
          </div>

          {/* Main Title */}
          <h1 className="heading-font text-3xl sm:text-5xl lg:text-6xl font-bold tracking-widest text-slate-100 uppercase drop-shadow-sm">
            MY FIRST CONFESSION
          </h1>

          {/* Subtitle */}
          <p className="body-font text-xl sm:text-2xl lg:text-3xl italic gold-text font-normal max-w-2xl mx-auto leading-relaxed">
            "Jesus calls me back to his friendship"
          </p>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed font-sans-main">
            A gentle, reassuring twelve-conversation preparation for children aged 7–9. Designed for parent and child or mentor and family — zero prep, warm pastoral care, meeting the merciful Christ.
          </p>

          {/* Call-to-action buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
            <button
              onClick={() => onSelectLesson(nextLessonId)}
              className="px-7 py-3.5 rounded-sm bg-[#D4A936] hover:bg-[#E5BE4E] text-black font-cinzel font-bold text-xs uppercase tracking-widest transition-all duration-200 shadow-lg shadow-[#D4A936]/20 flex items-center space-x-2 group cursor-pointer"
            >
              <span>{completedCount === 0 ? 'Begin Conversation 1' : `Continue to Lesson ${nextLessonId}`}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => setActiveTab('drill')}
              className="px-5 py-3 rounded-sm card-bg hover:bg-[#1C1C1C] text-slate-300 hover:text-white border border-white/10 hover:border-[#D4A936]/40 text-xs uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 gold-text" />
              <span>Memory Recall Drill</span>
            </button>

            <button
              onClick={() => onOpenAppendix('step-by-step')}
              className="px-5 py-3 rounded-sm card-bg hover:bg-[#1C1C1C] text-slate-300 hover:text-white border border-white/10 hover:border-[#D4A936]/40 text-xs uppercase tracking-wider transition-all duration-200 flex items-center space-x-2 cursor-pointer"
            >
              <ScrollText className="w-3.5 h-3.5 gold-text" />
              <span>Step-by-Step Guide</span>
            </button>
          </div>

          {/* Progress summary banner */}
          <div className="pt-4 flex items-center justify-center space-x-6 text-[11px] text-slate-400 uppercase tracking-wider">
            <div className="flex items-center space-x-1.5">
              <span className="gold-text font-semibold">{completedCount} of 12</span>
              <span>Completed</span>
            </div>
            <span className="text-neutral-700">•</span>
            <div className="flex items-center space-x-1.5">
              <span className="gold-text font-semibold">28</span>
              <span>Catechism Truths</span>
            </div>
            <span className="text-neutral-700">•</span>
            <div className="flex items-center space-x-1.5">
              <span className="gold-text font-semibold">100%</span>
              <span>Private & Local</span>
            </div>
          </div>
        </div>
      </section>

      {/* Optional Sign-In & Parish Notification Card */}
      <section className="card-bg border border-white/5 rounded-xl p-6 sm:p-8">
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/5 pb-4">
            <div>
              <h2 className="heading-font text-base sm:text-lg font-bold text-slate-100 flex items-center space-x-2 tracking-wider">
                <span className="gold-text">☩</span>
                <span>Candidate & Sponsor / Mentor Information</span>
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Optional. Keeps your names on this device and allows an opt-in start notification to Father John.
              </p>
            </div>
            {profile.formspreeNotified && (
              <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#182618] border border-emerald-600/40 text-emerald-400 text-xs font-medium">
                <Check className="w-3.5 h-3.5" />
                <span>Father John Notified</span>
              </span>
            )}
          </div>

          <form onSubmit={handleSendNotification} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                  Candidate Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={profile.candidateName}
                    onChange={(e) => handleProfileFieldChange('candidateName', e.target.value)}
                    placeholder="e.g. Thomas Moore"
                    className="w-full bg-[#181818] border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                  Parish
                </label>
                <div className="relative">
                  <Church className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={profile.parishName}
                    onChange={(e) => handleProfileFieldChange('parishName', e.target.value)}
                    placeholder="e.g. St. Bede's Parish"
                    className="w-full bg-[#181818] border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                  Sponsor / Mentor Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={profile.mentorName}
                    onChange={(e) => handleProfileFieldChange('mentorName', e.target.value)}
                    placeholder="e.g. Parent / Catechist Name"
                    className="w-full bg-[#181818] border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                  Sponsor / Mentor Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={profile.mentorEmail}
                    onChange={(e) => handleProfileFieldChange('mentorEmail', e.target.value)}
                    placeholder="e.g. mentor@family.org"
                    className="w-full bg-[#181818] border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-slate-400 flex items-center space-x-1.5">
                <Info className="w-3.5 h-3.5 gold-text" />
                <span>All progress is stored locally in your browser. Opt-in notification sends to Father John.</span>
              </p>

              <button
                type="submit"
                disabled={notifyLoading}
                className="w-full sm:w-auto px-4 py-2 bg-[#1C1C1C] hover:bg-[#252525] text-slate-200 hover:text-white border border-[#D4A936]/40 hover:border-[#D4A936] rounded text-xs font-semibold uppercase tracking-wider transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5 gold-text" />
                <span>{notifyLoading ? 'Sending Notification...' : 'Notify Father John / Parish Priest'}</span>
              </button>
            </div>

            {notifyStatus && (
              <div className={`p-3 rounded text-xs flex items-center space-x-2 ${
                notifyStatus.success 
                  ? 'bg-emerald-950/40 border border-emerald-700/50 text-emerald-300' 
                  : 'bg-amber-950/40 border border-amber-700/50 text-amber-300'
              }`}>
                {notifyStatus.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <Info className="w-4 h-4 flex-shrink-0" />}
                <span>{notifyStatus.message}</span>
              </div>
            )}
          </form>
        </div>
      </section>

      {/* 12 Conversations Navigation Grid */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="heading-font text-xl sm:text-2xl font-bold text-slate-100 flex items-center space-x-2 tracking-wider">
              <span className="gold-text">☩</span>
              <span>The Twelve Conversations</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Follow each gentle lesson in sequence with your child or mentor.
            </p>
          </div>
          <button
            onClick={() => setActiveTab('lessons')}
            className="text-xs font-semibold uppercase tracking-widest gold-text hover:text-[#E5BE4E] flex items-center space-x-1 transition-colors"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {LESSONS_DATA.map((lesson) => {
            const isCompleted = progress.completedLessons.includes(lesson.id);
            const isNext = lesson.id === nextLessonId;
            return (
              <div
                key={lesson.id}
                onClick={() => onSelectLesson(lesson.id)}
                className={`group relative p-5 rounded-xl border transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                  isCompleted
                    ? 'bg-[#121212] border-white/5 hover:border-[#D4A936]/50'
                    : isNext
                    ? 'card-bg border-[#D4A936]/80 shadow-md shadow-[#D4A936]/5 ring-1 ring-[#D4A936]/30'
                    : 'card-bg border-white/5 hover:border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span className={`w-7 h-7 rounded flex items-center justify-center heading-font text-xs font-bold ${
                        isCompleted
                          ? 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                          : isNext
                          ? 'gold-bg text-black font-bold'
                          : 'bg-[#1C1C1C] gold-text border border-white/5'
                      }`}>
                        {lesson.id}
                      </span>
                      <span className="text-[10px] uppercase tracking-widest text-slate-400 font-semibold">
                        Lesson {lesson.id}
                      </span>
                    </div>

                    {isCompleted ? (
                      <span className="flex items-center space-x-1 text-xs text-emerald-400">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span className="text-[10px] uppercase tracking-wider font-medium">Done</span>
                      </span>
                    ) : isNext ? (
                      <span className="text-[10px] px-2 py-0.5 rounded bg-[#D4A936]/20 gold-text uppercase tracking-widest font-semibold">
                        Up Next
                      </span>
                    ) : null}
                  </div>

                  <h3 className="heading-font text-sm sm:text-base font-bold text-slate-100 group-hover:text-[#D4A936] transition-colors leading-snug mb-2">
                    {lesson.title}
                  </h3>

                  <p className="body-font italic text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    "{lesson.remember}"
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between text-xs text-slate-400">
                  <span className="text-[11px]">{lesson.questions.length} Catechism Q&As</span>
                  <span className="gold-text group-hover:translate-x-1 transition-transform flex items-center space-x-0.5 text-xs font-medium">
                    <span>Open</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Pastoral Principles / Note for Parents & Catechists */}
      <section className="sidebar-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="border-b border-white/5 pb-4">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1C1C1C] gold-text text-xs font-semibold tracking-widest uppercase mb-2">
            <Heart className="w-3.5 h-3.5 gold-text" />
            <span>Pastoral Principles</span>
          </div>
          <h2 className="heading-font text-xl sm:text-2xl font-bold text-slate-100 tracking-wider">
            A Note for Parents, Catechists and Priests
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
            This catechism is written for children of approximately seven to nine years of age who are preparing for their first sacramental Confession. It is intended to support, not replace, the living witness of parents, regular participation at Sunday Mass, parish catechesis, prayer and the pastoral judgement of the parish priest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="card-bg border border-white/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 gold-text text-sm font-bold">
              <span className="w-5 h-5 rounded-full bg-[#D4A936]/20 flex items-center justify-center text-xs">1</span>
              <h4>Meeting Christ, Not a Test</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans-main">
              A child is preparing to meet the merciful Christ, not merely to pass a test. Readiness is not perfect memory or mature theological language, but a genuine desire for God's forgiveness.
            </p>
          </div>

          <div className="card-bg border border-white/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 gold-text text-sm font-bold">
              <span className="w-5 h-5 rounded-full bg-[#D4A936]/20 flex items-center justify-center text-xs">2</span>
              <h4>Before First Communion</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans-main">
              In accordance with Catholic canonical discipline (Canon 914), First Confession must be celebrated prior to receiving First Holy Communion.
            </p>
          </div>

          <div className="card-bg border border-white/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 gold-text text-sm font-bold">
              <span className="w-5 h-5 rounded-full bg-[#D4A936]/20 flex items-center justify-center text-xs">3</span>
              <h4>Distinguishing Sin from Mistakes</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans-main">
              Children learn the vital difference between a freely chosen deliberate sin, an unwanted temptation, an accident, and an innocent mistake.
            </p>
          </div>

          <div className="card-bg border border-white/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 gold-text text-sm font-bold">
              <span className="w-5 h-5 rounded-full bg-[#D4A936]/20 flex items-center justify-center text-xs">4</span>
              <h4>Accurate Without Scrupulosity</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans-main">
              Mortal sin requires grave matter, full knowledge and deliberate consent. We teach accurately without frightening children or encouraging scrupulosity.
            </p>
          </div>

          <div className="card-bg border border-white/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 gold-text text-sm font-bold">
              <span className="w-5 h-5 rounded-full bg-[#D4A936]/20 flex items-center justify-center text-xs">5</span>
              <h4>Privacy & Dignity</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans-main">
              No child should be pressed to disclose sins publicly or compare a Confession with another child. Sins are confessed privately to the priest alone.
            </p>
          </div>

          <div className="card-bg border border-white/5 rounded-lg p-4 space-y-2">
            <div className="flex items-center space-x-2 gold-text text-sm font-bold">
              <span className="w-5 h-5 rounded-full bg-[#D4A936]/20 flex items-center justify-center text-xs">6</span>
              <h4>Safeguarding & Absolute Seal</h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed font-sans-main">
              Safeguarding disclosures outside confession follow diocesan policy. The sacramental seal of Confession binding the priest remains inviolable and absolute.
            </p>
          </div>
        </div>
      </section>

      {/* Appendices Quick Links */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div
          onClick={() => onOpenAppendix('examination')}
          className="card-bg hover:bg-[#181818] border border-white/5 hover:border-[#D4A936]/50 rounded-xl p-5 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded bg-[#1C1C1C] border border-white/10 flex items-center justify-center gold-text mb-3 group-hover:scale-105 transition-transform">
            <Shield className="w-4 h-4" />
          </div>
          <h3 className="heading-font text-xs font-bold text-slate-100 group-hover:text-[#D4A936] transition-colors mb-1 tracking-wider">
            Examination of Conscience
          </h3>
          <p className="text-xs text-slate-400 font-sans-main">
            Gentle checklist covering Loving God, Home, Kindness, Truth & Self-Control.
          </p>
        </div>

        <div
          onClick={() => onOpenAppendix('step-by-step')}
          className="card-bg hover:bg-[#181818] border border-white/5 hover:border-[#D4A936]/50 rounded-xl p-5 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded bg-[#1C1C1C] border border-white/10 flex items-center justify-center gold-text mb-3 group-hover:scale-105 transition-transform">
            <ScrollText className="w-4 h-4" />
          </div>
          <h3 className="heading-font text-xs font-bold text-slate-100 group-hover:text-[#D4A936] transition-colors mb-1 tracking-wider">
            Step by Step Confession
          </h3>
          <p className="text-xs text-slate-400 font-sans-main">
            Walkthrough from entering the box to absolution and practice dialogue.
          </p>
        </div>

        <div
          onClick={() => onOpenAppendix('prayers')}
          className="card-bg hover:bg-[#181818] border border-white/5 hover:border-[#D4A936]/50 rounded-xl p-5 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded bg-[#1C1C1C] border border-white/10 flex items-center justify-center gold-text mb-3 group-hover:scale-105 transition-transform">
            <Heart className="w-4 h-4" />
          </div>
          <h3 className="heading-font text-xs font-bold text-slate-100 group-hover:text-[#D4A936] transition-colors mb-1 tracking-wider">
            Essential Prayers
          </h3>
          <p className="text-xs text-slate-400 font-sans-main">
            Act of Contrition, Lord's Prayer, Hail Mary, Glory Be & Guardian Angel.
          </p>
        </div>

        <div
          onClick={() => onOpenAppendix('readiness')}
          className="card-bg hover:bg-[#181818] border border-white/5 hover:border-[#D4A936]/50 rounded-xl p-5 cursor-pointer transition-all duration-200 group"
        >
          <div className="w-8 h-8 rounded bg-[#1C1C1C] border border-white/10 flex items-center justify-center gold-text mb-3 group-hover:scale-105 transition-transform">
            <Award className="w-4 h-4" />
          </div>
          <h3 className="heading-font text-xs font-bold text-slate-100 group-hover:text-[#D4A936] transition-colors mb-1 tracking-wider">
            Readiness Assessment
          </h3>
          <p className="text-xs text-slate-400 font-sans-main">
            Readiness guide for parents, mentors, and catechists.
          </p>
        </div>
      </section>
    </div>
  );
};
