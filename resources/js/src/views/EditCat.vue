<template>
  <div>
    <div class="card">
      <div class="list-group list-group-flush">
        <router-link
          :to="`/editSubCat/${subCat.id}`"
          v-for="subCat in subCats"
          :key="subCat.id"
        >
          <div class="list-group-item">
            <div
              style="
                display: flex;
                justify-content: space-between;
                align-items: center;
                color: #6e6b7b;
              "
            >
              {{ subCat.title_en }}
              <b-button
                v-ripple.400="'rgba(234, 84, 85, 0.15)'"
                v-b-modal="`modal-danger-${subCat.id}`"
                variant="flat-danger"
                class="btn-icon rounded-circle"
                @click.prevent.stop
              >
                <XIcon size="1x" />
              </b-button>
              <b-modal
                :id="`modal-danger-${subCat.id}`"
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
                      @click.prevent="DeleteCategory([subCat.id])"
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
      subCats: [],
    };
  },
  mounted() {
    axios
      .post(`/api/subCat/`, { catId: this.$route.params.id })
      .then((result) => (this.subCats = result.data))
      .catch((err) => console.log(err));
  },
  methods: {
    DeleteCategory(id) {
      axios
        .post(`/api/subCat/delete`, { id: id[0] })
        .then((result) => window.location.reload())
        .catch((err) => console.log(err));
    },
  },
};
</script>
