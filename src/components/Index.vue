<template>
  <div>
    <Loader v-if="loader" />
  <div class="index container">
    <div class="card" v-for="smoothie in smoothies" :key="smoothie.id">
      <div class="card-content">
        <i @click="deleteSmoothie(smoothie.id)" class="mdi mdi-delete mdi-24px"></i>
        <h2 class="indigo-text">{{smoothie.title}}</h2>
        <ul class="ingredients">
          <li v-for="(ingredient, index) in smoothie.ingredients" :key="index">
            <span class="chip">{{ ingredient }}</span>
          </li>
        </ul>
      </div>
      <router-link :to="{ name: 'Edit',
        params: { smoothie_slug: smoothie.slug, smoothie_name: smoothie.title,
        smoothie_id: smoothie.id } }">
        <a class="waves-effect waves-light btn-floating btn-large halfway-fab pink">
          <i class="mdi mdi-pencil mdi-24px"></i>
        </a>
      </router-link>
    </div>
  </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
import M from 'materialize-css';
import Loader from '@/components/Loader.vue';

export default {
  name: 'Index',
  data() {
    return {
      smoothies: [],
      loader: false,
    };
  },
  components: {
    Loader,
  },
  methods: {
    deleteSmoothie(id) {
      // Delete Document from firestore
      db.collection('smoothies').doc(id).delete()
        .then(() => {
          this.smoothies = this.smoothies.filter((smoothie) => smoothie.id !== id);
          M.toast({ html: '<i class="mdi mdi-check-circle mdi-24px"></i> &nbsp; Smoothie Deleted' });
        });
      // console.log(id);
      // this.smoothies = this.smoothies.filter((smoothie) => smoothie.id !== id);
    },
  },
  created() {
    // fetch data from the firestore
    this.loader = true;
    db.collection('smoothies').get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          // console.log(doc.data());
          const smoothie = doc.data();
          smoothie.id = doc.id;
          this.smoothies.push(smoothie);
        });
        this.loader = false;
      });
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.index {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 30px;
  margin-top: 60px;
}

.index h2 {
  font-size: 1.8em;
  text-align: center;
  margin-top: 0px;
}

.index .ingredients {
  margin: 30px auto;
}

.index .ingredients li {
  display: inline-block;
}

.index .mdi-delete {
  position: absolute;
  top: 4px;
  right: 4px;
  cursor: pointer;
  color: #aaa;
  font-size: 1.4em;
}

@media screen and (max-width: 500px) {
  .index {
    grid-template-columns: 1fr;
  }
}

</style>
