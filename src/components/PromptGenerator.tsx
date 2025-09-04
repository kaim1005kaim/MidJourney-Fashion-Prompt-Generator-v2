import React, { useState, useEffect } from 'react';
import { Prompt, AppSettings, FilterOptions, Material, Silhouette, StyleTrend, CreativeSettings, MixedModeSettings, SeasonalBatchSettings } from '../types';
import { fashionContext } from '../data/initialData';
import { generateElementBasedPrompt, generateMultipleElementBasedPrompts, checkElementCompatibility, getPopularCombinations } from '../services/elementBasedPromptService';
import { generateBrandBasedPrompt, generateMultipleBrandBasedPrompts, getAvailableBrands } from '../services/brandBasedPromptService';
import { generateCreativePrompt, generateMultipleCreativePrompts } from '../services/creativePromptService';
import { generateMixedModePrompts, getDefaultMixedSettings } from '../services/mixedModeService';
import { generateSeasonalBatchPrompts } from '../services/seasonalBatchService';
import PromptCard from './PromptCard';
import SettingsPanel from './SettingsPanel';
import ElementSelector from './ElementSelector';
import CompatibilityIndicator from './CompatibilityIndicator';
import CreativeModePanel from './CreativeMode/CreativeModePanel';
import MixedModePanel from './MixedMode/MixedModePanel';
import SeasonalBatchPanel from './SeasonalBatch/SeasonalBatchPanel';
import GenerateButton from './GenerateButton';

