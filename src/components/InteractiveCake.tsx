import { Flame, RotateCcw, Wind } from 'lucide-react';
import { BIRTHDAY_PERSON, CandleItem, getCandleSummary } from '../utils/birthdayLogic';

interface InteractiveCakeProps {
  candles: CandleItem[];
  onToggleCandle: (id: number) => void;
  onBlowAll: () => void;
  onRelight: () => void;
}

export function InteractiveCake({
  candles,
  onToggleCandle,
  onBlowAll,
  onRelight,
}: InteractiveCakeProps) {
  const summary = getCandleSummary(candles);

  return (
    <section
      id="cake-wish"
      aria-labelledby="cake-heading"
      className="py-16 md:py-24 px-6 border-t border-[#FBCFE8] bg-gradient-to-br from-[#F3E8FF] via-[#FFE4E6] to-[#FEF3C7]"
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 text-xs font-semibold text-[#9F1239]">
            <span>Chapter 01</span>
            <span aria-hidden="true">·</span>
            <span>Date {BIRTHDAY_PERSON.dateNumber} Wish Ritual</span>
          </div>

          <h2
            id="cake-heading"
            className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917] text-balance"
          >
            Make a wish, {BIRTHDAY_PERSON.nickname}, and blow out the candles
          </h2>

          <p className="text-base leading-relaxed text-[#44403C]">
            Tap any candle flame on the cake to blow it out one by one, or hit
            the button below to blow them all out at once and unlock your{' '}
            {BIRTHDAY_PERSON.dateNumber}th wish note.
          </p>

          <div className="flex items-center gap-6 py-4 px-5 rounded-2xl bg-white/85 border border-[#FBCFE8] text-sm">
            <div>
              <span className="text-xs text-[#78716C] block">Candles Lit</span>
              <span className="font-mono font-semibold text-lg text-[#D97706] tabular-nums">
                {summary.litCount} / {summary.total}
              </span>
            </div>
            <div>
              <span className="text-xs text-[#78716C] block">Candles Blown</span>
              <span className="font-mono font-semibold text-lg text-[#E11D48] tabular-nums">
                {summary.blownCount} / {summary.total}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {!summary.allBlown ? (
              <button
                type="button"
                onClick={onBlowAll}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#E11D48] to-[#DB2777] text-white text-sm font-semibold hover:from-[#BE123C] hover:to-[#BE185D] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
              >
                <Wind className="w-4 h-4" aria-hidden="true" />
                <span>Blow Out All Candles</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={onRelight}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#1C1917] text-white text-sm font-semibold hover:bg-[#292524] transition-colors cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1C1917]"
              >
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
                <span>Relight All Candles</span>
              </button>
            )}
          </div>

          {summary.allBlown && (
            <div
              role="status"
              data-testid="wish-unlocked"
              className="rounded-2xl bg-gradient-to-br from-[#FFF1F2] via-[#FEF3C7] to-[#DBEAFE] border border-[#FDA4AF] p-6 shadow-sm space-y-2"
            >
              <p className="text-xs font-semibold text-[#E11D48]">
                Wish Unlocked · {BIRTHDAY_PERSON.dateNumber}th Birthday Blessing
              </p>
              <p className="font-display text-xl font-semibold text-[#1C1917]">
                May every single dream you whisper tonight come true,{' '}
                {BIRTHDAY_PERSON.formalName}.
              </p>
              <p className="text-sm leading-relaxed text-[#44403C]">
                And whatever you wished for, I&apos;ll be right beside you—cheering
                loudest as your bestie and loving you hardest as your person.
              </p>
            </div>
          )}
        </div>

        <div className="lg:col-span-7">
          <div className="bg-gradient-to-b from-[#FFFFFF] via-[#FFFBEB] to-[#FFF1F2] border-2 border-white rounded-3xl p-6 md:p-10 shadow-md overflow-hidden">
            {/* Festive Colorful Bunting Flags */}
            <div
              aria-hidden="true"
              className="flex items-start justify-center gap-3 pb-4 -mt-6"
            >
              {[
                '#E11D48',
                '#F59E0B',
                '#10B981',
                '#2563EB',
                '#7C3AED',
                '#EC4899',
                '#F59E0B',
                '#06B6D4',
                '#E11D48',
              ].map((color, idx) => (
                <span
                  key={idx}
                  className="w-0 h-0 border-l-[12px] border-r-[12px] border-t-[18px] border-l-transparent border-r-transparent block"
                  style={{ borderTopColor: color }}
                />
              ))}
            </div>
            {/* Interactive Candle Row */}
            <div className="flex items-end justify-center gap-4 sm:gap-7 pt-6 pb-2">
              {candles.map((candle) => (
                <button
                  key={candle.id}
                  type="button"
                  onClick={() => onToggleCandle(candle.id)}
                  aria-label={`${candle.lit ? 'Blow out' : 'Relight'} ${candle.label} candle`}
                  aria-pressed={!candle.lit}
                  className="group flex flex-col items-center cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E11D48] rounded-lg px-1"
                >
                  <span className="h-10 flex items-end justify-center mb-1">
                    {candle.lit ? (
                      <span className="animate-flame flex flex-col items-center">
                        <span className="w-4 h-6 rounded-full bg-gradient-to-t from-[#F59E0B] via-[#FBBF24] to-[#FEF08A] shadow-[0_0_12px_rgba(245,158,11,0.55)] block" />
                      </span>
                    ) : (
                      <span className="text-[11px] font-mono text-[#A8A29E] pb-1">
                        ~
                      </span>
                    )}
                  </span>
                  <span className="w-1 h-2 bg-[#44403C] rounded-full block" />
                  <span
                    className="w-5 sm:w-6 h-16 sm:h-20 rounded-t-md border border-black/5 block relative overflow-hidden transition-transform duration-150 group-hover:-translate-y-0.5"
                    style={{ backgroundColor: candle.color }}
                  >
                    <span
                      className="absolute inset-x-0 top-3 h-2 opacity-75"
                      style={{ backgroundColor: candle.stripeColor }}
                    />
                    <span
                      className="absolute inset-x-0 top-9 h-2 opacity-75"
                      style={{ backgroundColor: candle.stripeColor }}
                    />
                  </span>
                  <span className="mt-2 text-[11px] font-medium text-[#57534E] whitespace-nowrap">
                    {candle.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Colorful Multi-Tier Cake Illustration */}
            <div className="flex flex-col items-center select-none" aria-hidden="true">
              {/* Top Tier with 19 Emblem */}
              <div className="w-56 sm:w-64 h-16 rounded-t-2xl bg-gradient-to-r from-[#FDA4AF] via-[#FB7185] to-[#F472B6] relative border-b-4 border-[#FFE4E6] flex items-center justify-center shadow-inner">
                <div className="absolute -top-1 inset-x-2 flex justify-between">
                  <span className="w-5 h-4 rounded-b-full bg-[#FFFDF9]" />
                  <span className="w-6 h-5 rounded-b-full bg-[#FFFDF9]" />
                  <span className="w-5 h-4 rounded-b-full bg-[#FFFDF9]" />
                  <span className="w-6 h-5 rounded-b-full bg-[#FFFDF9]" />
                  <span className="w-5 h-4 rounded-b-full bg-[#FFFDF9]" />
                </div>
                <span className="font-mono text-sm font-semibold text-white tracking-wide mt-2 drop-shadow-xs">
                  Mahee · {BIRTHDAY_PERSON.dateNumber}
                </span>
              </div>

              {/* Middle Tier */}
              <div className="w-72 sm:w-80 h-20 bg-gradient-to-r from-[#FDE68A] via-[#FCD34D] to-[#FBBF24] relative border-b-4 border-[#FEF3C7] flex items-center justify-around px-6">
                <span className="w-3 h-3 rounded-full bg-[#E11D48]" />
                <span className="w-3 h-3 rounded-full bg-[#2563EB]" />
                <span className="w-3 h-3 rounded-full bg-[#059669]" />
                <span className="w-3 h-3 rounded-full bg-[#7C3AED]" />
                <span className="w-3 h-3 rounded-full bg-[#E11D48]" />
              </div>

              {/* Base Tier */}
              <div className="w-80 sm:w-96 max-w-full h-20 rounded-b-2xl bg-gradient-to-r from-[#BFDBFE] via-[#93C5FD] to-[#A78BFA] relative flex items-center justify-center">
                <span className="font-display text-lg font-semibold text-white drop-shadow-xs">
                  Happy Birthday {BIRTHDAY_PERSON.formalName}
                </span>
              </div>

              {/* Cake Stand */}
              <div className="w-[21.5rem] sm:w-[26rem] max-w-full h-3.5 rounded-full bg-[#E7E5E4] mt-1" />
              <div className="w-20 h-6 bg-[#D6D3D1] rounded-b-lg" />
              <div className="w-44 h-3 rounded-full bg-[#E7E5E4]" />
            </div>

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-[#78716C]">
              <Flame className="w-3.5 h-3.5 text-[#F59E0B]" aria-hidden="true" />
              <span>Click any individual candle above to toggle its flame</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
