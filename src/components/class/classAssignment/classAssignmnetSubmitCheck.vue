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

    <v-col cols="12" style="height: 350px;">
      <v-data-table
        :headers="headers"
        :items="submit"
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
          <v-chip v-if="item.submitted == true" color="success" small>
            제출
          </v-chip>
          <v-chip v-else color="error" small>
            미제출
          </v-chip>
        </template>

        <template v-slot:[`item.submitFile`]="{ item }">
          <v-icon v-if="item.submitFile" @click="download(item)" small>
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
  data: () => ({
    singleExpand: true,
    expanded: [],
    page: 1,
    pageCount: 0,
    itemsPerPage: 5,
    headers: [
      { text: "번호", value: "number", align: "center" },
      {
        text: "제출자id",
        value: "submitUserId",
        align: "center",
        sortable: false
      },
      {
        text: "제출자",
        value: "submitUserName",
        align: "center",
        sortable: false
      },
      { text: "제목", value: "submitTitle", align: "center", sortable: false },
      {
        text: "제출일",
        value: "submitUpdateDate",
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
    submit: [
      {
        submitUserId: "1234",
        submitUserName: "이정우",
        number: "1",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "안녕하세요 과제를 제출하겠습니다.",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: "as.c"
      },
      {
        submitUserId: "1212",
        submitUserName: "이정우",
        number: "2",
        name: "정우",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "1245",
        submitUserName: "이정우",
        number: "3",
        submitted: false,
        submitTitle: "",
        submitDetail: "",
        submitUpdateDate: "",
        submitFile: ""
      },
      {
        submitUserId: "2345",
        submitUserName: "이정우",
        number: "4",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: "sofrtwarEngineering.pdf"
      },
      {
        submitUserId: "3852",
        submitUserName: "이정우",
        number: "5",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "2358",
        submitUserName: "이정우",
        number: "6",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "5932",
        submitUserName: "이정우",
        number: "7",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "3705",
        submitUserName: "이정우",
        number: "8",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "2569",
        submitUserName: "이정우",
        number: "9",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "3689",
        submitUserName: "이정우",
        number: "10",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "7842",
        submitUserName: "이정우",
        number: "11",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "1211",
        submitUserName: "이정우",
        number: "12",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      },
      {
        submitUserId: "1111",
        submitUserName: "이정우",
        number: "13",
        submitted: true,
        submitTitle: "6장 연습문제 제출합니다.",
        submitDetail: "",
        submitUpdateDate: "2020-11-10 10:30",
        submitFile: ""
      }
    ]
  }),

  methods: {
    downloadAll() {
      alert("전체 다운로드");
    },
    download() {
      alert("다운로드");
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
