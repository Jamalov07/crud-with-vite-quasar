<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
const store = useStore(key);
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
const $q = useQuasar();
const router = useRouter();
const name = ref(null);
const cost = ref(null);
const address = ref(null);
const accept = ref(false);
const typeId = ref(null);
let options = [
  { id: 1, name: "Google" },
  { id: 2, name: "Facebook" },
  { id: 3, name: "Youtube" },
  { id: 4, name: "Telegram" },
];

onMounted(async() => {
  console.log(await store.dispatch("getProducts"));
});

async function onSubmit() {
  if (accept.value !== true) {
    await $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
    const options = {
      name_uz: name.value,
      cost: cost.value,
      address: address.value,
      product_type_id: typeId.value,
      created_date: Date.now(),
    };


    console.log(options, store);
    store.dispatch("addProduct", options);
    router.replace("/products");
  }
}
function onReset() {
  name.value = null;
  cost.value = null;
  accept.value = false;
  address.value = null;
  typeId.value = null;
}
function gettypenames() {
  let typenames: any = [];

  options.forEach((op) => {
    typenames.push(op.name);
  });
  return typenames;
}

</script>
<template>
  <div class="w-screen h-screen flex justify-center items-center bg-green-400">
    <div class="q-pa-md w-[50%] h-[60%] bg-white rounded-md shadow">
      <h4 class="text-center p-2 pb-6">Add Product</h4>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Product name *"
          hint="product name"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          v-model="address"
          label="Product address *"
          hint="product address"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model="cost"
          label="Product cost *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type product cost',
            (val) => val > 0 || 'Please type a product cost',
          ]"
        />

        <div class="q-gutter-md">
          <q-select
            v-model="typeId"
            :options="gettypenames()"
            label="Standard"
            :rules="[(val) => val !== null || 'Select type product']"
          />
        </div>

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </div>
</template>

<style></style>
