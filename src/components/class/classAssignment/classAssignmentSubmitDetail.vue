<template> 
  <v-container fluid>
      <v-row>
          <v-col>
      <v-card class="mx-auto" height="340px" width="90%" >
          <v-card-title>
              {{ assignmentName }} 
          </v-card-title>
          <v-card-subtitle>
               ~ {{ assignmentDueDate }}
          </v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text style="">
              {{ AssignmentDetail }}
          </v-card-text>
      </v-card>
          </v-col>
      </v-row>

      <v-row>
          <v-col>
      <v-card class="mx-auto" height="270px"  width="90%" >
          <v-card-title>
              제출 정보
          </v-card-title>
          <v-card-subtitle>
              제출일자 {{ submitUpdateDate }}
          </v-card-subtitle>
          <v-card-text>
              <v-col>
              제출명 : {{ submitTitle }}
              <v-spacer></v-spacer>
              코멘트 : {{ submitDetail }}
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
              {{ submitFile }}
              </v-col>
          </v-card-text>

      </v-card>
          </v-col>
      </v-row>
      <div class="text-center">
          <v-btn class="mr-4" color="accent" @click="$router.push({name: 'AssignmentSubmit'})">
              <v-icon left> mdi-pencil </v-icon>
              수정
          </v-btn>
          <v-btn color="accent"  @click="$router.go(-1)">
              <v-icon left> mdi-folder </v-icon>
              목록
          </v-btn>
      </div>

  </v-container>

</template>



<script>
export default {

    data: () => ({
        assignmentName: '6장 연습문제',
        AssignmentDetail: 'Lorem Ipsum s standard dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown print dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essent',
        assignmentDueDate: "2020.10.30",

        submitTitle: '과제 제출합니다.',
        submitDetail: '안녕하세요 과제 제출합니다',
        submitUpdateDate: "2020.10.27 17:34",
        submitFile: "cache.zip"
    }),

    methods: {
      download () {
        alert('다운로드 중입니다.....')
      },
    },


}
</script>