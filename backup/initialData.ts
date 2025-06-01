import { Material, Silhouette, StyleTrend, FashionContext } from '../types';

// 素材データベース
export const materials: Material[] = [
  // ニット系
  {
    id: 'knit_cashmere',
    name: 'カシミア',
    category: 'material',
    tags: ['knit', 'luxury', 'soft', 'warm'],
    characteristics: ['luxurious cashmere', 'soft knit texture', 'premium feel'],
    texture: ['soft', 'smooth', 'fine'],
    weight: 'lightweight',
    finish: ['brushed', 'natural'],
    seasonality: ['autumn', 'winter'],
    seasonal: 'winter',
    formality: 'all',
    compatibleWith: ['oversized_silhouette', 'minimalist_trend']
  },
  {
    id: 'knit_wool',
    name: 'ウール',
    category: 'material',
    tags: ['knit', 'warm', 'natural', 'versatile'],
    characteristics: ['chunky wool knit', 'cable knit texture', 'warm wool'],
    texture: ['textured', 'chunky', 'cable-knit'],
    weight: 'medium',
    finish: ['natural', 'brushed'],
    seasonality: ['autumn', 'winter'],
    seasonal: 'winter',
    formality: 'all',
    compatibleWith: ['oversized_silhouette', 'cozy_trend']
  },
  {
    id: 'knit_cotton',
    name: 'コットンニット',
    category: 'material',
    tags: ['knit', 'breathable', 'casual', 'summer'],
    characteristics: ['breathable cotton knit', 'lightweight knit', 'soft cotton'],
    texture: ['smooth', 'breathable', 'soft'],
    weight: 'lightweight',
    finish: ['natural', 'mercerized'],
    seasonality: ['spring', 'summer'],
    seasonal: 'summer',
    formality: 'casual',
    compatibleWith: ['fitted_silhouette', 'minimalist_trend']
  },
  {
    id: 'knit_mohair',
    name: 'モヘア',
    category: 'material',
    tags: ['knit', 'fluffy', 'texture', 'statement'],
    characteristics: ['fluffy mohair', 'fuzzy texture', 'statement knit'],
    texture: ['fuzzy', 'fluffy', 'textured'],
    weight: 'lightweight',
    finish: ['brushed', 'fuzzy'],
    seasonality: ['autumn', 'winter'],
    seasonal: 'winter',
    formality: 'casual',
    compatibleWith: ['oversized_silhouette', 'boho_trend']
  },
  
  // デニム系
  {
    id: 'denim_raw',
    name: 'ローデニム',
    category: 'material',
    tags: ['denim', 'raw', 'sturdy', 'classic'],
    characteristics: ['raw denim', 'indigo selvedge', 'unwashed denim'],
    texture: ['rough', 'sturdy', 'structured'],
    weight: 'heavy',
    finish: ['raw', 'selvedge'],
    seasonality: ['spring', 'summer', 'autumn', 'winter'],
    seasonal: 'all',
    formality: 'casual',
    compatibleWith: ['straight_silhouette', 'vintage_trend']
  },
  {
    id: 'denim_distressed',
    name: 'ダメージデニム',
    category: 'material',
    tags: ['denim', 'distressed', 'edgy', 'street'],
    characteristics: ['distressed denim', 'ripped details', 'faded wash'],
    texture: ['worn', 'distressed', 'faded'],
    weight: 'medium',
    finish: ['stone-washed', 'distressed'],
    seasonality: ['spring', 'summer', 'autumn'],
    seasonal: 'all',
    formality: 'streetwear',
    compatibleWith: ['skinny_silhouette', 'grunge_trend']
  },
  {
    id: 'denim_black',
    name: 'ブラックデニム',
    category: 'material',
    tags: ['denim', 'black', 'sleek', 'modern'],
    characteristics: ['black denim', 'sleek finish', 'dark wash'],
    texture: ['smooth', 'sleek', 'structured'],
    weight: 'medium',
    finish: ['black wash', 'coated'],
    seasonality: ['autumn', 'winter'],
    seasonal: 'all',
    formality: 'business',
    compatibleWith: ['skinny_silhouette', 'modern_trend']
  },
  
  // Tシャツ素材
  {
    id: 'cotton_organic',
    name: 'オーガニックコットン',
    category: 'material',
    tags: ['cotton', 'organic', 'sustainable', 'soft'],
    characteristics: ['organic cotton', 'sustainable fabric', 'soft texture'],
    texture: ['soft', 'natural', 'breathable'],
    weight: 'lightweight',
    finish: ['natural', 'pre-shrunk'],
    seasonality: ['spring', 'summer'],
    seasonal: 'summer',
    formality: 'casual',
    compatibleWith: ['relaxed_silhouette', 'sustainable_trend']
  },
  {
    id: 'cotton_vintage',
    name: 'ヴィンテージコットン',
    category: 'material',
    tags: ['cotton', 'vintage', 'worn', 'retro'],
    characteristics: ['vintage cotton', 'worn-in feel', 'faded texture'],
    texture: ['worn', 'soft', 'faded'],
    weight: 'lightweight',
    finish: ['vintage wash', 'pigment dyed'],
    seasonality: ['spring', 'summer'],
    seasonal: 'all',
    formality: 'casual',
    compatibleWith: ['vintage_silhouette', 'retro_trend']
  },
  
  // 高級素材
  {
    id: 'silk_charmeuse',
    name: 'シルクシャルムーズ',
    category: 'material',
    tags: ['silk', 'luxury', 'lustrous', 'flowing'],
    characteristics: ['lustrous silk', 'flowing charmeuse', 'luxurious drape'],
    texture: ['smooth', 'lustrous', 'flowing'],
    weight: 'lightweight',
    finish: ['lustrous', 'natural'],
    seasonality: ['spring', 'summer'],
    seasonal: 'summer',
    formality: 'formal',
    compatibleWith: ['flowing_silhouette', 'luxury_trend']
  },
  {
    id: 'leather_lambskin',
    name: 'ラムスキンレザー',
    category: 'material',
    tags: ['leather', 'soft', 'luxury', 'supple'],
    characteristics: ['buttery lambskin', 'supple leather', 'luxury finish'],
    texture: ['smooth', 'supple', 'soft'],
    weight: 'medium',
    finish: ['natural', 'aniline'],
    seasonality: ['autumn', 'winter'],
    seasonal: 'winter',
    formality: 'all',
    compatibleWith: ['fitted_silhouette', 'luxury_trend']
  },
  
  // テクニカル素材
  {
    id: 'nylon_ripstop',
    name: 'リップストップナイロン',
    category: 'material',
    tags: ['nylon', 'technical', 'durable', 'modern'],
    characteristics: ['technical nylon', 'ripstop weave', 'water-resistant'],
    texture: ['smooth', 'technical', 'crisp'],
    weight: 'lightweight',
    finish: ['water-resistant', 'technical'],
    seasonality: ['spring', 'summer', 'autumn'],
    seasonal: 'all',
    formality: 'streetwear',
    compatibleWith: ['technical_silhouette', 'techwear_trend']
  }
];

