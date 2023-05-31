<template>
  <div class="flex justify-center items-center bg-blue-700 h-[800px]">
    <div class="first m-10 gap-[20px] bg-white p-4">
      <div class="flex gap-[28px]">
        <div class="w-[80px] h-[40px] border border-black order-1">1</div>
        <div class="w-[80px] h-[40px] border border-black order-4">4</div>
        <div class="w-[80px] h-[40px] border border-black order-3">3</div>
        <div class="w-[80px] h-[40px] border border-black order-2">2</div>
      </div>

      <div class="flex gap-[20px]">
        <div class="w-[80px] border border-black"></div>
        <div class="flex flex-col gap-[20px]">
          <div class="h-[40px] w-[302px] border border-black"></div>
          <div class="flex gap-[30px]">
            <div class="w-[80px] h-[40px] border border-black"></div>
            <div class="w-[80px] h-[40px] border border-black"></div>
            <div class="w-[80px] h-[40px] border border-black"></div>
          </div>
          <div class="flex gap-[20px] w-[100%] justify-between flex-row-reverse items-center">
            <div class="w-[80px] h-[40px] border border-black flex justify-center items-center">1</div>
            <div class="w-[190px] h-[40px] border border-black flex justify-center items-center">2</div>
          </div>
          <div class="w-[302px] h-[40px] border border-black"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts"></script>
<style scoped>
.first {
  display: flex;
  flex-direction: column;
  margin-top: 40px;
}

* {


}
</style>
