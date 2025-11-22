#!/usr/bin/env node

/**
 * Script para analizar archivos no usados en el proyecto
 * Identifica imágenes, JS y CSS que no se están usando
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Directorios a analizar
const PROJECT_ROOT = path.resolve(__dirname, '..');
const DIRS_TO_CHECK = ['img', 'assets', 'js', 'css'];
const EXCLUDE_PATTERNS = ['node_modules', 'dist', '.git', 'trash-can', 'optimized'];

// Archivos que siempre debemos mantener
const ALWAYS_KEEP = [
  'package.json',
  'package-lock.json',
  'vite.config.js',
  'netlify.toml',
  '.gitignore',
  'README.md',
  'index.html',
  'sw.js'
];

// Función para obtener todos los archivos de un directorio
function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    // Skip excluded patterns
    if (EXCLUDE_PATTERNS.some(pattern => filePath.includes(pattern))) {
      return;
    }

    if (stat.isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath.replace(`${PROJECT_ROOT}/`, ''));
    }
  });

  return fileList;
}

// Función para buscar referencias a un archivo
function findReferences(filename) {
  try {
    // Buscar en HTML, CSS, JS
    const cmd =
      `grep -r "${filename}" --include="*.html" --include="*.css" ` +
      '--include="*.js" --include="*.json" . 2>/dev/null | ' +
      'grep -v node_modules | grep -v dist | grep -v ".git" | head -1';
    const result = execSync(cmd, { cwd: PROJECT_ROOT, encoding: 'utf8' });
    return result.trim().length > 0;
  } catch (e) {
    return false;
  }
}

// Función para normalizar nombres de archivo para búsqueda
function normalizeForSearch(filename) {
  // Obtener solo el nombre del archivo
  const basename = path.basename(filename);
  // También buscar variaciones
  return [basename, filename, `/${filename}`, `./${filename}`];
}

// Función principal
function main() {
  console.log('🔍 Analizando archivos no usados...\n');

  const unusedFiles = [];
  const usedFiles = [];

  // Obtener todos los archivos
  const allFiles = [];
  DIRS_TO_CHECK.forEach(dir => {
    const dirPath = path.join(PROJECT_ROOT, dir);
    if (fs.existsSync(dirPath)) {
      const files = getAllFiles(dirPath);
      allFiles.push(...files);
    }
  });

  console.log(`📁 Encontrados ${allFiles.length} archivos para analizar\n`);

  // Analizar cada archivo
  allFiles.forEach(file => {
    // Skip si está en la lista de siempre mantener
    if (ALWAYS_KEEP.includes(path.basename(file))) {
      usedFiles.push(file);
      return;
    }

    // Normalizar nombres para búsqueda
    const searchTerms = normalizeForSearch(file);

    // Buscar referencias
    let found = false;
    for (const term of searchTerms) {
      if (findReferences(term)) {
        found = true;
        break;
      }
    }

    // También buscar sin extensión (para imports JS)
    if (!found && file.endsWith('.js')) {
      const nameWithoutExt = file.replace(/\.js$/, '');
      if (findReferences(nameWithoutExt)) {
        found = true;
      }
    }

    if (found) {
      usedFiles.push(file);
      process.stdout.write(`✓ ${file}\r`);
    } else {
      unusedFiles.push(file);
      process.stdout.write(`✗ ${file} (no usado)\r`);
    }
  });

  console.log('\n\n📊 Resumen:');
  console.log(`✅ Archivos usados: ${usedFiles.length}`);
  console.log(`❌ Archivos no usados: ${unusedFiles.length}\n`);

  // Guardar resultados
  fs.writeFileSync(
    path.join(PROJECT_ROOT, 'unused-files.json'),
    JSON.stringify({ used: usedFiles, unused: unusedFiles }, null, 2)
  );

  console.log('📝 Resultados guardados en unused-files.json\n');

  if (unusedFiles.length > 0) {
    console.log('🗑️  Archivos no usados encontrados:');
    unusedFiles.slice(0, 20).forEach(file => console.log(`   - ${file}`));
    if (unusedFiles.length > 20) {
      console.log(`   ... y ${unusedFiles.length - 20} más`);
    }
  }
}

main();
