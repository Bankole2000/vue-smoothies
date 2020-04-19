<template>
  <div class="navbar">
    <nav class="nav-extended indigo darken-2">
      <div class="nav-content">
        <router-link :to="{ name: 'Home' }">
          <span class="nav-title">Banky's Smoothies</span>
        </router-link>
        <a href="" class="btn-floating btn-large halfway-fab pink tooltipped
        waves-effect waves-pink"
        data-position="left" data-tooltip="Add A New Smoothie">
          <router-link :to="{ name: 'Add' }">
            <i class="mdi mdi-plus mdi-36px"></i>
          </router-link>
        </a>
      </div>
    </nav>
  </div>
</template>

<script>
import M from 'materialize-css';

export default {
  name: 'Navbar',
  data() {
    return {

    };
  },
  mounted() {
    M.AutoInit();
  },
};
</script>

<style>
.navbar nav {
  padding: 0 20px;
}
</style>
