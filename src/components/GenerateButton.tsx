import React from 'react';
import { Zap, RefreshCw } from 'lucide-react';

interface GenerateButtonProps {
  onClick: () => void;
  isGenerating: boolean;
  disabled?: boolean;
  promptCount: number;
  mode: string;
}

const GenerateButton: React.FC<GenerateButtonProps> = ({
  onClick,
  isGenerating,
  disabled = false,
  promptCount,
  mode
}) => {
  const getModeLabel = () => {
    switch (mode) {
      case 'elements':
        return '要素ベース';
      case 'brand':
        return 'ブランドベース';
      case 'creative':
        return 'Creative';
      case 'mixed':
        return 'ミックス';
      case 'seasonal':
        return '季節バッチ';
      default:
        return '';
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-gray-50 via-gray-50 to-transparent dark:from-gray-900 dark:via-gray-900 pt-8 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center">
          <button
            onClick={onClick}
            disabled={disabled || isGenerating}
            className={`
              group relative px-8 py-4 rounded-xl font-medium text-lg
              transition-all duration-300 transform
              ${disabled || isGenerating
                ? 'bg-gray-400 cursor-not-allowed opacity-60'
                : 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg hover:shadow-xl hover:scale-105 active:scale-100'
              }
              flex items-center gap-3
            `}
          >
            {/* 背景のアニメーション */}
            {!disabled && !isGenerating && (
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            )}
            
            {/* ボタン内容 */}
            <div className="relative flex items-center gap-3">
              {isGenerating ? (
                <>
                  <RefreshCw className="animate-spin" size={24} />
                  <span>生成中...</span>
                </>
              ) : (
                <>
                  <Zap size={24} />
                  <span>{promptCount}個のプロンプトを生成</span>
                </>
              )}
            </div>
            
            {/* モードラベル */}
            {!isGenerating && (
              <span className="relative text-sm opacity-90 ml-2 px-2 py-0.5 bg-white/20 rounded-md">
                {getModeLabel()}
              </span>
            )}
          </button>
        </div>
        
        {/* プログレスバー（生成中の場合） */}
        {isGenerating && (
          <div className="mt-4 max-w-md mx-auto">
            <div className="h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full animate-pulse" 
                   style={{ width: '100%', animation: 'slide 1.5s ease-in-out infinite' }} />
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
};

export default GenerateButton;