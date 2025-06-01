// 素材データ
export const materials = [
  // --- 既存データの変換と拡充 ---
  {
    id: "cashmere-knit", // 既存ID: knit_cashmere
    name: "カシミアニット",
    description: "カシミアヤギの毛から作られる高級ニット素材。非常に柔らかく軽量で、優れた保温性を持つ。上品な光沢も特徴。",
    keywords: ["cashmere", "knit", "luxury", "soft", "warm", "lightweight", "premium", "fine"],
    season: ["autumn", "winter"],
    formality: ["casual", "business", "formal"], // 既存: all
    compatibility: ["silk", "fine-wool", "satin", "lambskin-leather"], // 指示書に基づき「他の素材名」に変更
    texture: "soft", // 既存: ['soft', 'smooth', 'fine'] から代表的なもの
    weight: "lightweight",
    care: ["hand-wash", "dry-clean"],
    sustainability: "medium", // カシミアの生産背景を考慮
    priceRange: "luxury"
  },
  {
    id: "wool-knit", // 既存ID: knit_wool
    name: "ウールニット",
    description: "羊毛を編んで作られる保温性の高いニット素材。ケーブル編みやチャンキーニットなど多様な表情がある。",
    keywords: ["wool", "knit", "warm", "natural", "versatile", "chunky", "cable-knit"],
    season: ["autumn", "winter"],
    formality: ["casual", "business_casual"], // 既存: all
    compatibility: ["denim", "corduroy", "cotton", "leather"],
    texture: "textured", // 既存: ['textured', 'chunky', 'cable-knit']
    weight: "medium",
    care: ["hand-wash", "dry-clean", "machine-wash-wool-cycle"],
    sustainability: "medium", // 羊毛の生産方法による
    priceRange: "mid-range"
  },
  {
    id: "cotton-knit", // 既存ID: knit_cotton
    name: "コットンニット",
    description: "綿を編んで作られるニット素材。通気性が良く、肌触りが柔らかい。春夏に適している。",
    keywords: ["cotton", "knit", "breathable", "casual", "soft", "lightweight"],
    season: ["spring", "summer", "early_autumn"],
    formality: ["casual"],
    compatibility: ["linen", "denim", "jersey", "ramie"],
    texture: "smooth", // 既存: ['smooth', 'breathable', 'soft']
    weight: "lightweight",
    care: ["machine-wash", "tumble-dry-low"],
    sustainability: "medium", // 通常のコットン
    priceRange: "budget"
  },
  {
    id: "mohair-knit", // 既存ID: knit_mohair
    name: "モヘアニット",
    description: "アンゴラヤギの毛から作られる、光沢があり毛足の長いニット素材。ふわふわとした質感が特徴的。",
    keywords: ["mohair", "knit", "fluffy", "fuzzy", "texture", "statement", "lustrous"],
    season: ["autumn", "winter"],
    formality: ["casual", "semi-formal"], // 既存: casual
    compatibility: ["silk", "satin", "velvet", "fine-wool"],
    texture: "fuzzy", // 既存: ['fuzzy', 'fluffy', 'textured']
    weight: "lightweight",
    care: ["dry-clean", "hand-wash-gentle"],
    sustainability: "medium",
    priceRange: "mid-range"
  },
  {
    id: "raw-denim", // 既存ID: denim_raw
    name: "ローデニム",
    description: "未洗いの硬質なデニム生地。穿き込むことで体に馴染み、独特の色落ち（アタリ）が楽しめる。",
    keywords: ["denim", "raw", "selvedge", "sturdy", "classic", "indigo", "unwashed"],
    season: ["spring", "summer", "autumn", "winter"],
    formality: ["casual", "streetwear"], // 既存: casual
    compatibility: ["cotton-jersey", "chambray", "flannel", "leather"],
    texture: "rough", // 既存: ['rough', 'sturdy', 'structured']
    weight: "heavy",
    care: ["machine-wash-cold-inside-out", "hang-dry", "minimal-washing"],
    sustainability: "medium", // 耐久性は高いが染色工程に注意
    priceRange: "mid-range"
  },
  {
    id: "distressed-denim", // 既存ID: denim_distressed
    name: "ダメージデニム",
    description: "意図的に破れや色落ち、擦り切れなどの加工を施したデニム。エッジの効いたカジュアルスタイルに用いられる。",
    keywords: ["denim", "distressed", "ripped", "faded", "edgy", "street", "worn"],
    season: ["spring", "summer", "autumn"],
    formality: ["casual", "streetwear"],
    compatibility: ["cotton-jersey", "leather", "flannel", "band-tees"],
    texture: "worn", // 既存: ['worn', 'distressed', 'faded']
    weight: "medium",
    care: ["machine-wash-cold-gentle", "hang-dry"],
    sustainability: "low", // 加工が多い
    priceRange: "mid-range"
  },
  {
    id: "black-denim", // 既存ID: denim_black
    name: "ブラックデニム",
    description: "黒色に染められたデニム生地。シックでモダンな印象を与え、幅広いスタイルに合わせやすい。",
    keywords: ["denim", "black", "sleek", "modern", "dark-wash", "versatile"],
    season: ["spring", "summer", "autumn", "winter"], // 既存: autumn, winter のみだったがallに変更
    formality: ["casual", "business_casual", "streetwear"], // 既存: business
    compatibility: ["cotton", "leather", "silk", "poplin"],
    texture: "smooth", // 既存: ['smooth', 'sleek', 'structured']
    weight: "medium",
    care: ["machine-wash-cold-inside-out", "hang-dry-to-preserve-color"],
    sustainability: "medium",
    priceRange: "mid-range"
  },
  {
    id: "organic-cotton", // 既存ID: cotton_organic
    name: "オーガニックコットン",
    description: "農薬や化学肥料を3年以上使用しない畑で栽培された綿花。環境負荷が少なく、肌にも優しい。",
    keywords: ["cotton", "organic", "sustainable", "soft", "natural", "breathable", "eco-friendly"],
    season: ["spring", "summer", "autumn"], // 既存: spring, summer
    formality: ["casual", "loungewear"], // 既存: casual
    compatibility: ["linen", "tencel", "bamboo-fabric", "hemp"],
    texture: "soft", // 既存: ['soft', 'natural', 'breathable']
    weight: "lightweight",
    care: ["machine-wash", "tumble-dry-low"],
    sustainability: "high",
    priceRange: "mid-range"
  },
  {
    id: "vintage-cotton", // 既存ID: cotton_vintage
    name: "ヴィンテージコットン",
    description: "経年変化により柔らかく、風合いが増したコットン素材。独特のフェード感やこなれた雰囲気が特徴。",
    keywords: ["cotton", "vintage", "worn-in", "retro", "faded", "soft", "secondhand-feel"],
    season: ["spring", "summer", "autumn", "winter"], // 既存: spring, summer
    formality: ["casual", "streetwear"], // 既存: casual
    compatibility: ["denim", "corduroy", "flannel", "aged-leather"],
    texture: "worn", // 既存: ['worn', 'soft', 'faded']
    weight: "lightweight",
    care: ["machine-wash-gentle", "hang-dry"],
    sustainability: "high", // リユースやアップサイクルされたもの
    priceRange: "mid-range"
  },
  {
    id: "silk-charmeuse", // 既存ID: silk_charmeuse
    name: "シルクシャルムーズ",
    description: "片面が特に光沢のあるサテン織りのシルク生地。滑らかで流れるようなドレープ性が特徴で、高級感がある。",
    keywords: ["silk", "charmeuse", "luxury", "lustrous", "flowing", "drape", "satin-finish"],
    season: ["spring", "summer", "autumn"], // 既存: spring, summer
    formality: ["formal", "evening_wear", "lingerie"], // 既存: formal
    compatibility: ["lace", "velvet", "fine-wool", "cashmere-knit"],
    texture: "smooth", // 既存: ['smooth', 'lustrous', 'flowing']
    weight: "lightweight",
    care: ["dry-clean", "hand-wash-cold-gentle"],
    sustainability: "low", // シルク生産の環境負荷
    priceRange: "luxury"
  },
  {
    id: "lambskin-leather", // 既存ID: leather_lambskin
    name: "ラムスキンレザー",
    description: "子羊の皮から作られる非常に柔らかく滑らかな革。高級衣料や手袋などに用いられる。",
    keywords: ["leather", "lambskin", "soft", "luxury", "supple", "buttery", "premium-leather"],
    season: ["autumn", "winter", "spring"],
    formality: ["casual", "business_casual", "luxury_streetwear", "semi-formal"], // 既存: all
    compatibility: ["wool-knit", "cashmere-knit", "silk", "denim"],
    texture: "smooth", // 既存: ['smooth', 'supple', 'soft']
    weight: "medium",
    care: ["professional-leather-clean", "spot-clean-with-damp-cloth"],
    sustainability: "low", // 動物由来、なめし工程
    priceRange: "ultra-luxury"
  },
  {
    id: "ripstop-nylon", // 既存ID: nylon_ripstop
    name: "リップストップナイロン",
    description: "格子状に太いナイロン繊維を織り込むことで、裂け（rip）にくくした（stop）生地。軽量で耐久性、撥水性に優れる。",
    keywords: ["nylon", "ripstop", "technical", "durable", "lightweight", "water-resistant", "outdoor"],
    season: ["spring", "summer", "autumn"],
    formality: ["casual", "streetwear", "sportswear", "technical_outerwear"], // 既存: streetwear
    compatibility: ["fleece", "mesh", "technical-cotton", "performance-fabrics"],
    texture: "smooth", // 既存: ['smooth', 'technical', 'crisp'] (crispは表現として残しても良い)
    weight: "lightweight",
    care: ["machine-wash-cold", "hang-dry"],
    sustainability: "low", // 石油由来
    priceRange: "mid-range"
  },

  // --- 新規追加素材 ---
  // 高級素材
  {
    id: "angora-knit",
    name: "アンゴラニット",
    description: "アンゴラウサギの毛から作られる非常に柔らかく、ふわふわとした毛足の長いニット素材。保温性が高く軽量。",
    keywords: ["angora", "knit", "luxury", "soft", "fluffy", "warm", "lightweight", "hairy"],
    season: ["autumn", "winter"],
    formality: ["casual", "semi-formal"],
    compatibility: ["silk", "fine-wool", "cashmere-knit", "satin"],
    texture: "fluffy",
    weight: "lightweight",
    care: ["dry-clean", "hand-wash-very-gentle"],
    sustainability: "low", // 動物福祉の懸念
    priceRange: "luxury"
  },
  {
    id: "silk-twill",
    name: "シルクツイル",
    description: "綾織りのシルク生地で、独特の光沢としなやかさ、斜めの織り模様が特徴。スカーフや高級ブラウス、ドレスなどに用いられる。",
    keywords: ["silk", "twill", "luxury", "lustrous", "smooth", "drape", "diagonal-weave"],
    season: ["spring", "summer", "autumn", "winter"],
    formality: ["business", "formal", "black-tie"],
    compatibility: ["cashmere-knit", "fine-wool", "lace", "velvet"],
    texture: "smooth",
    weight: "lightweight",
    care: ["dry-clean"],
    sustainability: "low",
    priceRange: "luxury"
  },
  {
    id: "satin",
    name: "サテン",
    description: "朱子織りの生地で、表面が非常に滑らかで強い光沢を持つ。シルク、ポリエステル、アセテートなどで作られる。",
    keywords: ["satin", "lustrous", "smooth", "glossy", "elegant", "flowing", "evening-wear"],
    season: ["spring", "summer", "autumn", "winter"], // 用途による
    formality: ["formal", "evening_wear", "lingerie", "semi-formal"],
    compatibility: ["lace", "velvet", "silk-charmeuse", "sequins"],
    texture: "glossy",
    weight: "lightweight", // or medium
    care: ["dry-clean", "hand-wash-cold-gentle"], // 素材による
    sustainability: "low", // シルクやポリエステルなど原料による
    priceRange: "mid-range" // (ポリエステルサテン) to luxury (シルクサテン)
  },
  {
    id: "lace",
    name: "レース",
    description: "透かし模様が特徴の繊細な生地。リバーレース、シャンティレースなど様々な種類があり、装飾的効果が高い。",
    keywords: ["lace", "delicate", "transparent", "ornamental", "romantic", "feminine", "intricate"],
    season: ["spring", "summer", "autumn", "winter"], // アクセントとして
    formality: ["formal", "evening_wear", "bridal", "lingerie", "semi-formal"],
    compatibility: ["silk", "satin", "velvet", "tulle", "cotton-voile"],
    texture: "textured",
    weight: "lightweight",
    care: ["hand-wash-cold-gentle", "dry-clean"],
    sustainability: "low", // 製造工程
    priceRange: "mid-range" // to luxury
  },
  // 機能性素材
  {
    id: "gore-tex",
    name: "ゴアテックス",
    description: "防水性、透湿性、防風性に優れた高機能素材。アウトドアウェアやテクニカルアウターに広く使用される。",
    keywords: ["gore-tex", "waterproof", "breathable", "windproof", "technical", "outdoor", "performance"],
    season: ["spring", "autumn", "winter"],
    formality: ["sportswear", "technical_outerwear", "casual"],
    compatibility: ["fleece", "ripstop-nylon", "merino-wool", "softshell"],
    texture: "smooth", // or slightly textured
    weight: "medium",
    care: ["machine-wash-warm-gentle", "tumble-dry-medium", "special-detergent-recommended"],
    sustainability: "low", // フッ素化合物使用のため議論あり
    priceRange: "luxury"
  },
  {
    id: "neoprene",
    name: "ネオプレン",
    description: "合成ゴムの一種で、伸縮性、保温性、耐水性に優れる。ウェットスーツの他、ファッションアイテムにも使われる。",
    keywords: ["neoprene", "synthetic-rubber", "stretch", "insulating", "water-resistant", "scuba", "structured"],
    season: ["spring", "autumn", "winter"], // 用途による
    formality: ["sportswear", "streetwear", "avant-garde"],
    compatibility: ["lycra", "mesh", "technical-fabrics", "jersey"],
    texture: "smooth", // or rubbery
    weight: "medium", // or heavy
    care: ["hand-wash-cold", "hang-dry-away-from-sunlight"],
    sustainability: "low", // 石油由来、リサイクル難しい
    priceRange: "mid-range"
  },
  {
    id: "merino-wool",
    name: "メリノウール",
    description: "メリノ種の羊から採れる高品質なウール。繊維が細く、肌触りが柔らかで、保温性と通気性に優れる。",
    keywords: ["merino-wool", "wool", "soft", "fine", "breathable", "thermoregulating", "performance", "natural"],
    season: ["spring", "autumn", "winter"],
    formality: ["casual", "sportswear", "business_casual"],
    compatibility: ["cotton", "silk", "cashmere-knit", "performance-fabrics"],
    texture: "soft",
    weight: "lightweight", // or medium
    care: ["machine-wash-wool-cycle-cold", "lay-flat-to-dry"],
    sustainability: "medium", // 適切な飼育方法なら比較的高め
    priceRange: "mid-range" // to luxury
  },
  {
    id: "bamboo-fabric",
    name: "バンブー（竹）素材",
    description: "竹の繊維から作られる再生セルロース繊維。柔らかく、通気性、吸湿性に優れ、抗菌性もあるとされる。",
    keywords: ["bamboo", "rayon", "sustainable-alternative", "soft", "breathable", "hypoallergenic", "eco-friendly-potential"],
    season: ["spring", "summer"],
    formality: ["casual", "loungewear", "sportswear"],
    compatibility: ["organic-cotton", "tencel", "linen", "jersey"],
    texture: "smooth",
    weight: "lightweight",
    care: ["machine-wash-cold-gentle", "hang-dry"],
    sustainability: "medium", // 成長は早いが化学処理が必要な場合も
    priceRange: "mid-range"
  },
  // エコ素材
  {
    id: "tencel-lyocell",
    name: "テンセル™（リヨセル）",
    description: "ユーカリなどの木材パルプから作られる再生セルロース繊維。環境負荷の少ない製法で、柔らかくドレープ性がある。",
    keywords: ["tencel", "lyocell", "sustainable", "eco-friendly", "soft", "drapey", "breathable", "cellulose-fiber"],
    season: ["spring", "summer", "autumn"],
    formality: ["casual", "business_casual", "loungewear"],
    compatibility: ["organic-cotton", "linen", "silk", "rayon"],
    texture: "smooth",
    weight: "lightweight", // or medium
    care: ["machine-wash-cold-gentle", "hang-dry", "iron-low-heat"],
    sustainability: "high", // クローズドループ製法
    priceRange: "mid-range"
  },
  {
    id: "recycled-polyester",
    name: "リサイクルポリエステル",
    description: "使用済みのペットボトルなどを原料として再生されたポリエステル繊維。バージンポリエステルに比べ環境負荷が低い。",
    keywords: ["recycled-polyester", "sustainable", "eco-friendly", "durable", "synthetic", "rPET"],
    season: ["spring", "summer", "autumn", "winter"], // 用途による
    formality: ["casual", "sportswear", "outerwear"],
    compatibility: ["organic-cotton", "fleece", "nylon", "spandex"],
    texture: "smooth", // or other polyester textures
    weight: "medium", // or lightweight
    care: ["machine-wash", "tumble-dry-low"],
    sustainability: "medium", // リサイクルだがマイクロプラスチック問題あり
    priceRange: "budget" // to mid-range
  },
  {
    id: "linen",
    name: "リネン（亜麻）",
    description: "亜麻の繊維から作られる天然素材。通気性、吸湿性に優れ、丈夫で独特のシャリ感がある。夏に適している。",
    keywords: ["linen", "natural", "breathable", "durable", "summer-fabric", "crisp", "sustainable-potential"],
    season: ["spring", "summer"],
    formality: ["casual", "resort-wear", "business_casual"],
    compatibility: ["cotton", "ramie", "viscose", "silk-blends"],
    texture: "textured", // or crisp
    weight: "lightweight", // or medium
    care: ["machine-wash-cold-gentle", "hang-dry", "iron-damp"],
    sustainability: "high", // 栽培に農薬少なくて済む
    priceRange: "mid-range"
  },
  // テクスチャー系
  {
    id: "velvet",
    name: "ベルベット",
    description: "短い毛羽（パイル）が密集した、柔らかく光沢のある生地。ドレッシーで高級感がある。",
    keywords: ["velvet", "pile-fabric", "plush", "lustrous", "soft", "luxury", "evening-wear"],
    season: ["autumn", "winter"],
    formality: ["formal", "evening_wear", "black-tie", "semi-formal"],
    compatibility: ["silk", "satin", "lace", "chiffon", "brocade"],
    texture: "plush",
    weight: "medium", // or heavy
    care: ["dry-clean"],
    sustainability: "low", // 素材（シルク、レーヨン、ポリエステル等）による
    priceRange: "mid-range" // to luxury
  },
  {
    id: "corduroy",
    name: "コーデュロイ",
    description: "縦畝（うね）が特徴のパイル織物の一種。保温性があり、カジュアルからややフォーマルなアイテムまで使われる。",
    keywords: ["corduroy", "ribbed", "textured", "vintage-feel", "durable", "warm", "casual"],
    season: ["autumn", "winter", "early_spring"],
    formality: ["casual", "business_casual"],
    compatibility: ["denim", "flannel", "wool-knit", "cotton-twill"],
    texture: "ribbed",
    weight: "medium", // or heavy
    care: ["machine-wash-cold-inside-out", "tumble-dry-low"],
    sustainability: "medium", // 主にコットン製
    priceRange: "mid-range"
  },
  {
    id: "jacquard",
    name: "ジャカード",
    description: "ジャカード織機で作られる、複雑で立体的な紋様が織り出された生地。ブロケードやダマスクもジャカードの一種。",
    keywords: ["jacquard", "patterned", "textured", "ornamental", "brocade", "damask", "luxury"],
    season: ["autumn", "winter", "special_occasion"],
    formality: ["formal", "evening_wear", "black-tie", "statement-piece"],
    compatibility: ["silk", "velvet", "satin", "wool"],
    texture: "textured", // and patterned
    weight: "medium", // or heavy
    care: ["dry-clean"],
    sustainability: "low", // 製造工程が複雑
    priceRange: "luxury"
  },
  // 特殊素材
  {
    id: "pvc-vinyl",
    name: "PVC（ポリ塩化ビニル）",
    description: "光沢のあるプラスチック素材。防水性があり、未来的またはエッジの効いたファッションに使われる。",
    keywords: ["pvc", "vinyl", "shiny", "waterproof", "futuristic", "edgy", "fetish-inspired"],
    season: ["spring", "autumn"], // 通気性がないため注意
    formality: ["streetwear", "clubwear", "avant-garde", "statement-piece"],
    compatibility: ["mesh", "fishnet", "black-denim", "faux-leather"],
    texture: "glossy",
    weight: "medium",
    care: ["wipe-clean"],
    sustainability: "very-low",
    priceRange: "budget" // to mid-range
  },
  {
    id: "metallic-fabric",
    name: "メタリック素材",
    description: "金属のような光沢を持つ生地。ラメ糸の使用、コーティング、箔押しなどで作られ、華やかな印象を与える。",
    keywords: ["metallic", "shiny", "shimmering", "lame", "foil", "futuristic", "glamorous", "party-wear"],
    season: ["autumn", "winter", "party_season"],
    formality: ["evening_wear", "party_wear", "clubwear", "statement-piece"],
    compatibility: ["black-denim", "velvet", "satin", "leather"],
    texture: "smooth", // or textured depending on type
    weight: "lightweight", // or medium
    care: ["spot-clean", "hand-wash-gentle-inside-out"], // 素材による
    sustainability: "low",
    priceRange: "mid-range"
  },
  {
    id: "sequins",
    name: "スパンコール（シークイン）",
    description: "小さな光る円盤状の飾りが多数縫い付けられた、または接着された生地。非常に華やかで、舞台衣装やパーティードレスに使われる。",
    keywords: ["sequins", "sparkly", "shimmering", "glamorous", "party-wear", "evening-wear", "statement"],
    season: ["party_season", "evening_events"],
    formality: ["evening_wear", "black-tie", "party_wear", "performance"],
    compatibility: ["velvet", "satin", "chiffon", "mesh"],
    texture: "textured", // and sparkly
    weight: "medium", // or heavy
    care: ["spot-clean", "hand-wash-very-gentle-inside-out"],
    sustainability: "very-low", // プラスチック製が多い
    priceRange: "mid-range" // to luxury
  },
  {
    id: "faux-fur",
    name: "フェイクファー（エコファー）",
    description: "動物の毛皮を模して作られた人工素材。倫理的な観点から人気があり、様々な色や毛足のものが存在する。",
    keywords: ["faux-fur", "eco-fur", "artificial-fur", "plush", "warm", "animal-friendly", "statement"],
    season: ["autumn", "winter"],
    formality: ["casual", "streetwear", "evening_wear", "glamorous"],
    compatibility: ["leather", "denim", "satin", "knitwear"],
    texture: "plush",
    weight: "medium", // or heavy
    care: ["dry-clean", "spot-clean", "gentle-brushing"],
    sustainability: "low", // 石油由来が多いがリアルファーよりは良いとされることも
    priceRange: "mid-range"
  },
  {
    id: "patent-leather",
    name: "パテントレザー（エナメル革）",
    description: "表面をエナメル樹脂でコーティングし、強い光沢を出した革または合成皮革。ドレッシーでシャープな印象。",
    keywords: ["patent-leather", "enamel", "glossy", "shiny", "sleek", "formal", "statement-accessory"],
    season: ["autumn", "winter", "spring"], // 靴やバッグなど
    formality: ["formal", "evening_wear", "business", "chic-casual"],
    compatibility: ["wool-suiting", "velvet", "satin", "cashmere-knit"],
    texture: "glossy",
    weight: "medium",
    care: ["wipe-clean-with-soft-cloth", "special-patent-cleaner"],
    sustainability: "low", // コーティングと革/合成皮革のベースによる
    priceRange: "mid-range" // (synthetic) to luxury (real leather)
  }
  // 目標50-60種類に対し、現在 約25種類。更なる追加が可能。
];

