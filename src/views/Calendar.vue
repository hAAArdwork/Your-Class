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
              Today
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
            :events="events"
            :event-color="getEventColor"
            :type="type"
            @click:event="showEvent"
            @click:more="viewDay"
            @click:date="viewDay"
          ></v-calendar>

          <v-menu
            v-model="selectedOpen"
            :close-on-content-click="false"
            :activator="selectedElement"
            offset-x
          >
            <v-card min-width="350px">
              <v-toolbar :color="selectedEvent.color" flat dark>
                <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <span v-html="selectedEvent.details"></span>
              </v-card-text>

              <v-card-actions>
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
    /*
     *  이벤트 인스턴스에는 name, start, end, color가 필요하며,
     *  시작, 종료일의 포맷은 YYYY-MM-DD hh:mm 이다.
     */
    events: [
      {
        name: "동억이형 결혼식",
        start: "2020-11-07 11:30",
        end: "2020-11-07 13:00",
        color: "blue"
      },
      {
        name: "기업사회 미팅",
        start: "2020-11-06 13:05",
        end: "2020-11-06 14:00",
        color: "blue"
      },
      {
        name: "창업 캡스톤 중간발표",
        start: "2020-11-11 18:30",
        end: "2020-11-11 21:00",
        color: "blue"
      }
    ],

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
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
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
