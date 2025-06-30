/* eslint-disable no-useless-escape */
import { readFileSync, writeFileSync } from 'fs';
import pkg from 'glob';
const { glob } = pkg;

// Простая регулярка для поиска блоков с вложенными правилами и объявлениями после них
const selectorBlockRegex = /([\w\-&\.#:>\[\]=\"'\s,]+)\s*\{([\s\S]*?)\}/g;

function fixMixedDeclarations(content: string): string {
  return content.replace(selectorBlockRegex, (match, selector, body) => {
    // Разделяем строки внутри блока
    const lines = body.split(/\n/);
    const declarations: string[] = [];
    const nested: string[] = [];
    let foundNested = false;
    for (const line of lines) {
      if (/^\s*[\w-]+\s*:/.test(line) && !foundNested) {
        declarations.push(line);
      } else if (/^\s*[\w-]+\s*:/.test(line) && foundNested) {
        // Если объявление после вложенного правила — оборачиваем в & {}
        nested.push(`  & {\n${line}\n  }`);
      } else if (/^\s*[\w\-&\.#:>\[\]=\"']+\s*\{/.test(line)) {
        foundNested = true;
        nested.push(line);
      } else {
        if (foundNested) nested.push(line);
        else declarations.push(line);
      }
    }
    return `${selector} {\n${declarations.join('\n')}\n${nested.join('\n')}\n}`;
  });
}

function processFile(filePath: string) {
  const content = readFileSync(filePath, 'utf8');
  const fixed = fixMixedDeclarations(content);
  if (fixed !== content) {
    writeFileSync(filePath, fixed);
    console.log(`Fixed: ${filePath}`);
  }
}

const scssFiles = glob.sync('src/**/*.scss');
scssFiles.forEach(processFile);
console.log('SCSS mixed declarations fix completed!'); 