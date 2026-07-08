<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '../components/PageLayout.vue'
import InfoSection from '../components/InfoSection.vue'

interface FAQ {
  question: string
  answer: string
  answerHtml?: string
  open: boolean
}

const faqs = ref<FAQ[]>([
  {
    question: 'What is the dress code?',
    answer:
      "We've chosen to go with Black tie optional to give our friends and family the chance to dress up as fancy as they'd like. Please do not feel obligated to rent a tux or pull out a gown!",
    open: false,
  },
  {
    question: 'Will there be parking at the venue?',
    answer:
      'There is limited parking available at Cafe Brauer. We recommend using SpotHero to reserve a spot in advance or using rideshare services like Uber or Lyft. Street parking is also available but can be challenging to find.',
    open: false,
  },
  {
    question: 'Will there be a shuttle from the venue?',
    answer: '',
    answerHtml: `
      <p>Yes! We will have a charter bus running on a loop to all of the hotels and the venue, with the first shuttle leaving from the voco hotel at 3:00pm.</p>
      <div class="shuttle-table-wrap"><table class="shuttle-table">
        <thead>
          <tr><th>Location</th><th>Departure 1</th><th>Departure 2</th></tr>
        </thead>
        <tbody>
          <tr><td>voco Chicago Downtown</td><td>3:00 PM</td><td>4:00 PM</td></tr>
          <tr><td>The Viceroy</td><td>3:20 PM</td><td>4:20 PM</td></tr>
          <tr><td>Hotel Lincoln</td><td>3:30 PM</td><td>4:30 PM</td></tr>
          <tr><td>Cafe Brauer</td><td>3:45 PM</td><td>4:45 PM</td></tr>
        </tbody>
      </table></div>
      <div class="shuttle-cards">
        <div class="shuttle-card">
          <div class="shuttle-card-location">voco Chicago Downtown</div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 1</span><span>3:00 PM</span></div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 2</span><span>4:00 PM</span></div>
        </div>
        <div class="shuttle-card">
          <div class="shuttle-card-location">The Viceroy</div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 1</span><span>3:20 PM</span></div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 2</span><span>4:20 PM</span></div>
        </div>
        <div class="shuttle-card">
          <div class="shuttle-card-location">Hotel Lincoln</div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 1</span><span>3:30 PM</span></div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 2</span><span>4:30 PM</span></div>
        </div>
        <div class="shuttle-card">
          <div class="shuttle-card-location">Cafe Brauer</div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Arrival 1</span><span>3:45 PM</span></div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Arrival 2</span><span>4:45 PM</span></div>
        </div>
      </div>
      <p class="shuttle-return-note">The shuttle will also make return trips from Cafe Brauer back to the hotels at the end of the night:</p>
      <div class="shuttle-table-wrap"><table class="shuttle-table shuttle-return-table">
        <thead>
          <tr><th colspan="4">Return Trips from Cafe Brauer</th></tr>
        </thead>
        <tbody>
          <tr><td>9:00 PM</td><td>10:00 PM</td><td>11:00 PM</td><td>12:00 AM</td></tr>
        </tbody>
      </table></div>
      <div class="shuttle-cards">
        <div class="shuttle-card">
          <div class="shuttle-card-location">Return Trips from Cafe Brauer</div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 1</span><span>9:00 PM</span></div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 2</span><span>10:00 PM</span></div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 3</span><span>11:00 PM</span></div>
          <div class="shuttle-card-time"><span class="shuttle-card-label">Departure 4</span><span>12:00 AM</span></div>
        </div>
      </div>
    `,
    open: false,
  },
  {
    question: 'Can I bring a plus-one?',
    answer:
      'Due to venue capacity, we are only able to accommodate guests formally included in your rsvp. Please reach out to us directly if you have questions.',
    open: false,
  },
  {
    question: 'What time should I arrive?',
    answer:
      'We ask that you arrive by 4:45 at the latest to find parking and get settled. The ceremony begins promptly at 5:00 PM. The reception will immediately follow after the ceremony.',
    open: false,
  },
  {
    question: 'Will there be food and drinks?',
    answer:
      "Absolutely! We'll be serving a full dinner with multiple courses, along with beer, wine, and signature cocktails throughout the evening. If you have any dietary restrictions, please let us know when you RSVP.",
    open: false,
  },
  {
    question: 'Is the venue accessible?',
    answer:
      "Yes, Cafe Brauer is ADA accessible. If you have specific accessibility needs, please let us know when you RSVP so we can ensure you're comfortable.",
    open: false,
  },
  {
    question: 'Can I take photos during the ceremony?',
    answer:
      "We kindly ask that you keep your phones and cameras put away during the ceremony. Our professional photographer will capture all the special moments. Feel free to take as many photos as you'd like during the reception!",
    open: false,
  },
  {
    question: 'Where should I stay?',
    answer:
      "Check out our Chicago page for hotel recommendations near the venue! We've listed several options at various price points, all within a short distance of Cafe Brauer.",
    open: false,
  },
  {
    question: 'When is the RSVP deadline?',
    answer:
      'Please respond by September 1. This helps us finalize our headcount with the venue and caterer. You can RSVP through our RSVP tab.',
    open: false,
  },
])

const toggleFaq = (index: number) => {
  faqs.value[index].open = !faqs.value[index].open
}
</script>

