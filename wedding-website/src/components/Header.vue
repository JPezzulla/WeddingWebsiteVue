<script setup lang="ts">
import '../assets/base.css'
</script>

<template>
  <div id="header">Joe and Kait</div>
  <nav>
    <RouterLink class="link sidebar" exact-active-class="selected" to="/">Home</RouterLink>
    <RouterLink class="link sidebar" exact-active-class="selected" to="/us">Our Story</RouterLink>
    <RouterLink class="link sidebar" exact-active-class="selected" to="/chicago"
      >Our City</RouterLink
    >
    <RouterLink class="link sidebar" exact-active-class="selected" to="/rsvp">RSVP</RouterLink>
    <RouterLink class="link sidebar" exact-active-class="selected" to="/registry"
      >Registry</RouterLink
    >
    <RouterLink class="link sidebar" exact-active-class="selected" to="/faq">FAQ</RouterLink>
  </nav>
</template>

<style scoped>
div {
  gap: 0.5rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e3e3e3;
}
#header {
  font-family: Cardo;
  color: rgb(20, 20, 21);
  font-weight: 400;
  text-transform: capitalize;
  line-height: 1.3;
  letter-spacing: normal;
  font-size: 42px;
}

.link {
  margin: 15px 30px 10px 30px;
}

.selected {
  margin: 15px 30px 10px 30px;
  border-bottom: 3px solid black;
}

nav {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

nav a {
  display: flex;
  align-items: center;
  justify-content: space-between;
  overflow: hidden;

  white-space: pre;
  padding: 0.5rem;
  color: inherit;
  text-decoration: none;
  gap: 1rem;
}

nav a:hover {
  border-bottom: 1px solid black;
}

nav a.active {
  border-bottom: 25px solid black;
}

nav a.pending {
  border-bottom: 12px solid black;
}
</style>
