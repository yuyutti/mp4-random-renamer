const fs = require('fs');
const path = require('path');

// ランダムな8桁の半角英数字を生成する関数
function generateRandomString(length) {
const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
let result = '';
for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    result += chars[randomIndex];
}
return result;
}

// 動画ファイルが格納されているフォルダのパス
const videosFolder = path.join(__dirname, 'videos');

// フォルダ内のファイルを読み込む
fs.readdir(videosFolder, (err, files) => {
if (err) {
    console.error('Error reading directory:', err);
    return;
}

// .mp4ファイルのみを対象にする
const mp4Files = files.filter(file => path.extname(file).toLowerCase() === '.mp4');

mp4Files.forEach(file => {
    const oldPath = path.join(videosFolder, file);
    const newFileName = generateRandomString(8) + '.mp4';
    const newPath = path.join(videosFolder, newFileName);

    // ファイル名を変更する
    fs.rename(oldPath, newPath, err => {
    if (err) {
        console.error('Error renaming file:', err);
    } else {
        console.log(`Renamed: ${file} -> ${newFileName}`);
    }
    });
});
});
