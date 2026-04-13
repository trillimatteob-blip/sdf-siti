export const TIER_LEVELS = { base: 1, pro: 2, elite: 3 };

export const TIERS = [
  {
    id: "base",
    name: "BASE",
    price: 97,
    badge: null,
    featured: false,
    features: [
      "2 video lezioni fondamentali",
      "Pose base e postura",
      "Accesso illimitato",
    ],
  },
  {
    id: "pro",
    name: "PRO",
    price: 197,
    badge: "PIU POPOLARE",
    featured: true,
    features: [
      "Tutto il livello Base +",
      "2 video avanzati",
      "Routine individuale",
      "Transizioni e flow",
    ],
  },
  {
    id: "elite",
    name: "ELITE",
    price: 347,
    badge: null,
    featured: false,
    features: [
      "Tutto il livello Pro +",
      "2 video esclusivi",
      "Feedback video personalizzato",
      "Aggiornamenti futuri inclusi",
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
