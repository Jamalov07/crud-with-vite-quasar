import axios from "../../service/axios";

export const editproducts = {
  state: () => ({}),
  mutations: {},
  actions: {
    async editProduct(context: any, options: any) {
      try {
        const response = await axios.put("product", options);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
