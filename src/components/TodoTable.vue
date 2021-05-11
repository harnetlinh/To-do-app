<template>
  <b-card class="mt-2">
    <b-row>
      <b-col cols="12">
        <b-table
          style="max-height: 50vh"
          select-mode="multi"
          sticky-header
          striped
          hover
          selectable
          responsive
          :per-page="perPage"
          :current-page="page"
          :fields="fields"
          :items="filteredItems"
          @row-selected="onRowSelected"
        >
          <template #cell(is_done)="row">
            <b-form-checkbox
              v-model="row.item.is_done"
              value="true"
              unchecked-value="false"
            />
          </template>
          <template #cell(actions)="row">
            <b-button
              v-show="!showBulkDelete"
              variant="danger"
              size="sm"
              class="mr-1"
              @click="onClickDelete(row.item.id)"
            >
              Delete
            </b-button>
            <b-button
              variant="info"
              size="sm"
              class="mr-1"
              @click="onClickEdit(row.item)"
            >
              Edit
            </b-button>
          </template>
        </b-table>
        <b-button variant="info" class="mr-2" @click="onClickAdd()">
          Add new task
        </b-button>
        <b-button
          v-show="showBulkDelete"
          variant="danger"
          @click="onClickBulkDelete"
          class="ml-2"
        >
          Bulk Delete
        </b-button>
        <b-pagination
          v-model="page"
          :total-rows="filteredItems.length"
          :per-page="perPage"
          aria-controls="my-table"
        />
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BButton,
  BCard,
  BCol,
  BFormCheckbox,
  BPagination,
  BRow,
  BTable
} from "bootstrap-vue";
import { mapGetters } from "vuex";

export default {
  name: "TodoTable",

  components: {
    BButton,
    BCard,
    BCol,
    BFormCheckbox,
    BPagination,
    BRow,
    BTable
  },

  props: {
    perPage: {
      type: Number,
      default: 20
    },
    fields: {
      type: Array,
      default: () => [
        { key: "id", label: "ID", sortable: true, hidden: true },
        { key: "name", label: "Task Name", sortable: true },
        { key: "level", label: "Level", sortable: true },
        { key: "detail", label: "Detail", sortable: false },
        { key: "date", label: "Date", sortable: true },
        { key: "is_done", label: "Finished", sortable: true },
        { key: "actions", label: "Actions" },
      ]
    }
  },

  data () {
    return {
      page: 1,
      showBulkDelete: false
    }
  },

  computed: {
    ...mapGetters({
      filteredItems: 'filteredItems'
    })
  },

  methods: {
    onRowSelected () {
      // TODO: handle this
    },
    onClickBulkDelete () {
      // TODO: handle this
    },
    onClickEdit () {
      // TODO: handle this
    },
    onClickDelete () {
      // TODO: handle this
    }
  }
}
</script>
