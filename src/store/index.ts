// store.ts
import { InjectionKey } from "vue";
import { createStore, Store } from "vuex";
import { products } from "./product/products";
import { producttypes } from "./product/product_types";
import { editproducts } from "./product/edit_product";
import { deleteproducts } from "./product/delete_product";
// define your typings for the store state
export interface State {
  count: number;
}

// define injection key
export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore({
  modules: {
    products,
    producttypes,
    editproducts,
    deleteproducts
  },
});
