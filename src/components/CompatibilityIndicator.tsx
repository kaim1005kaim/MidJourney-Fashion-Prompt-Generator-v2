import React from 'react';

interface CompatibilityIndicatorProps {
  compatibility: {
    compatible: boolean;
    suggestions: string[];
    issues: string[];
  };
  darkMode: boolean;
}

const CompatibilityIndicator: React.FC<CompatibilityIndicatorProps> = ({
  compatibility,
  darkMode
}) => {
  const { compatible, suggestions, issues } = compatibility;

  return (
    <div className={`mt-4 p-4 rounded-lg border ${
      compatible
        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
        : 'border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20'
    }`}>
      <div className="flex items-center gap-2 mb-2">
        {compatible ? (
          <div className="flex items-center text-green-600 dark:text-green-400">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">互換性良好</span>
          </div>
        ) : (
          <div className="flex items-center text-yellow-600 dark:text-yellow-400">
            <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <span className="font-medium">注意が必要</span>
          </div>
        )}
      </div>

      {/* 問題点の表示 */}
      {issues.length > 0 && (
        <div className="mb-3">
          <h4 className="text-sm font-medium text-red-600 dark:text-red-400 mb-1">
            問題点:
          </h4>
          <ul className="text-sm space-y-1">
            {issues.map((issue, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-red-500 mt-0.5">•</span>
                <span className="text-red-700 dark:text-red-300">{issue}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 提案の表示 */}
      {suggestions.length > 0 && (
        <div>
          <h4 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-1">
            提案:
          </h4>
          <ul className="text-sm space-y-1">
            {suggestions.map((suggestion, index) => (
              <li key={index} className="flex items-start gap-1">
                <span className="text-blue-500 mt-0.5">•</span>
                <span className="text-blue-700 dark:text-blue-300">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* 互換性が良好な場合のメッセージ */}
      {compatible && issues.length === 0 && suggestions.length === 0 && (
        <p className="text-sm text-green-700 dark:text-green-300">
          選択された要素の組み合わせは調和が取れており、美しいファッションプロンプトが期待できます。
        </p>
      )}
    </div>
  );
};

export default CompatibilityIndicator;