// シルエットデータ
export const silhouettes = [
  // --- 既存データの変換と拡充 ---
  {
    id: "oversized-sweater", // 既存ID: oversized_sweater
    name: "オーバーサイズセーター",
    description: "肩が落ち、身幅や袖がゆったりとしたデザインのセーター。リラックス感があり、体型をカバーしやすい。",
    keywords: ["oversized", "sweater", "knitwear", "cozy", "relaxed", "slouchy", "comfortable"],
    bodyTypes: ["all", "apple", "rectangle"], // 既存: ['all']
    occasions: ["casual", "weekend", "loungewear", "streetwear"], // 既存: ['casual', 'weekend']
    seasons: ["autumn", "winter", "early_spring"], // 既存: winter
    eras: ["1980s", "1990s", "2010s", "contemporary"],
    compatibility: ["skinny-jeans", "leggings", "slip-dress-layered", "midi-skirt"], // 素材名ではなくアイテム/シルエット名
    formality: ["casual"],
    ageGroups: ["all", "teens", "20s", "30s", "40s", "50s+"]
  },
  {
    id: "fitted-turtleneck", // 既存ID: fitted_turtleneck
    name: "フィットタートルネック",
    description: "体に沿うようにフィットするタートルネックのトップス。首元まで暖かく、レイヤードにも適している。",
    keywords: ["fitted", "turtleneck", "sleek", "minimal", "body-conscious", "layering-piece", "classic"],
    bodyTypes: ["slim", "athletic", "hourglass", "pear"], // 既存: ['slim', 'athletic']
    occasions: ["work", "business_casual", "date", "chic_casual", "layering"], // 既存: ['work', 'date']
    seasons: ["autumn", "winter", "spring"], // 既存: winter
    eras: ["1960s", "1970s", "1990s", "contemporary"],
    compatibility: ["blazer", "a-line-skirt", "wide-leg-trousers", "high-waist-jeans"],
    formality: ["business_casual", "semi-formal", "chic_casual"], // 既存: business
    ageGroups: ["20s", "30s", "40s", "50s+"]
  },
  {
    id: "skinny-jeans", // 既存ID: skinny_jeans
    name: "スキニージーンズ",
    description: "脚のラインにぴったりとフィットする細身のジーンズ。様々なトップスと合わせやすい定番アイテム。",
    keywords: ["skinny-jeans", "fitted", "tapered-leg", "modern", "sleek", "versatile", "denim"],
    bodyTypes: ["slim", "athletic", "hourglass", "apple" /*with longer top*/], // 既存: ['slim', 'athletic']
    occasions: ["casual", "night_out", "streetwear", "daily"], // 既存: ['casual', 'night out']
    seasons: ["spring", "summer", "autumn", "winter"], // 既存: all
    eras: ["2000s", "2010s", "contemporary" /*though less dominant now*/],
    compatibility: ["oversized-sweater", "tunic-top", "blouse", "ankle-boots", "heels"],
    formality: ["casual", "smart_casual"], // 既存: casual
    ageGroups: ["teens", "20s", "30s", "40s"]
  },
  {
    id: "wide-leg-jeans", // 既存ID: wide_leg_jeans
    name: "ワイドレッグジーンズ",
    description: "腰から裾にかけて広がる、ゆったりとしたシルエットのジーンズ。リラックス感とトレンド感を兼ね備える。",
    keywords: ["wide-leg-jeans", "relaxed-fit", "flowing", "retro", "comfortable", "denim", "high-waisted-option"],
    bodyTypes: ["all", "tall", "pear", "rectangle"], // 既存: ['all']
    occasions: ["casual", "weekend", "creative_work", "streetwear"], // 既存: ['casual', 'creative']
    seasons: ["spring", "summer", "autumn", "winter"], // 既存: all
    eras: ["1970s", "1990s", "2020s", "contemporary"],
    compatibility: ["fitted-top", "crop-top", "tucked-in-shirt", "platform-shoes", "sneakers"],
    formality: ["casual", "smart_casual"], // 既存: casual
    ageGroups: ["teens", "20s", "30s", "40s", "50s+"]
  },
  {
    id: "cropped-jeans", // 既存ID: cropped_jeans
    name: "クロップドジーンズ",
    description: "足首が見える丈のジーンズ。すっきりとした印象で、靴のデザインを引き立てる。",
    keywords: ["cropped-jeans", "ankle-length", "modern-cut", "fresh", "denim", "versatile"],
    bodyTypes: ["all", "petite" /*especially good for*/, "slim", "hourglass"], // 既存: ['all']
    occasions: ["casual", "spring", "summer", "weekend", "smart_casual"], // 既存: ['casual', 'spring']
    seasons: ["spring", "summer", "early_autumn"], // 既存: spring
    eras: ["2010s", "contemporary"],
    compatibility: ["blouse", "t-shirt", "sandals", "loafers", "ankle-boots"],
    formality: ["casual", "smart_casual"], // 既存: casual
    ageGroups: ["all"]
  },
  {
    id: "oversized-tee", // 既存ID: oversized_tee
    name: "オーバーサイズTシャツ",
    description: "肩が落ち、身幅が広く、丈も長めなTシャツ。ストリート感のあるリラックスしたスタイルを作る。",
    keywords: ["oversized-tee", "relaxed-fit", "dropped-shoulders", "streetwear", "comfortable", "casual"],
    bodyTypes: ["all", "apple", "rectangle"], // 既存: ['all']
    occasions: ["casual", "streetwear", "loungewear", "weekend"], // 既存: ['casual', 'streetwear']
    seasons: ["spring", "summer", "autumn"], // 既存: summer
    eras: ["1990s", "2010s", "contemporary"],
    compatibility: ["biker-shorts", "leggings", "skinny-jeans", "denim-shorts", "sneakers"],
    formality: ["casual"],
    ageGroups: ["teens", "20s", "30s", "40s"]
  },
  {
    id: "fitted-tee", // 既存ID: fitted_tee
    name: "フィットTシャツ",
    description: "体に程よくフィットするクラシックなTシャツ。一枚でもレイヤードでも活躍する万能アイテム。",
    keywords: ["fitted-tee", "classic-cut", "body-hugging", "versatile", "clean", "basic"],
    bodyTypes: ["slim", "athletic", "hourglass"], // 既存: ['slim', 'athletic']
    occasions: ["casual", "layering", "sportswear", "daily"], // 既存: ['casual', 'layering']
    seasons: ["spring", "summer", "autumn", "winter"], // 既存: summer
    eras: ["timeless", "contemporary"],
    compatibility: ["jeans", "skirts", "shorts", "under-blazer", "cardigan"],
    formality: ["casual"],
    ageGroups: ["all"]
  },
  {
    id: "crop-top", // 既存ID: crop_top
    name: "クロップトップ",
    description: "丈が短く、お腹やウエスト部分が見えるデザインのトップス。ヘルシーで若々しい印象。",
    keywords: ["crop-top", "cropped", "midriff-baring", "short-length", "trendy", "youthful", "summer-style"],
    bodyTypes: ["slim", "athletic", "hourglass", "high-waisted-bottoms-users"], // 既存: ['slim', 'athletic']
    occasions: ["casual", "summer_events", "festivals", "night_out", "beachwear"], // 既存: ['casual', 'summer']
    seasons: ["summer", "late_spring"], // 既存: summer
    eras: ["1980s", "1990s", "2010s", "contemporary"],
    compatibility: ["high-waist-jeans", "high-waist-shorts", "midi-skirt", "wide-leg-pants"],
    formality: ["casual", "party_wear"], // 既存: casual
    ageGroups: ["teens", "20s", "early_30s"]
  },
  {
    id: "a-line-dress", // 既存ID: a_line_dress
    name: "Aラインドレス",
    description: "肩から裾にかけてアルファベットの「A」のように広がるシルエットのドレス。ウエストを強調しすぎず、多くの体型に似合う。",
    keywords: ["a-line-dress", "flared-skirt", "fitted-bodice", "classic", "feminine", "flattering", "versatile"],
    bodyTypes: ["all", "pear", "hourglass", "apple"], // 既存: ['all']
    occasions: ["work", "date", "formal_events", "weddings", "casual_chic"], // 既存: ['work', 'date', 'formal']
    seasons: ["spring", "summer", "autumn", "winter"], // 既存: all (素材による)
    eras: ["1950s", "1960s", "timeless", "contemporary"],
    compatibility: ["cardigan", "blazer", "heels", "flats", "delicate-jewelry"], // アイテム名
    formality: ["business", "semi-formal", "formal", "casual_chic"], // 既存: business
    ageGroups: ["all"]
  },
  {
    id: "slip-dress", // 既存ID: slip_dress
    name: "スリップドレス",
    description: "ランジェリーのような細いストラップとシンプルなデザインのドレス。一枚でも、レイヤードスタイルでも使える。",
    keywords: ["slip-dress", "minimalist", "flowing", "elegant", "satin-like", "lingerie-inspired", "90s-vibe"],
    bodyTypes: ["slim", "hourglass", "rectangle"], // 既存: ['slim', 'curvy']
    occasions: ["date", "evening_events", "summer_parties", "layered-casual"], // 既存: ['date', 'evening']
    seasons: ["summer", "spring", "autumn-layered"], // 既存: summer
    eras: ["1930s", "1990s", "contemporary"],
    compatibility: ["t-shirt-underneath", "oversized-sweater-over", "denim-jacket", "heels", "sneakers-for-casual"],
    formality: ["formal", "semi-formal", "casual_chic"], // 既存: formal
    ageGroups: ["20s", "30s", "40s"]
  },

  // --- 新規追加シルエット ---
  // トップス系
  {
    id: "peplum-top",
    name: "ペプラムトップ",
    description: "ウエスト部分から裾にかけてフレアが広がるデザインのトップス。女性らしいラインを強調し、体型カバー効果も期待できる。",
    keywords: ["peplum-top", "flared-waist", "feminine", "structured", "figure-flattering", "chic"],
    bodyTypes: ["hourglass", "pear", "rectangle", "apple" /* if flare starts high */],
    occasions: ["work", "business_casual", "date", "party", "semi-formal"],
    seasons: ["spring", "summer", "autumn"],
    eras: ["1940s", "1980s", "2010s", "contemporary"],
    compatibility: ["pencil-skirt", "skinny-trousers", "fitted-jeans", "heels"],
    formality: ["business_casual", "semi-formal", "smart_casual"],
    ageGroups: ["20s", "30s", "40s", "50s"]
  },
  {
    id: "asymmetric-top",
    name: "アシンメトリートップ",
    description: "左右非対称なデザインのトップス。ワンショルダートップや不規則なヘムラインなど、個性的でモダンな印象を与える。",
    keywords: ["asymmetric-top", "one-shoulder", "uneven-hem", "modern", "edgy", "statement", "unique"],
    bodyTypes: ["all" /* depends on specific design */, "rectangle", "inverted-triangle"],
    occasions: ["night_out", "party", "creative_events", "fashion-forward-casual"],
    seasons: ["spring", "summer", "autumn"],
    eras: ["1980s", "2000s", "contemporary"],
    compatibility: ["sleek-trousers", "fitted-skirt", "minimalist-bottoms", "statement-earrings"],
    formality: ["semi-formal", "smart_casual", "party_wear"],
    ageGroups: ["20s", "30s", "40s"]
  },
  // ボトムス系
  {
    id: "flare-pants",
    name: "フレアパンツ",
    description: "膝から裾にかけて大きく広がるシルエットのパンツ。脚長効果があり、70年代風のレトロなスタイルにもマッチする。",
    keywords: ["flare-pants", "bell-bottoms", "wide-flare", "leg-lengthening", "retro", "70s-vibe", "bohemian"],
    bodyTypes: ["tall", "hourglass", "pear", "rectangle"],
    occasions: ["casual", "smart_casual", "party", "retro-themed-events"],
    seasons: ["spring", "summer", "autumn", "winter"],
    eras: ["1970s", "late_1990s", "2020s", "contemporary"],
    compatibility: ["fitted-top", "tucked-in-blouse", "platform-shoes", "heeled-boots"],
    formality: ["casual", "smart_casual", "semi-formal"],
    ageGroups: ["teens", "20s", "30s", "40s", "50s+"]
  },
  {
    id: "high-waist-trousers",
    name: "ハイウエストトラウザー",
    description: "ウエストラインが高い位置に設定されたパンツ。脚を長く見せ、クラシックで洗練された印象を与える。",
    keywords: ["high-waist-trousers", "high-rise", "leg-lengthening", "classic", "sophisticated", "tailored"],
    bodyTypes: ["all", "petite" /* can be good */, "hourglass", "pear"],
    occasions: ["work", "business_casual", "formal_events", "smart_casual"],
    seasons: ["spring", "summer", "autumn", "winter"],
    eras: ["1940s", "1980s", "contemporary"],
    compatibility: ["tucked-in-blouse", "fitted-knit", "crop-top-for-balance", "blazer", "heels"],
    formality: ["business", "business_casual", "semi-formal", "smart_casual"],
    ageGroups: ["20s", "30s", "40s", "50s+"]
  },
  // ドレス系
  {
    id: "mermaid-dress",
    name: "マーメイドドレス",
    description: "上半身から膝までは体にフィットし、膝下から魚の尾ひれのように裾が広がるドレス。非常にエレガントでドラマチックなシルエット。",
    keywords: ["mermaid-dress", "fishtail-dress", "fitted-bodice", "flared-hem", "formal", "elegant", "dramatic", "red-carpet"],
    bodyTypes: ["hourglass", "curvy" /* well-defined waist needed */, "slim-with-curves"],
    occasions: ["formal_events", "black-tie", "weddings", "galas", "prom"],
    seasons: ["spring", "summer", "autumn", "winter"], // 素材による
    eras: ["1930s", "1950s", "contemporary_formal_wear"],
    compatibility: ["statement-jewelry", "clutch-bag", "high-heels", "updo-hairstyle"],
    formality: ["formal", "black-tie"],
    ageGroups: ["20s", "30s", "40s", "50s"]
  },
  {
    id: "empire-waist-dress",
    name: "エンパイアウエストドレス",
    description: "バストのすぐ下で切り替えがあり、そこから裾にかけて流れるように広がるドレス。胸元を強調し、お腹周りをカバーする。",
    keywords: ["empire-waist-dress", "high-waistline", "flowing-skirt", "romantic", "feminine", "flattering", "grecian-style-potential"],
    bodyTypes: ["all", "apple", "pear", "petite", "pregnant"],
    occasions: ["casual_chic", "summer_events", "garden_parties", "maternity-wear", "semi-formal"],
    seasons: ["spring", "summer"],
    eras: ["early_1800s_Regency", "1960s_revival", "contemporary"],
    compatibility: ["delicate-sandals", "ballet-flats", "bolero-jacket", "dainty-necklace"],
    formality: ["casual_chic", "semi-formal"],
    ageGroups: ["all"]
  },
  // アウター系
  {
    id: "bomber-jacket",
    name: "ボンバージャケット",
    description: "元々は空軍パイロットのジャケット。短い丈、リブ編みの襟・袖口・裾が特徴。カジュアルでスポーティーな印象。",
    keywords: ["bomber-jacket", "flight-jacket", "MA-1", "casual", "sporty", "streetwear", "versatile-outerwear"],
    bodyTypes: ["all"],
    occasions: ["casual", "streetwear", "weekend", "sporty-look"],
    seasons: ["spring", "autumn", "mild_winter"],
    eras: ["1950s_military", "1980s_fashion", "2010s_revival", "contemporary"],
    compatibility: ["jeans", "t-shirt", "hoodie", "sneakers", "casual-dresses"],
    formality: ["casual", "streetwear"],
    ageGroups: ["all"]
  },
  {
    id: "trench-coat",
    name: "トレンチコート",
    description: "第一次世界大戦時の軍用コートが起源。ダブルブレスト、ベルト、エポレットなどが特徴的なクラシックなアウター。",
    keywords: ["trench-coat", "classic-outerwear", "belted", "double-breasted", "timeless", "sophisticated", "versatile"],
    bodyTypes: ["all"],
    occasions: ["work", "business_casual", "smart_casual", "rainy_days", "travel"],
    seasons: ["spring", "autumn", "mild_winter"],
    eras: ["1900s_military", "timeless_fashion_staple", "contemporary"],
    compatibility: ["suits", "dresses", "jeans-and-sweater", "scarf", "ankle-boots"],
    formality: ["business", "business_casual", "smart_casual"],
    ageGroups: ["all"]
  }
  // 目標40-50種類に対し、現在 約18種類。更なる追加が可能。
];

