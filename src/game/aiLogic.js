import { ROWS } from "../data/constants";

export const decideOpponentAction = (gameState) => {
  const opponent = gameState.opponent;
  const player = gameState.player;

  const opponentScore = opponent.score;
  const playerScore = player.score;

  console.log(
    "[AI DEBUG] Hand cards:",
    opponent.hand.map((c) => `${c.name} (${c.instanceId})`)
  );
  console.log("[AI DEBUG] Hand size:", opponent.hand.length);
  console.log(
    "[AI DEBUG] Scores - Opponent:",
    opponentScore,
    "Player:",
    playerScore
  );

  const scoreDiff = opponentScore - playerScore;
  const playerHasPassed = player.hasPassed;
  const opponentHand = opponent.hand;

  if (opponentHand.length === 0) {
    console.log("[AI] No cards left - must pass");
    return { action: "pass" };
  }

  if (playerHasPassed && scoreDiff > 0) {
    console.log(
      `[AI] Player passed, I'm winning ${opponentScore} vs ${playerScore} - PASS`
    );
    return { action: "pass" };
  }

  if (playerHasPassed && scoreDiff === 0) {
    console.log(
      "[AI] Tied and player passed - playing weakest card then will pass"
    );
    const weakestCard = getWeakestCard(opponentHand);
    const targetRow = selectRow(weakestCard);
    return { action: "play_and_pass", card: weakestCard, targetRow };
  }

  if (playerHasPassed && scoreDiff < 0) {
    const totalHandPower = calculateTotalPower(opponentHand);
    const canWin = opponentScore + totalHandPower > playerScore;

    if (!canWin) {
      console.log("[AI] Can't win even with all cards - passing to save cards");
      return { action: "pass" };
    }

    console.log(
      `[AI] Behind by ${Math.abs(
        scoreDiff
      )}, can catch up - playing card and continuing`
    );
    const weakestCard = getWeakestCard(opponentHand);
    const targetRow = selectRow(weakestCard);
    return { action: "play_and_continue", card: weakestCard, targetRow };
  }

  if (scoreDiff >= 15) {
    console.log(`[AI] Winning by ${scoreDiff} - passing to save cards`);
    return { action: "pass" };
  }

  console.log("[AI] Normal play - playing a card");
  const cardToPlay = selectCardToPlay(opponentHand, scoreDiff);
  const targetRow = selectRow(cardToPlay);
  return { action: "play", card: cardToPlay, targetRow };
};

const getWeakestCard = (hand) => {
  const sorted = [...hand].sort((a, b) => (a.power || 0) - (b.power || 0));
  return sorted[0];
};

const getStrongestCard = (hand) => {
  const sorted = [...hand].sort((a, b) => (b.power || 0) - (a.power || 0));
  return sorted[0];
};

const calculateTotalPower = (hand) => {
  return hand.reduce((sum, card) => sum + (card.power || 0), 0);
};

const selectCardToPlay = (hand, scoreDiff) => {
  if (scoreDiff < 0) {
    return getStrongestCard(hand);
  }

  return getWeakestCard(hand);
};

const selectRow = (card) => {
  if (card.row) {
    return card.row;
  }

  const rows = [ROWS.MELEE, ROWS.RANGED, ROWS.SIEGE];
  return rows[Math.floor(Math.random() * rows.length)];
};
