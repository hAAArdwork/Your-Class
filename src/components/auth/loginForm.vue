<template>
  <!-- 반응형 UI 설정 -->
  <v-card
    class="mx-auto rounded-lg"
    min-width="315px"
    max-width="450px"
    width="50vw"
  >
    <v-card-title>
      <span class="text-h5 font-weight-medium">로그인</span>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-form v-model="valid">
        <v-row class="d-flex justify-center">
          <v-col cols="10" class="px-0">
            <v-text-field
              label="Email"
              v-model="email"
              prepend-icon="mdi-at"
              :rules="[isEmail('이메일')]"
            >
            </v-text-field>

            <v-text-field
              v-model="password"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              :rules="[required('비밀번호'), hasKorean('비밀번호')]"
              @click:append="showPassword = !showPassword"
              @keydown.enter="login"
            >
            </v-text-field>

            <v-btn
              block
              color="accent"
              class="mt-5"
              @click="login"
              :loading="isLoading"
            >
              로그인
            </v-btn>
          </v-col>

          <v-col cols="10" class="text-center">
            <span class="text-secondary">
              회원이 아니신가요?
            </span>

            <router-link :to="{ name: 'Register' }">
              회원가입 하러가기
            </router-link>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    // Form Control Data
    showPassword: false,
    valid: false,

    // 로그인 관련 정보
    email: "",
    password: "",

    // 유효성 검사 규칙들
    required(propertyType) {
      return value => !!value || `${propertyType}를 입력해주세요.`;
    },
    isEmail(propertyType) {
      const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return value =>
        emailRegEx.test(value) || `${propertyType} 형식이 올바르지 않습니다.`;
    },
    hasKorean() {
      const koreanRegEx = /[ㄱ-ㅎ|ㅏ-ㅓ|가-힣]/;
      return value => !koreanRegEx.test(value) || "앗! 한/영키를 확인해주세요.";
    }
  }),
  computed: {
    isLoading() {
      return this.$store.getters["auth/isLoading"];
    }
  },
  methods: {
    login() {
      // Form Data를 자바스크립트 객체로 만든다.
      const formData = {
        email: this.email,
        password: this.password
      };
      // Vuex 저장소의 상태를 변경하기 위해, dispatch로 actions를 작동시킨다.
      this.$store.dispatch("auth/login", formData);
    }
  }
};
</script>

<style></style>