const PromptGenerator: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [lastGeneratedPrompts, setLastGeneratedPrompts] = useState<Prompt[]>([]); // 最新生成分を追跡
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
    promptCount: 3,
    includeAspectRatio: true,
    aspectRatio: '--ar 4:5',  // Instagram推奨の縦長
    includeVersion: true,
    version: '--v 6.1',
    includeStylize: false,
    stylize: '100',
    customSuffix: '',
    generationMode: 'elements',
    includeSeasonalConsistency: true,
    includeColorHarmony: true,
    creativityLevel: 'balanced',
    cameraAngle: 'random',
    useColorPalette: false,
    selectedColorPalette: undefined,
    customColors: [],
    // 共通モデル設定
    includeModels: false,
    genderRatio: 'auto',
    customMaleRatio: 50,
    // 追加の表示設定
    includeColors: true,
    includeLighting: true,
    includeBackground: false
  });
  
  const [filters, setFilters] = useState<FilterOptions>({
    brands: [],
    eras: [],
    styles: [],
    materials: [],
    silhouettes: [],
    selectedMaterials: [],
    selectedSilhouettes: [],
    selectedStyleTrends: [],
    seasons: [],
    formality: [],
    moods: []
  });
  
  const [selectedElements, setSelectedElements] = useState({
    material: null as Material | null,
    silhouette: null as Silhouette | null,
    styleTrend: null as StyleTrend | null
  });
  
  const [compatibility, setCompatibility] = useState<{
    compatible: boolean;
    suggestions: string[];
    issues: string[];
  } | null>(null);
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [showPopularCombinations, setShowPopularCombinations] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<string | null>(null);
  
  // Creativeモード用の状態
  const [creativeSettings, setCreativeSettings] = useState<CreativeSettings>({
    randomizeAll: true // デフォルトは完全ランダム
  });
  
  // ミックスモード用の状態
  const [mixedSettings, setMixedSettings] = useState<MixedModeSettings>(getDefaultMixedSettings());
  
  // 季節バッチモード用の状態
  const [seasonalSettings, setSeasonalSettings] = useState<SeasonalBatchSettings>({
    seasons: ['spring-summer'],
    genres: ['street'],
    count: 10
  });
  
  // データ整合性チェック
  useEffect(() => {
    try {
      if (!fashionContext || !fashionContext.materials || fashionContext.materials.length === 0) {
        setError('ファッションデータの読み込みに失敗しました。ページを再読み込みしてください。');
      } else {
        setError(null);
      }
    } catch (err) {
      setError('データ初期化エラーが発生しました。');
    }
  }, []);
  
  // 要素が選択されたときの互換性チェック
  useEffect(() => {
    try {
      if (selectedElements.material && selectedElements.silhouette && selectedElements.styleTrend) {
        const result = checkElementCompatibility(
          selectedElements.material.id,
          selectedElements.silhouette.id,
          selectedElements.styleTrend.id
        );
        setCompatibility(result);
      } else {
        setCompatibility(null);
      }
    } catch (err) {
      console.error('互換性チェックエラー:', err);
      setCompatibility({
        compatible: false,
        suggestions: [],
        issues: ['互換性チェック中にエラーが発生しました']
      });
    }
  }, [selectedElements]);
  
  // コピー成功メッセージの自動非表示
  useEffect(() => {
    if (copySuccess) {
      const timer = setTimeout(() => {
        setCopySuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [copySuccess]);
  
  // プロンプト生成
  const generatePrompts = async () => {
    if (error) {
      alert('データ読み込みエラーのため、プロンプトを生成できません。ページを再読み込みしてください。');
      return;
    }
    
    setIsGenerating(true);
    setError(null);
    
    try {
      let newPrompts: Prompt[];
      
      if (settings.generationMode === 'brand') {
        // ブランドベース生成
        newPrompts = await generateMultipleBrandBasedPrompts(
          settings,
          settings.promptCount,
          filters
        );
      } else if (settings.generationMode === 'creative') {
        // Creativeモード生成
        newPrompts = generateMultipleCreativePrompts(
          settings,
          selectedElements,
          settings.promptCount,
          creativeSettings
        );
      } else if (settings.generationMode === 'mixed') {
        // ミックスモード生成
        newPrompts = await generateMixedModePrompts(
          settings,
          selectedElements,
          filters,
          creativeSettings,
          mixedSettings,
          settings.promptCount
        );
      } else if (settings.generationMode === 'seasonal') {
        // 季節バッチモード生成
        const updatedSeasonalSettings = { ...seasonalSettings, count: settings.promptCount };
        newPrompts = generateSeasonalBatchPrompts(
          updatedSeasonalSettings,
          settings
        );
      } else {
        // 要素ベース生成
        const updatedFilters = { ...filters };
        if (selectedElements.material) {
          updatedFilters.selectedMaterials = [selectedElements.material.id];
        }
        if (selectedElements.silhouette) {
          updatedFilters.selectedSilhouettes = [selectedElements.silhouette.id];
        }
        if (selectedElements.styleTrend) {
          updatedFilters.selectedStyleTrends = [selectedElements.styleTrend.id];
        }
        
        newPrompts = generateMultipleElementBasedPrompts(
          settings,
          settings.promptCount,
          updatedFilters
        );
      }
      
      if (newPrompts.length === 0) {
        throw new Error('プロンプトの生成に失敗しました');
      }
      
      // 最新生成分を記録
      setLastGeneratedPrompts(newPrompts);
      
      setPrompts(prevPrompts => [...newPrompts, ...prevPrompts]);
    } catch (error) {
      console.error('プロンプト生成エラー:', error);
      setError('プロンプトの生成中にエラーが発生しました。設定を確認して再度お試しください。');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 最新生成分をコピー
  const copyLatestPrompts = async () => {
    if (lastGeneratedPrompts.length === 0) {
      setCopySuccess('最新生成されたプロンプトがありません');
      return;
    }
    
    try {
      // 最新生成分のプロンプトテキストのみを結合（番号付き）
      const latestPromptsText = lastGeneratedPrompts
        .map((prompt, index) => `${index + 1}. ${prompt.text || prompt.fullPrompt}`)
        .join('\n\n');
      
      await navigator.clipboard.writeText(latestPromptsText);
      setCopySuccess(`最新生成の${lastGeneratedPrompts.length}個のプロンプトをコピーしました！`);
    } catch (err) {
      console.error('コピーエラー:', err);
      setCopySuccess('コピーに失敗しました');
    }
  };
  
  // 一括コピー機能（全て）
  const copyAllPrompts = async () => {
    if (prompts.length === 0) {
      setCopySuccess('コピーするプロンプトがありません');
      return;
    }
    
    try {
      // プロンプトテキストのみを結合（番号付き）
      const allPromptsText = prompts
        .map((prompt, index) => `${index + 1}. ${prompt.text || prompt.fullPrompt}`)
        .join('\n\n');
      
      await navigator.clipboard.writeText(allPromptsText);
      setCopySuccess(`全${prompts.length}個のプロンプトをコピーしました！`);
    } catch (err) {
      console.error('コピーエラー:', err);
      setCopySuccess('コピーに失敗しました');
    }
  };
  
  // お気に入りのみコピー
  const copyFavoritePrompts = async () => {
    const favoritePrompts = prompts.filter(p => p.isFavorite);
    
    if (favoritePrompts.length === 0) {
      setCopySuccess('お気に入りのプロンプトがありません');
      return;
    }
    
    try {
      const favoritePromptsText = favoritePrompts
        .map((prompt, index) => `${index + 1}. ${prompt.text || prompt.fullPrompt}`)
        .join('\n\n');
      
      await navigator.clipboard.writeText(favoritePromptsText);
      setCopySuccess(`${favoritePrompts.length}個のお気に入りプロンプトをコピーしました！`);
    } catch (err) {
      console.error('コピーエラー:', err);
      setCopySuccess('コピーに失敗しました');
    }
  };
  
  // 高評価のみコピー
  const copyHighRatedPrompts = async () => {
    const highRatedPrompts = prompts.filter(p => p.rating >= 4);
    
    if (highRatedPrompts.length === 0) {
      setCopySuccess('4星以上のプロンプトがありません');
      return;
    }
    
    try {
      const highRatedPromptsText = highRatedPrompts
        .map((prompt, index) => `${index + 1}. ★${prompt.rating} ${prompt.text || prompt.fullPrompt}`)
        .join('\n\n');
      
      await navigator.clipboard.writeText(highRatedPromptsText);
      setCopySuccess(`${highRatedPrompts.length}個の高評価プロンプトをコピーしました！`);
    } catch (err) {
      console.error('コピーエラー:', err);
      setCopySuccess('コピーに失敗しました');
    }
  };
  
  // プロンプトクリア
  const clearAllPrompts = () => {
    if (prompts.length === 0) return;
    
    if (window.confirm(`${prompts.length}個のプロンプトをすべて削除しますか？`)) {
      setPrompts([]);
      setLastGeneratedPrompts([]); // 最新生成分もクリア
      setCopySuccess('すべてのプロンプトを削除しました');
    }
  };
  
  // 要素をクリア
  const clearElements = () => {
    setSelectedElements({
      material: null,
      silhouette: null,
      styleTrend: null
    });
    setCompatibility(null);
  };
  
  // 人気の組み合わせを適用
  const applyPopularCombination = (combination: any) => {
    try {
      const [materialId, silhouetteId, trendId] = combination.elements;
      
      setSelectedElements({
        material: fashionContext.materials.find(m => m.id === materialId) || null,
        silhouette: fashionContext.silhouettes.find(s => s.id === silhouetteId) || null,
        styleTrend: fashionContext.styleTrends.find(t => t.id === trendId) || null
      });
      
      setShowPopularCombinations(false);
    } catch (err) {
      console.error('組み合わせ適用エラー:', err);
      setError('組み合わせの適用中にエラーが発生しました。');
    }
  };
  
  // エラー表示
  if (error) {
    return (
      <div className={`min-h-screen transition-colors ${
        settings.darkMode 
          ? 'bg-gray-900 text-gray-100' 
          : 'bg-gray-50 text-gray-900'
      }`}>
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-6xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
              エラーが発生しました
            </h2>
            <p className="mb-4">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
              ページを再読み込み
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  return (
    <div className={`min-h-screen transition-colors ${
      settings.darkMode 
        ? 'bg-gray-900 text-gray-100' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className="container mx-auto px-4 py-8 pb-32">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            MidJourney Fashion Prompt Generator
            <span className="text-2xl ml-2 text-blue-500">v2.0</span>
          </h1>
          <p className="text-lg opacity-80 mb-6">
            素材・シルエット・トレンドベースのファッションプロンプト生成ツール
          </p>
          
          {/* タブナビゲーション */}
          <div className="flex justify-center mb-4">
            <div className={`flex rounded-lg p-1 ${settings.darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
              <button
                onClick={() => setSettings(prev => ({ ...prev, generationMode: 'elements' }))}
                className={`px-4 py-3 rounded-md font-medium transition-colors ${
                  settings.generationMode === 'elements'
                    ? 'bg-blue-500 text-white shadow-md'
                    : settings.darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                🎨 要素ベース
              </button>
              <button
                onClick={() => setSettings(prev => ({ ...prev, generationMode: 'brand' }))}
                className={`px-4 py-3 rounded-md font-medium transition-colors ${
                  settings.generationMode === 'brand'
                    ? 'bg-purple-500 text-white shadow-md'
                    : settings.darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                👑 ブランドベース
              </button>
              <button
                onClick={() => setSettings(prev => ({ ...prev, generationMode: 'creative' }))}
                className={`px-3 py-3 rounded-md font-medium transition-colors ${
                  settings.generationMode === 'creative'
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                    : settings.darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                🌟 Creative
              </button>
              <button
                onClick={() => setSettings(prev => ({ ...prev, generationMode: 'seasonal' }))}
                className={`px-3 py-3 rounded-md font-medium transition-colors ${
                  settings.generationMode === 'seasonal'
                    ? 'bg-gradient-to-r from-green-500 to-teal-500 text-white shadow-md'
                    : settings.darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                🌍 季節バッチ
              </button>
              <button
                onClick={() => setSettings(prev => ({ ...prev, generationMode: 'mixed' }))}
                className={`px-3 py-3 rounded-md font-medium transition-colors ${
                  settings.generationMode === 'mixed'
                    ? 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-md'
                    : settings.darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                }`}
              >
                🎭 ミックス
              </button>
            </div>
          </div>
          
          {/* モード説明 */}
          <p className="text-sm opacity-70">
            {settings.generationMode === 'elements' 
              ? '素材・シルエット・トレンドを自由に組み合わせてユニークなプロンプトを作成' 
              : settings.generationMode === 'brand'
              ? 'Chanel、Dior、Comme des Garçonsなど43の有名ブランドスタイルでプロンプトを生成'
              : settings.generationMode === 'creative'
              ? 'アーティスティックで実験的なファッションプロンプトを生成。ミクストメディアコラージュとアート技法を活用'
              : settings.generationMode === 'seasonal'
              ? '季節とジャンルを複数選択して、大量のプロンプトを一括生成。SS/AWに適した素材を自動選択'
              : '3つのモード（要素ベース・ブランドベース・Creative）をバランスよく組み合わせて多様なプロンプトを生成'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左サイドバー: 生成モードに応じた設定 */}
          <div className="lg:col-span-1">
            {settings.generationMode === 'elements' ? (
              // 要素ベース生成用UI
              <div className={`rounded-lg p-6 mb-6 ${
                settings.darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">要素選択</h2>
                  <button
                    onClick={() => setShowPopularCombinations(!showPopularCombinations)}
                    className="text-sm px-3 py-1 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
                  >
                    人気の組み合わせ
                  </button>
                </div>
                
                {/* 人気の組み合わせパネル */}
                {showPopularCombinations && (
                  <div className="mb-6 p-4 border rounded-lg">
                    <h3 className="font-medium mb-3">人気の組み合わせ</h3>
                    {getPopularCombinations().map((combo, index) => (
                      <div
                        key={index}
                        className="mb-3 p-3 border rounded cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        onClick={() => applyPopularCombination(combo)}
                      >
                        <div className="font-medium">{combo.name}</div>
                        <div className="text-sm opacity-70">{combo.description}</div>
                        <div className="text-xs mt-1 text-blue-500">人気度: {combo.popularity}%</div>
                      </div>
                    ))}
                  </div>
                )}
                
                {/* 要素セレクター */}
                <ElementSelector
                  selectedElements={selectedElements}
                  onElementChange={setSelectedElements}
                  darkMode={settings.darkMode}
                />
                
                {/* 互換性インジケーター */}
                {compatibility && (
                  <CompatibilityIndicator
                    compatibility={compatibility}
                    darkMode={settings.darkMode}
                  />
                )}
                
                {/* クリアボタンのみ */}
                <div className="flex justify-end mt-4">
                  <button
                    onClick={clearElements}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                  >
                    選択をクリア
                  </button>
                </div>
              </div>
            ) : settings.generationMode === 'brand' ? (
              // ブランドベース生成用UI
              <div className={`rounded-lg p-6 mb-6 ${
                settings.darkMode ? 'bg-gray-800' : 'bg-white'
              } shadow-lg`}>
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">ブランド選択</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {/* ブランド数表示 */}
                    43の有名ファッションブランドから自動選択
                  </div>
                  
                  {/* フィルター設定 */}
                  <div>
                    <label className="block text-sm font-medium mb-2">年代フィルター</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {['1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'].map(era => (
                        <button
                          key={era}
                          onClick={() => {
                            const newEras = filters.eras?.includes(era) 
                              ? filters.eras.filter(e => e !== era)
                              : [...(filters.eras || []), era];
                            setFilters(prev => ({ ...prev, eras: newEras }));
                          }}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            filters.eras?.includes(era)
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {era}
                        </button>
                      ))}
                    </div>
                    {filters.eras && filters.eras.length > 0 && (
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, eras: [] }))}
                        className="text-xs text-blue-500 hover:text-blue-700"
                      >
                        フィルターをクリア
                      </button>
                    )}
                  </div>
                  
                  {/* スタイルフィルター */}
                  <div>
                    <label className="block text-sm font-medium mb-2">スタイルフィルター</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {['Elegant', 'Minimalist', 'Avant-garde', 'Romantic', 'Edgy', 'Classic', 'Modern'].map(style => (
                        <button
                          key={style}
                          onClick={() => {
                            const newStyles = filters.styles?.includes(style) 
                              ? filters.styles.filter(s => s !== style)
                              : [...(filters.styles || []), style];
                            setFilters(prev => ({ ...prev, styles: newStyles }));
                          }}
                          className={`px-2 py-1 text-xs rounded transition-colors ${
                            filters.styles?.includes(style)
                              ? 'bg-green-500 text-white'
                              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                    {filters.styles && filters.styles.length > 0 && (
                      <button
                        onClick={() => setFilters(prev => ({ ...prev, styles: [] }))}
                        className="text-xs text-green-500 hover:text-green-700"
                      >
                        フィルターをクリア
                      </button>
                    )}
                  </div>
                </div>
                
                {/* リセットボタンのみ */}
                <div className="flex justify-end mt-6">
                  <button
                    onClick={() => setFilters({ brands: [], eras: [], styles: [], materials: [], silhouettes: [] })}
                    className="px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                  >
                    選択をリセット
                  </button>
                </div>
              </div>
            ) : settings.generationMode === 'creative' ? (
              // Creativeモード用UI
              <CreativeModePanel
                creativeSettings={creativeSettings}
                onCreativeSettingsChange={setCreativeSettings}
                onGenerate={() => {}}
                onClearSettings={() => setCreativeSettings({ randomizeAll: true })}
                isGenerating={false}
                darkMode={settings.darkMode}
              />
            ) : settings.generationMode === 'seasonal' ? (
              // 季節別バッチモード
              <SeasonalBatchPanel
                appSettings={settings}
                seasonalSettings={seasonalSettings}
                onSeasonalSettingsChange={setSeasonalSettings}
                onGeneratedPrompts={(newPrompts) => {
                  setPrompts(prev => [...newPrompts, ...prev]);
                  setLastGeneratedPrompts(newPrompts);
                }}
                darkMode={settings.darkMode}
              />
            ) : settings.generationMode === 'mixed' ? (
              // ミックスモード用UI
              <MixedModePanel
                mixedSettings={mixedSettings}
                onMixedSettingsChange={setMixedSettings}
                onGenerate={() => {}}
                onClearSettings={() => setMixedSettings(getDefaultMixedSettings())}
                isGenerating={false}
                darkMode={settings.darkMode}
                totalCount={settings.promptCount}
              />
            ) : null}
            
            {/* 設定パネル */}
            <SettingsPanel
              settings={settings}
              onSettingsChange={setSettings}
            />
          </div>
          
          {/* メインコンテンツ: プロンプト表示 */}
          <div className="lg:col-span-2">
            {/* エラー・成功メッセージ表示 */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-lg">
                <div className="flex items-center">
                  <div className="text-red-600 dark:text-red-400 mr-2">⚠️</div>
                  <div className="text-red-800 dark:text-red-200">{error}</div>
                </div>
              </div>
            )}
            
            {copySuccess && (
              <div className="mb-6 p-4 bg-green-100 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg">
                <div className="flex items-center">
                  <div className="text-green-600 dark:text-green-400 mr-2">✅</div>
                  <div className="text-green-800 dark:text-green-200">{copySuccess}</div>
                </div>
              </div>
            )}
            
            {/* 統計情報とアクションボタン */}
            <div className={`rounded-lg p-4 mb-6 ${
              settings.darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-blue-500">{prompts.length}</div>
                  <div className="text-sm opacity-70">全件数</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-500">{lastGeneratedPrompts.length}</div>
                  <div className="text-sm opacity-70">最新生成</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-500">
                    {prompts.filter(p => p.isFavorite).length}
                  </div>
                  <div className="text-sm opacity-70">お気に入り</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-500">
                    {prompts.filter(p => p.rating >= 4).length}
                  </div>
                  <div className="text-sm opacity-70">高評価(4★+)</div>
                </div>
              </div>
              
              {/* 一括操作ボタン */}
              {prompts.length > 0 && (
                <div className="border-t pt-4 space-y-3">
                  {/* コピー操作 */}
                  <div>
                    <div className="text-sm font-medium mb-2 opacity-70">コピー操作</div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      <button
                        onClick={copyLatestPrompts}
                        className="bg-orange-500 text-white px-3 py-2 rounded-md hover:bg-orange-600 transition-colors text-sm font-medium"
                        disabled={lastGeneratedPrompts.length === 0}
                        title="最新に生成されたプロンプトをコピー"
                      >
                        🆕 最新
                      </button>
                      <button
                        onClick={copyAllPrompts}
                        className="bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors text-sm font-medium"
                        title="すべてのプロンプトをコピー"
                      >
                        📋 全部
                      </button>
                      <button
                        onClick={copyFavoritePrompts}
                        className="bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm font-medium"
                        disabled={prompts.filter(p => p.isFavorite).length === 0}
                        title="お気に入りのプロンプトをコピー"
                      >
                        ⭐ お気に入り
                      </button>
                      <button
                        onClick={copyHighRatedPrompts}
                        className="bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 transition-colors text-sm font-medium"
                        disabled={prompts.filter(p => p.rating >= 4).length === 0}
                        title="4つ星以上の高評価プロンプトをコピー"
                      >
                        🌟 高評価
                      </button>
                    </div>
                  </div>
                  
                  {/* 管理操作 */}
                  <div>
                    <div className="text-sm font-medium mb-2 opacity-70">管理操作</div>
                    <button
                      onClick={clearAllPrompts}
                      className="w-full md:w-auto px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium"
                      title="すべてのプロンプトを削除"
                    >
                      🗑️ 全削除
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {/* プロンプト一覧 */}
            <div className="space-y-4">
              {prompts.length === 0 ? (
                <div className={`text-center py-12 rounded-lg ${
                  settings.darkMode ? 'bg-gray-800' : 'bg-white'
                } shadow-lg`}>
                  <div className="text-6xl mb-4">✨</div>
                  <h3 className="text-xl font-semibold mb-2">プロンプトを生成しましょう</h3>
                  <p className="opacity-70 mb-4">
                    左側で要素を選択して「プロンプト生成」ボタンを押してください
                  </p>
                  <div className="text-sm opacity-50">
                    素材、シルエット、スタイルトレンドの組み合わせで<br/>
                    ユニークなファッションプロンプトを作成できます
                  </div>
                </div>
              ) : (
                prompts.map((prompt) => (
                  <PromptCard
                    key={prompt.id}
                    prompt={prompt}
                    onUpdate={(updatedPrompt) => {
                      setPrompts(prevPrompts =>
                        prevPrompts.map(p => p.id === updatedPrompt.id ? updatedPrompt : p)
                      );
                    }}
                    onDelete={(id) => {
                      setPrompts(prevPrompts => prevPrompts.filter(p => p.id !== id));
                    }}
                    darkMode={settings.darkMode}
                  />
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* 統一された生成ボタン */}
      <GenerateButton
        onClick={generatePrompts}
        isGenerating={isGenerating}
        disabled={false}
        promptCount={settings.promptCount}
        mode={settings.generationMode}
      />
    </div>
  );
};

export default PromptGenerator;
