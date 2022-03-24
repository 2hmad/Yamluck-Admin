<template>
  <div id="app">
    <div class="card">
      <div class="card-body">
        <div class="my-2 text-muted">Add Admins</div>
        <hr />
        <validation-observer ref="simpleRules">
          <b-form @submit.prevent="add_admin">
            <b-row>
              <b-col md="6">
                <b-form-group label="Admin Name" label-for="name">
                  <b-form-input
                    id="name"
                    placeholder="Name"
                    v-model="name"
                    required
                  />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Admin Email" label-for="email">
                  <b-form-input
                    id="email"
                    placeholder="Email Address"
                    type="email"
                    v-model="email"
                    required
                  />
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col md="6">
                <b-form-group label="Password" label-for="password">
                  <validation-provider
                    #default="{ errors }"
                    name="Password"
                    vid="Password"
                    rules="required|min:8|password"
                  >
                    <b-form-input
                      id="password"
                      placeholder="Password"
                      type="password"
                      v-model="password"
                      required
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group
                  label="Confirm Password"
                  label-for="conf_password"
                >
                  <validation-provider
                    #default="{ errors }"
                    name="Confirm Password"
                    rules="required|confirmed:Password"
                  >
                    <b-form-input
                      id="conf_password"
                      placeholder="Confirm Password"
                      type="password"
                      v-model="conf_password"
                      required
                    />
                    <small class="text-danger">{{ errors[0] }}</small>
                  </validation-provider>
                </b-form-group>
              </b-col>
            </b-row>
            <br />
            <b-button
              variant="primary"
              type="submit"
              style="margin: 0 auto; display: block"
            >
              Add Admin
            </b-button>
          </b-form>
        </validation-observer>
        <hr />
        <div class="my-2 text-muted">Admins</div>
      </div>
    </div>
    <hr />
  </div>
</template>
<script>
import axios from "axios";
import { ValidationProvider, ValidationObserver } from "vee-validate";

import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormFile,
  BButton,
  BFormTextarea,
  BForm,
} from "bootstrap-vue";
import { required, min, confirmed } from "@validations";

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BButton,
    BFormTextarea,
    BForm,
    ValidationProvider,
    ValidationObserver,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      conf_password: "",
      required,
      min,
      confirmed,
      codePlaceholderArgument,
    };
  },
  methods: {
    add_admin() {
      this.$refs.simpleRules.validate().then((success) => {
        if (success) {
          axios
            .post("/api/admin/add", {
              name: this.name,
              email: this.email,
              password: this.password,
            })
            .then((result) => {
              alert("Admin has been added");
            })
            .catch((err) => {
              console.log(err);
            });
        }
      });
    },
  },
};
</script>