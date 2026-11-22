import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BIRTHDAY_PERSON,
  blowAllCandles,
  createInitialCandles,
  createInitialGiftProgress,
  getCandleSummary,
  getDodgeState,
  getNextStage,
  openGiftBox,
  relightAllCandles,
  resolveInitialStage,
  toggleCandleById,
} from './birthdayLogic';

test('personalization preserves Manahil, Mahee, and date 19', () => {
  assert.equal(BIRTHDAY_PERSON.formalName, 'Manahil');
  assert.equal(BIRTHDAY_PERSON.nickname, 'Mahee');
  assert.equal(BIRTHDAY_PERSON.dateNumber, '19');
});

test('resolveInitialStage honors autostart query parameter', () => {
  assert.equal(resolveInitialStage(''), 'AUDIT_GATE');
  assert.equal(resolveInitialStage('?foo=bar'), 'AUDIT_GATE');
  assert.equal(resolveInitialStage('?autostart=1'), 'CELEBRATION');
});

test('prank state machine progresses sequentially through all 4 stages', () => {
  const s1 = getNextStage('AUDIT_GATE');
  const s2 = getNextStage(s1);
  const s3 = getNextStage(s2);
  const s4 = getNextStage(s3);

  assert.equal(s1, 'DODGE_TRAP');
  assert.equal(s2, 'FAKE_ERROR');
  assert.equal(s3, 'CELEBRATION');
  assert.equal(s4, 'CELEBRATION');
});

test('dodge button cycles taunts and surrenders on the 5th dodge', () => {
  const initial = getDodgeState(0);
  assert.equal(initial.taunt, 'No, skip it');
  assert.equal(initial.surrendered, false);

  const third = getDodgeState(2);
  assert.equal(third.taunt, 'Too slow, bestie!');
  assert.notDeepEqual(third.offset, { x: 0, y: 0 });
  assert.equal(third.surrendered, false);

  const fifth = getDodgeState(5);
  assert.equal(fifth.taunt, 'Okay fine, click Yes!');
  assert.equal(fifth.surrendered, true);
});

test('candle toggling, blowing all, and relighting track lit counts accurately', () => {
  const candles = createInitialCandles();
  assert.deepEqual(getCandleSummary(candles), {
    total: 5,
    litCount: 5,
    blownCount: 0,
    allBlown: false,
  });

  const oneBlown = toggleCandleById(candles, 3);
  assert.equal(getCandleSummary(oneBlown).blownCount, 1);
  assert.equal(getCandleSummary(oneBlown).allBlown, false);

  const allOut = blowAllCandles(oneBlown);
  assert.deepEqual(getCandleSummary(allOut), {
    total: 5,
    litCount: 0,
    blownCount: 5,
    allBlown: true,
  });

  const relit = relightAllCandles(allOut);
  assert.equal(getCandleSummary(relit).litCount, 5);
  assert.equal(getCandleSummary(relit).allBlown, false);
});

test('gift box opening always saves the grand finale reward for the 3rd opened box', () => {
  let progress = createInitialGiftProgress();

  // Open in reverse order to prove finale is independent of which box is clicked first
  progress = openGiftBox(progress, 'gift-cobalt');
  assert.equal(progress.revealedMap['gift-cobalt']?.isFinale, false);

  progress = openGiftBox(progress, 'gift-coral');
  assert.equal(progress.revealedMap['gift-coral']?.isFinale, false);

  // Clicking an already-opened box is idempotent
  const duplicate = openGiftBox(progress, 'gift-coral');
  assert.equal(duplicate.openedIds.length, 2);

  // 3rd box reveals the real heartfelt 19th gift
  progress = openGiftBox(progress, 'gift-marigold');
  assert.equal(progress.openedIds.length, 3);
  assert.equal(progress.revealedMap['gift-marigold']?.isFinale, true);
});
