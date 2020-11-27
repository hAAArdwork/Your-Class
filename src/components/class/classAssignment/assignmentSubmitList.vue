<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        제출물 확인
      </p>
      <p class="text-h6 hidden-xs-only mb-0">
        학생 개별 과제물 조회 또는 일괄 다운로드가 가능합니다.
      </p>
    </v-col>

    <v-col cols="4" class="d-flex justify-end">
      <v-btn class="mx-4" color="accent" @click="downloadAll()">
        일괄 다운로드
      </v-btn>

      <v-btn color="accent" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>

    {{ submitList }}

    <v-col cols="12" style="height: 350px;">
      <v-data-table
        :headers="headers"
        :items="submitList"
        :items-per-page="itemsPerPage"
        :page.sync="page"
        @page-count="pageCount = $event"
        hide-default-footer
        :sort-desc="[true]"
        :sort-by="['number']"
        :expanded.sync="expanded"
        item-key="number"
        single-expand
        show-expand
      >
        <template v-slot:expanded-item="{ headers, item }">
          <td :colspan="headers.length">
            {{ item.submitDetail }}
          </td>
        </template>

        <template v-slot:[`item.isSubmitted`]="{ item }">
          <v-chip v-if="item.isSubmitted == 1" color="success" small>
            제출
          </v-chip>
          <v-chip v-else color="error" small>
            미제출
          </v-chip>
        </template>

        <template v-slot:[`item.submitFile`]="{ item }">
          <v-icon
            v-if="item.submitFile"
            @click="downloadFile(item.submitId, item.submitFileName)"
            small
          >
            mdi-download
          </v-icon>
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
export default {
  beforeCreate() {
    const classId = this.$route.params.classId;
    const assignmentId = this.$route.params.assignmentId;

    this.$store.dispatch("assignment/retrieveSubmitterList", {
      classId,
      assignmentId
    });
  },

  computed: {
    submitList() {
      return this.$store.getters["assignment/submitList"];
    }
  },

  data: () => ({
    singleExpand: true,
    expanded: [],
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,

    headers: [
      { text: "번호", value: "number", align: "center" },
      {
        text: "제출자",
        value: "name",
        align: "center",
        sortable: false
      },
      {
        text: "이메일",
        value: "email",
        align: "center",
        sortable: false
      },
      { text: "설명", value: "submitDetail", align: "center", sortable: false },
      {
        text: "제출 시간",
        value: "submitDate",
        align: "center",
        sortable: false
      },
      {
        text: "제출여부",
        value: "isSubmitted",
        align: "center",
        sortable: false
      },
      { text: "파일", value: "submitFile", sortable: false },
      { text: "", value: "data-table-expand" }
    ],
    submit: []
  }),

  methods: {
    downloadAll() {
      alert("전체 다운로드");
    },
    download() {
      alert("다운로드");
    },
    // 업로드 된 과제 첨부 파일을 다운로드한다.
    downloadFile(submitId, submitFileName) {
      this.$axios({
        url: `assignment/submit/download/${submitId}`,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        // 다운로드 URL 생성
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // HTML 태그 생성
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", submitFileName);

        // Document에
        document.body.appendChild(link);
        link.click();
      });
    }
  }
};
</script>

<style scoped>
.class-info {
  font-weight: 600;
}
.post-detail {
  font-size: 15px;
  margin-right: 15px;
}
</style>
