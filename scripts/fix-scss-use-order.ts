import { readFileSync, writeFileSync } from 'fs';
import pkg from 'glob';
const { glob } = pkg;

function fixUseOrder(content: string): string {
  const lines = content.split(/\r?\n/);
  const useLines: string[] = [];
  const otherLines: string[] = [];
  for (const line of lines) {
    if (/^\s*@use\s+['"][^'"]+['"]\s+as\s+\*/.test(line)) {
      useLines.push(line);
    } else {
      otherLines.push(line);
    }
  }
  // Удаляем пустые строки в начале otherLines
  while (otherLines[0] && otherLines[0].trim() === '') {
    otherLines.shift();
  }
  return [...useLines, '', ...otherLines].join('\n');
}

function processFile(filePath: string) {
  const content = readFileSync(filePath, 'utf8');
  const fixed = fixUseOrder(content);
  if (fixed !== content) {
    writeFileSync(filePath, fixed);
    console.log(`@use reordered: ${filePath}`);
  }
}

const scssFiles = glob.sync('src/**/*.scss');
scssFiles.forEach(processFile);
console.log('SCSS @use order fix completed!'); 