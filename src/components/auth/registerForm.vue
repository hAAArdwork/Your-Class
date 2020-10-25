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
            >
            </v-text-field>
            <v-text-field
              class="registerForm"
              v-model="name"
              label="Name"
              prepend-icon="mdi-account"
            >
            </v-text-field>
            <v-text-field
              class="registerForm"
              v-model="birthday"
              type="date"
              label="Date of Birth"
              prepend-icon="mdi-calendar"
            >
            </v-text-field>
            <v-select
              class="registerForm"
              :items="schools"
              label="School"
              prepend-icon="mdi-school"
            ></v-select>

            <v-radio-group row v-model="authority" :mandatory="false">
              <template v-slot:label>
                <div>
                  <strong class="primary--text">사용자 권한</strong>을
                  설정하세요!
                </div>
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

            <v-file-input
              class="registerForm"
              label="공무원증 후면을 촬영 후, 업로드해주세요."
              v-if="authority === 'isTeacher'"
              v-model="photoFile"
              show-size
              counter
            >
            </v-file-input>
            <v-btn block color="accent" class="mt-5">
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
    // 회원가입 정보 바인딩
    passwordShow: false,
    confirmShow: false,
    valid: false,
    email: "",
    password: "",
    passwordConfirm: "",
    name: "",
    birthday: "",
    schools: ["서라벌고등학교", "운정고등학교", "테스트고등학교"],
    authority: "isStudent",
    photoFile: null,

    // 유효성 검사 규칙들
    required(propertyType) {
      return value => !!value || `${propertyType}를 입력해주세요.`;
    },
    isEmail(propertyType) {
      const emailRegEx = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
      return value =>
        emailRegEx.test(value) || `${propertyType} 형식이 올바르지 않습니다.`;
    },
    hasKorean() {
      const koreanRegEx = /[ㄱ-ㅎ|ㅏ-ㅓ|가-힣]/;
      return value => !koreanRegEx.test(value) || "앗! 한/영키를 확인해주세요.";
    }
  })
};
</script>

<style scoped>
.registerForm {
  margin: 2px;
  padding: 2px;
}
</style>
