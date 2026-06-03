const NICHE_VISUAL_BASE_PATH = "/images/niches";

export const NICHE_VISUAL_SLUGS = new Set([
    "adtech",
    "igaming",
    "travel",
    "finance",
    "crypto-web3",
    "saas",
    "ecommerce",
    "digital-marketing",
    "legal",
    "mobile-apps",
    "healthcare",
    "wellness",
    "education",
    "online-courses",
    "real-estate",
    "logistics",
    "hr-recruitment",
    "insurance",
    "cybersecurity",
    "ai",
    "gaming",
    "entertainment",
    "food-restaurants",
    "hospitality",
    "retail",
    "automotive",
    "science",
    "sustainability",
    "fintech"
]);

export function getNicheVisualSrc(slug) {
    const normalizedSlug = String(slug || "").trim().toLowerCase();
    if (!NICHE_VISUAL_SLUGS.has(normalizedSlug)) return `${NICHE_VISUAL_BASE_PATH}/fallback.svg`;
    return `${NICHE_VISUAL_BASE_PATH}/${normalizedSlug}.svg`;
}
