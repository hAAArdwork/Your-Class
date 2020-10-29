<template>
  <!-- 반응형 UI 설정 -->
  <v-card
    class="mx-auto rounded-lg"
    min-width="315px"
    max-width="450px"
    width="50vw"
  >
    <v-card-title>
      <span class="text-h5 font-weight-bold">마이페이지</span>
    </v-card-title>

    <v-divider />

    <v-list-item three-line>
      <v-list-item-content>
        <v-list-item-title class="text-h6 font-weight-bold">
          {{ userName }}
        </v-list-item-title>
        <v-list-item-subtitle>
          안녕하세요! 좋은 하루 보내고 계신가요?
        </v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar color="accent" size="64">
        <v-img
          class="elevation-6"
          alt="User Avatar"
          src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Round&hairColor=Black&facialHairType=Blank&clotheType=ShirtCrewNeck&clotheColor=Gray01&eyeType=Default&eyebrowType=UpDown&mouthType=Smile&skinColor=Light"
        ></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <v-list disabled dense>
      <!-- 리스트 아이템 렌더링 -->
      <v-list-item v-for="(item, i) in items" :key="i">
        <v-list-item-icon>
          <v-icon v-text="item.icon"></v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title v-text="item.text"></v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>

    <v-card-text>
      <p class="text-h6 font-weight-bold">회원 정보 수정</p>
      <p class="user-detail">비밀번호 변경</p>
      <p class="user-detail">프로필 사진 변경</p>
    </v-card-text>

    <v-card-actions class="pa-5">
      <v-btn block class="accent">돌아가기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      userEmail: "tom9744@gmail.com",
      userName: "양준영",
      userBirthday: "1996년 1월 11일",
      userSchool: "서라벌고등학교",

      items: [
        { text: "tom9744@gmail.com", icon: "mdi-email" },
        { text: "1996년 1월 11일", icon: "mdi-calendar-month" },
        { text: "서라벌고등학교", icon: "mdi-school" }
      ]
    };
  }
};
</script>

<style lscoped>
.user-detail {
  margin-left: 15px;
}
</style>
