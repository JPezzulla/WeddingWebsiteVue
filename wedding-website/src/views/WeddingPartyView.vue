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
    name: 'Best Man Name',
    subtext: 'Best Man',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
  },
  {
    name: 'Groomsman 1',
    subtext: 'Groomsman',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
  },
  {
    name: 'Groomsman 2',
    subtext: 'Groomsman',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop',
  },
  {
    name: 'Groomsman 3',
    subtext: 'Groomsman',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop',
  },
]

const bridesParty: PartyMember[] = [
  {
    name: 'Maid of Honor Name',
    subtext: 'Maid of Honor',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
  },
  {
    name: 'Bridesmaid 1',
    subtext: 'Bridesmaid',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
  },
  {
    name: 'Bridesmaid 2',
    subtext: 'Bridesmaid',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop',
  },
  {
    name: 'Bridesmaid 3',
    subtext: 'Bridesmaid',
    image: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=400&h=400&fit=crop',
  },
]
</script>

<template>
  <PageLayout
    title="Wedding Party"
    subtitle="The special people standing by our side"
    gradient-from="var(--gold)"
    gradient-to="var(--sage-dark)"
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
  </PageLayout>
</template>

<style scoped>
.party-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 3rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 0;
}

.party-member {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: transform 0.3s ease;
}

.party-member:hover {
  transform: translateY(-5px);
}

.member-image {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 4px solid var(--sage-green);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.party-member:hover .member-image {
  border-color: var(--gold);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.15);
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
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
}
</style>
