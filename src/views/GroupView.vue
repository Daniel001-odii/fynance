<template>
    <!-- LOADER -->
    <div v-if="loading" class=" fixed h-screen w-screen bg-black/20 top-0 left-0 flex justify-center items-center z-10">
      <div class=" p-10 rounded-lg size-14 shadow-lg flex justify-center items-center bg-white relative">
        <div class="size-8 border-[6px] border-gray-200 border-t-gray-800 rounded-full animate-spin absolute" style="animation-duration: 0.4s;"></div>
      </div>
    </div>
    

    <div class="flex flex-col">
        <div class=" flex flex-row justify-between items-center">
            <div class="flex flex-col gap-5 text-3xl font-bold uppercase">
                <h1 class="">Group: {{ regGroup }} - Year: {{ year }} - Month: {{ currentMonth }}</h1>
            </div>

<!-- {{ new_customer }} -->

            <Dialog>
                <DialogTrigger as-child>
                        <Button class=" flex text-xl p-6" variant="secondary" :disabled="customers?.length >= 20">
                        <i class="bi bi-person-plus-fill"></i>
                        <span> Add New Customer </span>
                    </Button>
                </DialogTrigger>

                <DialogContent class="sm:max-w-[425px] bg-white">
                    <DialogHeader>
                        <DialogTitle>Add a new customer</DialogTitle>
                        <DialogDescription>
                        Fill in the given details below to add a new customer record to your ledger group
                        </DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-4 py-3">
                        <div class="flex flex-row gap-3">
                            <div class="flex flex-col items-start w-full">
                                <Label for="name" class="text-right">
                                    Name
                                </Label>
                                <Input id="name" v-model="new_customer.name" class="col-span-3" />
                            </div>
                            <div class="flex flex-col items-start w-[100px]">
                                <Label for="reg_no" class="text-right">
                                    group
                                </Label>
                                <div class=" flex flex-row items-center gap-2 relative border w-fit py-[0.3em] px-2 rounded-md">
                                  <span class="">{{ new_customer.group }}</span>
                                  <input type="number" class=" w-[50px] px-1 border-none outline-none" min="0" v-model="new_customer.group_index"/>
                                  <!-- <Input id="reg_no" v-model="new_customer.group_index" class="col-span-3 pl-8" /> -->
                                </div>
                            </div>
                        </div>

                        <div class="flex flex-row gap-3">
                            <div class="flex flex-col items-start w-fit">
                                <Label for="reg_date" class="text-right">
                                    Reg Date
                                </Label>
                                <Input type="date" id="reg_date" v-model="new_customer.regDate" class="col-span-3" />
                            </div>

                            <div class="flex flex-col items-start w-full">
                                <Label for="address" class="text-right">
                                    Address
                                </Label>
                                <Input id="address" v-model="new_customer.address" class="col-span-3" />
                            </div>
                        </div>

                        <div class="flex flex-col items-start w-full">
                            <Label for="phone" class="text-right">
                                Phone Number
                            </Label>
                            <Input id="phone" v-model="new_customer.phone" class="col-span-3" />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" @click="addNewCustomer()" variant="secondary" :disabled="customers.length > 20 || adding_new_customer">
                          <span v-if="adding_new_customer">Loading...</span>
                          <span v-else>Add Customer</span>
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <!-- Add new customer -->
            <!-- <div>
                
            </div> -->
        </div>
    
        <!-- error display area -->
        <!-- <div v-if="error" class=" p-3 rounded-lg bg-red-500 text-white font-bold border border-red-500 flex justify-between items-center mt-6"> -->
        <div v-if="error" class=" font-bold text-red-500 text-2xl mt-6">
          <span>{{ error }}</span>
          <!-- <button @click="reloadPage()"><i class="bi bi-x-lg"></i></button> -->
        </div>
     
    <!-- select week  -->
    <div class=" flex flex-row justify-between py-5 mt-12">
        <div class="flex flex-row gap-3 items-center w-fit">
       <!--  <Select v-model="weekIndex" @update:modelValue="getWeeklyTransactions()">
            <SelectTrigger class=" text-white w-[200px]">
            <SelectValue placeholder="Select a week" />
            </SelectTrigger>
            <SelectContent class=" text-white w-[200px]">
            <SelectGroup>
                <SelectLabel>Weeks</SelectLabel>
                <SelectItem v-for="index in 52" :value="(index).toString()">
                week {{ index }}
                </SelectItem>
            </SelectGroup>
            </SelectContent>
        </Select> -->
        <select class="p-2 rounded-lg border w-fit" v-model="weekIndex" @change="getWeeklyTransactions()">
            <option v-for="index in 52" :value="index">week {{ index }}</option>
        </select>
        </div>

        <div class="flex flex-row gap-3">
        <Button :disabled="weekIndex == 0" @click="[weekIndex --, getWeeklyTransactions()]"> <i class="bi bi-caret-left-fill"></i> Previous Week </Button>
        <Button :disabled="weekIndex == max_week" @click="[weekIndex ++, getWeeklyTransactions()]">Next Week <i class="bi bi-caret-right-fill"></i></Button>
        </div>
    </div>


    
   
      <CustomTable 
      @reloadData="getWeeklyTransactions()"
      :week-totals="week?.weekTotals"
      :customers="customers"/>

    
    <!-- Daily Totals -->
    <div class="flex flex-col mt-12">
        <span class=" text-xl font-bold mb-3">Daily Totals For Week</span>
        <table v-if="customers" class="min-w-full bg-white border border-gray-300">
        <thead>
        <tr class="bg-gray-200">
            <th class="border px-4 py-2">Day</th>
            <th class="border px-4 py-2">Total Deposits</th>
            <th class="border px-4 py-2">Total Withdrawals</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(txn, index) in week.weekTotals" :key="index" class="border">
            <td class="border text-left px-4 py-2">{{ txn.date }}</td>
            <td class="border text-left px-4 py-2">{{ txn.total_deposit?.toLocaleString() }}</td>
            <td class="border text-left px-4 py-2">{{ txn.total_withdrawal?.toLocaleString() }}</td>
        </tr>
        </tbody>
    </table>
    </div>
      
        
    
      </div>
    </template>
    
    <script>
    import Button from '@/components/ui/button/Button.vue';
    import axios from 'axios'
    import { useToast } from '@/components/ui/toast/use-toast'
    import { Input } from '@/components/ui/input'
    import { ToastAction } from '@/components/ui/toast'
    import CustomTable from '@/components/CustomTable.vue';

    import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
    import { ExclamationTriangleIcon } from '@radix-icons/vue'

  
    
    import {
      Table,
      TableBody,
      TableCaption,
      TableCell,
      TableHead,
      TableHeader,
      TableRow,
    } from '@/components/ui/table'

    import {
      Select,
      SelectContent,
      SelectGroup,
      SelectItem,
      SelectLabel,
      SelectTrigger,
      SelectValue,
    } from '@/components/ui/select'
    

    import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    } from '@/components/ui/dialog'

    export default {
      name: 'DashboardView',
      components: {
        Alert, AlertDescription, AlertTitle,
        CustomTable,
        Input,
        Button,
        Table,
        TableBody,
        TableCaption,
        TableCell,
        TableHead,
        TableHeader,
        TableRow,
        Select,
        SelectContent,
        SelectGroup,
        SelectItem,
        SelectLabel,
        SelectTrigger,
        SelectValue,
        Dialog,
        DialogContent,
        DialogDescription,
        DialogFooter,
        DialogHeader,
        DialogTitle,
        DialogTrigger,
      },
      data() {
        return {
          weekIndex: localStorage.getItem("weekIndex") || 1,
          year: 2025,
          max_week: 51,
          week: [],
          customers: [],
          startDate: "2025-01-10",
          endDate: "2025-01-31",
          regGroup: this.$route.params.group,
    
          loading: false,
    
          currentTxn: null,
          currentCustomer: null,
          error: null,
          toast: useToast().toast,
    
          currentMonth: null,

          new_customer: {
            name: '',
            group: this.$route.params.group,
            group_index: 1,
            regDate: (new Date()).toISOString()?.split("T")[0],
            address: '',
            phone: '',
          },
          toast: useToast().toast,
          ExclamationTriangleIcon,
          adding_new_customer: false,
        }
      },
    
      methods: {
        reloadPage(){
          window.location.reload()
        },

        AutoUpdateRegNumber(){
            this.new_customer.address = this.newAddress;
            this.new_customer.group_index = this.newGroupIndex || 1;
            this.new_customer.regDate = this.customers[this.customers.length - 1].regDate.split("T")[0]
        },
    
        updateStoredWeekIndex(){
          localStorage.setItem("weekIndex", this.weekIndex);
        },

        async addNewCustomer(){
          this.adding_new_customer = true;
            try{
                const response = await axios.post('/customers', this.new_customer );
                console.log("creatinew customer: ", response);
                this.getWeeklyTransactions();
                this.new_customer = {
            name: '',
            group: this.$route.params.group,
            group_index: '',
            regDate: '',
            address: '',
            phone: '',
          };
          this.toast({
              title: 'New customer created!'
          });
                // window.location.reload();
            }catch(error){
                console.log("error creating user: ", error);
                this.toast({
                    title: 'Error Adding Customer',
                    variant: 'destructive',
                    description: error.response.data.message,
                });
            }
            this.adding_new_customer = false;
        },

        async getWeeklyTransactions(){
          this.updateStoredWeekIndex();
    
          this.loading = true;
          try{
            const response = await axios.get(`/txns/group?regGroup=${this.regGroup}&weekIndex=${this.weekIndex}&year=${this.year}`);
            this.week = response.data;
            this.customers = response.data.customers;
            this.currentMonth = response.data.currentMonth;
            console.log("week: ", response);

            // auto update...
            this.AutoUpdateRegNumber()
    
          }catch(error){
            console.log("error getting transactions: ", error);
            this.error = error.response.data.message;
          }
          this.loading = false;
        },
    
        async editTransaction(txn){
          this.loading = true;
          try{
            const response = await axios.put(`/txns/${txn._id}/update`, {
              txnId: txn._id,
              amount: txn.amount,
            });
            console.log("response: ", response);
            this.getWeeklyTransactions();
          }catch(error){
            console.log("error editing transaction: ", error);
            // this.error = error.response.data.message;
            this.toast({
              title: 'Error editing transaction',
              variant: 'destructive',
              description: error.response.data.message,
            });
          }
          this.loading = false;
        },
    
        async newTransaction(){
          this.loading = true;
          try{
            const response = await axios.post(`/txns?owner=${this.currentCustomer}`, this.currentTxn );
            console.log(response);
            this.getWeeklyTransactions();
          }catch(error){
            console.log("error creating transaction: ", error);
            // this.error = error.response.data.message;
            this.toast({
              title: 'Error editing transaction',
              variant: 'destructive',
              description: error.response.data.message,
            });
          }
          this.loading = false;
        },
    
        async editCustomer(){
          this.loading = true;
          try{
            const response = await axios.put(`/customers/${this.currentCustomer._id}`, this.currentCustomer );
            console.log("updated customer: ", response);
            this.getWeeklyTransactions();
          }catch(error){
            console.log("error updating customer: ", error);
            // this.error = error.response.data.message;
            this.toast({
              title: 'Error editing transaction',
              variant: 'destructive',
              description: error.response.data.message,
            });
          }
          this.loading = false;
        },
    
    
        addNewTransactionToCell(cell, date, amount, type, owner){
          // replace / with - and change to YYYY-MM-DD
          const formattedDate = date.split('/').reverse().join('-');
          this.currentTxn = { date: formattedDate, amount, type };
          this.currentCustomer = owner;
    
          const currentText = cell.textContent.replace(/[^0-9.]/g, ''); // Remove everything except numbers
          const input = document.createElement("input");
          input.type = "number";
          input.min = "0"; // Only allow positive numbers
          input.value = currentText;
          input.className = "w-full outline-none border-2 border-blue-500 !h-full absolute top-0 left-0 text-center";
          
          input.onblur = () => {
            // Convert back to number and format
            const newValue = parseFloat(input.value);
            cell.textContent = isNaN(newValue) ? '-' : newValue.toLocaleString();
    
            // Here you would typically also update your data model
            // if the input is empty, set the amount to 0
            if(input.value == "" || input.value == null || input.value == undefined || input.value == NaN || input.value == 0){
              this.currentTxn.amount = 0;
              return null;
            } else {
              this.currentTxn.amount = Number(newValue);
              this.newTransaction();
            }
            
          };
          
          input.onkeydown = (event) => {
            if (event.key === "Enter") {
              input.blur();
            }else if (event.key === "Escape") {
              cell.textContent = currentText; // Revert to original value
            }
          };
          
          cell.textContent = "";
          cell.appendChild(input);
          input.focus();
        },
        // to edit a transaction cell...
        editCell(cell, txn) {
          this.currentTxn = txn;
          const currentText = cell.textContent.replace(/[^0-9.]/g, ''); // Remove everything except numbers
          const input = document.createElement("input");
          input.type = "number";
          input.min = "0"; // Only allow positive numbers
          input.value = currentText;
          input.className = "w-full outline-none border-2 border-blue-500 !h-full absolute top-0 left-0 text-center";
          
          input.onblur = () => {
            // Convert back to number and format
            const newValue = parseFloat(input.value);
            cell.textContent = isNaN(newValue) ? '-' : newValue.toLocaleString();
    
            // Here you would typically also update your data model
            // if the input is empty, set the amount to 0
            if(input.value == "" || input.value == null){
              this.currentTxn.amount = 0;
            } else {
              this.currentTxn.amount = Number(newValue);
            }
    
            // only update when theres an actual change of value..\
            this.editTransaction(this.currentTxn);
    
            
          };
    
          input.onkeydown = (event) => {
            if (event.key === "Enter") {
              input.blur();
            } else if (event.key === "Escape") {
              cell.textContent = currentText; // Revert to original value
            }
          };
          
          cell.textContent = "";
          cell.appendChild(input);
          input.focus();
        },
    
        updateCustomerCell(cell, customer, field){
          this.currentCustomer = customer;
    
          const input = document.createElement("input");
          input.type = "text";
          input.value = customer[field];
          input.className = "w-full outline-none border-2 border-blue-500 !h-full absolute top-0 left-0 text-left uppercase px-3";
          
          input.onblur = () => {
            cell.textContent = input.value;
            if(input.value == "" || input.value == null || input.value == undefined){
              return null;
            } else {
              this.currentCustomer[field] = input.value;
            }
    
            // only update when theres a change of value...
            // if(input.value != this.currentCustomer[field]){
            this.editCustomer(this.currentCustomer);
            // }
           
            
          };
          
          input.onkeydown = (event) => {
            if (event.key === "Enter") {
              input.blur();
            }else if (event.key === "Escape") {
              cell.textContent = input.value; // Revert to original value
            }
          };
          
          cell.textContent = "";
          cell.appendChild(input);
          input.focus();
        },
    
    
      },
    
      computed: {
        // get last new regNumber
        newGroupIndex(){
          const last_customer = this.customers[this.customers.length - 1]
            if(this.customers.length > 0){
                return Number(last_customer.group_index) + 1
            } else if(this.customers.length == 0){
              return 1
            }
        },

        newAddress(){
            const last_customer = this.customers[this.customers.length - 1]
            if(this.customers.length > 0){
                return last_customer.address
            }
        }
      },
    
      mounted() {
        this.getWeeklyTransactions();
      }
    }
    </script>
    
    <style scoped>
    
    </style>