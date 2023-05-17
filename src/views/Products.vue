<script setup lang="ts">
import { onMounted } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
import { ref } from "vue";
import { Ref } from "vue";
const store = useStore(key);

onMounted(async () => {
  await store.dispatch("getProducts");
  console.log(await store.state.products);
});

type Separatortype = "vertical" | "horizontal" | "cell" | "none" | undefined;

let separator: Ref<Separatortype> = ref("vertical");
let separatorOptions = [
  { label: "Horizontal", value: "horizontal" },
  { label: "Vertical", value: "vertical" },
  { label: "Cell", value: "cell" },
  { label: "None", value: "none" },
];
</script>
<template>
  <div class="q-pa-md">
    <h4 class="p-5">Products list</h4>
    <q-option-group
      v-model="separator"
      inline
      class="q-mb-md"
      :options="separatorOptions"
    />

    <q-markup-table :separator="separator" flat bordered>
      <thead>
        <tr>
          <th class="text-left">Product name</th>
          <th class="text-right">Price</th>
          <th class="text-right">Type id</th>
          <th class="text-right">Type name</th>
          <th class="text-right">Address</th>
          <th class="text-right">Created date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in store.state.products.products">
          <td class="text-left">{{ product.name_uz }}</td>
          <td class="text-right">{{ product.cost }}</td>
          <td class="text-right">{{product.product_type_id}}</td>
          <td class="text-right">24</td>
          <td class="text-right">{{product.address}}</td>
          <td class="text-right">{{new Date(product.created_date).toDateString()}}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<style></style>
