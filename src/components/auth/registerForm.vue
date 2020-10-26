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
              :rules="[required('비밀번호'), hasKorean()]"
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

            <v-text-field
              class="registerForm"
              v-model="birthday"
              type="date"
              label="Date of Birth"
              prepend-icon="mdi-calendar"
              :rules="[isValidUser()]"
            >
            </v-text-field>

            <v-select
              class="registerForm"
              v-model="school"
              :items="schoolList"
              label="School"
              prepend-icon="mdi-school"
              :rules="[required('학교 정보')]"
            ></v-select>

            <v-file-input
              class="registerForm"
              v-model="photoFile"
              accept="image/png, image/jpeg, image/bmp"
              label="공무원증 후면 사본을 업로드해주세요."
              v-if="userAuthority === 'isTeacher'"
              show-size
              counter
              :rules="[isTooBig()]"
            >
            </v-file-input>

            <v-radio-group row v-model="userAuthority" :mandatory="false">
              <template v-slot:label>
                <div><strong> 사용자 권한 </strong>을 설정하세요!</div>
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

            <v-tooltip left>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="accent"
                  v-on="on"
                  v-bind="attrs"
                  :disabled="!valid"
                  block
                >
                  회원가입
                </v-btn>
              </template>
              <span>모든 항목을 입력하면 활성화됩니다.</span>
            </v-tooltip>
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
    passwordShow: false,
    confirmShow: false,
    valid: false,
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
    photoFile: null,

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
    },
    // 사진 업로드 용량을 제한하기 위한 검사.
    isTooBig() {
      return value =>
        !value || value.size < 5000000 || "사진 용량은 5MB를 넘을 수 없습니다.";
    }
  })
};
</script>

<style scoped>
.registerForm {
  margin: 5px 0px;
  padding: 2px;
}
</style>
