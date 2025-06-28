import React, { useState } from 'react';
import { CreativeSettings } from '../../types';
import { getCreativeData, getCreativeSamples } from '../../services/creativePromptService';

interface CreativeModePanelProps {
  creativeSettings: CreativeSettings;
  onCreativeSettingsChange: (settings: CreativeSettings) => void;
  onGenerate: () => void;
  onClearSettings: () => void;
  isGenerating: boolean;
  darkMode: boolean;
}

const CreativeModePanel: React.FC<CreativeModePanelProps> = ({
  creativeSettings,
  onCreativeSettingsChange,
  onGenerate,
  onClearSettings,
  isGenerating,
  darkMode
}) => {
  const [activeTab, setActiveTab] = useState<'settings' | 'samples'>('settings');
  const [showAdvanced, setShowAdvanced] = useState(false);
  
  const creativeData = getCreativeData();
  const samples = getCreativeSamples();

  const handleParameterChange = (key: keyof CreativeSettings, value: string) => {
    onCreativeSettingsChange({
      ...creativeSettings,
      [key]: value
    });
  };

  const handleRandomizeAll = () => {
    onCreativeSettingsChange({
      ...creativeSettings,
      randomizeAll: !creativeSettings.randomizeAll,
      // randomizeAllがtrueの場合、個別設定をクリア
      ...(creativeSettings.randomizeAll ? {} : {
        artisticTechnique: undefined,
        naturalElement: undefined,
        overlayEffect: undefined,
        colorMood: undefined,
        surrealElement: undefined,
        artistReference: undefined
      })
    });
  };

  const applySample = (samplePrompt: string) => {
    // サンプルから設定を抽出（簡易版）
    onCreativeSettingsChange({
      ...creativeSettings,
      randomizeAll: false
    });
  };

  const renderParameterSelector = (
    label: string,
    key: keyof CreativeSettings,
    options: any[],
    description: string
  ) => (
    <div className="space-y-2">
      <label className={`block text-sm font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
        {label}
      </label>
      <select
        value={creativeSettings[key] || ''}
        onChange={(e) => handleParameterChange(key, e.target.value)}
        disabled={creativeSettings.randomizeAll}
        className={`w-full px-3 py-2 border rounded-md text-sm transition-colors ${
          creativeSettings.randomizeAll ? 'opacity-50 cursor-not-allowed' : ''
        } ${
          darkMode
            ? 'bg-gray-700 border-gray-600 text-white focus:border-blue-500'
            : 'bg-white border-gray-300 text-gray-900 focus:border-blue-500'
        }`}
      >
        <option value="">ランダム選択</option>
        {options.map((option) => (
          <option key={option.id} value={option.keywords[0]}>
            {option.name}
          </option>
        ))}
      </select>
      <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
        {description}
      </p>
    </div>
  );

  return (
    <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎨 Creativeモード
          </h2>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            アーティスティックで実験的なファッションプロンプトを生成
          </p>
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
        {[
          { key: 'settings', label: '設定', icon: '⚙️' },
          { key: 'samples', label: 'サンプル', icon: '🖼️' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === tab.key
                ? 'border-purple-500 text-purple-600 dark:text-purple-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            <span>{tab.icon}</span>
            {tab.label}
          </button>
        ))}
      </div>

      {/* 設定タブ */}
      {activeTab === 'settings' && (
        <div className="space-y-6">
          {/* 全自動モード切り替え */}
          <div className={`p-4 rounded-lg border-2 border-dashed ${
            creativeSettings.randomizeAll 
              ? 'border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-900/20'
              : 'border-gray-300 dark:border-gray-600'
          }`}>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={creativeSettings.randomizeAll || false}
                onChange={handleRandomizeAll}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  🎲 完全ランダム生成
                </span>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  すべてのパラメータをランダムに選択して、予想外のアーティスティックな結果を生成
                </p>
              </div>
            </label>
          </div>

          {/* 詳細設定 */}
          <div className="space-y-4">
            <button
              onClick={() => setShowAdvanced(!showAdvanced)}
              className={`flex items-center gap-2 text-sm font-medium ${
                darkMode ? 'text-gray-300 hover:text-white' : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className={`transform transition-transform ${showAdvanced ? 'rotate-90' : ''}`}>
                ▶
              </span>
              詳細パラメータ設定
            </button>

            {showAdvanced && (
              <div className="space-y-4 pl-6 border-l-2 border-gray-200 dark:border-gray-600">
                {renderParameterSelector(
                  '🎭 アーティスティック技法',
                  'artisticTechnique',
                  creativeData.artisticTechniques,
                  '画像の基本的な表現技法を選択'
                )}

                {renderParameterSelector(
                  '🌿 自然要素',
                  'naturalElement',
                  creativeData.naturalElements,
                  'ファッションと融合する自然要素'
                )}

                {renderParameterSelector(
                  '✨ オーバーレイエフェクト',
                  'overlayEffect',
                  creativeData.overlayEffects,
                  '重ね合わせる視覚効果'
                )}

                {renderParameterSelector(
                  '🎨 カラームード',
                  'colorMood',
                  creativeData.colorMoods,
                  '全体的な色調と雰囲気'
                )}

                {renderParameterSelector(
                  '🔮 シュールな要素',
                  'surrealElement',
                  creativeData.surrealElements,
                  '非現実的で幻想的な表現要素'
                )}

                {renderParameterSelector(
                  '📸 アーティスト参照',
                  'artistReference',
                  creativeData.artistReferences,
                  '参考にするアーティストのスタイル'
                )}
              </div>
            )}
          </div>

          {/* アクションボタン */}
          <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600">
            <button
              onClick={onGenerate}
              disabled={isGenerating}
              className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-3 rounded-md hover:from-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-200 font-medium flex items-center justify-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                  生成中...
                </>
              ) : (
                <>
                  🚀 Creative生成
                </>
              )}
            </button>
            <button
              onClick={onClearSettings}
              className={`px-4 py-3 border rounded-md transition-colors ${
                darkMode
                  ? 'border-gray-600 hover:bg-gray-700 text-gray-300'
                  : 'border-gray-300 hover:bg-gray-50 text-gray-600'
              }`}
            >
              リセット
            </button>
          </div>
        </div>
      )}

      {/* サンプルタブ */}
      {activeTab === 'samples' && (
        <div className="space-y-4">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            参考サンプルをクリックして設定を適用できます
          </p>
          
          <div className="grid gap-4">
            {samples.map((sample, index) => (
              <div
                key={index}
                onClick={() => applySample(sample.prompt)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  darkMode
                    ? 'border-gray-600 hover:border-purple-500 bg-gray-700 hover:bg-gray-650'
                    : 'border-gray-200 hover:border-purple-300 bg-gray-50 hover:bg-purple-50'
                }`}
              >
                <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                  {sample.title}
                </h4>
                <p className={`text-sm mb-3 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {sample.description}
                </p>
                <div className={`text-xs font-mono p-2 rounded ${
                  darkMode ? 'bg-gray-800 text-gray-300' : 'bg-gray-100 text-gray-700'
                }`}>
                  {sample.prompt.length > 100 
                    ? `${sample.prompt.substring(0, 100)}...` 
                    : sample.prompt
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CreativeModePanel;