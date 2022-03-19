<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >
    <!-- Content Left -->
    <b-col class="content-header-left mb-2" cols="12" md="9">
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      class="content-header-right text-md-right d-md-block d-none mb-1"
      md="3"
      cols="12"
    >
      <div v-if="this.$route.name == 'categories'">
        <b-button
          v-b-modal.modal-primary
          variant="primary"
          class="btn-icon rounded-circle"
        >
          <PlusIcon size="1.2x" />
        </b-button>
        <b-modal
          id="modal-primary"
          modal-class="modal-primary"
          centered
          title="Add Category"
          hide-footer
        >
          <b-card-text>
            <b-form enctype="multipart/form-data" @submit.prevent="addCategory">
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    label="Category name (English)"
                    label-for="v-cat-name-en"
                  >
                    <b-form-input
                      id="v-cat-name-en"
                      placeholder="Category name (English)"
                      required
                      v-model="form.catEnglish"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group
                    label="Category name (Arabic)"
                    label-for="v-cat-name-ar"
                  >
                    <b-form-input
                      id="v-cat-name-ar"
                      type="text"
                      placeholder="Category name (Arabic)"
                      required
                      v-model="form.catArabic"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group label="Category Icon" label-for="v-cat-icon">
                    <b-form-file
                      accept=".svg"
                      name="catIcon"
                      required
                      @change="categoryIcon"
                    />
                  </b-form-group>
                </b-col>
                <b-col offset-md="4">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mr-1"
                  >
                    Add
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-secondary"
                  >
                    Reset
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card-text>
        </b-modal>
      </div>

      <div v-else-if="this.$route.name == 'editCategories'">
        <b-button
          v-b-modal.modal-primary
          variant="primary"
          class="btn-icon rounded-circle"
        >
          <PlusIcon size="1.2x" />
        </b-button>
        <b-modal
          id="modal-primary"
          modal-class="modal-primary"
          centered
          title="Add Subcategory"
          hide-footer
        >
          <b-card-text>
            <b-form @submit.prevent="addSubCategory">
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    label="Sub Category name (English)"
                    label-for="v-cat-name-en"
                  >
                    <b-form-input
                      id="v-cat-name-en"
                      placeholder="Sub Category name (English)"
                      required
                      v-model="subCatEnglish"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group
                    label="Sub Category name (Arabic)"
                    label-for="v-cat-name-ar"
                  >
                    <b-form-input
                      id="v-cat-name-ar"
                      type="text"
                      placeholder="Sub Category name (Arabic)"
                      required
                      v-model="subCatArabic"
                    />
                  </b-form-group>
                </b-col>
                <b-col offset-md="4">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mr-1"
                  >
                    Add
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-secondary"
                  >
                    Reset
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card-text>
        </b-modal>
      </div>

      <div v-else-if="this.$route.name == 'editSubCategories'">
        <b-button
          v-b-modal.modal-primary
          variant="primary"
          class="btn-icon rounded-circle"
        >
          <PlusIcon size="1.2x" />
        </b-button>
        <b-modal
          id="modal-primary"
          modal-class="modal-primary"
          centered
          title="Add Sub Subcategory"
          hide-footer
        >
          <b-card-text>
            <b-form @submit.prevent="addSubSubCategory">
              <b-row>
                <b-col cols="12">
                  <b-form-group
                    label="Sub Subcategory name (English)"
                    label-for="v-cat-name-en"
                  >
                    <b-form-input
                      id="v-cat-name-en"
                      placeholder="Sub Subcategory name (English)"
                      required
                      v-model="subSubCatEnglish"
                    />
                  </b-form-group>
                </b-col>
                <b-col cols="12">
                  <b-form-group
                    label="Sub Subcategory name (Arabic)"
                    label-for="v-cat-name-ar"
                  >
                    <b-form-input
                      id="v-cat-name-ar"
                      type="text"
                      placeholder="Sub Subcategory name (Arabic)"
                      required
                      v-model="subSubCatArabic"
                    />
                  </b-form-group>
                </b-col>
                <b-col offset-md="4">
                  <b-button
                    v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                    type="submit"
                    variant="primary"
                    class="mr-1"
                  >
                    Add
                  </b-button>
                  <b-button
                    v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                    type="reset"
                    variant="outline-secondary"
                  >
                    Reset
                  </b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-card-text>
        </b-modal>
      </div>
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb,
  BBreadcrumbItem,
  BRow,
  BCol,
  BDropdown,
  BDropdownItem,
  BButton,
  BFormGroup,
  BFormInput,
  BForm,
  BFormFile,
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { PlusIcon } from "vue-feather-icons";
import axios from "axios";
export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
    BFormGroup,
    BFormInput,
    BForm,
    BFormFile,
    PlusIcon,
  },
  data() {
    return {
      subCatEnglish: "",
      subCatArabic: "",
      subSubCatEnglish: "",
      subSubCatArabic: "",
      form: {
        catEnglish: "",
        catArabic: "",
        catIcon: null,
      },
    };
  },
  methods: {
    categoryIcon(e) {
      this.form.catIcon = e.target.files[0];
    },
    addCategory() {
      let data = new FormData();
      data.append("catIcon", this.form.catIcon, this.form.catIcon.name);
      var details = JSON.stringify({
        catEnglish: this.form.catEnglish,
        catArabic: this.form.catArabic,
      });
      data.append("data", details);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post("http://127.0.0.1:8001/api/add-category", data, config)
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(result);
        });
    },
    addSubCategory() {
      axios
        .post("http://127.0.0.1:8001/api/add-subcategory", {
          subCatEnglish: this.subCatEnglish,
          subCatArabic: this.subCatArabic,
          catID: this.$route.params.id,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(result);
        });
    },
    addSubSubCategory() {
      axios
        .post("http://127.0.0.1:8001/api/add-subsubcategory", {
          subSubCatEnglish: this.subSubCatEnglish,
          subSubCatArabic: this.subSubCatArabic,
          subCatID: this.$route.params.id,
        })
        .then((result) => {
          console.log(result);
        })
        .catch((err) => {
          console.log(result);
        });
    },
  },
};
</script>
