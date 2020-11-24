<template>
  <v-card class="mx-auto rounded-lg">
    <v-card-title>
      <span class="text-h6 font-weight-bold">댓글 내용 수정</span>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-progress-linear
      :indeterminate="isLoading"
      :active="isLoading"
      color="accent darken-2"
    ></v-progress-linear>

    <v-divider></v-divider>

    <v-card-text class="px-sm-8 py-2">
      <v-form v-model="valid">
        <v-textarea
          v-model="comment"
          rows="3"
          no-resize
          counter
          :rules="[required('댓글 내용'), isLongEnough('댓글 내용', 10)]"
        >
        </v-textarea>
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
        @click="submitQuestion"
      >
        등록하기
        <v-icon right>
          mdi-checkbox-marked-circle
        </v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    content: String
  },
  computed: {
    isLoading() {
      return this.$store.getters["user/isLoading"];
    }
  },
  data() {
    return {
      valid: false,

      comment: this.content,

      required(propertyType) {
        return value => !!value || `${propertyType}를 입력해주세요.`;
      },
      isLongEnough(propertyType, limit) {
        return value =>
          value.length >= limit ||
          `${propertyType}은 최소 ${limit}글자 이상이어야 합니다.`;
      }
    };
  },
  methods: {
    closeDialog() {
      // 부모 컴포넌트로 이벤트 Emit
      this.$emit("closeDialog");
    },
    submitQuestion() {}
    //   async changePassword() {
    //     // 비밀번호 변경을 위해 Vuex State Action을 호출한다.
    //     await this.$store.dispatch("user/updatePassword", {
    //       password: this.password,
    //       passwordConfirm: this.passwordConfirm
    //     });

    //     // Form Data를 초기화한다.
    //     this.password = "";
    //     this.passwordConfirm = "";

    //     // 부모 컴포넌트로 이벤트를 Emit하여, 다이얼로그 창을 닫는다.
    //     this.$emit("closeDialog");
    //   }
  }
};
</script>

<style></style>
