export const TIER_LEVELS = { base: 1, pro: 2, elite: 3 };

export const TIERS = [
  {
    id: "base",
    name: "BASE",
    priceBase: 97,
    priceLaunch: 47,
    badge: null,
    featured: false,
    features: [
      "AM Posing School: intro + pose",
      "Challenge",
      "Sconto Posing Academy",
    ],
  },
  {
    id: "pro",
    name: "PRO",
    priceBase: 177,
    priceLaunch: 97,
    badge: "PIU POPOLARE",
    featured: true,
    features: [
      "AM Posing School: intro + pose + rilassate",
      "Masterclass (3/6 persone)",
      "Challenge",
      "Sconto Posing Academy",
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    priceBase: 297,
    priceLaunch: 197,
    badge: null,
    featured: false,
    features: [
      "AM Posing School: intro + pose + rilassate + transizioni",
      "1:1 con Andrea",
      "Challenge",
      "Sconto Posing Academy",
    ],
  },
];

export function canAccessTier(userTier, requiredTier) {
  if (!userTier) return false;
  return TIER_LEVELS[userTier] >= TIER_LEVELS[requiredTier];
}

export function getMaxTier(purchases) {
  if (!purchases || purchases.length === 0) return null;
  let max = null;
  let maxLevel = 0;
  for (const p of purchases) {
    const level = TIER_LEVELS[p.tier];
    if (level > maxLevel) {
      maxLevel = level;
      max = p.tier;
    }
  }
  return max;
}

export function getTierLabel(tierId) {
  const tier = TIERS.find((t) => t.id === tierId);
  return tier ? tier.name : tierId?.toUpperCase();
}
