// components/PromptCard.tsx
import React, { useState } from 'react';
import { Copy, Heart, ImagePlus, Star, Trash2, Edit3, Eye, EyeOff } from 'lucide-react';
import { Prompt } from '../types';

interface PromptCardProps {
  prompt: Prompt;
  onUpdate: (prompt: Prompt) => void;
  onDelete: (id: string) => void;
  darkMode: boolean;
}

export default function PromptCard({
  prompt,
  onUpdate,
  onDelete,
  darkMode
}: PromptCardProps) {
  const [showDetails, setShowDetails] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editNotes, setEditNotes] = useState(prompt.notes || '');

  // コピー機能
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(prompt.text || prompt.fullPrompt);
      // 簡単なフィードバック表示（必要に応じて）
    } catch (err) {
      console.error('コピーに失敗しました:', err);
    }
  };

  // お気に入り切替
  const handleToggleFavorite = () => {
    onUpdate({
      ...prompt,
      isFavorite: !prompt.isFavorite
    });
  };

  // 評価変更
  const handleRatingChange = (rating: number) => {
    onUpdate({
      ...prompt,
      rating: prompt.rating === rating ? 0 : rating
    });
  };

  // メモ保存
  const handleSaveNotes = () => {
    onUpdate({
      ...prompt,
      notes: editNotes
    });
    setIsEditing(false);
  };

  // ファイル選択ハンドラー
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        onUpdate({
          ...prompt,
          resultImagePath: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className={`rounded-lg shadow-md p-6 transition-all hover:shadow-lg ${
      darkMode ? 'bg-gray-800' : 'bg-white'
    }`}>
      {/* プロンプト画像があれば表示 */}
      {prompt.resultImagePath && (
        <div className="mb-4">
          <img 
            src={prompt.resultImagePath} 
            alt="Generated Image" 
            className="w-full h-48 object-cover rounded-md"
          />
        </div>
      )}
      
      {/* プロンプトテキスト */}
      <div className="flex justify-between items-start mb-4">
        <p className={`flex-grow mr-4 break-words ${
          darkMode ? 'text-gray-200' : 'text-gray-800'
        }`}>
          {prompt.text || prompt.fullPrompt}
        </p>
        <button
          onClick={handleCopy}
          className={`transition-colors ${
            darkMode 
              ? 'text-gray-400 hover:text-gray-300' 
              : 'text-gray-500 hover:text-gray-700'
          }`}
          title="コピーする"
        >
          <Copy className="w-5 h-5" />
        </button>
      </div>
      
      {/* 要素タグ */}
      <div className="flex flex-wrap gap-2 mb-4 text-sm">
        {/* 生成モード表示 */}
        {prompt.mode && (
          <span className={`px-2 py-1 rounded text-xs font-medium ${
            prompt.mode === 'elements'
              ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100'
              : prompt.mode === 'brand'
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100'
              : 'bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-100'
          }`}>
            {prompt.mode === 'elements' ? '要素ベース' 
             : prompt.mode === 'brand' ? 'ブランドベース' 
             : '🌟 Creative'}
          </span>
        )}
        
        {/* ブランド名（ブランドベースの場合） */}
        {prompt.brandName && (
          <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 px-2 py-1 rounded">
            {prompt.brandName}
          </span>
        )}
        
        {/* 時代 */}
        {prompt.era && (
          <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded">
            {prompt.era}
          </span>
        )}
        
        {/* 素材 */}
        {prompt.selectedMaterial && (
          <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 px-2 py-1 rounded">
            {prompt.selectedMaterial.name}
          </span>
        )}
        
        {/* シルエット */}
        {prompt.selectedSilhouette && (
          <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100 px-2 py-1 rounded">
            {prompt.selectedSilhouette.name}
          </span>
        )}
        
        {/* スタイルトレンド */}
        {prompt.selectedStyleTrend && (
          <span className="bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-100 px-2 py-1 rounded">
            {prompt.selectedStyleTrend.name}
          </span>
        )}
        
        {/* 従来の素材・シルエット（互換性のため） */}
        {!prompt.selectedMaterial && prompt.material && (
          <span className="bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-100 px-2 py-1 rounded">
            {prompt.material.split(' ').slice(0, 2).join(' ')}
          </span>
        )}
        
        {!prompt.selectedSilhouette && prompt.silhouette && (
          <span className="bg-pink-100 dark:bg-pink-900 text-pink-800 dark:text-pink-100 px-2 py-1 rounded">
            {prompt.silhouette.split(' ').slice(0, 2).join(' ')}
          </span>
        )}
        
        {/* Creativeモード要素 */}
        {prompt.creativeElements && (
          <>
            <span className="bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900 dark:to-pink-900 text-purple-800 dark:text-purple-100 px-2 py-1 rounded text-xs">
              {prompt.creativeElements.artisticTechnique}
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 px-2 py-1 rounded text-xs">
              {prompt.creativeElements.naturalElement}
            </span>
          </>
        )}
      </div>
      
      {/* 詳細情報の表示切替 */}
      {(prompt.selectedMaterial || prompt.selectedSilhouette || prompt.selectedStyleTrend) && (
        <div className="mb-4">
          <button
            onClick={() => setShowDetails(!showDetails)}
            className={`flex items-center gap-1 text-sm transition-colors ${
              darkMode 
                ? 'text-blue-400 hover:text-blue-300' 
                : 'text-blue-600 hover:text-blue-700'
            }`}
          >
            {showDetails ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            {showDetails ? '詳細を隠す' : '詳細を表示'}
          </button>
          
          {showDetails && (
            <div className={`mt-3 p-3 rounded-lg text-sm space-y-3 ${
              darkMode ? 'bg-gray-700' : 'bg-gray-50'
            }`}>
              {/* 素材詳細 */}
              {prompt.selectedMaterial && (
                <div>
                  <h4 className="font-medium mb-1">素材: {prompt.selectedMaterial.name}</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {prompt.selectedMaterial.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          darkMode
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs opacity-70">
                    {prompt.selectedMaterial.characteristics.join(', ')}
                  </p>
                </div>
              )}
              
              {/* シルエット詳細 */}
              {prompt.selectedSilhouette && (
                <div>
                  <h4 className="font-medium mb-1">シルエット: {prompt.selectedSilhouette.name}</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {prompt.selectedSilhouette.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          darkMode
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs opacity-70">
                    {prompt.selectedSilhouette.characteristics.join(', ')}
                  </p>
                </div>
              )}
              
              {/* スタイルトレンド詳細 */}
              {prompt.selectedStyleTrend && (
                <div>
                  <h4 className="font-medium mb-1">トレンド: {prompt.selectedStyleTrend.name}</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {prompt.selectedStyleTrend.tags.map((tag, index) => (
                      <span
                        key={index}
                        className={`text-xs px-2 py-1 rounded ${
                          darkMode
                            ? 'bg-gray-600 text-gray-300'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-xs opacity-70 mb-2">
                    {prompt.selectedStyleTrend.characteristics.join(', ')}
                  </p>
                  <div className="text-xs">
                    <span className="font-medium">時代:</span> {prompt.selectedStyleTrend.era} | 
                    <span className="font-medium"> 文化的起源:</span> {prompt.selectedStyleTrend.culturalOrigin}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      <div className="flex items-center justify-between">
        {/* 評価スター */}
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleRatingChange(star)}
              className={`w-5 h-5 ${
                prompt.rating >= star ? 'text-yellow-400' : 
                darkMode ? 'text-gray-600 hover:text-yellow-400' : 'text-gray-300 hover:text-yellow-400'
              } transition-colors`}
              title={`${star}つ星`}
            >
              <Star className="w-full h-full fill-current" />
            </button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          {/* 画像アップロードボタン */}
          <label className={`cursor-pointer transition-colors ${
            darkMode 
              ? 'text-gray-400 hover:text-blue-400' 
              : 'text-gray-500 hover:text-blue-600'
          }`}>
            <ImagePlus className="w-5 h-5" />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden"
              onChange={handleFileSelect}
            />
          </label>
          
          {/* お気に入りボタン */}
          <button
            onClick={handleToggleFavorite}
            className={`transition-colors ${
              prompt.isFavorite 
                ? 'text-red-500 dark:text-red-400' 
                : darkMode 
                  ? 'text-gray-500 hover:text-red-400' 
                  : 'text-gray-400 hover:text-red-500'
            }`}
            title={prompt.isFavorite ? "お気に入りから削除" : "お気に入りに追加"}
          >
            <Heart className={`w-5 h-5 ${prompt.isFavorite ? 'fill-current' : ''}`} />
          </button>
          
          {/* 削除ボタン */}
          <button
            onClick={() => onDelete(prompt.id)}
            className={`transition-colors ${
              darkMode 
                ? 'text-gray-500 hover:text-red-400' 
                : 'text-gray-400 hover:text-red-500'
            }`}
            title="削除"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      {/* メモ編集 */}
      <div className="mt-4">
        {isEditing ? (
          <div className="space-y-2">
            <textarea
              value={editNotes}
              onChange={(e) => setEditNotes(e.target.value)}
              placeholder="メモを入力..."
              className={`w-full p-2 border rounded-md text-sm resize-none ${
                darkMode 
                  ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400' 
                  : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
              }`}
              rows={3}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSaveNotes}
                className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600 transition-colors"
              >
                保存
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setEditNotes(prompt.notes || '');
                }}
                className={`px-3 py-1 text-sm rounded transition-colors ${
                  darkMode 
                    ? 'bg-gray-600 text-gray-300 hover:bg-gray-500' 
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                キャンセル
              </button>
            </div>
          </div>
        ) : (
          <div className="flex items-start gap-2">
            {prompt.notes ? (
              <div className={`flex-grow p-3 rounded text-sm ${
                darkMode ? 'bg-gray-700 text-gray-300' : 'bg-gray-50 text-gray-700'
              }`}>
                {prompt.notes}
              </div>
            ) : (
              <div className={`flex-grow p-3 rounded text-sm italic ${
                darkMode ? 'text-gray-500' : 'text-gray-400'
              }`}>
                メモなし
              </div>
            )}
            <button
              onClick={() => setIsEditing(true)}
              className={`transition-colors ${
                darkMode 
                  ? 'text-gray-400 hover:text-gray-300' 
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              title="メモを編集"
            >
              <Edit3 className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      
      {/* 作成日時を表示 */}
      <div className={`mt-3 text-xs ${
        darkMode ? 'text-gray-400' : 'text-gray-500'
      }`}>
        {prompt.timestamp.toLocaleString()}
      </div>
    </div>
  );
}
