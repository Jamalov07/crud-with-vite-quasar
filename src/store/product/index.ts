import axios from "../../service/axios";

export const products = {
  state: () => ({
    products: [],
    //
    newProduct: null,
  }),
  mutations: {
    set_products(state: any, value: []) {
      console.log(1, value);
      state.products = value;
    },
  },
  actions: {
    async getProducts(context: any) {
      try {
        const response = await axios.get("product");
        console.log(response);
        context.commit("set_products", response.data);
      } catch (error) {
        console.log(error);
        context.commit("set_products", []);
      }
    },
    async addProduct(context: any,) {
      try {
        
      } catch (error) {
        
      }
    }
  },
};
