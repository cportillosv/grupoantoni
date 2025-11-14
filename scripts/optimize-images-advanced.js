#!/usr/bin/env node
/**
 * Advanced Image Optimization Script
 * Converts images to AVIF (priority) and WebP (fallback) with responsive sizes
 *
 * Usage: node scripts/optimize-images-advanced.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '../img');
const OUTPUT_DIR = path.join(__dirname, '../img/optimized');

// Responsive sizes for srcset
const SIZES = {
  mobile: 400, // Small mobile
  tablet: 768, // Tablet
  desktop: 1200, // Desktop
  large: 1920 // Large desktop
};

// Quality settings
const QUALITY = {
  avif: { quality: 75, effort: 6 },
  webp: { quality: 85, effort: 6 },
  jpeg: { quality: 85, mozjpeg: true },
  png: { quality: 90, compressionLevel: 9 }
};

/**
 * Optimize single image to AVIF and WebP with multiple sizes
 */
async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  const relativePath = path.relative(IMAGE_DIR, path.dirname(inputPath));

  // Skip if already optimized
  if (inputPath.includes('optimized') || inputPath.includes('optimized-jpg')) {
    return null;
  }

  console.log(`\n📸 Optimizing: ${path.join(relativePath, path.basename(inputPath))}`);

  try {
    const image = sharp(inputPath);
    const originalSize = (await fs.stat(inputPath)).size;

    const outputSubDir = path.join(outputDir, relativePath);
    await fs.mkdir(outputSubDir, { recursive: true });

    const results = {
      original: { size: originalSize, format: ext },
      avif: [],
      webp: [],
      optimized: null
    };

    // Generate AVIF versions (modern format, best compression)
    console.log('  → Generating AVIF versions...');
    const avifPromises = Object.entries(SIZES).map(async ([name, width]) => {
      const outputPath = path.join(outputSubDir, `${filename}-${name}.avif`);

      await image
        .clone()
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .avif(QUALITY.avif)
        .toFile(outputPath);

      const stats = await fs.stat(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      results.avif.push({ name, width, size: stats.size, path: outputPath });
      console.log(`    ✓ AVIF ${name} (${width}w): ${sizeKB}KB`);
    });

    // Generate WebP versions (fallback)
    console.log('  → Generating WebP versions...');
    const webpPromises = Object.entries(SIZES).map(async ([name, width]) => {
      const outputPath = path.join(outputSubDir, `${filename}-${name}.webp`);

      await image
        .clone()
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp(QUALITY.webp)
        .toFile(outputPath);

      const stats = await fs.stat(outputPath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      results.webp.push({ name, width, size: stats.size, path: outputPath });
      console.log(`    ✓ WebP ${name} (${width}w): ${sizeKB}KB`);
    });

    // Generate optimized original format (fallback for very old browsers)
    console.log('  → Generating optimized fallback...');
    const optimizedPath = path.join(outputSubDir, `${filename}-optimized${ext}`);

    if (ext === '.jpg' || ext === '.jpeg') {
      await image.jpeg(QUALITY.jpeg).toFile(optimizedPath);
    } else if (ext === '.png') {
      await image.png(QUALITY.png).toFile(optimizedPath);
    }

    const optimizedStats = await fs.stat(optimizedPath);
    results.optimized = { size: optimizedStats.size, path: optimizedPath };

    const originalKB = (originalSize / 1024).toFixed(2);
    const optimizedKB = (optimizedStats.size / 1024).toFixed(2);
    const savings = ((1 - optimizedStats.size / originalSize) * 100).toFixed(1);
    const formatUpper = ext.toUpperCase();
    console.log(
      `    ✓ Optimized ${formatUpper}: ${originalKB}KB → ${optimizedKB}KB (${savings}% smaller)`
    );

    await Promise.all([...avifPromises, ...webpPromises]);

    return results;
  } catch (error) {
    console.error(`  ✗ Error optimizing ${filename}:`, error.message);
    return null;
  }
}

/**
 * Process directory recursively
 */
async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const processPromises = entries.map(async entry => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.includes('optimized')) {
        return processDirectory(fullPath);
      }

      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          return optimizeImage(fullPath, OUTPUT_DIR);
        }
      }

      return Promise.resolve();
    });

    await Promise.all(processPromises);
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
  }
}

async function main() {
  console.log('🚀 Advanced Image Optimization Starting...\n');
  console.log('📊 Formats: AVIF (priority) → WebP (fallback) → Optimized original\n');

  // Create output directory
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  await processDirectory(IMAGE_DIR);

  console.log('\n✅ Image optimization complete!');
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Update HTML to use <picture> with AVIF/WebP sources');
  console.log('   2. Add srcset for responsive images');
  console.log('   3. Add width/height attributes to prevent CLS');
  console.log('   4. Test image loading performance');
}

main().catch(console.error);
