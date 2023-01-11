<template>
  <h4 class="text-h4 text-center my-1">❤️ Here are your favorites movies</h4>
  <div class="text-center">
    Press the
    <v-icon icon="mdi-heart-broken"/>
    (break heart) to remove the movie from your favorites
  </div>
  <v-container>
    <v-row justify="center">
      <v-col sm="6" md="6" lg="2" v-for="(movie, index) in movies" :key="index">
        <CardFavoriteMovie :movie="movie" @onClickParent="onClick"/>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar :timeout="3000" v-bind:color="snackbar.color" v-model="snackbar.active">
    <p class="text-h6 text-center">{{ snackbar.text }}</p>
  </v-snackbar>
</template>

<script>

import StoreService from "@/service/StoreService";
import CardFavoriteMovie from "@/components/CardFavoriteMovie.vue";

export default {
  name: "FavoriteView",
  components: {
    CardFavoriteMovie,
  },
  data() {
    return {
      movies: [],
      snackbar: {
        active: false,
        color: '',
        text: ''
      },
    }
  },
  methods: {
    onClick(movie) {
      StoreService.removeFav(movie)
      this.snackbar = {
        active: true,
        color: 'error',
        text: `Movie ${movie.original_title} removed from favorites`
      }
      this.getMovies()
    },
    getMovies(){
      this.movies = StoreService.getFavs()
    }
  },
  mounted() {
    this.getMovies()
  }
}
</script>

<style scoped>

</style>