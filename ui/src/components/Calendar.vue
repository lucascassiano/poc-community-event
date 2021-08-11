<template>
  <div data-app>
    <v-row>
      <v-col>
        <v-sheet height="400">
          <v-calendar
            ref="calendar"
            :now="today"
            :value="today"
            :events="events"
            color="primary"
            type="week"
            @click:event="showEvent"
          ></v-calendar>
        </v-sheet>
      </v-col>
    </v-row>

    <v-btn color="primary" dark @click.stop="dialog = true">
      Open Dialog
    </v-btn>

    <!-- Dialog -->

    <v-dialog v-if="selectedEvent" v-model="dialog" max-width="290">
      <v-card>
        <v-card-title class="text-h5">
          {{ selectedEvent.name }}
        </v-card-title>
        <v-card-title class="text-h6">
          author: {{ selectedEvent.author }}
        </v-card-title>
        <v-card-text>
          <div class="text-left">
            <vue-markdown :source="selectedEvent.description.content" />
          </div>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Close
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import EventsLoader from "./eventsLoader";
import VueMarkdown from "vue-markdown-render";
export default {
  components: {
    VueMarkdown,
  },
  data() {
    return {
      today: "2021-10-10",
      events: [
        {
          name: "Weekly Meeting",
          start: "2019-01-07 09:00",
          end: "2019-01-07 10:00",
        },
        {
          name: `Thomas' Birthday`,
          start: "2019-01-10",
        },
        {
          name: "Mash Potatoes",
          start: "2019-01-09 12:30",
          end: "2019-01-09 15:30",
        },
      ],
      dialog: false,
      selectedEvent: null,
    };
  },
  state: {
    eventOpen: null,
  },
  beforeMount() {
    //all events
    const eventsLoader = new EventsLoader();
    console.log("events", eventsLoader.events);

    this.events = eventsLoader.getCalendar();
    // console.log({ final: events });
  },
  mounted() {
    this.$refs.calendar.scrollToTime("08:00");
  },
  methods: {
    showEvent(data) {
      const { event } = data;
      console.log("show event", data);
      this.dialog = true;
      this.selectedEvent = event;
    },
  },
};
</script>

<style lang="scss" scoped >
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}
.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}

.text-left {
  text-align: left;
  margin-top: 12px;
  h1 {
    line-height: 1.2rem;
  }
}
</style>