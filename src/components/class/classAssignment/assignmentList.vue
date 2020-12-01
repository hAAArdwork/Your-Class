<template>
  <v-row style="height: 100%;">
    <v-col cols="8">
      <p class="class-info text-h4">
        과제물
      </p>
      <p class="text-h6 hidden-xs-only mb-0">
        과제물을 확인하고, 주어진 기한 내에 제출해주세요.
      </p>
    </v-col>

    <v-col cols="4" class="d-flex justify-end align-end">
      <v-btn
        v-if="!userData.isStudent"
        color="accent"
        @click="$router.push({ name: 'AssignmentWrite' })"
      >
        과제 등록
      </v-btn>
    </v-col>

    <!-- 과제 목록 렌더링 영역, 콘텐츠 오버플로우 시 스크롤 적용 -->
    <v-responsive class="overflow-y-auto" height="70%" width="100%">
      <v-container fluid>
        <v-scroll-y-transition>
          <v-expansion-panels hover v-if="assignmentList.length != 0">
            <!-- 과제물 아이템 하나씩 렌더링 -->
            <v-expansion-panel
              v-for="assignment in assignmentList"
              :key="assignment.id"
            >
              <!-- 과제물 패널 헤더 영역 -->
              <v-expansion-panel-header>
                <v-row no-gutters>
                  <v-col class="flex-grow-1">
                    <strong class="mr-2" style="font-size: 18px;">
                      {{ assignment.assignmentName }}
                    </strong>

                    <small
                      v-if="assignment.isSubmitted == 1 && userData.isStudent"
                      style="color: green;"
                    >
                      제출완료
                    </small>

                    <small
                      v-if="assignment.isSubmitted == 0 && userData.isStudent"
                      style="color: red;"
                    >
                      미제출
                    </small>
                  </v-col>

                  <v-col cols="4" class="text-end">
                    <v-chip
                      v-if="new Date() < new Date(assignment.assignmentDueDate)"
                      color="success"
                      small
                    >
                      진행
                    </v-chip>

                    <v-chip v-else color="error" small>
                      마감
                    </v-chip>

                    <span class="text--secondary mx-2">
                      <strong>마감일 :</strong>
                      {{ assignment.assignmentDueDate }}
                    </span>
                  </v-col>
                </v-row>
              </v-expansion-panel-header>

              <v-expansion-panel-content color="grey lighten-4">
                <v-row>
                  <v-col cols="12">
                    <span class="caption">
                      게시일 : {{ assignment.assignmentUpdateDate }}
                    </span>
                  </v-col>

                  <v-col cols="12">
                    {{ assignment.assignmentDetail }}
                  </v-col>

                  <v-col cols="12" class="d-flex align-center pb-0">
                    <v-icon>mdi-download</v-icon>
                    <span
                      class="downloadable flex-grow-1 mx-2"
                      @click="
                        downloadFile(
                          assignment.id,
                          assignment.assignmentFileName
                        )
                      "
                    >
                      {{ assignment.assignmentFileName }}
                    </span>

                    <!-- 학생용 과제 제출 및 확인 버튼 -->
                    <v-btn
                      v-if="assignment.isSubmitted && userData.isStudent"
                      @click="
                        $router.push({
                          name: 'AssignmentSubmitDetail',
                          params: { assignmentId: assignment.id }
                        })
                      "
                      outlined
                      >제출 내용 확인
                    </v-btn>

                    <v-btn
                      v-if="!assignment.isSubmitted && userData.isStudent"
                      @click="
                        $router.push({
                          name: 'AssignmentSubmit',
                          params: { assignmentId: assignment.id }
                        })
                      "
                      :disabled="
                        new Date() >= new Date(assignment.assignmentDueDate)
                      "
                      outlined
                      >{{
                        new Date() >= new Date(assignment.assignmentDueDate)
                          ? "기한 종료"
                          : "과제 제출"
                      }}
                    </v-btn>

                    <!-- 교사용 제출물 확인 및 삭제 버튼 -->
                    <v-btn
                      v-if="!userData.isStudent"
                      outlined
                      :to="{
                        name: 'AssignmnetSubmitCheck',
                        params: { assignmentId: assignment.id }
                      }"
                    >
                      제출자 확인
                    </v-btn>

                    <v-btn
                      v-if="!userData.isStudent"
                      class="mx-2"
                      outlined
                      :to="{
                        name: 'AssignmentEdit',
                        params: { assignmentId: assignment.id }
                      }"
                    >
                      <v-icon left> mdi-pencil</v-icon>
                      내용 수정
                    </v-btn>

                    <v-btn
                      v-if="!userData.isStudent"
                      color="error"
                      outlined
                      @click="deleteAssignment(assignment.id)"
                    >
                      <v-icon left> mdi-delete</v-icon>
                      삭제하기
                    </v-btn>
                  </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-scroll-y-transition>
      </v-container>
    </v-responsive>
  </v-row>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch(
      "assignment/retrieveAssignmentList",
      this.$route.params.classId
    );
  },
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    },
    assignmentList() {
      const array = this.$store.getters["assignment/assignmentList"];

      return array.reverse();
    }
  },

  data() {
    return {
      assignmentId: this.$route.params.classId
    };
  },

  methods: {
    findAssignment(id, list) {
      let index = 0;

      for (let assignment of list) {
        if (id == assignment.id) {
          break;
        }
        index++;
      }

      return index;
    },

    // 업로드 된 과제 첨부 파일을 다운로드한다.
    downloadFile(assignmentId, fileName) {
      this.$axios({
        url: `assignment/download/${assignmentId}`,
        method: "GET",
        responseType: "blob" // important
      }).then(response => {
        // 다운로드 URL 생성
        const url = window.URL.createObjectURL(new Blob([response.data]));
        // HTML 태그 생성
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);

        // Document에
        document.body.appendChild(link);
        link.click();
      });
    },

    deleteAssignment(id) {
      alert("과제를 삭제하겠습니까?");
      const targetIndex = this.findAssignment(id, this.assignmentList);

      // 대기자 항목에서 해당 학생 제거.
      this.assignmentList.splice(targetIndex, 1);

      this.$store.dispatch("assignment/removeAssignment", id);
    }
  }
};
</script>

<style scoped>
.class-info {
  font-weight: 600;
}
.downloadable:hover {
  cursor: pointer;
  color: #516a99;
}
</style>
