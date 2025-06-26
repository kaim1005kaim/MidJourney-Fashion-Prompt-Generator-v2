// components/SettingsPanel.tsx
import React, { useState } from 'react';
import { Settings, ChevronDown, ChevronUp, Moon, Sun, Database, Palette } from 'lucide-react';
import { AppSettings } from '../types';
import { ASPECT_RATIO_OPTIONS, STYLIZE_OPTIONS, VERSION_OPTIONS } from '../services/dataService';
import { DatabaseManager } from './database';
import ColorPaletteSelector from './ColorPaletteSelector';

interface SettingsPanelProps {
  settings: AppSettings;
  onSettingsChange: (settings: AppSettings) => void;
  onDatabaseUpdate?: () => void;
}

export default function SettingsPanel({ settings, onSettingsChange, onDatabaseUpdate }: SettingsPanelProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isDbManagerOpen, setIsDbManagerOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({
    generation: true,
    colors: false,
    camera: false,
    options: false
  });
  
  const handleSettingChange = <K extends keyof AppSettings>(
    key: K, 
    value: AppSettings[K]
  ) => {
    onSettingsChange({
      ...settings,
      [key]: value
    });
  };

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 mb-6">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Settings className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <h3 className="font-medium text-gray-800 dark:text-white">設定</h3>
        </div>
        
        <div className="flex items-center gap-3">
          {/* データベース管理ボタン */}
          <button
            onClick={() => setIsDbManagerOpen(!isDbManagerOpen)}
            className="text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400 transition-colors"
            title="データベース管理"
          >
            <Database className="w-5 h-5" />
          </button>
          
          {/* ダークモード切替 */}
          <button
            onClick={() => handleSettingChange('darkMode', !settings.darkMode)}
            className="text-gray-600 dark:text-gray-300 hover:text-amber-500 dark:hover:text-amber-400 transition-colors"
            title={settings.darkMode ? "ライトモードに切り替え" : "ダークモードに切り替え"}
          >
            {settings.darkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </button>
          
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>
      
      {/* データベース管理パネル */}
      {isDbManagerOpen && (
        <div className="mt-4">
          <DatabaseManager onDataUpdate={onDatabaseUpdate || (() => {})} />
        </div>
      )}
      
      {isExpanded && (
        <div className="mt-4 space-y-4">
          {/* 生成設定セクション */}
          <div className="border rounded-lg border-gray-300 dark:border-gray-600">
            <button
              onClick={() => toggleSection('generation')}
              className="w-full px-4 py-3 text-left rounded-t-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-blue-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">生成設定</span>
                </div>
                {expandedSections.generation ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            
            {expandedSections.generation && (
              <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-600 space-y-4">
                {/* 生成モード設定 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    生成モード
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSettingChange('generationMode', 'elements')}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        settings.generationMode === 'elements'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      要素ベース
                    </button>
                    <button
                      onClick={() => handleSettingChange('generationMode', 'brand')}
                      className={`px-3 py-2 text-sm rounded-md transition-colors ${
                        settings.generationMode === 'brand'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      ブランドベース
                    </button>
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    {settings.generationMode === 'elements' 
                      ? '素材・シルエット・トレンドの組み合わせで生成' 
                      : 'ファッションブランドベースで生成'}
                  </p>
                </div>

                {/* プロンプト生成数設定 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    プロンプト生成数: {settings.promptCount}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={settings.promptCount}
                    onChange={(e) => handleSettingChange('promptCount', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
                    <span>1</span>
                    <span>5</span>
                    <span>10</span>
                    <span>15</span>
                    <span>20</span>
                  </div>
                </div>

                {/* 要素ベース専用設定 */}
                {settings.generationMode === 'elements' && (
                  <div className="space-y-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      要素ベース生成設定
                    </h4>
                    
                    {/* 創造性レベル */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        創造性レベル
                      </label>
                      <select
                        value={settings.creativityLevel}
                        onChange={(e) => handleSettingChange('creativityLevel', e.target.value as any)}
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                      >
                        <option value="conservative">保守的（調和重視）</option>
                        <option value="balanced">バランス</option>
                        <option value="experimental">実験的（斬新さ重視）</option>
                      </select>
                    </div>
                    
                    {/* 季節的一貫性 */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="seasonal-consistency"
                        checked={settings.includeSeasonalConsistency}
                        onChange={(e) => handleSettingChange('includeSeasonalConsistency', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="seasonal-consistency" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        季節的一貫性を考慮
                      </label>
                    </div>
                    
                    {/* カラーハーモニー */}
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="color-harmony"
                        checked={settings.includeColorHarmony}
                        onChange={(e) => handleSettingChange('includeColorHarmony', e.target.checked)}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                      />
                      <label htmlFor="color-harmony" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                        カラーハーモニーを考慮
                      </label>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* カラーパレット設定セクション */}
          <div className="border rounded-lg border-gray-300 dark:border-gray-600">
            <button
              onClick={() => toggleSection('colors')}
              className="w-full px-4 py-3 text-left rounded-t-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Palette className="w-5 h-5 text-purple-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">カラーパレット</span>
                </div>
                {expandedSections.colors ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            
            {expandedSections.colors && (
              <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-600 space-y-4">
                {/* カラーパレット使用切り替え */}
                <div className="flex items-center justify-between">
                  <div>
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">カラーパレットを使用</label>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">オフにするとMidJourneyが自動で色を選択</p>
                  </div>
                  <button
                    onClick={() => handleSettingChange('useColorPalette', !settings.useColorPalette)}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      settings.useColorPalette ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        settings.useColorPalette ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* カラーパレットセレクター */}
                {settings.useColorPalette && (
                  <ColorPaletteSelector
                    selectedPaletteId={settings.selectedColorPalette}
                    customColors={settings.customColors || []}
                    onPaletteChange={(paletteId) => handleSettingChange('selectedColorPalette', paletteId)}
                    onCustomColorsChange={(colors) => handleSettingChange('customColors', colors)}
                    darkMode={settings.darkMode}
                  />
                )}
              </div>
            )}
          </div>

          {/* プロンプトオプションセクション */}
          <div className="border rounded-lg border-gray-300 dark:border-gray-600">
            <button
              onClick={() => toggleSection('options')}
              className="w-full px-4 py-3 text-left rounded-t-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Settings className="w-5 h-5 text-green-500" />
                  <span className="font-semibold text-gray-700 dark:text-gray-300">プロンプトオプション</span>
                </div>
                {expandedSections.options ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>
            
            {expandedSections.options && (
              <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-600 space-y-4">
                {/* アスペクト比設定 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="include-ar"
                      checked={settings.includeAspectRatio}
                      onChange={(e) => handleSettingChange('includeAspectRatio', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label htmlFor="include-ar" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      アスペクト比を含める
                    </label>
                  </div>
                  
                  {settings.includeAspectRatio && (
                    <div className="ml-6">
                      <select
                        value={settings.aspectRatio}
                        onChange={(e) => handleSettingChange('aspectRatio', e.target.value)}
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                      >
                        {ASPECT_RATIO_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                
                {/* バージョン設定 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="include-version"
                      checked={settings.includeVersion}
                      onChange={(e) => handleSettingChange('includeVersion', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label htmlFor="include-version" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      バージョンを含める
                    </label>
                  </div>
                  
                  {settings.includeVersion && (
                    <div className="ml-6">
                      <select
                        value={settings.version}
                        onChange={(e) => handleSettingChange('version', e.target.value)}
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                      >
                        {VERSION_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                
                {/* スタイライズ設定 */}
                <div className="flex flex-col gap-2">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="include-stylize"
                      checked={settings.includeStylize}
                      onChange={(e) => handleSettingChange('includeStylize', e.target.checked)}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
                    />
                    <label htmlFor="include-stylize" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      スタイライズを含める
                    </label>
                  </div>
                  
                  {settings.includeStylize && (
                    <div className="ml-6">
                      <select
                        value={settings.stylize}
                        onChange={(e) => handleSettingChange('stylize', e.target.value)}
                        className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                      >
                        {STYLIZE_OPTIONS.map(option => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
                
                {/* 撮影角度設定 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    撮影角度
                  </label>
                  <select
                    value={settings.cameraAngle}
                    onChange={(e) => handleSettingChange('cameraAngle', e.target.value as 'random' | 'full-body' | 'portrait')}
                    className="block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white text-sm"
                  >
                    <option value="random">ランダム選択</option>
                    <option value="full-body">全身ショットのみ</option>
                    <option value="portrait">ポートレートのみ</option>
                  </select>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    生成されるプロンプトの撮影角度を選択できます
                  </p>
                </div>
                
                {/* カスタムサフィックス */}
                <div>
                  <label htmlFor="custom-suffix" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    カスタムサフィックス
                  </label>
                  <input
                    type="text"
                    id="custom-suffix"
                    value={settings.customSuffix}
                    onChange={(e) => handleSettingChange('customSuffix', e.target.value)}
                    placeholder="例: --stop 80 --raw"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white text-sm"
                  />
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    すべてのプロンプトの末尾に追加するパラメータを指定します
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}