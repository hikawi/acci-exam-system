import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "ACCI | Home",
      component: HomeView,
    },
  ],
});

// Change the page title on navigation.
router.beforeEach((to, from, next) => {
  document.title = to.name?.toString() || "ACCI | Undefined";
  next();
});

export default router;
