<template>
    <!-- {{ isOnline }} -->
    <div>
      <div v-if="!isOnline" class="alert">
        ⚠️ You are offline! Check your internet connection.
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const isOnline = ref(window.navigator.onLine);
  
  const updateConnectionStatus = () => {
    isOnline.value = window.navigator.onLine;
    if (!isOnline.value) {
      alert("You are offline! Check your internet connection.");
    } else {
      alert("You are back online!");
    }
  };
  
  onMounted(() => {
    window.addEventListener('online', updateConnectionStatus);
    window.addEventListener('offline', updateConnectionStatus);
  });
  
  onUnmounted(() => {
    window.removeEventListener('online', updateConnectionStatus);
    window.removeEventListener('offline', updateConnectionStatus);
  });
  </script>
  
  <style scoped>
  .alert {
    position: fixed;
    top: 10px;
    left: 50%;
    transform: translateX(-50%);
    background-color: #ffcc00;
    color: #000;
    padding: 10px 20px;
    border-radius: 5px;
    font-weight: bold;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  </style>
  