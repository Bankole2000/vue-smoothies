<template>
<footer class="page-footer indigo">
  <div class="container">
    <div class="row">
      <div class="col l6 s12">
        <h5 class="white-text">About <router-link to="/" class="text-link">
        Banky's Smoothies</router-link></h5>
        <p class="grey-text text-lighten-4">
          A Simple CRUD App built with
          <a href="https://vuejs.org" class="text-link" target="_blank"><i class="mdi mdi-vuejs"></i> VueJS</a> and
          <a href="https://firebase.com" class="text-link" target="_blank"><i class="mdi mdi-firebase"></i> Firebase</a> for practice, and
          demonstration purposes. <a href="https://bankole2000.github.io/portfolio"
          class="text-link" target="_blank">The Developer</a> is currently available for projects,
          collaborations, training, and/or remote employment.</p>
        <p class="grey-text text-lighten-4">Feel free to
          <a href="tel:+2348069166906" class="text-link">
            <i class="mdi mdi-phone-in-talk"></i> Call</a>
        or <a href="mailto:techybanky@gmail.com" class="text-link">
          <i class="mdi mdi-email"></i> send an email.</a></p>
      </div>
      <div class="col l4 offset-l2 s12">
        <h5 class="white-text">Social Links</h5>
        <ul>
          <li><a class="grey-text text-lighten-3" href="https://facebook.com/esan.bankole"
          target="_blank"> <i class="mdi mdi-facebook-box"></i> Facebook</a></li>
          <li><a class="grey-text text-lighten-3" href="https://www.linkedin.com/in/bankoleesan"
          target="_blank"> <i class="mdi mdi-linkedin-box"></i> Linked In</a></li>
          <li><a class="grey-text text-lighten-3" href="https://twitter.com/bankolealexesan"
          target="_blank"> <i class="mdi mdi-twitter"></i> Twitter</a></li>
          <li><a class="grey-text text-lighten-3" href="https://github.com/bankole2000"
          target="_blank"> <i class="mdi mdi-github-circle"></i> Github</a></li>
           <li><a class="grey-text text-lighten-3" href="https://discord.gg/HeAVxtM"
          target="_blank"> <i class="mdi mdi-discord"></i> Discord</a></li>
        </ul>
      </div>
    </div>
  </div>
  <div class="footer-copyright">
    <div class="container">
    <strong>© {{ year }} <a href="https://bankole2000.github.io/portfolio" class="white-text">
    Bankole Esan</a></strong>
    <a class="grey-text text-lighten-4 right" href="https://github.com/Bankole2000/vue-smoothies">
      <i class="mdi mdi-github-circle mdi-12px"></i> View on Github</a>
    </div>
  </div>
</footer>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<style>
  footer.page-footer {
    margin-top: 40px;
  }
  footer .text-link {
    color: #ffb74d;
  }
</style>
