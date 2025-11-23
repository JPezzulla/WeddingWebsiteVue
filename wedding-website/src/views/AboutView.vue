<script setup lang="ts">
import { ref } from 'vue'
import PageLayout from '../components/PageLayout.vue'
import InfoSection from '../components/InfoSection.vue'

interface FAQ {
  question: string
  answer: string
  open: boolean
}

const faqs = ref<FAQ[]>([
  {
    question: 'What is the dress code?',
    answer:
      "We've chosen to go with Black tie optional to give our friends and family the chance to dress up as fancy as they'd like. Please do not feel obligated to rent a tux or pull out a gown, cocktail attire is entirely welcome!",
    open: false,
  },
  {
    question: 'Will there be parking at the venue?',
    answer:
      'There is limited parking available at Cafe Brauer. We recommend using SpotHero to reserve a spot in advance or using rideshare services like Uber or Lyft. Street parking is also available but can be challenging to find.',
    open: false,
  },
  {
    question: 'Can I bring a plus-one?',
    answer:
      'Due to venue capacity, we are only able to accommodate guests formally invited on your invitation. If you received a plus-one, it will be indicated on your invitation. Please reach out to us directly if you have questions.',
    open: false,
  },
  {
    question: 'Are children welcome?',
    answer:
      "While we love your little ones, we've decided to make our wedding an adults-only celebration. We hope this gives you a chance to relax and enjoy the evening!",
    open: false,
  },
  {
    question: 'What time should I arrive?',
    answer:
      'The ceremony begins promptly at 6:00 PM. We recommend arriving 15-20 minutes early to find parking and get settled. The reception will follow immediately after the ceremony.',
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
      "We're having an unplugged ceremony, which means we kindly ask that you keep your phones and cameras put away during the ceremony. Our professional photographer will capture all the special moments. Feel free to take as many photos as you'd like during the reception!",
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
      'Please respond by May 1, 2025. This helps us finalize our headcount with the venue and caterer. You can RSVP through our Zola page.',
    open: false,
  },
  {
    question: 'What if I have dietary restrictions?',
    answer:
      'Please let us know about any dietary restrictions or allergies when you RSVP. We want to make sure everyone has delicious food to enjoy!',
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
              <span>{{ faq.question }}</span>
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
              <p>{{ faq.answer }}</p>
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
          <strong>Email:</strong>
          <a href="mailto:contact@example.com" class="email-link">contact@example.com</a>
        </p>
      </div>
    </InfoSection>
  </PageLayout>
</template>

<style scoped>
.faq-container {
  max-width: 900px;
  margin: 0 auto;
}

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
  text-align: left;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  color: var(--dark-wood);
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color 0.3s ease;
}

.faq-question:hover {
  color: var(--sage-dark);
}

.faq-icon {
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
  max-height: 500px;
}

.faq-answer p {
  padding: 1rem 2rem 1.5rem;
  margin: 0;
  color: var(--text-secondary);
  line-height: 1.8;
}

.contact-content {
  text-align: center;
}

.email-link {
  color: var(--sage-dark);
  text-decoration: none;
  margin-left: 0.5rem;
}

.email-link:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .faq-question {
    padding: 1.25rem 1.5rem;
    font-size: 1.1rem;
  }

  .faq-answer p {
    padding: 0.75rem 1.5rem 1.25rem;
  }
}
</style>
