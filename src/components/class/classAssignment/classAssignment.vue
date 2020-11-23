<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" >
      <v-toolbar elevation="0">
         <v-spacer></v-spacer>
        <v-toolbar-items>
        <v-btn color="accent" fab small icon @click="$router.push({name: 'classAssignmentWrite'})">
          <v-icon class="blue lighten-3 white--text">mdi-plus</v-icon>
        </v-btn>
        </v-toolbar-items>
      </v-toolbar>

          <v-card >
          <v-card
            class="mb-7"
            rounded="x1"
            v-for="ass in assignment"
            :key="ass.number"
          >
            <v-card-subtitle
              class="d-flex justify-space-between headline text--primary"
            >
              <div>{{ ass.name }}</div>
              <div class="red--text">
                 ~ {{ ass.enddate }}
              </div>
            </v-card-subtitle>
            <v-divider class="mx-4"></v-divider>
            <v-card-text >{{ ass.explain }} </v-card-text>

            <v-card-actions class="d-flex justify-end">
              <v-btn class="blue lighten-3 white--text" @click="$router.push({name: 'classAssignmentRegisterInfo'})">제출 확인</v-btn>
              <v-btn class="red lighten-2 white--text" >
                <v-icon left> mdi-delete</v-icon>
                삭제하기</v-btn>
            </v-card-actions>
          </v-card>
          </v-card>
   


  </v-container>





</template>
 





<script>
export default {
  data: () => ({
    assignment: [
      {
        number: 1,
        name: "4장 연습문제",
        enddate: "2020.10.01",
        explain:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent"
      },
      {
        number: 2,
        name: "5장 연습문제",
        enddate: "2020.10.12",
        explain:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent"
      },
      {
        number: 3,
        name: "6장 연습문제",
        enddate: "2020.10.30",
        explain:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent"
      },
    ]
  })

  
};
</script>

