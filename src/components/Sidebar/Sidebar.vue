<script lang="ts" setup>
import { ref } from "vue";
const drawer = ref(false);
const miniState = ref(true);
</script>

<template>
  <div class="q-pa-md" style="padding: 0px; overflow: hidden !important">
    <q-layout
      view="hHh Lpr lff"
      container
      style="height: 1000px"
      class="shadow-2 rounded-borders"
    >
      <q-header
        elevated
        :class="$q.dark.isActive ? 'bg-secondary' : 'bg-blue-600'"
      >
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" />
          <q-toolbar-title>CRUD FOR PRODUCTS</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :mini="miniState"
        @mouseover="miniState = false"
        @mouseout="miniState = true"
        :width="200"
        :breakpoint="500"
        bordered
        :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      >
        <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
          <q-list padding>
            <router-link to="/products" class="text-black">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="bi-flower1" />
                </q-item-section>

                <q-item-section> All Products </q-item-section>
              </q-item>
            </router-link>

            <router-link to="/product/add" class="text-black">
              <q-item clickable v-ripple>
                <q-item-section avatar>
                  <q-icon name="bi-patch-plus" />
                </q-item-section>
                <q-item-section> Add Product </q-item-section>
              </q-item>
            </router-link>
          </q-list>
        </q-scroll-area>
      </q-drawer>

      <q-page-container>
        <q-page padding class="pt-10">
          <router-view></router-view>
        </q-page>
      </q-page-container>
    </q-layout>
  </div>
</template>
<style scoped>
.router-link-active {
  color: blue !important;
}
</style>
