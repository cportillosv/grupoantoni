#!/usr/bin/env node
/**
 * Complete Image Optimization Script
 * Optimizes all images in the project to WebP with multiple sizes
 *
 * Usage: node scripts/optimize-all-images.js
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

// Quality settings
const WEBP_QUALITY = 85;
const JPEG_QUALITY = 85;

/**
 * Get file size in KB
 */
async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return (stats.size / 1024).toFixed(2);
  } catch {
    return '0';
  }
}

/**
 * Optimize a single image
 */
async function optimizeImage(inputPath, outputDir) {
  const filename = path.basename(inputPath, path.extname(inputPath));
  const ext = path.extname(inputPath).toLowerCase();
  const dir = path.dirname(inputPath).replace(IMAGE_DIR, '');

  // Skip if already optimized
  if (inputPath.includes('optimized') || inputPath.includes('.webp')) {
    return null;
  }

  const originalSize = await getFileSize(inputPath);
  console.log(`\n📸 Optimizing: ${path.join(dir, path.basename(inputPath))} (${originalSize}KB)`);

  const results = {
    original: originalSize,
    webp: null,
    jpeg: null,
    sizes: {}
  };

  try {
    // Create output directory structure
    const outputSubDir = path.join(outputDir, dir);
    await fs.mkdir(outputSubDir, { recursive: true });

    // Generate WebP versions at different sizes
    const sizePromises = Object.entries(SIZES).map(async ([name, width]) => {
      const outputPath = path.join(outputSubDir, `${filename}-${name}.webp`);

      await sharp(inputPath)
        .resize(width, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: WEBP_QUALITY, effort: 6 })
        .toFile(outputPath);

      const size = await getFileSize(outputPath);
      results.sizes[name] = size;
      console.log(`  ✓ ${name} (${width}w): ${size}KB`);
    });

    await Promise.all(sizePromises);

    // Create high-quality WebP at original size
    const originalWebp = path.join(outputSubDir, `${filename}-optimized.webp`);
    await sharp(inputPath)
      .webp({ quality: WEBP_QUALITY + 5, effort: 6 })
      .toFile(originalWebp);

    results.webp = await getFileSize(originalWebp);
    console.log(`  ✓ Original WebP: ${results.webp}KB`);

    // Create JPEG fallback if original is not PNG
    if (ext !== '.png') {
      const originalJpeg = path.join(outputSubDir, `${filename}-optimized.jpg`);
      await sharp(inputPath)
        .resize(1200, null, {
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(originalJpeg);

      results.jpeg = await getFileSize(originalJpeg);
      console.log(`  ✓ JPEG fallback: ${results.jpeg}KB`);
    }

    // Calculate savings
    const savings = (
      ((parseFloat(originalSize) - parseFloat(results.webp)) / parseFloat(originalSize)) *
      100
    ).toFixed(1);
    console.log(`  💾 Savings: ${savings}%`);

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

      if (entry.isDirectory() && entry.name !== 'optimized') {
        return processDirectory(fullPath);
      }
      if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          return optimizeImage(fullPath, OUTPUT_DIR);
        }
      }
      return Promise.resolve(null);
    });

    const results = await Promise.all(processPromises);
    return results.filter(r => r !== null);
  } catch (error) {
    console.error(`Error processing directory ${dir}:`, error.message);
    return [];
  }
}

/**
 * Main function
 */
async function main() {
  console.log('🖼️  Starting complete image optimization...\n');
  console.log('📁 Source directory:', IMAGE_DIR);
  console.log('📁 Output directory:', OUTPUT_DIR);
  console.log('─'.repeat(50));

  // Create output directory
  try {
    await fs.mkdir(OUTPUT_DIR, { recursive: true });
  } catch (error) {
    // Directory might already exist
  }

  const startTime = Date.now();
  const results = await processDirectory(IMAGE_DIR);

  const endTime = Date.now();
  const duration = ((endTime - startTime) / 1000).toFixed(2);

  console.log(`\n${'─'.repeat(50)}`);
  console.log('✅ Image optimization complete!');
  console.log(`📊 Processed: ${results.length} images`);
  console.log(`⏱️  Duration: ${duration}s`);
  console.log(`📁 Optimized images saved to: ${OUTPUT_DIR}`);
  console.log('\n💡 Next steps:');
  console.log('   1. Update HTML to use WebP with srcset');
  console.log('   2. Test image loading performance');
  console.log('   3. Verify all images load correctly');
}

main().catch(console.error);
