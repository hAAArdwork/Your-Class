<template>
  <v-card class="mx-auto rounded-lg">
    <v-card-title>
      <span class="text-h6 font-weight-bold">새 공지사항 등록</span>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-progress-linear
      :indeterminate="isLoading"
      :active="isLoading"
      color="accent darken-2"
    ></v-progress-linear>

    <v-divider></v-divider>

    <v-card-text class="px-sm-12 py-2">
      <v-form v-model="valid" @submit.prevent="">
        <v-text-field
          v-model="title"
          label="제목"
          :rules="[required('제목'), isLongEnough('제목', 5)]"
        >
        </v-text-field>

        <v-textarea
          v-model="question"
          label="공지사항 내용을 입력해주세요."
          rows="10"
          no-resize
          :rules="[required('내용'), isLongEnough('내용', 15)]"
          counter
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
        @click="createNotice"
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
  data: () => ({
    isLoading: false,

    valid: false,

    title: "",
    question: "",

    required(propertyType) {
      return value => !!value || `${propertyType}를 입력해주세요.`;
    },
    isLongEnough(propertyType, limit) {
      return value =>
        value.length >= limit ||
        `${propertyType}은 최소 ${limit}글자 이상이어야 합니다.`;
    }
  }),

  methods: {
    closeDialog() {
      // 부모 컴포넌트로 이벤트 Emit
      this.$emit("closeDialog");
    },
    createNotice() {
      this.isLoading = true;

      // 파일 형식을 백엔드 서버에 전송하기 위하여, FormData 객체를 사용한다.
      let formData = new FormData();

      formData.append("classId", this.$route.params.classId);
      formData.append("postName", this.title);
      formData.append("postDetail", this.question);

      this.$store.dispatch("post/createNotice", formData);

      setTimeout(() => {
        this.isLoading = false;

        this.closeDialog();
      }, 1000);
    }
  }
};
</script>

<style></style>
