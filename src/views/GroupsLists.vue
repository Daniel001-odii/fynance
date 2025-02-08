<template>
    <div class=" ">
    <div v-if="loading" class=" fixed h-screen w-screen bg-black/20 top-0 left-0 flex justify-center items-center z-10">
        <div class=" p-10 rounded-lg size-14 shadow-lg flex justify-center items-center bg-white relative">
            <div class="size-8 border-[6px] border-gray-200 border-t-gray-800 rounded-full animate-spin absolute" style="animation-duration: 0.4s;"></div>
        </div>
    </div>


        <h1 class=" text-5xl font-bold">All Ledger Groups</h1>

        <p class=" text-lg mt-4">Click on a group to see all records for the selected group</p>

        <!-- ledger group lists -->
        <div class=" flex flex-row flex-wrap py-3 mt-12 gap-3">
            <RouterLink v-for="group in groups" :to="'/groups/' + group">
                <Button class="size-[150px] min-w-[150px] bg-blue text-xl flex-1 hover:!bg-slate-100 flex flex-col" >
                    <i class="bi bi-people-fill"></i>
                    <span>GROUP {{ group }}</span>
                </Button>
            </RouterLink>
            <form @submit="createNewGroup" v-if="new_group" :to="`/groups/${custom_group}`">
                <Button class="size-[150px] min-w-[150px] bg-blue text-xl flex-1 hover:!bg-slate-100 flex flex-col" >
                    <i class="bi bi-people-fill"></i>
                    <span>GROUP</span>
                    <input type="text" class="uppercase w-[50px] border" v-model="custom_group" required/>
                </Button>
            </form>
            <Button @click="new_group = !new_group" class="size-[150px] bg-blue text-xl hover:!bg-slate-100" >
                <span><i class="bi bi-plus text-5xl"></i></span>
            </Button>
        </div>
    </div>
</template>

<script>
import Button from '@/components/ui/button/Button.vue';
import axios from 'axios';


    export default {
        name: "GroupList",
        components: {
            Button,
        },
        data(){
            return{
                groups: [],
                new_group: false,
                custom_group: '',
                loading: false,
            }
        },
        methods: {
            // get all available groups...
            async getAllGroups(){
                this.loading = true;
                try{
                    const response = await axios.get(`/customers/groups/all`);
                    console.log("all grups: ", response);
                    this.groups = response.data.groups;
                }catch(error){
                    console.log("error getting all transactions: ", error);
                }
                this.loading = false;
            },

            createNewGroup(){
                this.$router.push(`/groups/${this.custom_group}`)
            }
        },

        mounted(){
            this.getAllGroups()
        }
    }
</script>

<style scoped>

</style>