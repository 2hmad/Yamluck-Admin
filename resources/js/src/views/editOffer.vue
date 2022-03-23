<template>
  <div id="app">
    <div class="card">
      <!----><!---->
      <div class="card-body">
        <!----><!---->
        <div class="row my-2">
          <div class="col-lg">
            <b-row>
              <b-col md="6">
                <b-form-input
                  v-model="form.title_en"
                  placeholder="Title"
                ></b-form-input>
              </b-col>
              <b-col md="6">
                <b-form-input
                  v-model="form.title_ar"
                  placeholder="Title ( Arabic )"
                ></b-form-input>
              </b-col>
            </b-row>
            <p class="card-text item-company mb-0">
              <a
                :href="`https://yammluck.com/product/${param}`"
                target="_blank"
                class="company-name"
              >
                Link Preview
              </a>
            </p>
            <p></p>
            <p class="card-text">
              <b-row>
                <b-col md="6">
                  <b-form-textarea
                    id="textarea-default"
                    rows="4"
                    placeholder="Details (English)"
                    v-model="form.details_en"
                  ></b-form-textarea>
                </b-col>
                <b-col md="6">
                  <b-form-textarea
                    id="textarea-default"
                    rows="4"
                    placeholder="Details (Arabic)"
                    v-model="form.details_ar"
                  ></b-form-textarea>
                </b-col>
              </b-row>
            </p>
            <div class="d-flex flex-column flex-sm-row pt-1">
              <button
                type="button"
                class="btn btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0 btn-primary"
                @click="updateOffer"
              >
                <span>Update</span>
              </button>
              <button
                type="button"
                class="
                  btn btn-wishlist
                  mr-0 mr-sm-1
                  mb-1 mb-sm-0
                  btn-outline-secondary
                "
                v-b-modal.finish-modal
              >
                <span>Finish Offer</span>
              </button>
              <b-modal
                id="finish-modal"
                centered
                title="Are You Sure ?"
                hide-footer
              >
                <b-card-text>
                  Are you sure that you want to end the competition and extract
                  a winner from it and awarding the product?
                  <br /><br />
                  <button
                    class="
                      btn btn-wishlist
                      mr-0 mr-sm-1
                      mb-1 mb-sm-0
                      btn-primary
                    "
                    @click="finishOffer"
                  >
                    Confirm
                  </button>
                </b-card-text>
              </b-modal>

              <button
                type="button"
                class="
                  btn btn-wishlist
                  mr-0 mr-sm-1
                  mb-1 mb-sm-0
                  btn-outline-secondary
                "
                v-b-modal.closeOffer-modal
              >
                <span>Close Offer</span>
              </button>
              <b-modal
                id="closeOffer-modal"
                centered
                title="Are You Sure ?"
                hide-footer
              >
                <b-card-text>
                  Closing the offer will permanently delete everything related
                  to it and return all amounts spent to subscribers
                  <br /><br />
                  <button
                    class="
                      btn btn-wishlist
                      mr-0 mr-sm-1
                      mb-1 mb-sm-0
                      btn-danger
                    "
                    @click="closeOffer"
                  >
                    Confirm
                  </button>
                </b-card-text>
              </b-modal>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BFormGroup,
  BFormInput,
  BFormSelect,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BRow,
  BCol,
  BButton,
  BFormTextarea,
  BCardText,
  BFormTags,
  BFormDatepicker,
  BAvatar,
  BBadge,
  BPagination,
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import axios from "axios";
import "vue-good-table/dist/vue-good-table.css";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";
export default {
  components: {
    BFormGroup,
    BFormInput,
    BFormSelect,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BRow,
    BCol,
    BButton,
    BFormTextarea,
    BCardText,
    BFormTags,
    BFormDatepicker,
    BAvatar,
    BBadge,
    BPagination,
    BDropdown,
    BDropdownItem,
    VueGoodTable,
    quillEditor,
  },
  data() {
    return {
      editorOption: {
        modules: {
          toolbar: "#toolbar",
        },
      },
      pageLength: 10,
      columns: [
        {
          label: "ID",
          field: "id",
        },
        {
          label: "Name",
          field: "full_name",
        },
        {
          label: "Email",
          field: "email",
        },
        {
          label: "Phone",
          field: "phone",
        },
      ],
      rows: [],
      searchTerm: "",
      param: this.$route.params.id,
      form: {
        title_en: "",
        title_ar: "",
        details_en: "",
        details_ar: "",
      },
    };
  },
  created() {
    this.$http
      .post("/api/getSubs", { product_id: this.param })
      .then((res) => {
        this.rows = res.data[0].user;
      })
      .catch((err) => console.log(err));
  },
  mounted() {
    axios
      .get(`http://127.0.0.1:8001/api/product/${this.param}`)
      .then((res) => {
        (this.form.title_en = res.data.title_en),
          (this.form.title_ar = res.data.title_ar),
          (this.form.details_en = res.data.details_en),
          (this.form.details_ar = res.data.details_ar),
          (this.form.pic_one = res.data.pic_one);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    updateOffer() {
      axios
        .post("/api/offer/updateOffer", {
          product_id: this.param,
          title_en: this.form.title_en,
          title_ar: this.form.title_ar,
          details_en: this.form.details_en,
          details_ar: this.form.details_ar,
        })
        .then((res) => alert("Offer Updated Successfully"))
        .catch((err) => console.log(err));
    },
    finishOffer() {
      axios
        .post("/api/offer/finishOffer", { product_id: this.param })
        .then(
          (res) => alert("Offer Finished Successfully !"),
          document.location.href("/offer")
        )
        .catch((err) => console.log(err));
    },
    closeOffer() {
      axios
        .post("http://127.0.0.1:8001/api/offer/closeOffer", {
          product_id: this.param,
        })
        .then(
          (res) => alert("Offer Closed Successfully"),
          document.location.href("/offer")
        )
        .catch((err) => console.log(err));
    },
  },
};
</script>
<style>
.ql-container {
  min-height: inherit;
  max-height: 300px;
  overflow-y: scroll;
}
</style>