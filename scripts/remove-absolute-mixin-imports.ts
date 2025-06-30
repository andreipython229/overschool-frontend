import { readFileSync, writeFileSync } from 'fs';
import pkg from 'glob';
const { glob } = pkg;

function removeAbsoluteMixinImport(content: string): string {
  return content.replace(/@import\s+['"]@\/scss\/mixin\.scss['"];?\n?/g, '');
}

function processFile(filePath: string) {
  const content = readFileSync(filePath, 'utf8');
  const fixed = removeAbsoluteMixinImport(content);
  if (fixed !== content) {
    writeFileSync(filePath, fixed);
    console.log(`Removed absolute mixin import: ${filePath}`);
  }
}

const scssFiles = glob.sync('src/**/*.scss');
scssFiles.forEach(processFile);
console.log('Absolute mixin imports removal completed!'); 