// シルエットデータベース
export const silhouettes: Silhouette[] = [
  // ニット系シルエット
  {
    id: 'oversized_sweater',
    name: 'オーバーサイズセーター',
    category: 'silhouette',
    tags: ['oversized', 'cozy', 'relaxed', 'knit'],
    characteristics: ['oversized knit sweater', 'chunky silhouette', 'relaxed fit'],
    fit: 'oversized',
    length: 'long',
    bodyType: ['all'],
    occasion: ['casual', 'weekend'],
    seasonal: 'winter',
    formality: 'casual',
    compatibleWith: ['knit_wool', 'knit_mohair']
  },
  {
    id: 'fitted_turtleneck',
    name: 'フィットタートルネック',
    category: 'silhouette',
    tags: ['fitted', 'turtleneck', 'sleek', 'minimal'],
    characteristics: ['fitted turtleneck', 'sleek silhouette', 'body-conscious'],
    fit: 'fitted',
    length: 'short',
    bodyType: ['slim', 'athletic'],
    occasion: ['work', 'date'],
    seasonal: 'winter',
    formality: 'business',
    compatibleWith: ['knit_cashmere', 'knit_cotton']
  },
  
  // デニム系シルエット
  {
    id: 'skinny_jeans',
    name: 'スキニージーンズ',
    category: 'silhouette',
    tags: ['skinny', 'fitted', 'modern', 'sleek'],
    characteristics: ['skinny fit jeans', 'tapered leg', 'fitted silhouette'],
    fit: 'fitted',
    length: 'long',
    bodyType: ['slim', 'athletic'],
    occasion: ['casual', 'night out'],
    seasonal: 'all',
    formality: 'casual',
    compatibleWith: ['denim_black', 'denim_distressed']
  },
  {
    id: 'wide_leg_jeans',
    name: 'ワイドレッグジーンズ',
    category: 'silhouette',
    tags: ['wide', 'relaxed', 'retro', 'flowing'],
    characteristics: ['wide leg jeans', 'flowing silhouette', 'relaxed fit'],
    fit: 'relaxed',
    length: 'long',
    bodyType: ['all'],
    occasion: ['casual', 'creative'],
    seasonal: 'all',
    formality: 'casual',
    compatibleWith: ['denim_raw', 'denim_vintage']
  },
  {
    id: 'cropped_jeans',
    name: 'クロップドジーンズ',
    category: 'silhouette',
    tags: ['cropped', 'modern', 'ankle', 'fresh'],
    characteristics: ['cropped length jeans', 'ankle-length', 'modern cut'],
    fit: 'tailored',
    length: 'short',
    bodyType: ['all'],
    occasion: ['casual', 'spring'],
    seasonal: 'spring',
    formality: 'casual',
    compatibleWith: ['denim_raw', 'denim_black']
  },
  
  // Tシャツ系シルエット
  {
    id: 'oversized_tee',
    name: 'オーバーサイズTシャツ',
    category: 'silhouette',
    tags: ['oversized', 'relaxed', 'street', 'comfortable'],
    characteristics: ['oversized t-shirt', 'dropped shoulders', 'relaxed fit'],
    fit: 'oversized',
    length: 'long',
    bodyType: ['all'],
    occasion: ['casual', 'streetwear'],
    seasonal: 'summer',
    formality: 'casual',
    compatibleWith: ['cotton_organic', 'cotton_vintage']
  },
  {
    id: 'fitted_tee',
    name: 'フィットTシャツ',
    category: 'silhouette',
    tags: ['fitted', 'classic', 'versatile', 'clean'],
    characteristics: ['fitted t-shirt', 'classic cut', 'body-hugging'],
    fit: 'fitted',
    length: 'short',
    bodyType: ['slim', 'athletic'],
    occasion: ['casual', 'layering'],
    seasonal: 'summer',
    formality: 'casual',
    compatibleWith: ['cotton_organic', 'cotton_vintage']
  },
  {
    id: 'crop_top',
    name: 'クロップトップ',
    category: 'silhouette',
    tags: ['cropped', 'modern', 'youthful', 'trendy'],
    characteristics: ['crop top', 'midriff-baring', 'short length'],
    fit: 'fitted',
    length: 'mini',
    bodyType: ['slim', 'athletic'],
    occasion: ['casual', 'summer'],
    seasonal: 'summer',
    formality: 'casual',
    compatibleWith: ['cotton_organic', 'technical_fabric']
  },
  
  // ドレス・アウター系
  {
    id: 'a_line_dress',
    name: 'Aラインドレス',
    category: 'silhouette',
    tags: ['a-line', 'feminine', 'classic', 'flattering'],
    characteristics: ['A-line dress', 'fitted bodice', 'flared skirt'],
    fit: 'tailored',
    length: 'midi',
    bodyType: ['all'],
    occasion: ['work', 'date', 'formal'],
    seasonal: 'all',
    formality: 'business',
    compatibleWith: ['silk_charmeuse', 'cotton_blend']
  },
  {
    id: 'slip_dress',
    name: 'スリップドレス',
    category: 'silhouette',
    tags: ['slip', 'minimal', 'flowing', 'elegant'],
    characteristics: ['slip dress', 'flowing silhouette', 'minimalist'],
    fit: 'relaxed',
    length: 'midi',
    bodyType: ['slim', 'curvy'],
    occasion: ['date', 'evening'],
    seasonal: 'summer',
    formality: 'formal',
    compatibleWith: ['silk_charmeuse', 'satin_fabric']
  }
];

