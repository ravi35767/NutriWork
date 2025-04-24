import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const directoriesToClean = [
  'node_modules',
  'dist',
  '.vite',
  'coverage',
  '.cache',
  '.temp',
  '.tmp'
];

const filesToClean = [
  '*.log',
  '*.tmp',
  '*.temp',
  'Thumbs.db'
];

console.log('🚀 Starting cleanup process...');

// Clean npm cache
try {
  console.log('🧹 Cleaning npm cache...');
  execSync('npm cache clean --force');
  console.log('✅ npm cache cleaned successfully');
} catch (error) {
  console.error('❌ Error cleaning npm cache:', error.message);
}

// Remove directories
directoriesToClean.forEach(dir => {
  const dirPath = path.join(process.cwd(), dir);
  if (fs.existsSync(dirPath)) {
    try {
      console.log(`🗑️ Removing directory: ${dir}`);
      fs.rmSync(dirPath, { recursive: true, force: true });
      console.log(`✅ ${dir} removed successfully`);
    } catch (error) {
      console.error(`❌ Error removing ${dir}:`, error.message);
    }
  }
});

// Remove files
filesToClean.forEach(pattern => {
  try {
    console.log(`🗑️ Removing files matching: ${pattern}`);
    execSync(`del /s /q ${pattern}`);
    console.log(`✅ Files matching ${pattern} removed successfully`);
  } catch (error) {
    console.error(`❌ Error removing files matching ${pattern}:`, error.message);
  }
});

console.log('✨ Cleanup completed!'); 