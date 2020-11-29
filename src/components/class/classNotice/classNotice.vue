<template>
  <v-container class="px-4 px-sm-6 px-md-8 px-xl-16" fill-height fluid>
    <router-view></router-view>
  </v-container>
</template>

<script>
export default {
  data: () => ({})
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
