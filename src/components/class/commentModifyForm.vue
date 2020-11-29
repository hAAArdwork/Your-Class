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
          v-model="detail"
          rows="3"
          no-resize
          counter
          :rules="[required('댓글 내용')]"
        >
        </v-textarea>
      </v-form>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" text @click="closeDialog">
        취소
      </v-btn>
      <v-btn
        color="blue lighten-2"
        text
        :disabled="!valid || isLoading"
        @click="editComment"
      >
        <v-icon left>
          mdi-pencil
        </v-icon>
        수정하기
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  props: {
    targetComment: Object
  },

  data() {
    return {
      isLoading: false,

      valid: false,

      id: this.targetComment.id,
      detail: this.targetComment.commentDetail,
      postId: this.targetComment.commentPostId.id,

      required(propertyType) {
        return value => !!value || `${propertyType}를 입력해주세요.`;
      }
    };
  },
  methods: {
    closeDialog() {
      // 부모 컴포넌트로 이벤트 Emit
      this.$emit("closeDialog");
    },

    editComment() {
      this.isLoading = true;

      this.$store.dispatch("post/updateComment", {
        commentId: this.id,
        commentDetail: this.detail,
        postId: this.postId
      });

      setTimeout(() => {
        this.isLoading = false;

        this.closeDialog();
      }, 250);
    }
  }
};
</script>

<style></style>
