<template> 
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" fluid>
      <v-row justify="start">
      <v-col cols="10">
        <p class="class-info text-h4  font-weight-bold">
          제출 과제 확인
        </p>
      </v-col>
      <v-col cols="2">
      <v-btn 
      class="mx-10"
      color="accent"
      @click="downloadAll()"
      >
      일괄 다운로드
      </v-btn>
      </v-col>

      <v-col cols="12">
          <v-data-table
          mobile-breakpoint="0"
          :headers="headers"
          :items="submit"
          :items-per-page="itemsPerPage"
          :page.sync="page"
          @page-count="pageCount = $event"
          hide-default-footer
          :single-expand="singleExpand"
          :expanded.sync="expanded"
          show-expand
          item-key="number"
      >
      <template v-slot:item.isSubmitted="{ item }">
        <v-btn  
        small
        disabled
        v-if="item.submitted==true"
        >
        제출
        </v-btn>
      </template>
      <template v-slot:expanded-item="{ headers, item }">
        <td :colspan="headers.length" >
          {{ item.submitDetail }}
        </td>
      </template>
      <template v-slot:item.submitFile="{ item }">
        <v-icon  
        v-if="item.submitFile"
        small
        @click="download(item)"
        >
        mdi-download </v-icon>
      </template>
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
            singleExpand: true,
            expanded: [],
            page: 1,
            pageCount: 0,
            itemsPerPage: 9,
            headers: [
              { text: "번호", value: "number", align: "center" },
              { text: "제출자id", value: "submitUserId", align: "center"},
              { text: "제출자", value: "submitUserName", align: "center"},
              { text: "제목", value: "submitTitle", align: "center", sortable: false },
              { text: "제출일", value: "submitUpdateDate", align: "center"},
              { text: "제출여부", value: 'isSubmitted', align: "center"},
              { text: '파일', value: 'submitFile', sortable: false },
              { text: '', value: 'data-table-expand' },
            ],
            submit:[
              {
                submitUserId: "1234",
                submitUserName: "이정우",
                number: "1",
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "안녕하세요 과제를 제출하겠습니다.",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: "as.c"
              },
              {
                submitUserId: "1212",
                submitUserName: "이정우",
                number: "2",              
                name: "정우",
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "1245",
                submitUserName: "이정우",
                number: "3", 
                submitted: false,
                submitTitle: "",
                submitDetail: "",
                submitUpdateDate: "",
                submitFile: ""
              },
              {
                submitUserId: "2345",
                submitUserName: "이정우",
                number: "4",    
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: "sofrtwarEngineering.pdf"
              },
              {
                submitUserId: "3852",
                submitUserName: "이정우",
                number: "5",      
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "2358",
                submitUserName: "이정우",
                number: "6",    
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "5932",
                submitUserName: "이정우",
                number: "7",   
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "3705",
                submitUserName: "이정우",
                number: "8",         
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "2569",
                submitUserName: "이정우",
                number: "9",   
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "3689",
                submitUserName: "이정우",
                number: "10",   
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "7842",
                submitUserName: "이정우",
                number: "11",    
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "1211",
                submitUserName: "이정우",
                number: "12",      
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
              {
                submitUserId: "1111",
                submitUserName: "이정우",
                number: "13",   
                submitted: true,
                submitTitle: "6장 연습문제 제출합니다.",
                submitDetail: "",
                submitUpdateDate: "2020-11-10 10:30",
                submitFile: ""
              },
            ]


    }),

    methods: {
      downloadAll(){
        alert("전체 다운로드")

      },
      download(){
        alert("다운로드")
      }
    }

}
</script>