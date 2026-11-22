import { useEffect, useState } from 'react';
import { Camera, Expand, X } from 'lucide-react';
import { BIRTHDAY_PERSON } from '../utils/birthdayLogic';

interface MomentCard {
  id: string;
  chapter: string;
  tag: string;
  title: string;
  caption: string;
  imageSrc: string;
  imageAlt: string;
  accentBg: string;
  accentText: string;
}

const MOMENTS: readonly MomentCard[] = [
  {
    id: 'bouquet',
    chapter: '01',
    tag: 'Vibrant Bloom',
    title: 'Flowers as bright as your laugh',
    caption:
      'Every room gets warmer the second you walk in—consider this bouquet a permanent standing order for the 19th.',
    imageSrc: '/src/assets/images/memory_floral_bouquet_1795380701317.jpg',
    imageAlt:
      'Colorful sunlit bouquet of coral peonies, yellow ranunculus, and blue delphinium tied with a magenta ribbon',
    accentBg: 'bg-[#FFF1F2]',
    accentText: 'text-[#BE123C]',
  },
  {
    id: 'treats',
    chapter: '02',
    tag: 'Bestie Dates',
    title: 'Iced drinks, snacks & endless tea',
    caption:
      'Our favorite kind of afternoon: sharing macarons, taking blurry camera shots, and turning ten-minute catch-ups into three hours.',
    imageSrc: '/src/assets/images/memory_terrace_treats_1795380701464.jpg',
    imageAlt:
      'Overhead view of colorful iced drinks, pastel macarons, fresh strawberries, and a vintage camera on a sunlit table',
    accentBg: 'bg-[#FEF3C7]',
    accentText: 'text-[#B45309]',
  },
  {
    id: 'twilight',
    chapter: '03',
    tag: 'Golden Evenings',
    title: 'Under string lights on the 19th',
    caption:
      'Here is to late-evening walks, sunset skies, and always having each other’s back long after the party lights dim.',
    imageSrc: '/src/assets/images/memory_twilight_lights_1795380701718.jpg',
    imageAlt:
      'Colorful coral and lavender twilight sunset sky over warm festoon string lights on a celebratory terrace',
    accentBg: 'bg-[#EFF6FF]',
    accentText: 'text-[#1D4ED8]',
  },
];

export function MomentsGallery() {
  const [selected, setSelected] = useState<MomentCard | null>(null);
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!selected) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setSelected(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selected]);

  return (
    <section
      id="moments"
      aria-labelledby="moments-heading"
      className="py-16 md:py-24 px-6 border-t border-[#FBCFE8] bg-gradient-to-br from-[#FFEDD5] via-[#FCE7F3] to-[#EDE9FE]"
    >
      <div className="max-w-6xl mx-auto space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-semibold text-[#6D28D9]">
              <span>Chapter 03</span>
              <span aria-hidden="true">·</span>
              <span>Colorful Moodboard for {BIRTHDAY_PERSON.nickname}</span>
            </div>
            <h2
              id="moments-heading"
              className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-[#1C1917] text-balance"
            >
              Three moods that remind me of you
            </h2>
          </div>
          <p className="text-sm font-medium text-[#44403C]">
            Click any frame to open the full card view
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {MOMENTS.map((moment) => {
            const isBroken = Boolean(failedImages[moment.id]);
            return (
              <article
                key={moment.id}
                className={`${moment.accentBg} border-2 border-white rounded-2xl overflow-hidden shadow-md flex flex-col`}
              >
                <div className="relative aspect-[4/3] bg-[#F5F5F4] overflow-hidden">
                  {isBroken ? (
                    <div
                      className={`h-full w-full ${moment.accentBg} flex flex-col items-center justify-center p-6 text-center`}
                    >
                      <Camera
                        className={`w-8 h-8 mb-2 ${moment.accentText}`}
                        aria-hidden="true"
                      />
                      <span className={`text-sm font-medium ${moment.accentText}`}>
                        {moment.title}
                      </span>
                    </div>
                  ) : (
                    <img
                      src={moment.imageSrc}
                      alt={moment.imageAlt}
                      referrerPolicy="no-referrer"
                      onError={() =>
                        setFailedImages((prev) => ({
                          ...prev,
                          [moment.id]: true,
                        }))
                      }
                      className="h-full w-full object-cover transition-transform duration-300 hover:scale-[1.03]"
                    />
                  )}
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-semibold text-[#57534E]">
                      <span className={moment.accentText}>{moment.chapter}</span>
                      <span aria-hidden="true">·</span>
                      <span>{moment.tag}</span>
                    </div>
                    <h3 className="font-display text-xl font-semibold text-[#1C1917]">
                      {moment.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-[#44403C]">
                      {moment.caption}
                    </p>
                  </div>

                  <div>
                    <button
                      type="button"
                      onClick={() => setSelected(moment)}
                      className={`inline-flex items-center gap-1.5 text-sm font-semibold ${moment.accentText} hover:opacity-80 transition-opacity cursor-pointer whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E11D48]`}
                    >
                      <Expand className="w-4 h-4" aria-hidden="true" />
                      <span>View Moment</span>
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>

      {selected && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4 md:p-8"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative aspect-[4/3] bg-[#F5F5F4]">
              {!failedImages[selected.id] ? (
                <img
                  src={selected.imageSrc}
                  alt={selected.imageAlt}
                  referrerPolicy="no-referrer"
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className={`h-full w-full ${selected.accentBg} flex items-center justify-center`}
                >
                  <Camera className={`w-10 h-10 ${selected.accentText}`} />
                </div>
              )}
              <button
                type="button"
                onClick={() => setSelected(null)}
                aria-label="Close moment preview"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white text-[#1C1917] flex items-center justify-center shadow-md hover:bg-stone-100 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 md:p-8 space-y-2">
              <div className="flex items-center gap-2 text-xs text-[#78716C]">
                <span className={selected.accentText}>
                  Chapter {selected.chapter}
                </span>
                <span aria-hidden="true">·</span>
                <span>{selected.tag}</span>
                <span aria-hidden="true">·</span>
                <span>For {BIRTHDAY_PERSON.nickname}</span>
              </div>
              <h3
                id="lightbox-title"
                className="font-display text-2xl font-semibold text-[#1C1917]"
              >
                {selected.title}
              </h3>
              <p className="text-base leading-relaxed text-[#57534E]">
                {selected.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
