export type ExperienceStage = 'AUDIT_GATE' | 'DODGE_TRAP' | 'FAKE_ERROR' | 'CELEBRATION';

export interface DodgePosition {
  x: number;
  y: number;
}

export interface CandleItem {
  id: number;
  color: string;
  stripeColor: string;
  label: string;
  lit: boolean;
}

export interface GiftBoxContent {
  id: string;
  title: string;
  ribbonColor: string;
  boxColor: string;
  isFinale: boolean;
  headline: string;
  body: string;
  tagText: string;
}

export const BIRTHDAY_PERSON = {
  formalName: 'Manahil',
  nickname: 'Mahee',
  dateNumber: '19',
  dateLabel: '19th Edition',
  bondSummary: 'Bestie · Confidante · Favorite Person',
} as const;

export const DODGE_TAUNTS: readonly string[] = [
  'No, skip it',
  'Nice try, Mahee',
  'Too slow, bestie!',
  'Wrong button!',
  'Cannot escape love',
  'Okay fine, click Yes!',
];

export const DODGE_OFFSETS: readonly DodgePosition[] = [
  { x: 0, y: 0 },
  { x: 64, y: -32 },
  { x: -64, y: 28 },
  { x: 52, y: 34 },
  { x: -56, y: -34 },
  { x: 24, y: -36 },
];

export function resolveInitialStage(search: string): ExperienceStage {
  const params = new URLSearchParams(search);
  if (params.get('autostart') === '1') {
    return 'CELEBRATION';
  }
  return 'AUDIT_GATE';
}

export function getNextStage(current: ExperienceStage): ExperienceStage {
  switch (current) {
    case 'AUDIT_GATE':
      return 'DODGE_TRAP';
    case 'DODGE_TRAP':
      return 'FAKE_ERROR';
    case 'FAKE_ERROR':
      return 'CELEBRATION';
    case 'CELEBRATION':
      return 'CELEBRATION';
  }
}

export function getDodgeState(dodgeCount: number): {
  taunt: string;
  offset: DodgePosition;
  surrendered: boolean;
} {
  const safeCount = Math.max(0, Math.floor(dodgeCount));
  const tauntIndex = Math.min(safeCount, DODGE_TAUNTS.length - 1);
  const offsetIndex = safeCount % DODGE_OFFSETS.length;
  return {
    taunt: DODGE_TAUNTS[tauntIndex],
    offset: DODGE_OFFSETS[offsetIndex],
    surrendered: safeCount >= 5,
  };
}

export function createInitialCandles(): CandleItem[] {
  return [
    { id: 1, color: '#FB7185', stripeColor: '#FFF1F2', label: 'Joy', lit: true },
    { id: 2, color: '#FBBF24', stripeColor: '#FEF3C7', label: 'Chaos', lit: true },
    { id: 3, color: '#38BDF8', stripeColor: '#E0F2FE', label: 'Laughter', lit: true },
    { id: 4, color: '#A78BFA', stripeColor: '#EDE9FE', label: 'Love', lit: true },
    { id: 5, color: '#34D399', stripeColor: '#D1FAE5', label: '19th Wish', lit: true },
  ];
}

export function toggleCandleById(candles: CandleItem[], id: number): CandleItem[] {
  return candles.map((candle) =>
    candle.id === id ? { ...candle, lit: !candle.lit } : candle,
  );
}

export function blowAllCandles(candles: CandleItem[]): CandleItem[] {
  return candles.map((candle) => ({ ...candle, lit: false }));
}

export function relightAllCandles(candles: CandleItem[]): CandleItem[] {
  return candles.map((candle) => ({ ...candle, lit: true }));
}

export function getCandleSummary(candles: CandleItem[]): {
  total: number;
  litCount: number;
  blownCount: number;
  allBlown: boolean;
} {
  const total = candles.length;
  const litCount = candles.filter((c) => c.lit).length;
  const blownCount = total - litCount;
  return {
    total,
    litCount,
    blownCount,
    allBlown: total > 0 && litCount === 0,
  };
}

export interface GiftProgressState {
  openedIds: string[];
  revealedMap: Record<string, GiftBoxContent>;
}

const PRANK_REWARDS: readonly Omit<GiftBoxContent, 'id' | 'title' | 'ribbonColor' | 'boxColor'>[] = [
  {
    isFinale: false,
    tagText: 'Prank Voucher · 01',
    headline: '1,000 Dramatic Eye Rolls (Pre-Approved)',
    body: 'Valid whenever I tell an awful joke on purpose. Honestly Mahee, you already used 400 of these this month, so consider this a refill.',
  },
  {
    isFinale: false,
    tagText: 'Prank Voucher · 02',
    headline: 'Official Certificate of Always Being Right',
    body: 'Signed and notarized for the 19th: even when you are 100% wrong about directions or movie plots, I still have to nod and agree.',
  },
];

const FINALE_REWARD: Omit<GiftBoxContent, 'id' | 'title' | 'ribbonColor' | 'boxColor'> = {
  isFinale: true,
  tagText: 'Real 19th Gift · Unlocked',
  headline: 'Date Night, Unlimited Hugs & Always Your Person',
  body: 'Pranks aside, Manahil: your favorite meal, dessert on me, zero boring moments, and a whole year of standing right beside you as your bestie and favorite heart.',
};

export const GIFT_BOX_SHELLS = [
  {
    id: 'gift-coral',
    title: 'Coral Ribbon Box',
    boxColor: '#FFE4E6',
    ribbonColor: '#E11D48',
  },
  {
    id: 'gift-marigold',
    title: 'Marigold Spark Box',
    boxColor: '#FEF3C7',
    ribbonColor: '#D97706',
  },
  {
    id: 'gift-cobalt',
    title: 'Cobalt Velvet Box',
    boxColor: '#DBEAFE',
    ribbonColor: '#2563EB',
  },
] as const;

export function createInitialGiftProgress(): GiftProgressState {
  return {
    openedIds: [],
    revealedMap: {},
  };
}

export function openGiftBox(
  state: GiftProgressState,
  boxId: string,
): GiftProgressState {
  if (state.revealedMap[boxId]) {
    return state;
  }
  const shell = GIFT_BOX_SHELLS.find((item) => item.id === boxId);
  if (!shell) {
    return state;
  }

  const nextOpened = [...state.openedIds, boxId];
  const isThirdBox = nextOpened.length >= GIFT_BOX_SHELLS.length;
  const reward = isThirdBox
    ? FINALE_REWARD
    : PRANK_REWARDS[nextOpened.length - 1] ?? FINALE_REWARD;

  return {
    openedIds: nextOpened,
    revealedMap: {
      ...state.revealedMap,
      [boxId]: {
        ...shell,
        ...reward,
      },
    },
  };
}
