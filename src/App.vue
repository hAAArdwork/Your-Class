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
          class="shrink hidden-xs-only"
          contain
          min-width="100"
          :src="require('./assets/logoText.png')"
          width="185px"
        />
      </div>

      <v-spacer></v-spacer>

      <v-btn
        active-class="accent"
        :to="{ name: 'LandingPage' }"
        v-if="!isLoggedIn"
        icon
        dark
        exact
      >
        <v-icon color="black">mdi-home</v-icon>
      </v-btn>

      <v-btn
        active-class="accent"
        :to="{ name: 'MainPage' }"
        v-if="isLoggedIn"
        icon
        dark
      >
        <v-icon color="black">mdi-dots-grid</v-icon>
      </v-btn>

      <v-btn
        active-class="accent"
        :to="{ name: 'Calendar' }"
        v-if="isLoggedIn && userData.isStudent"
        icon
        dark
      >
        <v-icon color="black">mdi-calendar</v-icon>
      </v-btn>

      <v-btn
        active-class="accent"
        :to="{ name: 'MyPage' }"
        v-if="isLoggedIn"
        icon
        dark
      >
        <v-icon color="black">mdi-account</v-icon>
      </v-btn>

      <v-btn
        active-class="accent"
        :to="{ name: 'Login' }"
        v-if="!isLoggedIn"
        icon
        dark
      >
        <v-icon color="black">mdi-login-variant</v-icon>
      </v-btn>

      <v-btn active-class="accent" @click="logout" v-if="isLoggedIn" icon dark>
        <v-icon color="black">mdi-logout-variant</v-icon>
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
    },
    userData() {
      return this.$store.getters["user/userData"];
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
