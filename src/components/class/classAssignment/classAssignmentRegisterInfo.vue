<template> 
  <v-container fluid>
      <v-row>
          <v-col>
      <v-card class="mx-auto" height="100%" width="90%" >
          <v-card-title>
              {{ name }} 
          </v-card-title>
          <v-card-subtitle>
              {{ startdate }} ~ {{ enddate }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
              {{ detail }}
          </v-card-text>
      </v-card>
          </v-col>
      </v-row>

      <v-row>
          <v-col>
      <v-card class="mx-auto" height="350px"  width="90%" >
          <v-card-title>
              제출 정보
          </v-card-title>
          <v-card-subtitle>
              제출일자 {{ submitdate }}
          </v-card-subtitle>
          <v-card-text>
              <v-col>
              제출명 : {{ title }}
              <v-spacer></v-spacer>
              코멘트 : {{ comment }}
              </v-col>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text>
              <v-col>
              첨부파일 
              <v-spacer></v-spacer>
              <v-btn icon x-small color="indigo" @click="download">
                  <v-icon>mdi-file</v-icon>
              </v-btn>
              {{ file }}
              </v-col>
          </v-card-text>

      </v-card>
          </v-col>
      </v-row>
      <div class="text-center">
          <v-btn class="mr-4 blue lighten-3 white--text" @click="$router.push({name: 'classAssignmentRegister'})">
              <v-icon left> mdi-pencil </v-icon>
              수정
          </v-btn>
          <v-btn class="mr-4 blue lighten-3 white--text" @click="$router.go(-1)">
              <v-icon left> mdi-folder </v-icon>
              목록
          </v-btn>
      </div>

  </v-container>

</template>



<script>
export default {

    data: () => ({
        name: '6장 연습문제',
        detail: 'Lorem Ipsum s standard dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent',
        startdate: "2020.10.23",
        enddate: "2020.10.30",

        title: '과제 제출합니다.',
        comment: '안녕하세요 과제 제출합니다',
        submitdate: "2020.10.27",
        file: "cache.zip"
    }),

    methods: {
      download () {
        alert('다운로드 중입니다.....')
      },
    },


}
</script>