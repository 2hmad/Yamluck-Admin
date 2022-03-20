<template>
  <div id="app">
    <div class="card">
      <!----><!---->
      <div class="card-body">
        <!----><!---->
        <div class="row my-2">
          <div
            class="
              d-flex
              align-items-center
              justify-content-center
              mb-2 mb-md-0
              col-md-5 col-12
            "
          >
            <div class="d-flex align-items-center justify-content-center">
              <img
                src="/demo/vuexy-vuejs-laravel-admin-template/demo-1/images/pages/eCommerce/1.png"
                alt="Image of Apple Watch Series 5"
                class="product-img img-fluid"
              />
            </div>
          </div>
          <div class="col-md-7 col-12">
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
              <a href="#" target="_self" class="company-name"> Link Preview </a>
            </p>
            <p></p>
            <p class="card-text">
              <b-form-textarea
                id="textarea-default"
                rows="4"
                value="On Retina display that never sleeps, so it’s easy to see the time"
                placeholder="Details"
                v-model="form.details_en"
              ></b-form-textarea>
              <b-form-textarea
                id="textarea-default"
                rows="4"
                value="On Retina display that never sleeps, so it’s easy to see the time"
                placeholder="Details (Arabic)"
                v-model="form.details_ar"
              ></b-form-textarea>
            </p>
            <div class="d-flex flex-column flex-sm-row pt-1">
              <button
                type="button"
                class="btn btn-cart mr-0 mr-sm-1 mb-1 mb-sm-0 btn-primary"
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
              >
                <span>Finish Offer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- table search -->
    <div class="custom-search d-flex justify-content-end">
      <b-form-group>
        <div class="d-flex align-items-center">
          <label class="mr-1">Search</label>
          <b-form-input
            v-model="searchTerm"
            placeholder="Search"
            type="text"
            class="d-inline-block"
          />
        </div>
      </b-form-group>
    </div>

    <!-- table -->
    <vue-good-table
      :columns="columns"
      :rows="rows"
      :search-options="{
        enabled: true,
        externalQuery: searchTerm,
      }"
      :select-options="{
        enabled: true,
        selectOnCheckboxOnly: true, // only select when checkbox is clicked instead of the row
        selectionInfoClass: 'custom-class',
        selectionText: 'rows selected',
        clearSelectionText: 'clear',
        disableSelectInfo: true, // disable the select info panel on top
        selectAllByGroup: true, // when used in combination with a grouped table, add a checkbox in the header row to check/uncheck the entire group
      }"
      :pagination-options="{
        enabled: true,
        perPage: pageLength,
      }"
    >
      <template slot="table-row" slot-scope="props">
        <!-- Column: Name -->
        <span v-if="props.column.field === 'fullName'" class="text-nowrap">
          <b-avatar :src="props.row.avatar" class="mx-1" />
          <span class="text-nowrap">{{ props.row.fullName }}</span>
        </span>

        <!-- Column: Common -->
        <span v-else>
          {{ props.formattedRow[props.column.field] }}
        </span>
      </template>

      <!-- pagination -->
      <template slot="pagination-bottom" slot-scope="props">
        <div class="d-flex justify-content-between flex-wrap">
          <div class="d-flex align-items-center mb-0 mt-1">
            <span class="text-nowrap"> Showing 1 to </span>
            <b-form-select
              v-model="pageLength"
              :options="['3', '5', '10', '20']"
              class="mx-1"
              @input="
                (value) => props.perPageChanged({ currentPerPage: value })
              "
            />
            <span class="text-nowrap"> of {{ props.total }} entries </span>
          </div>
          <div>
            <b-pagination
              :value="1"
              :total-rows="props.total"
              :per-page="pageLength"
              first-number
              last-number
              align="right"
              prev-class="prev-item"
              next-class="next-item"
              class="mt-1 mb-0"
              @input="(value) => props.pageChanged({ currentPage: value })"
            >
              <template #prev-text>
                <feather-icon icon="ChevronLeftIcon" size="18" />
              </template>
              <template #next-text>
                <feather-icon icon="ChevronRightIcon" size="18" />
              </template>
            </b-pagination>
          </div>
        </div>
      </template>
    </vue-good-table>
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
  },
  data() {
    return {
      pageLength: 10,
      columns: [
        {
          label: "Name",
          field: "fullName",
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
          (this.form.details_ar = res.data.details_ar);
      })
      .catch((err) => console.log(err));
  },
};
</script>