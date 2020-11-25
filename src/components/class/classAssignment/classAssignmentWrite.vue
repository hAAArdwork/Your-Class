<template> 
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" fluid>
    <v-card class="mx-6 my-10" elevation="0">
      <v-form>
          <v-row>
              <v-col cols="12">
                  <v-text-field 
                  v-model="assignmentName" 
                  :counter="30" 
                  label="과제명"
                  :rules="[rules.required]"
                  ></v-text-field>
              </v-col>
              <v-col cols="6">
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="date" label="마감날짜" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" required></v-text-field>
                      </template>
                      <v-date-picker v-model="date">
                          <v-spacer></v-spacer>
                          <v-btn text color="primary" @click="menu = false"> 취소 </v-btn>
                          <v-btn text color="primary" @click="$refs.menu.save(date)"> 확인 </v-btn>
                      </v-date-picker>
                  </v-menu>
              </v-col>
              <v-col cols="6">
                  <v-dialog
                  ref="dialog"
                  v-model="dialog"
                  :return-value.sync="time"
                  persistent
                  width="300px"
                  >
                  <template v-slot:activator="{ on, attrs }">
                      <v-text-field
                      v-model="time"
                      label="마감시간"
                      prepend-icon="mdi-clock-time-four-outline"
                      v-bind="attrs"
                      v-on="on"
                      ></v-text-field>
                      </template>
                      <v-time-picker
                      v-if="dialog"
                      v-model="time"
                      >
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="dialog = false" > 취소 </v-btn>
                      <v-btn text color="primary" @click="$refs.dialog.save(time)"> 확인 </v-btn>
                      </v-time-picker>
                  </v-dialog>
              </v-col>
              <v-col cols="12">
                  <v-file-input label="과제 파일" show-size multiple></v-file-input>
                  <v-textarea v-model="assignmentDetail" label="과제 내용" no-resize rows="9" ></v-textarea>
              </v-col> 
          </v-row>
          
      </v-form>
    </v-card>
      <div class="text-center">
          <v-btn class="mr-4" color="accent" @click="$router.go(-1)">
              취소
          </v-btn>
          <v-btn class="mr-4" color="accent" @click="enter">
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
      dialog: false,
      menu: false,
      time: '23:59',
      date: new Date().toISOString().substr(0, 10),
      assignmentUpdateDate: '0000-00-00 00:00',
      assignmentName: '',
      assignmentFile: '',
      assignmentDetail: '',
      
      

    }),

    computed: {
        assignmentDueDate(){
            return (this.date + " " + this.time)
        }
    },

    methods: {
      enter () {
        confirm("등록하시겠습니까?")
      },
    },
}
</script>