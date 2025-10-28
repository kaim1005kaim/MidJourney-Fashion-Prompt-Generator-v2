import React from 'react';
import { TrendSelectSettings } from '../../types';
import { fashionContext } from '../../data/initialData';

interface TrendSelectPanelProps {
  trendSelectSettings: TrendSelectSettings;
  onTrendSelectSettingsChange: (settings: TrendSelectSettings) => void;
  darkMode: boolean;
}

export default function TrendSelectPanel({
  trendSelectSettings,
  onTrendSelectSettingsChange,
  darkMode
}: TrendSelectPanelProps) {

  // トレンドの選択/解除をトグル
  const toggleTrend = (trendId: string) => {
    const currentTrends = trendSelectSettings.selectedTrends || [];
    const newTrends = currentTrends.includes(trendId)
      ? currentTrends.filter(id => id !== trendId)
      : [...currentTrends, trendId];

    onTrendSelectSettingsChange({
      ...trendSelectSettings,
      selectedTrends: newTrends
    });
  };

  // すべて選択
  const selectAllTrends = () => {
    onTrendSelectSettingsChange({
      ...trendSelectSettings,
      selectedTrends: fashionContext.styleTrends.map(t => t.id)
    });
  };

  // すべて解除
  const clearAllTrends = () => {
    onTrendSelectSettingsChange({
      ...trendSelectSettings,
      selectedTrends: []
    });
  };

  // 人気トレンドのみ選択（人気度70以上）
  const selectPopularTrends = () => {
    const popularTrends = fashionContext.styleTrends
      .filter(t => t.popularity && t.popularity >= 70)
      .map(t => t.id);

    onTrendSelectSettingsChange({
      ...trendSelectSettings,
      selectedTrends: popularTrends
    });
  };

  // カテゴリ別にトレンドをグループ化
  const trendsByCategory = {
    asian: fashionContext.styleTrends.filter(t =>
      ['k-pop-fashion', 'harajuku-street', 'gyaru-gal', 'heisei-retro', 'fancy-kawaii', 'korean-minimal'].includes(t.id)
    ),
    youth: fashionContext.styleTrends.filter(t =>
      ['y2k-revival', 'grunge-revival', 'punk', 'indie-sleaze'].includes(t.id)
    ),
    modern: fashionContext.styleTrends.filter(t =>
      ['tech-wear', 'athleisure', 'gorpcore', 'normcore'].includes(t.id)
    ),
    classic: fashionContext.styleTrends.filter(t =>
      ['cottagecore', 'dark-academia', 'light-academia', 'old-money'].includes(t.id)
    ),
    other: fashionContext.styleTrends.filter(t =>
      !['k-pop-fashion', 'harajuku-street', 'gyaru-gal', 'heisei-retro', 'fancy-kawaii', 'korean-minimal',
        'y2k-revival', 'grunge-revival', 'punk', 'indie-sleaze',
        'tech-wear', 'athleisure', 'gorpcore', 'normcore',
        'cottagecore', 'dark-academia', 'light-academia', 'old-money'].includes(t.id)
    )
  };

  const selectedCount = trendSelectSettings.selectedTrends?.length || 0;

  return (
    <div className={`rounded-lg p-6 mb-6 ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-xl font-semibold flex items-center gap-2">
            🎯 トレンドセレクト
            <span className="text-sm font-normal text-gray-500 dark:text-gray-400">
              ({selectedCount}個選択中)
            </span>
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            複数のスタイルトレンドを選択して、それらからランダムに生成
          </p>
        </div>
      </div>

      {/* クイックアクションボタン */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={selectPopularTrends}
          className="px-3 py-1.5 text-xs rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-colors"
        >
          🔥 人気トレンド
        </button>
        <button
          onClick={selectAllTrends}
          className="px-3 py-1.5 text-xs rounded-md bg-green-500 text-white hover:bg-green-600 transition-colors"
        >
          ✅ すべて選択
        </button>
        <button
          onClick={clearAllTrends}
          className="px-3 py-1.5 text-xs rounded-md bg-gray-500 text-white hover:bg-gray-600 transition-colors"
        >
          🗑️ すべて解除
        </button>
      </div>

      {/* トレンド選択グリッド */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {/* アジア系ファッション */}
        {trendsByCategory.asian.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              🌏 アジア系ファッション
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {trendsByCategory.asian.map(trend => (
                <button
                  key={trend.id}
                  onClick={() => toggleTrend(trend.id)}
                  className={`px-3 py-2 text-sm rounded-md transition-all text-left ${
                    trendSelectSettings.selectedTrends?.includes(trend.id)
                      ? 'bg-blue-500 text-white shadow-md'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{trend.name}</div>
                  {trend.popularity && (
                    <div className="text-xs opacity-75">人気度 {trend.popularity}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* ユース・ストリート系 */}
        {trendsByCategory.youth.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              🎸 ユース・ストリート系
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {trendsByCategory.youth.map(trend => (
                <button
                  key={trend.id}
                  onClick={() => toggleTrend(trend.id)}
                  className={`px-3 py-2 text-sm rounded-md transition-all text-left ${
                    trendSelectSettings.selectedTrends?.includes(trend.id)
                      ? 'bg-blue-500 text-white shadow-md'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{trend.name}</div>
                  {trend.popularity && (
                    <div className="text-xs opacity-75">人気度 {trend.popularity}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* モダン・テクニカル */}
        {trendsByCategory.modern.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              🚀 モダン・テクニカル
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {trendsByCategory.modern.map(trend => (
                <button
                  key={trend.id}
                  onClick={() => toggleTrend(trend.id)}
                  className={`px-3 py-2 text-sm rounded-md transition-all text-left ${
                    trendSelectSettings.selectedTrends?.includes(trend.id)
                      ? 'bg-blue-500 text-white shadow-md'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{trend.name}</div>
                  {trend.popularity && (
                    <div className="text-xs opacity-75">人気度 {trend.popularity}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* クラシック・アカデミック */}
        {trendsByCategory.classic.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              📚 クラシック・アカデミック
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {trendsByCategory.classic.map(trend => (
                <button
                  key={trend.id}
                  onClick={() => toggleTrend(trend.id)}
                  className={`px-3 py-2 text-sm rounded-md transition-all text-left ${
                    trendSelectSettings.selectedTrends?.includes(trend.id)
                      ? 'bg-blue-500 text-white shadow-md'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{trend.name}</div>
                  {trend.popularity && (
                    <div className="text-xs opacity-75">人気度 {trend.popularity}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* その他のトレンド */}
        {trendsByCategory.other.length > 0 && (
          <div>
            <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              ✨ その他のトレンド
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {trendsByCategory.other.map(trend => (
                <button
                  key={trend.id}
                  onClick={() => toggleTrend(trend.id)}
                  className={`px-3 py-2 text-sm rounded-md transition-all text-left ${
                    trendSelectSettings.selectedTrends?.includes(trend.id)
                      ? 'bg-blue-500 text-white shadow-md'
                      : darkMode
                      ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <div className="font-medium">{trend.name}</div>
                  {trend.popularity && (
                    <div className="text-xs opacity-75">人気度 {trend.popularity}</div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* 追加オプション */}
      <div className="mt-4 pt-4 border-t border-gray-300 dark:border-gray-600 space-y-3">
        <div className="flex items-center">
          <input
            type="checkbox"
            id="randomize-materials"
            checked={trendSelectSettings.randomizeMaterials}
            onChange={(e) => onTrendSelectSettingsChange({
              ...trendSelectSettings,
              randomizeMaterials: e.target.checked
            })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label htmlFor="randomize-materials" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            素材をランダムに選択
          </label>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="randomize-silhouettes"
            checked={trendSelectSettings.randomizeSilhouettes}
            onChange={(e) => onTrendSelectSettingsChange({
              ...trendSelectSettings,
              randomizeSilhouettes: e.target.checked
            })}
            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700"
          />
          <label htmlFor="randomize-silhouettes" className="ml-2 text-sm text-gray-700 dark:text-gray-300">
            シルエットをランダムに選択
          </label>
        </div>
      </div>

      {/* 警告メッセージ */}
      {selectedCount === 0 && (
        <div className="mt-4 p-3 bg-yellow-100 dark:bg-yellow-900/20 border border-yellow-300 dark:border-yellow-700 rounded-lg">
          <p className="text-sm text-yellow-800 dark:text-yellow-200">
            ⚠️ 少なくとも1つのトレンドを選択してください
          </p>
        </div>
      )}
    </div>
  );
}
