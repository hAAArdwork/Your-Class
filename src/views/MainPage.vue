<template>
  <!-- 반응형 UI 설정 -->
  <v-container
    class="d-flex flex-column align-center justify-center"
    fill-height
    fluid
  >
    <!-- 강좌 목록 렌더링 영역, 콘텐츠 오버플로우 시 스크롤 적용 -->
    <v-responsive
      class="overflow-y-auto px-5"
      :max-height="$vuetify.breakpoint.name == 'xs' ? '75vh' : '55vh'"
      :max-width="$vuetify.breakpoint.name == 'xs' ? '95vw' : '85vw'"
    >
      <!-- 각 과목에 해당하는 카드 렌더링 -->
      <v-row>
        <v-col
          cols="12"
          sm="6"
          md="4"
          v-for="(data, index) in classCardData"
          :key="index"
        >
          <!-- 과목 카드 컴포넌트에 과목 정보를 Props로 전달한다. -->
          <class-card :class-data="data" />
        </v-col>
      </v-row>
    </v-responsive>

    <!-- 신규 과목 개설 및 등록 버튼 영역 -->
    <v-responsive
      class="d-flex align-end py-2"
      :max-height="$vuetify.breakpoint.name == 'xs' ? '10vh' : '15vh'"
    >
    </v-responsive>

    <v-dialog
      v-model="newClassDialog"
      transition="scroll-y-reverse-transition"
      max-width="650px"
      persistent
    >
      <template v-slot:activator="{ on, attrs }">
        <!-- 교사 View -->
        <v-btn
          v-if="!userData.isStudent"
          @click="newClassDialog = true"
          color="accent"
          v-bind="attrs"
          v-on="on"
          large
        >
          <v-icon left size="25">
            mdi-plus
          </v-icon>
          <span style="font-size: 20px;">
            신규 과목 개설
          </span>
        </v-btn>

        <!-- 학생 View -->
        <v-btn v-else color="accent" v-bind="attrs" v-on="on" large>
          <v-icon left size="25">
            mdi-plus
          </v-icon>
          <span style="font-size: 20px;">
            수강 강의 등록
          </span>
        </v-btn>
      </template>

      <!-- Form Component -->
      <create-class-form
        v-if="!userData.isStudent"
        @closeDialog="newClassDialog = false"
      />
    </v-dialog>
  </v-container>
</template>

<script>
import classCard from "../components/mainPage/classCard.vue";
import createClassForm from "../components/mainPage/createClassForm.vue";

export default {
  components: {
    classCard,
    createClassForm
  },
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    }
  },
  data: () => ({
    newClassDialog: false,

    classCardData: [
      {
        id: 0,
        title: "수학",
        teacher: "이정우",
        timeTable: "월요일 7교시, 화요일 3교시, 목요일 2교시, 금요일 1교시"
      },
      {
        id: 1,
        title: "물리",
        teacher: "이슬기",
        timeTable: "월요일 4교시, 화요일 2교시, 수요일 3교시, 금요일 5교시"
      },
      {
        id: 2,
        title: "과학",
        teacher: "양준영",
        timeTable: "화요일 4교시, 수요일 1교시, 목요일 3교시, 금요일 2교시"
      },
      {
        id: 3,
        title: "역사",
        teacher: "이정우",
        timeTable: "수요일 7교시, 목요일 1교시"
      },
      {
        id: 4,
        title: "바리스타",
        teacher: "오세만",
        timeTable: "금요일 방과후"
      },
      {
        id: 5,
        title: "생명과학 1",
        teacher: "최한",
        timeTable: "월요일 1교시, 화요일 6교시, 수요일 2교시, 금요일 3교시"
      },
      {
        id: 6,
        title: "사회",
        teacher: "이정우",
        timeTable: "수요일 7교시, 목요일 2교시"
      }
    ]
  })
};
</script>

<style scoped></style>
