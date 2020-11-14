<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16">
    <v-row>
      <v-card elevation="0">
        <v-col col="12">
          <v-card
            class="mb-7"
            rounded="x1"
            v-for="ass in assignment.reverse()"
            :key="ass.name"
          >
            <v-card-subtitle
              class="d-flex justify-space-between headline text--primary"
            >
              <div>{{ ass.name }}</div>
              <div class=" red--text">
                {{ ass.startdate }} ~ {{ ass.enddate }}
              </div>
            </v-card-subtitle>
            <v-divider class="mx-4"></v-divider>
            <v-card-text>{{ ass.explain }} </v-card-text>

            <v-card-actions class="d-flex justify-end">
              <v-btn class="blue lighten-3 white--text">제출 정보 보기</v-btn>
              <v-btn class="blue lighten-3 white--text">수정하기</v-btn>
              <v-btn class="red lighten-2 white--text">삭제하기</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-card>
      <v-card-actions class=" text-center ml-auto">
        <v-btn class="blue lighten-1 white--text" width="180px" height="50px">
          <h3>+ 신규 과제 등록</h3>
        </v-btn>
      </v-card-actions>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data: () => ({
    assignment: [
      {
        name: "6장 연습문제",
        startdate: "2020.10.23",
        enddate: "2020.10.30",
        explain:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent"
      },
      {
        name: "5장 연습문제",
        startdate: "2020.10.05",
        enddate: "2020.10.12",
        explain:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent"
      },
      {
        name: "4장 연습문제",
        startdate: "2020.09.20",
        enddate: "2020.10.01",
        explain:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent"
      }
    ]
  })
};
</script>

<style></style>
