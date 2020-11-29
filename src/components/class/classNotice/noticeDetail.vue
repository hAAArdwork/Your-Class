<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        공지사항
      </p>
    </v-col>

    <v-col cols="4" class="d-flex justify-end">
      <v-btn color="accent" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>

    <!-- 강좌 목록 렌더링 영역, 콘텐츠 오버플로우 시 스크롤 적용 -->
    <v-responsive class="overflow-y-auto px-6" height="85%" width="100%">
      <!-- 각 과목에 해당하는 카드 렌더링 -->
      <v-row>
        <v-card class="mx-auto" width="100%" outlined>
          <v-card-title>
            <span> {{ noticeDetail.postName }}</span>

            <v-spacer></v-spacer>

            <!-- 공지사항 수정 및 삭제를 위한 버튼, 작성자가 아닐 시 확인 불가 -->
            <div v-if="userData.email == noticeDetail.postAuthorEmail">
              <v-dialog
                max-width="700"
                v-model="postEditDialog"
                transition="slide-x-reverse-transition"
                persistent
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon size="20"> mdi-pencil </v-icon>
                  </v-btn>
                </template>

                <!-- Form Component -->
                <edit-form
                  @closeDialog="postEditDialog = false"
                  :content="{
                    name: noticeDetail.postName,
                    detail: noticeDetail.postDetail
                  }"
                />
              </v-dialog>

              <v-btn icon>
                <v-icon size="20" @click="confirmDelete(noticeDetail, false)">
                  mdi-delete
                </v-icon>
              </v-btn>
            </div>
          </v-card-title>

          <!-- 공지사항 작성자 및 작성일 -->
          <v-card-subtitle>
            <span class="post-detail">
              <strong>작성자 : </strong>{{ noticeDetail.postAuthor }}
            </span>

            <span class="post-detail">
              <strong>작성일 : </strong>{{ noticeDetail.postUpdateDate }}
            </span>
          </v-card-subtitle>

          <v-divider></v-divider>

          <!-- 본문 영역 -->
          <v-card-text>
            <pre class="primary--text">{{ noticeDetail.postDetail }}</pre>
          </v-card-text>

          <!-- 댓글 작성 영역 -->
          <v-card-text class="py-0">
            <v-row align="end">
              <v-col class="flex-grow-1">
                <v-form v-model="valid">
                  <v-textarea
                    v-model="comment"
                    label="댓글"
                    placeholder="댓글을 남길 수 있습니다."
                    outlined
                    no-resize
                    hide-details
                    rows="2"
                    row-height="15"
                  ></v-textarea>
                </v-form>
              </v-col>

              <v-col class="flex-grow-0">
                <v-btn
                  small
                  outlined
                  :disabled="!valid"
                  @click="createComment"
                  >{{ responsiveButtonText }}</v-btn
                >
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <!-- 댓글 목록 영역 -->
          <v-slide-y-transition>
            <v-card v-if="commentList.length > 0" flat>
              <v-list
                v-for="(comment, index) in commentList"
                :key="index"
                two-line
                subheader
              >
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title>
                      {{ comment.commentDetail }}
                    </v-list-item-title>

                    <v-list-item-subtitle>
                      <span class="comment-detail">
                        <strong>작성자 : </strong>
                        {{ comment.commentUserId.name }}
                      </span>

                      <span class="comment-detail">
                        <strong>작성일 : </strong>
                        {{ comment.commentUpdateDate.substring(0, 10) }}
                      </span>
                    </v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <div v-if="userData.email == comment.commentUserId.email">
                      <v-btn icon @click="editComment(comment)">
                        <v-icon size="20"> mdi-pencil </v-icon>
                      </v-btn>

                      <v-btn icon @click="confirmDelete(comment, true)">
                        <v-icon size="20"> mdi-delete </v-icon>
                      </v-btn>
                    </div>
                  </v-list-item-action>
                </v-list-item>
              </v-list>
            </v-card>
          </v-slide-y-transition>
        </v-card>
      </v-row>
    </v-responsive>

    <!-- 댓글 수정 Dialog -->
    <v-dialog
      max-width="450px"
      v-model="commentEditDialog"
      transition="slide-x-reverse-transition"
      :retain-focus="false"
      hide-overlay
    >
      <!-- Form Component -->
      <modify-form
        @closeDialog="commentEditDialog = false"
        :targetComment="targetComment"
      />
    </v-dialog>

    <!-- 요소 삭제 확인 Dialog -->
    <v-dialog v-model="deleteConfirmDialog" max-width="450px">
      <v-card>
        <v-card-title>
          정말 삭제하시겠습니까?
        </v-card-title>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" text @click="deleteConfirmDialog = false">
            돌아가기
          </v-btn>
          <v-btn color="error" text @click="execueteDeletion">
            확인
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import ModifyForm from "../commentModifyForm.vue";
import EditForm from "../classNotice/EditForm.vue";

export default {
  components: {
    ModifyForm: ModifyForm,
    EditForm: EditForm
  },

  beforeCreate() {
    this.$store.dispatch(
      "post/retrieveNoticeDetail",
      this.$route.params.postId
    );
  },

  computed: {
    responsiveButtonText() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs": {
          return "등록";
        }
        default:
          return "등록하기";
      }
    },
    userData() {
      return this.$store.getters["user/userData"];
    },
    noticeDetail() {
      return this.$store.getters["post/noticeDetail"];
    },
    commentList() {
      return this.$store.getters["post/commentList"];
    }
  },

  data: () => ({
    // Dialog Flags
    postEditDialog: false,
    commentEditDialog: false,
    deleteConfirmDialog: false,

    // Form Validation
    valid: false,
    comment: "",

    targetComment: "", // 수정 대상 댓글을 담기 위한 변수

    deleteTarget: null, // 삭제 대상 공지 또는 댓글의 ID를 담기 위한 변수
    targetType: "" // 삭제 대상의 타입 (공지 or 댓글)을 담기 위한 변수
  }),

  methods: {
    // 삭제 확인은 받기위한 Dialog 및 대상의 타입와 ID를 얻는다.
    confirmDelete(target, isComment) {
      this.deleteConfirmDialog = true;

      console.log(target);

      this.deleteTarget = target;
      this.targetType = isComment ? "Comment" : "Post";
    },

    // 대상의 타입에 따라 적절한 삭제 함수를 발동한다.
    execueteDeletion() {
      if (this.targetType == "Post") {
        this.$store.dispatch("post/deleteNotice", this.deleteTarget.postId);
      } else if (this.targetType == "Comment") {
        this.$store.dispatch("post/deleteComment", this.deleteTarget);
      }

      this.deleteConfirmDialog = false;
    },

    createComment() {
      // 댓글에 내용이 없거나, 너무 짧은 경우 Axios 전송을 하지 않는다.
      if (this.comment.length < 5) {
        alert("댓글 내용이 너무 짧습니다.");

        return;
      }

      let formData = new FormData();

      formData.append("postId", this.$route.params.postId);
      formData.append("commentDetail", this.comment);

      this.$store.dispatch("post/createComment", formData);

      this.comment = "";
    },

    editComment(targetComment) {
      this.commentEditDialog = true;
      this.targetComment = targetComment;
    }
  }
};
</script>

<style scoped>
.class-info {
  margin-bottom: 0px;
  font-weight: 600;
}

.comment {
  font-size: 16px;
}

.comment-detail {
  font-size: 12px;
  margin-right: 15px;
}

.post-detail {
  font-size: 12px;
  margin-right: 15px;
}
</style>
