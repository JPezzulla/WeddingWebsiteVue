import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname } from 'path';

const IMAGE_DIR = 'public/images';
const JPEG_QUALITY = 80;
const PNG_QUALITY = 80;

async function getAllImages(dir) {
  const files = [];

  async function walk(directory) {
    const entries = await readdir(directory, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = join(directory, entry.name);

      if (entry.isDirectory()) {
        await walk(fullPath);
      } else {
        const ext = extname(entry.name).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  await walk(dir);
  return files;
}

async function optimizeImage(filePath) {
  try {
    const ext = extname(filePath).toLowerCase();
    const beforeStats = await stat(filePath);
    const beforeSize = beforeStats.size;

    const image = sharp(filePath);

    if (ext === '.png') {
      await image
        .png({ quality: PNG_QUALITY, compressionLevel: 9 })
        .toFile(filePath + '.tmp');
    } else if (['.jpg', '.jpeg'].includes(ext)) {
      await image
        .jpeg({ quality: JPEG_QUALITY, mozjpeg: true })
        .toFile(filePath + '.tmp');
    }

    const afterStats = await stat(filePath + '.tmp');
    const afterSize = afterStats.size;

    // Only replace if we actually saved space
    if (afterSize < beforeSize) {
      await import('fs/promises').then(fs => fs.rename(filePath + '.tmp', filePath));
      const saved = beforeSize - afterSize;
      const percent = ((saved / beforeSize) * 100).toFixed(1);
      console.log(`✓ ${filePath}: ${formatBytes(beforeSize)} → ${formatBytes(afterSize)} (saved ${percent}%)`);
      return { beforeSize, afterSize, saved };
    } else {
      await import('fs/promises').then(fs => fs.unlink(filePath + '.tmp'));
      console.log(`○ ${filePath}: already optimized`);
      return { beforeSize, afterSize: beforeSize, saved: 0 };
    }
  } catch (error) {
    console.error(`✗ Error optimizing ${filePath}:`, error.message);
    return { beforeSize: 0, afterSize: 0, saved: 0 };
  }
}

function formatBytes(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

async function main() {
  console.log('🖼️  Finding images...\n');

  const images = await getAllImages(IMAGE_DIR);
  console.log(`Found ${images.length} images to optimize\n`);

  let totalBefore = 0;
  let totalAfter = 0;
  let totalSaved = 0;

  for (const imagePath of images) {
    const result = await optimizeImage(imagePath);
    totalBefore += result.beforeSize;
    totalAfter += result.afterSize;
    totalSaved += result.saved;
  }

  console.log('\n📊 Summary:');
  console.log(`Total before: ${formatBytes(totalBefore)}`);
  console.log(`Total after:  ${formatBytes(totalAfter)}`);
  console.log(`Total saved:  ${formatBytes(totalSaved)} (${((totalSaved / totalBefore) * 100).toFixed(1)}%)`);
}

main().catch(console.error);
