<template>
  <div id="app">
    <Navbar />
    <router-view/>
    <Footer />
  </div>
</template>
<script>
import Navbar from '@/components/Navbar.vue';
import Footer from '@/components/Footer.vue';
// eslint-disable-line
// import '@/assets/js/materialize.js';

export default {
  name: 'App',
  components: {
    Navbar,
    Footer,
  },
};
</script>
<style>
@import './assets/materialize.min.css';
@import './assets/mdifonts/materialdesignicons.min.css';

</style>
