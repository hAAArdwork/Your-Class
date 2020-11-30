<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        과제 제출
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
              {{
                assignmentInfo === null ? "-" : assignmentInfo.assignmentName
              }}

              <v-spacer></v-spacer>

              <small>
                마감일 :
                {{
                  assignmentInfo === null
                    ? "-"
                    : assignmentInfo.assignmentDueDate
                }}
              </small>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <span class="subtitle-1">
                {{
                  assignmentInfo === null
                    ? "-"
                    : assignmentInfo.assignmentDetail
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
                      v-model="submitDetail"
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
                      v-model="submitFile"
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
                    <v-btn
                      :disabled="!valid"
                      @click="submitAssignment"
                      outlined
                    >
                      <v-icon left> mdi-checkbox-marked-circle </v-icon>
                      제출
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

    this.$axios
      .get(`assignment/detail/${assignmentId}`)
      .then(async ({ data }) => {
        data.assignmentDueDate = parseDateTime(data.assignmentDueDate);

        this.assignmentInfo = data;
      });
  },

  data: () => ({
    valid: false,

    // 현재 과제 정보
    assignmentInfo: null,

    // 제출물 Form Data
    submitDetail: "",
    submitFile: null,

    rules: {
      required: value => !!value || "입력해주세요",
      // 제출 파일 용량 검사
      limitedSize: value =>
        !value || value.size < 50000000 || "첨부 파일 용량 제한은 50MB입니다."
    }
  }),

  methods: {
    submit() {
      if (confirm("등록하시겠습니까?")) {
        this.submitted = true;
      }
    },
    submitAssignment() {
      //console.log(this.assignmentFile);

      // 파일 형식을 백엔드 서버에 전송하기 위하여, FormData 객체를 사용한다.
      let formData = new FormData();

      formData.append("assignId", this.$route.params.assignmentId);
      formData.append("submitDetail", this.submitDetail);
      if (this.submitFile !== null) {
        formData.append("submitFile", this.submitFile);
      }

      this.$store.dispatch("assignment/createSubmit", formData);
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
