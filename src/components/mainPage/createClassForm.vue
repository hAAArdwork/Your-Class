<template>
  <v-card>
    <v-card-title>
      <span class="headline">신규 과목 개설</span>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text v-if="$vuetify.breakpoint.name === 'xs'">
      <!-- 모바일 기기인 경우, 관리자 페이지 렌더링 중지 -->
      <v-row>
        <v-col cols="12" class="text-center">
          <v-icon large color="error" class="ma-2">mdi-cancel</v-icon>

          <v-spacer></v-spacer>

          <span>
            모바일 기기에선 사용할 수 없는 기능입니다.
          </span>
        </v-col>
      </v-row>
    </v-card-text>

    <v-card-text v-else>
      <v-container>
        <v-form v-model="valid">
          <v-row>
            <v-col cols="12">
              <v-text-field
                label="과목명"
                v-model="classTitle"
                :rules="[rules.required()]"
              ></v-text-field>
            </v-col>

            <v-col cols="12" sm="6">
              <v-select
                v-model="classGrade"
                :items="grades"
                label="담당 학년"
                :rules="[rules.required()]"
              ></v-select>
            </v-col>

            <v-col cols="12" sm="6">
              <v-text-field
                v-model="classNumber"
                suffix="반"
                label="담당 학급"
                hint="담당 학급(숫자)을 입력하세요."
                persistent-hint
                :rules="[rules.required(), rules.isNumeric()]"
              ></v-text-field>
            </v-col>

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
        </v-form>

        <small>
          * 강의일, 강의시간은 순서대로 조합되어 최종적으로 반영됩니다.
        </small>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="blue darken-1" text @click="closeDialog">
        취소
      </v-btn>
      <v-btn color="blue darken-1" text :disabled="!valid" @click="createClass">
        과목 등록
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      valid: false,

      classTitle: null,
      classGrade: null,
      classNumber: null,
      classTimeTable: new Array(),

      grades: ["1학년", "2학년", "3학년"],
      days: ["월요일", "화요일", "수요일", "목요일", "금요일"],
      times: ["1교시", "2교시", "3교시", "4교시", "5교시", "6교시", "7교시"],

      rules: {
        required() {
          return value => !!value || "필수 항목입니다.";
        },
        // 두자리 숫자임을 검사하는 정규식 Rule
        isNumeric() {
          const numberRegEx = /^[0-9]{1,2}$/;

          return value =>
            numberRegEx.test(value) || "1~2자리의 숫자만 허용됩니다.";
        }
      }
    };
  },
  methods: {
    closeDialog() {
      // 부모 컴포넌트로 이벤트 Emit
      this.$emit("closeDialog");
    },
    createClass() {
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

      const formData = {
        title: this.classTitle,
        timeTable: timeTable,
        grade: this.classGrade,
        classNumber: this.classNumber
      };

      console.log(formData);

      // Form Input 초기화
      this.classTitle = null;
      this.classGrade = null;
      this.classNumber = null;
      this.classTimeTable = new Array();

      this.closeDialog();
    }
  }
};
</script>

<style></style>
