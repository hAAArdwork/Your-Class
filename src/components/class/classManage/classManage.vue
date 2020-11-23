<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" fill-height fluid>
    <v-row style="height: 100%;">
      <v-col cols="6">
        <p class="class-info text-h4">
          {{ classInfo.title }}
        </p>
      </v-col>

      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="error" outlined>
          <strong>과목 삭제</strong>
        </v-btn>
      </v-col>

      <v-col cols="12" class="py-0">
        <p class="class-info text-h6">
          {{ classInfo.teacher }}
        </p>
      </v-col>

      <v-col cols="8" sm="6" lg="5" class="py-0 d-flex align-center">
        <span class="text-subtitle-1">
          {{ classInfo.time }}
        </span>
      </v-col>

      <v-col cols="4" sm="6" lg="7" class="py-0 d-flex align-center">
        <v-btn color="cyan" width="80px" height="25px" rounded outlined>
          시간 변경
        </v-btn>
      </v-col>

      <v-col cols="8" sm="6" lg="5" class="py-0 d-flex align-center">
        <span>과목 코드 : {{ classInfo.code }}</span>
      </v-col>

      <v-col cols="4" sm="6" lg="7" class="py-0 d-flex align-center">
        <v-btn color="cyan" width="80px" height="25px" rounded outlined>
          코드 갱신
        </v-btn>
      </v-col>

      <v-col cols="12" sm="6">
        <p class="class-info text-h4 my-4">수강생 목록</p>

        <v-card rounded="lg" height="40vh" class="overflow-y-auto">
          <v-card-text
            class="d-flex justify-space-between pa-2 align-center"
            v-for="stu in studentList"
            :key="stu.mail"
          >
            <span>{{ stu.name }} ( {{ stu.mail }} )</span>
            <v-btn color="error" width="40px" height="25px" rounded>
              삭제
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="12" sm="6">
        <p class="class-info text-h4 my-4">등록 대기자 목록</p>

        <v-card rounded="lg" height="40vh" class="overflow-y-auto">
          <v-card-text
            class="d-flex justify-space-between pl-2 py-0 align-center"
            v-for="prestu in preStudentList"
            :key="prestu.name"
          >
            <div>{{ prestu.name }} ( {{ prestu.mail }} )</div>
            <v-card-actions>
              <v-btn
                color="teal lighten-1 white--text"
                width="40px"
                height="25px"
                rounded
              >
                수락
              </v-btn>
              <v-btn color="error" width="40px" height="25px" rounded>
                거절
              </v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  computed: {
    classTime() {
      let array = this.classInfo.time.split(",");

      return array;
    }
  },
  data: () => ({
    classInfo: {
      title: "물리",
      teacher: "이정우 선생님",
      time: "화요일 1교시, 수요일 3교시, 목요일 2교시, 금요일 7교시",
      code: "dkssud32Wmt"
    },
    studentList: [
      {
        name: "이정우",
        mail: "dwd4791@gmail.com"
      },
      {
        name: "김정우",
        mail: "dwd4792@gmail.com"
      },
      {
        name: "정우",
        mail: "dwd4793@gmail.com"
      },
      {
        name: "우정",
        mail: "dwd4794@gmail.com"
      },
      {
        name: "정정김우",
        mail: "dwd4795@gmail.com"
      }
    ],
    preStudentList: [
      {
        name: "정우",
        mail: "dwd4796@gmail.com"
      },
      {
        name: "우정",
        mail: "dwd4797@gmail.com"
      },
      {
        name: "정정정우",
        mail: "dwd4798@gmail.com"
      },
      {
        name: "정정우",
        mail: "dwd4799@gmail.com"
      }
    ]
  })
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
