<template>
  <!-- 반응형 UI 설정 -->
  <v-container fill-height class="d-flex flex-column justify-center">
    <!-- 강좌 목록 렌더링 영역, 콘텐츠 오버플로우 시 스크롤 적용 -->
    <v-responsive class="overflow-y-auto px-5 mb-5" max-height="65vh">
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(iteration, index) in 12"
          :key="index"
        >
          <class-card />
        </v-col>
      </v-row>
    </v-responsive>

    <!-- 신규 과목 개설 및 등록 버튼 영역 -->
    <v-responsive class="d-flex align-center" max-height="125px">
      <v-btn class="mx-auto accent" x-large>
        <span class="text-h6">신규 과목 등록하기</span>
      </v-btn>
    </v-responsive>
  </v-container>
</template>

<script>
import classCard from "../components/mainPage/classCard.vue";

export default {
  components: {
    classCard
  }
};
</script>

<style scoped></style>
