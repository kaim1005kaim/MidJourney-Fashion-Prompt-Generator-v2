import React, { useState } from 'react';
import { Material, Silhouette, StyleTrend } from '../types';
import { fashionContext } from '../data/initialData';

interface ElementSelectorProps {
  selectedElements: {
    material: Material | null;
    silhouette: Silhouette | null;
    styleTrend: StyleTrend | null;
  };
  onElementChange: (elements: {
    material: Material | null;
    silhouette: Silhouette | null;
    styleTrend: StyleTrend | null;
  }) => void;
  darkMode: boolean;
}

const ElementSelector: React.FC<ElementSelectorProps> = ({
  selectedElements,
  onElementChange,
  darkMode
}) => {
  const [activeTab, setActiveTab] = useState<'material' | 'silhouette' | 'trend'>('material');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterSeason, setFilterSeason] = useState('all');
  const [filterFormality, setFilterFormality] = useState('all');

  // 検索とフィルタリング
  const filterElements = <T extends { name: string; keywords: string[], season?: string[], seasons?: string[], formality?: string[] }>(
    elements: T[]
  ): T[] => {
    return elements.filter(element => {
      const matchesSearch = element.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           element.keywords.some(keyword => keyword.toLowerCase().includes(searchTerm.toLowerCase()));
      
      const elementSeasons = element.season || element.seasons || [];
      const matchesSeason = filterSeason === 'all' || 
                           elementSeasons.includes('all' as any) || 
                           elementSeasons.includes(filterSeason as any);
      
      const elementFormality = element.formality || [];
      const matchesFormality = filterFormality === 'all' || 
                              elementFormality.includes('all' as any) || 
                              elementFormality.includes(filterFormality as any);
      
      return matchesSearch && matchesSeason && matchesFormality;
    });
  };

  const handleElementSelect = (type: 'material' | 'silhouette' | 'styleTrend', element: any) => {
    const newElements = { ...selectedElements };
    
    if (type === 'material') {
      newElements.material = newElements.material?.id === element.id ? null : element;
    } else if (type === 'silhouette') {
      newElements.silhouette = newElements.silhouette?.id === element.id ? null : element;
    } else if (type === 'styleTrend') {
      newElements.styleTrend = newElements.styleTrend?.id === element.id ? null : element;
    }
    
    onElementChange(newElements);
  };

  const renderElementCard = (element: Material | Silhouette | StyleTrend, type: 'material' | 'silhouette' | 'styleTrend') => {
    const isSelected = 
      (type === 'material' && selectedElements.material?.id === element.id) ||
      (type === 'silhouette' && selectedElements.silhouette?.id === element.id) ||
      (type === 'styleTrend' && selectedElements.styleTrend?.id === element.id);

    return (
      <div
        key={element.id}
        onClick={() => handleElementSelect(type, element)}
        className={`p-3 border rounded-lg cursor-pointer transition-all ${
          isSelected
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : `border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500 ${
                darkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'
              }`
        }`}
      >
        <div className="flex items-start justify-between mb-2">
          <h4 className={`font-medium ${isSelected ? 'text-blue-700 dark:text-blue-300' : ''}`}>
            {element.name}
          </h4>
          {isSelected && (
            <div className="text-blue-500">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          )}
        </div>
        
        <div className="flex flex-wrap gap-1 mb-2">
          {element.keywords.slice(0, 3).map((keyword, index) => (
            <span
              key={index}
              className={`text-xs px-2 py-1 rounded-full ${
                darkMode
                  ? 'bg-gray-600 text-gray-300'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {keyword}
            </span>
          ))}
        </div>
        
        <div className="text-sm opacity-70">
          {element.description?.split('。')[0] || 'スタイリッシュなデザイン'}
        </div>
        
        {/* 追加情報 */}
        <div className="mt-2 flex gap-2 text-xs">
          {/* 季節情報 */}
          {(() => {
            const seasons = (element as any).season || (element as any).seasons || [];
            if (seasons.length > 0 && !seasons.includes('all')) {
              return (
                <span className="px-2 py-1 rounded bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  {seasons.slice(0, 2).join(', ')}
                </span>
              );
            }
            return null;
          })()}
          {/* フォーマリティ情報 */}
          {(() => {
            const formality = (element as any).formality || [];
            if (formality.length > 0 && !formality.includes('all')) {
              return (
                <span className="px-2 py-1 rounded bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  {formality.slice(0, 2).join(', ')}
                </span>
              );
            }
            return null;
          })()}
        </div>
      </div>
    );
  };

  const renderMaterials = () => {
    const filteredMaterials = filterElements(fashionContext.materials);
    
    return (
      <div className="space-y-3">
        {filteredMaterials.map(material => renderElementCard(material, 'material'))}
        {filteredMaterials.length === 0 && (
          <div className="text-center py-8 opacity-50">
            検索条件に一致する素材が見つかりません
          </div>
        )}
      </div>
    );
  };

  const renderSilhouettes = () => {
    const filteredSilhouettes = filterElements(fashionContext.silhouettes);
    
    return (
      <div className="space-y-3">
        {filteredSilhouettes.map(silhouette => renderElementCard(silhouette, 'silhouette'))}
        {filteredSilhouettes.length === 0 && (
          <div className="text-center py-8 opacity-50">
            検索条件に一致するシルエットが見つかりません
          </div>
        )}
      </div>
    );
  };

  const renderStyleTrends = () => {
    const filteredTrends = filterElements(fashionContext.styleTrends);
    
    return (
      <div className="space-y-3">
        {filteredTrends.map(trend => renderElementCard(trend, 'styleTrend'))}
        {filteredTrends.length === 0 && (
          <div className="text-center py-8 opacity-50">
            検索条件に一致するスタイルトレンドが見つかりません
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-4">
      {/* 選択された要素の表示 */}
      <div className="grid grid-cols-1 gap-2">
        <div className={`p-2 rounded text-sm ${
          selectedElements.material 
            ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' 
            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          <span className="font-medium">素材: </span>
          {selectedElements.material ? selectedElements.material.name : '未選択'}
        </div>
        <div className={`p-2 rounded text-sm ${
          selectedElements.silhouette 
            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          <span className="font-medium">シルエット: </span>
          {selectedElements.silhouette ? selectedElements.silhouette.name : '未選択'}
        </div>
        <div className={`p-2 rounded text-sm ${
          selectedElements.styleTrend 
            ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' 
            : 'bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400'
        }`}>
          <span className="font-medium">トレンド: </span>
          {selectedElements.styleTrend ? selectedElements.styleTrend.name : '未選択'}
        </div>
      </div>

      {/* タブナビゲーション */}
      <div className="flex border-b border-gray-200 dark:border-gray-600">
        {[
          { key: 'material', label: '素材', count: fashionContext.materials.length },
          { key: 'silhouette', label: 'シルエット', count: fashionContext.silhouettes.length },
          { key: 'trend', label: 'トレンド', count: fashionContext.styleTrends.length }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.label}
            <span className="ml-1 text-xs opacity-60">({tab.count})</span>
          </button>
        ))}
      </div>

      {/* 検索とフィルター */}
      <div className="space-y-3">
        <input
          type="text"
          placeholder="検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full px-3 py-2 border rounded-md text-sm ${
            darkMode
              ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400'
              : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
          }`}
        />
        
        <div className="flex gap-2">
          <select
            value={filterSeason}
            onChange={(e) => setFilterSeason(e.target.value)}
            className={`flex-1 px-2 py-1 border rounded text-sm ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">全季節</option>
            <option value="spring">春</option>
            <option value="summer">夏</option>
            <option value="autumn">秋</option>
            <option value="winter">冬</option>
          </select>
          
          <select
            value={filterFormality}
            onChange={(e) => setFilterFormality(e.target.value)}
            className={`flex-1 px-2 py-1 border rounded text-sm ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-300 text-gray-900'
            }`}
          >
            <option value="all">全フォーマリティ</option>
            <option value="casual">カジュアル</option>
            <option value="business">ビジネス</option>
            <option value="formal">フォーマル</option>
            <option value="streetwear">ストリート</option>
          </select>
        </div>
      </div>

      {/* 要素一覧 */}
      <div className="max-h-96 overflow-y-auto">
        {activeTab === 'material' && renderMaterials()}
        {activeTab === 'silhouette' && renderSilhouettes()}
        {activeTab === 'trend' && renderStyleTrends()}
      </div>
    </div>
  );
};

export default ElementSelector;
