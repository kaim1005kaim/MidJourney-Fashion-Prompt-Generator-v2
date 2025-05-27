// services/dataService.ts
import { Brand, PhraseVariations, RawBrand, AppSettings, Prompt } from '../types';
import { convertBrands, convertPhraseVariations } from '../utils/dataUtils';

// ローカルストレージのキー
const FAVORITES_KEY = 'mjfg_favorites';
const SETTINGS_KEY = 'mjfg_settings';
const HISTORY_KEY = 'mjfg_history';
const LOADED_CHUNKS_KEY = 'mjfg_loaded_chunks';

// デフォルト設定
const DEFAULT_SETTINGS: AppSettings = {
  darkMode: false,
  promptCount: 5,
  includeAspectRatio: true,
  aspectRatio: "--ar 4:5",
  includeVersion: true,
  version: "--v 7.0",
  includeStylize: true,
  stylize: "s100",
  customSuffix: '',
};

// アスペクト比オプション
export const ASPECT_RATIO_OPTIONS = [
  { label: "4:5 (縦長 - Instagram推奨)", value: "--ar 4:5" },
  { label: "16:9 (横長 - 風景向け)", value: "--ar 16:9" },
  { label: "9:16 (スマホ縦向き)", value: "--ar 9:16" },
  { label: "1:1 (正方形)", value: "--ar 1:1" },
  { label: "9:9 (正方形)", value: "--ar 9:9" },
];

// スタイライズオプション
export const STYLIZE_OPTIONS = [
  { label: "s0 (スタイライズなし)", value: "s0" },
  { label: "s100 (軽度スタイライズ - デフォルト)", value: "s100" },
  { label: "s200 (中程度スタイライズ)", value: "s200" },
  { label: "s300 (強めスタイライズ)", value: "s300" },
  { label: "s400 (かなり強めスタイライズ)", value: "s400" },
  { label: "s500 (非常に強めスタイライズ)", value: "s500" },
  { label: "s1000 (最大スタイライズ)", value: "s1000" },
];

// バージョンオプション
export const VERSION_OPTIONS = [
  { label: "v7.0 (最新版)", value: "--v 7.0" },
  { label: "v6.1 (旧バージョン)", value: "--v 6.1" },
];

// バックアップ用の初期ブランドデータ
const initialBrands: Brand[] = [
  {
    id: 1,
    name: "Chanel",
    eraStart: "1910s",
    eraEnd: "present",
    coreStyle: ["Elegant", "Timeless", "Refined", "Parisian"],
    signatureElements: ["Tweed suits", "Quilted bags", "Chain details", "Camellia flowers", "Double C logo"],
    materials: ["Bouclé tweed", "Quilted leather", "Jersey", "Silk chiffon"],
    silhouettes: ["Boxy jackets", "A-line skirts", "Straight-cut dresses", "Slim trousers"],
    colorPalette: ["Black", "White", "Beige", "Navy", "Gold accents"]
  },
  {
    id: 2,
    name: "Dior",
    eraStart: "1940s",
    eraEnd: "present",
    coreStyle: ["Romantic", "Feminine", "Luxurious", "Structured"],
    signatureElements: ["New Look silhouette", "Bar jacket", "Full skirts", "Cannage pattern", "Lady Dior bag"],
    materials: ["Silk taffeta", "Wool gabardine", "Tulle", "Luxurious embroidery"],
    silhouettes: ["Cinched waists", "Full skirts", "Structured shoulders", "Hourglass figures"],
    colorPalette: ["Blush pink", "Light gray", "Navy blue", "Black", "Red"]
  },
  {
    id: 3,
    name: "Comme des Garçons",
    eraStart: "1970s",
    eraEnd: "present",
    coreStyle: ["Avant-garde", "Deconstructive", "Conceptual", "Intellectual"],
    signatureElements: ["Asymmetrical cutting", "Distressed details", "Sculptural forms", "Conceptual presentations"],
    materials: ["Technical textiles", "Wool felt", "Synthetic blends", "Unconventional fabrics"],
    silhouettes: ["Oversized shapes", "Architectural volumes", "Asymmetric cuts", "Body-distorting forms"],
    colorPalette: ["Black", "White", "Navy", "Occasional bright accents"]
  }
];

// データベースのメタデータ
interface DbMetadata {
  totalBrands: number;
  totalChunks: number;
  brandsPerChunk: number;
  lastUpdated: string;
  chunks: {
    id: number;
    filename: string;
    brandCount: number;
    brandIds: number[];
    brandNames: string[];
  }[];
}

