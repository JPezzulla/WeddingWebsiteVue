<template>
  <div class="badge-container">
    <svg
      width="100"
      height="100"
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
      class="bear-badge"
    >
      <g>
        <!-- Bunny ear antennas -->
        <g stroke="#333" stroke-width="2.5" fill="none" stroke-linecap="round">
          <!-- Left antenna -->
          <line x1="42" y1="15" x2="38" y2="3" />

          <!-- Right antenna -->
          <line x1="58" y1="15" x2="62" y2="3" />
        </g>

        <!-- TV body -->
        <rect
          x="5"
          y="15"
          width="90"
          height="80"
          rx="8"
          fill="#1a4d8f"
          stroke="#333"
          stroke-width="2"
        />

        <!-- TV screen -->
        <rect
          x="12"
          y="22"
          width="76"
          height="66"
          rx="6"
          fill="#1a4d8f"
          stroke="#fff"
          stroke-width="2.5"
        />
      </g>

      <!-- "AS SEEN ON" text -->
      <text
        x="50"
        y="38"
        font-family="Arial, sans-serif"
        font-size="9.5"
        font-weight="bold"
        fill="#fff"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="1.5"
      >
        AS SEEN ON
      </text>

      <!-- Bear icon with rounded mouth -->
      <g transform="translate(50, 55) scale(0.18)">
        <path
          d="M-20-10 A10 10 0 1 1 -10-20 A15 15 0 0 1 10-20 A10 10 0 1 1 20-10 Q20 15 0 30 Q-20 15 -20-10 Z"
          fill="#fff"
        />
        <circle cx="-8" cy="-5" r="2" fill="#1a4d8f" />
        <circle cx="8" cy="-5" r="2" fill="#1a4d8f" />
        <!-- Rounded nose/mouth -->
        <ellipse cx="0" cy="3" rx="3" ry="2" fill="#1a4d8f" />
      </g>

      <!-- "THE BEAR" text in center -->
      <text
        x="50"
        y="69"
        font-family="Arial, sans-serif"
        font-size="10"
        font-weight="bold"
        fill="#fff"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="0.8"
      >
        THE
      </text>
      <text
        x="50"
        y="80"
        font-family="Arial, sans-serif"
        font-size="12"
        font-weight="bold"
        fill="#fff"
        text-anchor="middle"
        dominant-baseline="middle"
        letter-spacing="1.2"
      >
        BEAR
      </text>
    </svg>
  </div>
</template>

<style scoped>
.badge-container {
  display: inline-block;
  margin-top: 1rem;
}

.bear-badge {
  width: 80px;
  height: 80px;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
  transform: rotate(-8deg);
}

.bear-badge:hover {
  transform: rotate(-8deg) scale(1.05);
  transition: transform 0.2s ease;
}
</style>
