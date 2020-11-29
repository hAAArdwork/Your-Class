<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        질의응답
      </p>
      <p class="text-h6 hidden-xs-only mb-0">
        어떠한 질문이든 공유하고 답변할 수 있는 공간입니다.
      </p>
    </v-col>

    <v-col cols="4" class="d-flex justify-end align-end">
      <v-dialog
        max-width="700"
        v-model="isWriting"
        persistent
        transition="scroll-x-reverse-transition"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="accent"
            v-if="userData.isStudent"
            v-bind="attrs"
            v-on="on"
          >
            <strong>질문하기</strong>
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </template>

        <!-- Form Component -->
        <question-form @closeDialog="isWriting = false" />
      </v-dialog>
    </v-col>

    <!-- 게시판 테이블 -->
    <v-col cols="12" style="height: 350px;">
      <v-scroll-y-transition>
      <!-- <v-data-table
        mobile-breakpoint="0"
        :headers="responsiveHeaders"
        :items="questionList"
        :page.sync="page"
        :items-per-page="itemPerPage"
        @page-count="pageCount = $event"
        hide-default-footer
        :sort-desc="[true]"
        :sort-by="['index']"
        item-key="index"
        @click="onClick(item)"
      > -->
        <v-data-table
          v-if="questionList.length != 0"
          :headers="responsiveHeaders"
          :items="questionList"
          :items-per-page="itemPerPage"
          :page.sync="page"
          :sort-desc="[true]"
          :sort-by="['index']"
          @page-count="pageCount = $event"
          mobile-breakpoint="0"
          item-key="index"
          hide-default-footer
        >      
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            공지사항 세부 내용 {{ item.questionName }}
          </td>
        </template>

        <template v-slot:[`item.index`]="{ item }">
          <span>{{ item.index }}</span>
        </template>

        <template v-slot:[`item.questionName`]="{ item }">
          <div
            :class="
              $vuetify.breakpoint.name == 'sm' || 'xs' ? 'text-truncate' : ''
            "
            :style="`max-width: ${truncateLength}; margin: auto;`"
          >
            <span
              class="clickable"
              @click="
                $router.push({
                  name: 'questionDetail',
                  params: { postId: item.id }
                })
              "            
            >{{ item.questionName }}</span>
          </div>
        </template>

        <template v-slot:[`item.questionAuthor`]="{ item }">
          {{
            $vuetify.breakpoint.name != "xs"
              ? item.questionAuthor
              : item.questionAuthor.split(" ")[0]
          }}
        </template>

        <template v-slot:[`item.questionUpdateDate`]="{ item }">
          <span class="hidden-xs-only">{{
            $vuetify.breakpoint.name == "sm"
              ? item.questionUpdateDate.substr(0, 10)
              : item.questionUpdateDate
          }}</span>
        </template>
      </v-data-table>
      </v-scroll-y-transition>
    </v-col>

    <!-- 게시판 Pagination 버튼 -->
    <v-col cols="12">
      <div class="text-center pt-2">
        <v-pagination color="accent" v-model="page" :length="pageCount">
        </v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import QuestionForm from "../classQuestion/questionForm.vue";

export default {
  beforeCreate() {
    this.$store.dispatch("post/retrieveQuestionList", this.$route.params.classId);
  },
  components: {
    QuestionForm: QuestionForm
  },
  data: () => ({
    isWriting: false,

    page: 1,
    pageCount: 0,
    headers: [
      { text: "번호", value: "index", align: "center" },
      { text: "제목", value: "questionName", align: "center", sortable: false },
      { text: "작성자", value: "questionAuthor", align: "center", sortable: false },
      { text: "작성일", value: "questionUpdateDate", align: "center", sortable: false }
    ],
  }),
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    },
    questionList() {
      return this.$store.getters["post/questionList"];
    },
    itemPerPage() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 6;
        default:
          return 6;
      }
    },
    truncateLength() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "125px";
        case "sm":
          return "145px";
        default:
          return "";
      }
    },
    responsiveHeaders() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs": {
          return this.headers.slice(0, 3);
        }
        default:
          return this.headers;
      }
    }
  }
};
</script>

<style scoped>
.class-info {
  font-weight: 600;
}
.card-text-title {
  font-size: 20px;
  margin-bottom: 0px;
}
</style>
