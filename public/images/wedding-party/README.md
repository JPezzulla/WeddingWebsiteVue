# Wedding Party Images

This directory contains profile images for the Wedding Party page.

## Image Naming Convention

Name images based on the person's role:
- `best-man.jpg` - Best Man
- `groomsman-1.jpg`, `groomsman-2.jpg`, etc. - Groomsmen
- `maid-of-honor.jpg` - Maid of Honor
- `bridesmaid-1.jpg`, `bridesmaid-2.jpg`, etc. - Bridesmaids

## Image Specifications

For best results:
- **Format:** JPG or WebP
- **Dimensions:** 400px × 400px (1:1 aspect ratio - square)
- **File Size:** Keep under 200KB per image
- **Quality:** 80-85% JPEG quality
- **Style:** Headshots or portraits work best

## Optimization

Before adding images:
1. Crop to square (1:1 aspect ratio)
2. Resize to 400×400px
3. Compress using:
   - ImageOptim (Mac)
   - TinyPNG (Web)
   - Squoosh (https://squoosh.app)

## Usage

Update `src/views/WeddingPartyView.vue` to reference these images:
```typescript
image: '/images/wedding-party/best-man.jpg'
```