// スタイルトレンドデータベース
export const styleTrends: StyleTrend[] = [
  {
    id: 'korean_minimal',
    name: '韓国ミニマル',
    category: 'style_trend',
    tags: ['korean', 'minimal', 'clean', 'modern'],
    characteristics: ['Korean minimal aesthetic', 'clean lines', 'muted tones'],
    era: '2020s',
    culturalOrigin: 'Korea',
    keyElements: ['clean lines', 'neutral colors', 'minimal accessories'],
    colorPalette: ['beige', 'cream', 'soft grey', 'white'],
    attitude: ['effortless', 'sophisticated', 'understated'],
    seasonal: 'all',
    formality: 'all',
    compatibleWith: ['fitted_turtleneck', 'a_line_dress']
  },
  {
    id: 'y2k_revival',
    name: 'Y2Kリバイバル',
    category: 'style_trend',
    tags: ['y2k', 'futuristic', 'metallic', 'nostalgic'],
    characteristics: ['Y2K futuristic style', 'metallic accents', 'tech-inspired'],
    era: '2000s revival',
    culturalOrigin: 'Global',
    keyElements: ['metallic fabrics', 'low-rise cuts', 'tech accessories'],
    colorPalette: ['silver', 'holographic', 'neon blue', 'hot pink'],
    attitude: ['futuristic', 'bold', 'experimental'],
    seasonal: 'all',
    formality: 'streetwear',
    compatibleWith: ['crop_top', 'skinny_jeans']
  },
  {
    id: 'cottagecore',
    name: 'コテージコア',
    category: 'style_trend',
    tags: ['cottagecore', 'pastoral', 'vintage', 'romantic'],
    characteristics: ['cottagecore aesthetic', 'vintage-inspired', 'pastoral vibes'],
    era: '2020s',
    culturalOrigin: 'Rural romanticism',
    keyElements: ['floral prints', 'vintage cuts', 'natural fabrics'],
    colorPalette: ['sage green', 'cream', 'dusty rose', 'lavender'],
    attitude: ['romantic', 'nostalgic', 'peaceful'],
    seasonal: 'spring',
    formality: 'casual',
    compatibleWith: ['a_line_dress', 'oversized_sweater']
  },
  {
    id: 'dark_academia',
    name: 'ダークアカデミア',
    category: 'style_trend',
    tags: ['academic', 'dark', 'vintage', 'intellectual'],
    characteristics: ['dark academia style', 'scholarly aesthetic', 'vintage academia'],
    era: '2020s',
    culturalOrigin: 'Academic institutions',
    keyElements: ['tweed fabrics', 'pleated skirts', 'vintage blazers'],
    colorPalette: ['dark brown', 'burgundy', 'forest green', 'navy'],
    attitude: ['intellectual', 'mysterious', 'scholarly'],
    seasonal: 'autumn',
    formality: 'business',
    compatibleWith: ['fitted_turtleneck', 'a_line_dress']
  },
  {
    id: 'techwear',
    name: 'テックウェア',
    category: 'style_trend',
    tags: ['technical', 'functional', 'futuristic', 'urban'],
    characteristics: ['technical wear', 'functional design', 'urban utility'],
    era: '2010s-2020s',
    culturalOrigin: 'Urban tech culture',
    keyElements: ['technical fabrics', 'utility details', 'modular design'],
    colorPalette: ['black', 'charcoal', 'reflective silver', 'neon accents'],
    attitude: ['functional', 'futuristic', 'urban'],
    seasonal: 'all',
    formality: 'streetwear',
    compatibleWith: ['technical_silhouette', 'nylon_ripstop']
  },
  {
    id: 'indie_sleaze',
    name: 'インディースリーズ',
    category: 'style_trend',
    tags: ['indie', 'grunge', 'effortless', 'edgy'],
    characteristics: ['indie sleaze aesthetic', 'effortlessly cool', 'grunge revival'],
    era: '2000s revival',
    culturalOrigin: 'Indie music scene',
    keyElements: ['distressed denim', 'band tees', 'leather jackets'],
    colorPalette: ['black', 'faded denim', 'vintage band colors'],
    attitude: ['effortless', 'rebellious', 'cool'],
    seasonal: 'all',
    formality: 'streetwear',
    compatibleWith: ['skinny_jeans', 'oversized_tee']
  },
  {
    id: 'maximalist_color',
    name: 'マキシマリストカラー',
    category: 'style_trend',
    tags: ['maximalist', 'colorful', 'bold', 'expressive'],
    characteristics: ['maximalist color blocking', 'bold patterns', 'expressive styling'],
    era: '2020s',
    culturalOrigin: 'Digital fashion culture',
    keyElements: ['color blocking', 'mixed patterns', 'statement pieces'],
    colorPalette: ['bright pink', 'electric blue', 'sunshine yellow', 'emerald green'],
    attitude: ['bold', 'expressive', 'confident'],
    seasonal: 'summer',
    formality: 'casual',
    compatibleWith: ['oversized_tee', 'wide_leg_jeans']
  },
  {
    id: 'sustainable_chic',
    name: 'サステナブルシック',
    category: 'style_trend',
    tags: ['sustainable', 'eco', 'mindful', 'timeless'],
    characteristics: ['sustainable fashion', 'eco-conscious styling', 'timeless pieces'],
    era: '2020s',
    culturalOrigin: 'Environmental movement',
    keyElements: ['natural fabrics', 'timeless cuts', 'minimal styling'],
    colorPalette: ['earth tones', 'natural beige', 'forest green', 'ocean blue'],
    attitude: ['mindful', 'timeless', 'conscious'],
    seasonal: 'all',
    formality: 'all',
    compatibleWith: ['a_line_dress', 'fitted_turtleneck']
  },
  {
    id: 'japanese_street',
    name: 'ジャパニーズストリート',
    category: 'style_trend',
    tags: ['japanese', 'harajuku', 'kawaii', 'colorful'],
    characteristics: ['Japanese street fashion', 'kawaii aesthetic', 'playful mixing'],
    era: '2000s-2020s',
    culturalOrigin: 'Japan',
    keyElements: ['layered pieces', 'kawaii accessories', 'mixed patterns'],
    colorPalette: ['pastel pink', 'baby blue', 'mint green', 'lavender'],
    attitude: ['playful', 'creative', 'expressive'],
    seasonal: 'all',
    formality: 'streetwear',
    compatibleWith: ['oversized_tee', 'crop_top']
  },
  {
    id: 'scandi_minimalism',
    name: 'スカンジミニマリズム',
    category: 'style_trend',
    tags: ['scandinavian', 'minimal', 'functional', 'clean'],
    characteristics: ['Scandinavian minimalism', 'functional beauty', 'clean aesthetics'],
    era: '2010s-2020s',
    culturalOrigin: 'Scandinavia',
    keyElements: ['clean lines', 'functional design', 'neutral palette'],
    colorPalette: ['white', 'grey', 'black', 'natural wood tones'],
    attitude: ['calm', 'functional', 'timeless'],
    seasonal: 'all',
    formality: 'all',
    compatibleWith: ['fitted_turtleneck', 'a_line_dress']
  }
];

