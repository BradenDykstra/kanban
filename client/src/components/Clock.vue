<template>
  <div class="clock">
    <div class="row justify-content-center">
      <h5>{{getDay()}}, {{getMonth()}}. {{clock.getDate()}}, {{clock.getFullYear()}}</h5>
    </div>
    <div class="row justify-content-center">
      <h5>{{getHours()}}:{{getMinutes()}}{{getPm()}}</h5>
    </div>
  </div>
</template>


<script>
export default {
  name: "clock",
  data() {
    return {
      clock: new Date()
    };
  },
  created() {
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
  },
  computed: {},
  methods: {
    getDay() {
      let day = this.clock.getDay();
      switch (day) {
        case 0:
          day = "Sunday";
          break;
        case 1:
          day = "Monday";
          break;
        case 2:
          day = "Tuesday";
          break;
        case 3:
          day = "Wednesday";
          break;
        case 4:
          day = "Thursday";
          break;
        case 5:
          day = "Friday";
          break;
        case 6:
          day = "Saturday";
          break;
      }
      return day;
    },
    getMonth() {
      let month = this.clock.getMonth();
      switch (month) {
        case 0:
          month = "Jan";
          break;
        case 1:
          month = "Feb";
          break;
        case 2:
          month = "Mar";
          break;
        case 3:
          month = "Apr";
          break;
        case 4:
          month = "May";
          break;
        case 5:
          month = "Jun";
          break;
        case 6:
          month = "Jul";
          break;
        case 7:
          month = "Aug";
          break;
        case 8:
          month = "Sep";
          break;
        case 9:
          month = "Oct";
          break;
        case 10:
          month = "Nov";
          break;
        case 11:
          month = "Dec";
          break;
      }
      return month;
    },
    getMinutes() {
      let minutes = this.clock.getMinutes();
      if (minutes < 10) {
        minutes = "0" + minutes;
      }
      return minutes;
    },
    getHours() {
      let hours = this.clock.getHours();
      if (hours > 12) {
        hours = hours - 12;
      }
      return hours;
    },
    getPm() {
      let hour = this.clock.getHours();
      let ampm = "am";
      if (hour >= 12) {
        ampm = "pm";
      }
      return ampm;
    }
  },
  components: {}
};
</script>


<style scoped>
</style>