import React, { useState } from 'react';
import { ColorPalette, colorPalettes, getColorPalettesByCategory, getColorDisplayName, getHarmonyDescription } from '../data/colorPalettes';
import { Palette, Plus, X, Info } from 'lucide-react';

interface ColorPaletteSelectorProps {
  selectedPaletteId?: string;
  customColors: string[];
  onPaletteChange: (paletteId?: string) => void;
  onCustomColorsChange: (colors: string[]) => void;
  darkMode: boolean;
}

const ColorPaletteSelector: React.FC<ColorPaletteSelectorProps> = ({
  selectedPaletteId,
  customColors,
  onPaletteChange,
  onCustomColorsChange,
  darkMode
}) => {
  const [activeCategory, setActiveCategory] = useState<ColorPalette['category']>('basic');
  const [showCustomColors, setShowCustomColors] = useState(false);
  const [newCustomColor, setNewCustomColor] = useState('');
  const [showPaletteInfo, setShowPaletteInfo] = useState<string | null>(null);

  const categories = [
    { id: 'basic', name: 'ベーシック', icon: '⚪' },
    { id: 'trend', name: 'トレンド', icon: '🔥' },
    { id: 'seasonal', name: '季節', icon: '🌸' },
    { id: 'mood', name: 'ムード', icon: '💫' },
    { id: 'cultural', name: '文化', icon: '🌍' },
    { id: 'brand-inspired', name: 'ブランド', icon: '👑' }
  ] as const;

  const filteredPalettes = getColorPalettesByCategory(activeCategory);
  const selectedPalette = selectedPaletteId ? colorPalettes.find(p => p.id === selectedPaletteId) : undefined;

  const addCustomColor = () => {
    if (newCustomColor.trim() && customColors.length < 5) {
      const newColors = [...customColors, newCustomColor.trim()];
      onCustomColorsChange(newColors);
      setNewCustomColor('');
    }
  };

  const removeCustomColor = (index: number) => {
    const newColors = customColors.filter((_, i) => i !== index);
    onCustomColorsChange(newColors);
  };

  const ColorSwatch = ({ color, size = 'md' }: { color: string, size?: 'sm' | 'md' | 'lg' }) => {
    const sizeClasses = {
      sm: 'w-4 h-4',
      md: 'w-6 h-6',
      lg: 'w-8 h-8'
    };

    // 色名からCSS色値への簡易変換
    const getColorValue = (colorName: string): string => {
      const colorMap: Record<string, string> = {
        'black': '#000000',
        'white': '#ffffff',
        'charcoal grey': '#36454f',
        'silver': '#c0c0c0',
        'navy blue': '#000080',
        'cream': '#f5f5dc',
        'beige': '#f5f5dc',
        'light grey': '#d3d3d3',
        'camel': '#c19a6b',
        'cognac brown': '#8b4513',
        'terracotta': '#e2725b',
        'rust orange': '#b7410e',
        'sage green': '#9caf88',
        'soft beige': '#f7f3e9',
        'ivory': '#fffff0',
        'dusty pink': '#d4a5a5',
        'lavender': '#e6e6fa',
        'electric blue': '#7df9ff',
        'hot pink': '#ff1493',
        'holographic': 'linear-gradient(45deg, #ff0080, #00ff80, #8000ff)',
        'neon green': '#39ff14',
        'sunshine yellow': '#fffd37',
        'burgundy': '#800020',
        'valentino red': '#ee2c4c',
        'tiffany blue': '#0abab5',
        'hermes orange': '#ff8040'
      };
      
      return colorMap[colorName.toLowerCase()] || '#666666';
    };

    const colorValue = getColorValue(color);
    const isGradient = colorValue.includes('gradient');

    return (
      <div 
        className={`${sizeClasses[size]} rounded-full border-2 border-gray-300 dark:border-gray-600 flex-shrink-0`}
        style={isGradient ? { background: colorValue } : { backgroundColor: colorValue }}
        title={getColorDisplayName(color)}
      />
    );
  };

  return (
    <div className={`space-y-4 ${darkMode ? 'text-gray-100' : 'text-gray-900'}`}>
      {/* ヘッダー */}
      <div className="flex items-center space-x-2">
        <Palette className="w-5 h-5 text-blue-500" />
        <h3 className="font-semibold text-gray-700 dark:text-gray-300">カラーパレット</h3>
      </div>

      {/* カテゴリータブ */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-3 py-1 text-sm rounded-full transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-500 text-white'
                : darkMode
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {category.icon} {category.name}
          </button>
        ))}
      </div>

      {/* 「色指定なし」オプション */}
      <div 
        className={`p-3 border rounded-lg cursor-pointer transition-colors ${
          !selectedPaletteId && customColors.length === 0
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
            : darkMode
            ? 'border-gray-600 hover:border-gray-500'
            : 'border-gray-300 hover:border-gray-400'
        }`}
        onClick={() => {
          onPaletteChange(undefined);
          onCustomColorsChange([]);
        }}
      >
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center">
            <span className="text-gray-400 text-xs">自動</span>
          </div>
          <div>
            <div className="font-medium text-gray-700 dark:text-gray-300">色指定なし</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">MidJourneyに色選択を委ねる</div>
          </div>
        </div>
      </div>

      {/* パレット一覧 */}
      <div className="space-y-2 max-h-80 overflow-y-auto">
        {filteredPalettes.map((palette) => (
          <div key={palette.id} className="relative">
            <div
              className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedPaletteId === palette.id
                  ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                  : darkMode
                  ? 'border-gray-600 hover:border-gray-500'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              onClick={() => onPaletteChange(palette.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="flex space-x-1">
                    {palette.colors.slice(0, 5).map((color, index) => (
                      <ColorSwatch key={index} color={color} size="sm" />
                    ))}
                  </div>
                  <div>
                    <div className="font-medium text-gray-700 dark:text-gray-300">{palette.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{palette.description}</div>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowPaletteInfo(showPaletteInfo === palette.id ? null : palette.id);
                  }}
                  className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-400"
                >
                  <Info className="w-4 h-4" />
                </button>
              </div>
              
              {/* パレット詳細情報 */}
              {showPaletteInfo === palette.id && (
                <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-800 rounded border-t border-gray-200 dark:border-gray-600">
                  <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
                    <div>
                      <span className="font-medium">調和タイプ:</span> {getHarmonyDescription(palette.harmony)}
                    </div>
                    <div>
                      <span className="font-medium">ムード:</span> {palette.mood.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">季節:</span> {palette.season.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">色彩:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {palette.colors.map((color, index) => (
                          <span key={index} className="text-xs bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded">
                            {getColorDisplayName(color)}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* カスタムカラー設定 */}
      <div className="border-t pt-4">
        <button
          onClick={() => setShowCustomColors(!showCustomColors)}
          className="flex items-center space-x-2 text-sm font-medium text-gray-700 dark:text-gray-300 mb-3"
        >
          <Plus className="w-4 h-4" />
          <span>カスタムカラー設定</span>
        </button>

        {showCustomColors && (
          <div className="space-y-3">
            {/* 既存のカスタムカラー */}
            {customColors.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-700 dark:text-gray-300">設定済みカラー:</div>
                <div className="flex flex-wrap gap-2">
                  {customColors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2 bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full">
                      <ColorSwatch color={color} size="sm" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{getColorDisplayName(color)}</span>
                      <button
                        onClick={() => removeCustomColor(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 新しいカラー追加 */}
            {customColors.length < 5 && (
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={newCustomColor}
                  onChange={(e) => setNewCustomColor(e.target.value)}
                  placeholder="色名を入力 (例: deep red, forest green)"
                  className={`flex-1 px-3 py-2 border rounded text-sm ${
                    darkMode
                      ? 'bg-gray-700 border-gray-600 text-gray-100'
                      : 'bg-white border-gray-300 text-gray-900'
                  }`}
                  onKeyPress={(e) => e.key === 'Enter' && addCustomColor()}
                />
                <button
                  onClick={addCustomColor}
                  disabled={!newCustomColor.trim() || customColors.length >= 5}
                  className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 disabled:opacity-50"
                >
                  追加
                </button>
              </div>
            )}

            <div className="text-xs text-gray-500 dark:text-gray-400">
              最大5色まで設定可能。英語での色名指定を推奨します。
            </div>
          </div>
        )}
      </div>

      {/* 現在の選択状態表示 */}
      {(selectedPalette || customColors.length > 0) && (
        <div className={`p-3 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">現在の設定:</div>
          {selectedPalette && (
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex space-x-1">
                {selectedPalette.colors.slice(0, 5).map((color, index) => (
                  <ColorSwatch key={index} color={color} size="sm" />
                ))}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">{selectedPalette.name}</span>
            </div>
          )}
          {customColors.length > 0 && (
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {customColors.map((color, index) => (
                  <ColorSwatch key={index} color={color} size="sm" />
                ))}
              </div>
              <span className="text-sm text-gray-700 dark:text-gray-300">カスタム ({customColors.length}色)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ColorPaletteSelector;