import axios from "../../service/axios";

export const products = {
  state: () => ({
    products: [],
    //
    newProduct: null,
    producttypes: [],
  }),
  mutations: {
    set_products(state: any, value: []) {
      // console.log(1, value);
      state.products = value;
    },
    set_product_types(state: any, value: []) {
      state.producttypes = value;
    },
  },
  actions: {
    async getProducts(context: any) {
      try {
        const response = await axios.get("product");
        // console.log(response);
        context.state.products = [];
        context.commit("set_products", response.data);
      } catch (error) {
        console.log(error);
        context.commit("set_products", []);
      }
    },
    async addProduct(context: any, options: any) {
      try {
        const response = await axios.post("product", options);
        // console.log(response);
      } catch (error) {}
    },
  },
};
