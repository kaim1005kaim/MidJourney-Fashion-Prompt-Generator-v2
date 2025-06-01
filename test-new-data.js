// 新しいデータセットのテスト用スクリプト
import { fashionContext } from './src/data/initialData.js';

console.log('=== 新しいデータセットの確認 ===');
console.log(`Materials: ${fashionContext.materials.length}種類`);
console.log(`Silhouettes: ${fashionContext.silhouettes.length}種類`);
console.log(`StyleTrends: ${fashionContext.styleTrends.length}種類`);

console.log('\n=== 素材サンプル ===');
fashionContext.materials.slice(0, 3).forEach(material => {
  console.log(`${material.name}: ${material.description.substring(0, 50)}...`);
  console.log(`  季節: ${material.season.join(', ')}`);
  console.log(`  フォーマリティ: ${material.formality.join(', ')}`);
  console.log('');
});

console.log('=== シルエットサンプル ===');
fashionContext.silhouettes.slice(0, 3).forEach(silhouette => {
  console.log(`${silhouette.name}: ${silhouette.description.substring(0, 50)}...`);
  console.log(`  対象体型: ${silhouette.bodyTypes.join(', ')}`);
  console.log(`  シーン: ${silhouette.occasions.join(', ')}`);
  console.log('');
});

console.log('=== トレンドサンプル ===');
fashionContext.styleTrends.slice(0, 3).forEach(trend => {
  console.log(`${trend.name}: ${trend.description.substring(0, 50)}...`);
  console.log(`  人気度: ${trend.popularity}%`);
  console.log(`  ムード: ${trend.mood.join(', ')}`);
  console.log('');
});
