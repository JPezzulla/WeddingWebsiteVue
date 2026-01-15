<script setup lang="ts">
interface Option {
  value: string
  label: string
  icon: string
}

interface Props {
  modelValue: boolean
  leftOption: Option
  rightOption: Option
}

const props = defineProps<Props>()
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const toggle = () => {
  emit('update:modelValue', !props.modelValue)
}
</script>

<template>
  <div class="mobile-toggle-container">
    <div class="segmented-control" @click="toggle">
      <div class="segmented-bubble" :class="{ 'bubble-right': modelValue }"></div>
      <div class="segment-btn" :class="{ active: !modelValue }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          v-html="leftOption.icon"
        ></svg>
        <span v-if="!modelValue">{{ leftOption.label }}</span>
      </div>
      <div class="segment-btn" :class="{ active: modelValue }">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          v-html="rightOption.icon"
        ></svg>
        <span v-if="modelValue">{{ rightOption.label }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mobile-toggle-container {
  display: none;
}

.segmented-control {
  position: relative;
  display: flex;
  background-color: white;
  border: 2px solid rgba(0, 0, 0, 0.15);
  border-radius: 50px;
  padding: 5px 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
}

.segmented-bubble {
  position: absolute;
  top: 5px;
  left: 10px;
  width: calc(50% + 15px);
  height: calc(100% - 10px);
  background-color: var(--sage-green);
  border-radius: 50px;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.15);
  z-index: 1;
}

.segmented-bubble.bubble-right {
  transform: translateX(calc(100% - 50px));
}

.segment-btn {
  position: relative;
  z-index: 2;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 0.6rem 2rem;
  background: transparent;
  border: none;
  border-radius: 50px;
  font-size: 1.4rem;
  font-weight: 600;
  color: rgba(0, 0, 0, 0.3);
  transition: color 0.3s ease;
  white-space: nowrap;
  pointer-events: none;
}

.segment-btn svg {
  transition: stroke 0.3s ease;
}

.segment-btn.active {
  color: #ffffff !important;
}

.segment-btn.active svg {
  stroke: #ffffff !important;
}

.segment-btn.active span {
  color: #ffffff !important;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .mobile-toggle-container {
    display: flex;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    left: 0;
    right: 0;
    z-index: 1000;
    pointer-events: none;
  }

  .segmented-control {
    pointer-events: all;
  }
}
</style>
