<template>
  <v-card rounded="lg" height="45vh">
    <v-toolbar flat>
      <v-toolbar-title>
        <span class="class-info text-h5">
          {{ isWaitingList ? "승인 대기 목록" : "수강 학생 목록" }}
        </span>
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-responsive height="80%" class="overflow-y-auto px-6 my-2">
      <v-row>
        <v-col
          cols="12"
          class="d-flex align-center pa-2"
          v-for="student in studentList"
          :key="student.id"
        >
          <span class="flex-grow-1">
            <strong>{{ student.name }}</strong> ( {{ student.mail }} )
          </span>

          <v-btn
            v-if="isWaitingList"
            @click="onAccept(student.mail)"
            color="success"
            small
            icon
          >
            <v-icon>mdi-check</v-icon>
          </v-btn>
          <v-btn color="error" @click="onReject(student.mail)" small icon>
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-col>
      </v-row>
    </v-responsive>
  </v-card>
</template>

<script>
export default {
  props: {
    isWaitingList: Boolean,
    studentList: Array
  },
  methods: {
    onAccept(email) {
      console.log(email);
      this.$emit("onAccept", email);
    },
    onReject(email) {
      // 리스트의 종류에 따라 다른 이벤트를 Emit 한다.
      if (this.isWaitingList) {
        this.$emit("onDecline", email);
      } else {
        this.$emit("onRemove", email);
      }
    }
  }
};
</script>

<style></style>
