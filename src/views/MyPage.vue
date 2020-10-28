<template>
  <v-container fluid>
    <v-responsive
      class="pa-5 pa-sm-10 mx-auto d-flex align-center"
      min-height="85vh"
      max-width="1250px"
    >
      <v-row>
        <!-- 프로필 정보 렌더링 V-Card -->
        <v-col cols="12">
          <router-view></router-view>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style scoped></style>
