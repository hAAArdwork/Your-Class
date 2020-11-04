<template>
  <!-- 반응형 UI 설정 -->
  <v-card
    class="mx-auto rounded-lg"
    min-width="315px"
    max-width="450px"
    width="50vw"
  >
    <v-card-title v-if="isActivated == null">인증 진행중...</v-card-title>
    <v-card-title v-if="isActivated == true">인증 완료</v-card-title>
    <v-card-title v-if="isActivated == false">인증 실패</v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <div v-if="isActivated === null">
        <h3>인증 절차가 진행중입니다.</h3>
        <p>잠시만 기다려주시면 자동으로 화면이 넘어갑니다.</p>
      </div>

      <div>
        <h3 v-if="isActivated == true">계정 인증이 완료되었습니다.</h3>
        <h3 v-if="isActivated == false">이미 인증된 계정입니다.</h3>
        <p>5초 뒤 로그인 화면으로 자동 이동됩니다...</p>
      </div>

      <div class="d-flex flex-row-reverse">
        <v-progress-circular indeterminate color="accent"></v-progress-circular>
      </div>
    </v-card-text>
  </v-card>
</template>
<script>
export default {
  data() {
    return {
      isActivated: null,
      resonpseMsg: ""
    };
  },
  methods: {
    startRedirectTimer() {
      setTimeout(() => {
        this.$router.replace("/auth");
      }, 5000);
    }
  },
  created() {
    // URI로부터 인증에 필요한 변수를 추출한다.
    const uidb64 = this.$route.params.uidb64;
    const token = this.$route.params.token;

    // axios GET 통신을 사용해 이메일 인증.
    this.$axios
      .get(`user/activate/${uidb64}/${token}`)
      .then(response => {
        console.log(response);
        this.resonpseMsg = response.data;
        this.isActivated = true;
        this.startRedirectTimer();
      })
      .catch(error => {
        console.log(error);
        this.resonpseMsg = error.response.data;
        this.isActivated = false;
        this.startRedirectTimer();
      });
  }
};
</script>

<style></style>
