<template>
  <b-container>
    <b-card class="b-card-main">
      <h5>Total: {{ mock_data.length }} tasks</h5>
    </b-card>
    <b-card class="b-card-main">
      <b-row>
        <!-- <b-col cols="1"></b-col> -->
        <b-col cols="3">
          <b-form-input
            v-model="name_search"
            placeholder="Search by name"
          ></b-form-input>
        </b-col>
        <b-col cols="3">
          <b-button variant="info" id="btn-seelect-level"
            >Select Level: {{ selected_level_options }}
          </b-button>
          <b-tooltip target="btn-seelect-level" variant="light">
            <b-row>
              <b-col cols="12">
                <b-form-select
                  v-show="true"
                  v-model="selected_level_options"
                  :options="level_options"
                  multiple
                  :select-size="4"
                ></b-form-select>
              </b-col>
              <b-col>
                <b-button variant="info" @click="selected_level_options = []">
                  Remove all selections
                </b-button>
              </b-col>
            </b-row>
          </b-tooltip>
        </b-col>
        <b-col cols="3">
          <b-form-datepicker
            v-model="selected_date"
            today-button
            reset-button
            close-button
            variant="info"
          ></b-form-datepicker>
        </b-col>
        <b-col cols="3">
          <b-button variant="info" id="btn-select-finished">
            <span v-if="selected_finished === ''"> Finished & NotFinised </span>
            <span v-else-if="selected_finished === true"> Only Finished</span>
            <span v-else-if="!selected_finished"> Only NotFinished </span>
          </b-button>
          <b-tooltip target="btn-select-finished" variant="light">
            <b-form-group
              style="font-size: 16px"
              label="Select option"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-radio-group
                stacked
                style="font-size: 12px; text-align: left"
                v-model="selected_finished"
                :options="options_finished"
                :aria-describedby="ariaDescribedby"
                name="radio-options"
              ></b-form-radio-group>
            </b-form-group>
          </b-tooltip>
        </b-col>
      </b-row>
    </b-card>

    <b-card class="b-card-main">
      <b-row>
        <b-col cols="1"></b-col>
        <b-col cols="10">
          <b-table
            style="max-height: 50vh"
            sticky-header
            striped
            hover
            :per-page="perPage"
            :current-page="currentPage"
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
          <b-pagination
            v-model="currentPage"
            :total-rows="rows"
            :per-page="perPage"
            aria-controls="my-table"
          ></b-pagination>
        </b-col>
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
      perPage: 20,
      currentPage: 1,
      selected_date: "",
      name_search: "",
      options_finished: [
        { text: "Finished", value: true },
        { text: "NotFinished", value: false },
        { text: "All", value: "" },
      ],
      selected_level_options: [],
      selected_finished: "",
      level_options: [
        { value: 1, text: "Level 1" },
        { value: 2, text: "Level 2" },
        { value: 3, text: "Level 3" },
        { value: 4, text: "Level 4" },
        { value: 5, text: "Level 5" },
        { value: 6, text: "Level 6" },
        { value: 7, text: "Level 7" },
        { value: 8, text: "Level 8" },
        { value: 9, text: "Level 9" },
        { value: 10, text: "Level 10" },
      ],
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
    name_search() {
      this.filter();
    },
    selected_level_options() {
      this.filter();
    },
    selected_date() {
      this.filter();
    },
    selected_finished() {
      this.filter();
    },
  },
  computed: {
    rows() {
      return this.mock_data.length;
    },
  },
  methods: {
    filter() {
      this.mock_data = mock_data.filter((item) => {
        let isCorrectName = true,
          isCorrectLevels = true,
          isCorrectFinised = true,
          isCorrecrDate = true;
        if (this.name_search !== "") {
          isCorrectName =
            item.name.toUpperCase().indexOf(this.name_search.toUpperCase()) >
            -1;
        }
        if (this.selected_level_options.length > 0) {
          isCorrectLevels =
            this.selected_level_options.indexOf(item.level) > -1;
        }
        if (this.selected_date !== "") {
          isCorrecrDate = this.selected_date === item.date;
        }
        if (this.selected_finished !== "") {
          isCorrectFinised = this.selected_finished === item.is_done;
        }
        return (
          isCorrectName && isCorrectLevels && isCorrecrDate && isCorrectFinised
        );
      });
    },
  },
};
</script>

<style scoped>
.b-card-main {
  margin-top: 10px;
}
</style>