<template>
  <PageLayout
    title="Frequently Asked Questions"
    subtitle="Everything you need to know about our big day"
    gradient-from="var(--amethyst)"
    gradient-to="var(--ruby-red)"
    background-image="/images/joe-and-kait/Kauffman-Pezzulla-E-0024.webp"
  >
    <!-- FAQ Content -->
    <InfoSection title="">
      <div class="faq-container">
        <div class="faq-list">
          <div
            v-for="(faq, index) in faqs"
            :key="index"
            class="faq-item"
            :class="{ open: faq.open }"
          >
            <button class="faq-question" @click="toggleFaq(index)">
              <span class="faq-question-text">{{ faq.question }}</span>
              <svg
                class="faq-icon"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
            <div class="faq-answer">
              <div v-if="faq.answerHtml" class="faq-answer-html" v-html="faq.answerHtml" />
              <p v-else>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </InfoSection>

    <!-- Contact Section -->
    <InfoSection title="Still Have Questions?" :alternate="true">
      <div class="contact-content">
        <p style="margin: 0 auto 2rem">
          Don't see your question answered here? Feel free to reach out to us directly. We're happy
          to help!
        </p>
        <p style="margin: 0 auto">
          <strong>Kait's Number:</strong>
          <span class="email-link">(312)-270-5843</span>
        </p>
        <p style="margin: 0 auto">
          <strong>Joe's Number:</strong>
          <span class="email-link">(443)-823-9021</span>
        </p>
      </div>
    </InfoSection>
  </PageLayout>
</template>

<style scoped>
.faq-list {
  max-width: 900px;
  margin: 0 auto;
}

.faq-item {
  background-color: #fff;
  border-radius: 8px;
  margin-bottom: 1rem;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.faq-item:hover {
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.faq-question {
  width: 100%;
  padding: 1.5rem 2rem;
  background: none;
  border: none;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  color: var(--dark-wood);
  cursor: pointer;
  display: grid;
  grid-template-columns: 1fr 24px;
  column-gap: 0.75rem;
  align-items: center;
  transition: color 0.3s ease;
}

.faq-question:hover {
  color: var(--sage-dark);
}

.faq-question-text {
  grid-column: 1;
  text-align: center;
}

.faq-icon {
  grid-column: 2;
  justify-self: end;
  flex-shrink: 0;
  transition: transform 0.3s ease;
  color: var(--sage-dark);
}

.faq-item.open .faq-icon {
  transform: rotate(180deg);
}

.faq-answer {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease;
}

.faq-item.open .faq-answer {
  max-height: 600px;
}

.faq-answer p {
  padding: 1rem 2rem 1.5rem;
  margin: 0 auto;
  color: var(--text-secondary);
  line-height: 1.8;
  text-align: center;
}

.faq-answer-html {
  padding: 1rem 2rem 1.5rem;
  color: var(--text-secondary);
  line-height: 1.8;
  text-align: center;
}

:deep(.shuttle-table),
:deep(.shuttle-table td) {
  text-align: left;
}

:deep(.faq-answer-html p) {
  margin: 0 auto 1rem;
}

:deep(.shuttle-table-wrap) {
  overflow-x: auto;
}

:deep(.shuttle-table) {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.95rem;
  margin-top: 0.5rem;
}

:deep(.shuttle-table th) {
  text-align: left;
  padding: 0.6rem 1rem;
  background-color: var(--sage-green);
  color: white;
  font-weight: 600;
  letter-spacing: 0.03em;
}

:deep(.shuttle-table th:first-child) {
  border-radius: 6px 0 0 0;
}

:deep(.shuttle-table th:last-child) {
  border-radius: 0 6px 0 0;
}

:deep(.shuttle-table td) {
  padding: 0.6rem 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);
}

:deep(.shuttle-table tbody tr:last-child td) {
  border-bottom: none;
}

:deep(.shuttle-table tbody tr:nth-child(even)) {
  background-color: var(--cream);
}

:deep(.shuttle-return-table th) {
  text-align: center;
  border-radius: 6px 6px 0 0;
}

:deep(.shuttle-return-table td) {
  text-align: center;
  font-weight: 600;
  color: var(--dark-wood);
}

:deep(.shuttle-cards) {
  display: none;
}

:deep(.shuttle-card) {
  text-align: left;
  background-color: var(--cream);
  border-radius: 8px;
  padding: 0.85rem 1rem;
}

:deep(.shuttle-card + .shuttle-card) {
  margin-top: 0.6rem;
}

:deep(.shuttle-card-location) {
  font-weight: 600;
  color: var(--dark-wood);
  margin-bottom: 0.4rem;
}

:deep(.shuttle-card-time) {
  display: flex;
  justify-content: space-between;
  font-size: 0.9rem;
  padding: 0.15rem 0;
}

:deep(.shuttle-card-label) {
  color: var(--text-light);
}

:deep(.shuttle-return-note) {
  margin-top: 1rem;
}

.contact-content {
  text-align: center;
}

.email-link {
  color: var(--sage-dark);
  text-decoration: none;
  margin-left: 0.5rem;
}

@media (max-width: 768px) {
  .faq-question {
    padding: 1.25rem 1.5rem;
    font-size: 1.1rem;
  }

  .faq-answer p {
    padding: 0.75rem 1.5rem 1.25rem;
  }

  .faq-answer-html {
    padding: 0.75rem 1.5rem 1.25rem;
  }

  :deep(.shuttle-table-wrap) {
    display: none;
  }

  :deep(.shuttle-cards) {
    display: block;
    margin-top: 0.5rem;
  }

  .faq-item.open .faq-answer {
    max-height: 1200px;
  }
}
</style>
