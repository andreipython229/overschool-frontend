import fs from 'fs';
import glob from 'glob';

// Обновленное регулярное выражение для поиска импортов с и без расширения .scss
const importRegex = /@import\s+['"].*[\/\\]?(mixin|variable)(\.scss)?['"];?/;

let changedCount = 0;
let totalCount = 0;

function processFile(filePath) {
  totalCount++;
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split('\n');
  let changed = false;

  // Проверяем только первые две строки
  for (let i = 0; i < 2 && i < lines.length; i++) {
    if (importRegex.test(lines[i])) {
      lines[i] = '';
      changed = true;
    }
  }

  if (changed) {
    // Удаляем пустые строки в начале файла
    while (lines[0] === '') lines.shift();
    while (lines[0] === '') lines.shift();
    fs.writeFileSync(filePath, lines.join('\n'), 'utf8');
    console.log(`Fixed: ${filePath}`);
    changedCount++;
  } else {
    console.log(`Checked (no change): ${filePath}`);
  }
}

const files = glob.sync('src/**/*.scss');
if (files.length === 0) {
  console.log('No SCSS files found!');
} else {
  files.forEach(processFile);
  console.log(`\nTotal files checked: ${totalCount}`);
  console.log(`Files changed: ${changedCount}`);
  console.log('Done!');
} 