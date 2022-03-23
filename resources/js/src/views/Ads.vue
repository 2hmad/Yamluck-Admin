<template>
  <div id="app">
    <div class="card">
      <div class="card-body">
        <img
          :src="`http://127.0.0.1:8001/storage/ads/${banner.banner}`"
          style="
            width: 700px;
            height: 200px;
            object-fit: cover;
            margin: 0 auto;
            display: block;
          "
          v-if="banner !== ''"
        />
        <img
          :src="`https://via.placeholder.com/700x200?text=Ad+Preview`"
          style="
            width: 700px;
            height: 200px;
            object-fit: cover;
            margin: 0 auto;
            display: block;
          "
          v-else
        />
        <br />
        <div class="my-2 text-muted">Update Banner</div>
        <hr />
        <b-row>
          <b-col md="6">
            <b-form-group label="Product ID" label-for="product_id">
              <b-form-input
                id="product_id"
                placeholder="Product ID"
                type="number"
                v-model="form.id"
              />
            </b-form-group>
          </b-col>
          <b-col md="6">
            <b-form-group label="Ad Banner" label-for="ad">
              <b-form-file
                id="ad"
                placeholder="Upload Banner"
                v-model="form.banner"
              />
            </b-form-group>
          </b-col>
          <b-button variant="primary" block @click="updateAd">
            Update
          </b-button>
        </b-row>
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
} from "bootstrap-vue";
export default {
  components: {
    BRow,
    BCol,
    BFormInput,
    BFormGroup,
    BFormFile,
    BButton,
  },
  data() {
    return {
      banner: [],
      form: {
        id: null,
        banner: null,
      },
    };
  },
  mounted() {
    axios
      .get("/api/getAd")
      .then((res) => (this.banner = res.data))
      .catch((err) => console.log(err));
  },
  methods: {
    updateAd() {
      let data = new FormData();
      data.append("banner", this.form.banner, this.form.banner.name);
      var details = JSON.stringify({
        product_id: this.form.id,
      });
      data.append("data", details);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      axios
        .post("http://127.0.0.1:8001/api/add-ad", data, config)
        .then((result) => alert("Ad Updated"), window.location.reload())
        .catch((err) => {
          console.log(result);
        });
    },
  },
};
</script>