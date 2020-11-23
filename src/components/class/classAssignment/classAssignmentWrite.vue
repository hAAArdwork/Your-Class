<template> 
  <v-container fluid>
      <v-form>
          <v-row>
              <v-col cols="1"></v-col>
              <v-col cols="10">
                  <v-text-field v-model="name" :counter="30" label="과제명" required></v-text-field>
                  <v-menu ref="menu" v-model="menu" :close-on-content-click="false" :return-value.sync="date" transition="scale-transition" offset-y min-width="290px">
                      <template v-slot:activator="{ on, attrs }">
                          <v-text-field v-model="date" label="기간" prepend-icon="mdi-calendar" readonly v-bind="attrs" v-on="on" required></v-text-field>
                      </template>
                      <v-date-picker v-model="date">
                          <v-spacer></v-spacer>
                          <v-btn text class="blue lighten-3 white--text" @click="menu = false"> 취소 </v-btn>
                          <v-btn text class="blue lighten-3 white--text" @click="$refs.menu.save(date)"> 확인 </v-btn>
                      </v-date-picker>
                  </v-menu>
                  <v-file-input v-model="file" label="과제 파일" show-size multiple></v-file-input>
                  <v-textarea v-model="explain" label="과제 내용" no-resize rows="13" ></v-textarea>
              </v-col> 
          </v-row>
          
      </v-form>
      <div class="text-center">
          <v-btn class="mr-4 blue lighten-3 white--text" @click="$router.go(-1)">
              취소
          </v-btn>
          <v-btn class="mr-4 blue lighten-3 white--text" @click="enter">
              등록
          </v-btn>
      </div>
  </v-container>

</template>



<script>
export default {

    data: () => ({
      menu: false,
      date: new Date().toISOString().substr(0, 10),
      name: '',
      file: '',
      explain: '',
      

    }),

    computed: {
        nameErrors () {
            const errors = []
            if (!this.$v.name.$dirty) return errors
            !this.$v.name.required && errors.push('과제명을 입력하세요')
            return errors
        },
    },

    methods: {
      enter () {
        
      },
    },
}
</script>