// データベースチャンク
interface DbChunk {
  chunk_id: number;
  total_chunks: number;
  brands: RawBrand[];
  phrase_variations: any;
}

// グローバルに保持するデータキャッシュ
let globalBrands: Brand[] = [];
let globalPhraseVariations: PhraseVariations | null = null;
let dbMetadata: DbMetadata | null = null;
let loadedChunks: Set<number> = new Set();

// デバッグ用フラグ - true にすると詳細なログを出力
const DEBUG = false;

/**
 * データベースのメタデータを読み込む
 */
export async function loadDbMetadata(): Promise<DbMetadata> {
  if (dbMetadata) {
    return dbMetadata;
  }
  
  try {
    const response = await fetch('/db-chunks/db-metadata.json');
    if (!response.ok) {
      throw new Error('メタデータの読み込みに失敗しました');
    }
    
    dbMetadata = await response.json();
    return dbMetadata;
  } catch (error) {
    console.error('メタデータの読み込みエラー:', error);
    // デフォルトメタデータ
    return {
      totalBrands: initialBrands.length,
      totalChunks: 1,
      brandsPerChunk: initialBrands.length,
      lastUpdated: new Date().toISOString(),
      chunks: [{
        id: 1,
        filename: 'brands-chunk-1.json',
        brandCount: initialBrands.length,
        brandIds: initialBrands.map(b => b.id),
        brandNames: initialBrands.map(b => b.name)
      }]
    };
  }
}

/**
 * データベースのチャンクを読み込む
 */
export async function loadDbChunk(chunkId: number): Promise<DbChunk | null> {
  try {
    const metadata = await loadDbMetadata();
    const chunk = metadata.chunks.find(c => c.id === chunkId);
    
    if (!chunk) {
      throw new Error(`チャンク ID ${chunkId} が見つかりません`);
    }
    
    const response = await fetch(`/db-chunks/${chunk.filename}`);
    if (!response.ok) {
      throw new Error(`チャンク ${chunkId} の読み込みに失敗しました`);
    }
    
    return await response.json();
  } catch (error) {
    console.error(`チャンク ${chunkId} の読み込みエラー:`, error);
    return null;
  }
}

/**
 * 既に読み込まれたチャンクIDを取得
 */
function getLoadedChunks(): Set<number> {
  if (loadedChunks.size > 0) {
    return loadedChunks;
  }
  
  try {
    const data = localStorage.getItem(LOADED_CHUNKS_KEY);
    if (data) {
      const chunkIds = JSON.parse(data) as number[];
      loadedChunks = new Set(chunkIds);
    }
    return loadedChunks;
  } catch (error) {
    console.error('読み込み済みチャンク情報の取得エラー:', error);
    return new Set<number>();
  }
}

/**
 * 読み込んだチャンクIDを保存
 */
function saveLoadedChunks(): void {
  try {
    localStorage.setItem(LOADED_CHUNKS_KEY, JSON.stringify([...loadedChunks]));
  } catch (error) {
    console.error('読み込み済みチャンク情報の保存エラー:', error);
  }
}

/**
 * 特定のチャンクを読み込んでブランドデータを更新する
 */
export async function loadBrandChunk(chunkId: number): Promise<Brand[]> {
  if (loadedChunks.has(chunkId)) {
    // 既に読み込み済みの場合は現在のブランドデータを返す
    return globalBrands;
  }
  
  const chunk = await loadDbChunk(chunkId);
  if (!chunk) {
    return globalBrands;
  }
  
  // 新しいブランドを変換して追加
  const newBrands = convertBrands(chunk.brands);
  
  if (DEBUG) {
    console.log(`チャンク ${chunkId} からブランドを変換: ${newBrands.length}件`);
  }
  
  // グローバルブランドを更新
  globalBrands = [...globalBrands, ...newBrands];
  
  if (DEBUG) {
    console.log(`現在のブランド総数: ${globalBrands.length}件`);
  }
  
  // フレーズバリエーションがなければ設定
  if (!globalPhraseVariations && chunk.phrase_variations) {
    globalPhraseVariations = convertPhraseVariations(chunk);
    
    if (DEBUG) {
      console.log('フレーズバリエーションを設定:', globalPhraseVariations);
    }
  }
  
  // 読み込んだチャンクを記録
  loadedChunks.add(chunkId);
  saveLoadedChunks();
  
  console.log(`チャンク ${chunkId} を読み込みました。ブランド数: ${newBrands.length}件`);
    
    return globalBrands;
}

/**
 * 最初のチャンクを読み込む
 */
