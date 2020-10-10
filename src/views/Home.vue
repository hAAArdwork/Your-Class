<template>
  <div>
    <v-container class="introduction" fluid>
      <v-responsive class="pa-10 mx-auto" min-height="80vh" max-width="1200px">
        <v-row class="py-10 white--text text-center">
          <v-col cols="12">
            <p class="text-h3 font-weight-black mb-0">Your Class</p>
            <p class="text-h5 font-weight-medium">
              온라인 통합 실습 관리 시스템
            </p>
          </v-col>
        </v-row>
        <!-- 서비스 기능 설명 카드 렌더링 -->
        <v-row class="d-flex justify-center align-center">
          <v-col
            cols="12"
            sm="6"
            md="4"
            v-for="(data, index) in cardData"
            :key="index"
          >
            <!-- Props로 각각 카드에 해당하는 데이터 전달 -->
            <introductionCard :card-data="data" />
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>

    <v-container fluid>
      <v-responsive
        class="pa-10 mb-10 mx-auto"
        min-height="55vh"
        max-width="1000px"
      >
        <!-- 프로젝트 소개 및 구체적인 설명 -->
        <v-row class="py-10 text--secondary text-center">
          <v-col cols="12">
            <p class="text-h3 font-weight-black orange--text">
              소프트웨어공학개론 프로젝트 결과물입니다.
            </p>
            <p class="text-h5 font-weight-medium">
              Vue 2.X를 사용해 구현되었으며, UI 프레임워크는 Vuetify 2.3.13
              버전을 사용하고 있습니다.
            </p>
          </v-col>
          <v-col cols="12">
            <p class="text-h6">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </v-col>
        </v-row>
        <!-- 각 프레임워크 로고 렌더링 -->
        <v-row class="d-flex justify-center align-center mb-16">
          <v-col cols="12" class="text-center text--secondary">
            <p class="text-h6 font-weight-medium mb-0">
              This Applcation is Built with...
            </p>
          </v-col>
          <v-col
            cols="4"
            md="3"
            lg="2"
            v-for="(data, index) in logoData"
            :key="index"
          >
            <v-img
              :src="require(`../assets/${data.logo}.svg`)"
              :width="data.size"
              class="mx-auto"
              lazy
            />
          </v-col>
        </v-row>
      </v-responsive>
    </v-container>
  </div>
</template>

<script>
import introductionCard from "../components/home/introductionCard";

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
        title: "온라인 실습 관리",
        description:
          "Lorem ipsum har inte bara överlevt fem århundraden, utan även övergången till elektronisk typografi utan större förändringar."
      },
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/3449/3449630.svg",
        title: "실습등록 및 관리",
        description:
          "Lorem Ipsum är en utfyllnadstext från tryck- och förlagsindustrin. Lorem ipsum har varit standard ända sedan 1500-talet."
      },
      {
        iconPath:
          "https://www.flaticon.com/svg/static/icons/svg/3449/3449741.svg",
        title: "질의응답",
        description:
          "när en okänd boksättare tog att antal bokstäver och blandade dem för att göra ett provexemplar av en bok."
      }
    ],
    // 프레임워크 로고 관련 데이터
    logoData: [
      { logo: "vue", size: 105 },
      { logo: "vuetify", size: 95 },
      { logo: "firebase", size: 80 }
    ]
  })
};
</script>
<style scoped>
.introduction {
  background: linear-gradient(180deg, #ffa726, #ffffff);
}
</style>
