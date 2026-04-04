/**
 * Image Optimization Script
 * Converts PNG/JPG files to WebP and resizes large images.
 * Run: node scripts/optimize-images.js
 *
 * Requires: npm install sharp --save-dev
 */

import { createRequire } from 'module';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const require = createRequire(import.meta.url);
const sharp   = require('sharp');
const __dirname = dirname(fileURLToPath(import.meta.url));

const PUBLIC_DIR = join(__dirname, '..', 'public');

const IMAGES = [
    {
        input:   join(PUBLIC_DIR, 'robot-hand.jpg'),
        output:  join(PUBLIC_DIR, 'robot-hand.webp'),
        options: { width: 1920, quality: 82 },
    },
    {
        input:   join(PUBLIC_DIR, 'Person1.png'),
        output:  join(PUBLIC_DIR, 'Person1.webp'),
        options: { width: 400,  quality: 85 },
    },
    {
        input:   join(PUBLIC_DIR, 'Person2.png'),
        output:  join(PUBLIC_DIR, 'Person2.webp'),
        options: { width: 400,  quality: 85 },
    },
    {
        input:   join(PUBLIC_DIR, 'Person3.png'),
        output:  join(PUBLIC_DIR, 'Person3.webp'),
        options: { width: 400,  quality: 85 },
    },
];

async function optimizeImages() {
    console.log('🖼️  Starting image optimization...\n');

    for (const { input, output, options } of IMAGES) {
        if (!existsSync(input)) {
            console.warn(`⚠️  Skipped (not found): ${input}`);
            continue;
        }

        try {
            const info = await sharp(input)
                .resize(options.width, null, { withoutEnlargement: true })
                .webp({ quality: options.quality })
                .toFile(output);

            const inputSizeMb  = (require('fs').statSync(input).size / 1048576).toFixed(2);
            const outputSizeKb = (info.size / 1024).toFixed(0);

            console.log(`✅ ${require('path').basename(input)}`);
            console.log(`   Before: ${inputSizeMb} MB → After: ${outputSizeKb} KB (saved ${((1 - info.size / require('fs').statSync(input).size) * 100).toFixed(0)}%)\n`);
        } catch (err) {
            console.error(`❌ Failed: ${input}\n   ${err.message}\n`);
        }
    }

    console.log('✨ Image optimization complete!');
}

optimizeImages();
