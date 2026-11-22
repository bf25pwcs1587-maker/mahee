import { useState } from 'react';
import { PartyPopper, RotateCcw, Volume2, VolumeX } from 'lucide-react';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { GiftPicker } from './components/GiftPicker';
import { InteractiveCake } from './components/InteractiveCake';
import { LetterSection } from './components/LetterSection';
import { MomentsGallery } from './components/MomentsGallery';
import { PrankGate } from './components/PrankGate';
import {
  BIRTHDAY_PERSON,
  ExperienceStage,
  blowAllCandles,
  createInitialCandles,
  createInitialGiftProgress,
  getNextStage,
  openGiftBox,
  relightAllCandles,
  resolveInitialStage,
  toggleCandleById,
} from './utils/birthdayLogic';
import { playBirthdayMelody, playGiftPop } from './utils/soundEffects';

export default function App() {
  const [stage, setStage] = useState<ExperienceStage>(() =>
    typeof window !== 'undefined'
      ? resolveInitialStage(window.location.search)
      : 'AUDIT_GATE',
  );
  const [muted, setMuted] = useState(false);
  const [confettiKey, setConfettiKey] = useState(0);
  const [candles, setCandles] = useState(() => createInitialCandles());
  const [giftProgress, setGiftProgress] = useState(() =>
    createInitialGiftProgress(),
  );
  const [heroImageError, setHeroImageError] = useState(false);

  const triggerConfetti = () => {
    setConfettiKey((prev) => prev + 1);
  };

  const handleAdvancePrank = () => {
    const next = getNextStage(stage);
    setStage(next);
    if (next === 'CELEBRATION') {
      triggerConfetti();
      playBirthdayMelody(muted);
    }
  };

  const handleSkipToParty = () => {
    setStage('CELEBRATION');
    triggerConfetti();
    playBirthdayMelody(muted);
  };

  const handleReplayPrank = () => {
    setStage('AUDIT_GATE');
    setCandles(createInitialCandles());
    setGiftProgress(createInitialGiftProgress());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleToggleCandle = (id: number) => {
    setCandles((prev) => {
      const next = toggleCandleById(prev, id);
      const allOut = next.every((c) => !c.lit);
      if (allOut) {
        triggerConfetti();
        playBirthdayMelody(muted);
      }
      return next;
    });
  };

  const handleBlowAllCandles = () => {
    setCandles((prev) => blowAllCandles(prev));
    triggerConfetti();
    playBirthdayMelody(muted);
  };

  const handleRelightCandles = () => {
    setCandles((prev) => relightAllCandles(prev));
  };

  const handleOpenGift = (boxId: string) => {
    setGiftProgress((prev) => {
      const next = openGiftBox(prev, boxId);
      const opened = next.revealedMap[boxId];
      if (opened) {
        playGiftPop(muted, opened.isFinale);
        if (opened.isFinale) {
          triggerConfetti();
        }
      }
      return next;
    });
  };

  if (stage !== 'CELEBRATION') {
    return (
      <>
        <ConfettiCanvas burstKey={confettiKey} />
        <PrankGate
          stage={stage}
          muted={muted}
          onAdvance={handleAdvancePrank}
          onSkipToParty={handleSkipToParty}
        />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#1C1917]">
      <ConfettiCanvas burstKey={confettiKey} />

      {/* Clean 3-Zone Top Bar */}
      <header className="sticky top-0 z-40 bg-gradient-to-r from-[#FFF1F2]/95 via-[#FEF9C3]/95 to-[#EFF6FF]/95 backdrop-blur-sm border-b border-[#FBCFE8]">
        <div
          aria-hidden="true"
          className="h-1.5 w-full bg-gradient-to-r from-[#E11D48] via-[#F59E0B] via-[#10B981] via-[#2563EB] to-[#7C3AED]"
        />
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between gap-8">
          <a
            href="#top"
            className="font-display text-xl font-semibold tracking-tight text-[#1C1917] whitespace-nowrap shrink-0"
          >
            For <span className="text-[#E11D48]">{BIRTHDAY_PERSON.nickname}</span>
          </a>

          <nav
            aria-label="Birthday sections"
            className="hidden md:flex items-center gap-6 text-sm font-medium text-[#44403C]"
          >
            <a
              href="#cake-wish"
              className="hover:text-[#E11D48] transition-colors whitespace-nowrap shrink-0"
            >
              Cake &amp; Wish
            </a>
            <a
              href="#the-letter"
              className="hover:text-[#2563EB] transition-colors whitespace-nowrap shrink-0"
            >
              The Letter
            </a>
            <a
              href="#moments"
              className="hover:text-[#7C3AED] transition-colors whitespace-nowrap shrink-0"
            >
              Moments
            </a>
            <a
              href="#gifts"
              className="hover:text-[#059669] transition-colors whitespace-nowrap shrink-0"
            >
              19th Gifts
            </a>
          </nav>

          <div className="shrink-0">
            <button
              type="button"
              onClick={() => {
                triggerConfetti();
                playGiftPop(muted, true);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#DB2777] text-white text-xs sm:text-sm font-semibold hover:from-[#BE123C] hover:to-[#BE185D] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
            >
              <PartyPopper className="w-4 h-4" aria-hidden="true" />
              <span>Pop Confetti</span>
            </button>
          </div>
        </div>
      </header>

      <main id="top">
        {/* Colorful Festive Hero Split */}
        <section className="relative overflow-hidden bg-gradient-to-br from-[#FFE4E6] via-[#FEF3C7] to-[#DBEAFE] px-6 pt-12 pb-16 md:pt-16 md:pb-20">
          <div className="max-w-6xl mx-auto space-y-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
              {/* Left Column: Typographic Hierarchy */}
              <div className="lg:col-span-6 flex flex-col justify-center space-y-6">
                <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#9F1239]">
                  <span>Date {BIRTHDAY_PERSON.dateNumber}</span>
                  <span aria-hidden="true">·</span>
                  <span>For {BIRTHDAY_PERSON.formalName}</span>
                  <span aria-hidden="true">·</span>
                  <span>{BIRTHDAY_PERSON.bondSummary}</span>
                </div>

                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#1C1917] leading-[1.08] text-balance">
                  Happy Birthday,{' '}
                  <span className="bg-gradient-to-r from-[#E11D48] via-[#D97706] to-[#7C3AED] bg-clip-text text-transparent">
                    {BIRTHDAY_PERSON.nickname}
                  </span>
                </h1>

                <p className="text-base sm:text-lg leading-relaxed text-[#292524] max-w-xl">
                  Surprise, {BIRTHDAY_PERSON.formalName}! No plain-text &ldquo;hbd.&rdquo;
                  around here—today is the{' '}
                  <strong className="font-semibold text-[#E11D48]">
                    {BIRTHDAY_PERSON.dateNumber}th
                  </strong>
                  , and we&apos;re celebrating my favorite bestie, partner in
                  chaos, and the sweetest person my heart knows.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#cake-wish"
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#E11D48] via-[#DB2777] to-[#7C3AED] text-white text-sm font-semibold hover:opacity-95 transition-opacity whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
                  >
                    <span>Light &amp; Blow the Candles</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => setMuted((prev) => !prev)}
                    aria-label={muted ? 'Unmute birthday music' : 'Mute birthday music'}
                    className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl border border-[#FBCFE8] bg-white/90 text-sm font-semibold text-[#1C1917] hover:bg-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {muted ? (
                      <>
                        <VolumeX className="w-4 h-4" aria-hidden="true" />
                        <span>Sound Off</span>
                      </>
                    ) : (
                      <>
                        <Volume2 className="w-4 h-4 text-[#E11D48]" aria-hidden="true" />
                        <span>Sound On</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Right Column: Hero Visual */}
              <div className="lg:col-span-6">
                <div className="relative h-full min-h-[320px] lg:min-h-[420px] rounded-3xl overflow-hidden border-2 border-white bg-[#FFF1F2] shadow-md">
                  {heroImageError ? (
                    <div className="h-full w-full flex flex-col items-center justify-center p-8 text-center bg-gradient-to-br from-[#FFE4E6] via-[#FEF3C7] to-[#DBEAFE]">
                      <span className="font-display text-5xl font-semibold text-[#E11D48]">
                        {BIRTHDAY_PERSON.dateNumber}
                      </span>
                      <span className="mt-2 font-display text-2xl text-[#1C1917]">
                        Happy Birthday, {BIRTHDAY_PERSON.nickname}
                      </span>
                    </div>
                  ) : (
                    <img
                      src="/src/assets/images/hero_mahee_celebration_1795380701660.jpg"
                      alt="Colorful layered birthday cake with coral and marigold buttercream, striped candles, berries, and wildflowers"
                      referrerPolicy="no-referrer"
                      onError={() => setHeroImageError(true)}
                      className="h-full w-full object-cover"
                    />
                  )}
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/30 to-transparent p-6">
                    <p className="text-xs font-mono text-white/95 tabular-nums">
                      Date {BIRTHDAY_PERSON.dateNumber} · Dedicated to{' '}
                      {BIRTHDAY_PERSON.formalName} ({BIRTHDAY_PERSON.nickname})
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 4-Column Full-Width Colorful Celebration Strip */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-6 border-t border-white/60">
              <div className="bg-[#FFF1F2] border border-[#FDA4AF] rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-medium text-[#9F1239] block">Celebration Date</span>
                <span className="font-display text-2xl font-semibold text-[#E11D48] mt-1 block tabular-nums">
                  {BIRTHDAY_PERSON.dateNumber}th
                </span>
              </div>
              <div className="bg-[#FEF3C7] border border-[#FCD34D] rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-medium text-[#92400E] block">Birthday Girl</span>
                <span className="font-display text-2xl font-semibold text-[#B45309] mt-1 block">
                  {BIRTHDAY_PERSON.formalName}
                </span>
              </div>
              <div className="bg-[#DBEAFE] border border-[#93C5FD] rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-medium text-[#1E40AF] block">Favorite Nickname</span>
                <span className="font-display text-2xl font-semibold text-[#1D4ED8] mt-1 block">
                  {BIRTHDAY_PERSON.nickname}
                </span>
              </div>
              <div className="bg-[#D1FAE5] border border-[#6EE7B7] rounded-2xl p-5 shadow-xs">
                <span className="text-xs font-medium text-[#065F46] block">Official Role</span>
                <span className="font-display text-2xl font-semibold text-[#047857] mt-1 block">
                  Bestie &amp; Love
                </span>
              </div>
            </div>
          </div>
        </section>

        <InteractiveCake
          candles={candles}
          onToggleCandle={handleToggleCandle}
          onBlowAll={handleBlowAllCandles}
          onRelight={handleRelightCandles}
        />

        <LetterSection />

        <MomentsGallery />

        <GiftPicker
          progress={giftProgress}
          onOpenGift={handleOpenGift}
          onResetGifts={() => setGiftProgress(createInitialGiftProgress())}
        />
      </main>

      <footer className="border-t border-[#FBCFE8] bg-gradient-to-r from-[#FFE4E6] via-[#FEF3C7] to-[#DBEAFE] px-6 py-10">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium text-[#292524]">
            Made with laughter and love for {BIRTHDAY_PERSON.formalName} (
            {BIRTHDAY_PERSON.nickname}) · Date {BIRTHDAY_PERSON.dateNumber}
          </p>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={handleReplayPrank}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white/90 border border-[#FBCFE8] text-sm font-semibold text-[#1C1917] hover:text-[#E11D48] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Replay Prank</span>
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
