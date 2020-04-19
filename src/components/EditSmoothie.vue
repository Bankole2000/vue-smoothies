<template>
  <div class="edit-smoothie container">
    <Loader v-if="!smoothie" />
    <h2 v-if="smoothie" class="center-align indigo-text">Edit
      <span class="pink-text">{{ smoothie.title }}</span></h2>
     <form v-if="smoothie" @submit.prevent ="editSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="smoothie.title" autocomplete="off">
      </div>
     <div class="row" v-for="(ing, index) in smoothie.ingredients" :key="index">
          Ingredient No {{index + 1}}:
          <div class="input-field inline">
            <i class="mdi mdi-close-circle delete " @click='deleteIng(ing)'></i>
            <input id="ingredient" type="text" v-model="smoothie.ingredients[index]">

          </div>
      </div>

      <div class="field add-ingredient">
        <label for="add-ingredient">Hit Enter to add multiple Ingredients:</label>
        <input type="text" name="add-ingredient" @keydown.enter.prevent='addIng' v-model="another">
      </div>
      <div class="progress" v-if="loading">
        <div class="indeterminate"></div>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button @click.prevent='editSmoothie' class="btn pink waves-effect waves-light">
          <i class="mdi mdi-update"></i> Update Smoothie</button>
      </div>

    </form>
    <div class="bottom">
      <router-link to="/">
        <button class="btn waves-effect waves-light align-center" style="margin-top: 20px;">
        <i class="mdi mdi-home"></i> Return to Home Page</button>
      </router-link>
    </div>
  </div>
</template>

<script>
import db from '@/firebase/init';
import slugify from 'slugify';
import M from 'materialize-css';
import Loader from '@/components/Loader.vue';

export default {
  name: 'EditSmoothie',
  data() {
    return {
      smoothie: null,
      another: null,
      feedback: null,
      loading: false,
    };
  },
  components: {
    Loader,
  },
  methods: {
    editSmoothie() {
      if (this.smoothie.title && this.smoothie.ingredients.length > 0) {
        this.feedback = null;
        this.loading = true;
        // create a slug
        this.smoothie.slug = slugify(this.smoothie.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection('smoothies').doc(this.smoothie.id).update({
          title: this.smoothie.title,
          ingredients: this.smoothie.ingredients,
          slug: this.smoothie.slug,
        })
          .then(() => {
            this.loading = false;
            M.toast({ html: '<i class="mdi mdi-check-circle mdi-24px"></i> Smoothie Updated', displayLength: 1000, completeCallback: () => { this.$router.push({ name: 'Home' }); } });
            // this.$router.push({ name: 'Home' });
          })
          .catch((err) => console.log(err));
        // console.log(this.title, this.ingredients, this.slug);
        // M.toast({ html: 'Smoothie Added' });
      } else {
        M.toast({ html: '<i class="mdi mdi-close-circle mdi-24px"></i> &nbsp; Incomplete Details' });
      }
    },
    addIng() {
      if (this.another && this.smoothie.title) {
        this.smoothie.ingredients.push(this.another);
        console.log(this.smoothie.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'Need more data for Smoothie';
      }
    },
    deleteIng(ing) {
      this.smoothie.ingredients = this.smoothie.ingredients
        .filter((ingredient) => ingredient !== ing);
    },
  },
  created() {
    console.log(this.$route.params);
    if (this.$route.params.smoothie_id) {
      const ref = db.collection('smoothies').doc(this.$route.params.smoothie_id);
      ref.get()
        .then((doc) => {
          if (doc.exists) {
            console.log('Document data:', doc.data());
            this.smoothie = doc.data();
            this.smoothie.id = doc.id;
            console.log(this.smoothie);
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch((error) => {
          console.log('Error getting document:', error);
        });
    } else {
      const ref = db.collection('smoothies').where('slug', '==', this.$route.params.smoothie_slug);
      ref.get().then((snapshot) => {
        snapshot.forEach((doc) => {
          this.smoothie = doc.data();
          this.smoothie.id = doc.id;
        });
      });
    }
  },
};
</script>

<style>
   .edit-smoothie {
    margin-top: 20px;
    padding: 20px;
    max-width: 500px;
  }
  .edit-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .edit-smoothie .field {
    margin: 20px auto;
  }
  .edit-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
  .edit-smoothie .row {
    margin-bottom: 0;
  }
  .edit-smoothie div.field {
    margin-top: 0;
    margin-bottom: 0;
  }
  .edit-smoothie button {
    margin-top: 10px;
  }
  .edit-smoothie div.bottom {
    display: flex;
    justify-content: center;
  }
</style>
