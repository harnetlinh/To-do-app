<template>
  <b-container>
    <b-card>
      <b-row>
        <b-col cols="1"></b-col>
        <b-col cols="3">
          <b-form-input
            v-model="name_search"
            placeholder="Search by name"
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-button @click="filter_by_name()"> search </b-button>
        </b-col>
        <b-col cols="3"></b-col>
        <b-col cols="2"></b-col>
      </b-row>
    </b-card>

    <b-card style="margin-top: 10px">
      <b-row>
        <b-col cols="1"></b-col>
        <b-col cols="10">
          <b-table
            style="max-height: 80vh"
            sticky-header
            striped
            hover
            responsive="true"
            :fields="fields"
            :items="mock_data"
          >
            <template #cell(is_done)="row">
              <b-form-checkbox
                :disabled="true"
                v-model="row.item.is_done"
                value="true"
                unchecked-value="false"
              >
              </b-form-checkbox>
            </template>
          </b-table>
        </b-col>
        <b-col cols="1"></b-col>
      </b-row>
    </b-card>
  </b-container>
</template>

<script>
import data from "../model/MOCK_DATA.json";
const mock_data = data;
export default {
  name: "HelloWorld",
  props: {
    msg: String,
  },
  data() {
    return {
      // "id":1,"level":1,"detail":"8715 Carey Point","date":"2021-04-18","is_done":false,"name":"Trunyx"
      name_search: "",
      fields: [
        { key: "id", label: "ID", sortable: true, hidden: true },
        { key: "name", label: "Task Name", sortable: true },
        { key: "level", label: "Level", sortable: true },
        { key: "detail", label: "Detail", sortable: false },
        { key: "date", label: "Date", sortable: true },
        { key: "is_done", label: "Finished", sortable: true },
      ],
      mock_data: mock_data,
    };
  },
  watch: {
    name_search(value){
      if (value === "") {
        this.mock_data = mock_data;
      } else {
        this.filter_by_name();
      }
    },
  },
  methods: {
    filter_by_name() {
      this.mock_data = this.mock_data.filter((item) => {
        return (
          item.name.toUpperCase().indexOf(this.name_search.toUpperCase()) > -1
        );
      });
    },
  },
};
</script>

<style scoped>
</style>
