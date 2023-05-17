import axios from "../../service/axios";

export const producttypes = {
  state: () => ({
    product_types: [],
  }),
  mutations: {
    set_product_types(state: any, value: []) {
      // console.log(value)
      state.product_types.value = value;
    },
  },
  actions: {
    async getProductTypes(context: any) {
      try {
        const response = await axios.get("product/get-product-types");
        // console.log(response,"23456787");
        context.commit("set_product_types", response.data);
      } catch (error) {
        console.log(error);
      }
    },
  
  },
};
