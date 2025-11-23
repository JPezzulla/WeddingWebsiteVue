<script setup lang="ts">
import StickySection from './StickySection.vue'
</script>

<template>
  <div class="our-story">
    <!-- Header -->
    <section class="story-header">
      <div class="container text-center">
        <h1>Our Story</h1>
        <p class="subtitle">A journey of love, laughter, and adventure</p>
      </div>
    </section>

    <!-- Sticky Section 1: How We Met -->
    <StickySection image-src="/images/our-story/section-1.jpg" image-alt="How we met">
      <h2>How We Met</h2>
      <p>
        Joe and Kait only had one degree of separation between them for years, having both known
        their friend Michael through separate walks of life, but neither had met the other until
        they'd both graduated college. It was a game of Zoom Jeapardy during the early days of the
        pandemic when they finally spoke for the first time, but as Joe will gladly tell anyone
        who'll listen, it wasn't too long into the call that he'd developed a crush on the pretty
        girl in Chicago with the tattoos and the cat.
      </p>
      <p>
        They didn't meet in person for another stretch of time after that, when Kait came down to
        visit friends and family in Maryland in Fall of 2021. They shared a now often mocked side
        hug, but had yet to spend enough time together for their love to take hold.
      </p>
    </StickySection>

    <StickySection image-src="/images/our-story/section-2.jpg" image-alt="Falling in love" reverse>
      <h2>Falling in Love</h2>
      <p>
        Joe attended a wedding for some college friends in Dallas on New Years 2022. Kait, in a bout
        of FOMO, decided to organize a trip to Denver to see John Mulaney perform at Red Rocks. The
        highlight of the wedding for Joe was receiving the three word text from Kait that sparked
        the rest of their lives: "come to denver".
      </p>
      <p>
        Joe coincidentally caught COVID at this wedding, and was quarantinging for 10 days
        immediately following the New Year's wedding. He gladly took on the new opportunity to
        continue texting Kait more. They talked about the wedding, about their holidays, about their
        favorite things. On recommendation from Kait as a way to pass the time, Joe began watching
        New Girl to have something else to talk to her about. In return, she took Joe's advice to
        start watching Ted Lasso. Eventually texting about the episodes became facetiming to watch
        them together. These dragged on late into the night, one night after another, for many
        nights in a row. They just couldn't find a reason to stop talking to each other. After a
        week of lost sleep and unsaid feelings, Joe finally confessed that he'd fallen for her, and
        she did the same. A round trip flight to Chicago was booked that night.
      </p>
    </StickySection>

    <!-- Sticky Section 3: First Date -->
    <StickySection image-src="/images/our-story/section-3.jpg" image-alt="First date">
      <h2>Our First Date</h2>
      <p>
        Joe flew to Chicago on January 31st 2022, and was a ball of nerves from the time he zipped
        up his suitcase until the first time he got to give Kait a hug. They met for the first time
        as a couple in the lobby of Kait's building in Lincoln Park, just a few blocks from where
        they'll be getting married. Kait treated him to Blackhawks tickets, and Joe got to make Kait
        french toast and tacos for the first time.
      </p>
      <p>
        It was the first of over 20 trips one had taken to see the other over the course of the long
        distance portion of their relationship. The two became staunch advocates of the merits of
        being a Southwest credit card holder.
      </p>
    </StickySection>

    <!-- Sticky Section 4: Adventures Together -->
    <StickySection
      image-src="/images/our-story/section-4.jpg"
      image-alt="Adventures together"
      reverse
    >
      <h2>Adventures Together</h2>
      <p>
        The traveling nature of their relationship meant that, with enough planning, anywhere in the
        country could be the meeting spot. The two took full advantage of that fact, and spent the
        early days of their relationship exploring the US side by side. Trips to visit friends,
        checking off National Parks, music festivals, sports games, any excuse they could get to go
        somewhere together they'd take.
      </p>
      <p>
        By the time Joe's lease was expiring in Baltimore, it was obvious to both of them that they
        never wanted another adventure in life without the other person by their side. In one of his
        last trips to Chicago as a visitor, Joe and Kait toured the apartment they now live in, and
        signed the lease to live together. Joe packed up his life into his car and drove up to
        Chicago in June 2023, where he and Kait have lived together since.
      </p>
    </StickySection>

    <!-- Sticky Section 5: The Proposal -->
    <StickySection image-src="/images/our-story/section-5.jpg" image-alt="The proposal">
      <h2>The Proposal</h2>
      <p>
        Joe and Kait knew very early on that neither of them was interested in being with anyone
        else for the rest of their lives, but it wasn't until a year into living together that a
        proposal crystallized into the next step. After shopping for rings together and finding the
        style she knew was right, Kait graciously accepted ignorance towards her own engagement, and
        Joe got to work crafting the plan.
      </p>
      <p>
        With the help of friends (Chicago) Katie and Sarah, Kait was brought to North Pond on
        Friday, September 27th 2024, under the guise of celebrating Sarah's (fake) promotion. Joe
        asked her to marry him at North Pond, right by the restaurant they had their first true date
        night at. She happily said yes.
      </p>
    </StickySection>

    <!-- Timeline CTA -->
    <section class="timeline-cta">
      <div class="container text-center">
        <h2>And Now...</h2>
        <p style="margin: 0 auto">
          We're excited to begin our next chapter together, and we're thrilled to have you join us
          as we celebrate our love on our wedding day.
        </p>
        <!-- <div style="margin-top: 2rem">
          <RouterLink to="/rsvp" class="btn btn-gold">RSVP to Join Us</RouterLink>
        </div> -->
      </div>
    </section>
  </div>
</template>

<style scoped>
.our-story {
  width: 100%;
}

.story-header {
  padding: 6rem 2rem 4rem;
  background: linear-gradient(135deg, var(--sage-green) 0%, var(--emerald-green) 100%);
  color: var(--cream);
  text-align: center;
}

.story-header h1 {
  color: var(--cream);
  margin-bottom: 1rem;
}

.subtitle {
  font-size: clamp(1.1rem, 2vw, 1.5rem);
  font-style: italic;
  color: var(--cream);
  opacity: 0.9;
}

.timeline-cta {
  padding: 8rem 2rem;
  background-color: var(--cream);
}

.timeline-cta h2 {
  margin-bottom: 2rem;
}

/* Mobile responsive */
@media (max-width: 768px) {
  .story-header {
    padding: 5rem 1.5rem 3rem;
  }

  .timeline-cta {
    padding: 4rem 1.5rem;
  }
}
</style>
