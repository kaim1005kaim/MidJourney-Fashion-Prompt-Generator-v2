// test/elementBasedPromptTest.js
import { generateElementBasedPrompt, checkElementCompatibility } from '../src/services/elementBasedPromptService.js';
import { fashionContext } from '../src/data/initialData.js';

// テスト用の設定
const testSettings = {
  darkMode: false,
  promptCount: 3,
  includeAspectRatio: true,
  aspectRatio: '--ar 3:4',
  includeVersion: true,
  version: '--v 6.1',
  includeStylize: false,
  stylize: '100',
  customSuffix: '',
  includeEthnicity: true,
  ethnicity: 'ランダム',
  includeGender: true,
  gender: 'ランダム',
  generationMode: 'elements',
  includeSeasonalConsistency: true,
  includeColorHarmony: true,
  creativityLevel: 'balanced'
};

// テスト実行
console.log('=== ファッション要素ベースプロンプト生成テスト ===\n');

try {
  // 1. 基本的なプロンプト生成テスト
  console.log('1. 基本プロンプト生成:');
  const prompt = generateElementBasedPrompt(testSettings);
  console.log('生成されたプロンプト:', prompt.fullPrompt);
  console.log('使用された要素:');
  console.log('- 素材:', prompt.selectedMaterial?.name);
  console.log('- シルエット:', prompt.selectedSilhouette?.name);
  console.log('- トレンド:', prompt.selectedStyleTrend?.name);
  console.log('');

  // 2. 互換性チェックテスト
  console.log('2. 互換性チェック:');
  if (prompt.selectedMaterial && prompt.selectedSilhouette && prompt.selectedStyleTrend) {
    const compatibility = checkElementCompatibility(
      prompt.selectedMaterial.id,
      prompt.selectedSilhouette.id,
      prompt.selectedStyleTrend.id
    );
    console.log('互換性:', compatibility.compatible ? '良好' : '要注意');
    if (compatibility.issues.length > 0) {
      console.log('問題点:', compatibility.issues);
    }
    if (compatibility.suggestions.length > 0) {
      console.log('提案:', compatibility.suggestions);
    }
  }
  console.log('');

  // 3. 創造性レベル別テスト
  console.log('3. 創造性レベル別テスト:');
  const creativityLevels = ['conservative', 'balanced', 'experimental'];
  creativityLevels.forEach(level => {
    const settingsWithLevel = { ...testSettings, creativityLevel: level };
    const prompt = generateElementBasedPrompt(settingsWithLevel);
    console.log(`${level}:`, prompt.fullPrompt.substring(0, 100) + '...');
  });
  console.log('');

  // 4. 統計情報
  console.log('4. データベース統計:');
  console.log('- 利用可能な素材数:', fashionContext.materials.length);
  console.log('- 利用可能なシルエット数:', fashionContext.silhouettes.length);
  console.log('- 利用可能なトレンド数:', fashionContext.styleTrends.length);
  console.log('');

  console.log('✅ すべてのテストが正常に完了しました！');

} catch (error) {
  console.error('❌ テスト中にエラーが発生しました:', error);
}
