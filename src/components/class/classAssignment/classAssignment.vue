<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" fluid>
     <v-row justify="start">
      <v-col cols="10">
        <p class="class-info text-h4  font-weight-bold">
          과제
        </p>
        <p class="text-h6 hidden-xs-only mb-0">
         
      </p>
      </v-col>

      <v-col cols="2">
      <v-btn 
      v-if="!userData.isStudent"
      class="mx-10 my-10"
      color="accent"
      @click="$router.push({ assignmentName: 'classAssignmentWrite' })"
      >
      과제 등록
      </v-btn>
      </v-col>

     </v-row>


    <v-row justify="center">
      <v-expansion-panels>
        <v-expansion-panel
        v-for="(item, assignmentId) in assignment"
        :key="assignmentId"
        >
        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="9" class="body-1"> {{ item.assignmentName }} </v-col>
            <v-col cols="1">
              <v-icon v-if="item.submitted==false && userData.isStudent" x-small> 미제출 </v-icon>
            </v-col>
            <v-col cols="2" class="text--secondary body-1"> ~ {{ item.assignmentDueDate}}</v-col>
          </v-row> 
        </v-expansion-panel-header>
            <v-expansion-panel-content>
              <v-col class="caption"> 등록일 : {{ item.assignmentUpdateDate }}</v-col>
              <v-divider></v-divider>
              <v-col class="mt-6">
                {{ item.assignmentDetail }}

                <div class="text-right mt-5">

                <v-btn
                v-if="item.submitted==true && userData.isStudent"
                class="ma-2"
                color="accent"
                @click="$router.push({ name: 'AssignmentSubmitDetail' })"
                >제출 확인
                </v-btn>

                <v-btn
                v-if="item.submitted==false && userData.isStudent"
                class="ma-2"
                color="accent"
                @click="$router.push({ name: 'AssignmentSubmit' })"
                >제출하기
                </v-btn>

                <!-- 교사용 과제 확인, 삭제 버튼 -->
                <v-btn
                class="ma-2"
                color="accent"
                v-if="!userData.isStudent"
                @click="$router.push({ name: 'AssignmnetSubmitCheck' })">
                제출자 확인
                </v-btn>
                <v-btn 
                class="red lighten-2 white--text ma-2" 
                @click="deleteAssignment(item)"
                v-if="!userData.isStudent"
                >
                <v-icon left> mdi-delete</v-icon>
                삭제하기
                </v-btn>
                </div>

              </v-col>
            </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

    </v-row>


  </v-container>
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
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent",
      },
      {
        assignmentId: 2,
        assignmentName: "4장 실습문제",
        assignmentUpdateDate: "2020-09-27 16:44",
        assignmentDueDate: "2020-10-12 23:59",
        submitted: true,
        assignmentDetail:
          "Program Assignment #4 제출해주십시오.",
      },
      {
        assignmentId: 3,
        assignmentName: "5장 연습문제",
        assignmentUpdateDate: "2020-10-25 16:44",
        assignmentDueDate: "2020-10-30 23:59",
        submitted: false,
        assignmentDetail:
          "5장 연습문제 과제는 pdf로 제출하세요",
      },
      {
        assignmentId: 4,
        assignmentName: "5장 실습문제",
        assignmentUpdateDate: "2020-10-20 16:44",
        assignmentDueDate: "2020-11-02 23:59",
        submitted: true,
        assignmentDetail:
          "5장 실습문제"
      },
      {
        assignmentId: 5,
        assignmentName: "6장 연습문제",
        assignmentUpdateDate: "2020-10-27 16:44",
        assignmentDueDate: "2020-11-07 23:59",
        submitted: true,
        assignmentDetail:"6장 연습문제"    
      },
      {
        assignmentId: 6,
        assignmentName: "7장 연습문제",
        assignmentUpdateDate: "2020-11.01-27 16:44",
        assignmentDueDate: "2020-11-09 23:59",
        submitted: false,
        assignmentDetail: ""
         
      },
    ]
  }),
    computed: {
    userData() {
      return this.$store.getters["user/userData"];
    },
    },
  methods: {
    
    deleteAssignment(){
      confirm("정말 삭제하겠습니까?")
    }
  }
};
</script>
