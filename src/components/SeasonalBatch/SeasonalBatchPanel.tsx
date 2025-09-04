import React, { useState } from 'react';
import { generateSeasonalBatchPrompts, seasonalBatchPresets } from '../../services/seasonalBatchService';
import { AppSettings, Prompt, SeasonalBatchSettings } from '../../types';
import { Copy, Download, RefreshCw, Zap, Package, CheckSquare, Square } from 'lucide-react';

interface SeasonalBatchPanelProps {
  appSettings: AppSettings;
  seasonalSettings: SeasonalBatchSettings;
  onSeasonalSettingsChange: (settings: SeasonalBatchSettings) => void;
  onGeneratedPrompts: (prompts: Prompt[]) => void;
  darkMode: boolean;
}

const SeasonalBatchPanel: React.FC<SeasonalBatchPanelProps> = ({
  appSettings,
  seasonalSettings,
  onSeasonalSettingsChange,
  onGeneratedPrompts,
  darkMode
}) => {
  const [batchSettings, setBatchSettings] = useState<SeasonalBatchSettings>(seasonalSettings);
  
  // seasonalSettingsが変更されたら同期
  React.useEffect(() => {
    setBatchSettings(seasonalSettings);
  }, [seasonalSettings]);
  
  // batchSettingsが変更されたら親コンポーネントに通知
  React.useEffect(() => {
    onSeasonalSettingsChange(batchSettings);
  }, [batchSettings, onSeasonalSettingsChange]);
  
  const [generatedPrompts, setGeneratedPrompts] = useState<Prompt[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  const seasonOptions = [
    { id: 'spring-summer', label: '🌸 Spring/Summer (SS)', description: '春夏向け素材とスタイル' },
    { id: 'autumn-winter', label: '🍂 Autumn/Winter (AW)', description: '秋冬向け素材とスタイル' },
    { id: 'all-season', label: '🌍 All Season', description: '通年対応' }
  ];

  const genreOptions = [
    { id: 'tech', label: '⚡ テック系', description: 'テックウェア、機能性重視' },
    { id: 'lolita', label: '🎀 ロリータ', description: 'スウィート、ゴシック、クラシック' },
    { id: 'vintage', label: '👗 ヴィンテージ・古着', description: 'アメリカーナ、ヨーロピアン、スリフト' },
    { id: 'luxury', label: '💎 ラグジュアリー', description: 'クワイエットラグジュアリー、高級感' },
    { id: 'street', label: '🛹 ストリート', description: 'ストリートウェア、Y2K、カジュアル' },
    { id: 'romantic', label: '🌹 ロマンティック', description: 'コテージコア、バレエコア、フェミニン' },
    { id: 'edgy', label: '🔥 エッジー', description: 'グランジ、パンク、ダークアカデミア' },
    { id: 'sustainable', label: '♻️ サステナブル', description: 'エコファッション、ソーラーパンク' }
  ];

  const toggleSeason = (seasonId: string) => {
    setBatchSettings(prev => ({
      ...prev,
      seasons: prev.seasons.includes(seasonId)
        ? prev.seasons.filter(s => s !== seasonId)
        : [...prev.seasons, seasonId]
    }));
    setActivePreset(null);
  };

  const toggleGenre = (genreId: string) => {
    setBatchSettings(prev => ({
      ...prev,
      genres: prev.genres.includes(genreId)
        ? prev.genres.filter(g => g !== genreId)
        : [...prev.genres, genreId]
    }));
    setActivePreset(null);
  };

  const applyPreset = (presetKey: string) => {
    const preset = seasonalBatchPresets[presetKey as keyof typeof seasonalBatchPresets];
    if (preset) {
      setBatchSettings(preset);
      setActivePreset(presetKey);
    }
  };

  const handleGenerate = async () => {
    if (batchSettings.seasons.length === 0 || batchSettings.genres.length === 0) {
      alert('少なくとも1つの季節と1つのジャンルを選択してください。');
      return;
    }
    
    setIsGenerating(true);
    
    // 生成を非同期でシミュレート
    setTimeout(() => {
      const prompts = generateSeasonalBatchPrompts(batchSettings, appSettings);
      setGeneratedPrompts(prompts);
      onGeneratedPrompts(prompts);
      setIsGenerating(false);
    }, 500);
  };

  const copyAllPrompts = () => {
    const allText = generatedPrompts.map(p => p.prompt).join('\n\n');
    navigator.clipboard.writeText(allText);
  };

  const downloadPrompts = () => {
    const content = generatedPrompts.map((p, i) => 
      `--- Prompt ${i + 1} ---\n${p.prompt}\n\n[Metadata]\nSeason: ${p.metadata?.season || 'N/A'}\nGenre: ${p.metadata?.genre || 'N/A'}\n`
    ).join('\n');
    
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `fashion-prompts-batch-${Date.now()}.txt`;
    a.click();
  };

  return (
    <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="mb-6">
        <h3 className={`text-xl font-bold mb-2 flex items-center ${darkMode ? 'text-white' : 'text-gray-900'}`}>
          <Package className="mr-2" size={24} />
          季節別バッチ生成モード
        </h3>
        <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          季節とジャンルを選択して、大量のプロンプトを一括生成します
        </p>
      </div>

      {/* プリセット */}
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          クイックプリセット
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {Object.entries(seasonalBatchPresets).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => applyPreset(key)}
              className={`px-3 py-2 rounded text-xs font-medium transition-all ${
                activePreset === key
                  ? 'bg-blue-600 text-white'
                  : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {key.replace('_', ' ').toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* 季節選択 */}
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          季節を選択（複数可）
        </label>
        <div className="space-y-2">
          {seasonOptions.map(season => (
            <div
              key={season.id}
              onClick={() => toggleSeason(season.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                batchSettings.seasons.includes(season.id)
                  ? darkMode
                    ? 'bg-blue-900 border-blue-600'
                    : 'bg-blue-50 border-blue-400'
                  : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border`}
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {season.label}
                  </span>
                  <p className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {season.description}
                  </p>
                </div>
                {batchSettings.seasons.includes(season.id) ? (
                  <CheckSquare className="text-blue-500" size={20} />
                ) : (
                  <Square className={darkMode ? 'text-gray-500' : 'text-gray-400'} size={20} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ジャンル選択 */}
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-3 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          ジャンルを選択（複数可）
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {genreOptions.map(genre => (
            <div
              key={genre.id}
              onClick={() => toggleGenre(genre.id)}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                batchSettings.genres.includes(genre.id)
                  ? darkMode
                    ? 'bg-purple-900 border-purple-600'
                    : 'bg-purple-50 border-purple-400'
                  : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600'
                  : 'bg-gray-50 hover:bg-gray-100'
              } border`}
            >
              <div className="text-center">
                <div className="text-2xl mb-1">{genre.label.split(' ')[0]}</div>
                <div className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  {genre.label.split(' ')[1]}
                </div>
                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  {genre.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 生成数 */}
      <div className="mb-6">
        <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-200' : 'text-gray-700'}`}>
          生成数: {batchSettings.count}
        </label>
        <input
          type="range"
          min="5"
          max="50"
          step="5"
          value={batchSettings.count}
          onChange={(e) => setBatchSettings(prev => ({ ...prev, count: parseInt(e.target.value) }))}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>5</span>
          <span>25</span>
          <span>50</span>
        </div>
      </div>

      {/* 設定情報表示 */}
      <div className="mb-6 p-3 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-100'}">
        <p className={`text-xs ${darkMode ? 'text-gray-300' : 'text-gray-600'} mb-2`}>
          🔧 現在の設定：
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}">
          <div>モデル: {appSettings.includeModels ? '有効' : '無効'}</div>
          <div>男女比: {appSettings.genderRatio === 'custom' ? `カスタム(${appSettings.customMaleRatio}%)` : appSettings.genderRatio}</div>
          <div>色彩: {appSettings.includeColors ? '有効' : '無効'}</div>
          <div>照明: {appSettings.includeLighting ? '有効' : '無効'}</div>
          <div>背景: {appSettings.includeBackground ? '有効' : '無効'}</div>
        </div>
        <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'} mt-2`}>
          ※ モデル・男女比・表示要素の設定は「設定」パネルで調整してください
        </p>
      </div>

      {/* 生成ボタン */}
      <div className="mb-6">
        <button
          onClick={handleGenerate}
          disabled={isGenerating || batchSettings.seasons.length === 0 || batchSettings.genres.length === 0}
          className={`w-full py-3 px-4 rounded-lg font-medium transition-all flex items-center justify-center ${
            isGenerating || batchSettings.seasons.length === 0 || batchSettings.genres.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white'
          }`}
        >
          {isGenerating ? (
            <>
              <RefreshCw className="mr-2 animate-spin" size={20} />
              生成中...
            </>
          ) : (
            <>
              <Zap className="mr-2" size={20} />
              {batchSettings.count}個のプロンプトを生成
            </>
          )}
        </button>
      </div>

      {/* 生成結果 */}
      {generatedPrompts.length > 0 && (
        <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-700' : 'bg-gray-50'}`}>
          <div className="flex justify-between items-center mb-4">
            <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              生成結果 ({generatedPrompts.length}個)
            </h4>
            <div className="flex gap-2">
              <button
                onClick={copyAllPrompts}
                className={`px-3 py-1 rounded text-sm flex items-center ${
                  darkMode
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Copy size={16} className="mr-1" />
                全てコピー
              </button>
              <button
                onClick={downloadPrompts}
                className={`px-3 py-1 rounded text-sm flex items-center ${
                  darkMode
                    ? 'bg-gray-600 text-white hover:bg-gray-500'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Download size={16} className="mr-1" />
                ダウンロード
              </button>
            </div>
          </div>
          
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {generatedPrompts.map((prompt, index) => (
              <div
                key={index}
                className={`p-3 rounded ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } text-sm`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className={`font-medium ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    #{index + 1}
                  </span>
                  <button
                    onClick={() => navigator.clipboard.writeText(prompt.prompt)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <Copy size={14} />
                  </button>
                </div>
                <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-700'} line-clamp-2`}>
                  {prompt.prompt}
                </p>
                <div className={`text-xs mt-1 ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}>
                  {prompt.metadata?.season} | {prompt.metadata?.genre}
                  {appSettings.includeModels && prompt.metadata?.gender && ` | ${prompt.metadata.gender === 'male' ? '👨 男性' : '👩 女性'}`}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SeasonalBatchPanel;