// src/data/cards.js
import { ROWS, CARD_TYPES, FACTIONS, ABILITIES } from "./constants.js";

export const northernRealmsCards = [
  // ============================================
  // HERO CARDS (15 strength, immune to effects)
  // ============================================
  {
    id: "nr_hero_001",
    name: "Geralt of Rivia",
    power: 15,
    ability: null,
    row: ROWS.MELEE,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero card - immune to special effects",
    count: 1,
  },
  {
    id: "nr_hero_002",
    name: "Cirilla Fiona Elen Riannon",
    power: 15,
    ability: null,
    row: ROWS.MELEE,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero card - immune to special effects",
    count: 1,
  },
  {
    id: "nr_hero_003",
    name: "Yennefer of Vengerberg",
    power: 7,
    ability: ABILITIES.MEDIC,
    row: ROWS.RANGED,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero Medic: Resurrect a card from your discard pile",
    count: 1,
  },
  {
    id: "nr_hero_004",
    name: "Triss Merigold",
    power: 7,
    ability: null,
    row: ROWS.MELEE,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero card - immune to special effects",
    count: 1,
  },
  {
    id: "nr_hero_005",
    name: "Philippa Eilhart",
    power: 10,
    ability: null,
    row: ROWS.RANGED,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero card - immune to special effects",
    count: 1,
  },
  {
    id: "nr_hero_006",
    name: "Vernon Roche",
    power: 10,
    ability: null,
    row: ROWS.MELEE,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero card - immune to special effects",
    count: 1,
  },
  {
    id: "nr_hero_007",
    name: "John Natalis",
    power: 10,
    ability: null,
    row: ROWS.MELEE,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero card - immune to special effects",
    count: 1,
  },
  {
    id: "nr_hero_008",
    name: "Esterad Thyssen",
    power: 10,
    ability: null,
    row: ROWS.MELEE,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero card - immune to special effects",
    count: 1,
  },
  {
    id: "nr_hero_009",
    name: "Keira Metz",
    power: 5,
    ability: null,
    row: ROWS.RANGED,
    hero: true,
    type: CARD_TYPES.HERO,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Hero card - immune to special effects",
    count: 1,
  },

  // ============================================
  // SPY CARDS (Play on opponent's side, draw 2)
  // ============================================
  {
    id: "nr_spy_001",
    name: "Prince Stennis",
    power: 5,
    ability: ABILITIES.SPY,
    row: ROWS.MELEE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Spy: Play on opponent's side, draw 2 cards",
    count: 1,
  },
  {
    id: "nr_spy_002",
    name: "Thaler",
    power: 1,
    ability: ABILITIES.SPY,
    row: ROWS.SIEGE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Spy: Play on opponent's side, draw 2 cards",
    count: 1,
  },
  {
    id: "nr_spy_003",
    name: "Sigismund Dijkstra",
    power: 4,
    ability: ABILITIES.SPY,
    row: ROWS.MELEE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Spy: Play on opponent's side, draw 2 cards",
    count: 1,
  },

  // ============================================
  // MEDIC CARDS (Resurrect from discard)
  // ============================================
  {
    id: "nr_medic_001",
    name: "Dun Banner Medic",
    power: 5,
    ability: ABILITIES.MEDIC,
    row: ROWS.SIEGE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Medic: Resurrect a unit card from your discard pile",
    count: 1,
  },

  // ============================================
  // TIGHT BOND CARDS (Double when paired)
  // ============================================
  {
    id: "nr_bond_001",
    name: "Catapult",
    power: 8,
    ability: ABILITIES.TIGHT_BOND,
    row: ROWS.SIEGE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Tight Bond: Doubles strength for each copy on the board",
    count: 2,
  },
  {
    id: "nr_bond_002",
    name: "Ballista",
    power: 6,
    ability: ABILITIES.TIGHT_BOND,
    row: ROWS.SIEGE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Tight Bond: Doubles strength for each copy on the board",
    count: 1,
  },
  {
    id: "nr_bond_003",
    name: "Trebuchet",
    power: 6,
    ability: ABILITIES.TIGHT_BOND,
    row: ROWS.SIEGE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Tight Bond: Doubles strength for each copy on the board",
    count: 2,
  },

  // ============================================
  // MORALE BOOST CARDS (+1 to all in row)
  // ============================================
  {
    id: "nr_morale_001",
    name: "Siegfried of Denesle",
    power: 5,
    ability: ABILITIES.MORALE_BOOST,
    row: ROWS.MELEE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description:
      "Morale Boost: Adds +1 to all units in the same row (except self)",
    count: 1,
  },
  {
    id: "nr_morale_002",
    name: "Yarpen Zigrin",
    power: 2,
    ability: ABILITIES.MORALE_BOOST,
    row: ROWS.MELEE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description:
      "Morale Boost: Adds +1 to all units in the same row (except self)",
    count: 1,
  },

  // ============================================
  // MUSTER CARDS (Summon all copies from deck)
  // ============================================
  {
    id: "nr_muster_001",
    name: "Blue Stripes Commando",
    power: 4,
    ability: ABILITIES.MUSTER,
    row: ROWS.MELEE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Muster: Summons all copies from deck",
    count: 3,
  },
  {
    id: "nr_muster_002",
    name: "Crinfrid Reavers Dragon Hunter",
    power: 5,
    ability: ABILITIES.MUSTER,
    row: ROWS.RANGED,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Muster: Summons all copies from deck",
    count: 3,
  },
  {
    id: "nr_muster_003",
    name: "Poor Fucking Infantry",
    power: 1,
    ability: ABILITIES.MUSTER,
    row: ROWS.MELEE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Muster: Summons all copies from deck",
    count: 3,
  },

  // ============================================
  // REGULAR UNIT CARDS (No special abilities)
  // ============================================
  {
    id: "nr_unit_001",
    name: "Ves",
    power: 5,
    ability: null,
    row: ROWS.MELEE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Regular unit card",
    count: 1,
  },
  {
    id: "nr_unit_002",
    name: "Redanian Elite",
    power: 3,
    ability: null,
    row: ROWS.MELEE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Regular unit card",
    count: 2,
  },
  {
    id: "nr_unit_003",
    name: "Sabrina Glevissig",
    power: 4,
    ability: null,
    row: ROWS.RANGED,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Regular unit card",
    count: 1,
  },
  {
    id: "nr_unit_004",
    name: "Sheldon Skaggs",
    power: 4,
    ability: null,
    row: ROWS.RANGED,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Regular unit card",
    count: 1,
  },
  {
    id: "nr_unit_005",
    name: "Dethmold",
    power: 6,
    ability: null,
    row: ROWS.RANGED,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Regular unit card",
    count: 1,
  },
  {
    id: "nr_unit_006",
    name: "Kaedweni Siege Expert",
    power: 1,
    ability: ABILITIES.MORALE_BOOST,
    row: ROWS.SIEGE,
    hero: false,
    type: CARD_TYPES.UNIT,
    faction: FACTIONS.NORTHERN_REALMS,
    description:
      "Morale Boost: Adds +1 to all units in the same row (except self)",
    count: 3,
  },

  // ============================================
  // SPECIAL CARDS
  // ============================================
  {
    id: "nr_special_001",
    name: "Decoy",
    power: null,
    ability: ABILITIES.DECOY,
    row: null,
    hero: false,
    type: CARD_TYPES.SPECIAL,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Return a card from your side to your hand",
    count: 3,
  },
  {
    id: "nr_special_002",
    name: "Commander's Horn",
    power: null,
    ability: ABILITIES.COMMANDERS_HORN,
    row: null,
    hero: false,
    type: CARD_TYPES.SPECIAL,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Doubles the strength of all units in a row",
    count: 3,
  },

  // ============================================
  // WEATHER CARDS
  // ============================================
  {
    id: "nr_weather_001",
    name: "Biting Frost",
    power: null,
    ability: ABILITIES.BITING_FROST,
    row: null,
    hero: false,
    type: CARD_TYPES.WEATHER,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Sets all melee combat cards to 1 strength",
    count: 3,
  },
  {
    id: "nr_weather_002",
    name: "Impenetrable Fog",
    power: null,
    ability: ABILITIES.IMPENETRABLE_FOG,
    row: null,
    hero: false,
    type: CARD_TYPES.WEATHER,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Sets all ranged combat cards to 1 strength",
    count: 3,
  },
  {
    id: "nr_weather_003",
    name: "Torrential Rain",
    power: null,
    ability: ABILITIES.TORRENTIAL_RAIN,
    row: null,
    hero: false,
    type: CARD_TYPES.WEATHER,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Sets all siege combat cards to 1 strength",
    count: 2,
  },
  {
    id: "nr_weather_004",
    name: "Clear Weather",
    power: null,
    ability: ABILITIES.CLEAR_SKY,
    row: null,
    hero: false,
    type: CARD_TYPES.WEATHER,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Removes all weather effects from the battlefield",
    count: 2,
  },

  // ============================================
  // SCORCH
  // ============================================
  {
    id: "nr_special_003",
    name: "Scorch",
    power: null,
    ability: ABILITIES.SCORCH_CARD,
    row: null,
    hero: false,
    type: CARD_TYPES.SPECIAL,
    faction: FACTIONS.NORTHERN_REALMS,
    description: "Destroys the strongest card(s) on the battlefield",
    count: 3,
  },
];

// Helper function to get all cards including duplicates
export const getAllCards = () => {
  const allCards = [];
  northernRealmsCards.forEach((card) => {
    for (let i = 0; i < card.count; i++) {
      allCards.push({ ...card, instanceId: `${card.id}_${i}` });
    }
  });
  return allCards;
};

// Total card count
export const TOTAL_UNIQUE_CARDS = northernRealmsCards.length;
export const TOTAL_CARDS_WITH_COPIES = northernRealmsCards.reduce(
  (sum, card) => sum + card.count,
  0
);
