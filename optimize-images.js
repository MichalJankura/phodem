import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Directories to scan for images
const directories = [
  path.join(__dirname, 'public'),
  path.join(__dirname, 'src', 'assets')
];

// Supported image formats
const supportedFormats = ['.jpg', '.jpeg', '.png', '.webp'];

// Quality settings
const quality = {
  jpg: 80,
  jpeg: 80,
  png: 80,
  webp: 75
};

// Skip already optimized files
const skipOptimized = true;
const optimizedSuffix = '-optimized';

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const dir = path.dirname(filePath);
  const baseName = path.basename(filePath, ext);

  // Skip if already optimized
  if (skipOptimized && baseName.endsWith(optimizedSuffix)) {
    console.log(`Skipping already optimized: ${filePath}`);
    return;
  }

  // Define output path with suffix before extension
  const outputPath = path.join(dir, `${baseName}${optimizedSuffix}${ext}`);

  console.log(`Optimizing: ${filePath} → ${outputPath}`);

  try {
    let sharpInstance = sharp(filePath);

    // Apply optimization based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      sharpInstance = sharpInstance.jpeg({ quality: quality.jpg, mozjpeg: true });
    } else if (ext === '.png') {
      sharpInstance = sharpInstance.png({ compressionLevel: 9, palette: true });
    } else if (ext === '.webp') {
      sharpInstance = sharpInstance.webp({ quality: quality.webp });
    }

    // Resize if image is very large (over 2000px)
    const metadata = await sharp(filePath).metadata();
    if (metadata.width > 2000 || metadata.height > 2000) {
      sharpInstance = sharpInstance.resize({
        width: Math.min(metadata.width, 2000),
        height: Math.min(metadata.height, 2000),
        fit: 'inside',
        withoutEnlargement: true
      });
    }

    // Save the optimized image to the new file
    await sharpInstance.toFile(outputPath);
    console.log(`Optimized and saved: ${outputPath}`);

    // Get stats for before/after comparison
    const originalSize = fs.statSync(filePath).size;
    const optimizedSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - optimizedSize) / originalSize * 100).toFixed(2);

    console.log(`Reduced by ${savings}% (${((originalSize - optimizedSize) / 1024).toFixed(1)} KB)`);
  } catch (error) {
    console.error(`Error optimizing ${filePath}:`, error.message);
  }
}

async function scanDirectory(dir) {
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory()) {
        await scanDirectory(filePath);
      } else if (stat.isFile() && supportedFormats.includes(path.extname(file).toLowerCase())) {
        await optimizeImage(filePath);
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dir}:`, error.message);
  }
}

async function main() {
  for (const dir of directories) {
    console.log(`Scanning directory: ${dir}`);
    await scanDirectory(dir);
  }
  console.log('Image optimization complete!');
}

main().catch(console.error);
