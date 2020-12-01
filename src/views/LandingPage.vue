<template>
  <div>
    <v-container fluid>
      <v-responsive
        class="pa-5 pa-sm-10 mx-auto d-flex align-center"
        min-height="95vh"
        max-width="1250px"
      >
        <v-row class="d-flex align-center">
          <!-- 좌측 로고 및 슬로건 영역 -->
          <v-col cols="12" md="6">
            <v-row class="py-10 px-10 text-center">
              <v-col cols="12">
                <v-img
                  alt="Bussiness Logo"
                  class="mx-auto"
                  contain
                  :src="require('../assets/logo.png')"
                  transition="fab-transition"
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

              <v-col cols="12">
                <v-btn class="mx-2 mx-sm-5 accent" :to="{ name: 'Login' }">
                  로그인
                </v-btn>
                <v-btn
                  class="mx-2 mx-sm-5 grey"
                  dark
                  :to="{ name: 'Register' }"
                >
                  회원가입
                </v-btn>
              </v-col>
            </v-row>
          </v-col>

          <!-- 제공 기능 설명 영역 -->
          <v-col cols="12" md="6">
            <!-- 서비스 기능 설명 카드 렌더링 -->
            <v-row class="d-flex justify-center align-center">
              <v-col
                cols="12"
                sm="6"
                v-for="(data, index) in cardData"
                :key="index"
              >
                <!-- Props로 각각 카드에 해당하는 데이터 전달 -->
                <introductionCard :card-data="data" />
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>

    <v-container fluid class="introduction">
      <v-responsive
        class="pa-sm-10 mx-auto mb-10"
        min-height="55vh"
        max-width="1000px"
      >
        <!-- 프로젝트 소개 및 구체적인 설명 -->
        <v-row class="py-10 text--primary text-center">
          <v-col cols="12">
            <p class="text-h4 font-weight-black accent--text">
              소프트웨어공학개론 프로젝트 결과물입니다.
            </p>
          </v-col>

          <v-col cols="4" v-for="(item, index) in memberCardData" :key="index">
            <v-card rounded="lg" elevation="4" max-height="165px">
              <v-row>
                <v-col>
                  <v-img
                    :src="item.iconPath"
                    transition="scroll-y-transition"
                    class="mx-auto"
                    width="55"
                  />
                </v-col>
              </v-row>

              <v-card-title class="py-2">
                <span class="mx-auto">{{ item.name }}</span>
              </v-card-title>

              <v-card-text class="text-center">
                {{ item.role }}
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>

        <!-- 각 프레임워크 로고 렌더링 -->
        <v-row class="d-flex justify-center align-center">
          <v-col cols="12" class="text-center">
            <pre class="text-h5 font-weight-bold primary--text">
              본 프로젝트는 하기와 같은 기술 스택을 사용해 구현되었습니다.
            </pre>

            <pre class="text-h6 font-weight-medium">
              프론트엔드는 Vue 2.X, Vuetify 2.3.13 버전을 사용해 구현 되었으며,
              백엔드는 Django, Django REST Framework를 사용해 구현 되었습니다.

              최종 배포를 위해 AWS EC2 환경을 사용하고 있습니다.
            </pre>
          </v-col>

          <v-col cols="2">
            <v-img
              transition="fade-transition"
              class="mx-auto tech-logo"
              width="65px"
              :src="require(`../assets/vue.svg`)"
            ></v-img>
          </v-col>

          <v-col cols="2">
            <v-img
              transition="fade-transition"
              class="mx-auto tech-logo"
              width="60px"
              :src="require(`../assets/vuetify.svg`)"
            ></v-img>
          </v-col>

          <v-col cols="3">
            <v-img
              transition="fade-transition"
              class="mx-auto tech-logo"
              width="130px"
              :src="require(`../assets/django.svg`)"
            ></v-img>
          </v-col>

          <v-col cols="2">
            <v-img
              transition="fade-transition"
              class="mx-auto tech-logo"
              width="120px"
              src="https://d0.awsstatic.com/logos/powered-by-aws.png"
            ></v-img>
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </div>
</template>

<script>
import introductionCard from "../components/landingPage/introductionCard";

export default {
  components: {
    introductionCard
  },
  data: () => ({
    // 카드 아이콘 경로, 카드 내용 관련 데이터
    cardData: [
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/3449/3449713.svg",
        title: "온라인 학습 관리"
      },
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/3449/3449630.svg",
        title: "과제 등록 및 관리"
      },
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/3449/3449741.svg",
        title: "질의응답"
      },
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/3215/3215477.svg",
        title: "학습 일정 관리"
      }
    ],

    memberCardData: [
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/2503/2503210.svg",
        name: "양준영",
        role: "Front End, Team Leader"
      },
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/2503/2503171.svg",
        name: "이정우",
        role: "Back End, Database"
      },
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/2503/2503229.svg",
        name: "이슬기",
        role: "Front End"
      }
    ],

    // 프레임워크 로고 관련 데이터
    logoData: [
      { logo: "vue", size: 55 },
      { logo: "vuetify", size: 55 },
      { logo: "django", size: 95 }
    ]
  })
};
</script>

<style scoped>
.introduction {
  background: linear-gradient(180deg, #ffffff, #b0dcff);
}
</style>
