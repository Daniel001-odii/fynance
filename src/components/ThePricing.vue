<template>
       <!-- PRICING COMPONENT -->
<div class=" fixed min-h-screen bg-black/70 top-0 left-0 right-0 flex justify-center items-center z-50 p-12">
    <div class=" p-10 rounded-lg shadow-lg flex justify-center items-center bg-white relative flex-col min-h-[400px] min-w-[70vw] text-center gap-12">
      <h1 class=" text-3xl font-bold"> Upgrade to Continue Using Fynance Freely!</h1>
     <p class=" text-2xl max-w-[800px]">You're enjoying Fynance’s powerful features, but to continue using the app without limits, you’ll need to upgrade. Choose a plan that suits your business and unlock seamless transactions, unlimited listings, and premium support.</p>
     <span class=" text-xl">Choose Your preffered Plan to continue! 🚀</span>

     <div class=" flex flex-row gap-4">

      <!-- PRICING PLANS -->
        <div class=" bg-white rounded-3xl p-8 flex flex-col justify-between hover:bg-blue-500 hover:text-white border gap-12  text-left text-xl border-gray-300">
          <div class=" flex flex-col gap-2">
            <span class=" font-bold text-3xl">Professional</span>
            <span>NGN 50,000 /month</span>
          </div>
          

          <ol class="flex flex-col gap-2">
            <ul>20 Customers Per-group</ul>
            <ul>10 Ledger Groups</ul>
            <ul>No Statistics</ul>
          </ol>
          <!-- https://paystack.com/pay/fynance-ultimate -->
          <a href="https://paystack.com/pay/fynance-professional">
            <button class=" p-3 bg-white text-black hover:bg-yellow-500 hover:text-white rounded-md">Subscribe</button>
          </a>
        </div>

        <div class=" bg-white rounded-3xl p-8 flex flex-col justify-between hover:bg-blue-500 hover:text-white border gap-12  text-left text-xl border-gray-300">
          <div class=" flex flex-col gap-2">
            <span class=" font-bold text-3xl">Standard</span>
            <span>NGN 80,000 /month</span>
          </div>
          

          <ol class="flex flex-col gap-2">
            <ul>50 Customers Per-group</ul>
            <ul>50 Ledger Groups</ul>
            <ul>Total Income & Withdrawals</ul>
          </ol>
          <a href="https://paystack.com/pay/fynance-standard">
            <button class=" p-3 bg-white text-black hover:bg-yellow-500 hover:text-white rounded-md">Subscribe</button>
          </a>
        </div>

        <div class=" bg-white rounded-3xl p-8 flex flex-col justify-between hover:bg-blue-500 hover:text-white border gap-12  text-left text-xl border-gray-300">
          <div class=" flex flex-col gap-2">
            <span class=" font-bold text-3xl">Ultimate</span>
            <span>NGN 100,000 /month</span>
          </div>
          

          <ol class="flex flex-col gap-2">
            <ul>Unlimited Customers Per-group</ul>
            <ul>Unlimited Ledger Groups</ul>
            <ul>Integrated Statistics</ul>
            <ul>Charts & Graphs</ul>
          </ol>
          <a href="https://paystack.com/pay/fynance-ultimate">
            <button class=" p-3 bg-white text-black hover:bg-yellow-500 hover:text-white rounded-md">Subscribe</button>
          </a>
        </div>
     </div>

    </div>
  </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>

</style>