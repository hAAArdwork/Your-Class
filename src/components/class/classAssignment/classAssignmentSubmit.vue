<template> 
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16">
      <v-card class="mx-6 my-10" elevation="0">
          <v-form>
            <v-row>
              <v-col cols="2">
                  <v-subheader> 제출명 </v-subheader>
              </v-col>
              <v-col cols="10">
                  <v-text-field 
                  v-model="submitTitle" 
                  placeholder="제출명을 입력하세요"
                  :rules="[rules.required]"></v-text-field>
              </v-col>
              <v-col cols="2">
                  <v-subheader> 제출내용 </v-subheader>
              </v-col>
              <v-col cols="10">
                  <v-textarea v-model="submitDetail" placeholder="코멘트를 입력하세요" no-resize rows="10" ></v-textarea>
              </v-col>
              <v-col cols="2">
                  <v-subheader> 첨부파일 </v-subheader>
              </v-col>
              <v-col cols="10">
                  <v-file-input placeholder="첨부파일을 입력하세요" show-size multiple counter></v-file-input>
              </v-col> 
          </v-row>
          </v-form>
      </v-card>

              <div class="text-center">
                  <v-btn class="mr-4" color="accent" @click="cancel">
                    <v-icon left>mdi-arrow-left</v-icon>
                    취소
                    </v-btn>
                  <v-btn color="accent" @click="submit">
                    <v-icon left> mdi-checkbox-marked-circle </v-icon>
                    등록
                  </v-btn>
              </div>
          


  </v-container>

</template>



<script>
export default {

    data: () => ({
        rules: {
          required: value => !!value || '입력해주세요',
        },
        assignmentId:"",
        submitted:"",
        submitTitle: "",
        submitDetail: "",
        submitUpdateDate: "",
        submitFile: ""
    }),

    methods: {
        cancel (){
            if(confirm("취소하시겠습니까?")){
                this.$router.go(-1)
            }

        },
        submit () {
            if(confirm("등록하시겠습니까?")){
                this.submitted=true
            }
            
        },
    },
    


}
</script>