<template>
  <h1 class="text-h4 text-center my-1">🍿 Select your favorites movies or block them</h1>
  <div class="text-center">
    Press the
    <v-icon icon="mdi-keyboard"/>
    (space) to get random movies
  </div>
  <v-container>
    <v-row justify="center">
      <v-col sm="6" md="6" lg="2" v-for="(movie, index) in movies" :key="index">
        <CardMovie :movie="movie" @onSnackbarShowParent="onSnackbarShow" @onClickParent="onClick"/>
      </v-col>
    </v-row>
  </v-container>
  <v-snackbar :timeout="3000" v-bind:color="snackbar.color" v-model="snackbar.active">
    <p class="text-h6 text-center">{{ snackbar.text }}</p>
  </v-snackbar>
</template>

<script>
import MovieService from "@/service/MovieService";
import CardMovie from "@/components/CardMovie.vue";

export default {
  name: "HomeView",
  components: {
    CardMovie
  },
  data() {
    return {
      movies: [],
      snackbar: {
        active: false,
        color: '',
        text: ''
      },
      clicks: 0
    };
  },
  methods: {
    getMovies() {
      MovieService.getMovies().then((movies) => this.movies = movies);
    },
    onSpaceKeyPress(e) {
      if (e.code === "Space") this.getMovies()
    },
    onSnackbarShow(payload) {
      this.snackbar = payload
    },
    onClick(click) {
      this.clicks += click
      console.log(this.clicks)
      if (this.clicks === 5) {
        this.getMovies()
        this.clicks = 0
      }
    }
  },
  mounted() {
    this.getMovies()
  },
  created() {
    window.addEventListener('keydown', this.onSpaceKeyPress);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onSpaceKeyPress);
  },
}
</script>

<style scoped>

</style>