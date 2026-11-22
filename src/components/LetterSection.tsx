import { useState } from 'react';
import { Heart, LockOpen } from 'lucide-react';
import { BIRTHDAY_PERSON } from '../utils/birthdayLogic';

export function LetterSection() {
  const [showPostscript, setShowPostscript] = useState(false);

  return (
    <section
      id="the-letter"
      aria-labelledby="letter-heading"
      className="py-16 md:py-24 px-6 border-t border-[#A7F3D0] bg-gradient-to-br from-[#D1FAE5] via-[#DBEAFE] to-[#FCE7F3]"
    >
      <div className="max-w-4xl mx-auto bg-white/95 border-2 border-white rounded-3xl overflow-hidden shadow-md">
        <div
          aria-hidden="true"
          className="h-2 w-full bg-gradient-to-r from-[#10B981] via-[#2563EB] via-[#7C3AED] to-[#E11D48]"
        />
        <div className="p-8 md:p-12">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#F3E8E2]">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#1D4ED8]">
              <span>Chapter 02</span>
              <span aria-hidden="true">·</span>
              <span>For {BIRTHDAY_PERSON.formalName}</span>
              <span aria-hidden="true">·</span>
              <span>The {BIRTHDAY_PERSON.dateNumber}th Note</span>
            </div>
            <span className="font-mono text-xs font-semibold text-[#059669] tabular-nums">
              Date: {BIRTHDAY_PERSON.dateNumber}
            </span>
          </div>

          <div className="pt-8 space-y-6">
            <h2
              id="letter-heading"
              className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917] text-balance"
            >
              Bestie by luck, favorite person by choice
            </h2>

            <div className="space-y-5 text-base md:text-lg leading-relaxed text-[#44403C]">
              <p>
                Dear <strong className="font-semibold text-[#1D4ED8]">{BIRTHDAY_PERSON.formalName}</strong>{' '}
                (or as I will always call you,{' '}
                <strong className="font-semibold text-[#E11D48]">{BIRTHDAY_PERSON.nickname}</strong>),
              </p>
              <p>
                First of all, sorry for making you chase that &ldquo;No&rdquo; button
                and scaring you with a plain-text &ldquo;hbd.&rdquo;—you know I could
                never let the <strong className="font-semibold text-[#B45309]">{BIRTHDAY_PERSON.dateNumber}th</strong>{' '}
                pass without making you smile, laugh, and roll your eyes at me at
                least twice.
              </p>
              <p>
                What makes us special is how effortlessly you are everything at
                once: the best friend I tell every random two-in-the-morning story
                to, the friend who makes ordinary afternoons feel like a mini
                adventure, and the person my heart quietly picks before anyone
                else in the room.
              </p>
              <p>
                On this {BIRTHDAY_PERSON.dateNumber}th, I hope your year feels as
                bright, warm, and colorful as the energy you bring into my life
                every single day. Stay exactly this funny, soft-hearted, stubbornly
                wonderful self.
              </p>
            </div>

            <div className="pt-4">
              <button
                type="button"
                onClick={() => setShowPostscript((prev) => !prev)}
                aria-expanded={showPostscript}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-[#2563EB] to-[#7C3AED] text-white text-sm font-semibold hover:opacity-95 transition-opacity cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >
                {showPostscript ? (
                  <>
                    <Heart className="w-4 h-4 fill-current" aria-hidden="true" />
                    <span>Hide Secret Postscript</span>
                  </>
                ) : (
                  <>
                    <LockOpen className="w-4 h-4" aria-hidden="true" />
                    <span>Read Secret Postscript</span>
                  </>
                )}
              </button>
            </div>

            {showPostscript && (
              <div className="rounded-2xl bg-gradient-to-r from-[#FFE4E6] via-[#FEF3C7] to-[#DBEAFE] border border-[#FBCFE8] p-6 space-y-2">
                <p className="text-xs font-semibold text-[#9F1239]">
                  P.S. · Just between us
                </p>
                <p className="font-display text-lg md:text-xl font-medium text-[#1C1917]">
                  No matter how many birthdays come and go after this{' '}
                  {BIRTHDAY_PERSON.dateNumber}th, you will always be my favorite
                  Mahee—bestie, partner-in-crime, and the prettiest part of my
                  days.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
