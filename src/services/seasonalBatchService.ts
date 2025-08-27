// 季節別バッチ生成サービス
import { materials, silhouettes, styleTrends } from '../data/initialData';
import { Material, Silhouette, StyleTrend, Prompt } from '../types';
import { generateElementBasedPrompt } from './elementBasedPromptService';
import { AppSettings } from '../types';

export interface SeasonalBatchSettings {
  seasons: string[];  // ['spring-summer', 'autumn-winter']
  genres: string[];   // 複数のスタイルジャンル
  count: number;      // 生成数
  includeColors: boolean;
  includeLighting: boolean;
  includeBackground: boolean;
  includeModels: boolean;
  genderRatio: 'auto' | 'equal' | 'female-only' | 'male-only' | 'custom'; // 男女比設定
  customMaleRatio: number; // カスタム時の男性比率（0-100）
}

// 季節に適した素材を取得
const getSeasonalMaterials = (season: string): Material[] => {
  const seasonMap: Record<string, string[]> = {
    'spring-summer': ['spring', 'summer'],
    'autumn-winter': ['autumn', 'winter'],
    'all-season': ['spring', 'summer', 'autumn', 'winter']
  };
  
  const targetSeasons = seasonMap[season] || [];
  
  return materials.filter(m => 
    m.season && m.season.some(s => targetSeasons.includes(s))
  );
};

// 季節に適したシルエットを取得
const getSeasonalSilhouettes = (season: string): Silhouette[] => {
  const seasonMap: Record<string, string[]> = {
    'spring-summer': ['spring', 'summer'],
    'autumn-winter': ['autumn', 'winter'],
    'all-season': ['spring', 'summer', 'autumn', 'winter']
  };
  
  const targetSeasons = seasonMap[season] || [];
  
  return silhouettes.filter(s => 
    s.seasons && s.seasons.some(season => targetSeasons.includes(season))
  );
};

// ジャンルに基づくスタイルトレンドを取得
const getGenreStyles = (genres: string[]): StyleTrend[] => {
  // ジャンルマッピング
  const genreMap: Record<string, string[]> = {
    'tech': ['techwear', 'tech-minimalism', 'cyberpunk'],
    'lolita': ['sweet-lolita', 'gothic-lolita', 'classic-lolita'],
    'vintage': ['vintage-americana', 'euro-vintage', 'thrift-core'],
    'luxury': ['quiet-luxury', 'old-money', 'stealth-wealth'],
    'street': ['streetwear', 'y2k', 'gorpcore'],
    'romantic': ['cottagecore', 'balletcore', 'coquette'],
    'edgy': ['grunge', 'punk', 'dark-academia'],
    'sustainable': ['sustainable-fashion', 'solarpunk', 'eco-conscious']
  };
  
  const targetStyleIds: string[] = [];
  genres.forEach(genre => {
    const styleIds = genreMap[genre];
    if (styleIds) {
      targetStyleIds.push(...styleIds);
    }
  });
  
  // ジャンル指定がない場合は全スタイルから
  if (targetStyleIds.length === 0) {
    return styleTrends;
  }
  
  return styleTrends.filter(st => targetStyleIds.includes(st.id));
};

// ランダム選択ヘルパー
function getRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return undefined;
  return array[Math.floor(Math.random() * array.length)];
}

// 性別決定ロジック
function determineGender(index: number, settings: SeasonalBatchSettings): 'male' | 'female' {
  switch (settings.genderRatio) {
    case 'male-only':
      return 'male';
    case 'female-only':
      return 'female';
    case 'equal':
      return index % 2 === 0 ? 'male' : 'female';
    case 'custom':
      const maleChance = settings.customMaleRatio / 100;
      return Math.random() < maleChance ? 'male' : 'female';
    case 'auto':
    default:
      // デフォルトは女性寄り（70%女性、30%男性）
      return Math.random() < 0.3 ? 'male' : 'female';
  }
}

