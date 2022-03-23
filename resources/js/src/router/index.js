import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

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
            component: () => import("@/views/Login.vue"),
            meta: {
                layout: "full",
                guest: true,
            },
        },
        {
            path: "/",
            name: "home",
            component: () => import("@/views/Home.vue"),
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
            component: () => import("@/views/Users.vue"),
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
            component: () => import("@/views/Activities.vue"),
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
            component: () => import("@/views/Categories.vue"),
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
            component: () => import("@/views/EditCat.vue"),
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
            component: () => import("@/views/EditSubCat.vue"),
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
            component: () => import("@/views/Offers.vue"),
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
            component: () => import("@/views/editOffer.vue"),
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
            component: () => import("@/views/addOffer.vue"),
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
            component: () => import("@/views/Payments.vue"),
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
            component: () => import("@/views/Ads.vue"),
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
            component: () => import("@/views/Notifications.vue"),
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
            component: () => import("@/views/addAdmins.vue"),
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
            component: () => import("@/views/error/Error404.vue"),
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
