import React, { useState } from 'react';
import { UserProfile, UserProgress } from '../types';
import { sendMentorNotification } from '../utils/formspree';
import { 
  UserCheck, 
  Send, 
  CheckCircle2, 
  Printer, 
  Download, 
  Upload, 
  Trash2, 
  Church, 
  User, 
  Mail, 
  Calendar, 
  Sparkles, 
  Award, 
  Shield, 
  Check, 
  AlertTriangle,
  FileText
} from 'lucide-react';

interface ProfileViewProps {
  profile: UserProfile;
  progress: UserProgress;
  onUpdateProfile: (profile: UserProfile) => void;
  onResetData: () => void;
  onImportData: (imported: { profile: UserProfile; progress: UserProgress }) => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  profile,
  progress,
  onUpdateProfile,
  onResetData,
  onImportData
}) => {
  const [notifyLoading, setNotifyLoading] = useState(false);
  const [notifyStatus, setNotifyStatus] = useState<{ success?: boolean; message?: string } | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [savedBadge, setSavedBadge] = useState(false);

  const completedLessonsCount = progress.completedLessons.length;
  const drillsMasteredCount = Object.values(progress.drillMastery).filter((m: { correct: number; attempts: number; mastered: boolean }) => m?.mastered).length;
  const readinessCount = progress.readinessChecked.length;

  const handleChange = (field: keyof UserProfile, val: any) => {
    onUpdateProfile({ ...profile, [field]: val });
    setSavedBadge(true);
    setTimeout(() => setSavedBadge(false), 2000);
  };

  const handleSendNotification = async (e: React.FormEvent) => {
    e.preventDefault();
    setNotifyLoading(true);
    setNotifyStatus(null);

    const res = await sendMentorNotification(profile.formspreeEndpoint, {
      candidateName: profile.candidateName,
      parishName: profile.parishName,
      mentorName: profile.mentorName,
      mentorEmail: profile.mentorEmail,
      startedDate: profile.startedDate,
      completedLessonsCount: progress.completedLessons.length,
      message: `Candidate ${profile.candidateName || 'Learner'} is preparing for First Sacramental Confession. Status: ${completedLessonsCount}/12 lessons completed, ${drillsMasteredCount}/28 truths mastered.`
    });

    setNotifyLoading(false);
    setNotifyStatus(res);
    if (res.success) {
      handleChange('formspreeNotified', true);
    }
  };

  const handleExportJSON = () => {
    const data = {
      profile,
      progress,
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `my-first-confession-progress-${profile.candidateName.replace(/\s+/g, '_') || 'candidate'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.profile && parsed.progress) {
          onImportData({ profile: parsed.profile, progress: parsed.progress });
          alert('Progress data imported successfully!');
        } else {
          alert('Invalid file format.');
        }
      } catch (err) {
        alert('Could not parse imported JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-20">
      {/* Header Banner */}
      <div className="card-bg border border-white/5 rounded-2xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1C1C1C] border border-[#D4A936]/30 gold-text text-xs font-semibold uppercase tracking-widest mb-2">
              <UserCheck className="w-3.5 h-3.5 gold-text" />
              <span>Sponsor / Mentor & Profile</span>
            </div>
            <h1 className="heading-font text-2xl sm:text-3xl font-bold text-slate-100 tracking-wider">
              Candidate & Formation Record
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Personalize your catechism journey, track completion metrics, and optionally notify Father John.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            {savedBadge && (
              <span className="text-xs gold-text font-medium flex items-center space-x-1 uppercase tracking-wider">
                <Check className="w-3.5 h-3.5" />
                <span>Saved locally</span>
              </span>
            )}
            <button
              onClick={() => window.print()}
              className="px-3.5 py-2 card-bg hover:bg-[#202020] border border-white/10 text-slate-300 hover:text-white rounded text-xs font-medium uppercase tracking-wider transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 gold-text" />
              <span>Print Formation Record</span>
            </button>
          </div>
        </div>
      </div>

      {/* Profile Form */}
      <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <h2 className="heading-font text-lg sm:text-xl font-bold text-slate-100 flex items-center space-x-2 tracking-wider">
            <span className="gold-text">☩</span>
            <span>Candidate Information</span>
          </h2>

          {profile.formspreeNotified ? (
            <span className="inline-flex items-center space-x-1.5 px-3 py-1 rounded bg-[#182618] border border-emerald-600/40 text-emerald-400 text-xs font-medium uppercase tracking-wider">
              <Check className="w-3.5 h-3.5" />
              <span>Priest Notified</span>
            </span>
          ) : (
            <span className="text-xs text-slate-500 uppercase tracking-wider">Not yet notified</span>
          )}
        </div>

        <form onSubmit={handleSendNotification} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Candidate Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={profile.candidateName}
                  onChange={(e) => handleChange('candidateName', e.target.value)}
                  placeholder="e.g. Thomas More"
                  className="w-full card-bg border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Parish
              </label>
              <div className="relative">
                <Church className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={profile.parishName}
                  onChange={(e) => handleChange('parishName', e.target.value)}
                  placeholder="e.g. St. Peter & St. Paul"
                  className="w-full card-bg border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Sponsor / Mentor
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="text"
                  value={profile.mentorName}
                  onChange={(e) => handleChange('mentorName', e.target.value)}
                  placeholder="e.g. Parent / Catechist Name"
                  className="w-full card-bg border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Sponsor / Mentor Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="email"
                  value={profile.mentorEmail}
                  onChange={(e) => handleChange('mentorEmail', e.target.value)}
                  placeholder="e.g. sponsor@email.com"
                  className="w-full card-bg border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2.5 text-sm text-slate-100 placeholder-slate-600 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Preparation Start Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
                <input
                  type="date"
                  value={profile.startedDate}
                  onChange={(e) => handleChange('startedDate', e.target.value)}
                  className="w-full card-bg border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded pl-9 pr-3 py-2 text-sm text-slate-100 outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-2">
                Formspree Endpoint (Optional)
              </label>
              <input
                type="text"
                value={profile.formspreeEndpoint}
                onChange={(e) => handleChange('formspreeEndpoint', e.target.value)}
                placeholder="https://formspree.io/f/..."
                className="w-full card-bg border border-white/10 focus:border-[#D4A936] focus:ring-1 focus:ring-[#D4A936] rounded px-3 py-2 text-xs text-slate-300 placeholder-slate-600 outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/5">
            <p className="text-xs text-slate-400">
              Submitting sends a single, private status email to the parish priest via Formspree.
            </p>

            <button
              type="submit"
              disabled={notifyLoading}
              className="w-full sm:w-auto px-5 py-2.5 gold-bg hover:opacity-90 text-black font-bold uppercase tracking-wider rounded text-xs transition-all flex items-center justify-center space-x-2 cursor-pointer shadow-md disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{notifyLoading ? 'Sending...' : 'Send Notification to Father John'}</span>
            </button>
          </div>

          {notifyStatus && (
            <div className={`p-4 rounded text-xs flex items-center space-x-2 ${
              notifyStatus.success 
                ? 'bg-emerald-950/50 border border-emerald-700/60 text-emerald-300' 
                : 'bg-amber-950/50 border border-amber-700/60 text-amber-300'
            }`}>
              {notifyStatus.success ? <CheckCircle2 className="w-4 h-4 flex-shrink-0" /> : <AlertTriangle className="w-4 h-4 flex-shrink-0" />}
              <span>{notifyStatus.message}</span>
            </div>
          )}
        </form>
      </div>

      {/* Progress Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="card-bg border border-white/5 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Conversations</span>
            <FileText className="w-4 h-4 gold-text" />
          </div>
          <div className="text-2xl font-bold text-slate-100">
            {completedLessonsCount} <span className="text-sm font-normal text-slate-500">/ 12</span>
          </div>
          <div className="w-full bg-[#202020] h-1.5 rounded-full overflow-hidden">
            <div className="gold-bg h-full rounded-full" style={{ width: `${(completedLessonsCount / 12) * 100}%` }} />
          </div>
        </div>

        <div className="card-bg border border-white/5 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Drills Mastered</span>
            <Sparkles className="w-4 h-4 gold-text" />
          </div>
          <div className="text-2xl font-bold text-slate-100">
            {drillsMasteredCount} <span className="text-sm font-normal text-slate-500">/ 28</span>
          </div>
          <div className="w-full bg-[#202020] h-1.5 rounded-full overflow-hidden">
            <div className="gold-bg h-full rounded-full" style={{ width: `${(drillsMasteredCount / 28) * 100}%` }} />
          </div>
        </div>

        <div className="card-bg border border-white/5 rounded-xl p-5 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Readiness Check</span>
            <Award className="w-4 h-4 gold-text" />
          </div>
          <div className="text-2xl font-bold text-slate-100">
            {readinessCount} <span className="text-sm font-normal text-slate-500">/ 7</span>
          </div>
          <div className="w-full bg-[#202020] h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(readinessCount / 7) * 100}%` }} />
          </div>
        </div>
      </div>

      {/* Printable Formation Certificate Card */}
      <div className="bg-[#121212] border-2 border-[#D4A936]/40 rounded-2xl p-6 sm:p-10 space-y-6 text-center shadow-lg relative overflow-hidden print:border-black print:text-black">
        <div className="w-12 h-12 rounded-full bg-[#1F1B10] gold-border border flex items-center justify-center mx-auto gold-text text-xl font-bold heading-font">
          ☩
        </div>

        <div className="space-y-1">
          <div className="text-xs uppercase tracking-widest gold-text font-bold">
            Sacrament of Penance & Reconciliation
          </div>
          <h3 className="heading-font text-xl sm:text-3xl font-bold text-slate-100 tracking-wider">
            Catechetical Formation Record
          </h3>
          <p className="body-font italic text-sm text-slate-300">
            "Jesus calls me back to his friendship"
          </p>
        </div>

        <div className="border-y border-white/10 py-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-left max-w-lg mx-auto text-xs sm:text-sm">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Candidate:</span>
            <strong className="text-slate-100 heading-font">{profile.candidateName || '[ Candidate Name ]'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Parish:</span>
            <strong className="text-slate-100">{profile.parishName || '[ Parish Name ]'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Sponsor / Mentor:</span>
            <strong className="text-slate-100">{profile.mentorName || '[ Sponsor / Mentor Name ]'}</strong>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase tracking-wider">Lessons Completed:</span>
            <strong className="gold-text">{completedLessonsCount} of 12 Conversations</strong>
          </div>
        </div>

        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-sans-main">
          This certifies that the candidate has engaged with the 12 catechetical lessons, examination of conscience, and readiness preparation for their First Confession.
        </p>

        <button
          onClick={() => window.print()}
          className="px-5 py-2.5 card-bg hover:bg-[#252525] border border-[#D4A936]/40 gold-text hover:opacity-90 font-bold uppercase tracking-wider text-xs rounded inline-flex items-center space-x-2 transition-colors cursor-pointer"
        >
          <Printer className="w-3.5 h-3.5" />
          <span>Print Official Certificate / Record</span>
        </button>
      </div>

      {/* Data Management Section */}
      <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-4">
        <h2 className="heading-font text-base font-bold text-slate-100 flex items-center space-x-2 border-b border-white/5 pb-3 tracking-wider">
          <span>Data Storage & Backup</span>
        </h2>

        <div className="flex flex-wrap items-center gap-3 pt-1">
          <button
            onClick={handleExportJSON}
            className="px-4 py-2 card-bg hover:bg-[#252525] border border-white/10 text-slate-200 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center space-x-2 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 gold-text" />
            <span>Export Backup (JSON)</span>
          </button>

          <label className="px-4 py-2 card-bg hover:bg-[#252525] border border-white/10 text-slate-200 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center space-x-2 cursor-pointer">
            <Upload className="w-3.5 h-3.5 gold-text" />
            <span>Import Backup</span>
            <input type="file" accept=".json" onChange={handleImportJSON} className="hidden" />
          </label>

          <button
            onClick={() => setShowResetConfirm(true)}
            className="px-4 py-2 bg-[#201414] hover:bg-[#301818] border border-red-900/40 text-red-400 text-xs font-semibold uppercase tracking-wider rounded transition-colors flex items-center space-x-2 cursor-pointer ml-auto"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Reset Progress</span>
          </button>
        </div>

        {showResetConfirm && (
          <div className="p-4 bg-red-950/30 border border-red-800/50 rounded-xl space-y-3 animate-fadeIn">
            <div className="flex items-center space-x-2 text-red-300 text-xs font-bold">
              <AlertTriangle className="w-4 h-4 text-red-400" />
              <span>Are you sure you want to reset all progress?</span>
            </div>
            <p className="text-xs text-red-200/80">
              This will clear completed lessons, drill mastery records, and checklist marks from your local browser storage.
            </p>
            <div className="flex items-center space-x-3">
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="px-4 py-1.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Yes, Reset All
              </button>
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-3 py-1.5 card-bg hover:bg-[#333] text-slate-300 text-xs font-medium uppercase tracking-wider rounded transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
