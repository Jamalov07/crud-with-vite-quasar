<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Delete" color="red" @click="inception = true" />

    <q-dialog v-model="inception">
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm removing product</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to delete this product?
        </q-card-section>

        <q-card-actions align="right" class="text-primary">
          <q-btn flat label="Yes" @click="deletePro()" />
          <q-btn flat label="No" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useStore } from "vuex";
import { key } from "../store";
const $q = useQuasar();
const store = useStore(key);

onMounted(() => {
  // console.log(store);
});

const props = defineProps({
  product_id: Number,
});

async function deletePro() {
  await store.dispatch("deleteProduct", props.product_id);
  inception.value = false;
  $q.notify({
    color: "red-2",
    textColor: "red-5",
    icon: "cloud_done",
    message: "Product deleted",
  });
  await store.dispatch("getProducts");
}

let inception = ref(false);
</script>
<style scoped>
.q-pa-md {
  padding: 0px;
}
</style>
