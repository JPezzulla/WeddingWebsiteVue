<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

interface Props {
  imageSrc: string
  imageAlt?: string
  reverse?: boolean
  backgroundColor?: string
  alignTop?: boolean
  noShadow?: boolean
  imageOffsetX?: number
  imagePositionX?: string
}

const props = withDefaults(defineProps<Props>(), {
  imageAlt: 'Wedding photo',
  reverse: false,
  backgroundColor: 'var(--cream)',
  alignTop: false,
  noShadow: false,
  imageOffsetX: 0,
  imagePositionX: 'center',
})

const sectionRef = ref<HTMLElement | null>(null)
const imageContainerRef = ref<HTMLElement | null>(null)
const imageRef = ref<HTMLElement | null>(null)
const isMobile = ref(false)

const checkMobile = () => {
  isMobile.value = window.innerWidth <= 1024
}

onMounted(() => {
  checkMobile()

  const handleScroll = () => {
    // Skip sticky behavior on mobile
    if (isMobile.value || !sectionRef.value || !imageRef.value || !imageContainerRef.value) return

    const sectionRect = sectionRef.value.getBoundingClientRect()
    const containerRect = imageContainerRef.value.getBoundingClientRect()
    const imageWidth = imageRef.value.offsetWidth
    const imageHeight = imageRef.value.offsetHeight
    const windowHeight = window.innerHeight

    // Calculate centered position with optional offset
    const centeredLeft = (containerRect.width - imageWidth) / 2 + props.imageOffsetX

    // Calculate if section is in view
    const sectionTop = sectionRect.top
    const sectionBottom = sectionRect.bottom

    // Image becomes sticky when section enters viewport
    if (sectionTop <= 0 && sectionBottom > windowHeight) {
      imageRef.value.style.position = 'fixed'
      imageRef.value.style.top = '50%'
      imageRef.value.style.transform = 'translateY(-50%)'
      imageRef.value.style.left = `${containerRect.left + centeredLeft}px`
      imageRef.value.style.width = `${imageWidth}px`
      imageRef.value.style.height = `${imageHeight}px`
    } else if (sectionTop > 0) {
      // Before section reaches top
      imageRef.value.style.position = 'absolute'
      imageRef.value.style.top = '0'
      imageRef.value.style.left = `${centeredLeft}px`
      imageRef.value.style.width = ''
      imageRef.value.style.height = ''
      imageRef.value.style.transform = 'none'
    } else if (sectionBottom <= windowHeight) {
      // After section passes bottom
      imageRef.value.style.position = 'absolute'
      imageRef.value.style.top = 'auto'
      imageRef.value.style.bottom = '0'
      imageRef.value.style.left = `${centeredLeft}px`
      imageRef.value.style.width = ''
      imageRef.value.style.height = ''
      imageRef.value.style.transform = 'none'
    }
  }

  const handleResize = () => {
    checkMobile()
    handleScroll()
  }

  window.addEventListener('scroll', handleScroll)
  window.addEventListener('resize', handleResize)

  // Wait for both layout and scroll restoration before initial positioning
  const initializePosition = () => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // Add extra delay to account for scroll restoration
        setTimeout(() => {
          handleScroll()
        }, 100)
      })
    })
  }

  // Wait for image to load and layout to be ready before initial positioning
  if (imageRef.value) {
    const img = imageRef.value.querySelector('img')
    if (img) {
      if (img.complete) {
        initializePosition()
      } else {
        img.addEventListener('load', initializePosition)
      }
    }
  }

  // Initial check with delay to ensure layout and scroll position are ready
  initializePosition()

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  })
})
</script>

<template>
  <section
    ref="sectionRef"
    class="sticky-section"
    :class="{ reverse, 'align-top': alignTop }"
    :style="{ backgroundColor }"
  >
    <div ref="imageContainerRef" class="image-container">
      <div ref="imageRef" class="sticky-image" :class="{ 'no-shadow': noShadow }">
        <img
          :src="imageSrc"
          :alt="imageAlt"
          :style="{ objectPosition: `${imagePositionX} center` }"
          loading="lazy"
        />
      </div>
    </div>
    <div class="content-container">
      <div class="content">
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.sticky-section {
  position: relative;
  min-height: 200vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  padding: 8rem 4rem;
}

.sticky-section.reverse {
  direction: rtl;
}

.sticky-section.reverse .content-container {
  direction: ltr;
}

.image-container {
  position: relative;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.sticky-image {
  position: absolute;
  height: 70vh;
  max-height: 700px;
  width: auto;
  max-width: 100%;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
}

.sticky-image.no-shadow {
  box-shadow: none;
}

.sticky-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
  display: block;
}

.content-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 4rem 0;
}

.sticky-section.align-top .content-container {
  justify-content: flex-start;
}

.content {
  max-width: 600px;
}

/* Tablet/iPad responsive */
@media (max-width: 1024px) {
  .sticky-section {
    grid-template-columns: 1fr;
    min-height: auto;
    padding: 4rem 2rem;
    gap: 2.5rem;
  }

  .sticky-section.reverse {
    direction: ltr;
  }

  .image-container {
    display: block;
  }

  .sticky-image {
    position: relative !important;
    top: auto !important;
    bottom: auto !important;
    left: auto !important;
    transform: none !important;
    width: 100% !important;
    height: auto !important;
    max-height: 600px;
    max-width: 600px;
    margin: 0 auto;
  }

  .sticky-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }

  .content-container {
    padding: 0;
  }

  .content {
    max-width: 100%;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .sticky-section {
    padding: 2rem 1rem;
    gap: 1.5rem;
  }

  .sticky-image {
    max-height: 400px;
    max-width: 100%;
  }

  .sticky-image img {
    object-fit: cover;
  }
}
</style>
