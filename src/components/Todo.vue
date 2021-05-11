<template>
  <b-container>
    <b-card class="md-1">
      <h5>
        Hello {{ userName }} | You have total: {{ items.length }} tasks
      </h5>
    </b-card>

    <filter-card />

    <todo-table />

    <b-overlay :show="isOpenOverlay" no-wrap>
      <template #overlay>
        <div
          ref="dialog"
          tabindex="-1"
          role="dialog"
          aria-modal="false"
          aria-labelledby="form-confirm-label"
          class="text-center p-3"
        >
          <p><strong id="form-confirm-label">Are you sure?</strong></p>
          <div class="d-flex">
            <b-button
              variant="outline-danger"
              class="mr-3"
              @click="onCancelDelete"
            >
              Cancel
            </b-button>
            <b-button variant="outline-success" @click="onOkDelete"
              >OK</b-button
            >
          </div>
        </div>
      </template>
    </b-overlay>

    <!-- modal add new task -->
    <b-modal
      id="modal-newTask"
      ref="modal"
      :title="openEdit ? 'Edit a task' : 'Add new task'"
      @show="resetModal"
      @hidden="resetModal"
      @ok="handleOK_Edit_Add"
      no-close-on-backdrop
      no-close-on-esc
    >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group
          label="Name"
          label-for="name-input"
          invalid-feedback="Name is required"
          :state="stateName"
        >
          <b-form-input
            id="name-input"
            v-model="newItem.name"
            :state="stateName"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Level"
          label-for="level-input"
          invalid-feedback="Level is required"
          :state="stateLevel"
        >
          <b-form-select
            placeholder="please choose a level"
            :options="level_options"
            id="level-input"
            v-model="newItem.level"
            :state="stateLevel"
            required
          >
            <template #first>
              <b-form-select-option :value="''" disabled
                >-- Please select an level --</b-form-select-option
              >
            </template>
          </b-form-select>
        </b-form-group>
        <b-form-group
          label="Date"
          label-for="date-input"
          invalid-feedback="Date is required"
          :state="stateDate"
        >
          <b-form-input
            type="date"
            id="date-input"
            v-model="newItem.date"
            :state="stateDate"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group
          label="Detail"
          label-for="detail-input"
          invalid-feedback="Detail is required"
          :state="stateDetail"
        >
          <b-form-textarea
            id="detail-input"
            v-model="newItem.detail"
            :state="stateDetail"
            required
          ></b-form-textarea>
        </b-form-group>
      </form>
    </b-modal>
  </b-container>
</template>

<script>
import {
  BButton,
  BCard,
  BContainer,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BFormTextarea,
  BModal,
  BOverlay,
} from "bootstrap-vue";
import { mapGetters } from "vuex";

import data from "../model/MOCK_DATA.json";

import FilterCard from "./FilterCard.vue";
import TodoTable from "./TodoTable.vue";

