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
      <v-scroll-y-transition>
        <v-data-table
          v-if="noticeList.length != 0"
          :headers="responsiveHeaders"
          :items="noticeList"
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
              공지사항 세부 내용 {{ item.noticeName }}
            </td>
          </template>

          <template v-slot:[`item.index`]="{ item }">
            {{ item.index }}
          </template>

          <template v-slot:[`item.noticeName`]="{ item }">
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
                    name: 'noticeDetail',
                    params: { postId: item.id }
                  })
                "
                >{{ item.noticeName }}</span
              >
            </div>
          </template>

          <template v-slot:[`item.noticeAuthor`]="{ item }">
            {{
              $vuetify.breakpoint.name != "xs"
                ? item.noticeAuthor
                : item.noticeAuthor.split(" ")[0]
            }}
          </template>

          <template v-slot:[`item.noticeUpdateDate`]="{ item }">
            <span class="hidden-xs-only">{{
              $vuetify.breakpoint.name == "sm"
                ? item.noticeUpdateDate.substr(0, 10)
                : item.noticeUpdateDate
            }}</span>
          </template>
        </v-data-table>
      </v-scroll-y-transition>
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
  beforeCreate() {
    this.$store.dispatch("post/retrieveNoticeList", this.$route.params.classId);
  },

  components: {
    NoticeForm: NoticeForm
  },

  data: () => ({
    isWriting: false,

    page: 1,
    pageCount: 0,
    headers: [
      { text: "번호", value: "index", align: "center" },
      { text: "제목", value: "noticeName", align: "center", sortable: false },
      {
        text: "작성자",
        value: "noticeAuthor",
        align: "center",
        sortable: false
      },
      {
        text: "작성일",
        value: "noticeUpdateDate",
        align: "center",
        sortable: false
      }
    ]
  }),

  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    },
    noticeList() {
      return this.$store.getters["post/noticeList"];
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
          return "200px";
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
  methods: {}
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

.clickable:hover {
  cursor: pointer;
  color: cornflowerblue;
}
</style>
