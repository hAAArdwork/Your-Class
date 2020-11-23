<template> 
  <v-container fluid>
          <v-form>
               <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="10">
                  <v-text-field v-model="title" label="제출명" ></v-text-field>
                  <v-textarea v-model="comment" label="코멘트" no-resize rows="15" ></v-textarea>
                  <v-file-input v-model="file" label="파일" show-size multiple counter></v-file-input>
              </v-col> 
          </v-row>
          </v-form>

          
      <div class="text-center">
          <v-btn class="mr-4 blue lighten-3 white--text" @click="$router.go(-1)">
              <v-icon left>mdi-arrow-left</v-icon>
              취소
          </v-btn>
          <v-btn class="mr-4 blue lighten-3 white--text" @click="modify">
              <v-icon left> mdi-checkbox-marked-circle </v-icon>
              수정
          </v-btn>
      </div>


  </v-container>

</template>



<script>
export default {

    data: () => ({
        title: '과제 제출합니다.',
        comment: '안녕하세요 과제 제출합니다',
        submitdate: "2020.10.27",
        file: "cache.zip"
    }),

    methods: {
        modify () {
            
        },
    },
    


}
</script>