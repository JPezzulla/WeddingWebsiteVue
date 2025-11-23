# Wedding Website Images

This directory contains all images for the wedding website. Images placed here are served directly from the `/public` folder and will be bundled with your production build.

## Directory Structure

```
images/
├── our-story/          # Images for "Our Story" sticky scroll sections
│   ├── section-1.jpg   # How We Met
│   ├── section-2.jpg   # Falling in Love
│   ├── section-3.jpg   # Our First Date
│   ├── section-4.jpg   # Adventures Together
│   └── section-5.jpg   # The Proposal
│
└── wedding-party/      # Profile images for Wedding Party page
    ├── best-man.jpg
    ├── groomsman-1.jpg
    ├── maid-of-honor.jpg
    └── bridesmaid-1.jpg
```

## How to Add Images

1. **Copy your images** into the appropriate subdirectory
2. **Name them correctly** according to the naming convention in each folder's README
3. **Optimize before adding** - See optimization guidelines below
4. **Restart dev server** (if running) to see changes: `npm run dev`

## Referencing Images in Code

Images in the `public/` folder are referenced with absolute paths starting with `/`:

```vue
<!-- In template -->
<img src="/images/our-story/section-1.jpg" alt="How we met" />

<!-- Or as a prop -->
<StickySection image-src="/images/our-story/section-1.jpg" />
```

## Optimization Guidelines

### Recommended Tools
- **[Squoosh](https://squoosh.app)** - Web-based image optimizer (recommended)
- **[TinyPNG](https://tinypng.com)** - Quick online compression
- **ImageOptim** - Mac desktop app
- **ImageMagick** - Command-line tool for batch processing

### Quick Optimization with Squoosh
1. Go to https://squoosh.app
2. Drop your image
3. Select format (MozJPEG or WebP recommended)
4. Adjust quality to 80-85%
5. Download optimized image

### Batch Optimization (Command Line)
If you have ImageMagick installed:

```bash
# Optimize Our Story images (preserve aspect ratio, max width 1600px)
cd public/images/our-story
mogrify -resize 1600x\> -quality 85 *.jpg

# Optimize Wedding Party images (400x400, square)
cd ../wedding-party
mogrify -resize 400x400^ -gravity center -extent 400x400 -quality 85 *.jpg
```

## Image Specifications by Section

### Our Story (Sticky Scroll)
- **Recommended Width:** 1200-1600px (native aspect ratio preserved)
- **Aspect Ratio:** Any (portrait orientation recommended)
- **Format:** JPG or WebP
- **Max file size:** 500KB
- **Quality:** 85%

### Wedding Party (Profile Photos)
- **Dimensions:** 400px × 400px (1:1 square)
- **Format:** JPG or WebP
- **Max file size:** 200KB
- **Quality:** 85%

## File Format Guide

- **JPG/JPEG** - Best for photographs with lots of color variation
- **WebP** - Modern format, smaller file sizes, excellent quality (recommended for modern browsers)
- **PNG** - Use only for images requiring transparency (avoid for photos)

## Performance Tips

1. **Always optimize** before adding images to the project
2. **Use WebP format** when possible for best compression
3. **Resize to exact dimensions** - Don't rely on CSS to resize
4. **Keep file sizes small** - Target 200-500KB max per image
5. **Use descriptive alt text** in your components for accessibility

## Need Help?

- Check individual folder READMEs for specific requirements
- For questions about image optimization: https://web.dev/fast/#optimize-your-images
- For WebP conversion: https://developers.google.com/speed/webp
