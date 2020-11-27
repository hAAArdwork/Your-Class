<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        과제 제출 내역 확인 
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
              {{ submit.assignmentName }}

              <v-spacer></v-spacer>

              <small>마감일 : {{ submit.assignmentDueDate }}</small>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              {{ submit.AssignmentDetail }}
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mx-auto" width="100%" outlined>
            <v-card-title>
              제출 정보

              <v-spacer></v-spacer>

              <small>제출일 : {{ submit.submitUpdateDate }}</small>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <span>코멘트 : {{ submit.submitDetail }}</span>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-chip @click="download" pill outlined>
                <v-icon left>mdi-file-outline</v-icon> {{ submit.submitFileName }}
              </v-chip>

              <v-spacer></v-spacer>

              <v-btn
                @click="$router.push({ name: 'AssignmentSubmit' })"
                outlined
              >
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
export default {
  beforeCreate() {
    this.$store.dispatch(
      "assignment/retrieveSubmit",
      this.$route.params.assignmentId
    );
  },
  data: () => ({
  }),
  computed: {
    submit() {
      return this.$store.getters["assignment/submitDetail"];
    }
  },
  methods: {
    download() {
      alert("다운로드 중입니다.....");
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
