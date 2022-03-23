<template>
  <div id="app">
    <div class="card">
      <div class="card-body">
        <div class="my-2 text-muted">Send Notification</div>
        <hr />
        <b-row>
          <b-col md="6">
            <b-form-group label="User ID" label-for="user_id">
              <b-form-input
                id="user_id"
                placeholder="User ID"
                type="number"
                v-model="form.uid"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Sender Name" label-for="sender_name">
              <b-form-input
                id="sender_name"
                placeholder="Sender Name"
                v-model="form.sender"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-form-group label="Subject (English)" label-for="subject_en">
              <b-form-input
                id="subject_en"
                placeholder="Subject (English)"
                v-model="form.subject_en"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Subject (Arabic)" label-for="subject_ar">
              <b-form-input
                id="subject_ar"
                placeholder="Subject (Arabic)"
                v-model="form.subject_ar"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <b-row>
          <b-col md="6">
            <b-form-group label="Content (English)" label-for="content_en">
              <b-form-textarea
                id="content_en"
                placeholder="Content (English)"
                v-model="form.content_en"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Content (Arabic)" label-for="content_ar">
              <b-form-textarea
                id="content_ar"
                placeholder="Content (Arabic)"
                v-model="form.content_ar"
              />
            </b-form-group>
          </b-col>
        </b-row>
        <br />
        <b-button
          variant="primary"
          @click="send_notify"
          style="margin: 0 auto; display: block"
        >
          Send Notification
        </b-button>
      </div>
    </div>
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
    BFormInput,
    BFormGroup,
    BFormFile,
    BButton,
    BFormTextarea,
  },
  data() {
    return {
      form: {
        uid: null,
        sender: "Yammluck",
        subject_en: "",
        subject_ar: "",
        content_en: "",
        content_ar: "",
      },
    };
  },
  methods: {
    send_notify() {
      axios
        .post("/api/send-notify", this.form)
        .then((res) => alert("Notification sent successfully"))
        .catch((err) => alert("Sent before"));
    },
  },
};
</script>