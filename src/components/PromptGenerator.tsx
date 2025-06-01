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
    includeEthnicity: true,
    ethnicity: 'ランダム',
    includeGender: true,
    gender: 'ランダム',
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
  
  // 要素が選択されたときの互換性チェック
  useEffect(() => {
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
  }, [selectedElements]);
  
  // プロンプト生成
  const generatePrompts = async () => {
    setIsGenerating(true);
    
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
      
      setPrompts(prevPrompts => [...newPrompts, ...prevPrompts]);
    } catch (error) {
      console.error('プロンプト生成エラー:', error);
      alert('プロンプトの生成に失敗しました。設定を確認してください。');
    } finally {
      setIsGenerating(false);
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
    const [materialId, silhouetteId, trendId] = combination.elements;
    
    setSelectedElements({
      material: fashionContext.materials.find(m => m.id === materialId) || null,
      silhouette: fashionContext.silhouettes.find(s => s.id === silhouetteId) || null,
      styleTrend: fashionContext.styleTrends.find(t => t.id === trendId) || null
    });
    
    setShowPopularCombinations(false);
  };
  
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
            {/* 統計情報 */}
            <div className={`rounded-lg p-4 mb-6 ${
              settings.darkMode ? 'bg-gray-800' : 'bg-white'
            } shadow-lg`}>
              <div className="grid grid-cols-3 gap-4 text-center">
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
                    {prompts.filter(p => p.rating > 0).length}
                  </div>
                  <div className="text-sm opacity-70">評価済み</div>
                </div>
              </div>
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
