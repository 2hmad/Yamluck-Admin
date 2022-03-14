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
          ok-only
          ok-variant="primary"
          ok-title="Confirm"
          modal-class="modal-primary"
          centered
          title="Delete Category"
        >
          <b-card-text> Are you sure to delete this category ? </b-card-text>
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
} from "bootstrap-vue";
import Ripple from "vue-ripple-directive";
import { PlusIcon } from "vue-feather-icons";
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
    PlusIcon,
  },
};
</script>
