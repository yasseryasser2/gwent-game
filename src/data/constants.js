// Row positions on the board
export const ROWS = {
  MELEE: "melee",
  RANGED: "ranged",
  SIEGE: "siege",
};

// Card categories
export const CARD_TYPES = {
  UNIT: "unit",
  HERO: "hero",
  SPECIAL: "special",
  WEATHER: "weather",
};

// Available factions
export const FACTIONS = {
  NORTHERN_REALMS: "northern_realms",
  // Future: NILFGAARD, MONSTERS, SCOIATAEL
};

// Weather effects
export const WEATHER_TYPES = {
  FROST: "frost",
  FOG: "fog",
  RAIN: "rain",
  CLEAR_WEATHER: "clear",
};

// Game configuration
export const GAME_CONFIG = {
  STARTING_HAND_SIZE: 10,
  ROUNDS_TO_WIN: 2,
  CARDS_PER_DECK: 30,
  MAX_SAME_CARD: 3,
};

// Card abilities (from Witcher 3 Gwent)
export const ABILITIES = {
  // Combat abilities
  SPY: "spy",
  MEDIC: "medic",
  DECOY: "decoy",
  SCORCH: "scorch",
  COMMANDERS_HORN: "horn",

  // Passive abilities
  HERO: "hero",
  MORALE_BOOST: "morale_boost",
  TIGHT_BOND: "tight_bond",
  MUSTER: "muster",
  AGILE: "agile",

  // Weather effects
  BITING_FROST: "biting_frost",
  IMPENETRABLE_FOG: "fog",
  TORRENTIAL_RAIN: "rain",
  CLEAR_SKY: "clear_weather",

  // Special
  SCORCH_CARD: "scorch_card",
  NONE: null,
};

// Row restrictions for weather
export const WEATHER_ROW_EFFECTS = {
  [WEATHER_TYPES.FROST]: ROWS.MELEE,
  [WEATHER_TYPES.FOG]: ROWS.RANGED,
  [WEATHER_TYPES.RAIN]: ROWS.SIEGE,
};

// Special card names
export const SPECIAL_CARDS = {
  DECOY: "decoy",
  COMMANDERS_HORN: "commanders_horn",
  SCORCH: "scorch",
};
