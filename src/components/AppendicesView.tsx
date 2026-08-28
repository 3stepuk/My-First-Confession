import React, { useState } from 'react';
import { AppendixTab, UserProgress } from '../types';
import { 
  EXAMINATION_CATEGORIES, 
  CONFESSION_STEPS, 
  DIALOGUE_PRACTICE, 
  PRAYERS_DATA, 
  READINESS_ITEMS, 
  SOURCES_DATA 
} from '../data/appendicesData';
import { 
  Shield, 
  ScrollText, 
  Heart, 
  Award, 
  BookMarked, 
  CheckCircle2, 
  Circle, 
  Copy, 
  Volume2, 
  VolumeX, 
  MessageSquare, 
  HelpCircle, 
  ShieldAlert,
  Printer,
  RotateCcw,
  Check
} from 'lucide-react';

interface AppendicesViewProps {
  initialTab?: AppendixTab;
  progress: UserProgress;
  onToggleExaminationItem: (id: string) => void;
  onToggleReadinessItem: (id: string) => void;
  onClearExamination: () => void;
}

export const AppendicesView: React.FC<AppendicesViewProps> = ({
  initialTab = 'examination',
  progress,
  onToggleExaminationItem,
  onToggleReadinessItem,
  onClearExamination
}) => {
  const [activeSubTab, setActiveSubTab] = useState<AppendixTab>(initialTab);
  const [isSpeaking, setIsSpeaking] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [dialogueStep, setDialogueStep] = useState(0);

  const handleSpeak = (text: string, id: string) => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking === id) {
      window.speechSynthesis.cancel();
      setIsSpeaking(null);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    utterance.onend = () => setIsSpeaking(null);
    utterance.onerror = () => setIsSpeaking(null);
    setIsSpeaking(id);
    window.speechSynthesis.speak(utterance);
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-16">
      {/* Tab Navigation Header */}
      <div className="card-bg border border-white/5 rounded-2xl p-4 sm:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded bg-[#1C1C1C] border border-[#D4A936]/30 gold-text text-xs font-semibold uppercase tracking-widest mb-2">
              <span>☩</span>
              <span>Catechetical Appendices</span>
            </div>
            <h1 className="heading-font text-2xl sm:text-3xl font-bold text-slate-100 tracking-wider">
              Appendices & Practical Guides
            </h1>
          </div>

          <button
            onClick={() => window.print()}
            className="self-start sm:self-auto px-3.5 py-2 card-bg hover:bg-[#202020] border border-white/10 text-slate-300 hover:text-white rounded text-xs font-medium uppercase tracking-wider transition-colors flex items-center space-x-2"
          >
            <Printer className="w-3.5 h-3.5 gold-text" />
            <span>Print Current Section</span>
          </button>
        </div>

        {/* Sub-tab pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-2 border-t border-white/5 pb-1">
          <button
            onClick={() => setActiveSubTab('examination')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'examination'
                ? 'gold-bg text-black font-bold'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            <Shield className="w-3.5 h-3.5" />
            <span>App. A: Examination</span>
          </button>

          <button
            onClick={() => setActiveSubTab('step-by-step')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'step-by-step'
                ? 'gold-bg text-black font-bold'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            <ScrollText className="w-3.5 h-3.5" />
            <span>App. B: Step by Step</span>
          </button>

          <button
            onClick={() => setActiveSubTab('prayers')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'prayers'
                ? 'gold-bg text-black font-bold'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            <Heart className="w-3.5 h-3.5" />
            <span>App. C: Prayers</span>
          </button>

          <button
            onClick={() => setActiveSubTab('readiness')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'readiness'
                ? 'gold-bg text-black font-bold'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>App. E: Readiness Guide</span>
          </button>

          <button
            onClick={() => setActiveSubTab('sources')}
            className={`px-3.5 py-2 rounded text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-colors flex items-center space-x-2 cursor-pointer ${
              activeSubTab === 'sources'
                ? 'gold-bg text-black font-bold'
                : 'card-bg text-slate-300 hover:bg-[#202020] border border-white/5'
            }`}
          >
            <BookMarked className="w-3.5 h-3.5" />
            <span>Sources & References</span>
          </button>
        </div>
      </div>

      {/* TAB CONTENT */}

      {/* APPENDIX A: Examination of Conscience */}
      {activeSubTab === 'examination' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header & Prayer */}
          <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
              <div>
                <h2 className="heading-font text-xl sm:text-2xl font-bold text-slate-100 tracking-wider">
                  Appendix A: A Child's Examination of Conscience
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-1">
                  Begin quietly. Make the Sign of the Cross and ask the Holy Spirit for light. Think about your choices without making excuses and without becoming afraid. The questions below are helps; they are not a list of sins that every child has committed.
                </p>
              </div>

              {progress.examinationChecked.length > 0 && (
                <button
                  onClick={onClearExamination}
                  className="text-xs text-slate-400 hover:text-amber-400 flex items-center space-x-1 transition-colors self-start sm:self-auto cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Checkmarks</span>
                </button>
              )}
            </div>

            <div className="bg-[#181818] border-l-2 gold-border rounded-r-lg p-4">
              <div className="text-[10px] font-bold gold-text uppercase tracking-widest mb-1">Prayer</div>
              <p className="body-font text-base sm:text-lg italic text-slate-100">
                "Come, Holy Spirit. Help me to see the truth, trust God's mercy and make a good Confession. Amen."
              </p>
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            {EXAMINATION_CATEGORIES.map((cat) => (
              <div key={cat.id} className="card-bg border border-white/5 rounded-xl p-5 sm:p-6 space-y-3">
                <h3 className="heading-font text-base font-bold gold-text flex items-center space-x-2 border-b border-white/5 pb-2 tracking-wider">
                  <span>☩</span>
                  <span>{cat.title}</span>
                </h3>

                <div className="space-y-2.5 pt-1">
                  {cat.items.map((item) => {
                    const isChecked = progress.examinationChecked.includes(item.id);
                    return (
                      <div
                        key={item.id}
                        onClick={() => onToggleExaminationItem(item.id)}
                        className={`flex items-start space-x-3 p-3 rounded border transition-all cursor-pointer ${
                          isChecked
                            ? 'bg-[#1C1A14] border-[#D4A936]/50 text-slate-100'
                            : 'bg-[#181818] border-white/5 text-slate-300 hover:border-white/10'
                        }`}
                      >
                        <div className="mt-0.5 flex-shrink-0">
                          {isChecked ? (
                            <CheckCircle2 className="w-4 h-4 gold-text" />
                          ) : (
                            <Circle className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                        <span className="text-xs sm:text-sm font-sans-main leading-relaxed">
                          {item.text}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Safety note / Safe Adult banner */}
          <div className="bg-[#1A1710] border border-[#D4A936]/40 rounded-xl p-5 sm:p-6 space-y-2">
            <div className="flex items-center space-x-2 gold-text text-xs font-bold uppercase tracking-widest">
              <ShieldAlert className="w-4 h-4 gold-text" />
              <span>Remember</span>
            </div>
            <p className="text-xs sm:text-sm text-[#F3E5AB] leading-relaxed">
              Something done to you without your free choice is not your sin. If anyone has harmed, threatened or frightened you, tell a trusted safe adult outside Confession so that you can be protected and helped.
            </p>
          </div>
        </div>
      )}

      {/* APPENDIX B: Step by Step Confession */}
      {activeSubTab === 'step-by-step' && (
        <div className="space-y-8 animate-fadeIn">
          {/* Intro Box */}
          <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-3">
            <h2 className="heading-font text-xl sm:text-2xl font-bold text-slate-100 tracking-wider">
              Appendix B: My First Confession Step by Step
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              A complete, peaceful guide to the celebration of the Sacrament of Penance, with an interactive practice dialogue for parent and child.
            </p>
          </div>

          {/* 7-Step Table / Cards */}
          <div className="space-y-3">
            {CONFESSION_STEPS.map((step) => (
              <div
                key={step.step}
                className="card-bg border border-white/5 hover:border-white/10 rounded-xl p-5 flex flex-col sm:flex-row sm:items-start gap-4 transition-colors"
              >
                <div className="w-8 h-8 rounded bg-[#1C1C1C] border border-[#D4A936]/30 gold-text heading-font text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {step.step}
                </div>

                <div className="space-y-1 flex-1">
                  <div className="flex items-center space-x-2">
                    <h3 className="heading-font text-base font-bold text-slate-100 tracking-wider">
                      {step.title}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-main">
                    {step.whatIDo}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* "If I Forget" Callout */}
          <div className="bg-[#191919] border border-[#D4A936]/40 rounded-xl p-5 sm:p-6 space-y-2">
            <div className="flex items-center space-x-2 gold-text text-xs font-bold uppercase tracking-widest">
              <HelpCircle className="w-4 h-4 gold-text" />
              <span>If I Forget</span>
            </div>
            <p className="body-font text-base sm:text-lg italic text-[#F3E5AB]">
              "I can simply say: 'Father, this is my first Confession and I need some help.' The priest will guide me."
            </p>
          </div>

          {/* Practice Dialogue Section */}
          <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-6">
            <div className="border-b border-white/5 pb-4">
              <div className="flex items-center space-x-2 text-xs font-bold gold-text uppercase tracking-widest mb-1">
                <MessageSquare className="w-4 h-4" />
                <span>Practice Simulator</span>
              </div>
              <h3 className="heading-font text-lg sm:text-xl font-bold text-slate-100 tracking-wider">
                Simple Practice Dialogue
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Roleplay between the child and priest/mentor to build confidence before the big day.
              </p>
            </div>

            <div className="space-y-3">
              {DIALOGUE_PRACTICE.map((item, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-xl border transition-all ${
                    item.speaker === 'Child'
                      ? 'bg-[#181818] border-white/5 ml-0 sm:mr-12'
                      : 'bg-[#161916] border-emerald-900/40 mr-0 sm:ml-12'
                  }`}
                >
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${
                      item.speaker === 'Child'
                        ? 'bg-[#D4A936]/20 gold-text'
                        : 'bg-emerald-900/40 text-emerald-300'
                    }`}>
                      {item.speaker}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 font-sans-main leading-relaxed">
                    {item.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* APPENDIX C: Prayers to Know */}
      {activeSubTab === 'prayers' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-2">
            <h2 className="heading-font text-xl sm:text-2xl font-bold text-slate-100 tracking-wider">
              Appendix C: Prayers to Know
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              The essential Catholic prayers used in preparation, during confession, and in daily Christian life.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {PRAYERS_DATA.map((prayer) => (
              <div
                key={prayer.id}
                className="card-bg border border-white/5 hover:border-white/10 rounded-xl p-6 space-y-4 flex flex-col justify-between transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                    <h3 className="heading-font text-base font-bold text-slate-100 tracking-wider">
                      {prayer.title}
                    </h3>
                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => handleSpeak(prayer.text, prayer.id)}
                        className={`p-1.5 rounded border transition-colors cursor-pointer ${
                          isSpeaking === prayer.id
                            ? 'gold-bg text-black gold-border'
                            : 'bg-[#1C1C1C] border-white/10 text-slate-400 hover:text-slate-200'
                        }`}
                        title="Listen"
                      >
                        {isSpeaking === prayer.id ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                      </button>

                      <button
                        onClick={() => handleCopy(prayer.text, prayer.id)}
                        className="p-1.5 rounded bg-[#1C1C1C] border border-white/10 text-slate-400 hover:text-[#D4A936] transition-colors cursor-pointer"
                        title="Copy prayer"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <p className="body-font text-base sm:text-lg italic text-[#F3E5AB] leading-relaxed">
                    "{prayer.text}"
                  </p>
                </div>

                {copiedId === prayer.id && (
                  <div className="text-[11px] text-emerald-400 flex items-center space-x-1 pt-2">
                    <Check className="w-3.5 h-3.5" />
                    <span>Copied to clipboard</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* APPENDIX E: Readiness Guide */}
      {activeSubTab === 'readiness' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-4">
            <div>
              <h2 className="heading-font text-xl sm:text-2xl font-bold text-slate-100 tracking-wider">
                Appendix E: Readiness Guide for Parents and Catechists
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                Readiness is not perfect memory or mature theological language. A child should show sufficient understanding according to his or her capacity, a genuine desire for God's forgiveness and a practical ability to participate without undue fear.
              </p>
            </div>

            <div className="bg-[#181818] border border-white/10 rounded-lg p-3 flex items-center justify-between text-xs">
              <span className="text-slate-400 uppercase tracking-wider text-[10px]">Readiness Indicators Checked:</span>
              <span className="font-bold gold-text">
                {progress.readinessChecked.length} of {READINESS_ITEMS.length} Areas
              </span>
            </div>
          </div>

          <div className="space-y-3">
            {READINESS_ITEMS.map((item) => {
              const isChecked = progress.readinessChecked.includes(item.id);
              return (
                <div
                  key={item.id}
                  onClick={() => onToggleReadinessItem(item.id)}
                  className={`p-5 rounded-xl border transition-all cursor-pointer flex items-start space-x-4 ${
                    isChecked
                      ? 'bg-[#182018] border-emerald-700/50 text-slate-100'
                      : 'card-bg border-white/5 text-slate-300 hover:border-white/10'
                  }`}
                >
                  <div className="mt-0.5 flex-shrink-0">
                    {isChecked ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-500" />
                    )}
                  </div>

                  <div className="space-y-1">
                    <h3 className="heading-font text-sm font-bold text-slate-100 tracking-wider">
                      {item.area}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 font-sans-main leading-relaxed">
                      {item.looksLike}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Safeguarding & Canonical Notes */}
          <div className="card-bg border border-white/5 rounded-xl p-6 space-y-4 text-xs sm:text-sm text-slate-300 font-sans-main leading-relaxed">
            <div className="space-y-2 border-b border-white/5 pb-4">
              <h4 className="heading-font text-xs font-bold uppercase tracking-widest gold-text">
                Safeguarding Note
              </h4>
              <p>
                Catechists must follow diocesan safeguarding policy. A child should never be asked to disclose personal sins in a group, rehearsal or assessment. If a child discloses harm outside sacramental Confession, the adult must respond according to safeguarding procedures. If a priest becomes aware of danger only within sacramental Confession, he remains bound by the seal and may encourage the child to seek help or repeat the information outside the sacrament.
              </p>
            </div>

            <div className="space-y-1">
              <h4 className="heading-font text-xs font-bold uppercase tracking-widest gold-text">
                Canonical Note
              </h4>
              <p>
                First sacramental Confession is to precede First Holy Communion (Code of Canon Law, Canon 914).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SOURCES & DOCTRINAL REFERENCES */}
      {activeSubTab === 'sources' && (
        <div className="card-bg border border-white/5 rounded-xl p-6 sm:p-8 space-y-6 animate-fadeIn">
          <div>
            <h2 className="heading-font text-xl sm:text-2xl font-bold text-slate-100 tracking-wider">
              Sources and Doctrinal References
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1">
              Authoritative references and sources underlying this catechism preparation series.
            </p>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed font-sans-main">
            <div className="bg-[#181818] border border-white/5 rounded-lg p-4 space-y-1">
              <div className="font-bold text-slate-100">Sacred Scripture</div>
              <p className="text-slate-400">{SOURCES_DATA.scripture}</p>
            </div>

            <div className="bg-[#181818] border border-white/5 rounded-lg p-4 space-y-1">
              <div className="font-bold text-slate-100">Catechism of the Catholic Church (CCC)</div>
              <p className="text-slate-400">{SOURCES_DATA.ccc}</p>
            </div>

            <div className="bg-[#181818] border border-white/5 rounded-lg p-4 space-y-1">
              <div className="font-bold text-slate-100">Compendium of the Catechism of the Catholic Church</div>
              <p className="text-slate-400">{SOURCES_DATA.compendium}</p>
            </div>

            <div className="bg-[#181818] border border-white/5 rounded-lg p-4 space-y-1">
              <div className="font-bold text-slate-100">Code of Canon Law</div>
              <p className="text-slate-400">{SOURCES_DATA.canonLaw}</p>
            </div>

            <div className="bg-[#181818] border border-white/5 rounded-lg p-4 space-y-1">
              <div className="font-bold text-slate-100">Rite of Penance</div>
              <p className="text-slate-400">{SOURCES_DATA.rite}</p>
            </div>

            <div className="bg-[#181818] border border-white/5 rounded-lg p-4 space-y-1">
              <div className="font-bold text-slate-100">Historical Catechetical Reference</div>
              <p className="text-slate-400">{SOURCES_DATA.deharbe}</p>
            </div>

            <div className="bg-[#191610] border border-[#D4A936]/40 rounded-lg p-4 space-y-1">
              <div className="font-bold gold-text">Doctrinal Standard</div>
              <p className="text-[#F3E5AB]">{SOURCES_DATA.doctrinalStandard}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
