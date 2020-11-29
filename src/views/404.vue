<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col cols="12" class="d-flex align-center justify-center">
        <v-icon x-large color="error">mdi-exclamation-thick</v-icon>
      </v-col>

      <v-col cols="12" class="d-flex align-center justify-center">
        <span class="headline font-weight-bold">404 Page Not Found</span>
      </v-col>

      <v-col cols="12" class="d-flex align-center justify-center">
        <v-btn color="error" :to="{ name: 'MainPage' }" outlined>
          메인 화면으로
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style scoped></style>
