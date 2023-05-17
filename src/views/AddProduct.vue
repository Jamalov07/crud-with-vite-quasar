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

onMounted(async () => {
  await store.dispatch("getProductTypes");
});

async function onSubmit() {
  if (accept.value !== true) {
    await $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to confirm first",
    });
  } else {
    $q.notify({
      color: "green-7",
      textColor: "white",
      icon: "cloud_done",
      message: "New product is inserted",
    });
    const options = {
      name_uz: name.value,
      cost: cost.value,
      address: address.value,
      product_type_id: settypeId(),
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
  if (store.state.producttypes.product_types.value) {
    store.state.producttypes.product_types.value.forEach((op: any) => {
      typenames.push(op.name_uz);
    });
  }
  return typenames;
}

function settypeId() {
  if (store.state.producttypes.product_types.value) {
    store.state.producttypes.product_types.value.forEach((op: any) => {
      if (op.name_uz === typeId.value) {
        typeId.value = op.id;
      }
    });
  }
  return typeId.value;
}
</script>
<template>
  <div class=" w-screen h-screen flex justify-center items-center">
    <div class="q-pa-md w-[50%] h-[60%] bg-white rounded-md shadow-lg border border-blue-600">
      <h4 class="text-center p-2 pb-6 font-bold text-blue-600">Add Product</h4>

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
            label="Product type"
            :rules="[(val) => val !== null || 'Select type product']"
          />
        </div>

        <q-toggle v-model="accept" label="I confirm" />

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
