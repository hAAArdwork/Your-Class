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
      :max-height="$vuetify.breakpoint.name == 'xs' ? '80vh' : '55vh'"
      :width="$vuetify.breakpoint.name == 'xs' ? '95vw' : '85vw'"
    >
      <!-- 각 과목에 해당하는 카드 렌더링 -->
      <v-row v-if="classList.length > 0">
        <v-col
          cols="12"
          sm="6"
          lg="4"
          v-for="(data, index) in classList"
          :key="index"
        >
          <!-- 과목 카드 컴포넌트에 과목 정보를 Props로 전달한다. -->
          <class-card :class-data="data" />
        </v-col>
      </v-row>

      <!-- 등록된 과목이 없는 경우, 메세지 렌더링 -->
      <v-container v-else fill-height>
        <v-row class="flex-column">
          <v-col class="text-center">
            <v-icon large>mdi-exclamation-thick</v-icon>
          </v-col>

          <v-col class="text-center">
            <span class="text-h6">앗! 아직 등록된 과목이 없습니다.</span>
          </v-col>
        </v-row>
      </v-container>
    </v-responsive>

    <!-- 신규 과목 개설 및 등록 버튼 영역 -->
    <v-responsive
      class="d-flex align-center"
      :max-height="$vuetify.breakpoint.name == 'xs' ? '10vh' : '15vh'"
    >
      <!-- 교사 View -->
      <v-dialog
        v-model="newClassDialog"
        transition="scroll-y-reverse-transition"
        max-width="650px"
        persistent
      >
        <!-- 신규 과목 개설 버튼 -->
        <template v-slot:activator="{ on, attrs }">
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
        </template>

        <!-- 과목 생성 Form Component -->
        <create-class-form
          v-if="!userData.isStudent"
          @closeDialog="newClassDialog = false"
        />
      </v-dialog>

      <!-- 학생 View -->
      <v-dialog
        v-model="enrollDialog"
        transition="scroll-y-reverse-transition"
        max-width="450px"
        persistent
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            v-if="userData.isStudent"
            @click="enrollDialog = true"
            color="accent"
            v-bind="attrs"
            v-on="on"
            large
          >
            <v-icon left size="25">
              mdi-plus
            </v-icon>
            <span style="font-size: 20px;">
              수강 과목 등록
            </span>
          </v-btn>
        </template>

        <!-- 과목 등록 Form Component -->
        <enroll-form
          v-if="userData.isStudent"
          @closeDialog="enrollDialog = false"
        />
      </v-dialog>
    </v-responsive>
  </v-container>
</template>

<script>
import classCard from "../components/mainPage/classCard.vue";
import createClassForm from "../components/mainPage/createClassForm.vue";
import enrollForm from "../components/mainPage/enrollFrom.vue";

export default {
  beforeCreate() {
    this.$store.dispatch("classes/retrieveClasses");
  },
  components: {
    classCard,
    createClassForm,
    enrollForm
  },
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    },
    classList() {
      return this.$store.getters["classes/classList"];
    }
  },
  data: () => ({
    newClassDialog: false,
    enrollDialog: false,

    isLoading: false
  })
};
</script>

<style scoped></style>
