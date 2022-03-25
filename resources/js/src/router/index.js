import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Login from "@/views/Login.vue";
import Home from "@/views/Home.vue";
import Users from "@/views/Users.vue";
import Activities from "@/views/Activities.vue";
import Categories from "@/views/Categories.vue";
import EditCat from "@/views/EditCat.vue";
import EditSubCat from "@/views/editSubCat.vue";
import Offers from "@/views/Offers.vue";
import editOffer from "@/views/editOffer.vue";
import addOffer from "@/views/AddOffer.vue";
import Payments from "@/views/Payments.vue";
import Ads from "@/views/Ads.vue";
import Notifications from "@/views/Notifications.vue";
import addAdmins from "@/views/addAdmins.vue";
import Error404 from "@/views/error/Error404.vue";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: "/login",
            name: "login",
            component: Login,
            meta: {
                layout: "full",
                guest: true,
            },
        },
        {
            path: "/",
            name: "home",
            component: Home,
            meta: {
                pageTitle: "Dashboard",
                requiresAuth: true,
                breadcrumb: [
                    {
                        text: "Dashboard",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/users",
            name: "users",
            component: Users,
            meta: {
                pageTitle: "Users",
                requiresAuth: true,
                breadcrumb: [
                    {
                        text: "Users",
                        active: true,
                    },
                ],
            },
        },
        {
            path: "/activities",
            name: "activities",
            component: Activities,
            meta: {
                pageTitle: "Activities",
                breadcrumb: [
                    {
                        text: "Activities",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/categories",
            name: "categories",
            component: Categories,
            meta: {
                pageTitle: "Categories",
                breadcrumb: [
                    {
                        text: "Categories",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/editCat/:id",
            name: "editCategories",
            component: EditCat,
            meta: {
                pageTitle: "Edit Category",
                breadcrumb: [
                    {
                        text: "Edit Category",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/editSubCat/:id",
            name: "editSubCategories",
            component: EditSubCat,
            meta: {
                pageTitle: "Edit SubCategory",
                breadcrumb: [
                    {
                        text: "Edit SubCategory",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/offers",
            name: "offers",
            component: Offers,
            meta: {
                pageTitle: "Offers",
                breadcrumb: [
                    {
                        text: "Offers",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/editOffer/:id",
            name: "editOffer",
            component: editOffer,
            meta: {
                pageTitle: "Edit Offer",
                breadcrumb: [
                    {
                        text: "Edit Offer",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/addOffer",
            name: "addOffer",
            component: addOffer,
            meta: {
                pageTitle: "Add Offer",
                breadcrumb: [
                    {
                        text: "Add Offer",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/payments",
            name: "payments",
            component: Payments,
            meta: {
                pageTitle: "Payments Invoices",
                breadcrumb: [
                    {
                        text: "Payments Invoices",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/ads",
            name: "ads",
            component: Ads,
            meta: {
                pageTitle: "Ads",
                breadcrumb: [
                    {
                        text: "Ads",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/notifications",
            name: "notifications",
            component: Notifications,
            meta: {
                pageTitle: "Notifications",
                breadcrumb: [
                    {
                        text: "Notifications",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/add-admins",
            name: "add-admins",
            component: addAdmins,
            meta: {
                pageTitle: "Add Admins",
                breadcrumb: [
                    {
                        text: "Add Admins",
                        active: true,
                    },
                ],
                requiresAuth: true,
            },
        },
        {
            path: "/error-404",
            name: "error-404",
            component: Error404,
            meta: {
                layout: "full",
            },
        },
        {
            path: "*",
            redirect: "error-404",
        },
    ],
});

router.afterEach(() => {
    const appLoading = document.getElementById("loading-bg");
    if (appLoading) {
        appLoading.style.display = "none";
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.guest)) {
        if (store.getters.isAuthenticated) {
            next("/");
            return;
        }
        next();
    } else {
        next();
    }
});

export default router;
