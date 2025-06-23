import { readFileSync, writeFileSync } from 'fs';
import pkg from 'glob';
const { glob } = pkg;

function removeImports(content: string): string {
  // Удаляем все @import, кроме импортов шрифтов через url
  return content.replace(/@import\s+['"](?!.*url\().*?['"];?\n?/g, '');
}

function processFile(filePath: string) {
  const content = readFileSync(filePath, 'utf8');
  const fixed = removeImports(content);
  if (fixed !== content) {
    writeFileSync(filePath, fixed);
    console.log(`Removed imports: ${filePath}`);
  }
}

const scssFiles = glob.sync('src/**/*.scss');
scssFiles.forEach(processFile);
console.log('SCSS imports removal completed!'); 