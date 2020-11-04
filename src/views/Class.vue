<template>
  <v-container class="px-3 px-md-10 px-lg-12" fill-height fluid>
    <v-responsive class="pa-2" height="90vh">
      <v-row>
        <!-- MD 이상의 Breakpoint에서 렌더링되는 좌측 네비게이션 창 -->
        <v-col cols="2" class="hidden-md-and-down">
          <left-navigation :menuList="listItems" />
        </v-col>

        <!-- MD 이하의 Breakpoint에서 렌더링되는 상단 네비게이션 창 -->
        <v-col cols="12" class="hidden-lg-and-up">
          <top-navigation :menuList="listItems" />
        </v-col>

        <!-- 우측 라우터 뷰 -->
        <v-col>
          <v-sheet
            class="overflow-y-auto mx-auto"
            height="75vh"
            min-height="600px"
            max-height="75vh"
            max-width="1250px"
            rounded="lg"
            elevation="6"
          >
            <router-view></router-view>
          </v-sheet>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>

<script>
import leftNavigation from "../components/class/leftNavigation.vue";
import topNavigation from "../components/class/topNavigation.vue";

export default {
  components: {
    leftNavigation,
    topNavigation
  },
  data: () => ({
    selectedItem: 1,
    listItems: [
      {
        text: "과목정보",
        shorten: "정보",
        icon: "mdi-information-outline",
        route: "classInfo"
      },
      {
        text: "공지사항",
        shorten: "공지",
        icon: "mdi-exclamation-thick",
        route: "classNotice"
      },
      {
        text: "과제물",
        shorten: "과제",
        icon: "mdi-clipboard-text",
        route: "classAssignment"
      },
      {
        text: "질의응답",
        shorten: "질문",
        icon: "mdi-comment-question-outline",
        route: "classQuestion"
      },
      {
        text: "과목관리",
        shorten: "관리",
        icon: "mdi-hammer-wrench",
        route: "classManage"
      }
    ]
  })
};
</script>

<style scoped></style>
