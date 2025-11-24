<script setup lang="ts"></script>

<template>
  <footer class="site-footer">
    <div class="footer-content">
      <div class="easter-egg">
        <!-- Tuxedo Cat -->
        <svg
          class="cat-icon"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Tuxedo cat with bowl -->
          <g>
            <!-- Bowl -->
            <ellipse cx="20" cy="32" rx="8" ry="3" fill="#c9a961" />
            <path d="M 12 32 Q 12 28 20 28 Q 28 28 28 32" fill="#e5d4a6" />

            <!-- Cat body (sitting, eating) -->
            <ellipse cx="20" cy="22" rx="7" ry="9" fill="#2d2d2d" />

            <!-- White chest -->
            <ellipse cx="20" cy="24" rx="4" ry="6" fill="#ffffff" />

            <!-- Head -->
            <circle cx="20" cy="15" r="6" fill="#2d2d2d" />

            <!-- White face patch -->
            <ellipse cx="20" cy="16" rx="3.5" ry="4" fill="#ffffff" />

            <!-- Ears -->
            <path d="M 15 12 L 14 8 L 17 11 Z" fill="#2d2d2d" />
            <path d="M 25 12 L 26 8 L 23 11 Z" fill="#2d2d2d" />

            <!-- Eyes -->
            <circle cx="18" cy="15" r="1.2" fill="#8a9a7b" />
            <circle cx="22" cy="15" r="1.2" fill="#8a9a7b" />

            <!-- Nose -->
            <circle cx="20" cy="17" r="0.8" fill="#ffb3ba" />

            <!-- White paws -->
            <ellipse cx="16" cy="30" rx="2" ry="2.5" fill="#ffffff" />
            <ellipse cx="24" cy="30" rx="2" ry="2.5" fill="#ffffff" />
          </g>
        </svg>

        <!-- Konami Code -->
        <div class="konami-code">
          <span class="code-arrow">↑</span>
          <span class="code-arrow">↑</span>
          <span class="code-arrow">↓</span>
          <span class="code-arrow">↓</span>
          <span class="code-arrow">←</span>
          <span class="code-arrow">→</span>
          <span class="code-arrow">←</span>
          <span class="code-arrow">→</span>
          <span class="code-letter">B</span>
          <span class="code-letter">A</span>
        </div>

        <!-- Bengal Cat -->
        <svg
          class="cat-icon"
          width="40"
          height="40"
          viewBox="0 0 40 40"
          xmlns="http://www.w3.org/2000/svg"
        >
          <!-- Bengal cat with bowl -->
          <g>
            <!-- Bowl -->
            <ellipse cx="20" cy="32" rx="8" ry="3" fill="#c9a961" />
            <path d="M 12 32 Q 12 28 20 28 Q 28 28 28 32" fill="#e5d4a6" />

            <!-- Cat body (sitting, eating) -->
            <ellipse cx="20" cy="22" rx="7" ry="9" fill="#d4a574" />

            <!-- Bengal spots -->
            <circle cx="17" cy="20" r="1.5" fill="#8b6f47" opacity="0.8" />
            <circle cx="23" cy="21" r="1.2" fill="#8b6f47" opacity="0.8" />
            <circle cx="19" cy="25" r="1.3" fill="#8b6f47" opacity="0.8" />
            <circle cx="22" cy="24" r="1" fill="#8b6f47" opacity="0.8" />

            <!-- Head -->
            <circle cx="20" cy="15" r="6" fill="#d4a574" />

            <!-- Head spots -->
            <circle cx="17" cy="14" r="1" fill="#8b6f47" opacity="0.8" />
            <circle cx="23" cy="15" r="0.8" fill="#8b6f47" opacity="0.8" />

            <!-- Ears -->
            <path d="M 15 12 L 14 8 L 17 11 Z" fill="#d4a574" />
            <path d="M 25 12 L 26 8 L 23 11 Z" fill="#d4a574" />

            <!-- Eyes -->
            <circle cx="18" cy="15" r="1.2" fill="#6b9b37" />
            <circle cx="22" cy="15" r="1.2" fill="#6b9b37" />

            <!-- Nose -->
            <circle cx="20" cy="17" r="0.8" fill="#ffb3ba" />

            <!-- Paws -->
            <ellipse cx="16" cy="30" rx="2" ry="2.5" fill="#d4a574" />
            <ellipse cx="24" cy="30" rx="2" ry="2.5" fill="#d4a574" />
          </g>
        </svg>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background-color: var(--cream);
  border-top: 1px solid rgba(138, 154, 123, 0.2);
  padding: 2rem 0 1.5rem;
  margin-top: auto;
}

.footer-content {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 2rem;
}

.easter-egg {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  opacity: 0.6;
  transition: opacity 0.3s ease;
}

.easter-egg:hover {
  opacity: 1;
}

.cat-icon {
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  animation: gentle-bounce 3s ease-in-out infinite;
}

.cat-icon:first-child {
  animation-delay: 0s;
}

.cat-icon:last-child {
  animation-delay: 1.5s;
}

@keyframes gentle-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-3px);
  }
}

.konami-code {
  display: flex;
  gap: 0.3rem;
  align-items: center;
  font-family: 'Courier New', monospace;
  font-size: 0.9rem;
  color: var(--text-light);
  padding: 0.5rem 1rem;
  background-color: rgba(138, 154, 123, 0.1);
  border-radius: 8px;
  border: 1px dashed rgba(138, 154, 123, 0.3);
}

.code-arrow,
.code-letter {
  display: inline-block;
  transition: all 0.2s ease;
}

.easter-egg:hover .code-arrow,
.easter-egg:hover .code-letter {
  color: var(--sage-dark);
  transform: scale(1.1);
}

.code-arrow {
  font-size: 1.1rem;
}

.code-letter {
  font-weight: bold;
  background-color: var(--sage-green);
  color: var(--cream);
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.8rem;
}

@media (max-width: 768px) {
  .easter-egg {
    display: none;
  }
}
</style>
