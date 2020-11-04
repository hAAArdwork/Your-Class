<template>
  <v-app>
    <v-app-bar color="secondary" elevate-on-scroll app>
      <div class="d-flex align-center">
        <v-img
          alt="Bussiness Logo"
          class="shrink"
          contain
          :src="require('./assets/logo.png')"
          transition="scroll-y-transition"
          width="40"
        />

        <v-img
          alt="Vuetify Name"
          class="shrink hidden-xs-only"
          contain
          min-width="100"
          :src="require('./assets/logoText.png')"
          width="165"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn v-if="!isLoggedIn" icon :to="{ name: 'LandingPage' }" exact>
        <v-icon>mdi-home</v-icon>
      </v-btn>

      <v-btn v-if="isLoggedIn" icon :to="{ name: 'MainPage' }">
        <v-icon>mdi-dots-grid</v-icon>
      </v-btn>

      <v-btn v-if="isLoggedIn" icon :to="{ name: 'MyPage' }">
        <v-icon>mdi-account</v-icon>
      </v-btn>

      <v-btn v-if="!isLoggedIn" icon :to="{ name: 'Login' }">
        <v-icon>mdi-login-variant</v-icon>
      </v-btn>

      <v-btn v-if="isLoggedIn" icon @click="logout">
        <v-icon>mdi-logout-variant</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    logoSrc: "https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",
    nameSrc: "https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
  }),

  computed: {
    isLoggedIn() {
      return this.$store.getters["auth/hasAccessToken"];
    }
  },

  methods: {
    logout() {
      this.$store.dispatch("auth/logout");
    }
  }
};
</script>

<style scoped></style>
