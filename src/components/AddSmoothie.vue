<template>
  <div class="add-smoothie container">
    <h2 class="center-align indigo-text">Add New Smoothie Recipe</h2>
    <form @submit.prevent ="addSmoothie">
      <div class="field title">
        <label for="title">Smoothie Title:</label>
        <input type="text" name="title" v-model="title" autocomplete="off">
      </div>
     <div class="row" v-for="(ing, index) in ingredients" :key="index">
          Ingredient No {{index + 1}}:
          <div class="input-field inline">
            <i class="mdi mdi-close-circle delete " @click='deleteIng(ing)'></i>
            <input id="ingredient" type="text" v-model="ingredients[index]">

          </div>
      </div>

      <div class="field add-ingredient">

        <label for="add-ingredient">Hit Enter to Add Multiple Ingredients:</label>
        <i class="mdi mdi-plus-circle add" @click='addIng'></i>
        <input type="text" name="add-ingredient" @keydown.enter.prevent='addIng' v-model="another">

      </div>
      <div class="progress" v-if="loading">
        <div class="indeterminate"></div>
      </div>
      <div class="field center-align">
        <p v-if="feedback" class="red-text">{{feedback}}</p>
        <button @click.prevent='addSmoothie' class="btn pink waves-effect waves-light">
          <i class="mdi mdi-plus-circle-outline"></i> Add Smoothie</button>
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
import M from 'materialize-css';
import slugify from 'slugify';

export default {
  name: 'AddSmoothie',
  data() {
    return {
      title: null,
      another: null,
      ingredients: [],
      feedback: null,
      slug: null,
      loading: false,
    };
  },
  methods: {
    addSmoothie() {
      if (this.title && this.ingredients.length > 0) {
        this.feedback = null;
        this.loading = true;
        // create a slug
        this.slug = slugify(this.title, {
          replacement: '-',
          remove: /[$*_+~.()'"!\-:@]/g,
          lower: true,
        });
        db.collection('smoothies').add({
          title: this.title,
          ingredients: this.ingredients,
          slug: this.slug,
        })
          .then(() => {
            this.loading = false;
            M.toast({ html: '<i class="mdi mdi-check-circle mdi-24px"></i> Smoothie Added', displayLength: 1000, completeCallback: () => { this.$router.push({ name: 'Home' }); } });
            // this.$router.push({ name: 'Home' });
          })
          .catch((err) => console.log(err));
        // console.log(this.title, this.ingredients, this.slug);
        // M.toast({ html: 'Smoothie Added' });
      } else {
        M.toast({ html: '<i class="mdi mdi-close-circle mdi-24px"></i> &nbsp; Incomplete Details' });
        this.feedback = 'Incomplete Smoothie Details';
      }
    },
    addIng() {
      if (this.another && this.title) {
        this.ingredients.push(this.another);
        console.log(this.ingredients);
        this.another = null;
        this.feedback = null;
      } else {
        this.feedback = 'Need more data for Smoothie';
      }
    },
    deleteIng(ing) {
      this.ingredients = this.ingredients.filter((ingredient) => ingredient !== ing);
    },
  },
  mounted() {
    M.AutoInit();
  },
};
</script>

<style>
  .add-smoothie {
    margin-top: 20px;
    padding: 20px;
    max-width: 500px;
  }
  .add-smoothie h2 {
    font-size: 2em;
    margin: 20px auto;
  }
  .add-smoothie .field {
    margin: 20px auto;
  }
  .add-smoothie .delete {
    position: absolute;
    right: 0;
    bottom: 16px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
  .add-smoothie .add {
    position: relative;
    left: 10%;
    top: 40px;
    color: #aaa;
    font-size: 1.4em;
    cursor: pointer;
  }
  .add-smoothie div.bottom {
    display: flex;
    justify-content: center;
  }
</style>
