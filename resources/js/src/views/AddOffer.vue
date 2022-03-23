<template>
  <div id="app">
    <div class="card">
      <div class="card-body">
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="Title (English)" label-for="title-english">
              <b-form-input
                id="title-english"
                placeholder="Title (English)"
                v-model="form.title_en"
              />
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Title (Arabic)" label-for="title-arabic">
              <b-form-input
                id="title-arabic"
                placeholder="Title (Arabic)"
                v-model="form.title_ar"
              />
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="Price" label-for="price">
              <b-input-group prepend="$">
                <b-form-input
                  id="price"
                  placeholder="Price"
                  type="number"
                  v-model="form.price"
                />
              </b-input-group>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Max Participants" label-for="participants">
              <b-form-input
                id="participants"
                placeholder="Participants"
                type="number"
                v-model="form.participants"
              />
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="Start Date" label-for="start-date">
              <flat-pickr v-model="form.start_date" class="form-control" />
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="End Date" label-for="end-date">
              <flat-pickr v-model="form.end_date" class="form-control" />
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-form-group label="Details (English)" label-for="details-english">
              <b-form-textarea
                id="details-english"
                rows="4"
                placeholder="Details (English)"
                v-model="form.details_en"
              ></b-form-textarea>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group label="Details (Arabic)" label-for="details-arabic">
              <b-form-textarea
                id="details-arabic"
                rows="4"
                placeholder="Details (Arabic)"
                v-model="form.details_ar"
              ></b-form-textarea>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <b-form-group label="Category">
              <b-form-select
                v-model="form.category"
                @change="getSubCats(form.category)"
                label="Categories"
              >
                <option v-for="cat in cats" :key="cat.id" :value="cat.id">
                  {{ cat.title_en }}
                </option>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group label="Subcategory">
              <b-form-select
                v-model="form.subCategory"
                label="Sub Categories"
                @change="getSubSubCats(form.subCategory)"
              >
                <option
                  v-for="subCat in subCats"
                  :key="subCat.id"
                  :value="subCat.id"
                >
                  {{ subCat.title_en }}
                </option>
              </b-form-select>
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group label="Sub-Subcategory">
              <b-form-select
                v-model="form.subSubCategory"
                label="Sub SubCategories"
              >
                <option
                  v-for="subSubCat in subSubCats"
                  :key="subSubCat.id"
                  :value="subSubCat.id"
                >
                  {{ subSubCat.title_en }}
                </option>
              </b-form-select>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6">
            <b-form-group
              label="Conditions (English)"
              label-for="conditions-english"
            >
              <b-form-tags
                id="conditions-english"
                placeholder="Conditions (English)"
                v-model="form.conditions_en"
                separator=" ,;"
              ></b-form-tags>
            </b-form-group>
          </div>
          <div class="col-md-6">
            <b-form-group
              label="Conditions (Arabic)"
              label-for="conditions-arabic"
            >
              <b-form-tags
                id="conditions-arabic"
                placeholder="Conditions (Arabic)"
                v-model="form.conditions_ar"
                separator=" ,;"
              ></b-form-tags>
            </b-form-group>
          </div>
        </div>
        <div class="row">
          <div class="col-md-4">
            <b-form-group label="First Pic">
              <b-form-file
                v-model="form.pic_one"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                @change="picOne"
                accept="image/jpg, image/png, image/jpeg"
                required
              />
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group label="Second Pic">
              <b-form-file
                v-model="form.pic_two"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                @change="picTwo"
                accept="image/jpg, image/png, image/jpeg"
              />
            </b-form-group>
          </div>
          <div class="col-md-4">
            <b-form-group label="Third Pic">
              <b-form-file
                v-model="form.pic_three"
                placeholder="Choose a file or drop it here..."
                drop-placeholder="Drop file here..."
                @change="picThree"
                accept="image/jpg, image/png, image/jpeg"
              />
            </b-form-group>
          </div>
        </div>
        <b-button variant="primary" block @click="addOffer">
          Add Offer
        </b-button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  BAvatar,
  BBadge,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BInputGroup,
  BRow,
  BCol,
  BButton,
  BFormTextarea,
  BFormTags,
  BFormFile,
} from "bootstrap-vue";
import flatPickr from "vue-flatpickr-component";
import "@core/scss/vue/libs/vue-flatpicker.scss";
import axios from "axios";
export default {
  components: {
    BAvatar,
    BBadge,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BInputGroup,
    BRow,
    BCol,
    BButton,
    BFormTextarea,
    flatPickr,
    BFormTags,
    BFormFile,
  },
  data() {
    return {
      cats: [],
      subCats: [],
      subSubCats: [],
      form: {
        title_en: "",
        title_ar: "",
        price: null,
        participants: null,
        start_date: null,
        end_date: null,
        details_en: "",
        details_ar: "",
        category: null,
        subCategory: null,
        subSubCategory: null,
        conditions_en: "",
        conditions_ar: "",
        pic_one: null,
        pic_two: null,
        pic_three: null,
      },
    };
  },
  created() {
    this.$http
      .get("/api/categories")
      .then((result) => (this.cats = result.data))
      .catch((err) => console.log(err));
  },
  methods: {
    getSubCats(e) {
      this.$http
        .post("/api/subCat", { catId: e })
        .then((result) => (this.subCats = result.data))
        .catch((err) => console.log(err));
    },
    getSubSubCats(e) {
      this.$http
        .post("/api/subSubCat", { subCatId: e })
        .then((result) => (this.subSubCats = result.data))
        .catch((err) => console.log(err));
    },
    picOne(e) {
      this.form.pic_one = e.target.files[0];
    },
    picTwo(e) {
      this.form.pic_two = e.target.files[0];
    },
    picThree(e) {
      this.form.pic_three = e.target.files[0];
    },
    addOffer() {
      let data = new FormData();
      if (this.form.pic_one !== "") {
        data.append("pic_one", this.form.pic_one, this.form.pic_one.name);
        if (this.form.pic_two !== "") {
          data.append("pic_two", this.form.pic_two, this.form.pic_two.name);
        }
        if (this.form.pic_three !== "") {
          data.append(
            "pic_three",
            this.form.pic_three,
            this.form.pic_three.name
          );
        }
        var details = JSON.stringify({
          title_en: this.form.title_en,
          title_ar: this.form.title_ar,
          price: this.form.price,
          participants: this.form.participants,
          start_date: this.form.start_date,
          end_date: this.form.end_date,
          details_en: this.form.details_en,
          details_ar: this.form.details_ar,
          category: this.form.category,
          subCategory: this.form.subCategory,
          subSubCategory: this.form.subSubCategory,
          conditions_en: this.form.conditions_en,
          conditions_ar: this.form.conditions_ar,
        });
        data.append("data", details);
        const config = {
          headers: {
            "content-type": "multipart/form-data",
          },
        };
        axios
          .post("http://127.0.0.1:8001/api/add-offer", data, config)
          .then((result) => alert("Product added successfully"))
          .catch((err) => {
            console.log(result);
          });
      }
    },
  },
};
</script>
<style>
</style>