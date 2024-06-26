import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      redirect: "/dashboard",
      component: () => import("@/view/layout/Layout"),
      children: [
        {
          path: "/dashboard",
          name: "dashboard",
          component: () => import("@/view/pages/Dashboard.vue"),
          meta: { requiresAuth: true }
        },
        {
          path: "/disputes",
          name: "disputes",
          component: () => import("@/view/pages/disputes/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/disputes/:id",
          name: "disputes-view",
          component: () => import("@/view/pages/disputes/View"),
          meta: { requiresAuth: true }
        },
        {
          path: "/services-categories",
          name: "services-categories",
          component: () => import("@/view/pages/services/categories/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/services-categories/create",
          name: "services-categories-create",
          component: () => import("@/view/pages/services/categories/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/services-categories/:id/edit",
          name: "services-categories-edit",
          component: () => import("@/view/pages/services/categories/Edit"),
          meta: { requiresAuth: true }
        },
        {
          path: "/services",
          name: "services",
          component: () => import("@/view/pages/services/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/services/:id",
          name: "services-view",
          component: () => import("@/view/pages/services/view"),
          meta: { requiresAuth: true }
        },
        {
          path: "/refunds",
          name: "refunds",
          component: () => import("@/view/pages/refunds/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/refund-ways",
          name: "refund-ways",
          component: () => import("@/view/pages/refunds/ways/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/refund-ways/create",
          name: "refund-ways-create",
          component: () => import("@/view/pages/refunds/ways/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/refund-ways/:id/edit",
          name: "refund-ways-edit",
          component: () => import("@/view/pages/refunds/ways/Edit"),
          meta: { requiresAuth: true }
        },
        {
          path: "/parameters",
          name: "parameters",
          component: () => import("@/view/pages/parameters/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/parameters/:id/edit",
          name: "parameters-edit",
          component: () => import("@/view/pages/parameters/Edit"),
          meta: { requiresAuth: true }
        },
        {
          path: "/accounts",
          name: "accounts",
          component: () => import("@/view/pages/accounts/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/accounts/:id",
          name: "accounts-view",
          component: () => import("@/view/pages/accounts/View"),
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      name: "signin",
      path: "/login",
      component: () => import("@/view/pages/auth/Login")
    },
    {
      path: "/error",
      name: "error",
      component: () => import("@/view/pages/error/Error.vue"),
      children: [
        {
          path: "error-1",
          name: "error-1",
          component: () => import("@/view/pages/error/Error-1.vue")
        },
        {
          path: "error-2",
          name: "error-2",
          component: () => import("@/view/pages/error/Error-2.vue")
        },
        {
          path: "error-3",
          name: "error-3",
          component: () => import("@/view/pages/error/Error-3.vue")
        },
        {
          path: "error-4",
          name: "error-4",
          component: () => import("@/view/pages/error/Error-4.vue")
        },
        {
          path: "error-5",
          name: "error-5",
          component: () => import("@/view/pages/error/Error-5.vue")
        },
        {
          path: "error-6",
          name: "error-6",
          component: () => import("@/view/pages/error/Error-6.vue")
        }
      ]
    },
    {
      path: "*",
      redirect: "/404"
    },
    {
      // the 404 route, when none of the above matches
      path: "/404",
      name: "404",
      component: () => import("@/view/pages/error/Error-1.vue")
    }
  ]
});
