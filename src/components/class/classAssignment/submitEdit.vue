<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        과제 수정
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
          <v-card outlined>
            <v-card-text>
              <v-form v-model="valid">
                <v-row align="center">
                  <v-col cols="12">
                    <v-textarea
                      v-model="detail"
                      label="과제 내용"
                      hint="제출물관 관련된 설명을 간략하게 적어주세요."
                      rows="3"
                      no-resize
                      persistent-hint
                      :rules="[rules.required]"
                    ></v-textarea>
                  </v-col>

                  <v-col cols="7" sm="10">
                    <v-file-input
                      v-model="file"
                      label="첨부 파일"
                      truncate-length="30"
                      hint="파일명은 '과제명_이름_학년반'과 같이 제출해주세요."
                      persistent-hint
                      show-size
                      counter
                      small-chips
                      :rules="[rules.limitedSize]"
                    ></v-file-input>
                  </v-col>

                  <v-col class="d-flex justify-end">
                    <v-btn :disabled="!valid" @click="updateSubmit" outlined>
                      <v-icon left> mdi-checkbox-marked-circle </v-icon>
                      수정
                    </v-btn>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
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
    const assignmentId = this.$route.params.assignmentId;

    // Component 생성 이전, Route Param에 알맞는 제출정보 요청
    this.$axios
      .get(`assignment/submit/detail/${assignmentId}`)
      .then(async ({ data }) => {
        // 과제 상세 내역
        this.assignmentInfo = data.assignmentId;
        data.assignmentId.assignmentDueDate = parseDateTime(
          data.assignmentId.assignmentDueDate
        );

        // 제출물 상세 내역
        const submitId = data.id;

        this.detail = data.submitDetail;

        // 첨부 파일이 존재하지 않는 경우, 하위 로직을 실행하지 않는다.
        if (data.submitFile == null) {
          return;
        }

        const originalFileName = data.submitFileName;

        // 업로드 된 과제 첨부 파일을 다운로드한다.
        await this.$axios({
          url: `assignment/submit/download/${submitId}`,
          method: "GET",
          responseType: "blob" // important
        })
          .then(response => {
            this.file = new File([response.data], `${originalFileName}`);
          })
          .catch(({ response }) => {
            console.log(response);
          });
      });
  },

  data() {
    return {
      valid: false,

      assignmentInfo: null,

      detail: "",
      file: null,

      rules: {
        required: value => !!value || "필수 입력 항목입니다.",
        // 제출 파일 용량 검사
        limitedSize: value =>
          !value || value.size < 50000000 || "첨부 파일 용량 제한은 50MB입니다."
      }
    };
  },

  methods: {
    updateSubmit() {
      // 기존 제출된 파일을 삭제하는 경우 undefined로 변경되는 것을 방지하기 위한 로직.
      if (this.file === undefined) {
        this.file = null;
      }

      // 파일 형식을 백엔드 서버에 전송하기 위하여, FormData 객체를 사용한다.
      let formData = new FormData();

      formData.append("submitDetail", this.detail);
      if (this.file !== null) {
        formData.append("submitFile", this.file);
      }

      this.$store.dispatch("assignment/updateSubmit", {
        assignId: this.$route.params.assignmentId,
        formData: formData
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
.post-detail {
  font-size: 15px;
  margin-right: 15px;
}
</style>
