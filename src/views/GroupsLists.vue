<template>
    <div class=" ">
      
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
            }
        },
        methods: {
            // get all available groups...
            async getAllGroups(){
                try{
                    const response = await axios.get(`/customers/groups/all`);
                    console.log("all grups: ", response);
                    this.groups = response.data.groups;
                }catch(error){
                    console.log("error getting all transactions: ", error);
                }
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