<template>
  <v-card rounded="lg" height="45vh">
    <v-toolbar flat>
      <v-toolbar-title>
        <span class="class-info text-h5">
          수강 학생 목록
        </span>
      </v-toolbar-title>
    </v-toolbar>

    <v-divider></v-divider>

    <v-responsive height="80%" class="overflow-y-auto px-6 my-2">
      <v-row>
        <v-col
          cols="12"
          md="6"
          class="d-flex align-center"
          v-for="student in onlyStudent"
          :key="student.id"
        >
          <span>
            <strong>{{ student.name }}</strong>
          </span>

          <span class="flex-grow-1 mx-2">{{ student.email }}</span>

          <v-btn @click="onReject(student.id)" color="error" small icon>
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
    studentList: Array
  },
  computed: {
    onlyStudent() {
      return this.studentList.filter(i => i.is_student === true)
    }
  },
  methods: {
    onReject(id) {
      // 리스트의 종류에 따라 다른 이벤트를 Emit 한다.
      this.$emit("onRemove", id);
    }
  },
};
</script>

<style scoped>
.class-info {
  margin-bottom: 0px;
  font-weight: 600;
}

.card-text-title {
  font-size: 20px;
  margin-bottom: 0px;
}
</style>
