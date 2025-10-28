// services/trendSelectService.ts
import { Prompt, AppSettings, TrendSelectSettings, StyleTrend, Material, Silhouette } from '../types';
import { fashionContext } from '../data/initialData';
import { getRandomElement } from '../utils/dataUtils';

/**
 * 選択されたトレンドからランダムにプロンプトを生成
 */
export function generateTrendSelectPrompts(
  settings: AppSettings,
  trendSelectSettings: TrendSelectSettings,
  count: number
): Prompt[] {
  const prompts: Prompt[] = [];

  // トレンドが選択されていない場合はエラー
  if (!trendSelectSettings.selectedTrends || trendSelectSettings.selectedTrends.length === 0) {
    console.error('トレンドが選択されていません');
    return [];
  }

  // 選択されたトレンドを取得
  const selectedTrends = fashionContext.styleTrends.filter(trend =>
    trendSelectSettings.selectedTrends.includes(trend.id)
  );

  if (selectedTrends.length === 0) {
    console.error('有効なトレンドが見つかりません');
    return [];
  }

  // 指定された数のプロンプトを生成
  for (let i = 0; i < count; i++) {
    try {
      const prompt = generateSingleTrendSelectPrompt(
        settings,
        trendSelectSettings,
        selectedTrends
      );
      prompts.push(prompt);
    } catch (error) {
      console.error('プロンプト生成エラー:', error);
    }
  }

  return prompts;
}

/**
 * 単一のトレンドセレクトプロンプトを生成
 */
function generateSingleTrendSelectPrompt(
  settings: AppSettings,
  trendSelectSettings: TrendSelectSettings,
  selectedTrends: StyleTrend[]
): Prompt {
  // ランダムにトレンドを選択
  const trend = getRandomElement(selectedTrends);

  // 素材の選択
  let material: Material;
  if (trendSelectSettings.randomizeMaterials) {
    // ランダムに素材を選択（トレンドと互換性のあるものを優先）
    const compatibleMaterials = fashionContext.materials.filter(m =>
      trend.materials && trend.materials.some(tm =>
        typeof tm === 'string' && m.id.includes(tm.toLowerCase())
      )
    );
    material = compatibleMaterials.length > 0
      ? getRandomElement(compatibleMaterials)
      : getRandomElement(fashionContext.materials);
  } else {
    // トレンドに関連する素材から選択
    const trendMaterialIds = trend.materials || [];
    const compatibleMaterials = fashionContext.materials.filter(m =>
      trendMaterialIds.some(tm =>
        typeof tm === 'string' && m.id.includes(tm.toLowerCase())
      )
    );
    material = compatibleMaterials.length > 0
      ? getRandomElement(compatibleMaterials)
      : getRandomElement(fashionContext.materials);
  }

  // シルエットの選択
  let silhouette: Silhouette;
  if (trendSelectSettings.randomizeSilhouettes) {
    // 完全ランダム
    silhouette = getRandomElement(fashionContext.silhouettes);
  } else {
    // トレンドに関連するシルエットから選択
    const compatibilityIds = trend.compatibility || [];
    const compatibleSilhouettes = fashionContext.silhouettes.filter(s =>
      compatibilityIds.some(cid =>
        typeof cid === 'string' && s.id.includes(cid.toLowerCase())
      )
    );
    silhouette = compatibleSilhouettes.length > 0
      ? getRandomElement(compatibleSilhouettes)
      : getRandomElement(fashionContext.silhouettes);
  }

  // 色の選択
  const colors = trend.colors && trend.colors.length > 0
    ? getRandomElement(trend.colors)
    : 'neutral tones';

  // 照明の選択
  const lightingOptions = [
    'natural lighting',
    'studio lighting',
    'golden hour lighting',
    'soft diffused lighting',
    'window lighting'
  ];
  const lighting = getRandomElement(lightingOptions);

  // 背景の選択
  const backgroundOptions = [
    'solid color backdrop',
    'minimalist interior',
    'natural outdoor setting',
    'studio backdrop',
    'urban street'
  ];
  const background = getRandomElement(backgroundOptions);

  // カメラアングルの選択
  const cameraAngles = [
    'full-body shot',
    'three-quarter shot',
    'wide shot'
  ];
  const cameraAngle = settings.cameraAngle === 'random'
    ? getRandomElement(cameraAngles)
    : settings.cameraAngle === 'full-body'
    ? 'full-body shot'
    : 'portrait shot';

  // 人物設定の構築
  const ethnicityText = getEthnicityText(settings);
  const genderText = getGenderText(settings);
  const ageRangeText = getAgeRangeText(settings);

  let personDescription = '';
  if (ethnicityText || genderText || ageRangeText) {
    const parts = [ethnicityText, ageRangeText, genderText].filter(Boolean);
    personDescription = parts.length > 0 ? `${parts.join(' ')} ` : '';
  }

  // プロンプトの構築
  let promptText = `A ${cameraAngle} of ${personDescription}wearing ${trend.name} style fashion, `;
  promptText += `${silhouette.name} silhouette made of ${material.name}, `;
  promptText += `${colors} color palette, `;
  promptText += `${background}, `;
  promptText += `${lighting}`;

  // ムードの追加
  if (trend.mood && trend.mood.length > 0) {
    const mood = getRandomElement(trend.mood);
    promptText += `, ${mood} mood`;
  }

  // プロフェッショナルな品質設定
  promptText += ', professional fashion photography, high detail';

  // オプション設定を追加
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
    id: `trend-select-${now.getTime()}-${Math.floor(Math.random() * 10000)}`,
    fullPrompt: promptText,
    text: promptText,
    timestamp: now,
    rating: 0,
    isFavorite: false,
    notes: '',
    material: material.name,
    silhouette: silhouette.name,
    lighting: lighting,
    background: background,
    styleElements: [trend.name],
    atmosphereMood: trend.mood && trend.mood.length > 0 ? getRandomElement(trend.mood) : undefined,
    cameraShotType: cameraAngle,
    mode: 'trend-select',
    selectedMaterial: material,
    selectedSilhouette: silhouette,
    selectedStyleTrend: trend
  };

  return prompt;
}

/**
 * 人種のテキストを取得
 */
function getEthnicityText(settings: AppSettings): string {
  if (!settings.includeEthnicity) return '';

  switch (settings.ethnicity) {
    case '白人':
      return 'Caucasian';
    case '黒人':
      return 'African American';
    case 'アジア人':
      return 'Asian';
    case '日本人':
      return 'Japanese';
    case '韓国人':
      return 'Korean';
    case '中国人':
      return 'Chinese';
    case 'アジア人（ランダム）':
      const asianEthnicities = ['Japanese', 'Korean', 'Chinese'];
      return getRandomElement(asianEthnicities);
    case 'ランダム':
      const ethnicities = ['Caucasian', 'African American', 'Asian', 'Hispanic', 'Middle Eastern'];
      return getRandomElement(ethnicities);
    default:
      return '';
  }
}

/**
 * 性別のテキストを取得
 */
function getGenderText(settings: AppSettings): string {
  if (!settings.includeGender) return '';

  switch (settings.gender) {
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

/**
 * 年齢範囲のテキストを取得
 */
function getAgeRangeText(settings: AppSettings): string {
  if (!settings.includeAgeRange) return '';

  switch (settings.ageRange) {
    case '10代':
      return 'teenage';
    case '20代':
      return 'in her 20s';
    case '10-20代':
      return 'young woman aged 15-25';
    case '30代':
      return 'in her 30s';
    case '40代':
      return 'in her 40s';
    default:
      return '';
  }
}
