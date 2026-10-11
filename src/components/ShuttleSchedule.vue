<script setup lang="ts">
interface Props {
  cardBackground?: string
}

withDefaults(defineProps<Props>(), {
  cardBackground: '#fff',
})

const arrivals = [
  { location: 'voco Chicago Downtown', times: ['3:00 PM', '4:00 PM'], label: 'Departure' },
  { location: 'The Viceroy', times: ['3:20 PM', '4:20 PM'], label: 'Departure' },
  { location: 'Hotel Lincoln', times: ['3:30 PM', '4:30 PM'], label: 'Departure' },
  { location: 'Cafe Brauer', times: ['3:45 PM', '4:45 PM'], label: 'Arrival' },
]

const returnTimes = ['9:00 PM', '10:00 PM', '11:00 PM', '12:00 AM']
</script>

<template>
  <div class="shuttle-schedule" :style="{ '--shuttle-card-bg': cardBackground }">
    <p class="shuttle-intro">
      We'll have a charter bus running on a loop to all of the hotels and the venue, with the
      first shuttle leaving from the voco hotel at 3:00pm.
    </p>

    <div class="shuttle-table-wrap">
      <table class="shuttle-table">
        <thead>
          <tr>
            <th>Location</th>
            <th>Departure 1</th>
            <th>Departure 2</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stop in arrivals" :key="stop.location">
            <td>{{ stop.location }}</td>
            <td v-for="time in stop.times" :key="time">{{ time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="shuttle-cards">
      <div v-for="stop in arrivals" :key="stop.location" class="shuttle-card">
        <div class="shuttle-card-location">{{ stop.location }}</div>
        <div v-for="(time, i) in stop.times" :key="time" class="shuttle-card-time">
          <span class="shuttle-card-label">{{ stop.label }} {{ i + 1 }}</span><span>{{ time }}</span>
        </div>
      </div>
    </div>

    <p class="shuttle-return-note">
      The shuttle will also make return trips from Cafe Brauer back to the hotels at the end of the
      night:
    </p>
    <div class="shuttle-table-wrap">
      <table class="shuttle-table shuttle-return-table">
        <thead>
          <tr>
            <th :colspan="returnTimes.length">Return Trips from Cafe Brauer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td v-for="time in returnTimes" :key="time">{{ time }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="shuttle-cards">
      <div class="shuttle-card">
        <div class="shuttle-card-location">Return Trips from Cafe Brauer</div>
        <div v-for="(time, i) in returnTimes" :key="time" class="shuttle-card-time">
          <span class="shuttle-card-label">Departure {{ i + 1 }}</span><span>{{ time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.shuttle-schedule {
  max-width: 800px;
  margin: 0 auto;
}

.shuttle-intro {
  text-align: center;
  margin: 0 auto 1rem;
}

.shuttle-table-wrap {
  overflow-x: auto;
}

.shuttle-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  margin-top: 0.5rem;
  text-align: left;
}

.shuttle-table th {
  text-align: left;
  padding: 0.6rem 1rem;
  background-color: var(--sage-green);
  color: white;
  font-weight: 600;
  letter-spacing: 0.03em;
}

.shuttle-table th:first-child {
  border-radius: 6px 0 0 0;
}

.shuttle-table th:last-child {
  border-radius: 0 6px 0 0;
}

.shuttle-table td {
  text-align: left;
  padding: 0.6rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.shuttle-table tbody tr:last-child td {
  border-bottom: none;
}

.shuttle-table tbody tr:nth-child(even) {
  background-color: var(--shuttle-card-bg);
}

.shuttle-return-table th {
  text-align: center;
  border-radius: 6px 6px 0 0;
}

.shuttle-return-table td {
  text-align: center;
  font-weight: 600;
  color: var(--dark-wood);
}

.shuttle-cards {
  display: none;
}

.shuttle-card {
  text-align: left;
  background-color: var(--shuttle-card-bg);
  border-radius: 8px;
  padding: 0.85rem 1rem;
}

.shuttle-card + .shuttle-card {
  margin-top: 0.6rem;
}

.shuttle-card-location {
  font-weight: 600;
  color: var(--dark-wood);
  margin-bottom: 0.4rem;
}

.shuttle-card-time {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 0.15rem 0;
}

.shuttle-card-label {
  color: var(--text-light);
}

.shuttle-return-note {
  margin: 1.5rem auto 0;
  text-align: center;
}

@media (max-width: 768px) {
  .shuttle-table-wrap {
    display: none;
  }

  .shuttle-cards {
    display: block;
    margin-top: 0.5rem;
  }
}
</style>
