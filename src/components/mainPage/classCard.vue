<template>
  <v-hover v-slot="{ hover }">
    <!-- 카드 가로축 패딩 설정 및 둥근 모서리 설정, 반응형 크기 적용 -->
    <v-card :elevation="hover ? 8 : 4" height="230px" rounded="lg">
      <!-- 카드 타이틀 영역, 요소들 가운데 정렬 -->
      <v-card-title class="pa-2">
        <div class="mx-auto">
          <span class="headline mr-2">
            {{ classData.subjectName }}
          </span>
          <span class="subtitle-1"
            >{{ classData.subjectGrade }}학년
            {{ classData.subjectClass }}반</span
          >
        </div>
      </v-card-title>

      <v-divider></v-divider>

      <!-- 과목 담당자. 과목 배정 시간 렌더링 -->
      <v-card-text class="text-center" style="height: 125px;">
        <p class="text-h6 font-weight-bold">
          {{ classInstructor.name }} 선생님
        </p>

        <v-row class="mx-auto" style="width: 75%;">
          <!-- 교시 수에 따라 다른 형태로 렌더링 되도록 설정 -->
          <v-col
            class="pa-0"
            v-for="(text, index) in classData.subjectTimeList.split(',')"
            :key="index"
            :cols="counter > 2 ? 6 : 12"
          >
            <span class="font-weight-bold">
              {{ text }}
            </span>
          </v-col>
        </v-row>
      </v-card-text>

      <!-- 강의실 입장 버튼 -->
      <v-card-actions>
        <v-btn
          :to="{
            name: 'classInfo',
            params: { classId: classData.id }
          }"
          color="accent darken-2"
          class="mx-auto"
          outlined
        >
          <strong>강의실 입장하기</strong>
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script>
export default {
  /* 중요! 화살표 함수 사용 시, THIS 바인딩 변경으로 PROPS 사용 불가!*/
  props: {
    classData: { type: Object, required: true }
  },
  data() {
    return {
      classInstructor: this.classData.subjectInstructorId
    };
  },
  computed: {
    counter() {
      return this.classData.subjectTimeList.split(",").length;
    }
  }
};
</script>

<style></style>
