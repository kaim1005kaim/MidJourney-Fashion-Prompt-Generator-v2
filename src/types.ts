// types.ts
export interface RawBrand {
  brand_id: number;
  brand_name: string;
  era_start: string;
  era_end: string;
  core_style: string;
  signature_elements: string;
  materials: string;
  silhouettes: string;
  color_palette: string;
  lighting: string[] | string;
  atmosphere_mood: string[] | string;
  setting_background_detail: string[] | string;
  camera_shot_type: string[] | string;
}

export interface Brand {
  id: number;
  name: string;
  eraStart: string;
  eraEnd: string;
  coreStyle: string[];
  signatureElements: string[];
  materials: string[];
  silhouettes: string[];
  colorPalette: string[];
  lighting: string[];
  atmosphereMood: string[];
  settingBackgroundDetail: string[];
  cameraShotType: string[];
}

export interface Prompt {
  id: number;
  fullPrompt: string;
  createdDate: string;
  rating: number;
  isFavorite: boolean;
  resultNotes?: string;
  resultImagePath?: string;
  brandId?: number;
  brandName?: string;
  material?: string;
  silhouette?: string;
  lighting?: string;
  background?: string;
  era?: string;
  styleElements?: string[];
  atmosphereMood?: string;
  settingBackgroundDetail?: string;
  cameraShotType?: string;
}

export interface PhraseVariationGroup {
  base_term: string;
  variations: string[];
}

export interface PhraseVariations {
  silhouettes: PhraseVariationGroup[];
  materials: PhraseVariationGroup[];
  backgrounds: PhraseVariationGroup[];
  lighting: PhraseVariationGroup[];
  background_styles?: PhraseVariationGroup[] | string[];
  background_color_phrases?: PhraseVariationGroup[] | any[];
  lighting_variations?: PhraseVariationGroup[];
  atmosphere_mood_variations?: PhraseVariationGroup[];
  camera_shot_type_variations?: PhraseVariationGroup[];
  general_silhouette_variations?: PhraseVariationGroup[];
  general_material_variations?: PhraseVariationGroup[];
  sportswear_silhouettes?: PhraseVariationGroup[];
  sportswear_materials?: PhraseVariationGroup[];
}

export interface FilterOptions {
  brands: number[]; // Selected brand IDs
  eras: string[]; // Selected eras like "1920s", "1930s", etc.
  styles: string[]; // Selected style elements
  materials: string[]; // Selected material types
  silhouettes: string[]; // Selected silhouette types
}

export interface AspectRatioOption {
  label: string;
  value: string;
}

export interface StyleOption {
  label: string;
  value: string;
}

export interface VersionOption {
  label: string;
  value: string;
}

export interface AppSettings {
  darkMode: boolean;
  promptCount: number; // Number of prompts to generate at once
  includeAspectRatio: boolean;
  aspectRatio: string; // 選択されたアスペクト比
  includeVersion: boolean;
  version: string; // 選択されたバージョン
  includeStylize: boolean;
  stylize: string; // 選択されたスタイライズ値
  customSuffix: string;
  // 人種と性別設定を追加
  includeEthnicity: boolean;
  ethnicity: string; // '白人' | '黒人' | 'アジア人' | 'ランダム'
  includeGender: boolean;
  gender: string; // '男' | '女' | 'ランダム'
}
