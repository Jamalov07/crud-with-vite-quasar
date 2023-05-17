import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Products from "../views/Products.vue";
import AddProduct from "../views/AddProduct.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: Home,
    },
    {
      path: "/products",
      component: Products,
    },
    {
      path: "/product/add",
      component: AddProduct,
    },
    // {
    //   path: "/:pathMatch(.*)*",
    //   component: NotFound,
    // },
  ],
});

export default router;
