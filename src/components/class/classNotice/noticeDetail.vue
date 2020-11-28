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
          </v-card-title>

          <v-card-subtitle>
            <span class="post-detail"> <strong>작성자 : </strong>{{ noticeDetail.postAuthor }} </span>
            <span class="post-detail">
              <strong>작성일 : </strong>{{ noticeDetail.postUpdateDate }}
            </span>
              
            
          </v-card-subtitle>

          <v-divider></v-divider>

          <v-card-text>
            <div>
              {{ noticeDetail.postDetail }}
            </div>
            <div 
            class="text-center mt-10"
            v-if="userData.email == noticeDetail.postAuthorEmail"
            >


              <v-dialog
                max-width="700"
                v-model="isEdit"
                persistent
                transition="scroll-x-reverse-transition"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                  class="mx-2"
                  small
                  color="accent"
                  v-bind="attrs"
                  v-on="on"    
                  >
                  수정하기
                  </v-btn>
                </template>
                <!-- Form Component -->
                <edit-form @closeDialog="isEdit = false" />
              </v-dialog>
              
              
              <v-btn 
                class="mx-2"
                small
                @click="removeNotice(noticeDetail.postId)"
              >
                삭제하기
              </v-btn>
            </div>
          </v-card-text>

          <v-card-text>
            <v-row align="end">
              <v-col class="flex-grow-1">
                <v-form v-model="valid">
                  <v-textarea
                    label="댓글을 입력해주세요."
                    v-model="comment"
                    hide-details
                    outlined
                    no-resize
                    rows="3"
                    row-height="15"
                    :rules="[
                      required('댓글 내용'),
                      isLongEnough('댓글 내용', 10)
                    ]"
                  ></v-textarea>
                </v-form>
              </v-col>

              <v-col class="flex-grow-0">
                <v-btn 
                small 
                :disabled="!valid"
                @click="enterComment">{{
                  responsiveButtonText
                }}</v-btn>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card v-for="num in 2" :key="num" flat>
            <v-card-title class="d-flex">
              <span class="flex-grow-1">댓글 제목</span>
              <v-dialog
                max-width="700"
                v-model="isWriting"
                transition="scroll-x-reverse-transition"
                :retain-focus="false"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-btn icon v-bind="attrs" v-on="on">
                    <v-icon size="20"> mdi-pencil </v-icon>
                  </v-btn>
                </template>

                <!-- Form Component -->
                <modify-form
                  @closeDialog="isWriting = false"
                  content="기존의 댓글 내용"
                />
              </v-dialog>

              <v-btn icon>
                <v-icon size="20"> mdi-delete </v-icon>
              </v-btn>
            </v-card-title>

            <v-card-subtitle>
              <span class="post-detail">
                <strong>작성자 : </strong>양준영
              </span>

              <span class="post-detail">
                <strong>작성일 : </strong>2020-11-10
              </span>
            </v-card-subtitle>
          </v-card>
        </v-card>
      </v-row>
    </v-responsive>
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
    this.$store.dispatch(
      "post/retrieveComment",
      this.$route.params.postId
    );
  },
  
  data: () => ({
    isEdit: false,
    valid: false,
    isWriting: false,

    comment: "",

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
    //공지 삭제
    removeNotice(id) {
      alert("공지를 삭제하겠습니까?");
      this.$store.dispatch("post/deleteNotice", id);
    },
    //공지 수정
    editNotice() {

    },
    enterComment() {
      let formData = new FormData();

      formData.append("postId", this.$route.params.postId);
      formData.append("commentDetail", this.comment);

      this.$store.dispatch("post/enterComment", formData);
    }
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
    }
  }
};
</script>

<style scoped>
.class-info {
  margin-bottom: 0px;
  font-weight: 600;
}
.post-detail {
  font-size: 15px;
  margin-right: 15px;
}
</style>
