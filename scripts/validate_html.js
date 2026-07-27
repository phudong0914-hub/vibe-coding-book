const fs = require('fs');
const path = require('path');

// Định cấu hình các thư mục và file cần kiểm tra
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIRECTORIES_TO_SCAN = [
  path.join(PROJECT_ROOT, 'sach'),
  path.join(PROJECT_ROOT, 'blog')
];
const FILES_TO_SCAN = [
  path.join(PROJECT_ROOT, 'index.html')
];

// Danh sách các thẻ block chính cần kiểm tra tính khớp cặp
const BLOCK_TAGS = ['div', 'article', 'aside', 'main', 'nav', 'ul', 'details', 'section'];

let totalErrors = 0;
let checkedFilesCount = 0;

// Tìm tất cả các file HTML đệ quy
function getHtmlFiles(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      if (file !== '.git' && file !== 'node_modules' && file !== '_next') {
        results = results.concat(getHtmlFiles(filePath));
      }
    } else if (file.endsWith('.html')) {
      results.push(filePath);
    }
  });
  return results;
}

// Kiểm tra tính hợp lệ của một file HTML
function validateHtmlFile(filePath) {
  const relativePath = path.relative(PROJECT_ROOT, filePath);
  let fileErrors = 0;
  
  const html = fs.readFileSync(filePath, 'utf8');
  const lines = html.split('\n');
  const tagStack = [];
  
  const tagRegex = /<(\/?)([a-zA-Z0-9:-]+)(?:\s+([^>]*))?>/g;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const lineNum = i + 1;
    let match;
    
    // Reset regex lastIndex cho từng dòng hoặc chạy toàn cục
    while ((match = tagRegex.exec(line)) !== null) {
      const fullTag = match[0];
      const isClosing = match[1] === '/';
      const tagName = match[2].toLowerCase();
      const attributes = match[3] || '';
      
      // Bỏ qua các thẻ tự đóng (self-closing) phổ biến trong HTML5
      if (fullTag.endsWith('/>') || ['img', 'br', 'hr', 'input', 'link', 'meta'].includes(tagName)) {
        continue;
      }
      
      if (BLOCK_TAGS.includes(tagName)) {
        if (isClosing) {
          if (tagStack.length === 0) {
            console.error(`❌ ERROR: Thẻ đóng thừa </${tagName}> tại dòng ${lineNum} của file: ${relativePath}`);
            fileErrors++;
          } else {
            const last = tagStack.pop();
            if (last.name !== tagName) {
              console.error(`❌ ERROR: Đóng lệch thẻ. Mở <${last.name}> ở dòng ${last.line} nhưng đóng </${tagName}> ở dòng ${lineNum} trong file: ${relativePath}`);
              fileErrors++;
            }
          }
        } else {
          tagStack.push({ name: tagName, line: lineNum });
        }
      }
      
      // Kiểm tra tính hợp lệ của các asset links cục bộ (chỉ check link tương đối cục bộ)
      if (tagName === 'link' && attributes.includes('rel="stylesheet"')) {
        checkAssetLink(attributes, 'href', filePath, lineNum, relativePath);
      } else if (tagName === 'script') {
        checkAssetLink(attributes, 'src', filePath, lineNum, relativePath);
      } else if (tagName === 'img') {
        checkAssetLink(attributes, 'src', filePath, lineNum, relativePath);
      }
    }
  }
  
  // Kiểm tra xem còn thẻ nào mở mà chưa đóng
  while (tagStack.length > 0) {
    const unclosed = tagStack.pop();
    console.error(`❌ ERROR: Thẻ <${unclosed.name}> mở ở dòng ${unclosed.line} chưa được đóng trong file: ${relativePath}`);
    fileErrors++;
  }
  
  if (fileErrors > 0) {
    totalErrors += fileErrors;
    console.log(`🔴 File ${relativePath} phát hiện ${fileErrors} lỗi.`);
  } else {
    console.log(`✅ Passed: ${relativePath}`);
  }
  
  checkedFilesCount++;
}

// Kiểm tra xem file asset được trỏ tới có tồn tại không
function checkAssetLink(attributes, attrName, htmlFilePath, lineNum, relativeHtmlPath) {
  const match = new RegExp(`${attrName}=\\s*["']([^"']+)["']`).exec(attributes);
  if (!match) return;
  
  const link = match[1];
  
  // Chỉ kiểm tra các liên kết tương đối nội bộ (không kiểm tra http/https, mailto, zalo, zalo.me, hash #, hoặc các biến javascript)
  if (
    link.startsWith('http://') || 
    link.startsWith('https://') || 
    link.startsWith('//') || 
    link.startsWith('#') || 
    link.startsWith('mailto:') || 
    link.startsWith('tel:') ||
    link.startsWith('javascript:') ||
    link.includes('{{') || 
    link.includes('{%')
  ) {
    return;
  }
  
  // Xử lý absolute path cục bộ dạng /...
  let absoluteAssetPath;
  if (link.startsWith('/')) {
    absoluteAssetPath = path.join(PROJECT_ROOT, link);
  } else {
    // Relative path dựa trên thư mục chứa file HTML hiện tại
    absoluteAssetPath = path.resolve(path.dirname(htmlFilePath), link);
  }
  
  // Tách bỏ query params (?v=...) và hash (#...)
  const cleanPath = absoluteAssetPath.split('?')[0].split('#')[0];
  
  if (!fs.existsSync(cleanPath)) {
    console.warn(`⚠️ WARNING: File liên kết không tồn tại [${link}] tại dòng ${lineNum} của file: ${relativeHtmlPath}`);
  }
}

// Khởi chạy quét toàn bộ
function main() {
  console.log('🔍 ĐANG KHỞI CHẠY KIỂM ĐỊNH TOÀN DỰ ÁN HTML...');
  
  let allFiles = [];
  
  // Thu thập các file từ thư mục cấu hình
  DIRECTORIES_TO_SCAN.forEach(dir => {
    allFiles = allFiles.concat(getHtmlFiles(dir));
  });
  
  // Thêm các file riêng biệt
  FILES_TO_SCAN.forEach(file => {
    if (fs.existsSync(file)) {
      allFiles.push(file);
    }
  });
  
  // Loại bỏ các file trùng lặp nếu có
  allFiles = [...new Set(allFiles)];
  
  console.log(`Tìm thấy ${allFiles.length} file HTML cần kiểm tra.`);
  
  allFiles.forEach(file => {
    validateHtmlFile(file);
  });
  
  console.log('\n--- KẾT QUẢ KIỂM ĐỊNH ---');
  console.log(`Tổng số file đã check: ${checkedFilesCount}`);
  if (totalErrors > 0) {
    console.error(`🔴 Thất bại: Phát hiện ${totalErrors} lỗi cú pháp trong dự án!`);
    process.exit(1);
  } else {
    console.log('💚 Thành công: Toàn bộ file HTML khớp thẻ 100%!');
    process.exit(0);
  }
}

main();
