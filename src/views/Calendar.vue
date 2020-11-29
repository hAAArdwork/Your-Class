<template>
  <v-container fill-height fluid>
    <v-row v-if="$vuetify.breakpoint.name === 'xs'">
      <v-col cols="12" class="text-center">
        <v-icon x-large color="error" class="ma-2">mdi-cancel</v-icon>

        <v-spacer></v-spacer>

        <span>
          모바일 기기에선 사용할 수 없는 기능입니다.
        </span>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <v-sheet height="75px">
          <v-toolbar flat>
            <v-btn
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              이번 달 보기
            </v-btn>

            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon>
                mdi-chevron-left
              </v-icon>
            </v-btn>

            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon>
                mdi-chevron-right
              </v-icon>
            </v-btn>

            <v-toolbar-title v-if="$refs.calendar">
              {{ $refs.calendar.title }}
            </v-toolbar-title>
          </v-toolbar>
        </v-sheet>

        <v-sheet height="75vh">
          <v-calendar
            ref="calendar"
            color="accent"
            v-model="focus"
            :events="schedule == null ? [] : schedule"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
          ></v-calendar>

          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            transition="slide-y-reverse-transition"
            top
          >
            <v-card min-width="350px">
              <v-toolbar :color="selectedEvent.color" flat dark dense>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  text
                  color="success darken-2"
                  @click="
                    $router.push({
                      name: 'AssignmentSubmit',
                      params: {
                        classId: selectedEvent.subjectId,
                        assignmentId: selectedEvent.assignmentId
                      }
                    })
                  "
                  :disabled="
                    selectedEvent.isSubmitted == 1 || selectedEvent.isExpired
                  "
                >
                  {{
                    selectedEvent.isSubmitted
                      ? "제출완료"
                      : selectedEvent.isExpired
                      ? "기한만료"
                      : "제출하기"
                  }}
                </v-btn>
                <v-btn text color="primary" @click="selectedOpen = false">
                  닫기
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-menu>
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  // beforeCreate() {
  //   this.$store.dispatch("schedule/retrieveSchedule");
  // },

  computed: {
    /*
     *  이벤트 인스턴스에는 name, start, end, color가 필요하며,
     *  시작, 종료일의 포맷은 YYYY-MM-DD hh:mm 이다.
     */
    schedule() {
      return this.$store.getters["schedule/schedule"];
    },
    isLoading() {
      return this.$store.getters["schedule/isLoading"];
    }
  },

  mounted() {
    if (this.$vuetify.breakpoint.name !== "xs")
      this.$refs.calendar.checkChange();
  },

  data: () => ({
    focus: "",
    type: "month",

    typeToLabel: {
      month: "Month",
      week: "Week"
    },

    selectedEvent: {},
    selectedElement: null,
    selectedOpen: false,

    colors: [],
    names: []
  }),

  methods: {
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },

    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = "";
    },

    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.selectedEvent = event;
        this.selectedElement = nativeEvent.target;
        setTimeout(() => {
          this.selectedOpen = true;
        }, 10);
      };

      if (this.selectedOpen) {
        this.selectedOpen = false;
        setTimeout(open, 10);
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    }
  }
};
</script>
<style></style>
