// services/elementBasedPromptService.ts
import { Material, Silhouette, StyleTrend, FashionContext, Prompt, AppSettings, FilterOptions } from '../types';
import { fashionContext } from '../data/initialData';

// ランダム選択のユーティリティ
function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

// フィルターに基づいて要素を選択
function filterByCompatibility<T extends { compatibleWith?: string[], seasonal?: string, formality?: string }>(
  elements: T[],
  selectedElements: string[] = [],
  season?: string,
  formality?: string
): T[] {
  return elements.filter(element => {
    // 季節フィルター
    if (season && element.seasonal && element.seasonal !== 'all' && element.seasonal !== season) {
      return false;
    }
    
    // フォーマリティフィルター
    if (formality && element.formality && element.formality !== 'all' && element.formality !== formality) {
      return false;
    }
    
    // 互換性フィルター
    if (selectedElements.length > 0 && element.compatibleWith) {
      return selectedElements.some(selected => element.compatibleWith!.includes(selected));
    }
    
    return true;
  });
}

// 人種のテキストを取得する
function getEthnicityText(includeEthnicity: boolean, ethnicity: string): string {
  if (!includeEthnicity) return '';
  
  switch (ethnicity) {
    case '白人':
      return 'Caucasian';
    case '黒人':
      return 'African American';
    case 'アジア人':
      return 'Asian';
    case 'ランダム':
      const ethnicities = ['Caucasian', 'African American', 'Asian', 'Hispanic', 'Middle Eastern'];
      return getRandomElement(ethnicities);
    default:
      return '';
  }
}

// 性別のテキストを取得する
function getGenderText(includeGender: boolean, gender: string): string {
  if (!includeGender) return '';
  
  switch (gender) {
    case '男':
      return 'male';
    case '女':
      return 'female';
    case 'ランダム':
      return Math.random() > 0.5 ? 'male' : 'female';
    default:
      return '';
  }
}

// カラーハーモニーを考慮した色選択
function selectHarmoniousColors(styleTrend: StyleTrend, creativity: 'conservative' | 'balanced' | 'experimental'): string[] {
  const baseColors = styleTrend.colorPalette;
  
  switch (creativity) {
    case 'conservative':
      return baseColors.slice(0, 2); // 基本色のみ使用
    case 'balanced':
      // 基本色 + 類似色
      const additionalColors = fashionContext.colors.filter(color => 
        !baseColors.includes(color) && 
        (color.includes('light') || color.includes('dark') || color.includes('soft'))
      );
      return [...baseColors, ...additionalColors.slice(0, 1)];
    case 'experimental':
      // 大胆な色の組み合わせ
      const contrastColors = fashionContext.colors.filter(color => !baseColors.includes(color));
      return [...baseColors, ...contrastColors.slice(0, 2)];
    default:
      return baseColors;
  }
}

// 季節に適した要素の組み合わせを生成
function generateSeasonalCombination(season: string, creativity: 'conservative' | 'balanced' | 'experimental') {
  const seasonalMaterials = fashionContext.materials.filter(m => 
    m.seasonality.includes(season as any) || m.seasonal === 'all'
  );
  
  const seasonalSilhouettes = fashionContext.silhouettes.filter(s => 
    s.seasonal === season || s.seasonal === 'all'
  );
  
  const seasonalTrends = fashionContext.styleTrends.filter(t => 
    t.seasonal === season || t.seasonal === 'all'
  );
  
  return {
    materials: seasonalMaterials,
    silhouettes: seasonalSilhouettes,
    trends: seasonalTrends
  };
}

