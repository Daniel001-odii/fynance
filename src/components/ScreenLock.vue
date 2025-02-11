<template>
    <div v-if="!is_allowed" class=" fixed top-0 left-0 bg-white min-h-screen w-full z-50 flex justify-center items-center">
        <div class=" flex flex-col justify-center items-center gap-4">
            <div class=" flex flex-row gap-2 items-center">
                <img src="../assets/fynance_logo.png" class=" size-[80px]"/>
                <span class=" text-4xl font-bold">Fynance</span>
            </div>
           
            <h1 class=" text-2xl text-center">Welcome, please enter pin to continue</h1>

            <div>
                <PinInput
                id="pin-input"
                v-model="value"
                placeholder="○"
                @complete="handleComplete"
                >
                <PinInputGroup>
                    <PinInputInput
                    v-for="(id, index) in 5"
                    :key="id"
                    :index="index"
                    />
                </PinInputGroup>
                </PinInput>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
import {
  PinInput,
  PinInputGroup,
  PinInputInput,
} from '@/components/ui/pin-input';

const password = ref('');
const is_allowed = ref(false);



const value = ref([])
const handleComplete = (e) => {
    password.value = e.join('');
    if(password.value == '00000'){
        localStorage.setItem('is_allowed', true);
        is_allowed.value = true;
    } else {
        alert('Wrong pin entered, try again');
        password.value = ''
    }
}

onMounted(()=>{

    // check if password is stored already...
    if(!localStorage.getItem('is_allowed')){
        is_allowed.value = false;
    } else {
        is_allowed.value = true;
    }
})

</script>

<style scoped>

</style>