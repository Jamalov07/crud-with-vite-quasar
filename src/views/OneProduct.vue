<template>
  <div class="q-pa-md q-gutter-sm ">
    
    <q-btn icon="edit" label="Edit" color="primary" @click="fixed = true" />

    <q-dialog v-model="fixed" class="">
      <q-card class="w-[700px]">
        <q-card-section>
          <div class="text-h6">Edit Product</div>
        </q-card-section>

        <q-separator />

        <q-card-section style="" class="scroll">
          <div class="q-pa-md w-full h-full bg-white rounded-md shadow">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
              <q-input
                filled
                v-model="name"
                label="Product name *"
                hint="product name"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                v-model="address"
                label="Product address *"
                hint="product address"
                lazy-rules
                :rules="[
                  (val) => (val && val.length > 0) || 'Please type something',
                ]"
              />

              <q-input
                filled
                type="number"
                v-model="cost"
                label="Product cost *"
                lazy-rules
                :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Please type product cost',
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

              <!-- <q-toggle
                v-model="accept"
                label="I accept the license and terms"
              /> -->

              <q-card-actions align="right">
                <q-btn label="Submit" type="submit" color="primary" />
                <q-btn
                  label="Reset"
                  type="reset"
                  color="primary"
                  flat
                  class="q-ml-sm"
                />
                <q-btn flat label="Close" @click="onReset()" color="primary" v-close-popup />
              </q-card-actions>
            </q-form>
          </div>
        </q-card-section>

        <q-separator />
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";
import { useStore } from "vuex";
import { key } from "../store/index";
const store = useStore(key);
import { useQuasar } from "quasar";
const $q = useQuasar();

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const name = ref(null);
const cost = ref(null);
const address = ref(null);
const accept = ref(false);
const typeId = ref(null);
let fixed = ref(false);
let productId = ref(props.product.id);

onMounted(async () => {
  await store.dispatch("getProductTypes");
  name.value = props.product.name_uz;
  cost.value = props.product.cost;
  address.value = props.product.address;
  //   typeId.value = getTypeNameById(props.product.product_type_id);
  //   console.log(getTypeNameById(props.product.product_type_id));
});

async function onSubmit() {
  $q.notify({
    color: "green-7",
    textColor: "white",
    icon: "cloud_done",
    message: "Product succesfully updated",
  });
  const options = {
    id: productId.value,
    name_uz: name.value,
    cost: cost.value,
    address: address.value,
    product_type_id: settypeId(),
    created_date: Date.now(),
  };
  fixed.value = false;
  await store.dispatch("editProduct", options);
  await store.dispatch("getProducts");
  name.value = null;
  cost.value = null;
  accept.value = false;
  address.value = null;
  typeId.value = null;
  //   }
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

function getTypeNameById(id: number) {
  //   console.log(id,1111,store.state.producttypes.product_types);
  if (store.state.producttypes.product_types.value) {
    store.state.producttypes.product_types.value.forEach((op: any) => {
      // console.log(op.id, id);
      if (op.id === id) {
        typeId.value = op.name;
      }
    });
  }
  return typeId.value;
}
</script>

<style scoped>
.q-pa-md {
  padding: 0px;
}
</style>