// スタイルトレンドデータ
export const styleTrends = [
  // --- 既存データの変換と拡充 ---
  {
    id: "korean-minimal", // 既存ID: korean_minimal
    name: "韓国ミニマル",
    description: "クリーンなライン、ニュートラルな色調、計算されたシンプルさが特徴の韓国発ミニマリズム。洗練された普段着スタイル。",
    keywords: ["korean-fashion", "minimalism", "clean-lines", "neutral-palette", "effortless-chic", "contemporary", "understated-elegance"],
    era: "2010s-2020s", // 既存: 2020s
    seasons: ["spring", "autumn", "winter"], // 既存: all
    occasions: ["daily_wear", "casual_chic", "work_appropriate", "cafe-hopping"], // 既存: allを具体的に
    colors: ["beige", "cream", "ivory", "soft-grey", "white", "black", "muted-blue", "dusty-rose"], // 既存: ['beige', 'cream', 'soft grey', 'white']
    materials: ["cotton-poplin", "light-wool", "cashmere-knit", "tencel", "fine-gauge-knit", "crisp-cotton"],
    compatibility: ["wide-leg-trousers", "oversized-blazer", "fitted-turtleneck", "midi-skirt", "minimalist-sneakers", "loafers"], // シルエット名/アイテム名
    popularity: 90, // 現在の人気度
    formality: ["casual_chic", "business_casual"], // 既存: all
    mood: ["effortless", "sophisticated", "understated", "calm", "modern", "clean"] // 既存: ['effortless', 'sophisticated', 'understated']
  },
  {
    id: "y2k-revival", // 既存ID: y2k_revival
    name: "Y2Kリバイバル",
    description: "2000年代初頭のファッションの再流行。ローライズジーンズ、クロップトップ、カラフルな小物、未来的要素が特徴。",
    keywords: ["y2k", "2000s-fashion", "revival", "nostalgic", "futuristic-elements", "pop-culture", "playful", "bold"],
    era: "2000s (revival in 2020s)", // 既存: 2000s revival
    seasons: ["spring", "summer", "party_season"], // 既存: all
    occasions: ["casual", "streetwear", "parties", "festivals", "clubwear"], // 既存: streetwearを具体的に
    colors: ["hot-pink", "baby-blue", "lime-green", "silver", "holographic", "bright-purple", "juicy-orange"], // 既存: ['silver', 'holographic', 'neon blue', 'hot pink']
    materials: ["denim-distressed", "velour", "mesh", "metallic-fabric", "rhinestones", "pleather", "ribbed-knit"],
    compatibility: ["low-rise-jeans", "crop-top", "mini-skirt", "butterfly-motifs", "chunky-sneakers", "baguette-bag"],
    popularity: 85,
    formality: ["casual", "streetwear", "party_wear"], // 既存: streetwear
    mood: ["fun", "playful", "bold", "experimental", "nostalgic", "sexy", "youthful"] // 既存: ['futuristic', 'bold', 'experimental']
  },
  {
    id: "cottagecore", // 既存ID: cottagecore
    name: "コテージコア",
    description: "田舎での素朴でロマンチックな生活様式にインスパイアされたスタイル。花柄、天然素材、手作り感が特徴。",
    keywords: ["cottagecore", "pastoral", "romantic", "vintage-inspired", "rural-idyll", "nature", "whimsical", "feminine"],
    era: "2010s-2020s", // 既存: 2020s
    seasons: ["spring", "summer"],
    occasions: ["casual", "picnics", "gardening", "weekend_getaway", "relaxed-daily"],
    colors: ["sage-green", "cream", "ivory", "dusty-rose", "lavender", "pale-yellow", "earthy-browns"], // 既存: ['sage green', 'cream', 'dusty rose', 'lavender']
    materials: ["linen", "organic-cotton", "cotton-voile", "gingham", "floral-print-cotton", "lace-details", "broderie-anglaise", "soft-knit"],
    compatibility: ["prairie-dress", "milkmaid-top", "flowy-skirt", "puff-sleeve-blouse", "knitted-cardigan", "straw-hat", "wicker-basket"],
    popularity: 75,
    formality: ["casual", "relaxed_semi-formal"], // 既存: casual
    mood: ["romantic", "nostalgic", "peaceful", "dreamy", "charming", "innocent", "cozy"] // 既存: ['romantic', 'nostalgic', 'peaceful']
  },
  {
    id: "dark-academia", // 既存ID: dark_academia
    name: "ダークアカデミア",
    description: "古典文学や美術、歴史への憧憬を反映した、知的でノスタルジックなスタイル。ツイードやダークカラーが特徴。",
    keywords: ["dark-academia", "academic", "scholarly", "vintage-inspired", "classic-literature", "intellectual", "moody", "traditional"],
    era: "2010s-2020s", // 既存: 2020s
    seasons: ["autumn", "winter"],
    occasions: ["university", "library_visits", "museum_trips", "bookstore-Browse", "smart_casual"],
    colors: ["dark-brown", "burgundy", "forest-green", "navy-blue", "charcoal-grey", "black", "cream", "mustard-yellow-accent"], // 既存: ['dark brown', 'burgundy', 'forest green', 'navy']
    materials: ["tweed", "wool-suiting", "corduroy", "cashmere-knit", "oxford-cloth", "velvet-accents", "leather-details"],
    compatibility: ["blazer", "pleated-skirt", "fitted-turtleneck", "tailored-trousers", "cardigan", "loafer", "satchel-bag", "plaid-scarf"],
    popularity: 80,
    formality: ["business_casual", "smart_casual", "semi-formal"], // 既存: business
    mood: ["intellectual", "mysterious", "scholarly", "nostalgic", "moody", "sophisticated", "classic"] // 既存: ['intellectual', 'mysterious', 'scholarly']
  },
  {
    id: "techwear", // 既存ID: techwear
    name: "テックウェア",
    description: "機能性と都市的な美学を融合させたスタイル。高性能素材、多機能ポケット、未来的なデザインが特徴。",
    keywords: ["techwear", "functional", "urban-utility", "futuristic", "performance-gear", "technical-fabrics", "monochromatic", "modular"],
    era: "2010s-2020s",
    seasons: ["spring", "autumn", "winter"], // 既存: all
    occasions: ["urban_exploration", "streetwear", "commuting", "travel", "casual_tech-focused"],
    colors: ["black", "charcoal-grey", "olive-drab", "navy-blue", "reflective-silver", "neon-accents-optional"], // 既存: ['black', 'charcoal', 'reflective silver', 'neon accents']
    materials: ["gore-tex", "ripstop-nylon", "softshell", "dyneema", "technical-cotton-blends", "waterproof-zippers"],
    compatibility: ["cargo-pants-technical", "multi-pocket-vest", "hooded-shell-jacket", "tactical-bag", "trail-sneakers", "waterproof-boots"],
    popularity: 70,
    formality: ["streetwear", "casual_performance"], // 既存: streetwear
    mood: ["functional", "futuristic", "urban", "utilitarian", "stealthy", "prepared", "edgy"] // 既存: ['functional', 'futuristic', 'urban']
  },
  {
    id: "indie-sleaze", // 既存ID: indie_sleaze
    name: "インディースリーズ",
    description: "2000年代後半から2010年代初頭のインディーズ音楽シーンに影響された、気だるくエッジの効いたスタイル。最近リバイバル。",
    keywords: ["indie-sleaze", "grunge-revival", "effortless-cool", "edgy", "party-scene", "messy-chic", "vintage-inspired", "alternative"],
    era: "late_2000s-early_2010s (revival in 2020s)", // 既存: 2000s revival
    seasons: ["autumn", "winter", "all-year-party"], // 既存: all
    occasions: ["concerts", "parties", "night_out", "casual_streetwear", "art-events"],
    colors: ["black", "faded-denim", "dark-grey", "burgundy", "deep-red", "metallic-accents", "band-tee-colors"], // 既存: ['black', 'faded denim', 'vintage band colors']
    materials: ["distressed-denim", "leather-faux-leather", "band-tees-cotton", "fishnet", "worn-out-knit", "sequins-for-party"],
    compatibility: ["skinny-jeans-ripped", "oversized-tee-band", "leather-jacket", "mini-dress-party", "combat-boots", "messy-hair"],
    popularity: 65, // リバイバル中だがニッチ
    formality: ["streetwear", "casual", "party_wear"], // 既存: streetwear
    mood: ["effortless", "rebellious", "cool", "edgy", "grungy", "nonchalant", "artistic"] // 既存: ['effortless', 'rebellious', 'cool']
  },
  {
    id: "maximalist-color", // 既存ID: maximalist_color
    name: "マキシマリストカラー",
    description: "大胆な色使い、派手な柄の組み合わせ、過剰なまでの装飾を特徴とするスタイル。「その他はその他」の精神。",
    keywords: ["maximalism", "color-blocking", "bold-patterns", "expressive-styling", "more-is-more", "statement-making", "eclectic"],
    era: "2020s",
    seasons: ["spring", "summer", "anytime_for_boldness"], // 既存: summer
    occasions: ["creative_events", "fashion_statements", "parties", "expressive_dailywear"],
    colors: ["bright-pink", "electric-blue", "sunshine-yellow", "emerald-green", "vibrant-orange", "rich-purple", "clashing-colors"], // 既存: ['bright pink', 'electric blue', 'sunshine yellow', 'emerald green']
    materials: ["printed-silk", "jacquard", "sequins", "faux-fur-bright", "colorful-knit", "pvc-colored", "textured-weaves"],
    compatibility: ["pattern-clash-outfits", "statement-coat", "bold-accessories", "colorful-handbag", "platform-shoes", "oversized-jewelry"],
    popularity: 70,
    formality: ["casual_statement", "party_wear", "creative_formal"], // 既存: casual
    mood: ["bold", "expressive", "confident", "playful", "eclectic", "artistic", "joyful"] // 既存: ['bold', 'expressive', 'confident']
  },
  {
    id: "sustainable-chic", // 既存ID: sustainable_chic
    name: "サステナブルシック",
    description: "環境や社会に配慮した素材選び、倫理的な生産背景、長く愛用できるタイムレスなデザインを重視するスタイル。",
    keywords: ["sustainable-fashion", "eco-conscious", "ethical-fashion", "timeless-pieces", "mindful-consumption", "natural-fabrics", "quality-over-quantity"],
    era: "2010s-2020s", // 既存: 2020s
    seasons: ["all"],
    occasions: ["daily_wear", "work_appropriate", "conscious-events", "capsule-wardrobe"],
    colors: ["earth-tones", "natural-beige", "forest-green", "ocean-blue", "undyed-natural", "muted-pastels", "classic-neutrals"], // 既存: ['earth tones', 'natural beige', 'forest green', 'ocean blue']
    materials: ["organic-cotton", "linen", "tencel-lyocell", "recycled-polyester", "hemp-fabric", "bamboo-fabric", "ethical-wool", "upcycled-materials"],
    compatibility: ["classic-trench-coat", "well-made-knitwear", "tailored-trousers-natural-fabric", "simple-midi-dress", "durable-denim", "minimalist-accessories"],
    popularity: 88,
    formality: ["all", "casual_chic", "business_casual", "minimal_formal"],
    mood: ["mindful", "timeless", "conscious", "serene", "understated-elegance", "responsible", "natural"] // 既存: ['mindful', 'timeless', 'conscious']
  },
  {
    id: "japanese-street", // 既存ID: japanese_street
    name: "ジャパニーズストリート",
    description: "原宿ファッションに代表される、多様で独創的な日本のストリートスタイル。レイヤード、異素材ミックス、カワイイ要素などが特徴。",
    keywords: ["japanese-street-fashion", "harajuku-style", "kawaii-aesthetic", "layered-look", "mixed-patterns", "eclectic", "individualistic", "avant-garde-street"],
    era: "1990s-2020s", // 既存: 2000s-2020s
    seasons: ["all"], // レイヤードで調整
    occasions: ["streetwear", "fashion-events", "daily-expression", "subculture-gatherings"],
    colors: ["pastel-pink", "baby-blue", "mint-green", "lavender", "black-and-white-contrasts", "vibrant-neons", "eclectic-mix"], // 既存: ['pastel pink', 'baby blue', 'mint green', 'lavender']
    materials: ["cotton-jersey", "denim-various", "tulle", "lace", "faux-fur", "pvc-vinyl", "printed-fabrics", "knitwear-novelty"],
    compatibility: ["oversized-tee-graphic", "platform-boots", "layered-skirts-and-trousers", "kawaii-accessories", "statement-headwear", "unique-bags"],
    popularity: 75, // 国際的にも影響力
    formality: ["streetwear", "casual_expressive"], // 既存: streetwear
    mood: ["playful", "creative", "expressive", "unique", "bold", "experimental", "kawaii", "edgy-sometimes"] // 既存: ['playful', 'creative', 'expressive']
  },
  {
    id: "scandi-minimalism", // 既存ID: scandi_minimalism
    name: "スカンジミニマリズム",
    description: "北欧デザインの哲学を反映した、機能的でシンプル、クリーンな美しさを持つスタイル。快適さと洗練されたミニマリズムの融合。",
    keywords: ["scandinavian-style", "minimalism", "functional-design", "clean-aesthetics", "effortless-chic", "neutral-palette", "comfortable", "timeless"],
    era: "2010s-2020s",
    seasons: ["all"],
    occasions: ["daily_wear", "work_appropriate", "casual_chic", "minimalist-events"],
    colors: ["white", "grey-tones", "black", "beige", "muted-blue", "pale-pink", "natural-wood-tones-inspired"], // 既存: ['white', 'grey', 'black', 'natural wood tones']
    materials: ["wool-knit-fine", "organic-cotton", "linen", "cashmere-blends", "light-denim", "sustainable-viscose"],
    compatibility: ["straight-leg-trousers", "oversized-shirt", "minimalist-knitwear", "tailored-coat", "simple-sneakers", "functional-bag"],
    popularity: 85,
    formality: ["all", "casual_chic", "business_casual", "understated_formal"],
    mood: ["calm", "functional", "timeless", "serene", "effortless", "sophisticated", "clean", "comfortable"] // 既存: ['calm', 'functional', 'timeless']
  },

  // --- 新規追加トレンド ---
  // 現代トレンド
  {
    id: "quiet-luxury",
    name: "クワイエットラグジュアリー",
    description: "ロゴや派手な装飾を排し、上質な素材と完璧な仕立て、タイムレスなデザインでさりげない高級感を表現するスタイル。",
    keywords: ["quiet-luxury", "stealth-wealth", "understated-elegance", "timeless-design", "high-quality-materials", "minimalist-luxury", "old-money-aesthetic-related"],
    era: "2020s",
    seasons: ["all"],
    occasions: ["daily_luxury", "business_elite", "exclusive-events", "refined_casual"],
    colors: ["navy", "cream", "beige", "camel", "charcoal-grey", "olive-green", "burgundy", "black"],
    materials: ["cashmere-knit", "silk-charmeuse", "fine-wool-suiting", "lambskin-leather", "high-quality-cotton", "vicuna-rarely"],
    compatibility: ["tailored-blazer-perfect-fit", "cashmere-sweater-classic", "silk-blouse-elegant", "well-cut-trousers", "leather-loafers-high-quality", "minimalist-leather-bag"],
    popularity: 92, // 非常に高い現在の人気
    formality: ["business_formal", "smart_casual_luxury", "refined_evening"],
    mood: ["sophisticated", "elegant", "understated", "confident", "timeless", "refined", "exclusive"]
  },
  {
    id: "balletcore",
    name: "バレエコア",
    description: "バレエの練習着や衣装にインスパイアされた、優雅でフェミニンなトレンド。リボン、チュール、ラップデザイン、淡い色彩が特徴。",
    keywords: ["balletcore", "ballet-inspired", "feminine", "graceful", "ethereal", "soft-aesthetic", "ribbons", "tulle", "bodysuits"],
    era: "2020s",
    seasons: ["spring", "summer"],
    occasions: ["casual_chic", "dance-inspired-fashion", "feminine-dailywear", "special-daytime-events"],
    colors: ["pastel-pink", "baby-blue", "white", "cream", "ivory", "light-grey", "dusty-rose", "black-for-contrast"],
    materials: ["tulle", "satin-ribbon", "soft-knit-wraps", "pointelle-knit", "stretch-jersey-bodysuits", "silk-charmeuse-skirts"],
    compatibility: ["wrap-top-ballet", "tulle-skirt-midi", "ballet-flats", "leg-warmers", "bodysuit-layered", "ribbon-details-in-hair"],
    popularity: 80,
    formality: ["casual_chic", "semi-formal-feminine"],
    mood: ["romantic", "delicate", "elegant", "dreamy", "graceful", "feminine", "soft"]
  },
  // クラシック
  {
    id: "preppy",
    name: "プレッピー",
    description: "アメリカ東海岸の名門私立学校（プレパラトリースクール）の学生風ファッション。清潔感があり、伝統的で上品なスタイル。",
    keywords: ["preppy", "ivy-league-style", "classic-american", "collegiate", "traditional", "polished", "smart-casual", "nautical-elements"],
    era: "1950s-present (cyclical revivals)",
    seasons: ["spring", "autumn", "summer-nautical"],
    occasions: ["casual_smart", "weekend_activities", "university-campus", "country_club_events", "yachting"],
    colors: ["navy-blue", "white", "red-accent", "hunter-green", "khaki-beige", "pastel-pink", "light-blue", "madras-plaid"],
    materials: ["oxford-cloth", "cotton-pique-polo", "cable-knit-wool-or-cotton", "tweed-blazer", "chino-twill", "seersucker", "argyle-knit"],
    compatibility: ["polo-shirt", "chino-pants-or-shorts", "button-down-shirt", "blazer-crested", "penny-loafers", "boat-shoes", "argyle-sweater-vest"],
    popularity: 70, // 定番だがトレンドの波あり
    formality: ["casual", "smart_casual", "business_casual-relaxed"],
    mood: ["classic", "refined", "youthful-traditional", "conservative-chic", "sporty-elegant", "clean-cut", "wholesome"]
  },
  {
    id: "parisienne-chic",
    name: "パリシック（パリジェンヌシック）",
    description: "フランス・パリの女性たちのような、努力していないように見える洗練されたスタイル。シンプル、上質、タイムレスが鍵。",
    keywords: ["parisienne-chic", "french-girl-style", "effortless-elegance", "timeless-basics", "understated-sophistication", "neutral-palette", "quality-pieces"],
    era: "timeless",
    seasons: ["all"],
    occasions: ["daily_chic", "work_appropriate", "casual_elegance", "city-strolling"],
    colors: ["black", "white", "navy-blue", "beige", "grey", "red-lipstick-accent", "breton-stripes-blue-white"],
    materials: ["silk-blouse", "fine-wool-knit", "well-fitting-denim", "cotton-trench", "leather-good-quality", "cashmere-scarf"],
    compatibility: ["breton-stripe-top", "straight-leg-jeans", "tailored-blazer", "trench-coat", "ballet-flats", "ankle-boots", "silk-scarf", "minimalist-bag"],
    popularity: 90, // 常に人気のある普遍的スタイル
    formality: ["casual_chic", "smart_casual", "understated_business"],
    mood: ["effortless", "chic", "sophisticated", "confident", "understated", "timeless", "feminine-independent"]
  }
  // 目標60-70種類に対し、現在 約14種類。更なる追加が必要。
];

