<template>
  <!-- 카드 가로축 패딩 설정 및 둥근 모서리 설정, 반응형 크기 적용 -->
  <v-card
    class="d-flex flex-column justify-center rounded-lg"
    elevation="6"
    height="225px"
  >
    <!-- 카드 타이틀 영역, 요소들 가운데 정렬 -->
    <v-card-title class="pa-2">
      <div class="mx-auto">
        <span class="text-h5 font-weight-bold mr-2">{{ classData.title }}</span>
        <span class="text-h6">3학년 2반</span>
      </div>
    </v-card-title>

    <v-divider></v-divider>

    <!-- 과목 담당자. 과목 배정 시간 렌더링 -->
    <v-card-text class="text-center pb-2">
      <p class="text-h6 font-weight-bold mb-3">
        {{ classData.teacher }} 선생님
      </p>

      <v-row>
        <!-- 교시 수에 따라 다른 형태로 렌더링 되도록 설정 -->
        <v-col
          class="pa-0"
          v-for="(text, index) in classData.timeTable.split(',')"
          :key="index"
          :cols="counter > 2 ? 6 : 12"
        >
          <span class="text-body-2 font-weight-bold">
            {{ text }}
          </span>
        </v-col>
      </v-row>
    </v-card-text>

    <!-- 강의실 입장 버튼 -->
    <v-card-actions>
      <v-btn class="mx-auto accent" width="100px" rounded>입장하기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  /* 중요! 화살표 함수 사용 시, THIS 바인딩 변경으로 PROPS 사용 불가!*/
  props: {
    classData: { type: Object, required: true }
  },
  data() {
    return {
      classes: this.classData
    };
  },
  computed: {
    counter() {
      return this.classData.timeTable.split(",").length;
    }
  }
};
</script>

<style></style>