// 性別に応じたモデル記述を追加
function addGenderToPrompt(prompt: string, gender: 'male' | 'female'): string {
  // プロンプトに性別指定を追加
  const genderTerm = gender === 'male' ? 'male model' : 'female model';
  
  // 既に性別が指定されている場合は置換、そうでなければ追加
  if (prompt.includes('model') || prompt.includes('person') || prompt.includes('subject')) {
    return prompt.replace(
      /(model|person|subject)/gi,
      `${genderTerm}`
    );
  } else {
    // プロンプトの最初に性別を追加
    return `${genderTerm} wearing ${prompt}`;
  }
}

// バッチプロンプト生成
export const generateSeasonalBatchPrompts = (
  settings: SeasonalBatchSettings,
  appSettings: AppSettings
): Prompt[] => {
  const prompts: Prompt[] = [];
  
  for (let i = 0; i < settings.count; i++) {
    // ランダムに季節を選択
    const selectedSeason = getRandomItem(settings.seasons) || 'all-season';
    
    // 季節に応じた素材とシルエットを取得
    const seasonalMaterials = getSeasonalMaterials(selectedSeason);
    const seasonalSilhouettes = getSeasonalSilhouettes(selectedSeason);
    
    // ジャンルに応じたスタイルを取得
    const genreStyles = getGenreStyles(settings.genres);
    
    // ランダムに選択
    const selectedMaterial = getRandomItem(seasonalMaterials);
    const selectedSilhouette = getRandomItem(seasonalSilhouettes);
    const selectedStyle = getRandomItem(genreStyles);
    
    // 要素が揃っていればプロンプト生成
    if (selectedMaterial || selectedSilhouette || selectedStyle) {
      // 性別を決定
      const gender = determineGender(i, settings);
      
      const prompt = generateElementBasedPrompt(
        {
          material: selectedMaterial,
          silhouette: selectedSilhouette,
          styleTrend: selectedStyle
        },
        {
          ...appSettings,
          includeColors: settings.includeColors,
          includeLighting: settings.includeLighting,
          includeBackground: settings.includeBackground,
          includeModels: settings.includeModels
        }
      );
      
      // 性別をプロンプトに反映（モデルが含まれる場合のみ）
      const genderAwarePrompt = settings.includeModels 
        ? { ...prompt, prompt: addGenderToPrompt(prompt.prompt, gender) }
        : prompt;
      
      // メタデータを追加
      const enhancedPrompt: Prompt = {
        ...genderAwarePrompt,
        metadata: {
          ...genderAwarePrompt.metadata,
          season: selectedSeason,
          genre: settings.genres.join(', '),
          gender: gender,
          batchGenerated: true
        }
      };
      
      prompts.push(enhancedPrompt);
    }
  }
  
  return prompts;
};

// プリセット設定
export const seasonalBatchPresets = {
  ss_casual: {
    seasons: ['spring-summer'],
    genres: ['street', 'vintage'],
    count: 10,
    includeColors: true,
    includeLighting: true,
    includeBackground: false,
    includeModels: false,
    genderRatio: 'equal' as const,
    customMaleRatio: 50
  },
  aw_luxury: {
    seasons: ['autumn-winter'],
    genres: ['luxury', 'tech'],
    count: 10,
    includeColors: true,
    includeLighting: true,
    includeBackground: false,
    includeModels: false,
    genderRatio: 'equal' as const,
    customMaleRatio: 50
  },
  all_romantic: {
    seasons: ['spring-summer', 'autumn-winter'],
    genres: ['romantic', 'lolita'],
    count: 15,
    includeColors: true,
    includeLighting: true,
    includeBackground: true,
    includeModels: false,
    genderRatio: 'auto' as const,
    customMaleRatio: 30
  },
  instagram_mix: {
    seasons: ['spring-summer', 'autumn-winter'],
    genres: ['street', 'vintage', 'luxury', 'romantic'],
    count: 20,
    includeColors: true,
    includeLighting: true,
    includeBackground: true,
    includeModels: true,
    genderRatio: 'equal' as const,
    customMaleRatio: 50
  }
};