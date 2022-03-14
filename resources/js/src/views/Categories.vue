<template>
  <div>
    <div class="row">
      <div class="col-lg">
        <div class="card">
          <div class="card-body text-center">
            <img
              src="http://anamelctv.com/storage/cats-icons/ff"
              style="max-width: 50px"
            />
            <h5 class="card-title">ff</h5>
            <a
              href="editCat/ff"
              class="btn btn-primary waves-effect waves-float waves-light"
            >
              Edit
            </a>
            <b-button
              v-ripple.400="'rgba(234, 84, 85, 0.15)'"
              v-b-modal.modal-danger
              variant="danger"
            >
              Delete
            </b-button>
            <b-modal
              id="modal-danger"
              ok-only
              ok-variant="danger"
              ok-title="Confirm"
              modal-class="modal-danger"
              centered
              title="Delete Category"
            >
              <b-card-text>
                Are you sure to delete this category ?
              </b-card-text>
            </b-modal>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { BButton, BModal, VBModal } from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
export default {
  components: {
    BButton,
    BModal,
  },
  directives: {
    "b-modal": VBModal,
    Ripple,
  },

  data() {
    return {
        cats: []
    };
  },
    mounted() {
        
    }
};
</script>
