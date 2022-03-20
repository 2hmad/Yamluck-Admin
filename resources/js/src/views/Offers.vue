<template>
  <div id="app">
    <div class="row">
      <div class="col-lg">
        <div class="card">
          <div
            class="card-body d-flex align-items-center justify-content-between"
          >
            <div>
              <h3 class="fw-bolder mb-75">{{ totalOffers }}</h3>
              <span>Total Offers</span>
            </div>
            <div class="avatar bg-light-primary p-50">
              <span class="avatar-content">
                <ShoppingCartIcon size="1.8x" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg">
        <div class="card">
          <div
            class="card-body d-flex align-items-center justify-content-between"
          >
            <div>
              <h3 class="fw-bolder mb-75">{{ openOffers }}</h3>
              <span>Open Offers</span>
            </div>
            <div class="avatar bg-light-success p-50">
              <span class="avatar-content">
                <ShoppingCartIcon size="1.8x" />
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg">
        <div class="card">
          <div
            class="card-body d-flex align-items-center justify-content-between"
          >
            <div>
              <h3 class="fw-bolder mb-75">{{ closedOffers }}</h3>
              <span>Closed Offers</span>
            </div>
            <div class="avatar bg-light-warning p-50">
              <span class="avatar-content">
                <ShoppingCartIcon size="1.8x" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Offers -->
    <b-input-group style="margin-bottom: 1%">
      <b-input-group-prepend>
        <b-button variant="outline-primary">
          <feather-icon icon="SearchIcon" />
        </b-button>
      </b-input-group-prepend>
      <b-form-input placeholder="Search" />
    </b-input-group>

    <div class="row">
      <div class="col-md-6 col-lg-4" v-for="item in items" :key="item.id">
        <div class="card">
          <img
            :src="`http://anamelctv.com/storage/products/product_id_${item.id}/${item.pic_one}`"
            class="card-img-top"
            style="
              max-width: 150px;
              height: 150px;
              margin: 0 auto;
              object-fit: contain;
            "
          />
          <div class="card-body">
            <h4 class="card-title">{{ item.title_en }}</h4>
            <h6 class="card-subtitle text-muted mb-2">
              {{ item.price }} USD | <UsersIcon size="1.1x" />
              {{ item.curr_subs }}
              /
              {{ item.max_subs }}
            </h6>
            <p
              class="card-text"
              style="
                display: -webkit-box;
                -webkit-line-clamp: 3;
                -webkit-box-orient: vertical;
                overflow: hidden;
                text-overflow: ellipsis;
              "
            >
              {{ item.details_en }}
            </p>
          </div>
          <a :href="`editOffer/${item.id}`">
            <button class="btn btn-primary" style="width: 100%">Edit</button>
          </a>
        </div>
      </div>
    </div>
    <b-pagination
      v-model="currentPage"
      :total-rows="totalRows"
      :per-page="perPage"
      align="center"
      first-number
      last-number
      prev-class="prev-item"
      next-class="next-item"
    >
      <template #prev-text>
        <feather-icon icon="ChevronLeftIcon" size="18" />
      </template>
      <template #next-text>
        <feather-icon icon="ChevronRightIcon" size="18" />
      </template>
    </b-pagination>
  </div>
</template>
<script>
import {
  UsersIcon,
  UserCheckIcon,
  UserXIcon,
  ShoppingCartIcon,
} from "vue-feather-icons";
import {
  BAvatar,
  BBadge,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
  BPagination,
  BInputGroup,
  BInputGroupAppend,
  BInputGroupPrepend,
  BRow,
  BCol,
  BButton,
} from "bootstrap-vue";
import axios from "axios";
export default {
  components: {
    UsersIcon,
    UserCheckIcon,
    UserXIcon,
    BAvatar,
    BBadge,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
    BPagination,
    ShoppingCartIcon,
    BInputGroup,
    BInputGroupAppend,
    BInputGroupPrepend,
    BRow,
    BCol,
    BButton,
  },
  data() {
    return {
      data: [],
      currentPage: 1,
      perPage: 21,
      totalOffers: 0,
      openOffers: 0,
      closedOffers: 0,
      param: this.$route.params.id,
    };
  },
  mounted() {
    axios
      .get("/api/offers")
      .then((res) => (this.data = res.data))
      .catch((err) => console.log(err));
    // axios
    //   .get("/api/users/getTotalUsers")
    //   .then((res) => (this.totalUsers = res.data))
    //   .catch((err) => console.log(err));
    // axios
    //   .get("/api/users/getActiveUsers")
    //   .then((res) => (this.activeUsers = res.data))
    //   .catch((err) => console.log(err));
    // axios
    //   .get("/api/users/getPendingUsers")
    //   .then((res) => (this.pendingUsers = res.data))
    //   .catch((err) => console.log(err));
  },
  computed: {
    items() {
      const items = this.data;
      return items.slice(
        (this.currentPage - 1) * this.perPage,
        this.currentPage * this.perPage
      );
    },
    totalRows() {
      return this.data.length;
    },
  },
};
</script>
