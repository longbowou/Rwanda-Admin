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
          path: "/categories",
          name: "categories",
          component: () => import("@/view/pages/categories/Datatable"),
          meta: { requiresAuth: true }
        },
        {
          path: "/categories/category-create",
          name: "category-create",
          component: () => import("@/view/pages/categories/Create"),
          meta: { requiresAuth: true }
        },
        {
          path: "/categories/:id/category-edit",
          name: "category-edit",
          component: () => import("@/view/pages/categories/Edit"),
          meta: { requiresAuth: true }
        },

        {
          path: "/services",
          name: "services",
          component: () => import("@/view/pages/services/datatable"),
          meta: { requiresAuth: true }
        },

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