export default {
  name: "ToDo",

  components: {
    BButton,
    BCard,
    BContainer,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BFormTextarea,
    BModal,
    BOverlay,
    FilterCard,
    TodoTable
  },

  data() {
    return {
      openEdit: false,
      newItem: {
        id: "",
        name: "",
        level: "",
        detail: "",
        date: "",
        is_done: false,
      },
      ItemState: {
        id: null,
        name: null,
        level: null,
        detail: null,
        date: null,
      },
      isOpenOverlay: false,
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
        { key: "actions", label: "Actions" },
      ],
      backup_mock_data: data,
      items: data,
      selected_rows: [],
      isShowBulkDelete: false,
      selected_id: 0,
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
    }
  },
  computed: {
    ...mapGetters({
      userName: 'userName'
    }),
    stateName() {
      return this.newItem.name != "";
    },
    stateLevel() {
      return this.newItem.level !== "";
    },
    stateDetail() {
      return this.newItem.detail != "";
    },
    stateDate() {
      return this.newItem.date !== "";
    },
    rows() {
      return this.items.length;
    },
  },

  beforeMount() {
    // TODO: uncomment this
    // if (!this.userName) {
    //   this.$router.push("/");
    // }
  },

  created () {
    this.$store.dispatch('setItems', { items: data })
  },

  methods: {
    onClickDelete(id) {
      this.isShowBulkDelete = false;
      this.selected_id = id;
      this.isOpenOverlay = true;
    },
    onClickBulkDelete() {
      this.isShowBulkDelete = true;
      this.isOpenOverlay = true;
    },
    onRowSelected(items) {
      this.selected_rows = items;
      if (this.selected_rows.length > 0) {
        this.isShowBulkDelete = true;
      } else {
        this.isShowBulkDelete = false;
      }
    },
    makeToast(append = false, variant = null, content) {
      this.$bvToast.toast(content.info, {
        title: content.title,
        variant: variant,
        autoHideDelay: 3000,
        appendToast: append,
      });
    },
    handleOK_Edit_Add(bvModalEvt) {
      if (
        this.newItem.name != "" &&
        this.newItem.level !== "" &&
        this.newItem.detail != "" &&
        this.newItem.date !== ""
      ) {
        if (this.openEdit) {
          this.editTask();
          this.makeToast(true, "success", {
            title: "Success",
            info: "Edit task successfully",
          });
        } else {
          this.createNewTask();
          this.makeToast(true, "success", {
            title: "Success",
            info: "Add new task successfully",
          });
        }
        this.$bvModal.hide("modal-newTask");
        this.openEdit = false;
      } else {
        bvModalEvt.preventDefault();
        this.makeToast(true, "danger", {
          info: "Please check your input",
          title: "Invalid info",
        });
      }
    },
    editTask() {
      let index = this.backup_mock_data.findIndex(
        (obj) => obj.id == this.newItem.id
      );
      this.backup_mock_data[index]["date"] = this.newItem.date;
      this.backup_mock_data[index]["name"] = this.newItem.name;
      this.backup_mock_data[index]["level"] = this.newItem.level;
      this.backup_mock_data[index]["detail"] = this.newItem.detail;
    },
    createNewTask() {
      let id =
        this.backup_mock_data[this.backup_mock_data.length - 1]["id"] + 1;
      let newTask = {
        id: id,
        name: this.newItem.name,
        level: this.newItem.level,
        detail: this.newItem.detail,
        date: this.newItem.date,
        is_done: false,
      };
      this.backup_mock_data.push(newTask);
      this.filter();
    },
    onClickEdit(item) {
      this.$bvModal.show("modal-newTask");
      this.openEdit = true;
      this.newItem.id = item.id;
      this.newItem.name = item.name;
      this.newItem.level = item.level;
      this.newItem.date = item.date;
      this.newItem.detail = item.detail;
    },
    onClickAdd() {
      this.$bvModal.show("modal-newTask");
    },
    resetModal() {
      this.newItem.id = "";
      this.newItem.name = "";
      this.newItem.level = "";
      this.newItem.detail = "";
      this.newItem.date = "";
      this.ItemSate = {
        id: null,
        name: null,
        level: null,
        detail: null,
        date: null,
      };
    },
    onCancelDelete() {
      this.isOpenOverlay = false;
    },
    onOkDelete() {
      if (this.isShowBulkDelete) {
        this.removeMultipleTasks();
      } else {
        this.removeSingleTask(this.selected_id);
      }
      this.filter();
      this.isOpenOverlay = false;
      this.makeToast(true, "success", {
        title: "Success",
        info: "Delete task(s) successfully",
      });
    },
    removeSingleTask(id) {
      const removeIndex = this.backup_mock_data
        .map(function (item) {
          return item.id;
        })
        .indexOf(id);
      this.backup_mock_data.splice(removeIndex, 1);
    },
    removeMultipleTasks() {
      this.selected_rows.forEach((row) => {
        this.removeSingleTask(row.id);
      });
    },
    filter() {
      this.items = this.backup_mock_data.filter((item) => {
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
