<template>
  <!-- 카드 가로축 패딩 설정 및 둥근 모서리 설정, 반응형 크기 적용 -->
  <v-card
    class="rounded-lg px-2"
    elevation="4"
    min-height="225px"
    height="12.5vw"
  >
    <!-- 카드 타이틀 영역, 요소 가운데 정렬 -->
    <v-card-title class="d-flex justify-center align-center py-2">
      <span class="text-h5 font-weight-bold mr-2">수학</span>
      <span class="text-h6">3학년 2반</span>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text class="text-center pb-2">
      <!-- 겅의자. 강의시간 내용 렌더링 -->
      <p class="text-h6 font-weight-bold mb-3">이정우 선생님</p>

      <p class="text-body-1 font-weight-bold mb-0">화요일 1교시</p>
      <p class="text-body-1 font-weight-bold mb-0">화요일 1교시</p>
    </v-card-text>

    <!-- 강의실 입장 버튼 -->
    <v-card-actions>
      <v-btn class="mx-auto accent" rounded width="80px">입장하기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
