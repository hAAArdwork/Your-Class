<template>
  <v-container class="px-3 px-md-10 px-lg-12" fill-height fluid>
    <v-responsive class="pa-2" height="90vh">
      <v-row>
        <!-- MD 이상의 Breakpoint에서 렌더링되는 좌측 네비게이션 창 -->
        <v-col cols="2" class="hidden-md-and-down">
          <!-- 자식 컴포넌트에 사용자 정보와 그게 맞게 필터링된 메뉴 항목을 Props로 전달한다 -->
          <left-navigation :userData="userData" :menuList="filteredMenuList" />
        </v-col>

        <!-- MD 이하의 Breakpoint에서 렌더링되는 상단 네비게이션 창 -->
        <v-col cols="12" class="hidden-lg-and-up">
          <!-- 자식 컴포넌트에 사용자 정보와 그게 맞게 필터링된 메뉴 항목을 Props로 전달한다 -->
          <top-navigation :userData="userData" :menuList="filteredMenuList" />
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
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    },
    // props로 전달된 메뉴 항목을 권한에 따라 필터링한다.
    filteredMenuList() {
      // 학생 권한인 경우,
      if (this.userData.isStudent) {
        // filter() 메소드를 사용해 과목관리 항목을 제외한다.
        return this.listItems.filter(item => {
          return item.text !== "과목관리";
        });
      }
      // 교사 권한인 경우, 그대로 반환한다.
      else {
        return this.listItems;
      }
    }
  },
  data: () => ({
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
