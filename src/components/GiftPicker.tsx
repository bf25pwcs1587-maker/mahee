import { Gift, RotateCcw, Sparkles } from 'lucide-react';
import {
  BIRTHDAY_PERSON,
  GIFT_BOX_SHELLS,
  GiftProgressState,
} from '../utils/birthdayLogic';

interface GiftPickerProps {
  progress: GiftProgressState;
  onOpenGift: (boxId: string) => void;
  onResetGifts: () => void;
}

export function GiftPicker({
  progress,
  onOpenGift,
  onResetGifts,
}: GiftPickerProps) {
  const allOpened = progress.openedIds.length === GIFT_BOX_SHELLS.length;

  return (
    <section
      id="gifts"
      aria-labelledby="gifts-heading"
      className="py-16 md:py-24 px-6 border-t border-[#93C5FD] bg-gradient-to-br from-[#DBEAFE] via-[#D1FAE5] to-[#FEF3C7]"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#047857]">
              <span>Chapter 04</span>
              <span aria-hidden="true">·</span>
              <span>One Last Prank Setup</span>
              <span aria-hidden="true">·</span>
              <span>Date {BIRTHDAY_PERSON.dateNumber}</span>
            </div>
            <h2
              id="gifts-heading"
              className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917] text-balance"
            >
              Pick your {BIRTHDAY_PERSON.dateNumber}th birthday gift box
            </h2>
            <p className="text-base text-[#292524]">
              Two of these boxes are cheeky bestie pranks. One holds the real
              promise. Open all three to see which one wins.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="font-mono text-xs font-semibold text-[#1C1917] tabular-nums">
              Opened {progress.openedIds.length} / {GIFT_BOX_SHELLS.length}
            </span>
            {progress.openedIds.length > 0 && (
              <button
                type="button"
                onClick={onResetGifts}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#1C1917] hover:text-[#E11D48] cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Rewrap Boxes</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GIFT_BOX_SHELLS.map((shell) => {
            const revealed = progress.revealedMap[shell.id];

            if (!revealed) {
              return (
                <button
                  key={shell.id}
                  type="button"
                  onClick={() => onOpenGift(shell.id)}
                  style={{ backgroundColor: shell.boxColor }}
                  className="group relative text-left border-2 border-white rounded-2xl p-8 shadow-md hover:-translate-y-1 transition-transform duration-150 cursor-pointer flex flex-col justify-between min-h-[260px] overflow-hidden focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]"
                >
                  {/* Top Gift Ribbon Strip */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 h-2.5 block"
                    style={{ backgroundColor: shell.ribbonColor }}
                  />
                  <div className="w-16 h-16 rounded-2xl bg-white/85 flex items-center justify-center relative overflow-hidden mt-2">
                    <Gift
                      className="w-7 h-7 transition-transform duration-200 group-hover:scale-110"
                      style={{ color: shell.ribbonColor }}
                      aria-hidden="true"
                    />
                  </div>

                  <div className="space-y-2 pt-6">
                    <span
                      className="text-xs font-semibold block"
                      style={{ color: shell.ribbonColor }}
                    >
                      Tap to unwrap
                    </span>
                    <h3 className="font-display text-2xl font-semibold text-[#1C1917]">
                      {shell.title}
                    </h3>
                    <p className="text-sm text-[#44403C]">
                      Prepared specially for {BIRTHDAY_PERSON.nickname} on the{' '}
                      {BIRTHDAY_PERSON.dateNumber}th.
                    </p>
                  </div>
                </button>
              );
            }

            return (
              <article
                key={shell.id}
                data-testid={
                  revealed.isFinale ? 'gift-finale-card' : 'gift-prank-card'
                }
                className={`rounded-2xl p-8 border-2 flex flex-col justify-between min-h-[260px] shadow-md ${
                  revealed.isFinale
                    ? 'bg-gradient-to-br from-[#FFE4E6] via-[#FEF3C7] to-[#DBEAFE] border-[#E11D48]'
                    : 'bg-white/95 border-white'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    {revealed.isFinale && (
                      <Sparkles
                        className="w-4 h-4 text-[#E11D48]"
                        aria-hidden="true"
                      />
                    )}
                    <span
                      className={
                        revealed.isFinale ? 'text-[#E11D48]' : 'text-[#6D28D9]'
                      }
                    >
                      {revealed.tagText}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                    {revealed.headline}
                  </h3>
                  <p className="text-sm leading-relaxed text-[#44403C]">
                    {revealed.body}
                  </p>
                </div>

                <div className="pt-4 text-xs font-medium text-[#57534E]">
                  {revealed.isFinale
                    ? `Claimable anytime by ${BIRTHDAY_PERSON.formalName}`
                    : 'Keep unwrapping to find the real gift'}
                </div>
              </article>
            );
          })}
        </div>

        {allOpened && (
          <p className="text-center text-sm font-semibold text-[#1C1917]">
            All 3 boxes unwrapped! Happy {BIRTHDAY_PERSON.dateNumber}th Birthday,{' '}
            {BIRTHDAY_PERSON.nickname}.
          </p>
        )}
      </div>
    </section>
  );
}
