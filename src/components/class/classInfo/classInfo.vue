<template>
  <!-- {{ $route.params.classId }} 를 통해 URI에서 라우트 매개변수를 가져올 수 있다. -->
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" fill-height fluid>
    <v-row style="height: 100%;" justify="start">
      <!-- 과목에 대한 간략한 정보 렌더링 -->
      <v-col cols="12">
        <p class="class-info text-h4">
          {{ classInfo.title }}
        </p>
      </v-col>

      <v-col cols="12" class="py-0">
        <p class="class-info text-h6">{{ classInfo.instructor }} 선생님</p>
      </v-col>

      <v-col cols="12" class="py-0">
        <p class="text-subtitle-1">
          {{ classInfo.timeTable }}
        </p>
      </v-col>

      <v-col cols="12">
        <p class="class-info text-h4">최근 게시물</p>
      </v-col>

      <!-- 과목과 관련된 3개의 최신 게시물 렌더링 -->
      <v-col
        cols="12"
        sm="4"
        v-for="data in recentPosts"
        :key="`Post ${data.id}`"
      >
        <v-card rounded="xl" class="pa-2">
          <v-card-title class="py-2">
            <!-- 게시글 제목이 긴 경우, ...로 잘라서 렌더링한다. -->
            <div class="mx-auto font-weight-bold text-truncate">
              {{ data.title }}
            </div>
          </v-card-title>

          <v-divider />

          <v-card-subtitle class="text-center">
            <span class="d-block">{{ data.author }}</span>
            <span>{{ data.dateCreated }}</span>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn class="mx-auto accent" width="100px" height="25px" rounded>
              <span class="font-weight-bold">상세보기</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" class="mt-6">
        <span class="text-h4 font-weight-bold">마감 임박 과제물</span>
      </v-col>

      <!-- 마감 기한이 임박한 과제물 3개 또는 4개 렌더링 -->
      <v-col
        cols="12"
        sm="6"
        md="4"
        v-for="item of activeAssignments"
        :key="item.id"
      >
        <v-card rounded="xl" width="100%">
          <v-card-title>
            <div class="font-weight-bold text-truncate">
              {{ item.assignmentName }}
            </div>

            <v-spacer></v-spacer>

            <v-chip
              small
              class="font-weight-bold"
              :color="getDueDate(item.assignmentDueDate) < 3 ? 'error' : ''"
            >
              {{ getDueDate(item.assignmentDueDate) }}일
            </v-chip>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: [
    "classId" // classData: Object
  ],

  beforeCreate() {
    this.$axios
      .get(`assignment/list/${this.$route.params.classId}`)
      .then(({ data }) => {
        const now = new Date();
        let activeAssignments = new Array();

        for (let item of data) {
          // 과제 마감일이 현재보다 미래인 과제에 대해서,
          if (now < new Date(item.assignmentDueDate)) {
            item.assignmentDueDate = new Date(item.assignmentDueDate);
            activeAssignments.push(item);
          }
        }

        // 배열의 길이가 2보다 작은 경우, sort() 함수 사용 불가.
        if (activeAssignments.length > 1) {
          // Object 배열 정렬 (기준 - assignmentDueDate)
          activeAssignments.sort((itemA, itemB) => {
            // itemA(prev)와 itemB(next)의 값을 비교한다.
            return itemA.assignmentDueDate - itemB.assignmentDueDate > 0
              ? 1
              : itemA.assignmentDueDate - itemB.assignmentDueDate < 0
              ? -1
              : 0;
          });
        }

        this.assignments = activeAssignments;
      });
  },

  computed: {
    // Display Breakpoint 값에 따라 3개 또는 4개의 배열 항목만 반환한다.
    activeAssignments() {
      switch (this.$vuetify.breakpoint.name) {
        case "sm":
          return this.assignments.slice(0, 4);
        default:
          return this.assignments.slice(0, 3);
      }
    },
    classInfo() {
      return this.$store.getters["classes/classDetail"];
    }
  },

  data: () => ({
    recentPosts: [
      {
        id: 0,
        title: "1장 과제에 대한 질문",
        author: "김진형",
        dateCreated: "2020/10/31"
      },
      {
        id: 1,
        title: "2장 과제에 대한 질문",
        author: "양준영",
        dateCreated: "2020/10/27"
      },
      {
        id: 2,
        title: "강좌 공지사항입니다.",
        author: "이정우 선생님",
        dateCreated: "2020/10/26"
      }
    ],
    assignments: []
  }),
  methods: {
    getDueDate(dueDate) {
      // 오늘과 마감일을 각각 millisecond 단위로 변환한다.
      const today = new Date().getTime();
      const due = new Date(dueDate).getTime();

      const distance = due - today;
      // 두 시간의 차이는 마감일까지 남은 시간을 millisecond 단위로 나타낸것이다.
      // 즉, 1000 * 60 * 60 * 24로 나누면 '일' 단위로 변환할 수 있다.
      const result = Math.floor(distance / (1000 * 60 * 60 * 24));

      return result;
    }
  }
};
</script>

<style scoped>
.class-info {
  margin-bottom: 0px;
  font-weight: 600;
}

.card-text-title {
  font-size: 20px;
  margin-bottom: 0px;
}
</style>
