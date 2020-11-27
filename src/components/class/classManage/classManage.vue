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
            <v-btn
              color="error"
              text
              @click="doubleCheckDialog = !doubleCheckDialog"
            >
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 2차 삭제 확인 Dialog -->
      <v-dialog v-model="doubleCheckDialog" max-width="450px">
        <v-card>
          <v-card-title class="red--text font-weight-bold">
            과목을 영구히 삭제합니다
          </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" text @click="closeAll">
              취소
            </v-btn>
            <v-btn color="error" text @click="deleteClass">
              삭제하기
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-col cols="12" class="py-0">
        <p class="class-info text-h6">{{ classInfo.instructor }} 선생님</p>
      </v-col>

      <!-- 과목 관련 정보 수정 항목 (과목 시간표) -->
      <v-col cols="12" class="py-0 d-flex align-center">
        <span> <strong>수업 시간 :</strong> {{ classInfo.timeTable }} </span>

        <v-btn
          class="mx-2"
          color="cyan"
          small
          outlined
          @click="timeChangeDialog = true"
        >
          <strong>시간 변경</strong>
        </v-btn>
      </v-col>

      <!-- 시간표 수정 Dialog -->
      <v-dialog v-model="timeChangeDialog" max-width="550px">
        <v-card>
          <v-card-title>
            과목 시간표 변경
          </v-card-title>

          <v-card-text>
            <v-row>
              <v-col v-for="index in 5" :key="index">
                <v-select
                  placeholder="없음"
                  v-model="classTimeTable[index - 1]"
                  :label="days[index - 1]"
                  :items="times"
                  :menu-props="{ top: true, offsetY: true, maxHeight: 355 }"
                ></v-select>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="timeChangeDialog = false" text>
              취소
            </v-btn>
            <v-btn color="error" @click="updateTimeTable" text>
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 과목 관련 정보 수정 항목 (과목코드) -->
      <v-col cols="12" class="py-0 d-flex align-center">
        <span>
          <strong>초대 코드 :</strong> {{ classInfo.invitationCode }}
        </span>

        <v-btn
          class="mx-2"
          color="cyan"
          small
          outlined
          @click="refreshDialog = true"
        >
          <strong>코드 갱신</strong>
        </v-btn>
      </v-col>

      <!-- 코드 갱신 확인 Dialog -->
      <v-dialog v-model="refreshDialog" max-width="350px">
        <v-card>
          <v-card-title>
            초대 코드를 재발급 하시겠습니까?
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" @click="refreshDialog = false" text>
              취소
            </v-btn>
            <v-btn color="error" @click="refreshCode" text>
              확인
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <!-- 승인 대기, 수강 학생 리스트 렌더링 컴포넌트 -->
      <v-col cols="12">
        <list-coponent
          :studentList="studentList"
          @onRemove="removeFromStudentList"
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
  beforeCreate() {
    this.$store.dispatch(
      "classes/retrieveStudentList",
      this.$route.params.classId
    );
  },
  computed: {
    classInfo() {
      return this.$store.getters["classes/classDetail"];
    },
    studentList() {
      return this.$store.getters["classes/studentList"];
    }
  },
  data: () => ({
    // 시간표 변경 관련 Flag
    isEditing: false,

    // 과목 삭제 관련 Flags
    checkDialog: false,
    doubleCheckDialog: false,

    // 초대 코드 재발급 Flag
    refreshDialog: false,

    // 시간표 변경 Flag
    timeChangeDialog: false,

    classTimeTable: new Array(),

    // 시간표 관련 Form Data
    days: ["월요일", "화요일", "수요일", "목요일", "금요일"],
    times: ["1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"]
  }),
  methods: {
    // 대기자 항목에서 동일한 이메일을 가진 학생을 찾아 반환한다.
    findUser(id, list) {
      let index = 0;

      for (let student of list) {
        if (id == student.id) {
          break;
        }
        index++;
      }

      return index;
    },
    removeFromStudentList(id) {
      const targetIndex = this.findUser(id, this.studentList);

      let payload = {
        studentId: id,
        classId: this.$route.params.classId
      };

      alert(
        `${this.studentList[targetIndex].name} 학생을 수강 목록에서 제외하겠습니까?`
      );

      // 대기자 항목에서 해당 학생 제거.
      this.studentList.splice(targetIndex, 1);

      // TODO: axios 요청을 통해 실제 DB에서 제거.
      this.$store.dispatch("classes/removeStudent", payload);
    },

    // Vuex로 초대 코드 재발급 요청을 전달하고 Dialog를 닫는다.
    refreshCode() {
      this.$store.dispatch(
        "classes/refreshInvitationCode",
        this.$route.params.classId
      );

      this.refreshDialog = false;
    },

    // Vuex로 과목 시간표 변경 요청을 전달하고 Dialog를 닫는다.
    updateTimeTable() {
      let timeTable = new Array();

      // Server로 전송하기 위해 Data Parsing
      for (let index in this.classTimeTable) {
        const time = this.classTimeTable[index];

        if (time === "") {
          continue;
        } else {
          timeTable.push(this.days[index] + " " + time);
        }
      }

      // JSON 객체 생성
      const payload = {
        classId: this.$route.params.classId,
        timeTable: timeTable.join(",")
      };

      this.$store.dispatch("classes/updateTimeTable", payload);

      this.timeChangeDialog = false;
    },

    // Vuex로 과목 삭제 요청을 전달한다.
    deleteClass() {
      this.$store.dispatch("classes/deleteClass", this.$route.params.classId);
    },

    // 모든 Dialog 창을 닫는다.
    closeAll() {
      this.checkDialog = false;
      this.doubleCheckDialog = false;
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
