<template>
  <h4 class="text-h4 text-center my-1">🚫 Here are your banned movies</h4>
  <div class="text-center">
    Press the
    <v-icon icon="mdi-lock-open-variant"/>
    (unlock) to remove the movie from your banned list
  </div>
  <v-container>
    <v-row justify="center">
      <v-col sm="6" md="6" lg="2" v-for="(movie, index) in movies" :key="index">
        <CardBlockedMovie :movie="movie" @onClickParent="onClick"/>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar :timeout="3000" v-bind:color="snackbar.color" v-model="snackbar.active">
    <p class="text-h6 text-center">{{ snackbar.text }}</p>
  </v-snackbar>
</template>

<script>

import StoreService from "@/service/StoreService";
import CardBlockedMovie from "@/components/CardBlockedMovie.vue";

export default {
  name: "BlockedView",
  components: {
    CardBlockedMovie
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
      StoreService.removeBlock(movie)
      this.snackbar = {
        active: true,
        color: 'success',
        text: `Movie ${movie.original_title} removed from banned list`
      }
      this.getMovies()
    },
    getMovies() {
      this.movies = StoreService.getBlocks()
    }
  },
  mounted() {
    this.getMovies()
  }
}
</script>

<style scoped>

</style>