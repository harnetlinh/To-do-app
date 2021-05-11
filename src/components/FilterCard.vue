<template>
  <b-card class="mt-2">
    <b-row>
      <!-- Name -->
      <b-col cols="3">
        <b-form-input v-model="name" placeholder="Search by name" @change="update" />
      </b-col>

      <!-- Level -->
      <b-col cols="3">
        <b-button variant="info" id="btn-select-level">
          Select Level: {{ levels }}
        </b-button>
        <b-tooltip target="btn-select-level" variant="light">
          <b-row>
            <b-col cols="12">
              <b-form-select
                v-model="levels"
                :options="levelOptions"
                :select-size="4"
                multiple
              />
            </b-col>
            <b-col>
              <b-button variant="info" @click="clearSelectedLevelOptions">
                Remove all selections
              </b-button>
            </b-col>
          </b-row>
        </b-tooltip>
      </b-col>

      <!-- Date -->
      <b-col cols="3">
        <b-form-datepicker
          v-model="date"
          today-button
          reset-button
          close-button
          variant="info"
        />
      </b-col>

      <!-- Status -->
      <b-col cols="3">
        <b-button variant="info" id="btn-select-finished">
          {{ statusLabel }}
        </b-button>

        <b-tooltip target="btn-select-finished" variant="light">
          <b-form-group
            style="font-size: 16px"
            label="Select status"
            v-slot="{ ariaDescribedby }"
          >
            <b-form-radio-group
              stacked
              style="font-size: 12px; text-align: left"
              v-model="status"
              :options="statusOptions"
              :aria-describedby="ariaDescribedby"
              name="radio-options"
            />
          </b-form-group>
        </b-tooltip>
      </b-col>
    </b-row>
  </b-card>
</template>

<script>
import {
  BButton,
  BCard,
  BCol,
  BFormDatepicker,
  BFormGroup,
  BFormInput,
  BFormRadioGroup,
  BFormSelect,
  BRow,
  BTooltip
} from "bootstrap-vue";
export default {
  name: "FilterCard",

  components: {
    BButton,
    BCard,
    BCol,
    BFormDatepicker,
    BFormGroup,
    BFormInput,
    BFormRadioGroup,
    BFormSelect,
    BRow,
    BTooltip
  },

  props: {
    levelOptions: {
      type: Array,
      default: () => [
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
      ]
    },
    statusOptions: {
      type: Array,
      default: () => [
        { text: "Finished", value: true },
        { text: "Not Finished", value: false },
        { text: "All", value: "all" },
      ]
    }
  },

  data () {
    return {
      name: '',
      levels: [],
      date: '',
      status: "all"
    }
  },

  computed: {
    statusLabel () {
      const statusToLabel = {
        true: "Only Finished",
        false: "Only Not Finished",
        "all": "All"
      }
      return statusToLabel[this.status] || "All"
    }
  },

  methods: {
    clearSelectedLevelOptions () {
      this.levels = []
    },
    update () {
      const payload = {
        name: this.name,
        levels: this.levels,
        date: this.date,
        status: this.status
      }
      this.$store.dispatch("setFilter", { filter: payload })
    }
  }
}
</script>
