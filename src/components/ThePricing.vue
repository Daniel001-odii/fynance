<template>
  <!-- PRICING MODAL -->
  <div class="fixed inset-0 bg-black/60 flex justify-center items-center z-50 p-4 sm:p-6 md:p-12 transition-opacity duration-300 ease-out">
    <div class="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden relative transform transition-all duration-300 ease-out scale-100">

      <!-- Close Button -->
      <button
        @click="$emit('close')"
        aria-label="Close upgrade modal"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-10 p-1 rounded-full hover:bg-gray-100"
      >
        <!-- Heroicon: x-mark -->
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      <div class="p-6 sm:p-8 md:p-10 text-center">

        <!-- Optional: Icon (e.g., Rocket, Lock, Star) -->
         <div class="mb-4 flex justify-center items-center">
          <img src="../assets/fynance_logo.png" class=" w-[50px]"/>
         </div>

        <h1 class="text-2xl sm:text-3xl font-semibold text-gray-900 mb-3">
          Unlock Full Access to Fynance
        </h1>

        <p class="text-base sm:text-lg text-gray-600 mb-6 sm:mb-8 max-w-md mx-auto">
          Continue leveraging powerful financial tools without limits. Upgrade to our Pro plan for enhanced features and support.
        </p>

        <!-- Plan Details -->
        <div class="bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 rounded-xl p-6 mb-8 text-left shadow-sm">
          <div class="flex flex-col sm:flex-row justify-between sm:items-center mb-5">
            <span class="text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Pro Plan</span>
            <span class="text-2xl font-bold text-blue-600">
              NGN 10,000
              <span class="text-base font-medium text-gray-500">/ month</span>
            </span>
          </div>

          <ul class="space-y-3 text-gray-700 text-base">
            <li class="flex items-start">
              <!-- Heroicon: check-circle (solid) -->
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0">
                <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06L10.5 14.186l-1.72-1.72a.75.75 0 00-1.06 1.061l2.25 2.25a.75.75 0 001.06 0l4.5-4.5z" clip-rule="evenodd" />
              </svg>
              <span><span class="font-medium">Unlimited</span> Transactions & Entries</span>
            </li>
             <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"> <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06L10.5 14.186l-1.72-1.72a.75.75 0 00-1.06 1.061l2.25 2.25a.75.75 0 001.06 0l4.5-4.5z" clip-rule="evenodd" /> </svg>
              <span>Manage up to <span class="font-medium">50 Ledger Groups</span></span>
            </li>
             <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"> <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06L10.5 14.186l-1.72-1.72a.75.75 0 00-1.06 1.061l2.25 2.25a.75.75 0 001.06 0l4.5-4.5z" clip-rule="evenodd" /> </svg>
              <span>Access to <span class="font-medium">Detailed Statistics</span> & Reports</span>
            </li>
             <li class="flex items-start">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"> <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.06-1.06L10.5 14.186l-1.72-1.72a.75.75 0 00-1.06 1.061l2.25 2.25a.75.75 0 001.06 0l4.5-4.5z" clip-rule="evenodd" /> </svg>
              <span>Priority <span class="font-medium">Customer Support</span></span>
            </li>
          </ul>
        </div>

        <!-- Call to Action Button -->
        <a
          href="https://paystack.com/pay/fynance-professional"
          target="_blank"
          rel="noopener noreferrer"
          class="block w-full"
        >
          <button
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg text-lg transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-md hover:shadow-lg"
          >
            Upgrade Now - NGN 10,000/month
          </button>
        </a>

        <p class="mt-4 text-sm text-gray-500">
          Secure payment processing via Paystack.
        </p>

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PricingModal',
  emits: ['close'], // Declare the 'close' event
  setup(_, { emit }) {
    // Optional: Add logic here if needed, e.g., handling props or state
    // const close = () => {
    //   emit('close');
    // }
    // return { close }; // If you need to call it from setup
  }
}
</script>

<style scoped>
/* Add any component-specific styles here if needed, */
/* although Tailwind should cover most cases. */
/* Example: Add a subtle entrance animation */
.transition-all {
  transition-property: all;
}
.duration-300 {
  transition-duration: 300ms;
}
.ease-out {
  transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
}
.scale-100 {
  transform: scale(1);
}

/* You might want an entry state if you control visibility with v-if/v-show */
/* For example, starting slightly smaller and faded in */
/* .modal-enter-active, .modal-leave-active {
  transition: all 300ms ease-out;
}
.modal-enter-from, .modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
} */
</style>