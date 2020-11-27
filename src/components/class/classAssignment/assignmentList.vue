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

        <v-expansion-panels hover>
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
                    v-if="assignment.submitted && userData.isStudent"
                    style="color: green;"
                  >
                    제출완료
                  </small>

                  <small
                    v-if="!assignment.submitted && userData.isStudent"
                    style="color: red;"
                  >
                    미제출
                  </small>
                </v-col>

                <v-col cols="4" class="text-end">
                  <span class="text--secondary mx-2">
                    <strong>마감일 :</strong> {{ assignment.assignmentDueDate }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content color="grey lighten-4">
              <v-row>
                <v-col cols="12" class="caption">
                  등록일 : {{ assignment.assignmentUpdateDate }}
                </v-col>

                <v-col cols="12">
                  {{ assignment.assignmentDetail }}
                </v-col>

                <v-col cols="12" class="d-flex justify-end">
                  <!-- 학생용 과제 제출 및 확인 버튼 -->
                  <v-btn
                    v-if="assignment.submitted == true && userData.isStudent"
                    @click="$router.push({ name: 'AssignmentSubmitDetail' })"
                    outlined
                    >제출 내용 확인
                  </v-btn>

                  <v-btn
                    v-if="assignment.submitted == false && userData.isStudent"
                    @click="$router.push({ name: 'AssignmentSubmit' })"
                    outlined
                    >과제 제출
                  </v-btn>

                  <!-- 교사용 제출물 확인 및 삭제 버튼 -->
                  <v-btn
                    v-if="!userData.isStudent"
                    class="mx-2"
                    outlined
                    @click="$router.push({ name: 'AssignmnetSubmitCheck' })"
                  >
                    제출자 확인
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
  data: () => ({
    show: false,

  }),
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    },
    assignmentList() {
      return this.$store.getters["assignment/assignmentList"];
    }
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
.card-text-title {
  font-size: 20px;
  margin-bottom: 0px;
}
</style>
