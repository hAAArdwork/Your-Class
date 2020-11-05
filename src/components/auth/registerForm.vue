<template>
  <!-- 반응형 UI 설정 -->
  <v-card
    class="mx-auto rounded-lg"
    min-width="315px"
    max-width="500px"
    width="50vw"
  >
    <v-card-title>
      <span class="text-h5 font-weight-medium">회원가입</span>
      <v-spacer></v-spacer>
    </v-card-title>

    <v-divider></v-divider>

    <v-card-text>
      <v-form v-model="valid">
        <v-row class="d-flex justify-center">
          <v-col cols="10" class="px-0">
            <v-text-field
              class="registerForm"
              label="Email"
              v-model="email"
              prepend-icon="mdi-at"
              hint="이메일 인증을 위해 정확한 정보를 입력해주새요."
              :rules="[isEmail('이메일')]"
            >
            </v-text-field>

            <v-text-field
              class="registerForm"
              v-model="password"
              label="Password"
              prepend-icon="mdi-lock"
              :append-icon="passwordShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="passwordShow ? 'text' : 'password'"
              @click:append="passwordShow = !passwordShow"
              :rules="[required('비밀번호'), isLongEnough(), hasKorean()]"
              counter
            >
            </v-text-field>

            <v-text-field
              class="registerForm"
              v-model="passwordConfirm"
              label="Password Confirm"
              prepend-icon="mdi-lock"
              :append-icon="confirmShow ? 'mdi-eye' : 'mdi-eye-off'"
              :type="confirmShow ? 'text' : 'password'"
              @click:append="confirmShow = !confirmShow"
              :rules="[isIdentical(), hasKorean()]"
              counter
            >
            </v-text-field>

            <v-text-field
              class="registerForm"
              v-model="name"
              label="Name"
              prepend-icon="mdi-account"
              :rules="[required('이름'), hasEnglish()]"
            >
            </v-text-field>

            <!-- 생년월일 Date Picker -->
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="275px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  class="registerForm"
                  v-model="birthday"
                  label="Birthday date"
                  prepend-icon="mdi-calendar"
                  v-bind="attrs"
                  v-on="on"
                  :rules="[isValidUser()]"
                  readonly
                ></v-text-field>
              </template>

              <v-date-picker
                ref="picker"
                v-model="birthday"
                color="accent"
                :max="new Date().toISOString().substr(0, 10)"
                min="1935-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>

            <v-select
              class="registerForm"
              v-model="school"
              :items="schoolList"
              label="School"
              prepend-icon="mdi-school"
              :rules="[required('학교 정보')]"
            ></v-select>

            <v-radio-group row v-model="userAuthority" :mandatory="false">
              <template v-slot:label>
                <div>{{ userAuthoritySelectionText }}</div>
              </template>

              <v-radio
                class="mx-auto"
                label="학생"
                color="success"
                value="isStudent"
              ></v-radio>

              <v-radio
                class="mx-auto"
                label="교사"
                color="error"
                value="isTeacher"
              ></v-radio>
            </v-radio-group>

            <v-btn
              color="accent"
              block
              :disabled="!valid"
              :loading="isLoading"
              @click="register"
            >
              회원가입
            </v-btn>
          </v-col>

          <v-col cols="10" class="text-center">
            <span class="text-secondary">
              이미 회원이신가요?
            </span>

            <router-link :to="{ name: 'Login' }">
              로그인 하러가기
            </router-link>
          </v-col>
        </v-row>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    // Form 컨트롤 데이터
    valid: false,
    passwordShow: false,
    confirmShow: false,
    menu: false,

    schoolList: ["서라벌고등학교", "운정고등학교", "테스트고등학교"],

    /*
     * 유저 입력 정보 바인딩
     */
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birthday: "",
    school: "",
    userAuthority: "isStudent",
    // photoFile: null,

    /*
     * 유효성 검사(Validation) 관련 내용.
     */
    required(propertyType) {
      return value => !!value || `${propertyType}를 입력해주세요.`;
    },
    // 입력된 이메일 정보가 정규식에 일치하는지 검사.
    isEmail(propertyType) {
      const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return value =>
        emailRegEx.test(value) || `${propertyType} 형식이 올바르지 않습니다.`;
    },
    // 비밀번호 입력 시, 한글이 입력되는 것을 방지하기 위한 검사.
    hasKorean() {
      const koreanRegEx = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
      return value => !koreanRegEx.test(value) || "앗! 한/영키를 확인해주세요.";
    },
    // 이름 입력 시, 영어 및 특수문자가 포함되는 것을 방지하기 위한 검사.
    hasEnglish() {
      const englishRegEx = /[a-z|A-Z|0-9|\s|!@#$%^&*()-_=+{}<>,./?`~|\s]/gi;
      return value =>
        !englishRegEx.test(value) ||
        "이름에 영어, 특수문자가 포함될 수 없습니다.";
    },
    // 비밀번호가 8자리 이상인지 검사.
    isLongEnough() {
      return value =>
        value.length >= 8 || `비밀번호는 8자리 이상이어야 합니다.`;
    },
    // 비밀번호 확인이 정상적으로 되었는지 검사.
    isIdentical() {
      return value =>
        value === this.password || `비밀번호가 일치하지 않습니다.`;
    },
    // 만 7세 미만, 만 135세 이상은 가입할 수 없도록 검사.
    isValidUser() {
      let maximum = new Date();
      maximum = new Date(maximum.setFullYear(maximum.getFullYear() - 135));
      let minimum = new Date();
      minimum = new Date(minimum.setFullYear(minimum.getFullYear() - 7));

      return value =>
        (minimum > new Date(value) && maximum < new Date(value)) ||
        `미취학 아동 및 역사인물은 가입할 수 없습니다.`;
    }
  }),
  computed: {
    userAuthoritySelectionText() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "사용자 권한";
        case "sm":
          return "사용자 권한 선택";
        default:
          return "사용자 권한을 선택하세요.";
      }
    },
    isLoading() {
      return this.$store.getters["auth/isLoading"];
    }
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    }
  },
  methods: {
    // Date Picker에서 선택된 값을 저장한다.
    save(date) {
      this.$refs.menu.save(date);
    },
    // 회원가입을 위한 Axios 통신을 실시한다.
    register() {
      // 로딩 Flag를 True로 설정한다.
      this.isLoading = true;

      // 입력받은 Form Data를 Object 형태로 만든다.
      const registerFormData = {
        email: this.email,
        password: this.password,
        password_confirm: this.passwordConfirm,
        name: this.name,
        birthday: this.birthday,
        school: this.school,
        is_student: this.userAuthority == "isStudent" ? true : false
      };

      // Vuex Actions 중, register를 호출한다.
      this.$store.dispatch("auth/register", registerFormData);
    }
  }
};
</script>

<style scoped>
.registerForm {
  margin: 5px 0px;
  padding: 2px;
}
</style>
