<script setup lang="ts">
import PageLayout from '../components/PageLayout.vue'
import InfoSection from '../components/InfoSection.vue'

interface PartyMember {
  name: string
  image: string
}

const weddingParty: PartyMember[] = [
  {
    name: 'Derek Scott',
    image: '/images/wedding-party/derek-joe.png',
  },
  {
    name: 'Katherine Fuller',
    image: '/images/wedding-party/katief-kait.png',
  },
  {
    name: 'Mary Katherine Joy',
    image: '/images/wedding-party/katiej-joe.png',
  },
  {
    name: 'Kaitlyn Groves',
    image: '/images/wedding-party/katieg-kait.png',
  },
  {
    name: 'Maggie Fritz',
    image: '/images/wedding-party/maggie-joe.png',
  },
  {
    name: "Jessica D'Apice",
    image: '/images/wedding-party/jess-kait.png',
  },
  {
    name: 'Maura Pezzulla',
    image: '/images/wedding-party/maura-joe.png',
  },
  {
    name: 'Samuel Kauffman',
    image: '/images/wedding-party/sam-kait.png',
  },
  {
    name: 'Nathan Longstreth',
    image: '/images/wedding-party/nate-joe.png',
  },
  {
    name: 'Shirley Kauffman',
    image: '/images/wedding-party/shirley-kait.png',
  },
  {
    name: 'Andrew Pezzulla',
    image: '/images/wedding-party/drew-joe.png',
  },
  {
    name: 'Luke Pezzulla',
    image: '/images/wedding-party/luke-joe.png',
  },
  {
    name: 'Michael Pezzulla',
    image: '/images/wedding-party/michael-joe.png',
  },
]

const officiant = {
  name: 'Garrett Lyons',
  images: ['/images/wedding-party/garrett-joe.png', '/images/wedding-party/garrett-kait.png'],
}
</script>

<template>
  <PageLayout
    title="Wedding Party"
    gradient-from="var(--gold)"
    gradient-to="var(--sage-dark)"
    background-image="/images/joe-and-kait/Kauffman-Pezzulla-E-0147.jpg"
    background-position="right 42%"
    background-size="150%"
  >
    <!-- Wedding Party Section -->
    <InfoSection title="Wedding Party">
      <div class="party-list">
        <div v-for="(member, index) in weddingParty" :key="member.name" class="party-member-row">
          <div class="image-left" v-if="index % 2 === 0">
            <div class="member-image">
              <img
                :src="member.image"
                :alt="member.name"
                :class="{
                  'rotate-90': member.name === 'Nathan Longstreth',
                  'shift-down': member.name === 'Samuel Kauffman',
                }"
                loading="lazy"
                width="250"
                height="250"
              />
            </div>
          </div>
          <div class="image-left" v-else></div>
          <h3>{{ member.name }}</h3>
          <div class="image-right" v-if="index % 2 === 1">
            <div class="member-image">
              <img
                :src="member.image"
                :alt="member.name"
                :class="{
                  'rotate-90': member.name === 'Nathan Longstreth',
                  'shift-down': member.name === 'Samuel Kauffman',
                }"
                loading="lazy"
                width="250"
                height="250"
              />
            </div>
          </div>
          <div class="image-right" v-else></div>
        </div>
      </div>
    </InfoSection>

    <!-- Officiant Section -->
    <InfoSection title="Officiant" :alternate="true">
      <div class="officiant-container">
        <div class="officiant-images">
          <div
            v-for="(image, index) in officiant.images"
            :key="index"
            class="member-image officiant-image"
          >
            <img
              :src="image"
              :alt="`${officiant.name} - Photo ${index + 1}`"
              loading="lazy"
              width="200"
              height="200"
            />
          </div>
        </div>
        <h3 class="officiant-name">{{ officiant.name }}</h3>
      </div>
    </InfoSection>
  </PageLayout>
</template>

<style scoped>
.party-list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 1000px;
  margin: 0 auto;
  padding: 2rem 0;
}

.party-member-row {
  display: grid;
  grid-template-columns: minmax(250px, 1fr) 320px minmax(250px, 1fr);
  align-items: center;
  gap: 3rem;
  justify-items: center;
}

.image-left {
  justify-self: end;
}

.image-right {
  justify-self: start;
}

.member-image {
  width: 250px;
  height: 250px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.member-image img.rotate-90 {
  transform: rotate(90deg);
}

.member-image img.shift-down {
  object-position: center 10%;
}

.party-member-row h3 {
  font-size: 1.8rem;
  color: var(--dark-wood);
  margin: 0;
  font-family: 'Georgia', 'Palatino', serif;
  text-align: center;
  white-space: nowrap;
}

.officiant-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.officiant-images {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
  justify-content: center;
}

.officiant-image {
  width: 200px;
  height: 200px;
  border: none;
}

.officiant-name {
  font-size: 1.8rem;
  color: var(--dark-wood);
  margin: 0;
  font-family: 'Georgia', 'Palatino', serif;
  text-align: center;
}

/* Tablet/iPad responsive */
@media (max-width: 1024px) {
  .party-list {
    gap: 2.5rem;
    padding: 1.5rem 0;
  }

  .party-member-row {
    grid-template-columns: 200px 1fr 200px;
    gap: 2rem;
  }

  .member-image {
    width: 200px;
    height: 200px;
  }

  .party-member-row h3 {
    font-size: 1.6rem;
  }

  .officiant-image {
    width: 180px;
    height: 180px;
  }

  .officiant-name {
    font-size: 1.6rem;
  }
}

/* Mobile responsive */
@media (max-width: 768px) {
  .party-list {
    gap: 2rem;
    padding: 1rem 0;
  }

  .party-member-row {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .image-left,
  .image-right {
    justify-self: center;
  }

  .member-image {
    width: 150px;
    height: 150px;
  }

  .party-member-row h3 {
    font-size: 1.3rem;
    order: -1;
  }

  .officiant-images {
    flex-direction: column;
    gap: 1.5rem;
  }

  .officiant-image {
    width: 160px;
    height: 160px;
  }

  .officiant-name {
    font-size: 1.5rem;
  }
}
</style>
