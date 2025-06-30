import { readFileSync, writeFileSync } from 'fs';
import pkg from 'glob';
const { glob } = pkg;

// Функция для обновления импортов в файле
function updateImports(filePath: string): void {
  let content = readFileSync(filePath, 'utf8');
  
  // Заменяем @import на @use, исключая импорты шрифтов
  content = content.replace(
    /@import\s+['"]([^'"]+\.scss)['"];/g,
    (match, importPath) => {
      // Пропускаем импорты шрифтов
      if (importPath.includes('fonts.googleapis.com') || importPath.includes('fonts.cdnfonts.com')) {
        return match;
      }
      return `@use '${importPath}' as *;`;
    }
  );
  
  writeFileSync(filePath, content);
  console.log(`Updated: ${filePath}`);
}

// Находим все SCSS файлы
const scssFiles = glob.sync('src/**/*.scss');

// Обновляем каждый файл
scssFiles.forEach(updateImports);

console.log('SCSS imports update completed!'); 