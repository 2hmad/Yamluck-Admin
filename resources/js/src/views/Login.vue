<template>
  <div class="auth-wrapper auth-v2">
    <b-row class="auth-inner m-0">
      <!-- Left Text-->
      <b-col lg="8" class="d-none d-lg-flex align-items-center p-5">
        <div
          class="w-100 d-lg-flex align-items-center justify-content-center px-5"
        >
          <b-img fluid :src="imgUrl" alt="Login V2" />
        </div>
      </b-col>
      <!-- /Left Text-->

      <!-- Login-->
      <b-col lg="4" class="d-flex align-items-center auth-bg px-2 p-lg-5">
        <b-col sm="8" md="6" lg="12" class="px-xl-2 mx-auto">
          <b-card-title title-tag="h2" class="font-weight-bold mb-1">
            Welcome to Yammluck!
          </b-card-title>
          <b-card-text class="mb-2">
            Please sign-in to your admin account
          </b-card-text>

          <!-- form -->
          <b-form class="auth-login-form mt-2" @submit.prevent="submit">
            <!-- email -->
            <b-form-group label="Email" label-for="login-email">
              <b-form-input
                id="login-email"
                v-model="form.email"
                name="email"
                placeholder="john@example.com"
              />
            </b-form-group>

            <!-- forgot password -->
            <b-form-group>
              <div class="d-flex justify-content-between">
                <label for="login-password">Password</label>
              </div>
              <b-input-group class="input-group-merge">
                <b-form-input
                  id="login-password"
                  v-model="form.password"
                  class="form-control-merge"
                  :type="passwordFieldType"
                  name="password"
                  placeholder="············"
                />
                <b-input-group-append is-text>
                  <feather-icon
                    class="cursor-pointer"
                    :icon="passwordToggleIcon"
                    @click="togglePasswordVisibility"
                  />
                </b-input-group-append>
              </b-input-group>
            </b-form-group>
            <!-- submit buttons -->
            <b-button type="submit" variant="primary" block> Sign in </b-button>
          </b-form>
          <p v-if="showError" id="error">Username or Password is incorrect</p>
        </b-col>
      </b-col>
      <!-- /Login-->
    </b-row>
  </div>
</template>

<script>
/* eslint-disable global-require */
import VuexyLogo from "@core/layouts/components/Logo.vue";
import {
  BRow,
  BCol,
  BLink,
  BFormGroup,
  BFormInput,
  BInputGroupAppend,
  BInputGroup,
  BFormCheckbox,
  BCardText,
  BCardTitle,
  BImg,
  BForm,
  BButton,
} from "bootstrap-vue";
import { togglePasswordVisibility } from "@core/mixins/ui/forms";
import store from "@/store/index";
import { mapActions } from "vuex";
export default {
  components: {
    BRow,
    BCol,
    BLink,
    BFormGroup,
    BFormInput,
    BInputGroupAppend,
    BInputGroup,
    BFormCheckbox,
    BCardText,
    BCardTitle,
    BImg,
    BForm,
    BButton,
    VuexyLogo,
  },
  mixins: [togglePasswordVisibility],
  data() {
    return {
      form: {
        password: "",
        email: "",
      },
      sideImg: require("@/assets/images/pages/login-v2.svg"),
      showError: false,
    };
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === "password" ? "EyeIcon" : "EyeOffIcon";
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === "dark") {
        this.sideImg = require("@/assets/images/pages/login-v2-dark.svg");
        return this.sideImg;
      }
      return this.sideImg;
    },
  },
  methods: {
    ...mapActions(["LogIn"]),
    async submit() {
      const User = new FormData();
      User.append("email", this.form.email);
      User.append("password", this.form.password);
      try {
        await this.LogIn(User);
        this.$router.push("/");
        this.showError = false;
      } catch (error) {
        this.showError = true;
      }
    },
  },
};
</script>

<style lang="scss">
@import "@core/scss/vue/pages/page-auth.scss";
</style>
