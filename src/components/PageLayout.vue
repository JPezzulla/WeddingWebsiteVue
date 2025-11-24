<script setup lang="ts">
interface Props {
  title: string
  subtitle?: string
  gradientFrom?: string
  gradientTo?: string
  backgroundImage?: string
  backgroundPosition?: string
  backgroundSize?: string
}

const props = withDefaults(defineProps<Props>(), {
  subtitle: '',
  gradientFrom: 'var(--sage-green)',
  gradientTo: 'var(--emerald-green)',
  backgroundImage: '',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
})
</script>

<template>
  <div class="page-layout">
    <!-- Page Header -->
    <section
      class="page-header"
      :class="{ 'has-background-image': backgroundImage }"
      :style="{
        background: `linear-gradient(135deg, ${gradientFrom} 0%, ${gradientTo} 100%)`,
      }"
    >
      <div
        v-if="backgroundImage"
        class="header-background"
        :style="{
          backgroundImage: `url(${backgroundImage})`,
          backgroundPosition: backgroundPosition,
          backgroundSize: backgroundSize,
        }"
      ></div>
      <div class="container text-center">
        <h1>{{ title }}</h1>
        <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
      </div>
    </section>

    <!-- Main Content Slot -->
    <slot />
  </div>
</template>

<style scoped>
.page-layout {
  width: 100%;
}

.page-header {
  padding: 6rem 2rem 4rem;
  color: var(--cream);
  position: relative;
  overflow: hidden;
}

.header-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-repeat: no-repeat;
  opacity: 0.25;
  z-index: 0;
}

.page-header .container {
  position: relative;
  z-index: 1;
}

.page-header h1 {
  color: var(--cream);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-style: italic;
  color: var(--cream);
  opacity: 0.9;
}
</style>
