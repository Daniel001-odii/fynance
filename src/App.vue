<script>
import Button from './components/ui/button/Button.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'

export default {
  components: {
    Button,
    Toaster,
  },
  data(){
    return{
      current_day: '',
    }
  },
  methods: {
    todaysDate(){
      const today = new Date();
      this.current_day = `Today - ${today.toLocaleDateString('en-GB')}`;
      // .toISOString().split(" ").splice(0, 5);
    },
  },

  mounted(){
    this.todaysDate();
  }
        
}
</script>

<template>
      <!-- LOADER -->
  <div v-if="true" class=" fixed min-h-screen bg-black/70 top-0 left-0 right-0 flex justify-center items-center z-50 p-12">
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


  <Toaster />
  <div class=" flex flex-row min-h-screen gap-6">

    <div class=" md:min-w-[300px] md:p-5 border-r border-gray-200 relative">
      <div class=" flex flex-row items-center mt-12">
        <img src="../src/assets/fynance_logo.png" class=" w-[50px]"/>
        <span class=" font-bold text-3xl hidden md:inline-block">Fynance</span>
      </div>
      <div class=" flex flex-col mt-[250px] p-3 gap-3">
      
        <RouterLink to="/" class="">
          <Button :variant="this.$route.name == 'Dashboard' ? 'secondary':''" class="p-4  hover:bg-white hover:text-black rounded-md flex flex-row gap-3 text-left justify-start !w-full">
          <i class="bi bi-ui-checks-grid"></i>
          <span class="hidden md:inline-block">Dashboard</span>
           
          </Button>
        </RouterLink>

        <RouterLink to="/groups" class="">
          <Button 
          :variant="this.$route.name == 'Groups' ? 'secondary':'' || this.$route.name == 'Group' ? 'secondary':''" 
          class="p-3  hover:bg-white hover:text-black rounded-md flex flex-row gap-3 text-left justify-start !w-full">
          <i class="bi bi-people"></i>
          <span class="hidden md:inline-block">Groups</span>
          </Button>
        </RouterLink>

        
        <Button :variant="this.$route.name == 'Account' ? 'secondary':''" class="p-3  hover:bg-white hover:text-black rounded-md flex flex-row gap-3 text-left justify-start">
         <i class="bi bi-gear"></i>
         <span class="hidden md:inline-block">My Account</span>
        </Button>

        <!-- Advert Area -->

        <div class="absolute bottom-5 flex flex-col gap-3">
          <button class=" bg-green-500 text-white rounded-lg font-bold px-6 p-3 w-fit ">Youre Premium <i class="bi bi-stars"></i></button>
          <span class=" text-gray-400">Built by &copy; xenitsoft solutions</span>
        </div>
       
      </div>
    </div>

    <div class=" p-5 flex flex-col w-full ">
      <!-- account status -->
      
     
      <div class=" flex justify-between items-center py-12">
        <div class="font-bold text-3xl flex gap-3 items-center">
          <Button @click="$router.back()" variant="ghost">
            <i class="bi bi-arrow-left"></i>
          </Button>
          <span>{{ this.$route.name }}</span>
        </div>

        <div class=" text-xl py-6">
          <span class="">{{ current_day }}</span>
        </div>
      </div>
    
      <RouterView />
    </div>
  </div>
 
</template>

<style scoped>

</style>
