<template>
  <v-container class="px-8" fill-height fluid>
     <v-row> 
       <v-toolbar flat color="white">
        <v-toolbar-title> <p class="text-h4 font-weight-bold"> 질의응답 </p> </v-toolbar-title>
        <v-spacer></v-spacer>
        
        <v-dialog max-width="700" v-model="write"  hide-overlay transition="dialog-bottom-transition">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="accent" v-bind="attrs" v-on="on">
              질문하기
              <v-icon right >mdi-plus</v-icon>
            </v-btn>
          </template>
            <v-card>
              <v-toolbar color="accent">
                <v-btn color="white" icon @click="write=false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
                <v-toolbar-title class="white--text" >
                </v-toolbar-title>
                <v-spacer></v-spacer>
                <v-toolbar-items>
                  <v-btn class="white--text" text @click="write=false">
                    등록
                    <v-icon right> mdi-checkbox-marked-circle </v-icon>
                  </v-btn>
                </v-toolbar-items>
              </v-toolbar>


              <template>
                <v-container fluid>
                    <v-text-field
                    label="제목"
                    :rules="rules"
                    hide-details="auto"
                    ></v-text-field>
                    <v-textarea
                    label="내용"
                    no-resize
                    rows="10"
                    :rules="rules"
                    ></v-textarea>
                  </v-container>
              </template>
            </v-card>
        </v-dialog>
      </v-toolbar> 


 
       <v-col cols="12" style="height: 325px;">
        <v-data-table 
        mobile-breakpoint="0"
       :headers="headers"
        :items="questions"
        :page.sync="page"
        :items-per-page="itemsPerPage"
        hide-default-footer
        class="elevation=0"
        @page-count="pageCount = $event"
        :sort-desc="[true]"
        :sort-by="['number']"
        item-key="number"
      >
      </v-data-table>
      </v-col>



        <v-col cols="12">
          <div class="text-center pt-2">
            <v-pagination color="accent" v-model="page" :length="pageCount">
            </v-pagination>
          </div>
        </v-col>

    </v-row>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        write: false,
        page: 1,
        pageCount: 0,
        itemsPerPage: 5,
        headers: [
          {
            text: '번호',
            align: 'start',
            sortable: false,
            value: 'number',
          },
          { text: '제목', value: 'title', sortable: false },
          { text: '작성일', value: 'dateCreated', sortable: false },
          { text: '작성자', value: 'author', sortable: false },
        ],
        questions: [
            {
              number: 1,
              title: "1장 과제에 대한 질문",
              author: "이정우 ",
              dateCreated: "2020-03-01 10:30",
              content: "",
            },
            {
              number: 2,
              title: "1장 과제에 대한 질문2",
              author: "이정우 ",
              dateCreated: "2020-03-03 10:30",
              content: "",
           },
           {
              number: 3,
              title: "2장 과제에 대한 질문",
              author: "이정우 ",
              dateCreated: "2020-03-11 10:30",
              content: "",
            },
            {
              number: 4,
              title: "시험 일정에 관한 질문",
              author: "이정우 ",
              dateCreated: "2020-03-13 10:30",
              content: "",
            },
            {
              number: 5,
              title: "3장 과제에 대한 질문",
              author: "이정우 ",
              dateCreated: "2020-03-21 10:30",
              content: "",
            },
            {
              number: 6,
              title: "3장 수업에 대한 질문",
              author: "이정우 ",
              dateCreated: "2020-03-29 10:30",
              content: "",
            },
            {
              number: 7,
              title: "수업 관련 질문",
              author: "이정우",
              dateCreated: "2020-04-02 10:30",
              content: "",
            },
            {
              number: 8,
              title: "수업 관련 질문",
              author: "이정우",
              dateCreated: "2020-04-02 10:30",
              content: "",
            },
            {
              number: 9,
              title: "수업 관련 질문",
              author: "이정우",
              dateCreated: "2020-04-02 10:30",
              content: "",
            },
        ],
        rules: [
          value => !!value || '입력하세요.' ,
        ],
        editedIndex: -1,
        edited: {
          title: '',
          file: '',
          content: '',
          author: '',
          dateCreated: ''
        },
        default: {
          title: '',
          file: '',
          content: '',
          author: '',
          dateCreated: ''
        },
        computed: {
      },
        watch: {
      },

      method:{
     },
    })
};
      
</script>