// メイン生成関数
export function generateElementBasedPrompt(
  settings: AppSettings,
  filters?: FilterOptions,
  context: FashionContext = fashionContext
): Prompt {
  const { creativityLevel = 'balanced', includeSeasonalConsistency, includeColorHarmony } = settings;
  
  // 現在の季節を取得（設定またはランダム）
  const currentSeason = filters?.seasons?.[0] || getRandomElement(context.seasons);
  
  // 季節に基づいた要素の事前フィルタリング
  let availableMaterials = context.materials;
  let availableSilhouettes = context.silhouettes;
  let availableTrends = context.styleTrends;
  
  if (includeSeasonalConsistency) {
    const seasonal = generateSeasonalCombination(currentSeason, creativityLevel);
    availableMaterials = seasonal.materials;
    availableSilhouettes = seasonal.silhouettes;
    availableTrends = seasonal.trends;
  }
  
  // フィルターの適用
  if (filters?.selectedMaterials?.length) {
    availableMaterials = availableMaterials.filter(m => filters.selectedMaterials!.includes(m.id));
  }
  
  if (filters?.selectedSilhouettes?.length) {
    availableSilhouettes = availableSilhouettes.filter(s => filters.selectedSilhouettes!.includes(s.id));
  }
  
  if (filters?.selectedStyleTrends?.length) {
    availableTrends = availableTrends.filter(t => filters.selectedStyleTrends!.includes(t.id));
  }
  
  // スタイルトレンドを最初に選択（コアとなる要素）
  const selectedTrend = getRandomElement(availableTrends);
  
  // トレンドに基づいて互換性のある素材とシルエットを選択
  const compatibleMaterials = filterByCompatibility(
    availableMaterials,
    [selectedTrend.id],
    currentSeason,
    filters?.formality?.[0]
  );
  
  const compatibleSilhouettes = filterByCompatibility(
    availableSilhouettes,
    [selectedTrend.id],
    currentSeason,
    filters?.formality?.[0]
  );
  
  // 最終的な要素を選択
  const selectedMaterial = compatibleMaterials.length > 0 ? 
    getRandomElement(compatibleMaterials) : 
    getRandomElement(availableMaterials);
    
  const selectedSilhouette = compatibleSilhouettes.length > 0 ? 
    getRandomElement(compatibleSilhouettes) : 
    getRandomElement(availableSilhouettes);
  
  // 色の選択
  const colors = includeColorHarmony ? 
    selectHarmoniousColors(selectedTrend, creativityLevel) : 
    selectedTrend.colorPalette;
  const primaryColor = getRandomElement(colors);
  
  // ライティングとカメラアングルの選択
  const lighting = getRandomElement(context.lightingStyles);
  const cameraAngle = getRandomElement(context.cameraAngles);
  const background = getRandomElement(context.backgrounds);
  const mood = getRandomElement(selectedTrend.attitude);
  
  // 人物情報の生成
  const ethnicityText = getEthnicityText(settings.includeEthnicity, settings.ethnicity);
  const genderText = getGenderText(settings.includeGender, settings.gender);
  
  let personDescription = '';
  if (ethnicityText || genderText) {
    const parts = [ethnicityText, genderText].filter(Boolean);
    personDescription = parts.length > 0 ? `${parts.join(' ')} ` : '';
  }
  
  // プロンプトの構築
  const materialChar = getRandomElement(selectedMaterial.characteristics);
  const silhouetteChar = getRandomElement(selectedSilhouette.characteristics);
  const trendChar = getRandomElement(selectedTrend.characteristics);
  
  // 創造性レベルに基づく詳細度の調整
  let detailLevel = '';
  switch (creativityLevel) {
    case 'conservative':
      detailLevel = 'clean, professional';
      break;
    case 'balanced':
      detailLevel = 'stylish, well-composed';
      break;
    case 'experimental':
      detailLevel = 'artistic, avant-garde, creative styling';
      break;
  }
  
  // プロンプトテキストの組み立て
  let promptText = `${selectedTrend.era} ${cameraAngle} of ${personDescription}model wearing ${trendChar}, `;
  promptText += `${silhouetteChar} in ${materialChar}, `;
  promptText += `${primaryColor} color palette, `;
  promptText += `${mood} mood, `;
  promptText += `${background}, `;
  promptText += `${lighting}, `;
  promptText += `${detailLevel}, fashion photography`;
  
  // オプション設定をパラメータとして追加
  if (settings.includeAspectRatio) {
    promptText += ` ${settings.aspectRatio}`;
  }
  
  if (settings.includeVersion) {
    promptText += ` ${settings.version}`;
  }
  
  if (settings.includeStylize) {
    promptText += ` --stylize ${settings.stylize}`;
  }
  
  if (settings.customSuffix) {
    promptText += ` ${settings.customSuffix}`;
  }
  
  // プロンプトオブジェクトの作成
  const now = new Date();
  const prompt: Prompt = {
    id: now.getTime() + Math.floor(Math.random() * 1000),
    fullPrompt: promptText,
    createdDate: now.toISOString(),
    rating: 0,
    isFavorite: false,
    material: selectedMaterial.name,
    silhouette: selectedSilhouette.name,
    lighting: lighting,
    background: background,
    era: selectedTrend.era,
    styleElements: [trendChar, materialChar, silhouetteChar],
    atmosphereMood: mood,
    generationMode: 'elements',
    selectedMaterial: selectedMaterial,
    selectedSilhouette: selectedSilhouette,
    selectedStyleTrend: selectedTrend
  };
  
  return prompt;
}