export async function loadInitialData(): Promise<{ brands: Brand[], phraseVariations: PhraseVariations }> {
  try {
    // デバッグログ
    if (DEBUG) {
      console.log('初期データ読み込み開始');
    }
    
    // メタデータを読み込む
    const metadata = await loadDbMetadata();
    
    if (DEBUG) {
      console.log('メタデータを読み込みました:', metadata);
    }
    
    // キャッシュをクリア
    globalBrands = [];
    loadedChunks = getLoadedChunks();
    
    if (DEBUG) {
      console.log('読み込み済みチャンク:', [...loadedChunks]);
    }
    
    // すべてのチャンクを読み込む（修正：最初のチャンクだけでなく全チャンク読み込み）
    const result = await loadAllChunks();
    
    // フレーズバリエーションがなければデフォルト値を設定
    if (!globalPhraseVariations) {
      if (DEBUG) {
        console.log('フレーズバリエーションが見つかりません。デフォルト値を設定します。');
      }
      globalPhraseVariations = {
        silhouettes: [],
        materials: [],
        backgrounds: [],
        lighting: []
      };
    }
    
    if (DEBUG) {
      console.log('初期データ読み込み完了:', {
        brandsCount: globalBrands.length,
        phraseVariations: globalPhraseVariations
      });
    }
    
    return {
      brands: globalBrands,
      phraseVariations: globalPhraseVariations
    };
  } catch (error) {
    console.error('初期データ読み込みエラー:', error);
    
    // エラー時のデータをレガシーデータから読み込む
    try {
      console.log('レガシーデータの読み込みを試みます');
      return await loadLegacyFashionData();
    } catch (legacyError) {
      console.error('レガシーデータの読み込みにも失敗しました:', legacyError);
      
      // エラー時のフォールバックデータ
      return {
        brands: initialBrands,
        phraseVariations: {
          silhouettes: [],
          materials: [],
          backgrounds: [],
          lighting: []
        }
      };
    }
  }
}

/**
 * すべてのチャンクを読み込む
 */
export async function loadAllChunks(): Promise<{ brands: Brand[], phraseVariations: PhraseVariations }> {
  try {
    const metadata = await loadDbMetadata();
    
    // 各チャンクを順番に読み込む
    for (let i = 1; i <= metadata.totalChunks; i++) {
      await loadBrandChunk(i);
    }
    
    return {
      brands: globalBrands,
      phraseVariations: globalPhraseVariations || {
        silhouettes: [],
        materials: [],
        backgrounds: [],
        lighting: []
      }
    };
  } catch (error) {
    console.error('全チャンク読み込みエラー:', error);
    
    return {
      brands: globalBrands.length > 0 ? globalBrands : initialBrands,
      phraseVariations: globalPhraseVariations || {
        silhouettes: [],
        materials: [],
        backgrounds: [],
        lighting: []
      }
    };
  }
}

/**
 * 指定されたブランドIDが含まれるチャンクを読み込む
 */
export async function loadChunkContainingBrand(brandId: number): Promise<Brand | null> {
  try {
    const metadata = await loadDbMetadata();
    
    // ブランドを含むチャンクを探す
    const containingChunk = metadata.chunks.find(chunk => 
      chunk.brandIds.includes(brandId)
    );
    
    if (!containingChunk) {
      console.warn(`ブランドID ${brandId} を含むチャンクが見つかりません`);
      return null;
    }
    
    // 既に読み込み済みかチェック
    if (!loadedChunks.has(containingChunk.id)) {
      await loadBrandChunk(containingChunk.id);
    }
    
    // ブランドを返す
    return globalBrands.find(brand => brand.id === brandId) || null;
  } catch (error) {
    console.error(`ブランドID ${brandId} を含むチャンク読み込みエラー:`, error);
    return null;
  }
}

/**
 * データをリセットする
 */
export function resetDatabase(): void {
  globalBrands = [];
  globalPhraseVariations = null;
  dbMetadata = null;
  loadedChunks.clear();
  localStorage.removeItem(LOADED_CHUNKS_KEY);
}

/**
 * メタデータを含む現在のデータベース状態を取得
 */
export async function getDatabaseStatus(): Promise<{
  totalBrands: number;
  loadedBrands: number;
  totalChunks: number;
  loadedChunks: number[];
  lastUpdated: string;
}> {
  const metadata = await loadDbMetadata();
  const loaded = [...loadedChunks];
  
  return {
    totalBrands: metadata.totalBrands,
    loadedBrands: globalBrands.length,
    totalChunks: metadata.totalChunks,
    loadedChunks: loaded,
    lastUpdated: metadata.lastUpdated
  };
}

/**
 * ブランド名から一致するブランドを検索（必要なチャンクを自動的に読み込む）
 */
