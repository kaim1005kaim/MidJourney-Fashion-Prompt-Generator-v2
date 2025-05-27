import React, { useState, useEffect } from 'react';
import { 
  getDatabaseStatus, 
  loadInitialData,
  resetDatabase
} from '../../services/dataService';

interface DatabaseManagerProps {
  onDataUpdate: () => void;
}

const DatabaseManager: React.FC<DatabaseManagerProps> = ({ onDataUpdate }) => {
  const [status, setStatus] = useState<{
    totalBrands: number;
    loadedBrands: number;
    lastUpdated: string;
  } | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  // データベース状態の読み込み
  const loadStatus = async () => {
    try {
      const dbStatus = await getDatabaseStatus();
      setStatus({
        totalBrands: dbStatus.totalBrands,
        loadedBrands: dbStatus.loadedBrands,
        lastUpdated: dbStatus.lastUpdated
      });
    } catch (error) {
      console.error('データベース状態の取得エラー:', error);
      setMessage('データベース状態の取得に失敗しました');
    }
  };
  
  // 初期読み込み
  useEffect(() => {
    loadStatus();
  }, []);
  
  // データベースを再読み込み
  const handleReloadData = async () => {
    if (loading) return;
    
    setLoading(true);
    setMessage('データベースを再読み込み中...');
    
    try {
      // データをリセットしてから再読み込み
      resetDatabase();
      await loadInitialData();
      await loadStatus();
      onDataUpdate();
      setMessage('データベースを再読み込みしました');
    } catch (error) {
      console.error('データ再読み込みエラー:', error);
      setMessage('データベースの再読み込みに失敗しました');
    } finally {
      setLoading(false);
    }
  };
  
  // データベースをリセット
  const handleResetDatabase = async () => {
    if (loading) return;
    
    if (!window.confirm('データベースをリセットしますか？データが再読み込みされます。')) {
      return;
    }
    
    setLoading(true);
    setMessage('データベースをリセット中...');
    
    try {
      resetDatabase();
      await loadInitialData();
      await loadStatus();
      onDataUpdate();
      setMessage('データベースをリセットしました');
    } catch (error) {
      console.error('データベースリセットエラー:', error);
      setMessage('データベースのリセットに失敗しました');
    } finally {
      setLoading(false);
    }
  };
  
  // ステータスが取得できていない場合
  if (!status) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
          データベース管理
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          データベース情報を読み込み中...
        </p>
      </div>
    );
  }
  
  // パーセンテージ計算（安全に）
  const percentage = status.totalBrands > 0 ? 
    Math.round((status.loadedBrands / status.totalBrands) * 100) : 0;
  
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mb-4">
      <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
        データベース管理
      </h2>
      
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">ブランド：</span> 
          {status.loadedBrands} 件読み込み済み ({percentage}%)
        </p>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium">最終更新：</span> 
          {new Date(status.lastUpdated).toLocaleString()}
        </p>
      </div>
      
      {message && (
        <div className={`text-sm p-2 mb-3 rounded ${
          message.includes('失敗') 
            ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' 
            : 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
        }`}>
          {message}
        </div>
      )}
      
      <div className="flex flex-wrap gap-2">
        {/* データ再読み込みボタン */}
        <button
          onClick={handleReloadData}
          disabled={loading}
          className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded disabled:opacity-50"
        >
          {loading ? '読み込み中...' : 'データ再読み込み'}
        </button>
        
        {/* データベースリセットボタン */}
        <button
          onClick={handleResetDatabase}
          disabled={loading}
          className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded disabled:opacity-50"
        >
          リセット
        </button>
      </div>
    </div>
  );
};

export default DatabaseManager;