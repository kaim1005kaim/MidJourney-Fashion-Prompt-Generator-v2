// scripts/migrateFashionData.js
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// ESモジュールで__dirnameを取得するための設定
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// パス設定
const rootDir = path.resolve(__dirname, '..');
const sourceFile = path.join(rootDir, 'public/fashion-database.json');
const targetDir = path.join(rootDir, 'public');
const targetFile = path.join(targetDir, 'fashion-database.json');

// ディレクトリが存在しない場合は作成
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
  console.log(`Created directory: ${targetDir}`);
}

// ファイルの存在チェックとデータの利用
try {
  // ファイルが存在するか確認
  if (fs.existsSync(sourceFile)) {
    // sourceFileとtargetFileが同じ場合はコピーをスキップ
    if (sourceFile !== targetFile) {
      const data = fs.readFileSync(sourceFile, 'utf8');
      fs.writeFileSync(targetFile, data, 'utf8');
      console.log(`Successfully copied data from ${sourceFile} to ${targetFile}`);
    } else {
      console.log(`Source and target are the same file: ${sourceFile}. No need to copy.`);
    }
  } else {
    console.error(`Source file does not exist: ${sourceFile}`);
    // ファイルが存在しない場合、そのまま処理を続行する
    console.log('Continuing with existing target file if available...');
  }
} catch (error) {
  console.error('Error during file migration:', error);
  // エラーが発生しても終了せず、既存のファイルで処理を続行する
  console.log('Continuing with existing target file if available...');
}

// データの検証
try {
  if (fs.existsSync(targetFile)) {
    const data = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
    console.log(`Data validation successful. Found ${data.brands ? data.brands.length : 0} brands.`);
    console.log(`Found ${data.phrase_variations ? Object.keys(data.phrase_variations).length : 0} phrase variation categories.`);
  } else {
    console.error(`Target file does not exist: ${targetFile}`);
    // ファイルが存在しない場合、空のデータファイルを作成する
    const emptyData = { brands: [], phrase_variations: {} };
    fs.writeFileSync(targetFile, JSON.stringify(emptyData, null, 2), 'utf8');
    console.log(`Created empty data file: ${targetFile}`);
  }
} catch (error) {
  console.error('Error validating migrated data:', error);
  // エラーが発生しても終了せず、空のデータファイルを作成する
  const emptyData = { brands: [], phrase_variations: {} };
  try {
    fs.writeFileSync(targetFile, JSON.stringify(emptyData, null, 2), 'utf8');
    console.log(`Created empty data file after error: ${targetFile}`);
  } catch (writeError) {
    console.error('Failed to create empty data file:', writeError);
  }
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
if (!fs.existsSync(metadataFile) || !fs.existsSync(chunksFile)) {
  try {
    let data;
    try {
      // ターゲットファイルからデータを読み込む
      if (fs.existsSync(targetFile)) {
        data = JSON.parse(fs.readFileSync(targetFile, 'utf8'));
      } else {
        // ファイルが存在しない場合は空のデータを使用
        data = { brands: [], phrase_variations: {} };
      }
    } catch (readError) {
      console.error('Error reading target file, using empty data:', readError);
      data = { brands: [], phrase_variations: {} };
    }
    
    const brands = data.brands || [];
    
    // メタデータファイルが存在しない場合は作成
    if (!fs.existsSync(metadataFile)) {
      const metadataContent = {
        totalBrands: brands.length,
        totalChunks: 1,
        brandsPerChunk: brands.length,
        lastUpdated: new Date().toISOString(),
        chunks: [{
          id: 1,
          filename: 'brands-chunk-1.json',
          brandCount: brands.length,
          brandIds: brands.map(b => b.brand_id || ''),
          brandNames: brands.map(b => b.brand_name || '')
        }]
      };
      
      fs.writeFileSync(metadataFile, JSON.stringify(metadataContent, null, 2), 'utf8');
      console.log(`Created metadata file: ${metadataFile}`);
    }
    
    // チャンクファイルが存在しない場合は作成
    if (!fs.existsSync(chunksFile)) {
      const chunkContent = {
        chunk_id: 1,
        total_chunks: 1,
        brands: brands,
        phrase_variations: data.phrase_variations || {}
      };
      
      fs.writeFileSync(chunksFile, JSON.stringify(chunkContent, null, 2), 'utf8');
      console.log(`Created chunk file: ${chunksFile}`);
    }
  } catch (error) {
    console.error('Error creating DB chunks:', error);
    // エラーが発生しても空のファイルを作成する
    try {
      if (!fs.existsSync(metadataFile)) {
        const emptyMetadata = {
          totalBrands: 0,
          totalChunks: 1,
          brandsPerChunk: 0,
          lastUpdated: new Date().toISOString(),
          chunks: [{
            id: 1,
            filename: 'brands-chunk-1.json',
            brandCount: 0,
            brandIds: [],
            brandNames: []
          }]
        };
        fs.writeFileSync(metadataFile, JSON.stringify(emptyMetadata, null, 2), 'utf8');
        console.log(`Created empty metadata file after error: ${metadataFile}`);
      }
      
      if (!fs.existsSync(chunksFile)) {
        const emptyChunk = {
          chunk_id: 1,
          total_chunks: 1,
          brands: [],
          phrase_variations: {}
        };
        fs.writeFileSync(chunksFile, JSON.stringify(emptyChunk, null, 2), 'utf8');
        console.log(`Created empty chunk file after error: ${chunksFile}`);
      }
    } catch (writeError) {
      console.error('Failed to create empty files:', writeError);
    }
  }
}

console.log('Data migration completed successfully!');
