<script>
import ThePricing from './components/ThePricing.vue';
import Button from './components/ui/button/Button.vue';
import Toaster from '@/components/ui/toast/Toaster.vue'
import ScreenLock from './components/ScreenLock.vue';
import ConnectionStatus from '@/components/ConnectionStatus.vue';
import SubscriptionsAlert from './components/SubscriptionsAlert.vue';

export default {
  components: {
    Button,
    Toaster,
    ThePricing,
    ScreenLock,
    ConnectionStatus,
  },
  data() {
    return {
      current_day: '',
      show_alert: localStorage.getItem('alert_shown') ? localStorage.getItem('alert_shown') : false,
    }
  },
  methods: {
    todaysDate() {
      const today = new Date();
      this.current_day = `Today - ${today.toLocaleDateString('en-GB')}`;
      // .toISOString().split(" ").splice(0, 5);
    },

    closeSubAlert(){
      localStorage.setItem('alert_shown', true);
      this.show_alert = !this.show_alert;
    }
  },

  mounted() {
    this.todaysDate();
  }

}
</script>

<template>
  <div v-if="!show_alert" class="fixed min-h-screen bg-black/70 top-0 left-0 right-0 flex justify-center items-center z-50 p-12">
    <div
      class="p-10 rounded-lg shadow-lg flex justify-center items-center bg-white relative flex-col min-h-[400px] min-w-[70vw] text-center gap-12">
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
        <button
        @click="closeSubAlert"
          class="bg-gray-500 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-lg mt-4 text-lg transition-colors">
          Continue using for free
        </button>
      </div>
    </div>
  </div>



  <ScreenLock />
  <ThePricing v-if="false" />

  <Toaster />
  <ConnectionStatus />
  <!-- <span>connection status is up</span> -->
  <div class=" flex flex-row min-h-screen gap-6">


    <!-- side bar... -->
    <div class=" md:min-w-[300px] md:p-5 border-r border-gray-200 relative max-h-[screen]">
      <div class=" flex flex-row items-center mt-12">
        <img src="../src/assets/fynance_logo.png" class=" w-[50px]" />
        <span class=" font-bold text-3xl hidden md:inline-block">Fynance</span>
      </div>

      <div class=" flex flex-col mt-[250px] p-3 gap-3">

        <RouterLink to="/" class="">
          <Button :variant="this.$route.name == 'Dashboard' ? 'secondary' : ''"
            class="p-4  hover:bg-white hover:text-black rounded-md flex flex-row gap-3 text-left justify-start !w-full">
            <i class="bi bi-ui-checks-grid"></i>
            <span class="hidden md:inline-block">Dashboard</span>

          </Button>
        </RouterLink>

        <RouterLink to="/groups" class="">
          <Button
            :variant="this.$route.name == 'Groups' ? 'secondary' : '' || this.$route.name == 'Group' ? 'secondary' : ''"
            class="p-3  hover:bg-white hover:text-black rounded-md flex flex-row gap-3 text-left justify-start !w-full">
            <i class="bi bi-people"></i>
            <span class="hidden md:inline-block">Groups</span>
          </Button>
        </RouterLink>


        <!--  <RouterLink to="/account" class="">
          <Button :variant="this.$route.name == 'Account' ? 'secondary':''" 
          class="p-3  hover:bg-white hover:text-black rounded-md flex flex-row gap-3 text-left justify-start !w-full">
            <i class="bi bi-gear"></i>
            <span class="hidden md:inline-block">My Account</span>
          </Button>
        </RouterLink> -->

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

<style scoped></style>
