import axios from "../../service/axios";

export const deleteproducts = {
  state: () => ({}),
  mutations: {},
  actions: {
    async deleteProduct (context: any, id: number) {
      try {
        const response = await axios.delete("product" + `/${id}`);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
