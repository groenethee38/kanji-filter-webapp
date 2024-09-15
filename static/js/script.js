function applyFilter(filtertype) {
    var inputText = document.getElementById('input_text').value;
    var lines = inputText.split('\n');
    var filteredLines = [];

    var normal_characters_list = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ' ', ',', '.', '?', '!', '@', '#', '$', '%', '&', '*', '(', ')', '-', '_', '+', '=', '[', ']', '{', '}', '|', ';', ':', '<', '>', '/', '\ ', '"', "'", '`', '~', '。', '、', '～']
    var kana_characters_list = ['あ', 'い', 'う', 'え', 'お', 'か', 'が', 'き', 'ぎ', 'く', 'ぐ', 'け', 'げ', 'こ', 'ご', 'さ', 'ざ', 'し', 'じ', 'す', 'ず', 'せ', 'ぜ', 'そ', 'ぞ', 'た', 'だ', 'ち', 'ぢ', 'つ', 'づ', 'て', 'で', 'と', 'ど', 'な', 'に', 'ぬ', 'ね', 'の', 'は', 'ば', 'ぱ', 'ひ', 'び', 'ぴ', 'ふ', 'ぶ', 'ぷ', 'へ', 'べ', 'ぺ', 'ほ', 'ぼ', 'ぽ', 'ま', 'み', 'む', 'め', 'も', 'や', 'いい', 'ゆ', 'いぇ', 'よ', 'ら', 'り', 'る', 'れ', 'ろ', 'ん', 'わ', 'を'] + ['ア', 'イ', 'ウ', 'エ', 'オ', 'カ', 'ガ', 'キ', 'ギ', 'ク', 'グ', 'ケ', 'ゲ', 'コ', 'ゴ', 'サ', 'ザ', 'シ', 'ジ', 'ス', 'ズ', 'セ', 'ゼ', 'ソ', 'ゾ', 'タ', 'ダ', 'チ', 'ヂ', 'ツ', 'ヅ', 'テ', 'デ', 'ト', 'ド', 'ナ', 'ニ', 'ヌ', 'ネ', 'ノ', 'ハ', 'バ', 'パ', 'ヒ', 'ビ', 'ピ', 'フ', 'ブ', 'プ', 'ヘ', 'ベ', 'ペ', 'ホ', 'ボ', 'ポ', 'マ', 'ミ', 'ム', 'メ', 'モ', 'ヤ', 'イイ', 'ユ', 'イェ', 'ヨ', 'ラ', 'リ', 'ル', 'レ', 'ロ', 'ン', 'ワ'] + ['ヲ', 'ン', 'ー', 'ッ', 'ャ', 'ュ', 'ョ', 'ァ', 'ィ', 'ゥ', 'ェ', 'ォ', 'っ'] + normal_characters_list
    var jlpt_n5_list = ['日', '一', '国', '人', '年', '大', '十', '二', '本', '中', '長', '出', '三', '時', '行', '見', '月', '分', '後', '前', '生', '五', '間', '上', '東', '四', '今', '金', '九', '入', '学', '高', '円', '子', '外', '八', '六', '下', '来', '気', '小', '七', '山', '話', '女', '北', '午', '百', '書', '先', '名', '川', '千', '水', '半', '男', '西', '電', '校', '語', '土', '木', '聞', '食', '車', '何', '南', '万', '毎', '白', '天', '母', '火', '右', '読', '友', '左', '休', '父', '雨']
    var jlpt_n4_list = ['会', '同', '事', '自', '社', '発', '者', '地', '業', '方', '新', '場', '員', '立', '開', '手', '力', '問', '代', '明', '動', '京', '目', '通', '言', '理', '体', '田', '主', '題', '意', '不', '作', '用', '度', '強', '公', '持', '野', '以', '思', '家', '世', '多', '正', '安', '院', '心', '界', '教', '文', '元', '重', '近', '考', '画', '海', '売', '知', '道', '集', '別', '物', '使', '品', '計', '死', '特', '私', '始', '朝', '運', '終', '台', '広', '住', '無', '真', '有', '口', '少', '町', '料', '工', '建', '空', '急', '止', '送', '切', '転', '研', '足', '究', '楽', '起', '着', '店', '病', '質', '待', '試', '族', '銀', '早', '映', '親', '験', '英', '医', '仕', '去', '味', '写', '字', '答', '夜', '音', '注', '帰', '古', '歌', '買', '悪', '図', '週', '室', '歩', '風', '紙', '黒', '花', '春', '赤', '青', '館', '屋', '色', '走', '秋', '夏', '習', '駅', '洋', '旅', '服', '夕', '借', '曜', '飲', '肉', '貸', '堂', '鳥', '飯', '勉', '冬', '昼', '茶', '弟', '牛', '魚', '兄', '犬', '妹', '姉', '漢']
    var jlpt_n3_list = ['政', '議', '民', '連', '対', '部', '合', '市', '内', '相', '定', '回', '選', '米', '実', '関', '決', '全', '表', '戦', '経', '最', '現', '調', '化', '当', '約', '首', '法', '性', '的', '要', '制', '治', '務', '成', '期', '取', '都', '和', '機', '平', '加', '受', '続', '進', '数', '記', '初', '指', '権', '支', '産', '点', '報', '済', '活', '原', '共', '得', '解', '交', '資', '予', '向', '際', '勝', '面', '告', '反', '判', '認', '参', '利', '組', '信', '在', '件', '側', '任', '引', '求', '所', '次', '昨', '論', '官', '増', '係', '感', '情', '投', '示', '変', '打', '直', '両', '式', '確', '果', '容', '必', '演', '歳', '争', '談', '能', '位', '置', '流', '格', '疑', '過', '局', '放', '常', '状', '球', '職', '与', '供', '役', '構', '割', '身', '費', '付', '由', '説', '難', '優', '夫', '収', '断', '石', '違', '消', '神', '番', '規', '術', '備', '宅', '害', '配', '警', '育', '席', '訪', '乗', '残', '想', '声', '助', '労', '例', '然', '限', '追', '商', '葉', '伝', '働', '形', '景', '落', '好', '退', '頭', '負', '渡', '失', '差', '末', '守', '若', '種', '美', '命', '福', '望', '非', '観', '察', '段', '横', '深', '申', '様', '財', '港', '識', '呼', '達', '良', '阪', '候', '程', '満']
    var jlpt_n2_list = ['党', '協', '総', '区', '領', '県', '設', '保', '改', '第', '結', '派', '府', '査', '委', '軍', '案', '策', '団', '各', '島', '革', '村', '勢', '減', '再', '税', '営', '比', '防', '補', '境', '導', '副', '算', '輸', '述', '線', '農', '州', '武', '象', '域', '額', '欧', '担', '準', '賞', '辺', '造', '被', '技', '低', '復', '移', '個', '門', '課', '脳', '極', '含', '蔵', '量', '型', '況', '針', '専', '谷', '史', '階', '管', '兵', '接', '細', '効', '丸', '湾', '録', '省', '旧', '橋', '岸', '周', '材', '戸', '央', '券', '編', '捜', '竹', '超', '並', '療', '採', '森', '党', '協', '総', '区', '領', '将', '幅', '般', '貿', '講', '林', '装', '諸', '劇', '河', '航', '鉄', '児', '禁', '印', '逆', '換', '久', '短', '油', '暴', '輪', '占', '植', '清', '倍', '均', '億', '圧', '芸', '署', '伸', '停', '爆', '陸', '玉', '波', '帯', '延', '羽', '固', '則', '乱', '普', '測', '豊', '厚', '齢', '囲', '卒', '略', '承', '順', '岩', '練', '軽', '了', '庁', '城', '患', '層', '版', '令', '角', '絡', '損', '募', '裏', '仏', '績', '築', '貨', '混', '昇', '池', '血', '温', '季', '星', '永', '著', '誌', '庫', '刊', '像', '香', '坂', '底', '布', '寺', '宇', '巨', '震', '希', '触', '依', '籍', '汚', '枚', '複', '郵', '仲', '栄', '札', '板', '骨', '傾', '届', '巻', '燃', '跡', '包', '駐', '弱', '紹', '雇', '替', '預', '焼', '簡', '章', '臓', '律', '贈', '照', '薄', '群', '秒', '奥', '詰', '双', '刺', '純', '翌', '快', '片', '敬', '悩', '泉', '皮', '漁', '荒', '貯', '硬', '埋', '柱', '祭', '袋', '筆', '訓', '浴', '童', '宝', '封', '胸', '砂', '塩', '賢', '腕', '兆', '床', '毛', '緑', '尊', '祝', '柔', '殿', '濃', '液', '衣', '肩', '零', '幼', '荷', '泊', '黄', '甘', '臣', '浅', '掃', '雲', '掘', '捨', '軟', '沈', '凍', '乳', '恋', '紅', '郊', '腰', '炭', '踊', '冊', '勇', '械', '菜', '珍', '卵', '湖', '喫', '干', '虫', '刷', '湯', '溶', '鉱', '涙', '匹', '孫', '鋭', '枝', '塗', '軒', '毒', '叫', '拝', '氷', '乾', '棒', '祈', '拾', '粉', '糸', '綿', '汗', '銅', '湿', '瓶', '咲', '召', '缶', '隻', '脂', '蒸', '肌', '耕', '鈍', '泥', '隅', '灯', '辛', '磨', '麦', '姓', '筒', '鼻', '粒', '詞', '胃', '畳', '机', '膚', '濯', '塔', '沸', '灰', '菓', '帽', '枯', '涼', '舟', '貝', '符', '憎', '皿', '肯', '燥', '畜', '坊', '挟', '曇', '滴', '伺']
    

    var filterList = [];

    if (filtertype == "None") {
        filterList = [];
    } else if (filtertype == "JLPT N5") {
        filterList = filterList.concat(jlpt_n5_list);
    } else if (filtertype == "JLPT N4") {
        filterList = filterList.concat(jlpt_n5_list, jlpt_n4_list);
    } else if (filtertype == "JLPT N3") {
        filterList = filterList.concat(jlpt_n5_list, jlpt_n4_list, jlpt_n3_list);
    }  else if (filtertype == "JLPT N2") {
        filterList = filterList.concat(jlpt_n5_list, jlpt_n4_list, jlpt_n3_list, jlpt_n2_list);
    }

    if (filterList.length > 0) {
        for (var line of lines) {
            var updatedLine = '';
            for (var char of line) {
                var hoverText = '';
                if (kanjiData[char]) {
                    hoverText = `Onyomi: ${kanjiData[char].onyomi} Kunyomi: ${kanjiData[char].kunyomi} Meaning: ${kanjiData[char].meaning} Level: ${kanjiData[char].level}`;
                }
                
                updatedLine += (kana_characters_list.includes(char) ? char : 
                filterList.includes(char) ? 
                `<span class="right-kanji-text kanji" data-hover="${hoverText}">${char}</span>` : 
                `<span class="wrong-kanji-text kanji" data-hover="${hoverText}">${char}</span>`
                );
            }
        filteredLines.push(updatedLine);
        }
    } else {
        filteredLines = lines;
    }

    var outputText = filteredLines.join('<br>');
    document.getElementById('output_text').innerHTML = outputText
    document.getElementById('current_filter').innerHTML = "Current filter: " + filtertype

    
    const kanjiElements = document.querySelectorAll('.kanji');
    
    kanjiElements.forEach(kanji => {
        kanji.addEventListener('mouseenter', (event) => {
            const parent = kanji.closest('.output-text');
            const parentRect = parent.getBoundingClientRect();
            const kanjiRect = kanji.getBoundingClientRect();

            const isLeftSide = (kanjiRect.left - parentRect.left) < (parentRect.width / 2);

            if (isLeftSide) {
                kanji.style.setProperty('--tooltip-left', '0');
                kanji.style.setProperty('--tooltip-right', 'auto');
            } else {
                kanji.style.setProperty('--tooltip-left', 'auto');
                kanji.style.setProperty('--tooltip-right', '0');
            }
        });
    });
}