// その他のファッション要素 (既存のまま、または必要に応じて拡充)
export const colors = [
  'black', 'white', 'grey', 'navy', 'beige', 'cream', 'brown',
  'red', 'burgundy', 'pink', 'hot pink', 'coral', 'baby-blue', 'pastel-pink',
  'blue', 'sky blue', 'teal', 'turquoise', 'muted-blue', 'electric-blue',
  'green', 'forest green', 'sage green', 'mint', 'olive-drab', 'emerald-green', 'lime-green',
  'yellow', 'mustard', 'gold', 'sunshine-yellow', 'pale-yellow',
  'purple', 'lavender', 'plum', 'bright-purple', 'dusty-rose',
  'orange', 'rust', 'terracotta', 'juicy-orange',
  'silver', 'holographic', 'earth-tones', 'charcoal-grey', 'ivory', 'camel'
];

export const seasons = ['spring', 'summer', 'autumn', 'winter', 'early_spring', 'early_autumn', 'mild_winter', 'party_season', 'all'];

export const occasions = [
  'casual', 'work', 'formal', 'date', 'weekend', 'party', 'daily_wear', 'streetwear', 'evening_events',
  'beach', 'travel', 'sportswear', 'loungewear', 'business_casual', 'smart_casual', 'semi-formal', 'black-tie',
  'clubwear', 'festivals', 'weddings', 'galas', 'prom', 'picnics', 'creative_events', 'urban_exploration',
  'university', 'library_visits', 'concerts', 'cafe-hopping', 'refined_casual', 'daily_luxury'
];

