import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    scrollBehavior() {
        return { x: 0, y: 0 };
    },
    routes: [
        {
            path: "/",
            name: "home",
            component: () => import("@/views/Home.vue"),
            meta: {
                pageTitle: "Dashboard",
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
            },
        },
        {
            path: "/login",
            name: "login",
            component: () => import("@/views/Login.vue"),
            meta: {
                layout: "full",
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

// ? For splash screen
// Remove afterEach hook if you are not using splash screen
router.afterEach(() => {
    // Remove initial loading
    const appLoading = document.getElementById("loading-bg");
    if (appLoading) {
        appLoading.style.display = "none";
    }
});

export default router;
