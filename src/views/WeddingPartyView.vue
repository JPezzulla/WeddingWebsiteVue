<script setup lang="ts">
import PageLayout from '../components/PageLayout.vue'
import InfoSection from '../components/InfoSection.vue'

interface PartyMember {
  name: string
  subtext: string
  image: string
}

const groomsParty: PartyMember[] = [
  {
    name: 'Derek Scott',
    subtext: 'Best Man',
    image: '/images/wedding-party/derek-joe.png',
  },
  {
    name: 'Mary Katherine Joy',
    subtext: 'Groomsmaid',
    image: '/images/wedding-party/katiej-joe.png',
  },
  {
    name: 'Maggie Fritz',
    subtext: 'Groomsmaid',
    image: '/images/wedding-party/maggie-joe.png',
  },
  {
    name: 'Maura Pezzulla',
    subtext: 'Sister of the Groom',
    image: '/images/wedding-party/maura-joe.png',
  },
  {
    name: 'Nathan Longstreth',
    subtext: 'Groomsman',
    image: '/images/wedding-party/nate-joe.png',
  },
  {
    name: 'Andrew Pezzulla',
    subtext: 'Brother of the Groom',
    image: '/images/wedding-party/drew-joe.png',
  },
  {
    name: 'Luke Pezzulla',
    subtext: 'Brother of the Groom',
    image: '/images/wedding-party/luke-joe.png',
  },
  {
    name: 'Michael Pezzulla',
    subtext: 'Brother of the Groom',
    image: '/images/wedding-party/michael-joe.png',
  },
]

const bridesParty: PartyMember[] = [
  {
    name: 'Katherine Fuller',
    subtext: 'Maid of Honor',
    image: '/images/wedding-party/katief-kait.png',
  },
  {
    name: 'Kaitlyn Groves',
    subtext: 'Bridesmaid',
    image: '/images/wedding-party/katieg-kait.png',
  },
  {
    name: "Jessica D'Apice",
    subtext: 'Bridesmaid',
    image: '/images/wedding-party/jess-kait.png',
  },
  {
    name: 'Sam Kauffman',
    subtext: 'Brother of the Bride',
    image: '/images/wedding-party/sam-kait.png',
  },
  {
    name: 'Shirley Kauffman',
    subtext: 'Sister-in-law of the Bride',
    image: '/images/wedding-party/shirley-kait.png',
  },
]

const officiant = {
  name: "Garrett Lyons",
  images: [
    '/images/wedding-party/garrett-joe.png',
    '/images/wedding-party/garrett-kait.png'
  ]
}
</script>

<template>
  <PageLayout
    title="Wedding Party"
    subtitle="The special people standing by our side"
    gradient-from="var(--gold)"
    gradient-to="var(--sage-dark)"
    background-image="/images/joe-and-kait/Kauffman-Pezzulla-E-0147.jpg"
    background-position="right 42%"
    background-size="150%"
  >
    <!-- Groom's Party Section -->
    <InfoSection title="Groom's Party">
      <div class="party-grid">
        <div v-for="member in groomsParty" :key="member.name" class="party-member">
          <div class="member-image">
            <img :src="member.image" :alt="member.name" />
          </div>
          <h3>{{ member.name }}</h3>
          <p class="member-subtext">{{ member.subtext }}</p>
        </div>
      </div>
    </InfoSection>

    <!-- Bride's Party Section -->
    <InfoSection title="Bride's Party" :alternate="true">
      <div class="party-grid">
        <div v-for="member in bridesParty" :key="member.name" class="party-member">
          <div class="member-image">
            <img :src="member.image" :alt="member.name" />
          </div>
          <h3>{{ member.name }}</h3>
          <p class="member-subtext">{{ member.subtext }}</p>
        </div>
      </div>
    </InfoSection>

    <!-- Officiant Section -->
    <InfoSection title="Officiant">
      <div class="officiant-container">
        <div class="party-member">
          <div class="officiant-images">
            <div v-for="(image, index) in officiant.images" :key="index" class="member-image officiant-image">
              <img :src="image" :alt="`${officiant.name} - Photo ${index + 1}`" />
            </div>
          </div>
          <h3>{{ officiant.name }}</h3>
        </div>
      </div>
    </InfoSection>
  </PageLayout>
</template>

<style scoped>
.party-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
  justify-items: center;
}

.officiant-container {
  display: flex;
  justify-content: center;
  padding: 2rem 0;
  max-width: 1200px;
  margin: 0 auto;
}

.officiant-images {
  display: flex;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

.officiant-image {
  width: 200px;
  height: 200px;
}

.party-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.member-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 4px solid var(--sage-green);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
}

.member-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.party-member h3 {
  font-size: 1.5rem;
  color: var(--dark-wood);
  margin-bottom: 0.5rem;
  font-family: 'Georgia', 'Palatino', serif;
}

.member-subtext {
  font-family: 'Helvetica Neue', 'Arial', sans-serif;
  font-size: 1rem;
  color: var(--sage-dark);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
}

@media (max-width: 768px) {
  .party-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 2rem;
    padding: 1rem 0;
  }

  .member-image {
    width: 140px;
    height: 140px;
  }

  .party-member h3 {
    font-size: 1.2rem;
  }

  .member-subtext {
    font-size: 0.9rem;
  }

  .officiant-images {
    flex-direction: column;
    gap: 1.5rem;
  }

  .officiant-image {
    width: 160px;
    height: 160px;
  }
}
</style>
