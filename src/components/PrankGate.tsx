import { useState } from 'react';
import { ArrowRight, FileWarning, ShieldAlert, Sparkles } from 'lucide-react';
import {
  BIRTHDAY_PERSON,
  ExperienceStage,
  getDodgeState,
} from '../utils/birthdayLogic';
import { playPrankBoop } from '../utils/soundEffects';

interface PrankGateProps {
  stage: Exclude<ExperienceStage, 'CELEBRATION'>;
  muted: boolean;
  onAdvance: () => void;
  onSkipToParty: () => void;
}

export function PrankGate({
  stage,
  muted,
  onAdvance,
  onSkipToParty,
}: PrankGateProps) {
  const [dodgeCount, setDodgeCount] = useState(0);
  const dodge = getDodgeState(dodgeCount);

  const handleRunawayAttempt = () => {
    playPrankBoop(muted);
    setDodgeCount((prev) => prev + 1);
  };

  if (stage === 'AUDIT_GATE') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#DBEAFE] via-[#F3E8FF] to-[#FFE4E6] text-[#1C1917] flex items-center justify-center px-6 py-12">
        <section
          aria-labelledby="audit-title"
          className="w-full max-w-xl bg-white/95 border border-[#E9D5FF] rounded-2xl overflow-hidden shadow-md"
        >
          <div
            aria-hidden="true"
            className="h-2 w-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] via-[#10B981] to-[#2563EB]"
          />
          <div className="p-8 md:p-10">
            <div className="flex items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-3 text-xs font-mono text-[#7C3AED]">
                <FileWarning className="w-4 h-4 text-[#E11D48]" aria-hidden="true" />
                <span>Notice Ref · Date {BIRTHDAY_PERSON.dateNumber}</span>
                <span aria-hidden="true">·</span>
                <span>Recipient: {BIRTHDAY_PERSON.formalName}</span>
              </div>
            </div>

            <div className="pt-8 space-y-5">
              <h1
                id="audit-title"
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-slate-900 text-balance"
              >
                Annual Friendship Compliance Check
              </h1>
              <p className="text-base leading-relaxed text-slate-700">
                Good morning, {BIRTHDAY_PERSON.formalName}. Before we grant access to
                today&apos;s scheduled file for the {BIRTHDAY_PERSON.dateNumber}th, please
                confirm that you are, in fact, the girl everyone calls{' '}
                <span className="font-semibold text-[#E11D48]">
                  {BIRTHDAY_PERSON.nickname}
                </span>
                .
              </p>

              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-4 px-4 rounded-xl bg-gradient-to-r from-[#FFF1F2] via-[#FEF3C7] to-[#EFF6FF] border border-[#FBCFE8] text-sm">
                <div>
                  <dt className="text-xs text-slate-600">Official Name</dt>
                  <dd className="font-semibold text-slate-900 mt-1">
                    {BIRTHDAY_PERSON.formalName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-600">Preferred Alias</dt>
                  <dd className="font-semibold text-[#E11D48] mt-1">
                    {BIRTHDAY_PERSON.nickname}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-slate-600">Scheduled Date</dt>
                  <dd className="font-mono font-semibold text-[#2563EB] mt-1 tabular-nums">
                    The {BIRTHDAY_PERSON.dateNumber}th
                  </dd>
                </div>
              </dl>

              <div className="pt-2 flex flex-wrap items-center justify-between gap-4">
                <button
                  type="button"
                  onClick={() => {
                    playPrankBoop(muted);
                    onAdvance();
                  }}
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#E11D48] text-white text-sm font-semibold hover:bg-[#BE123C] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
                >
                  <span>Yes, I am {BIRTHDAY_PERSON.nickname}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={onSkipToParty}
                  className="text-xs font-semibold text-[#6D28D9] hover:text-[#4C1D95] underline underline-offset-4 cursor-pointer whitespace-nowrap shrink-0"
                >
                  Skip straight to wish
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  if (stage === 'DODGE_TRAP') {
    return (
      <main className="min-h-screen bg-gradient-to-br from-[#FFE4E6] via-[#FEF3C7] to-[#EDE9FE] text-[#1C1917] flex items-center justify-center px-6 py-12">
        <section
          aria-labelledby="trap-title"
          className="w-full max-w-xl bg-white/95 border border-[#FDA4AF] rounded-2xl overflow-hidden shadow-md"
        >
          <div
            aria-hidden="true"
            className="h-2 w-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] via-[#10B981] to-[#2563EB]"
          />
          <div className="p-8 md:p-10">
            <div className="flex items-center gap-2 text-xs font-medium text-rose-700 pb-5 border-b border-rose-100">
              <ShieldAlert className="w-4 h-4" aria-hidden="true" />
              <span>Step 2 of 2</span>
              <span aria-hidden="true">·</span>
              <span>Date {BIRTHDAY_PERSON.dateNumber} Clearance</span>
            </div>

            <div className="pt-7 space-y-5">
              <h1
                id="trap-title"
                className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 text-balance"
              >
                Hold on, {BIRTHDAY_PERSON.nickname}. One honest question first.
              </h1>
              <p className="text-base leading-relaxed text-stone-700">
                Do you officially admit that you&apos;re my favorite bestie,
                midnight comfort person, and the prettiest trouble in my life?
              </p>

              {dodgeCount > 0 && (
                <p
                  role="status"
                  className="text-sm font-medium text-rose-800 bg-gradient-to-r from-[#FFE4E6] to-[#FEF3C7] border border-rose-200 rounded-xl px-4 py-2.5"
                >
                  {dodge.surrendered
                    ? `Haha ${BIRTHDAY_PERSON.nickname}, nice reflexes (${dodgeCount} dodges)! Now click the pink button.`
                    : `Attempt #${dodgeCount}: Did you really just try to say no?!`}
                </p>
              )}

              <div className="relative min-h-[150px] overflow-hidden flex flex-wrap items-center justify-center sm:justify-start gap-4 py-8 px-2">
                <button
                  type="button"
                  onClick={() => {
                    playPrankBoop(muted);
                    onAdvance();
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#DB2777] text-white text-sm font-semibold hover:from-[#BE123C] hover:to-[#BE185D] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
                >
                  <span>Obviously, yes</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>

                <button
                  type="button"
                  onMouseEnter={() => {
                    if (!dodge.surrendered) {
                      handleRunawayAttempt();
                    }
                  }}
                  onClick={() => {
                    if (dodge.surrendered) {
                      onAdvance();
                    } else {
                      handleRunawayAttempt();
                    }
                  }}
                  style={{
                    transform: `translate(${dodge.offset.x}px, ${dodge.offset.y}px)`,
                  }}
                  className="px-5 py-3.5 rounded-xl border border-[#F59E0B] bg-[#FEF3C7] text-[#92400E] text-sm font-semibold hover:bg-[#FDE68A] transition-transform duration-150 cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D97706]"
                >
                  {dodge.taunt}
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-[#FEF3C7] via-[#FFEDD5] to-[#FFE4E6] text-[#1C1917] flex items-center justify-center px-6 py-12">
      <section
        aria-labelledby="fake-error-title"
        className="w-full max-w-xl bg-white/95 border border-[#FCD34D] rounded-2xl overflow-hidden shadow-md"
      >
        <div
          aria-hidden="true"
          className="h-2 w-full bg-gradient-to-r from-[#F59E0B] via-[#E11D48] to-[#7C3AED]"
        />
        <div className="p-8 md:p-10">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-800 pb-5 border-b border-amber-100">
            <span>Error 19-404</span>
            <span aria-hidden="true">·</span>
            <span>Gift Engine Overload</span>
          </div>

          <div className="pt-7 space-y-5">
            <h1
              id="fake-error-title"
              className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-stone-900 text-balance"
            >
              Uh oh... the birthday budget ran out.
            </h1>
            <p className="text-base leading-relaxed text-stone-700">
              Too much affection was detected for{' '}
              <span className="font-semibold text-[#E11D48]">
                {BIRTHDAY_PERSON.formalName}
              </span>
              , so the server crashed and downgraded your {BIRTHDAY_PERSON.dateNumber}th
              gift to a plain-text message:
            </p>

            <div className="bg-gradient-to-r from-[#FEF3C7] via-[#FFE4E6] to-[#EDE9FE] border border-[#FDBA74] rounded-xl p-6 text-center">
              <p className="font-mono text-2xl font-semibold text-stone-800">
                hbd.
              </p>
            </div>

            <p className="text-sm text-stone-600">
              Wait... are you seriously going to accept just &ldquo;hbd.&rdquo; on
              the {BIRTHDAY_PERSON.dateNumber}th?
            </p>

            <div className="pt-2">
              <button
                type="button"
                onClick={onAdvance}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#DB2777] to-[#7C3AED] text-white text-sm font-semibold hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
              >
                <Sparkles className="w-4 h-4" aria-hidden="true" />
                <span>Wait—open the real surprise!</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
