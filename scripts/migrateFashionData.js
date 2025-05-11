// scripts/migrateFashionData.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESモジュールで__dirnameを取得するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// パス設定
const rootDir = path.resolve(__dirname, '../..');
const sourceFile = path.join(rootDir, 'fashion-database.json');
const targetDir = path.join(rootDir, 'public');
const targetFile = path.join(targetDir, 'fashion-database.json');

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

// ファイルをコピー
try {
  const data = fs.readFileSync(sourceFile, 'utf8');
  fs.writeFileSync(targetFile, data, 'utf8');
  console.log(`Successfully copied data from ${sourceFile} to ${targetFile}`);
} catch (error) {
  console.error('Error during file migration:', error);
  process.exit(1);
}

// データの検証
try {
  const data = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
  console.log(`Data validation successful. Found ${data.brands.length} brands.`);
  console.log(`Found ${Object.keys(data.phrase_variations).length} phrase variation categories.`);
} catch (error) {
  console.error('Error validating migrated data:', error);
  process.exit(1);
}

// DBチャンク処理用のディレクトリを確認
const dbChunksDir = path.join(targetDir, 'db-chunks');
if (!fs.existsSync(dbChunksDir)) {
  fs.mkdirSync(dbChunksDir, { recursive: true });
  console.log(`Created directory: ${dbChunksDir}`);
}

// DBチャンクファイルを確認し、なければ空のファイルを作成
const metadataFile = path.join(dbChunksDir, 'db-metadata.json');
const chunksFile = path.join(dbChunksDir, 'brands-chunk-1.json');

// 簡易メタデータの作成（既存のファイルが存在しない場合）
if (!fs.existsSync(metadataFile)) {
  try {
    const data = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    const brands = data.brands || [];
    
    const metadataContent = {
      totalBrands: brands.length,
      totalChunks: 1,
      brandsPerChunk: brands.length,
      lastUpdated: new Date().toISOString(),
      chunks: [{
        id: 1,
        filename: 'brands-chunk-1.json',
        brandCount: brands.length,
        brandIds: brands.map(b => b.brand_id),
        brandNames: brands.map(b => b.brand_name)
      }]
    };
    
    fs.writeFileSync(metadataFile, JSON.stringify(metadataContent, null, 2), 'utf8');
    console.log(`Created metadata file: ${metadataFile}`);
    
    // 最初のチャンクファイルも作成
    const chunkContent = {
      chunk_id: 1,
      total_chunks: 1,
      brands: brands,
      phrase_variations: data.phrase_variations || {}
    };
    
    fs.writeFileSync(chunksFile, JSON.stringify(chunkContent, null, 2), 'utf8');
    console.log(`Created chunk file: ${chunksFile}`);
  } catch (error) {
    console.error('Error creating DB chunks:', error);
  }
}

console.log('Data migration completed successfully!');
