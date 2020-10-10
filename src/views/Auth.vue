<template>
  <v-container fill-height fluid>
    <v-row>
      <v-col cols="12" class="text-center white--text">
        <p class="text-h3 font-weight-black mb-0">Your Class</p>
        <p class="text-h5 font-weight-medium">
          온라인 통합 실습 관리 시스템
        </p>
      </v-col>
      <v-col>
        <!-- 로그인 폼 컴포넌트 -->
        <router-view></router-view>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
};
</script>

<style scoped>
.container {
  background: linear-gradient(180deg, #ffa726, #ffffff);
}
</style>