export async function searchBrandsByName(query: string): Promise<Brand[]> {
  const normalizedQuery = query.toLowerCase().trim();
  
  // まず現在読み込まれているブランドから検索
  const currentResults = globalBrands.filter(
    brand => brand.name.toLowerCase().includes(normalizedQuery)
  );
  
  // 検索結果が既にある場合はそれを返す
  if (currentResults.length > 0) {
    return currentResults;
  }
  
  // メタデータからブランド名を検索
  const metadata = await loadDbMetadata();
  
  // 検索クエリにマッチする可能性のあるチャンクを探す
  const potentialChunks = metadata.chunks.filter(chunk => 
    chunk.brandNames.some(name => 
      name.toLowerCase().includes(normalizedQuery)
    )
  );
  
  // マッチするチャンクがない場合は空の配列を返す
  if (potentialChunks.length === 0) {
    return [];
  }
  
  // 見つかったチャンクを読み込む
  for (const chunk of potentialChunks) {
    if (!loadedChunks.has(chunk.id)) {
      await loadBrandChunk(chunk.id);
    }
  }
  
  // 再度ブランド検索を実行
  return globalBrands.filter(
    brand => brand.name.toLowerCase().includes(normalizedQuery)
  );
}

/**
 * お気に入りをローカルストレージから読み込む
 */
export function loadFavorites(): Prompt[] {
  try {
    const data = localStorage.getItem(FAVORITES_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('お気に入りの読み込みエラー:', error);
    return [];
  }
}

/**
 * お気に入りをローカルストレージに保存
 */
export function saveFavorites(favorites: Prompt[]): void {
  try {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error('お気に入りの保存エラー:', error);
  }
}

/**
 * プロンプト履歴をローカルストレージから読み込む
 */
export function loadHistory(): Prompt[] {
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('履歴の読み込みエラー:', error);
    return [];
  }
}

/**
 * プロンプト履歴をローカルストレージに保存
 */
export function saveHistory(history: Prompt[]): void {
  try {
    // 最大100件まで保存
    const limitedHistory = history.slice(0, 100);
    localStorage.setItem(HISTORY_KEY, JSON.stringify(limitedHistory));
  } catch (error) {
    console.error('履歴の保存エラー:', error);
  }
}

/**
 * 設定をローカルストレージから読み込む
 */
export function loadSettings(): AppSettings {
  try {
    const data = localStorage.getItem(SETTINGS_KEY);
    return data ? { ...DEFAULT_SETTINGS, ...JSON.parse(data) } : DEFAULT_SETTINGS;
  } catch (error) {
    console.error('設定の読み込みエラー:', error);
    return DEFAULT_SETTINGS;
  }
}

/**
 * 設定をローカルストレージに保存
 */
export function saveSettings(settings: AppSettings): void {
  try {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
  } catch (error) {
    console.error('設定の保存エラー:', error);
  }
}

/**
 * ローカルストレージの全データをクリア
 */
export function clearAllData(): void {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    localStorage.removeItem(HISTORY_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(LOADED_CHUNKS_KEY);
    resetDatabase();
  } catch (error) {
    console.error('データのクリアエラー:', error);
  }
}

/**
 * 旧式のfashion-database.jsonからデータを読み込む（レガシーサポート用）
 */
export async function loadLegacyFashionData(): Promise<{ brands: Brand[], phraseVariations: PhraseVariations }> {
  try {
    // データベースJSONファイルを取得
    const response = await fetch('/fashion-database.json');
    if (!response.ok) {
      throw new Error('レガシーデータベースの読み込みに失敗しました');
    }
    
    // テキストとして読み込む
    const text = await response.text();
    
    // JSONパース
    let data;
    try {
      data = JSON.parse(text);
    } catch (parseError) {
      console.error('JSONのパースに失敗しました:', parseError);
      
      // バックアップデータを返す
      return {
        brands: initialBrands, 
        phraseVariations: {
          silhouettes: [],
          materials: [],
          backgrounds: [],
          lighting: []
        }
      };
    }
    
    // データ変換
    const brands = convertBrands(data.brands as RawBrand[]);
    const phraseVariations = convertPhraseVariations(data);
    
    // グローバルデータを更新
    globalBrands = brands;
    globalPhraseVariations = phraseVariations;
    
    return { brands, phraseVariations };
  } catch (error) {
    console.error('レガシーデータの読み込みエラー:', error);
    
    // エラー時のフォールバックデータ
    return {
      brands: initialBrands,
      phraseVariations: {
        silhouettes: [],
        materials: [],
        backgrounds: [],
        lighting: []
      }
    };
  }
}
