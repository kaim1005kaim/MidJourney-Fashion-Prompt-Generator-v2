// services/promptService.ts
import { Brand, FilterOptions, PhraseVariations, Prompt, AppSettings } from '../types';
import { getRandomElement, getRandomVariation, formatEra, replaceColorPlaceholder } from '../utils/dataUtils';

interface GenerateOptions {
  brands: Brand[];
  phraseVariations: PhraseVariations;
  filters?: FilterOptions;
  settings: AppSettings;
  existingPrompts?: Prompt[]; // 既存のプロンプトリスト（重複チェック用）
}

// 重複チェック用の簡易ハッシュ関数
function getPromptHash(prompt: Prompt): string {
  // ブランド名、素材、シルエット、背景、照明、雰囲気、カメラショットの組み合わせをハッシュとして使用
  return `${prompt.brandName}-${prompt.material}-${prompt.silhouette}-${prompt.background?.substring(0, 20)}-${prompt.lighting}-${prompt.atmosphereMood?.substring(0, 20)}-${prompt.cameraShotType?.substring(0, 20)}`;
}

// プロンプトが既存のプロンプトと重複しているかチェック
function isDuplicatePrompt(prompt: Prompt, existingPrompts: Prompt[] = []): boolean {
  const promptHash = getPromptHash(prompt);
  return existingPrompts.some(existing => getPromptHash(existing) === promptHash);
}

/**
 * フィルター条件に一致するブランドを抽出する（改良版）
 */
function filterBrands(brands: Brand[], filters?: FilterOptions): Brand[] {
  if (!filters) return brands;
  
  return brands.filter(brand => {
    // ブランドIDでフィルタリング
    if (filters.brands?.length > 0 && !filters.brands.includes(brand.id)) {
      return false;
    }
    
    // 時代でフィルタリング（改良版）
    if (filters.eras?.length > 0) {
      let matchesEra = false;
      
      // ブランドの開始年と終了年を取得
      const brandStartYear = parseInt(brand.eraStart.replace(/[^0-9]/g, ''));
      const brandEndYear = brand.eraEnd === 'present' ? 
        new Date().getFullYear() : 
        parseInt(brand.eraEnd.replace(/[^0-9]/g, ''));
      
      for (const filterEra of filters.eras) {
        if (filterEra.endsWith('s')) {
          // 年代フィルター（例：2000s）
          const decadeStart = parseInt(filterEra.replace('s', ''));
          const decadeEnd = decadeStart + 9;
          
          // ブランドの活動期間と年代が重複するかチェック
          if (brandStartYear <= decadeEnd && brandEndYear >= decadeStart) {
            matchesEra = true;
            break;
          }
        } else {
          // 年単位フィルター（例：2010, 2011）
          const year = parseInt(filterEra);
          
          if (!isNaN(year) && year >= brandStartYear && year <= brandEndYear) {
            matchesEra = true;
            break;
          }
        }
      }
      
      if (!matchesEra) {
        return false;
      }
    }
    
    // スタイル要素でフィルタリング
    if (filters.styles?.length > 0) {
      const hasMatchingStyle = brand.coreStyle.some(style => 
        filters.styles!.some(filterStyle => 
          style.toLowerCase().includes(filterStyle.toLowerCase())
        )
      );
      if (!hasMatchingStyle) {
        return false;
      }
    }
    
    return true;
  });
}

/**
 * 単一のプロンプトを生成する（重複チェック対応）
 */
