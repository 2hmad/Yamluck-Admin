<template>
  <div id="app">
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
                  <b-dropdown-item
                    :href="`http://127.0.0.1:8001/invoice/${props.row.invoice_id}`"
                    target="_blank"
                  >
                    <feather-icon icon="PrinterIcon" class="mr-50" />
                    <span>Export</span>
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
import { VueGoodTable } from "vue-good-table";
import "vue-good-table/dist/vue-good-table.css";
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
export default {
  components: {
    VueGoodTable,
    BPagination,
    BDropdown,
    BDropdownItem,
    BAvatar,
    BBadge,
    BFormGroup,
    BFormInput,
    BFormSelect,
  },
  data() {
    return {
      pageLength: 20,
      dir: false,
      columns: [
        {
          label: "User ID",
          field: "user_id",
        },
        {
          label: "Invoice ID",
          field: "invoice_id",
        },
        {
          label: "Bill To",
          field: "bill_to",
        },
        {
          label: "Date",
          field: "order_date",
        },
        {
          label: "Action",
          field: "action",
        },
      ],
      rows: [],
      searchTerm: "",
    };
  },
  created() {
    this.$http.get("/api/invoices").then((res) => {
      this.rows = res.data;
    });
  },
  mounted() {},
};
</script>