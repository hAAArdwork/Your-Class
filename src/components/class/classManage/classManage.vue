<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16">
    <v-row>
      <v-col cols="10" class="mb-6">
        <p class="text-h4 font-weight-bold">{{ classInfo.title }}</p>
        <p class="class-info text-h6 font-weight-bold">
          {{ classInfo.teacher }}
        </p>
        <p class="text-subtitle-1">
          {{ classInfo.time }}
          <v-btn
            class="mx-5 cyan darken-1 white--text"
            width="90px"
            height="25px"
            rounded
          >
            시간 변경
          </v-btn>
        </p>
        <p>
          과목 코드 : {{ classInfo.code }}
          <v-btn
            class="mx-5 cyan darken-1 white--text"
            width="80px"
            height="25px"
            rounded
          >
            재발급
          </v-btn>
        </p>
      </v-col>
      <v-col class="mt-10" cols="2">
        <v-btn class="red lighten-1 white--text" elevation="10" x-large
          >과목 삭제</v-btn
        >
      </v-col>

      <v-col cols="6">
        <div class="text-h4 font-weight-bold">수강생 목록</div>

        <v-card rounded="xl">
          <v-card-text
            class="d-flex justify-space-between pa-2 align-center"
            v-for="stu in studentList"
            :key="stu.mail"
          >
            <div>{{ stu.name }} ( {{ stu.mail }} )</div>
            <v-btn color="error" width="40px" height="25px" rounded>
              삭제
            </v-btn>
          </v-card-text>
        </v-card>
      </v-col>

      <v-col cols="6">
        <div class="text-h4 font-weight-bold">등록 대기자 목록</div>

        <v-card rounded="xl">
          <v-card-text
            class="d-flex justify-space-between pl-2 py-0 align-center"
            v-for="prestu in preStudentList"
            :key="prestu.mail"
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
        name: "정정우",
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
        name: "정정우",
        mail: "dwd4798@gmail.com"
      },
      {
        name: "정정우",
        mail: "dwd4799@gmail.com"
      },
      {
        name: "정정정",
        mail: "dwd4790@gmail.com"
      }
    ]
  })
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
