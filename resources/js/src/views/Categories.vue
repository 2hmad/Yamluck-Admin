<template>
  <div>
    <div class="row">
      <div class="col-lg-2" v-for="cat in cats" :key="cat.id">
        <router-link :to="`editCat/${cat.id}`">
          <div class="card">
            <div class="card-body text-center">
              <img
                :src="`http://anamelctv.com/storage/cats-icons/${cat.icon}`"
                style="max-width: 50px"
              />
              <h5 class="card-title" style="margin: 5px auto">
                {{ cat.title_en }}
              </h5>
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                v-b-modal="`modal-danger-${cat.id}`"
                variant="flat-danger"
                class="btn-icon rounded-circle"
                @click.prevent.stop
              >
                <XIcon size="1.5x" />
              </b-button>
              <b-modal
                :id="`modal-danger-${cat.id}`"
                hide-footer
                modal-class="modal-danger"
                centered
                title="Delete Category"
              >
                <b-card-text>
                  Are you sure you want to delete it ?
                  <br /><br />
                  <form method="POST">
                    <input
                      type="submit"
                      name="delete"
                      class="btn btn-danger"
                      value="Confirm"
                      @click.prevent="DeleteCategory([cat.id])"
                    />
                  </form>
                </b-card-text>
              </b-modal>
            </div>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script>
import { BButton, BModal, VBModal } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import axios from "axios";
import { XIcon } from "vue-feather-icons";
export default {
  components: {
    BButton,
    BModal,
    XIcon,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },

  data() {
    return {
      cats: [],
    };
  },
  mounted() {
    axios
      .get(`/api/categories`)
      .then((result) => (this.cats = result.data))
      .catch((err) => console.log(err));
  },
  methods: {
    DeleteCategory(id) {
      axios
        .post(`/api/categories/delete`, { id: id[0] })
        .then((result) => window.location.reload())
        .catch((err) => console.log(err));
    },
  },
};
</script>
