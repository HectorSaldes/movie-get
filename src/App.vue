<template>
  <v-layout>
    <v-app-bar>
      <v-app-bar-title>
        <router-link to="/">
          <img src="@/assets/logo.svg" alt="Logo" height="50"/>
        </router-link>
      </v-app-bar-title>
      <v-spacer></v-spacer>
      <v-btn value="profile" icon to="/profile">
        <v-icon>mdi-account-box-multiple</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <router-view/>
    </v-main>
    <v-bottom-navigation grow v-model="value" bg-color="#950E2B">
      <v-btn value="favorite" to="/favorite">
        <v-icon>mdi-heart-multiple</v-icon>
        Favorites
      </v-btn>
      <v-btn value="home" to="/">
        <v-icon>mdi-home-variant</v-icon>
        Home
      </v-btn>
      <v-btn value="banned" to="/banned">
        <v-icon>mdi-cancel</v-icon>
        Banned
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>

export default {
  name: "App",
  data() {
    return {
      value: 'home',
    }
  }
}
</script>