// Local image overrides for products that may not have an image_url in Supabase.
// Matches are case-insensitive. More specific entries should come first.
const LOCAL_IMAGE_MAP: { keywords: string[]; src: string }[] = [
  { keywords: ['chicken breast'],            src: '/images/grocery/chickenbreast.jpg' },
  { keywords: ['organic whole milk'],        src: '/images/grocery/organicwholemilk.jpg' },
  { keywords: ['greek yogurt'],              src: '/images/grocery/yogurt.jpg' },
  { keywords: ['yogurt', 'yoghurt'],         src: '/images/grocery/yogurt.jpg' },
  { keywords: ['chopped tomato'],            src: '/images/grocery/choppedtomato.jpg' },
  { keywords: ['garlic'],                    src: '/images/grocery/garlic.png' },
  { keywords: ['onion'],                     src: '/images/grocery/onion.jpg' },
  { keywords: ['garam'],                     src: '/images/grocery/garam.jpg' },
  { keywords: ['ginger paste', 'ginger'],    src: '/images/grocery/gingerpaste.jpg' },
];

/**
 * Returns a resolved image src for a product.
 * Uses the Supabase image_url if present, otherwise falls back to a local file
 * matched against the product name.
 */
export function resolveProductImage(name: string, imageUrl?: string | null): string | null {
  if (imageUrl) return imageUrl;
  const lower = name.toLowerCase();
  for (const entry of LOCAL_IMAGE_MAP) {
    if (entry.keywords.every(k => lower.includes(k))) {
      return entry.src;
    }
  }
  return null;
}
