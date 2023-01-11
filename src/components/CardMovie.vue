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
      <div class="h-50" @mouseenter="onHoverFav(true)" @mouseleave="onHoverFav(false)">
        <div class="h-100 w-100" v-show="computedFav"
             style="background: rgba(236,50,90,0.5); cursor: pointer; display: flex; justify-content: center; align-items: center;"
             v-on:click="onClickFav">
          <v-btn class="text-h4" icon="mdi-heart" color="#EC325A" size="x-large"></v-btn>
        </div>
      </div>
      <div class="h-50" @mouseenter="onHoverBlock(true)" @mouseleave="onHoverBlock(false)">
        <div class="h-100 w-100 text-center" v-show="computedBlock"
             style="background: rgba(143,143,143,0.8); cursor: pointer; display: flex; justify-content: center; align-items: center"
             v-on:click="onClickBlock">
          <v-btn class="text-h4" icon="mdi-cancel" color="#292929" size="x-large"></v-btn>
        </div>
      </div>
    </div>
  </v-card>
</template>

<script>

import StoreService from "@/service/StoreService";

export default {
  name: "CardMovie",
  props: {
    movie: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      hoverFav: false,
      clickFav: false,
      hoverBlock: false,
      clickBlock: false,
      clicks: 0
    }
  },
  computed: {
    computedFav() {
      return this.hoverFav || this.clickFav
    },
    computedBlock() {
      return this.hoverBlock || this.clickBlock
    }
  },
  methods: {
    onHoverFav(bool) {
      this.hoverFav = bool
    },
    onHoverBlock(bool) {
      this.hoverBlock = bool
    },
    onClickFav() {
      this.clickFav = !this.clickFav
      if (this.clickFav) {
        StoreService.saveFav(this.movie)
        this.onSnackbarShow('success', `${this.movie.original_title}, added to favorites`)
        this.clickBlock = false
        this.onClick(1)
      } else {
        StoreService.removeFav(this.movie)
        this.onSnackbarShow('error', `${this.movie.original_title}, removed from favorites`)
        this.onClick(-1)
      }
    },
    onClickBlock() {
      this.clickBlock = !this.clickBlock
      if (this.clickBlock) {
        StoreService.saveBlock(this.movie)
        this.onSnackbarShow('', `${this.movie.original_title}, banned`)
        this.clickFav = false
        this.onClick(1)
      } else {
        StoreService.removeBlock(this.movie)
        this.onSnackbarShow('error', `${this.movie.original_title}, removed from banned`)
        this.onClick(-1)
      }
    },
    onSnackbarShow(color, text) {
      this.$emit('onSnackbarShowParent', {active: true, color, text})
    },
    onClick(click) {
      this.$emit('onClickParent', click)
    }
  },
  beforeUpdate() {
    this.hoverFav = false
    this.clickFav = false
    this.hoverBlock = false
    this.clickBlock = false
  }
}
</script>

<style scoped>

</style>