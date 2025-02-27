<template>
  <div
    class="fixed min-h-screen bg-black/70 top-0 left-0 right-0 flex justify-center items-center z-50 p-12"
  >
    <div
      class="p-10 rounded-lg shadow-lg flex justify-center items-center bg-white relative flex-col min-h-[400px] min-w-[70vw] text-center gap-12"
    >
    <h1 class="text-3xl font-bold text-red-600">Only 1 Day Left on Your Free Trial!</h1>
    <div class="flex flex-col gap-4">
      <p class="text-gray-600 text-lg">
        Don't lose access to all your financial tracking and group management features.
        Upgrade to Premium today to:
      </p>
      <ul class="text-left list-disc list-inside text-gray-700">
        <li>Keep managing unlimited groups</li>
        <li>Access advanced financial analytics</li>
        <li>Get priority customer support</li>
      </ul>
      <button class="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-lg mt-4 text-lg transition-colors">
        Upgrade to Premium Now
      </button>
    </div>
</div>
  </div>
</template>

<script setup>
import { ref } from "vue";
</script>

<style scoped></style>
