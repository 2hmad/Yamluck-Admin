<template>
  <div>
    <div class="row">
      <div class="col-lg">
        <div class="card">
          <div
            class="card-body d-flex align-items-center justify-content-between"
          >
            <div>
              <h3 class="fw-bolder mb-75">{{ totalUsers }}</h3>
              <span>Total Users</span>
            </div>
            <div class="avatar bg-light-primary p-50">
              <span class="avatar-content"> <UsersIcon size="1.8x" /> </span>
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
              <h3 class="fw-bolder mb-75">{{ activeUsers }}</h3>
              <span>Active Users</span>
            </div>
            <div class="avatar bg-light-success p-50">
              <span class="avatar-content">
                <UserCheckIcon size="1.8x" />
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
              <h3 class="fw-bolder mb-75">{{ pendingUsers }}</h3>
              <span>Pending Users</span>
            </div>
            <div class="avatar bg-light-warning p-50">
              <span class="avatar-content">
                <UserXIcon size="1.8x" />
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <div class="card-body">
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
          :rtl="direction"
          :search-options="{
            enabled: true,
            externalQuery: searchTerm,
          }"
          :select-options="{
            enabled: true,
            selectOnCheckboxOnly: true,
            selectionInfoClass: 'custom-class',
            selectionText: 'rows selected',
            clearSelectionText: 'clear',
            disableSelectInfo: true,
            selectAllByGroup: true,
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

            <!-- Column: Action -->
            <span v-else-if="props.column.field === 'action'">
              <span>
                <b-dropdown
                  variant="link"
                  toggle-class="text-decoration-none"
                  no-caret
                >
                  <template v-slot:button-content>
                    <feather-icon
                      icon="MoreVerticalIcon"
                      size="16"
                      class="text-body align-middle mr-25"
                    />
                  </template>
                  <b-dropdown-item>
                    <feather-icon icon="Edit2Icon" class="mr-50" />
                    <span>Edit</span>
                  </b-dropdown-item>
                  <b-dropdown-item>
                    <feather-icon icon="TrashIcon" class="mr-50" />
                    <span>Delete</span>
                  </b-dropdown-item>
                </b-dropdown>
              </span>
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
                  :options="['3', '5', '10', '25', '50', '100']"
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
    </div>
  </div>
</template>
<script>
import { UsersIcon, UserCheckIcon, UserXIcon } from "vue-feather-icons";
import {
  BAvatar,
  BBadge,
  BPagination,
  BFormGroup,
  BFormInput,
  BFormSelect,
  BDropdown,
  BDropdownItem,
} from "bootstrap-vue";
import { VueGoodTable } from "vue-good-table";
import store from "@/store/index";
import "vue-good-table/dist/vue-good-table.css";
import axios from "axios";
export default {
  components: {
    UsersIcon,
    UserCheckIcon,
    UserXIcon,
    VueGoodTable,
    BAvatar,
    BBadge,
    BPagination,
    BFormGroup,
    BFormInput,
    BFormSelect,
    BDropdown,
    BDropdownItem,
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      columns: [
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
        {
          label: "Birthdate",
          field: "birthdate",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [],
      searchTerm: "",
      totalUsers: null,
      activeUsers: null,
      pendingUsers: null,
    };
  },
  computed: {
    direction() {
      if (store.state.appConfig.isRTL) {
        this.dir = true;
        return this.dir;
      }
      this.dir = false;
      return this.dir;
    },
  },
  created() {
    this.$http.get("/api/users").then((res) => {
      this.rows = res.data;
    });
  },
  mounted() {
    axios
      .get("/api/users/getTotalUsers")
      .then((res) => (this.totalUsers = res.data))
      .catch((err) => console.log(err));
    axios
      .get("/api/users/getActiveUsers")
      .then((res) => (this.activeUsers = res.data))
      .catch((err) => console.log(err));
    axios
      .get("/api/users/getPendingUsers")
      .then((res) => (this.pendingUsers = res.data))
      .catch((err) => console.log(err));
  },
};
</script>
