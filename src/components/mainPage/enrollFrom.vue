<template>
  <v-card>
    <v-card-title>
      <span class="headline">수강 과목 등록</span>
    </v-card-title>

    <v-card-text>
      <v-container>
        <v-form v-model="valid">
          <v-text-field
            v-model="invitationCode"
            label="과목 코드"
            hint="선생님께 전달받은 과목코드를 입력하세요."
            prepend-inner-icon="mdi-form-textbox-password"
            :rules="[rules.isCorrectCode()]"
            :loading="loading"
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
      <v-btn color="blue darken-1" text @click="closeDialog">
        취소
      </v-btn>
      <v-btn
        color="blue darken-1"
        text
        :disabled="!valid || invitationCode.length == 0 || loading"
        @click="onSubmit"
      >
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

      loading: false,
      success: false,
      fail: false,

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
      // 부모 컴포넌트로 이벤트 Emit
      this.$emit("closeDialog");
    },
    async onSubmit() {
      console.log(this.invitationCode);

      this.loading = true;

      await setTimeout(() => {
        this.loading = false;

        this.closeDialog();
      }, 3000);
    }
  }
};
</script>

<style></style>
