<template>
  <v-card>
    <v-card-title>
      <span class="headline">수강 과목 등록</span>
    </v-card-title>

    <v-progress-linear
      :active="isLoading"
      :indeterminate="isLoading"
      color="accent"
    ></v-progress-linear>

    <v-card-text>
      <v-container>
        <v-form v-model="valid">
          <v-text-field
            v-model="invitationCode"
            label="과목 코드"
            hint="선생님께 전달받은 과목코드를 입력하세요."
            prepend-inner-icon="mdi-form-textbox-password"
            :rules="[rules.isCorrectCode()]"
            persistent-hint
            counter="16"
          >
          </v-text-field>

          <v-checkbox hide-details dense :rules="[rules.mustChecked()]">
            <template v-slot:label>
              <small>
                선생님께 직접 전달받은 코드임을 확인합니다.
              </small>
            </template>
          </v-checkbox>
        </v-form>
      </v-container>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="error" @click="closeDialog" text>
        취소
      </v-btn>
      <v-btn
        :disabled="!valid || invitationCode.length == 0 || isLoading"
        @click="searchSubject"
        text
      >
        과목 등록
      </v-btn>
    </v-card-actions>

    <v-dialog
      v-model="resultDialog"
      transition="scroll-y-reverse-transition"
      max-width="350px"
      persistent
    >
      <v-card>
        <v-card-title>
          과목 정보 확인
        </v-card-title>

        <v-card-subtitle>
          등록하려는 과목 정보를 확인해주세요
        </v-card-subtitle>

        <v-divider></v-divider>

        <v-card-text class="pb-0">
          <v-list two-line dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>과목명</v-list-item-title>

                <v-list-item-subtitle
                  >{{ searchedClass.title }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>학급 정보</v-list-item-title>

                <v-list-item-subtitle>
                  {{ searchedClass.classGrade }}학년
                  {{ searchedClass.classNumber }}반
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>교사 정보</v-list-item-title>

                <v-list-item-subtitle>
                  {{ searchedClass.instructor }} 선생님 ({{
                    searchedClass.instructorEmail
                  }})
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>시간표</v-list-item-title>

                <v-list-item-subtitle>
                  {{ searchedClass.timeTable }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn color="error" @click="resultDialog = false" text>취소</v-btn>
          <v-btn @click="confirmEnroll" text>등록하기</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
export default {
  computed: {
    searchedClass() {
      return this.$store.getters["classes/searchedClass"];
    },
    isFound() {
      return this.$store.getters["classes/isFound"];
    },
    isLoading() {
      return this.$store.getters["classes/isLoading"];
    }
  },
  data() {
    return {
      valid: false,

      // isLoading: false,

      resultDialog: false,

      invitationCode: "",

      rules: {
        required() {
          return value => !!value || "필수 항목입니다.";
        },
        // 올바른 과목 코드 양식인지 검사하는 정규식 Rule
        isCorrectCode() {
          const numberRegEx = /^[0-9A-Z]{16}$/;

          return value =>
            numberRegEx.test(value) ||
            "과목코드는 16자리 숫자, 대문자 조합입니다.";
        },
        mustChecked() {
          return value => value || "반드시 내용을 확인하고 체크해주세요.";
        }
      }
    };
  },
  methods: {
    closeDialog() {
      this.invitationCode = "";

      // 부모 컴포넌트로 이벤트 Emit
      this.$emit("closeDialog");
    },

    // 입력받은 초대 코드로 과목을 검색하기 위해 Vuex 이용.
    async searchSubject() {
      // Loading Flag Trigger
      this.$store.commit("classes/fetchLoading", true);
      // this.isLoading = true;

      this.$store.dispatch("classes/searchClass", this.invitationCode);

      // Vuex Store 업데이트를 위해 2초간 대기.
      setTimeout(() => {
        // 일치하는 과목이 발견된 경우,
        if (this.isFound) {
          // 검색된 과목 정보를 보여주는 Dialog를 활성화한다.
          this.resultDialog = true;
        }
        // 일치하는 과목이 발견되지 않은 경우,
        else {
          // 경고창 출력 후, 모든 Dialog를 닫는다.
          alert("입력하신 과목 코드에 알맞는 과목을 찾을 수 없습니다.");

          this.closeDialog();
        }

        // 최종적으로 Loading Flag를 종료한다.
        this.$store.commit("classes/fetchLoading", false);
        // this.isLoading = false;
      }, 2000);
    },

    confirmEnroll() {
      this.$store.dispatch("classes/enroll", this.invitationCode);

      this.closeDialog();
    }
  }
};
</script>

<style></style>
