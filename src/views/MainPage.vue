<template>
  <!-- 반응형 UI 설정 -->
  <v-container fill-height class="d-flex flex-column justify-center">
    <!-- 강좌 목록 렌더링 영역, 콘텐츠 오버플로우 시 스크롤 적용 -->
    <v-responsive
      class="overflow-y-auto px-5 my-5"
      max-height="70vh"
      width="1250px"
    >
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(data, index) in classCardData"
          :key="index"
        >
          <class-card :class-data="data" />
        </v-col>
      </v-row>
    </v-responsive>

    <!-- 신규 과목 개설 및 등록 버튼 영역 -->
    <v-responsive class="d-flex align-center" max-height="125px">
      <v-btn class="accent text-h6" x-large>
        신규 과목 등록하기
      </v-btn>
    </v-responsive>
  </v-container>
</template>

<script>
import classCard from "../components/mainPage/classCard.vue";

export default {
  components: {
    classCard
  },
  data: () => ({
    classCardData: [
      {
        title: "수학",
        teacher: "이정우",
        timeTable: "화요일 1교시, 목요일 5교시"
      },
      {
        title: "물리",
        teacher: "이슬기",
        timeTable: "화요일 2교시, 수요일 3교시, 금요일 5교시"
      },
      {
        title: "과학",
        teacher: "양준영",
        timeTable: "월요일 3교시, 금요일 5교시"
      },
      {
        title: "사회",
        teacher: "이정우",
        timeTable: "수요일 7교시, 목요일 2교시"
      },
      {
        title: "물리",
        teacher: "이슬기",
        timeTable: "화요일 2교시, 수요일 3교시"
      },
      {
        title: "과학",
        teacher: "양준영",
        timeTable: "월요일 3교시, 금요일 5교시"
      },
      {
        title: "사회",
        teacher: "이정우",
        timeTable: "수요일 7교시, 목요일 2교시"
      }
    ]
  })
};
</script>

<style scoped></style>
