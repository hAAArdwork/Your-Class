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

      <router-link to="/" class="router">
        <v-btn icon>
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </router-link>

      <router-link :to="{ name: 'Login' }" class="router">
        <v-btn icon>
          <v-icon>mdi-login-variant</v-icon>
        </v-btn>
      </router-link>
    </v-app-bar>

    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    logoSrc: "https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png",
    nameSrc: "https://cdn.vuetifyjs.com/images/logos/vuetify-name-dark.png"
  })
};
</script>

<style scoped>
.router {
  text-decoration: none;
}
</style>
