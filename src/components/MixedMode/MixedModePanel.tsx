import React, { useState } from 'react';
import { MixedModeSettings } from '../../types';
import { mixedModePresets, validateMixedSettings } from '../../services/mixedModeService';

interface MixedModePanelProps {
  mixedSettings: MixedModeSettings;
  onMixedSettingsChange: (settings: MixedModeSettings) => void;
  onGenerate: () => void;
  onClearSettings: () => void;
  isGenerating: boolean;
  darkMode: boolean;
  totalCount: number;
}

const MixedModePanel: React.FC<MixedModePanelProps> = ({
  mixedSettings,
  onMixedSettingsChange,
  onGenerate,
  onClearSettings,
  isGenerating,
  darkMode,
  totalCount
}) => {
  const [activeTab, setActiveTab] = useState<'presets' | 'custom'>('presets');
  const [showPreview, setShowPreview] = useState(true);
  
  const validation = validateMixedSettings(mixedSettings);

  // プリセット適用
  const applyPreset = (presetKey: keyof typeof mixedModePresets) => {
    onMixedSettingsChange(mixedModePresets[presetKey].settings);
  };

  // カスタム設定更新
  const updateCustomSetting = (key: keyof MixedModeSettings, value: any) => {
    onMixedSettingsChange({
      ...mixedSettings,
      [key]: value
    });
  };

  // プレビュー計算
  const calculatePreview = () => {
    if (mixedSettings.balanceMode === 'equal') {
      const baseCount = Math.floor(totalCount / 3);
      const remainder = totalCount % 3;
      return {
        elements: baseCount + (remainder > 0 ? 1 : 0),
        brand: baseCount + (remainder > 1 ? 1 : 0),
        creative: baseCount
      };
    }
    
    if (mixedSettings.balanceMode === 'random') {
      return {
        elements: '?',
        brand: '?',
        creative: '?'
      };
    }
    
    // カスタム
    const totalRatio = mixedSettings.elementsRatio + mixedSettings.brandRatio + mixedSettings.creativeRatio;
    if (totalRatio === 0) return { elements: 0, brand: 0, creative: 0 };
    
    const elementsCount = Math.round((mixedSettings.elementsRatio / totalRatio) * totalCount);
    const brandCount = Math.round((mixedSettings.brandRatio / totalRatio) * totalCount);
    const creativeCount = totalCount - elementsCount - brandCount;
    
    return {
      elements: Math.max(0, elementsCount),
      brand: Math.max(0, brandCount),
      creative: Math.max(0, creativeCount)
    };
  };

  const preview = calculatePreview();

  return (
    <div className={`rounded-lg p-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      {/* ヘッダー */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎭 ミックスモード
          </h2>
          <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            3つのモードをバランスよく組み合わせて生成
          </p>
        </div>
      </div>

      {/* プレビュー */}
      {showPreview && (
        <div className={`mb-6 p-4 rounded-lg border-2 border-dashed ${
          darkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-300 bg-gray-50'
        }`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              生成プレビュー (合計: {totalCount}個)
            </h3>
            <button
              onClick={() => setShowPreview(!showPreview)}
              className={`text-xs ${darkMode ? 'text-gray-400 hover:text-gray-300' : 'text-gray-500 hover:text-gray-700'}`}
            >
              ✕
            </button>
          </div>
          
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className={`p-3 rounded ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'}`}>
              <div className={`text-lg font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>
                {preview.elements}
              </div>
              <div className={`text-xs ${darkMode ? 'text-blue-400' : 'text-blue-500'}`}>
                🎨 要素ベース
              </div>
            </div>
            <div className={`p-3 rounded ${darkMode ? 'bg-purple-900/30' : 'bg-purple-50'}`}>
              <div className={`text-lg font-bold ${darkMode ? 'text-purple-300' : 'text-purple-600'}`}>
                {preview.brand}
              </div>
              <div className={`text-xs ${darkMode ? 'text-purple-400' : 'text-purple-500'}`}>
                👑 ブランドベース
              </div>
            </div>
            <div className={`p-3 rounded ${darkMode ? 'bg-pink-900/30' : 'bg-pink-50'}`}>
              <div className={`text-lg font-bold ${darkMode ? 'text-pink-300' : 'text-pink-600'}`}>
                {preview.creative}
              </div>
              <div className={`text-xs ${darkMode ? 'text-pink-400' : 'text-pink-500'}`}>
                🌟 Creative
              </div>
            </div>
          </div>
        </div>
      )}

      {/* タブナビゲーション */}
      <div className="flex border-b border-gray-200 dark:border-gray-600 mb-6">
        {[
          { key: 'presets', label: 'プリセット', icon: '🎯' },
          { key: 'custom', label: 'カスタム', icon: '⚙️' }
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

      {/* プリセットタブ */}
      {activeTab === 'presets' && (
        <div className="space-y-4">
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            お好みのバランスプリセットを選択してください
          </p>
          
          <div className="grid gap-3">
            {Object.entries(mixedModePresets).map(([key, preset]) => (
              <div
                key={key}
                onClick={() => applyPreset(key as keyof typeof mixedModePresets)}
                className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                  darkMode
                    ? 'border-gray-600 hover:border-purple-500 bg-gray-700 hover:bg-gray-650'
                    : 'border-gray-200 hover:border-purple-300 bg-gray-50 hover:bg-purple-50'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-800'}`}>
                    {preset.name}
                  </h4>
                  <div className="flex gap-1 text-xs">
                    {preset.settings.balanceMode === 'equal' ? (
                      <span className="px-2 py-1 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300 rounded">
                        均等
                      </span>
                    ) : preset.settings.balanceMode === 'random' ? (
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300 rounded">
                        ランダム
                      </span>
                    ) : (
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
                        カスタム
                      </span>
                    )}
                  </div>
                </div>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {preset.description}
                </p>
                {preset.settings.balanceMode === 'custom' && (
                  <div className="mt-2 flex gap-2 text-xs">
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300 rounded">
                      要素: {preset.settings.elementsRatio}%
                    </span>
                    <span className="px-2 py-1 bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300 rounded">
                      ブランド: {preset.settings.brandRatio}%
                    </span>
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 dark:bg-pink-900 dark:text-pink-300 rounded">
                      Creative: {preset.settings.creativeRatio}%
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* カスタムタブ */}
      {activeTab === 'custom' && (
        <div className="space-y-6">
          {/* バランスモード選択 */}
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
              バランスモード
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { value: 'equal', label: '均等分割', desc: '3つのモードを均等に' },
                { value: 'custom', label: 'カスタム', desc: '比率を自由設定' },
                { value: 'random', label: 'ランダム', desc: '毎回ランダムに分割' }
              ].map(option => (
                <button
                  key={option.value}
                  onClick={() => updateCustomSetting('balanceMode', option.value)}
                  className={`p-3 text-sm border rounded-lg transition-colors ${
                    mixedSettings.balanceMode === option.value
                      ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300'
                      : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'
                  }`}
                >
                  <div className="font-medium">{option.label}</div>
                  <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    {option.desc}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* カスタム比率設定 */}
          {mixedSettings.balanceMode === 'custom' && (
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h4 className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                    モード別比率設定
                  </h4>
                  <div className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    合計: {mixedSettings.elementsRatio + mixedSettings.brandRatio + mixedSettings.creativeRatio}%
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { key: 'elementsRatio', label: '🎨 要素ベース', color: 'blue' },
                    { key: 'brandRatio', label: '👑 ブランドベース', color: 'purple' },
                    { key: 'creativeRatio', label: '🌟 Creative', color: 'pink' }
                  ].map(item => (
                    <div key={item.key}>
                      <div className="flex items-center justify-between mb-1">
                        <label className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          {item.label}
                        </label>
                        <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {mixedSettings[item.key as keyof MixedModeSettings]}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        value={mixedSettings[item.key as keyof MixedModeSettings] as number}
                        onChange={(e) => updateCustomSetting(item.key as keyof MixedModeSettings, parseInt(e.target.value))}
                        className={`w-full h-2 rounded-lg appearance-none cursor-pointer slider-${item.color}`}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* シャッフル設定 */}
          <div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={mixedSettings.shuffleOrder}
                onChange={(e) => updateCustomSetting('shuffleOrder', e.target.checked)}
                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500"
              />
              <div>
                <span className={`font-medium ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
                  🔀 生成順をシャッフル
                </span>
                <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  各モードのプロンプトをランダムな順序で配置
                </p>
              </div>
            </label>
          </div>
        </div>
      )}

      {/* バリデーションエラー表示 */}
      {!validation.isValid && (
        <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-700 rounded-lg">
          <div className={`text-sm text-red-700 dark:text-red-300`}>
            {validation.errors.map((error, index) => (
              <div key={index}>• {error}</div>
            ))}
          </div>
        </div>
      )}

      {/* アクションボタン */}
      <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-600 mt-6">
        <button
          onClick={onGenerate}
          disabled={isGenerating || !validation.isValid}
          className="flex-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-4 py-3 rounded-md hover:from-blue-600 hover:via-purple-600 hover:to-pink-600 disabled:opacity-50 transition-all duration-200 font-medium flex items-center justify-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
              生成中...
            </>
          ) : (
            <>
              🎭 ミックス生成
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
  );
};

export default MixedModePanel;