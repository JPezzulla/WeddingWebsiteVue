<script setup lang="ts">
import PageLayout from '../components/PageLayout.vue'
import ContentCard from '../components/ContentCard.vue'
import InfoSection from '../components/InfoSection.vue'

const zolaRsvpUrl = 'https://www.zola.com/wedding/kaitlynandjoseph2026/rsvp'
</script>

<template>
  <PageLayout
    title="RSVP"
    subtitle="We can't wait to celebrate with you"
    gradient-from="var(--ruby-red)"
    gradient-to="var(--amethyst)"
    background-image="/images/joe-and-kait/Kauffman-Pezzulla-E-0093.webp"
  >
    <!-- RSVP Content -->
    <ContentCard icon-color="var(--gold)">
      <template #icon>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
          <polyline points="22,6 12,13 2,6" />
        </svg>
      </template>

      <h2>Please Respond by September 1, 2026</h2>

      <p class="rsvp-description">
        We're so excited to share our special day with you! Please let us know if you'll be able to
        join us by responding through our Zola wedding page.
      </p>

      <div class="rsvp-stack">
        <div class="detail-item">
          <h3>Date</h3>
          <p>Saturday, October 17, 2026</p>
        </div>
        <div class="detail-item">
          <h3>Time</h3>
          <p>Ceremony begins at 5:00 PM CST</p>
        </div>
        <div class="detail-item">
          <h3>Venue</h3>
          <p>Cafe Brauer<br />2021 N Stockton Dr<br />Chicago, IL 60614</p>
        </div>

        <a
          :href="zolaRsvpUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-gold rsvp-cta"
        >
          RSVP on Zola
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            style="margin-left: 0.5rem"
          >
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            <polyline points="15 3 21 3 21 9" />
            <line x1="10" y1="14" x2="21" y2="3" />
          </svg>
        </a>
      </div>

      <p class="rsvp-note">
        You'll be redirected to our Zola page where you can let us know which events you'll be
        able to attend, along with selecting your meal for the Wedding dinner.
      </p>
    </ContentCard>

    <!-- Additional Info -->
    <InfoSection title="" :alternate="true">
      <div class="info-grid">
        <div class="info-item">
          <h3>Dress Code</h3>
          <p>
            Black tie optional. Dress up as fancy as you'd like, but please don't feel obligated
            to rent a tux or pull out a gown!
          </p>
        </div>
        <div class="info-item">
          <h3>Parking</h3>
          <p>
            There is limited parking available at Cafe Brauer. We recommend using SpotHero to
            reserve a spot in advance or using rideshare services like Uber or Lyft.
          </p>
        </div>
        <div class="info-item info-item-wide">
          <h3>Shuttle Schedule</h3>
          <p>
            We'll have a charter bus running on a loop to all of the hotels and the venue, with
            the first shuttle leaving from the voco hotel at 3:00pm.
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
                <tr>
                  <td>voco Chicago Downtown</td>
                  <td>3:00 PM</td>
                  <td>4:00 PM</td>
                </tr>
                <tr>
                  <td>The Viceroy</td>
                  <td>3:20 PM</td>
                  <td>4:20 PM</td>
                </tr>
                <tr>
                  <td>Hotel Lincoln</td>
                  <td>3:30 PM</td>
                  <td>4:30 PM</td>
                </tr>
                <tr>
                  <td>Cafe Brauer</td>
                  <td>3:45 PM</td>
                  <td>4:45 PM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="shuttle-cards">
            <div class="shuttle-card">
              <div class="shuttle-card-location">voco Chicago Downtown</div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 1</span><span>3:00 PM</span>
              </div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 2</span><span>4:00 PM</span>
              </div>
            </div>
            <div class="shuttle-card">
              <div class="shuttle-card-location">The Viceroy</div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 1</span><span>3:20 PM</span>
              </div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 2</span><span>4:20 PM</span>
              </div>
            </div>
            <div class="shuttle-card">
              <div class="shuttle-card-location">Hotel Lincoln</div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 1</span><span>3:30 PM</span>
              </div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 2</span><span>4:30 PM</span>
              </div>
            </div>
            <div class="shuttle-card">
              <div class="shuttle-card-location">Cafe Brauer</div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Arrival 1</span><span>3:45 PM</span>
              </div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Arrival 2</span><span>4:45 PM</span>
              </div>
            </div>
          </div>
          <p class="shuttle-return-note">
            The shuttle will also make return trips from Cafe Brauer back to the hotels at the end
            of the night:
          </p>
          <div class="shuttle-table-wrap">
            <table class="shuttle-table shuttle-return-table">
              <thead>
                <tr>
                  <th colspan="4">Return Trips from Cafe Brauer</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>9:00 PM</td>
                  <td>10:00 PM</td>
                  <td>11:00 PM</td>
                  <td>12:00 AM</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="shuttle-cards">
            <div class="shuttle-card">
              <div class="shuttle-card-location">Return Trips from Cafe Brauer</div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 1</span><span>9:00 PM</span>
              </div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 2</span><span>10:00 PM</span>
              </div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 3</span><span>11:00 PM</span>
              </div>
              <div class="shuttle-card-time">
                <span class="shuttle-card-label">Departure 4</span><span>12:00 AM</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </InfoSection>
  </PageLayout>
</template>

<style scoped>
h2 {
  margin-bottom: 2rem;
  color: var(--dark-wood);
}

.rsvp-description {
  margin: 0 auto 3rem;
  max-width: 600px;
  font-size: 1.1rem;
}

.rsvp-stack {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin: 3rem 0 2rem;
}

.detail-item h3 {
  color: var(--sage-dark);
  font-size: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  margin-bottom: 0.5rem;
}

.detail-item p {
  margin: 0 auto;
  color: var(--text-primary);
}

.rsvp-cta {
  display: inline-flex;
  align-items: center;
  font-size: 1.1rem;
  padding: 1.25rem 3rem;
  margin-top: 1rem;
}

.rsvp-note {
  margin: 0 auto;
  font-size: 0.9rem;
  color: var(--text-light);
  font-style: italic;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  max-width: 1000px;
  margin: 0 auto;
}

.info-item {
  padding: 2rem;
  text-align: center;
  background-color: var(--cream);
  border-radius: 8px;
}

.info-item h3 {
  color: var(--sage-dark);
  margin-bottom: 1rem;
}

.info-item p {
  margin: 0 auto;
}

.info-item a {
  color: var(--sage-dark);
  text-decoration: underline;
}

.info-item-wide {
  grid-column: 1 / -1;
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

.shuttle-table td {
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
  padding: 0.6rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

.shuttle-table tbody tr:last-child td {
  border-bottom: none;
}

.shuttle-table tbody tr:nth-child(even) {
  background-color: #fff;
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
  background-color: #fff;
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
  margin-top: 1rem;
  text-align: center;
}

@media (max-width: 768px) {
  :deep(.content-card) {
    background-color: transparent;
    box-shadow: none;
    border-radius: 0;
    padding: 0;
  }

  :deep(.content-section) {
    padding: 3rem 1.5rem;
  }

  .rsvp-stack {
    gap: 1.5rem;
  }

  .info-grid {
    grid-template-columns: 1fr;
  }

  .shuttle-table-wrap {
    display: none;
  }

  .shuttle-cards {
    display: block;
    margin-top: 0.5rem;
  }
}
</style>
