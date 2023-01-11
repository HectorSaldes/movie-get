<template>
  <v-card position="relative">
    <v-img :src="'https://image.tmdb.org/t/p/original/'+movie.poster_path" height="500px" cover></v-img>
    <v-card-title>{{ movie.original_title }}</v-card-title>
    <v-card-subtitle>{{ movie.overview ? movie.overview : 'No description' }}</v-card-subtitle>
    <v-card-text>
      <v-chip prepend-icon="mdi-translate" variant="text">
        Original language: {{ movie.original_language.toUpperCase() }}
      </v-chip>
      <v-chip prepend-icon="mdi-calendar-range" variant="text">
        Release date: {{ movie.release_date }}
      </v-chip>
      <v-chip prepend-icon="mdi-star" variant="text">
        Rate: {{ movie.vote_average }}
      </v-chip>
    </v-card-text>
    <div style="position: absolute; top: 0; height: 500px; width: 100%">
      <div class="h-100" @mouseenter="onHover = true" @mouseleave="onHover = false">
        <div class="h-100 w-100" v-show="onHover"
             style="background: rgba(75,7,21,0.5); cursor: pointer; display: flex; justify-content: center; align-items: center;"
             v-on:click="onClick">
          <v-btn class="text-h4" icon="mdi-heart-broken" color="#4B0715" size="x-large"></v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>
export default {
  name: "CardFavoriteMovie",
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      onHover: false
    }
  },
  methods: {
    onClick() {
      this.$emit('onClickParent', this.movie)
    },
  }
}
</script>

<style scoped>

</style>