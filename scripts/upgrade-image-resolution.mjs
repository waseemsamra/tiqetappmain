import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { imageUrlFor, pickTiqetsImageUrls } from '../src/lib/tiqets-image.ts';

const targets = [
  { file: join(process.cwd(), 'public', 'excursions.json'), root: 'experiences' },
  { file: join(process.cwd(), 'cache', 'experiences.json'), root: null },
  { file: join(process.cwd(), 'cache', 'products.json'), root: null },
  { file: join(process.cwd(), 'cache', 'variants.json'), root: null },
  { file: join(process.cwd(), 'cache', 'helicopter-tours.json'), root: null },
];

let totalRewritten = 0;
let totalScanned = 0;

function upgrade(rawUrl) {
  if (typeof rawUrl !== 'string' || !rawUrl.includes('aws-tiqets-cdn.imgix.net')) return null;
  const upgraded = imageUrlFor(rawUrl, 'hero');
  return upgraded === rawUrl ? null : upgraded;
}

function walk(node, key) {
  if (key === 'images' && Array.isArray(node)) {
    totalScanned += node.length;
    const next = node
      .map((entry) => {
        const current = typeof entry === 'string' ? entry : pickTiqetsImageUrls([entry])[0] || '';
        if (!current) return '';
        const upgraded = upgrade(current);
        if (upgraded) totalRewritten++;
        return upgraded || current;
      })
      .filter(Boolean);
    node.length = 0;
    node.push(...next);
    return;
  }

  if (Array.isArray(node)) {
    for (const item of node) walk(item, key);
    return;
  }
  if (!node || typeof node !== 'object') return;

  if (key === 'image_url' && typeof node.image_url === 'string') {
    const next = upgrade(node.image_url);
    if (next) {
      node.image_url = next;
      totalRewritten++;
    }
  }

  for (const [childKey, childValue] of Object.entries(node)) {
    walk(childValue, childKey);
  }
}

for (const { file, root } of targets) {
  let parsed;
  try {
    parsed = JSON.parse(readFileSync(file, 'utf-8'));
  } catch {
    console.log('skip (unreadable): ' + file);
    continue;
  }

  const before = totalRewritten;
  const list = root ? parsed[root] : parsed;
  if (Array.isArray(list)) {
    for (const item of list) walk(item, null);
  }
  writeFileSync(file, JSON.stringify(parsed, null, 2), 'utf-8');
  console.log(file.replace(process.cwd() + '/', '') + ': ' + (totalRewritten - before) + ' upgraded');
}

console.log('Scanned ' + totalScanned + ' image entries, upgraded ' + totalRewritten + ' to full resolution');
