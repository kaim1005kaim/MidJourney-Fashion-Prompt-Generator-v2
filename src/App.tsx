// App.tsx
import React from 'react';
import PromptGenerator from './components/PromptGenerator';
import './index.css';

function App() {
  return (
    <div className="app min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
      <PromptGenerator />
      
      {/* フッター */}
      <footer className="mt-10 pb-6 text-center text-gray-500 dark:text-gray-400 text-sm">
        <p>MidJourney Fashion Prompt Generator v2.0 &copy; {new Date().getFullYear()}</p>
        <p className="mt-1">
          素材・シルエット・トレンドベースのファッションプロンプト生成ツール
        </p>
        <p className="mt-1 text-xs opacity-75">
          ニット・デニム・Tシャツから韓国風・Y2K・サステナブルまで、多彩なスタイルを組み合わせ
        </p>
      </footer>
    </div>
  );
}

export default App;