export const moods = [
  'minimalist', 'romantic', 'edgy', 'playful', 'sophisticated', 'effortless', 'understated', 'confident',
  'relaxed', 'bold', 'elegant', 'cozy', 'fresh', 'calm', 'functional', 'timeless', 'dreamy', 'intellectual',
  'mysterious', 'scholarly', 'nostalgic', 'moody', 'urban', 'utilitarian', 'rebellious', 'cool', 'grungy',
  'expressive', 'eclectic', 'artistic', 'joyful', 'mindful', 'conscious', 'serene', 'responsible', 'natural',
  'unique', 'kawaii', 'graceful', 'delicate', 'exclusive', 'chic', 'clean', 'comfortable', 'sexy', 'youthful',
  'wholesome', 'feminine-independent'
];

// 既存の lightingStyles, backgrounds, cameraAngles は変更なしと仮定
export const lightingStyles = [
  'natural lighting', 'studio lighting', 'golden hour lighting',
  'dramatic lighting', 'soft diffused lighting', 'backlit',
  'window lighting', 'sunset lighting', 'overcast lighting'
];

export const backgrounds = [
  'solid color backdrop', 'gradient background', 'urban street',
  'minimalist interior', 'natural outdoor setting', 'studio backdrop',
  'architectural background', 'textured wall', 'clean background'
];

