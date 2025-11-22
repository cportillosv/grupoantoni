#!/usr/bin/env node

/**
 * Script para mover archivos no usados a trash-can
 */

const fs = require('fs');
const path = require('path');

const PROJECT_ROOT = path.resolve(__dirname, '..');
const TRASH_DIR = path.join(PROJECT_ROOT, 'trash-can');
const UNUSED_FILES_JSON = path.join(PROJECT_ROOT, 'unused-files.json');

// Leer lista de archivos no usados
const unusedData = JSON.parse(fs.readFileSync(UNUSED_FILES_JSON, 'utf8'));
const unusedFiles = unusedData.unused;

console.log(`🗑️  Moviendo ${unusedFiles.length} archivos a trash-can...\n`);

let moved = 0;
let errors = 0;

unusedFiles.forEach(file => {
  const sourcePath = path.join(PROJECT_ROOT, file);
  const targetPath = path.join(TRASH_DIR, file);

  try {
    // Verificar que el archivo existe
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  No encontrado: ${file}`);
      return;
    }

    // Crear directorio destino si no existe
    const targetDir = path.dirname(targetPath);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }

    // Mover archivo
    fs.renameSync(sourcePath, targetPath);
    console.log(`✓ Movido: ${file}`);
    moved++;
  } catch (error) {
    console.error(`✗ Error moviendo ${file}: ${error.message}`);
    errors++;
  }
});

console.log('\n✅ Completado:');
console.log(`   Movidos: ${moved}`);
console.log(`   Errores: ${errors}`);
console.log('\n📁 Archivos movidos a: trash-can/');
