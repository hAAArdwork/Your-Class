<template>
  <!-- 반응형 UI 설정 -->
  <v-card
    class="mx-auto rounded-lg"
    min-width="315px"
    max-width="450px"
    elevation="6"
    width="50vw"
  >
    <!-- V-CARD 제목 영역 -->
    <v-card-title>
      <span class="text-h5 font-weight-bold">마이페이지</span>
    </v-card-title>

    <v-divider />

    <!-- 회원 이름, 메세지, 권한 별 아바타 영역 -->
    <v-list-item three-line>
      <v-list-item-content>
        <!-- 회원 이름 -->
        <v-list-item-title class="text-h6 font-weight-bold">
          {{ userData.name }}
        </v-list-item-title>

        <!-- 권한 별 환영 메세지 -->
        <v-list-item-subtitle>
          {{
            userData.isStudent
              ? `반가워요, ${userData.name} 학생! 오늘도 좋은 하루 되세요!`
              : `안녕하세요, ${userData.name} 선생님! 좋은 하루 보내고 계신가요?`
          }}
        </v-list-item-subtitle>
      </v-list-item-content>

      <!-- 사용자 아바타 -->
      <v-list-item-avatar
        :color="userData.isStudent ? 'accent' : 'error'"
        size="68"
      >
        <!-- 사용자 권한에 따라 상이한 Avatar 이미지 렌더링 -->
        <v-img alt="User Avatar" :src="userData.avatarPath"></v-img>
      </v-list-item-avatar>
    </v-list-item>

    <!-- 회원 세부 정보 영역 -->
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

    <!-- 회원 정보 수정 영역 -->
    <v-card-text>
      <p class="text-h6 font-weight-bold">회원 정보 수정</p>

      <v-dialog v-model="showDialog" persistent max-width="450px">
        <template v-slot:activator="{ on, attrs }">
          <!-- Modal 활성화 링크 -->
          <span
            class="user-detail font-weight-bold blue--text"
            v-bind="attrs"
            v-on="on"
          >
            비밀번호 변경
          </span>
        </template>

        <pass-change-form @closeDialog="showDialog = false" />
      </v-dialog>
    </v-card-text>

    <!-- 이전 화면으로 돌아가는 버튼 영역 -->
    <v-card-actions class="pa-5">
      <!-- $router.go(-1) 메소드를 사용해, 이전 페이지로 이동할 수 있다. -->
      <v-btn block class="accent" @click="$router.go(-1)">돌아가기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import PassChangeForm from "../auth/passwordChangeForm.vue";

export default {
  components: {
    PassChangeForm
  },
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    }
  },
  data() {
    return {
      showDialog: false,

      items: []
    };
  },
  // computed 속성을 data 속성에서 사용할 수 없으므로, created() 훅에서 배열에 데이터를 추가한다.
  // [중요] beforeCreated() 훅에서는 아직 data 속성이 세팅되지 않아, 접근할 수 없다.
  created() {
    this.items.push(
      { text: this.userData.email, icon: "mdi-email" },
      { text: this.userData.birthday, icon: "mdi-calendar-month" },
      { text: this.userData.school, icon: "mdi-school" },
      {
        text: this.userData.isStudent
          ? "학생 권한으로 가입되었습니다."
          : "선생님 권한으로 가입되었습니다.",
        icon: "mdi-book-account"
      }
    );
  }
};
</script>

<style lscoped>
.user-detail {
  margin-left: 15px;
}
</style>
