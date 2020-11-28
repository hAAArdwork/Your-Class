<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" fill-height fluid>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  beforeCreate() {
    this.$store.dispatch(
      "post/retrieveNoticeList",
      this.$route.params.classId
    );
  },
  
  data: () => ({
    expanded: [],
    page: 1,
    pageCount: 0,
  }),
  computed: {
    userData() {
      return this.$store.getters["user/userData"];
    },
    itemPerPage() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return 6;
        default:
          return 6;
      }
    },
    truncateLength() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs":
          return "125px";
        case "sm":
          return "145px";
        default:
          return "";
      }
    },
    responsiveHeaders() {
      switch (this.$vuetify.breakpoint.name) {
        case "xs": {
          return this.headers.slice(0, 3);
        }
        default:
          return this.headers;
      }
    }
  }
};
</script>

<style>
.v-data-table > .v-data-table__wrapper > table > tbody > tr > td,
.v-data-table > .v-data-table__wrapper > table > tbody > tr > th,
.v-data-table > .v-data-table__wrapper > table > thead > tr > td,
.v-data-table > .v-data-table__wrapper > table > thead > tr > th,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > td,
.v-data-table > .v-data-table__wrapper > table > tfoot > tr > th {
  padding: 0px 10px;
}
</style>