// その他のファッション要素
export const colors = [
  'black', 'white', 'grey', 'navy', 'beige', 'cream', 'brown',
  'red', 'burgundy', 'pink', 'hot pink', 'coral',
  'blue', 'sky blue', 'teal', 'turquoise',
  'green', 'forest green', 'sage green', 'mint',
  'yellow', 'mustard', 'gold',
  'purple', 'lavender', 'plum',
  'orange', 'rust', 'terracotta'
];

export const seasons = ['spring', 'summer', 'autumn', 'winter'];

export const occasions = [
  'casual', 'work', 'formal', 'date', 'weekend', 'party',
  'beach', 'travel', 'streetwear', 'evening'
];

export const moods = [
  'minimalist', 'romantic', 'edgy', 'playful', 'sophisticated',
  'relaxed', 'bold', 'elegant', 'cozy', 'fresh'
];

export const lightingStyles = [
  'natural lighting', 'studio lighting', 'golden hour lighting',
  'dramatic lighting', 'soft diffused lighting', 'backlit',
  'window lighting', 'sunset lighting', 'overcast lighting'
];

export const backgrounds = [
  'solid color backdrop', 'gradient background', 'urban street',
  'minimalist interior', 'natural outdoor setting', 'studio backdrop',
  'architectural background', 'textured wall', 'clean background'
];

export const cameraAngles = [
  'full-body shot', 'three-quarter shot', 'portrait shot',
  'wide shot', 'close-up detail', 'overhead shot',
  'side profile', 'back view', 'dynamic angle'
];

// ファッションコンテキストの統合
export const fashionContext: FashionContext = {
  materials,
  silhouettes,
  styleTrends,
  colors,
  seasons,
  occasions,
  moods,
  lightingStyles,
  backgrounds,
  cameraAngles
};

// 初期データ（互換性のため残す）
export const initialBrands = [];

export const phraseVariations = {
  materials: materials.map(m => ({
    base_term: m.name,
    variations: m.characteristics
  })),
  silhouettes: silhouettes.map(s => ({
    base_term: s.name,
    variations: s.characteristics
  })),
  lighting: lightingStyles.map(l => ({
    base_term: l,
    variations: [l]
  })),
  backgrounds: backgrounds.map(b => ({
    base_term: b,
    variations: [b]
  }))
};
