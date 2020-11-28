<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        제출물 확인
      </p>
    </v-col>

    <v-col cols="4" class="d-flex justify-end">
      <v-btn color="accent" @click="$router.go(-1)">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>

    <!-- 강좌 목록 렌더링 영역, 콘텐츠 오버플로우 시 스크롤 적용 -->
    <v-responsive class="overflow-y-auto px-2" height="85%" width="100%">
      <v-row>
        <v-col cols="12">
          <v-card class="mx-auto" width="100%" outlined>
            <v-card-title>
              {{ assignmentInfo === null ? "" : assignmentInfo.assignmentName }}

              <v-spacer></v-spacer>

              <small>
                마감일 :
                {{
                  assignmentInfo === null
                    ? ""
                    : assignmentInfo.assignmentDueDate
                }}
              </small>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <span class="subtitle-1">
                {{
                  assignmentInfo === null ? "" : assignmentInfo.assignmentDetail
                }}
              </span>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mx-auto" width="100%" outlined>
            <v-card-title>
              제출물 상세내용

              <v-spacer></v-spacer>

              <small>
                제출일 :
                {{ submitInfo === null ? "" : submitInfo.updateDate }}
              </small>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <span class="subtitle-1">
                {{ submitInfo === null ? "" : submitInfo.detail }}
              </span>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-icon>mdi-download</v-icon>
              <span
                class="downloadable flex-grow-1 mx-2"
                @click="
                  downloadFile(
                    submitInfo === null ? '' : submitInfo.id,
                    submitInfo === null ? '' : submitInfo.fileName
                  )
                "
              >
                {{ submitInfo === null ? "" : submitInfo.fileName }}
              </span>

              <v-spacer></v-spacer>

              <v-btn @click="$router.push({ name: 'SubmitEdit' })" outlined>
                <v-icon left> mdi-pencil </v-icon>
                수정하기
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-responsive>
  </v-row>
</template>

<script>
function parseDateTime(fullDate) {
  return fullDate.substring(0, 10) + " " + fullDate.substring(11, 16);
}

export default {
  beforeCreate() {
    // Component 생성 이전, Route Param에 알맞는 제출정보 요청
    this.$axios
      .get(`assignment/submit/detail/${this.$route.params.assignmentId}`)
      .then(({ data }) => {
        // 과제 상세 내역
        this.assignmentInfo = data.assignmentId;
        data.assignmentId.assignmentDueDate = parseDateTime(
          data.assignmentId.assignmentDueDate
        );

        // 제출물 상세 내역
        this.submitInfo = {
          id: data.id,
          updateDate: parseDateTime(data.submitUpdateDate),
          detail: data.submitDetail,
          file: data.submitFile,
          fileName: data.submitFileName
        };
      });
  },

  data() {
    return {
      assignmentInfo: null,
      submitInfo: null
    };
  },

  methods: {
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
  margin-bottom: 0px;
  font-weight: 600;
}
.downloadable:hover {
  cursor: pointer;
  color: #516a99;
}
</style>
