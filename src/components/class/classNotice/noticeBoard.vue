<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        공지사항
      </p>
      <p class="text-h6 hidden-xs-only mb-0">
        중요한 공지사항을 확인하고, 학습 일정에 반영하세요!
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
            <strong>새글쓰기</strong>
            <v-icon right>mdi-pencil</v-icon>
          </v-btn>
        </template>

        <!-- Form Component -->
        <notice-form @closeDialog="isWriting = false" />
      </v-dialog>
    </v-col>

    <v-col cols="12" style="height: 350px;">
      <v-data-table
        mobile-breakpoint="0"
        :headers="responsiveHeaders"
        :items="posts"
        :items-per-page="itemPerPage"
        :page.sync="page"
        @page-count="pageCount = $event"
        hide-default-footer
        :sort-desc="[true]"
        :sort-by="['number']"
        item-key="number"
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">공지사항 세부 내용 {{ item.title }}</td>
        </template>

        <template v-slot:[`item.number`]="{ item }">
          {{ item.number }}
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

    <v-col cols="12">
      <div class="text-center pt-2">
        <v-pagination color="accent" v-model="page" :length="pageCount">
        </v-pagination>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import NoticeForm from "../classNotice/noticeForm.vue";

export default {
  components: {
    NoticeForm: NoticeForm
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
    posts: [
      {
        number: 1,
        subject: "물리",
        title: "과목 일정에 대한 공지입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-03-01 10:30"
      },
      {
        number: 2,
        subject: "물리",
        title: "1장 수업 자료입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-03-03 10:30"
      },
      {
        number: 3,
        subject: "물리",
        title: "2장 수업 자료입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-03-11 10:30"
      },
      {
        number: 4,
        subject: "물리",
        title: "3장 수업 자료입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-03-13 10:30"
      },
      {
        number: 5,
        subject: "물리",
        title: "4장 수업 자료입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-03-21 10:30"
      },
      {
        number: 6,
        subject: "물리",
        title: "5장 수업 자료입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-03-29 10:30"
      },
      {
        number: 7,
        subject: "물리",
        title: "1차 과제물에 대한 안내입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-04-02 10:30"
      },
      {
        number: 8,
        subject: "물리",
        title: "과목 일정 변경에 대한 공지입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-04-05 10:30"
      },
      {
        number: 9,
        subject: "물리",
        title: "중간고사 일정에 대한 공지입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-04-15 10:30"
      },
      {
        number: 10,
        subject: "물리",
        title: "수행평가 일정에 대한 공지입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-04-16 10:30"
      },
      {
        number: 11,
        subject: "물리",
        title: "6장 수업 자료입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-04-20 10:30"
      },
      {
        number: 12,
        subject: "물리",
        title: "7장 수업 자료입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-04-30 10:30"
      },
      {
        number: 13,
        subject: "물리",
        title: "2회차 과제에 대한 안내입니다.",
        author: "이정우 선생님",
        dateCreated: "2020-05-01 10:30"
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
      this.$router.push({ name: "noticeDetail" });
    }
  }
};
</script>

<style scoped>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding: 0px 10px;
}

.class-info {
  font-weight: 600;
}
.card-text-title {
  font-size: 20px;
  margin-bottom: 0px;
}
</style>
