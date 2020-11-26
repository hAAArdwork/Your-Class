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
      <v-card flat>
        <v-card-text>
          <v-form v-model="valid">
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="submitTitle"
                  label="과제명"
                  placeholder="제출하려는 과제의 이름을 적어주세요."
                  :rules="[rules.required]"
                ></v-text-field>
              </v-col>

              <v-col cols="12">
                <v-textarea
                  v-model="submitDetail"
                  label="과제 내용"
                  placeholder="과제와 관련된 설명이 필요하다면 적어주세요."
                  no-resize
                  :rows="$vuetify.breakpoint.name == 'xs' ? 3 : 8"
                ></v-textarea>
              </v-col>

              <v-col cols="12">
                <v-file-input
                  v-model="submitFiles"
                  label="첨부 파일"
                  placeholder="첨부 파일을 추가해주세요."
                  truncate-length="15"
                  show-size
                  multiple
                  counter
                  small-chips
                  :rules="[rules.limitedSize()]"
                ></v-file-input>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn :disabled="!valid" @click="submit" outlined>
            <v-icon left> mdi-checkbox-marked-circle </v-icon>
            제출하기
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-responsive>
  </v-row>
</template>

<script>
export default {
  data: () => ({
    valid: false,

    assignmentId: "",
    submitted: "",
    submitTitle: "",
    submitDetail: "",
    submitUpdateDate: "",
    submitFiles: null,

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
