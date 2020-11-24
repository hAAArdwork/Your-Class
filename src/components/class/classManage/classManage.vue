<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" fill-height fluid>
    <!-- 모바일 기기 이상의 ViewPoint에서만 관리자 페이지 렌더링 -->
    <v-row v-if="$vuetify.breakpoint.name !== 'xs'" style="height: 100%;">
      <v-col cols="6">
        <p class="class-info text-h4">
          {{ classInfo.title }}
        </p>
      </v-col>

      <v-col cols="6" class="d-flex justify-end">
        <v-btn color="error" outlined @click="checkDialog = true">
          <strong>과목 삭제</strong>
        </v-btn>
      </v-col>

      <!-- 1차 삭제 확인 Dialog -->
      <v-dialog v-model="checkDialog" max-width="500px">
        <v-card>
          <v-card-title>
            과목 삭제
          </v-card-title>
          <v-card-text>
            삭제하신 과목은 복구할 수 없습니다. 정말 삭제하길 원하십니까?
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="checkDialog = false">
              돌아가기
            </v-btn>
            <v-btn color="error" text @click="doubleDialog = !doubleDialog">
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 2차 삭제 확인 Dialog -->
      <v-dialog v-model="doubleDialog" max-width="450px">
        <v-card>
          <v-card-title class="red--text font-weight-bold">
            과목을 영구히 삭제합니다
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeAll">
              취소
            </v-btn>
            <v-btn color="error" text>
              삭제하기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="12" class="py-0">
        <p class="class-info text-h6">
          {{ classInfo.teacher }}
        </p>
      </v-col>

      <!-- 과목 관련 정보 수정 항목 (과목 시간표) -->
      <v-col cols="8" sm="6" md="5" class="py-0 d-flex align-center">
        <span> <strong>수업 시간 :</strong> {{ classInfo.time }} </span>
      </v-col>

      <v-col cols="4" sm="6" md="7" class="py-0 d-flex align-center">
        <v-btn color="cyan" small outlined>
          <strong>시간 변경</strong>
        </v-btn>
      </v-col>

      <!-- 과목 관련 정보 수정 항목 (과목코드) -->
      <v-col cols="8" sm="6" md="5" class="py-0 d-flex align-center">
        <span> <strong>초대 코드 :</strong> {{ classInfo.code }} </span>
      </v-col>

      <v-col cols="4" sm="6" md="7" class="py-0 d-flex align-center">
        <v-btn color="cyan" small outlined>
          <strong>코드 갱신</strong>
        </v-btn>
      </v-col>

      <!-- 승인 대기, 수강 학생 리스트 렌더링 컴포넌트 -->
      <v-col cols="12" sm="6">
        <list-coponent
          :studentList="studentList"
          :isWaitingList="false"
          @onRemove="removeFromStudentList"
        />
      </v-col>

      <v-col cols="12" sm="6">
        <list-coponent
          :studentList="waitingList"
          :isWaitingList="true"
          @onAccept="acceptRequest"
          @onDecline="declineRequest"
        />
      </v-col>
    </v-row>

    <!-- 모바일 기기인 경우, 관리자 페이지 렌더링 중지 -->
    <v-row v-else>
      <v-col cols="12" class="text-center">
        <v-icon x-large color="error" class="ma-2">mdi-cancel</v-icon>

        <v-spacer></v-spacer>

        <span>
          모바일 기기에선 사용할 수 없는 기능입니다.
        </span>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ListCoponent from "./studentList.vue";

export default {
  components: {
    ListCoponent
  },
  data: () => ({
    // 시간표 변경 관련 Flag
    isEditing: false,

    // 과목 삭제 관련 Flags
    checkDialog: false,
    doubleDialog: false,

    classInfo: {
      title: "물리",
      teacher: "이정우 선생님",
      time: "화 1교시, 수 3교시, 목 2교시, 금 7교시",
      code: "dkssud32Wmt"
    },
    studentList: [
      {
        id: 1,
        name: "이정우",
        mail: "dwd4791@gmail.com"
      },
      {
        id: 2,
        name: "김정우",
        mail: "dwd4792@gmail.com"
      },
      {
        id: 3,
        name: "정우",
        mail: "dwd4793@gmail.com"
      }
    ],
    waitingList: [
      {
        id: 1,
        name: "정우",
        mail: "dwd4796@gmail.com"
      },
      {
        id: 2,
        name: "우정",
        mail: "dwd4797@gmail.com"
      },
      {
        id: 3,
        name: "정정정우",
        mail: "dwd4798@gmail.com"
      },
      {
        id: 4,
        name: "정정우",
        mail: "dwd4799@gmail.com"
      }
    ]
  }),
  methods: {
    // 대기자 항목에서 동일한 이메일을 가진 학생을 찾아 반환한다.
    findUser(email, list) {
      let index = 0;

      for (let student of list) {
        if (email == student.mail) {
          break;
        }
        index++;
      }

      return index;
    },
    // 모든 Dialog 창을 닫는다.
    closeAll() {
      this.checkDialog = false;
      this.doubleDialog = false;
    },
    // 대기 학생의 요청을 수락한다.
    acceptRequest(email) {
      const targetIndex = this.findUser(email, this.waitingList);
      const targetStudent = this.waitingList[targetIndex];

      alert(`${targetStudent.name} 학생의 요청을 수락하시겠습니까?`);

      this.studentList.push(targetStudent);

      // 대기자 항목에서 해당 학상 제거.
      this.waitingList.splice(targetIndex - 1, 1);

      // TODO: axios 요청을 통해 실제 DB에서 제거.
    },
    declineRequest(email) {
      const targetIndex = this.findUser(email, this.waitingList);

      alert(
        `${this.waitingList[targetIndex].name} 학생의 요청을 거절하시겠습니까?`
      );

      // 대기자 항목에서 해당 학상 제거.
      this.waitingList.splice(targetIndex - 1, 1);

      // TODO: axios 요청을 통해 실제 DB에서 제거.
    },
    removeFromStudentList(email) {
      const targetIndex = this.findUser(email, this.studentList);

      alert(
        `${this.studentList[targetIndex].name} 학생을 수강 목록에서 제외하겠습니까?`
      );

      // 대기자 항목에서 해당 학상 제거.
      this.studentList.splice(targetIndex - 1, 1);

      // TODO: axios 요청을 통해 실제 DB에서 제거.
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
