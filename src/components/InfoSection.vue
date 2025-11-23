<script setup lang="ts">
interface Props {
  title: string
  intro?: string
  alternate?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  intro: '',
  alternate: false,
})
</script>

<template>
  <section class="info-section" :class="{ alt: alternate }">
    <div class="container">
      <h2>{{ title }}</h2>
      <p v-if="intro" class="section-intro">{{ intro }}</p>
      <slot />
    </div>
  </section>
</template>

<style scoped>
.info-section {
  padding: 6rem 2rem;
  background-color: var(--cream);
}

.info-section.alt {
  background-color: #fff;
}

.info-section h2 {
  text-align: center;
  margin-bottom: 1rem;
}

.section-intro {
  text-align: center;
  margin: 0 auto 3rem;
  max-width: 700px;
}
</style>
