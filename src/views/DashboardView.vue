<template>
    <!-- LOADER -->
    <div v-if="loading" class=" fixed h-screen w-screen bg-black/20 top-0 left-0 flex justify-center items-center z-10">
      <div class=" p-10 rounded-lg size-14 shadow-lg flex justify-center items-center bg-white relative">
        <div class="size-8 border-[6px] border-gray-200 border-t-gray-800 rounded-full animate-spin absolute" style="animation-duration: 0.4s;"></div>
      </div>
    </div>



    <div class="flex flex-col">
        <div class="flex flex-col gap-5 text-3xl font-bold uppercase">
         <h1 class="">All Groups - Year: {{ year }} - Month: {{ currentMonth }}</h1>
        </div>

        <!-- STATS DISPLAY AREA -->
         <div class="flex flex-row flex-wrap gap-3 mt-12">
          <div class=" rounded-md bg-black text-white p-6 flex flex-col min-w-sm text-2xl">
            <i class="bi bi-people"></i>
            <span>Total customers {{ dashboard?.no_of_customers }}</span>
          </div>

          <div class=" rounded-md bg-black text-white p-6 flex flex-col min-w-sm text-2xl relative">
            <i class="bi bi-cash-stack"></i>
            <span>Total income {{ dashboard?.income?.toLocaleString() }}  <small class=" text-red-500 text-[14px]">- {{ dashboard.withdrawals }}</small></span>
          </div>

          <div class=" rounded-md bg-black text-white p-6 flex flex-col min-w-sm text-2xl relative">
            <i class="bi bi-journal-text"></i>
            <span>Total Ledger Groups {{ dashboard?.no_of_groups }} </span>
          </div>

          <button @click="downoadReports" class=" rounded-md bg-blue-500 text-white p-6 flex flex-col min-w-sm text-2xl relative">
            <i class="bi bi-download"></i>
            <span>Download Excel Sheet </span>
          </button>
         </div>
    
        <!-- error display area -->
        <div v-if="error" class=" p-3 rounded-lg bg-red-500 text-white font-bold border border-red-500 flex justify-between items-center">
          <span>{{ error }}</span>
          <button @click="reloadPage()"><i class="bi bi-x-lg"></i></button>
        </div>
     
        <!-- select week  -->
        <span class=" text-xl font-bold mt-12">Transactions For All Ledger Groups in Week {{ weekIndex }}</span>

       
         <!-- select week  -->
    <div class=" flex flex-row justify-between py-5">
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
            <option v-for="index in max_week" :value="index">week {{ index }}</option>
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
        <span class=" text-xl font-bold mb-4">Daily Totals For Week {{ weekIndex }} for All Ledger Groups</span>
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
    import { ToastAction } from '@/components/ui/toast'
    import { h } from 'vue'
    import CustomTable from '@/components/CustomTable.vue';

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
    
    export default {
      name: 'DashboardView',
      components: {
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
        CustomTable,
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
          dashboard: {},
         
        }
      },
    
      methods: {
        reloadPage(){
          window.location.reload()
        },
    
        updateStoredWeekIndex(){
          localStorage.setItem("weekIndex", this.weekIndex);
        },

        async downoadReports(){
          try{
            const res = await axios.get('/txns/reports', {
              responseType: 'arraybuffer',
            });
            const blob = new Blob([res.data], {
              type: 'application/octet-stream',
            });

            const url = window.URL.createObjectURL(blob);

            const link = document.createElement('a');
            link.href = url;
            link.download = 'Ledger-Excel.xlsx';
            document.body.appendChild(link);
            link.click();

            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
            console.log('res from reports download: ', res)
            alert('Excel reports downloaded succesfully!');
          }catch(err){
            // this.error = err.response.data.message
            console.log("err getting reports ", err)
          }
        },

        async getDashboardData(){
          this.loading = true;
          try{
            const response = await axios.get('/txns/dashboard');
            this.dashboard = response.data;
          }catch(error){
            console.log("error getting dashboard data: ", error);
            this.error = error.response.data.message;
          }
          this.loading = false;
        },
    
        async getWeeklyTransactions(){
          this.updateStoredWeekIndex();
    
          this.loading = true;
          try{
            const response = await axios.get(`/txns/all_group?weekIndex=${this.weekIndex}&year=${this.year}`);
            this.week = response.data;
            this.customers = response.data.customers;
            this.currentMonth = response.data.currentMonth;
            console.log("week: ", response);

            // get dashboard data...
            this.getDashboardData();
    
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
              action: h(ToastAction, {
                altText: 'Try again',
                onClick: () => window.location.reload(), // Call the custom function here
              }, {
                default: () => 'Try again',
              }),
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
              title: 'Error adding new transaction',
              variant: 'destructive',
              description: error.response.data.message,
              action: h(ToastAction, {
                altText: 'Try again',
                onClick: () => window.location.reload(), // Call the custom function here
              }, {
                default: () => 'Try again',
              }),
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
              title: 'Error editing customer',
              variant: 'destructive',
              description: error.response.data.message,
              action: h(ToastAction, {
                altText: 'Try again',
                onClick: () => window.location.reload(), // Call the custom function here
              }, {
                default: () => 'Try again',
              }),
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
    
      },
    
      created() {
        // this.getDashboardData();
        this.getWeeklyTransactions();
      }
    }
    </script>
    
    <style scoped>
    
    </style>