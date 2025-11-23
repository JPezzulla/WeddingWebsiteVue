<script setup lang="ts">
interface Props {
  iconColor?: string
  maxWidth?: string
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'var(--sage-green)',
  maxWidth: '800px',
})
</script>

<template>
  <section class="content-section">
    <div class="container">
      <div class="content-card" :style="{ maxWidth }">
        <!-- Icon Slot -->
        <div v-if="$slots.icon" class="card-icon" :style="{ color: iconColor }">
          <slot name="icon" />
        </div>

        <!-- Main Content Slot -->
        <slot />
      </div>
    </div>
  </section>
</template>

<style scoped>
.content-section {
  padding: 6rem 2rem;
  background-color: var(--cream);
}

.content-card {
  margin: 0 auto;
  padding: 4rem 3rem;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.card-icon {
  margin-bottom: 2rem;
}

@media (max-width: 768px) {
  .content-card {
    padding: 2.5rem 1.5rem;
  }
}
</style>