export const cameraAngles = [
  'full-body shot', 'three-quarter shot', 'portrait shot',
  'wide shot', 'close-up detail', 'overhead shot',
  'side profile', 'back view', 'dynamic angle'
];

// ファッションコンテキストの統合 (拡充されたデータを反映)
export const fashionContext = {
  materials,
  silhouettes,
  styleTrends,
  colors,
  seasons,
  occasions,
  moods,
  lightingStyles,
  backgrounds,
  cameraAngles
};

// 初期データ（互換性のため残す）
export const initialBrands = []; //変更なし

// phraseVariations は拡充されたデータに基づいて更新が必要ですが、
// ここでは既存の構造のみ示します。実際のバリエーション生成は別途必要です。
// 今回の指示では拡充対象外なので、既存のものをベースに考えます。
export const phraseVariations = {
  materials: materials.map(m => ({
    base_term: m.name,
    // description や keywords からバリエーションを生成することを想定
    variations: [m.name, ...m.keywords.slice(0,2), m.description.substring(0, m.description.indexOf('。') > 0 ? m.description.indexOf('。') : m.description.length) ]
  })),
  silhouettes: silhouettes.map(s => ({
    base_term: s.name,
    variations: [s.name, ...s.keywords.slice(0,2), s.description.substring(0, s.description.indexOf('。') > 0 ? s.description.indexOf('。') : s.description.length) ]
  })),
  lighting: lightingStyles.map(l => ({
    base_term: l,
    variations: [l]
  })),
  backgrounds: backgrounds.map(b => ({
    base_term: b,
    variations: [b]
  }))
};