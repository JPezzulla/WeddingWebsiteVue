<script setup lang="ts">
interface Props {
  stars: number
}

const props = defineProps<Props>()
</script>

<template>
  <div class="michelin-badge">
    <svg
      v-for="n in stars"
      :key="n"
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="#E4002B"
      stroke="none"
      class="star"
    >
      <path
        d="M14.792 17.063c0 .337 .057 .618 .057 .9c0 1.8 -1.238 3.037 -2.982 3.037c-1.8 0 -2.98 -1.238 -2.98 -3.206v-.731c-.957 .675 -1.576 .9 -2.42 .9c-1.518 0 -2.925 -1.463 -2.925 -3.094c0 -1.181 .844 -2.194 2.082 -2.756l.28 -.113c-1.574 -.787 -2.362 -1.688 -2.362 -2.925c0 -1.687 1.294 -3.094 2.925 -3.094c.675 0 1.52 .338 2.138 .788l.281 .112c0 -.337 -.056 -.619 -.056 -.844c0 -1.8 1.237 -3.037 2.98 -3.037c1.8 0 2.981 1.237 2.981 3.206v.394l-.056 .281c.956 -.675 1.575 -.9 2.419 -.9c1.519 0 2.925 1.463 2.925 3.094c0 1.181 -.844 2.194 -2.081 2.756l-.282 .169c1.575 .787 2.363 1.688 2.363 2.925c0 1.688 -1.294 3.094 -2.925 3.094c-.675 0 -1.575 -.281 -2.138 -.788l-.225 -.169z"
      />
    </svg>
    <span class="michelin-text">{{ stars }} MICHELIN {{ stars > 1 ? 'STARS' : 'STAR' }}</span>
  </div>
</template>

<style scoped>
.michelin-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  padding: 0.25rem 0.75rem;
  background-color: #2d2d2d;
  border-radius: 4px;
  margin-top: 0.5rem;
}

.star {
  display: inline-block;
}

.michelin-text {
  font-size: 0.7rem;
  font-weight: 700;
  color: white;
  letter-spacing: 0.05em;
}
</style>
