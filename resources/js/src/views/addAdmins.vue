<template>
  <div id="app">
    <div class="card">
      <div class="card-body">
        <div class="my-2 text-muted">Add Admins</div>
        <hr />
        <b-row>
          <b-col md="6">
            <b-form-group label="Admin Name" label-for="name">
              <b-form-input id="name" placeholder="Name" v-model="name" />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Admin Email" label-for="email">
              <b-form-input
                id="email"
                placeholder="Email Address"
                type="email"
                v-model="email"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-form-group label="Password" label-for="password">
              <b-form-input
                id="password"
                placeholder="Password"
                type="password"
                v-model="password"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Confirm Password" label-for="conf_password">
              <b-form-input
                id="conf_password"
                placeholder="Confirm Password"
                type="password"
                v-model="conf_password"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <br />
        <b-button
          variant="primary"
          @click="add_admin"
          type="submit"
          style="margin: 0 auto; display: block"
        >
          Add Admin
        </b-button>
        <hr />
        <div class="my-2 text-muted">Admins</div>
      </div>
    </div>
    <hr />
  </div>
</template>
<script>
import axios from "axios";
import {
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormFile,
  BButton,
  BFormTextarea,
} from "bootstrap-vue";

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormFile,
    BButton,
    BFormTextarea,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      conf_password: "",
    };
  },
  methods: {
    add_admin() {
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
    },
  },
};
</script>