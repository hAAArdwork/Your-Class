<template>
  <v-sheet rounded="lg" elevation="6">
    <!-- 내부 세부 요소 FlexBox 설정 -->
    <v-row class="px-6" align="center">
      <!-- 회원 프로필 사진 -->
      <v-col cols="2" class="d-flex justify-center">
        <v-avatar class="accent" size="46">
          <v-img
            class="elevation-6"
            alt="User Avatar"
            src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=Default&eyebrowType=UpDown&mouthType=Smile&skinColor=Light"
          ></v-img>
        </v-avatar>
      </v-col>

      <!-- 과목 세부 리스트 -->
      <v-col cols="2" v-for="(data, index) in menuList" :key="index">
        <!-- Display Braekpoint에 따라 반응형 설정 -->
        <v-btn
          text
          :large="$vuetify.breakpoint.name != 'xs'"
          :rounded="$vuetify.breakpoint.name != 'xs'"
          :icon="$vuetify.breakpoint.name == 'xs'"
          :to="{ name: data.route }"
          color="black"
          exact
        >
          <v-icon size="24" :left="$vuetify.breakpoint.name != 'xs'">
            {{ data.icon }}
          </v-icon>
          <span class="hidden-xs-only subtitle-1">
            {{ data.shorten }}
          </span>
        </v-btn>
      </v-col>
    </v-row>
  </v-sheet>
</template>

<script>
export default {
  props: {
    menuList: Array
  }
};
</script>

<style></style>
