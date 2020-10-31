<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16">
    <v-row>
      <v-col cols="12" class="mb-6">
        <p class="text-h4 font-weight-bold">{{ classInfo.title }}</p>
        <p class="class-info text-h6 font-weight-bold">
          {{ classInfo.teacher }}
        </p>
        <p class="class-info text-subtitle-1">
          {{ classInfo.time }}
        </p>
      </v-col>

      <v-col cols="12">
        <span class="text-h4 font-weight-bold">최근 게시물</span>
      </v-col>

      <v-col
        cols="12"
        sm="4"
        v-for="data in recentPosts"
        :key="`Post ${data.id}`"
      >
        <v-card rounded="xl" class="pa-2">
          <v-card-title class="py-1">
            <div class="mx-auto font-weight-bold">{{ data.title }}</div>
          </v-card-title>

          <v-divider></v-divider>

          <v-card-subtitle class="text-center">
            <span class="d-block">{{ data.author }}</span>
            <span>{{ data.dateCreated }}</span>
          </v-card-subtitle>

          <v-card-actions>
            <v-btn class="mx-auto accent" width="100px" height="25px" rounded>
              <span>상세보기</span>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" class="mt-6">
        <span class="text-h4 font-weight-bold">마감 임박 과제물</span>
      </v-col>

      <v-col
        cols="12"
        sm="4"
        v-for="data in assignments"
        :key="`Assignment ${data.id}`"
      >
        <v-card rounded="xl" class="pa-2">
          <v-card-title class="py-1">
            <div class="font-weight-bold">{{ data.title }}</div>
            <v-spacer />
            <div class="font-weight-bold">
              {{
                getDueDate(data.dueDate) > 0
                  ? getDueDate(data.dueDate)
                  : "기한종료"
              }}
            </div>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    today: function() {
      return new Date();
    }
  },
  data: () => ({
    classInfo: {
      title: "물리",
      teacher: "이정우 선생님",
      time: "화요일 1교시, 수요일 3교시, 목요일 2교시, 금요일 7교시"
    },
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
    assignments: [
      {
        id: 0,
        title: "2장 연습문제 풀이",
        author: "이정우 선생님",
        dueDate: "2020/11/10"
      },
      {
        id: 1,
        title: "1장 연습문제 풀이",
        author: "이정우 선생님",
        dueDate: "2020/10/29"
      }
    ]
  }),
  methods: {
    getDueDate(dueDate) {
      const today = new Date().getTime();
      const due = new Date(dueDate).getTime();

      const distance = due - today;
      const result = Math.floor(distance / (1000 * 60 * 60 * 24));

      return result;
    }
  }
};
</script>

<style scoped>
.class-info {
  margin-bottom: 0px;
}

.card-text-title {
  font-size: 20px;
  margin-bottom: 0px;
}
</style>
