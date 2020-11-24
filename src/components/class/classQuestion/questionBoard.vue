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
            v-if="!userData.isStudent"
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
      <v-data-table
        mobile-breakpoint="0"
        :headers="responsiveHeaders"
        :items="questions"
        :page.sync="page"
        :items-per-page="itemPerPage"
        @page-count="pageCount = $event"
        hide-default-footer
        :sort-desc="[true]"
        :sort-by="['number']"
        item-key="number"
        @click="onClick(item)"
      >
        <template v-slot:[`item.number`]="{ item }">
          <span>{{ item.number }}</span>
        </template>

        <template v-slot:[`item.title`]="{ item }">
          <div
            :class="
              $vuetify.breakpoint.name == 'sm' || 'xs' ? 'text-truncate' : ''
            "
            :style="`max-width: ${truncateLength};`"
          >
            <span @click="onClick(item)">{{ item.title }}</span>
          </div>
        </template>

        <template v-slot:[`item.author`]="{ item }">
          {{
            $vuetify.breakpoint.name != "xs"
              ? item.author
              : item.author.split(" ")[0]
          }}
        </template>

        <template v-slot:[`item.dateCreated`]="{ item }">
          <span class="hidden-xs-only">{{
            $vuetify.breakpoint.name == "sm"
              ? item.dateCreated.substr(0, 10)
              : item.dateCreated
          }}</span>
        </template>
      </v-data-table>
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
import QuestionForm from "../classQuestion/questionFrom.vue";

export default {
  components: {
    QuestionForm: QuestionForm
  },
  data: () => ({
    isWriting: false,

    page: 1,
    pageCount: 0,
    headers: [
      { text: "번호", value: "number", align: "center" },
      { text: "제목", value: "title", align: "center", sortable: false },
      { text: "작성자", value: "author", align: "center", sortable: false },
      { text: "작성일", value: "dateCreated", align: "center", sortable: false }
    ],
    questions: [
      {
        number: 1,
        title: "1장 과제에 대한 질문",
        author: "이정우 ",
        dateCreated: "2020-03-01 10:30",
        content: ""
      },
      {
        number: 2,
        title: "1장 과제에 대한 질문2",
        author: "이정우 ",
        dateCreated: "2020-03-03 10:30",
        content: ""
      },
      {
        number: 3,
        title: "2장 과제에 대한 질문",
        author: "이정우 ",
        dateCreated: "2020-03-11 10:30",
        content: ""
      },
      {
        number: 4,
        title: "시험 일정에 관한 질문",
        author: "이정우 ",
        dateCreated: "2020-03-13 10:30",
        content: ""
      },
      {
        number: 5,
        title: "3장 과제에 대한 질문",
        author: "이정우 ",
        dateCreated: "2020-03-21 10:30",
        content: ""
      },
      {
        number: 6,
        title: "3장 수업에 대한 질문",
        author: "이정우 ",
        dateCreated: "2020-03-29 10:30",
        content: ""
      },
      {
        number: 7,
        title: "수업 관련 질문",
        author: "이정우",
        dateCreated: "2020-04-02 10:30",
        content: ""
      },
      {
        number: 8,
        title: "수업 관련 질문",
        author: "이정우",
        dateCreated: "2020-04-02 10:30",
        content: ""
      },
      {
        number: 9,
        title: "수업 관련 질문",
        author: "이정우",
        dateCreated: "2020-04-02 10:30",
        content: ""
      }
    ]
  }),
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
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
  },
  methods: {
    onClick(item) {
      console.log(item);
      this.$router.push({ name: "questionDetail" });
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
