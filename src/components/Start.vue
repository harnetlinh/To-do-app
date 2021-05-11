<template>
  <b-overlay show no-wrap>
    <template #overlay>
      <div
        ref="dialog"
        tabindex="-1"
        role="dialog"
        aria-modal="false"
        aria-labelledby="form-confirm-label"
        class="text-center p-3"
      >
        <p><strong id="form-confirm-label">Submit your information</strong></p>
        <b-form @submit="onSubmit" @reset.prevent="onReset">
          <b-form-group invalid-feedback="Name is required" :state="isValidName">
            <b-form-input
              type="text"
              placeholder="Name"
              id="name-input"
              required
              v-model="info.name"
              :state="isValidName"
            ></b-form-input>
          </b-form-group>
          <b-form-group :invalid-feedback="errorEmail" :state="isValidEmail">
            <b-form-input
              type="email"
              placeholder="Email (@com)"
              id="email-input"
              required
              v-model="info.email"
              :state="isValidEmail"
            >
            </b-form-input>
          </b-form-group>
        </b-form>
        <div class="d-flex">
          <b-button
            type="submit"
            variant="outline-info"
            class="mr-3"
            :disabled="!(isValidName && isValidEmail)"
            @click="onSubmit"
          >
            Submit
          </b-button>
        </div>
      </div>
    </template>
  </b-overlay>
</template>

<script>
import {
  BOverlay,
  BForm,
  BFormGroup,
  BFormInput,
  BButton
} from "bootstrap-vue";

const EMAIL_REG = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/)

export default {
  name: "Start",

  components: {
    BOverlay,
    BForm,
    BFormGroup,
    BFormInput,
    BButton
  },

  data() {
    return {
      info: {
        name: null,
        email: null,
      },
      show: true,
      errorEmail: ""
    };
  },

  computed: {
    isValidName() {
      return this.info.name !== null;
    },
    isValidEmail() {
      return this.validationEmail();
    },
  },

  methods: {
    validationEmail() {
      let error;
      if (!this.info.email) error = "Email is required";
      if (!EMAIL_REG.test(this.info.email)) error = "You must input an email (@.com)";
      if (error) {
        this.errorEmail = error;
        return false;
      }
      this.errorEmail = "";
      return true;
    },
    onSubmit() {
      if (!this.info.name || !this.validationEmail()) return
      this.$store.dispatch("changeInfo", {
        name: this.info.name,
        email: this.info.email,
      });
      this.$router.push("/to-do");
    },
    onReset() {
      this.info.email = "";
      this.info.name = "";
    },
  },
};
</script>
