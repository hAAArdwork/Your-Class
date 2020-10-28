<template>
  <v-container fluid>
    <v-responsive
      class="pa-5 pa-sm-10 mx-auto d-flex align-center"
      min-height="85vh"
      max-width="1250px"
    >
      <v-row class="d-flex align-center">
        <!-- 좌측 로고 및 슬로건 영역 -->
        <v-col cols="12" md="6">
          <v-row class="py-10 px-10 d-flex text-center">
            <v-col cols="12">
              <v-img
                alt="Bussiness Logo"
                class="mx-auto"
                contain
                :src="require('../assets/logo.png')"
                width="150"
              />
            </v-col>

            <v-col cols="12">
              <p class="text-h3 font-weight-bold accent--text">
                Your Class
              </p>
              <p class="text-h5 font-weight-medium">
                당신이 찾던 학습 관리 웹 어플리케이션
              </p>
            </v-col>
          </v-row>
        </v-col>

        <!-- 제공 기능 설명 영역 -->
        <v-col cols="12" md="6">
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
