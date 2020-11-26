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
              {{ assignmentName }}

              <v-spacer></v-spacer>

              <small>마감일 : {{ assignmentDueDate }}</small>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              {{ AssignmentDetail }}
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12">
          <v-card class="mx-auto" width="100%" outlined>
            <v-card-title>
              제출 정보

              <v-spacer></v-spacer>

              <small>제출일 : {{ submitUpdateDate }}</small>
            </v-card-title>

            <v-divider></v-divider>

            <v-card-text>
              <p>제출명 : {{ submitTitle }}</p>
              <span>코멘트 : {{ submitDetail }}</span>
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-chip @click="download" pill outlined>
                <v-icon left>mdi-file-outline</v-icon> {{ submitFile }}
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
  data: () => ({
    assignmentName: "6장 연습문제",
    AssignmentDetail:
      "Lorem Ipsum s standard dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent",
    assignmentDueDate: "2020.10.30",

    submitTitle: "과제 제출합니다.",
    submitDetail: "안녕하세요 과제 제출합니다",
    submitUpdateDate: "2020.10.27 17:34",
    submitFile: "cache.zip"
  }),

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
