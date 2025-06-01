import React, { useState, useEffect } from 'react';
import { Prompt, AppSettings, FilterOptions, Material, Silhouette, StyleTrend } from '../types';
import { fashionContext } from '../data/initialData';
import { generateElementBasedPrompt, generateMultipleElementBasedPrompts, checkElementCompatibility, getPopularCombinations } from '../services/elementBasedPromptService';
import PromptCard from './PromptCard';
import SettingsPanel from './SettingsPanel';
import ElementSelector from './ElementSelector';
import CompatibilityIndicator from './CompatibilityIndicator';

const PromptGenerator: React.FC = () => {
  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [settings, setSettings] = useState<AppSettings>({
    darkMode: false,
    promptCount: 3,
    includeAspectRatio: true,
    aspectRatio: '--ar 3:4',
    includeVersion: true,
    version: '--v 6.1',
    includeStylize: false,
    stylize: '100',
    customSuffix: '',
    generationMode: 'elements',
    includeSeasonalConsistency: true,
    includeColorHarmony: true,
    creativityLevel: 'balanced'
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
      // 選択された要素がある場合はフィルターに追加
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
      
      const newPrompts = generateMultipleElementBasedPrompts(
        settings,
        settings.promptCount,
        updatedFilters
      );
      
      if (newPrompts.length === 0) {
        throw new Error('プロンプトの生成に失敗しました');
      }
      
      setPrompts(prevPrompts => [...newPrompts, ...prevPrompts]);
    } catch (error) {
      console.error('プロンプト生成エラー:', error);
      setError('プロンプトの生成中にエラーが発生しました。設定を確認して再度お試しください。');
    } finally {
      setIsGenerating(false);
    }
  };
  
  // 一括コピー機能
  const copyAllPrompts = async () => {
    if (prompts.length === 0) {
      setCopySuccess('コピーするプロンプトがありません');
      return;
    }
    
    try {
      // プロンプトテキストのみを結合（番号付き）
      const allPromptsText = prompts
        .map((prompt, index) => `${index + 1}. ${prompt.fullPrompt}`)
        .join('\n\n');
      
      await navigator.clipboard.writeText(allPromptsText);
      setCopySuccess(`${prompts.length}個のプロンプトをコピーしました！`);
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
        .map((prompt, index) => `${index + 1}. ${prompt.fullPrompt}`)
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
        .map((prompt, index) => `${index + 1}. ★${prompt.rating} ${prompt.fullPrompt}`)
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
      <div className="container mx-auto px-4 py-8">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">
            MidJourney Fashion Prompt Generator
            <span className="text-2xl ml-2 text-blue-500">v2.0</span>
          </h1>
          <p className="text-lg opacity-80">
            素材・シルエット・トレンドベースのファッションプロンプト生成ツール
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左サイドバー: 要素選択 */}
          <div className="lg:col-span-1">
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
              
              {/* アクションボタン */}
              <div className="flex gap-2 mt-4">
                <button
                  onClick={generatePrompts}
                  disabled={isGenerating}
                  className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50 transition-colors"
                >
                  {isGenerating ? '生成中...' : 'プロンプト生成'}
                </button>
                <button
                  onClick={clearElements}
                  className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors"
                >
                  クリア
                </button>
              </div>
            </div>
            
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
              <div className="grid grid-cols-3 gap-4 text-center mb-4">
                <div>
                  <div className="text-2xl font-bold text-blue-500">{prompts.length}</div>
                  <div className="text-sm opacity-70">生成済み</div>
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
                <div className="border-t pt-4">
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={copyAllPrompts}
                      className="flex-1 min-w-0 bg-green-500 text-white px-3 py-2 rounded-md hover:bg-green-600 transition-colors text-sm"
                    >
                      📋 全部コピー
                    </button>
                    <button
                      onClick={copyFavoritePrompts}
                      className="flex-1 min-w-0 bg-yellow-500 text-white px-3 py-2 rounded-md hover:bg-yellow-600 transition-colors text-sm"
                      disabled={prompts.filter(p => p.isFavorite).length === 0}
                    >
                      ⭐ お気に入りコピー
                    </button>
                    <button
                      onClick={copyHighRatedPrompts}
                      className="flex-1 min-w-0 bg-purple-500 text-white px-3 py-2 rounded-md hover:bg-purple-600 transition-colors text-sm"
                      disabled={prompts.filter(p => p.rating >= 4).length === 0}
                    >
                      🌟 高評価コピー
                    </button>
                    <button
                      onClick={clearAllPrompts}
                      className="px-3 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm"
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
    </div>
  );
};

export default PromptGenerator;