// 複数のプロンプトを生成する
export function generateMultipleElementBasedPrompts(
  settings: AppSettings,
  count: number = 5,
  filters?: FilterOptions,
  context: FashionContext = fashionContext
): Prompt[] {
  const prompts: Prompt[] = [];
  
  for (let i = 0; i < count; i++) {
    const prompt = generateElementBasedPrompt(settings, filters, context);
    prompts.push(prompt);
  }
  
  return prompts;
}

// 特定の要素の組み合わせでプロンプト生成
export function generatePromptWithSpecificElements(
  materialId: string,
  silhouetteId: string,
  trendId: string,
  settings: AppSettings,
  context: FashionContext = fashionContext
): Prompt {
  const material = context.materials.find(m => m.id === materialId);
  const silhouette = context.silhouettes.find(s => s.id === silhouetteId);
  const trend = context.styleTrends.find(t => t.id === trendId);
  
  if (!material || !silhouette || !trend) {
    throw new Error('指定された要素が見つかりません');
  }
  
  // 指定された要素を使用してフィルターを作成
  const filters: FilterOptions = {
    brands: [],
    eras: [],
    styles: [],
    materials: [],
    silhouettes: [],
    selectedMaterials: [materialId],
    selectedSilhouettes: [silhouetteId],
    selectedStyleTrends: [trendId]
  };
  
  return generateElementBasedPrompt(settings, filters, context);
}

// 要素の互換性をチェック
export function checkElementCompatibility(
  materialId: string,
  silhouetteId: string,
  trendId: string,
  context: FashionContext = fashionContext
): {
  compatible: boolean;
  suggestions: string[];
  issues: string[];
} {
  const material = context.materials.find(m => m.id === materialId);
  const silhouette = context.silhouettes.find(s => s.id === silhouetteId);
  const trend = context.styleTrends.find(t => t.id === trendId);
  
  if (!material || !silhouette || !trend) {
    return {
      compatible: false,
      suggestions: [],
      issues: ['指定された要素が見つかりません']
    };
  }
  
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // 季節の互換性をチェック
  if (material.seasonal !== 'all' && trend.seasonal !== 'all' && 
      material.seasonal !== trend.seasonal) {
    issues.push(`素材の季節性（${material.seasonal}）とトレンドの季節性（${trend.seasonal}）が合いません`);
  }
  
  // フォーマリティの互換性をチェック
  if (material.formality !== 'all' && silhouette.formality !== 'all' && 
      material.formality !== silhouette.formality) {
    issues.push(`素材のフォーマリティ（${material.formality}）とシルエットのフォーマリティ（${silhouette.formality}）が合いません`);
  }
  
  // 相性の良い組み合わせをチェック
  const hasCompatibility = 
    material.compatibleWith?.includes(silhouetteId) ||
    material.compatibleWith?.includes(trendId) ||
    silhouette.compatibleWith?.includes(materialId) ||
    silhouette.compatibleWith?.includes(trendId) ||
    trend.compatibleWith?.includes(materialId) ||
    trend.compatibleWith?.includes(silhouetteId);
  
  if (!hasCompatibility) {
    suggestions.push('この組み合わせは実験的です。より調和の取れた組み合わせを試してみてください。');
  }
  
  return {
    compatible: issues.length === 0,
    suggestions,
    issues
  };
}

// トレンド分析: 人気の組み合わせを取得
export function getPopularCombinations(context: FashionContext = fashionContext) {
  return [
    {
      name: '韓国ミニマル × カシミア × フィットタートル',
      elements: ['knit_cashmere', 'fitted_turtleneck', 'korean_minimal'],
      description: '洗練されたミニマルスタイル',
      popularity: 95
    },
    {
      name: 'Y2K × クロップトップ × テクニカル素材',
      elements: ['nylon_ripstop', 'crop_top', 'y2k_revival'],
      description: '未来的なストリートスタイル',
      popularity: 87
    },
    {
      name: 'サステナブル × オーガニックコットン × Aライン',
      elements: ['cotton_organic', 'a_line_dress', 'sustainable_chic'],
      description: '環境に優しいエレガンス',
      popularity: 82
    },
    {
      name: 'インディースリーズ × ダメージデニム × スキニー',
      elements: ['denim_distressed', 'skinny_jeans', 'indie_sleaze'],
      description: 'エフォートレスクール',
      popularity: 78
    }
  ];
}
