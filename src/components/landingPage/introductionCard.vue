<template>
  <!-- Border Radius 설정, 최소 높이 및 반응형 높이, Flexbox 설정 -->
  <v-card
    class="rounded-lg d-flex flex-column justify-center"
    elevation="4"
    min-height="175px"
    height="10vw"
  >
    <v-card-title>
      <v-row>
        <v-col>
          <!-- 카드 타이틀, 아이콘 렌더링 -->
          <v-img
            :src="cardData.iconPath"
            transition="scroll-x-transition"
            class="mx-auto"
            width="55"
          />
        </v-col>
      </v-row>
    </v-card-title>

    <v-card-text class="text-center">
      <!-- 카드 제목 -->
      <p class="text-h6 font-weight-bold mb-6">
        {{ cardData.title }}
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  props: {
    cardData: Object
  },
  data: () => ({})
};
</script>

<style></style>
