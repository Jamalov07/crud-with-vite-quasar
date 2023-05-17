<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
import { ref } from "vue";
import { Ref } from "vue";
import OneProduct from "./OneProduct.vue";
import DeleteProduct from "./DeleteProduct.vue";
const store = useStore(key);

onMounted(async () => {
  await store.dispatch("getProductTypes");
  await store.dispatch("getProducts");
});

type Separatortype = "vertical" | "horizontal" | "cell" | "none" | undefined;

let separator: Ref<Separatortype> = ref("vertical");
let separatorOptions = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
  { label: "Cell", value: "cell" },
  { label: "None", value: "none" },
];

function setTypeName(id: number) {
  if (store.state.producttypes.product_types.value) {
    let typename = "";
    store.state.producttypes.product_types.value.forEach((typ: any) => {
      if (typ.id === id) {
        typename = typ.name_uz;
      }
    });
    return typename;
  }
}
</script>
<template>
  <div class="q-pa-md bg-white">
    <h4 class="p-5 font-bold text-blue-600">Products list</h4>
    <q-option-group
      v-model="separator"
      inline
      class="q-mb-md"
      :options="separatorOptions"
    />
    <q-markup-table :separator="separator" flat bordered class="">
      <thead>
        <tr class="bg-blue-600 text-white">
          <th class="text-left">Product name</th>
          <th class="text-right">Price</th>
          <th class="text-right">Type id</th>
          <th class="text-right">Type name</th>
          <th class="text-right">Address</th>
          <th class="text-right">Created date</th>
          <th class="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr class="h-[50px]" v-for="product in store.state.products.products">
          <td class="text-left">{{ product.name_uz }}</td>
          <td class="text-right">{{ product.cost }}</td>
          <td class="text-right">{{ product.product_type_id }}</td>
          <td class="text-right">{{ setTypeName(product.product_type_id) }}</td>
          <td class="text-right">{{ product.address }}</td>
          <td class="text-right">
            {{ new Date(product.created_date).toDateString() }}
          </td>
          <td class="text-center flex justify-around items-center">
            <OneProduct class="" :product="product" />
            <DeleteProduct class="" :product_id="product.id" />
          </td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<style scoped>
div {
  overflow: hidden;
}
</style>
