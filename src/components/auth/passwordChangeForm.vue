<template>
  <v-card class="mx-auto rounded-lg">
    <v-card-title>
      <span class="text-h6 font-weight-bold">비밀번호 변경</span>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-progress-linear
      :indeterminate="isLoading"
      :active="isLoading"
      color="accent darken-2"
    ></v-progress-linear>

    <v-divider></v-divider>

    <v-card-text class="px-sm-12 py-2">
      <v-form v-model="valid">
        <v-text-field
          v-model="password"
          label="New Password"
          prepend-icon="mdi-lock"
          :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="passwordShow ? 'text' : 'password'"
          @click:append="passwordShow = !passwordShow"
          :rules="[required('비밀번호'), hasKorean(), isLongEnough()]"
          counter
        >
        </v-text-field>

        <v-text-field
          v-model="passwordConfirm"
          label="Password Confirm"
          prepend-icon="mdi-lock"
          :append-icon="confirmShow ? 'mdi-eye' : 'mdi-eye-off'"
          :type="confirmShow ? 'text' : 'password'"
          @click:append="confirmShow = !confirmShow"
          :rules="[isIdentical(), hasKorean()]"
          counter
        >
        </v-text-field>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">
        취소
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        :disabled="!valid || isLoading"
        @click="changePassword"
      >
        변경하기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  computed: {
    isLoading() {
      return this.$store.getters["user/isLoading"];
    }
  },
  data: () => ({
    valid: false,
    passwordShow: false,
    confirmShow: false,

    password: "",
    passwordConfirm: "",

    required(propertyType) {
      return value => !!value || `${propertyType}를 입력해주세요.`;
    },
    isLongEnough() {
      return value =>
        value.length >= 8 || `비밀번호는 8자리 이상이어야 합니다.`;
    },
    hasKorean() {
      const koreanRegEx = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      return value => !koreanRegEx.test(value) || "앗! 한/영키를 확인해주세요.";
    },
    isIdentical() {
      return value =>
        value === this.password || `비밀번호가 일치하지 않습니다.`;
    }
  }),
  methods: {
    closeDialog() {
      // 부모 컴포넌트로 이벤트 Emit
      this.$emit("closeDialog");
    },
    async changePassword() {
      // 비밀번호 변경을 위해 Vuex State Action을 호출한다.
      await this.$store.dispatch("user/updatePassword", {
        password: this.password,
        passwordConfirm: this.passwordConfirm
      });

      // Form Data를 초기화한다.
      this.password = "";
      this.passwordConfirm = "";

      // 부모 컴포넌트로 이벤트를 Emit하여, 다이얼로그 창을 닫는다.
      this.$emit("closeDialog");
    }
  }
};
</script>

<style></style>
