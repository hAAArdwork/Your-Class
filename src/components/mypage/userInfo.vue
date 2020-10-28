<template>
  <!-- 반응형 UI 설정 -->
  <v-card
    class="mx-auto rounded-lg"
    min-width="315px"
    max-width="450px"
    width="50vw"
  >
    <v-card-title>
      <span class="text-h5 font-weight-medium">마이페이지</span>
    </v-card-title>

    <v-divider />

    <v-card-text>
      <p class="text-h6 font-weight-bold">회원 정보</p>
      <p>example@dongguk.edu</p>
      <p>김철수 (1999/12/20)</p>
      <p>서라벌고등학교</p>

      <p class="text-h6 font-weight-bold">회원 정보 수정</p>
      <p>비밀번호 변경</p>
      <p>프로필 사진 변경</p>
    </v-card-text>

    <v-card-actions>
      <v-btn block>돌아가기</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