export function generateSinglePrompt(options: GenerateOptions): Prompt {
  const { brands, phraseVariations, filters, settings, existingPrompts = [] } = options;
  
  // 最大試行回数（無限ループ防止）
  const maxAttempts = 10;
  let attempts = 0;
  let prompt: Prompt;
  
  // 重複しないプロンプトを生成するまで試行
  do {
    // フィルタリングされたブランドの中からランダムに選択
    const filteredBrands = filterBrands(brands, filters);
    const brand = filteredBrands.length > 0 
      ? getRandomElement(filteredBrands) 
      : getRandomElement(brands);
    
    // 要素を選択
    const era = formatEra(brand.eraStart);
    const element = getRandomElement(brand.signatureElements);
    const material = getRandomVariation(phraseVariations.materials);
    const silhouette = getRandomVariation(phraseVariations.silhouettes);
    const lighting = getRandomVariation(phraseVariations.lighting);
    
    // 新しい要素の選択
    // ブランドから直接取得するか、バリエーションから取得
    const atmosphereMood = brand.atmosphereMood && brand.atmosphereMood.length > 0 ? 
      getRandomElement(brand.atmosphereMood) : 
      phraseVariations.atmosphere_mood_variations ? 
        getRandomVariation(phraseVariations.atmosphere_mood_variations) : 
        "";
    
    const settingBackgroundDetail = brand.settingBackgroundDetail && brand.settingBackgroundDetail.length > 0 ? 
      getRandomElement(brand.settingBackgroundDetail) : 
      "";
    
    const cameraShotType = brand.cameraShotType && brand.cameraShotType.length > 0 ? 
      getRandomElement(brand.cameraShotType) : 
      phraseVariations.camera_shot_type_variations ? 
        getRandomVariation(phraseVariations.camera_shot_type_variations) : 
        ""; 
    
    // 背景のプレースホルダーを置換 - 安全な実装に改善
    let backgroundTemplate = "";
    let background = "";
    
    try {
      // 背景色フレーズを使用する場合
      if (phraseVariations.background_color_phrases && 
          Array.isArray(phraseVariations.background_color_phrases) && 
          phraseVariations.background_color_phrases.length > 0) {
        
        // templateObjectか通常のバリエーションかを判定
        if (phraseVariations.background_color_phrases[0] && 
            typeof phraseVariations.background_color_phrases[0] === 'object' && 
            'template' in phraseVariations.background_color_phrases[0]) {
            
          // テンプレートオブジェクトの場合
          const templateObject = getRandomElement(phraseVariations.background_color_phrases, 
            { template: "with a clean background", variations: {} });
          backgroundTemplate = templateObject.template || "with a clean background";
          
        } else {
          // 通常のバリエーションの場合
          backgroundTemplate = getRandomVariation(phraseVariations.background_color_phrases);
        }
        
        // ブランドの色とバックグラウンドスタイルを安全に取得
        const primaryColor = brand.colorPalette && brand.colorPalette.length > 0 ? 
          getRandomElement(brand.colorPalette, "neutral tone") : "neutral tone";
          
        const backgroundStyle = phraseVariations.background_styles && 
                                Array.isArray(phraseVariations.background_styles) && 
                                phraseVariations.background_styles.length > 0 ?
          (typeof phraseVariations.background_styles[0] === 'string' ? 
            getRandomElement(phraseVariations.background_styles, "clean background") : 
            getRandomVariation(phraseVariations.background_styles)) : 
          "clean background";
        
        // 安全な置換
        try {
          background = backgroundTemplate
            .replace(/\[primary_color\]/g, primaryColor || "neutral")
            .replace(/\[background_style\]/g, backgroundStyle || "clean background");
        } catch (error) {
          console.error('背景置換エラー:', error);
          background = `with a ${primaryColor} ${backgroundStyle}`;
        }
      } else if (phraseVariations.backgrounds && 
                 Array.isArray(phraseVariations.backgrounds) && 
                 phraseVariations.backgrounds.length > 0) {
        // 従来の方法でバックグラウンドを生成
        backgroundTemplate = getRandomVariation(phraseVariations.backgrounds);
        try {
          background = replaceColorPlaceholder(backgroundTemplate, 
            brand.colorPalette && brand.colorPalette.length > 0 ? brand.colorPalette : ["neutral"]);
        } catch (error) {
          console.error('色プレースホルダー置換エラー:', error);
          background = backgroundTemplate || "with a clean background";
        }
      } else {
        // バックグラウンド関連のデータがない場合はデフォルト値を設定
        background = "with a clean professional background";
      }
    } catch (error) {
      console.error('背景生成エラー:', error);
      background = "with a clean professional background";
    }
    
    // プロンプトの基本部分を構築 - 形式を再度変更
    // 修正: 文頭に年代、次に"A full-body shot of"を配置
    let promptBase = `${era}, A full-body shot of ${brand.name} style, featuring ${element} ${silhouette} made of ${material}`;
    
    // 背景・設定を追加
    if (settingBackgroundDetail) {
      promptBase += `, ${settingBackgroundDetail}`;
    } else if (background) {
      promptBase += `, ${background}`;
    }
    
    // 雰囲気・ムードを追加（あれば）
    if (atmosphereMood) {
      promptBase += `, ${atmosphereMood} mood`;
    }
    
    // ライティング
    promptBase += `, ${lighting}`;
    
    // 基本的な品質設定は削除
    // promptBase += `, professional fashion photography, realistic anatomy, high detail, DSLR, photorealistic`;
    
    // スタイライズ設定をプロンプトから削除し、パラメータとしてのみ使用
    
    // プロンプトの最終形成
    let promptText = promptBase;
    
    // オプション設定をパラメータとして追加
    // アスペクト比を追加
    if (settings.includeAspectRatio) {
      promptText += ` ${settings.aspectRatio}`;
    }
    
    // MidJourneyバージョン設定を追加
    if (settings.includeVersion) {
      promptText += ` ${settings.version}`;
    }
    
    // スタイライズ設定をパラメータとして追加
    if (settings.includeStylize) {
      promptText += ` --stylize ${settings.stylize}`;
    }
    
    // カスタムサフィックスを追加
    if (settings.customSuffix) {
      promptText += ` ${settings.customSuffix}`;
    }
    
    // プロンプトオブジェクトの作成
    const now = new Date();
    prompt = {
      id: now.getTime() + Math.floor(Math.random() * 1000),
      fullPrompt: promptText,
      createdDate: now.toISOString(),
      rating: 0,
      isFavorite: false,
      brandId: brand.id,
      brandName: brand.name,
      material,
      silhouette,
      lighting,
      background,
      era,
      styleElements: [element, ...brand.coreStyle],
      atmosphereMood,
      settingBackgroundDetail,
      cameraShotType
    };
    
    attempts++;
    
    // 既存のプロンプトとの重複をチェック
    if (!isDuplicatePrompt(prompt, existingPrompts)) {
      break; // 重複がなければループを抜ける
    }
    
    // 最大試行回数に達したら重複してもそのまま返す
    if (attempts >= maxAttempts) {
      console.warn(`最大試行回数（${maxAttempts}回）に達したため、重複する可能性のあるプロンプトを使用します。`);
      break;
    }
    
  } while (true);
  
  return prompt;
}

/**
 * 複数のプロンプトを生成する（重複チェック対応）
 */
export function generatePrompts(options: GenerateOptions, count: number = 5): Prompt[] {
  const { existingPrompts = [] } = options;
  const results: Prompt[] = [];
  
  // 指定した数のプロンプトを生成
  for (let i = 0; i < count; i++) {
    // 既に生成したプロンプトも含めて重複チェック
    const prompt = generateSinglePrompt({
      ...options,
      existingPrompts: [...existingPrompts, ...results]
    });
    results.push(prompt);
  }
  
  return results;
}
