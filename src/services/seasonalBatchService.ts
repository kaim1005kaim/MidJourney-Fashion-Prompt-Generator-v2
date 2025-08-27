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
      
      // メタデータを追加
      const enhancedPrompt: Prompt = {
        ...prompt,
        metadata: {
          ...prompt.metadata,
          season: selectedSeason,
          genre: settings.genres.join(', '),
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
    includeModels: false
  },
  aw_luxury: {
    seasons: ['autumn-winter'],
    genres: ['luxury', 'tech'],
    count: 10,
    includeColors: true,
    includeLighting: true,
    includeBackground: false,
    includeModels: false
  },
  all_romantic: {
    seasons: ['spring-summer', 'autumn-winter'],
    genres: ['romantic', 'lolita'],
    count: 15,
    includeColors: true,
    includeLighting: true,
    includeBackground: true,
    includeModels: false
  },
  instagram_mix: {
    seasons: ['spring-summer', 'autumn-winter'],
    genres: ['street', 'vintage', 'luxury', 'romantic'],
    count: 20,
    includeColors: true,
    includeLighting: true,
    includeBackground: true,
    includeModels: true
  }
};