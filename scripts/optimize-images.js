#!/usr/bin/env node
/**
 * Image Optimization Script
 * Converts images to WebP and generates multiple sizes
 *
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs').promises;
const path = require('path');

const IMAGE_DIR = path.join(__dirname, '../img');
const OUTPUT_DIR = path.join(__dirname, '../img/optimized');

// Sizes for responsive images
const SIZES = {
  mobile: 400,
  tablet: 800,
  desktop: 1200,
  large: 1920
};

async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();

  // Skip if already optimized
  if (inputPath.includes('optimized')) {
    return;
  }

  console.log(`Optimizing: ${filename}${ext}`);

  try {
    // Generate WebP versions at different sizes in parallel
    const sizePromises = Object.entries(SIZES).map(async ([name, width]) => {
      const outputPath = path.join(outputDir, `${filename}-${name}.webp`);

      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      const stats = await fs.stat(outputPath);
      console.log(`  ✓ ${name} (${width}w): ${(stats.size / 1024).toFixed(2)}KB`);
    });

    await Promise.all(sizePromises);

    // Also create a high-quality WebP at original size
    const originalWebp = path.join(outputDir, `${filename}.webp`);
    await sharp(inputPath).webp({ quality: 90, effort: 6 }).toFile(originalWebp);

    const stats = await fs.stat(originalWebp);
    console.log(`  ✓ Original WebP: ${(stats.size / 1024).toFixed(2)}KB`);
  } catch (error) {
    console.error(`  ✗ Error optimizing ${filename}:`, error.message);
  }
}

async function processDirectory(dir) {
  try {
    const entries = await fs.readdir(dir, { withFileTypes: true });

    const processPromises = entries.map(async entry => {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && entry.name !== 'optimized') {
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
  console.log('🖼️  Starting image optimization...\n');

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
  console.log('   1. Update HTML to use WebP with srcset');
  console.log('   2. Add fallback for browsers without WebP support');
  console.log('   3. Test image loading performance');
}

main().catch(console.error);
