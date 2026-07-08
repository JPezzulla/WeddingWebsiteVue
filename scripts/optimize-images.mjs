/**
 * One-time (re-runnable) image optimizer.
 *
 * Converts every .jpg/.jpeg/.png under public/images to a resized, high-quality
 * .webp, backs the originals up to image-originals/ (gitignored), and rewrites
 * all references in index.html and src/.
 *
 * Usage: node scripts/optimize-images.mjs
 */
import sharp from 'sharp'
import { promises as fs } from 'node:fs'
import path from 'node:path'

const ROOT = path.resolve(import.meta.dirname, '..')
const IMAGES_DIR = path.join(ROOT, 'public/images')
const BACKUP_DIR = path.join(ROOT, 'image-originals')

// Full-bleed hero/header photos keep more pixels than card/portrait images.
const LARGE_DIRS = ['joe-and-kait', 'our-story']
const LARGE_MAX = 2400
const SMALL_MAX = 1200
const QUALITY = 82

async function walk(dir) {
  const out = []
  for (const entry of await fs.readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) out.push(...(await walk(full)))
    else out.push(full)
  }
  return out
}

const files = (await walk(IMAGES_DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f))
if (files.length === 0) {
  console.log('No .jpg/.png files found under public/images — nothing to do.')
  process.exit(0)
}

let beforeTotal = 0
let afterTotal = 0
const renames = [] // [oldWebPath, newWebPath]

for (const file of files) {
  const rel = path.relative(IMAGES_DIR, file)
  const topDir = rel.split(path.sep)[0]
  // Top-level header-*.jpg files are full-bleed too.
  const maxSide = LARGE_DIRS.includes(topDir) || !rel.includes(path.sep) ? LARGE_MAX : SMALL_MAX

  // Back up the original before touching it.
  const backupPath = path.join(BACKUP_DIR, rel)
  await fs.mkdir(path.dirname(backupPath), { recursive: true })
  await fs.copyFile(file, backupPath)

  const outFile = file.replace(/\.(jpe?g|png)$/i, '.webp')
  const { size: before } = await fs.stat(file)
  await sharp(file)
    .rotate() // bake in EXIF orientation
    .resize({ width: maxSide, height: maxSide, fit: 'inside', withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(outFile)
  const { size: after } = await fs.stat(outFile)

  await fs.unlink(file)
  beforeTotal += before
  afterTotal += after

  const oldWeb = '/images/' + rel.split(path.sep).join('/')
  const newWeb = oldWeb.replace(/\.(jpe?g|png)$/i, '.webp')
  renames.push([oldWeb, newWeb])
  console.log(
    `${rel}: ${(before / 1024 / 1024).toFixed(1)}MB -> ${(after / 1024).toFixed(0)}KB (max ${maxSide}px)`,
  )
}

// Rewrite references in source files.
const sourceFiles = [path.join(ROOT, 'index.html')]
for (const dir of ['src']) {
  sourceFiles.push(
    ...(await walk(path.join(ROOT, dir))).filter((f) => /\.(vue|ts|css|html)$/.test(f)),
  )
}

let rewrites = 0
for (const src of sourceFiles) {
  let text = await fs.readFile(src, 'utf8')
  let changed = false
  for (const [oldWeb, newWeb] of renames) {
    if (text.includes(oldWeb)) {
      text = text.split(oldWeb).join(newWeb)
      changed = true
      rewrites++
    }
  }
  if (changed) await fs.writeFile(src, text)
}

console.log(
  `\nTotal: ${(beforeTotal / 1024 / 1024).toFixed(1)}MB -> ${(afterTotal / 1024 / 1024).toFixed(1)}MB` +
    ` (${((1 - afterTotal / beforeTotal) * 100).toFixed(0)}% smaller), ${rewrites} reference(s) rewritten.` +
    `\nOriginals backed up to image-originals/`,
)
