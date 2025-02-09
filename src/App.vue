<script>
import ThePricing from './components/ThePricing.vue';
import Button from './components/ui/button/Button.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'

export default {
  components: {
    Button,
    Toaster,
    ThePricing
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

<ThePricing v-if="false"/>

  <Toaster />
  <div class=" flex flex-row min-h-screen gap-6">


    <!-- side bar... -->
    <div class=" md:min-w-[300px] md:p-5 border-r border-gray-200 relative max-h-[screen]">
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

        
        <RouterLink to="/account" class="">
          <Button :variant="this.$route.name == 'Account' ? 'secondary':''" 
          class="p-3  hover:bg-white hover:text-black rounded-md flex flex-row gap-3 text-left justify-start !w-full">
            <i class="bi bi-gear"></i>
            <span class="hidden md:inline-block">My Account</span>
          </Button>
        </RouterLink>

        <!-- Advert Area -->

        <div class="absolute bottom-5 flex flex-col gap-3">
          <button class=" bg-green-500 text-white rounded-lg font-bold md:px-6 p-3 w-fit flex flex-row gap-3">
            <span class=" hidden md:flex">You are on Premium </span>
            <i class="bi bi-stars"></i>
          </button>
          <span class=" text-gray-400 hidden md:flex">Built by &copy; xenitsoft solutions</span>
        </div>
       
      </div>
    </div>

    <div class=" p-5 flex flex-col w-full max-h-screen overflow-y-auto">
      <!-- account status -->
      
     
      <div class=" flex justify-between items-center py-12 flex-wrap">
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
