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
          <v-expansion-panel v-for="(item, index) in assignment" :key="index">
            <!-- 과제물 패널 헤더 영역 -->
            <v-expansion-panel-header>
              <v-row no-gutters>
                <v-col class="flex-grow-1">
                  <strong class="mr-2" style="font-size: 18px;">
                    {{ item.assignmentName }}
                  </strong>

                  <small
                    v-if="item.submitted && userData.isStudent"
                    style="color: green;"
                  >
                    제출완료
                  </small>

                  <small
                    v-if="!item.submitted && userData.isStudent"
                    style="color: red;"
                  >
                    미제출
                  </small>
                </v-col>

                <v-col cols="4" class="text-end">
                  <span class="text--secondary mx-2">
                    <strong>마감일 :</strong> {{ item.assignmentDueDate }}
                  </span>
                </v-col>
              </v-row>
            </v-expansion-panel-header>

            <v-expansion-panel-content color="grey lighten-4">
              <v-row>
                <v-col cols="12" class="caption">
                  등록일 : {{ item.assignmentUpdateDate }}
                </v-col>

                <v-col cols="12">
                  {{ item.assignmentDetail }}
                </v-col>

                <v-col cols="12" class="d-flex justify-end">
                  <!-- 학생용 과제 제출 및 확인 버튼 -->
                  <v-btn
                    v-if="item.submitted == true && userData.isStudent"
                    @click="$router.push({ name: 'AssignmentSubmitDetail' })"
                    outlined
                    >제출 내용 확인
                  </v-btn>

                  <v-btn
                    v-if="item.submitted == false && userData.isStudent"
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
                    @click="deleteAssignment(item)"
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
  data: () => ({
    show: false,

    assignment: [
      {
        assignmentId: 1,
        assignmentName: "4장 연습문제",
        assignmentUpdateDate: "2020-09-01 10:30",
        assignmentDueDate: "2020-10-01 23:59",
        submitted: true,
        assignmentDetail:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent"
      },
      {
        assignmentId: 2,
        assignmentName: "4장 실습문제",
        assignmentUpdateDate: "2020-09-27 16:44",
        assignmentDueDate: "2020-10-12 23:59",
        submitted: true,
        assignmentDetail: "Program Assignment #4 제출해주십시오."
      },
      {
        assignmentId: 3,
        assignmentName: "5장 연습문제",
        assignmentUpdateDate: "2020-10-25 16:44",
        assignmentDueDate: "2020-10-30 23:59",
        submitted: false,
        assignmentDetail: "5장 연습문제 과제는 pdf로 제출하세요"
      },
      {
        assignmentId: 4,
        assignmentName: "5장 실습문제",
        assignmentUpdateDate: "2020-10-20 16:44",
        assignmentDueDate: "2020-11-02 23:59",
        submitted: true,
        assignmentDetail: "5장 실습문제"
      },
      {
        assignmentId: 5,
        assignmentName: "6장 연습문제",
        assignmentUpdateDate: "2020-10-27 16:44",
        assignmentDueDate: "2020-11-07 23:59",
        submitted: true,
        assignmentDetail: "6장 연습문제"
      },
      {
        assignmentId: 6,
        assignmentName: "7장 연습문제",
        assignmentUpdateDate: "2020-11.01-27 16:44",
        assignmentDueDate: "2020-11-09 23:59",
        submitted: false,
        assignmentDetail: ""
      }
    ]
  }),
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    }
  },
  methods: {
    deleteAssignment() {
      confirm("정말 삭제하겠습니까?");
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
