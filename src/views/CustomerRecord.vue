<template>
    <!-- LOADER -->
    <div v-if="loading" class=" fixed h-screen w-screen bg-black/20 top-0 left-0 flex justify-center items-center z-10">
      <div class=" p-10 rounded-lg size-14 shadow-lg flex justify-center items-center bg-white relative">
        <div class="size-8 border-[6px] border-gray-200 border-t-gray-800 rounded-full animate-spin absolute" style="animation-duration: 0.4s;"></div>
      </div>
    </div>

    
    <div v-show="transaction_edit_modal" class=" fixed top-0 left-0 bg-black w-full min-h-screen z-50 backdrop-blur-sm  bg-opacity-50 flex justify-center items-center p-5">
      <div class=" max-w-[700px] bg-white rounded-lg flex flex-col gap-3 p-8 w-full">
        <h1 class=" font-bold text-2xl">edit transaction</h1>
       <!--  {{ transaction }} <br/>
        {{ customer.id }} -->
        <div class=" flex flex-col">
            <span>Edit transaction amount</span>
            <input type="number" v-model="transaction.amount" class=" p-3"/>
        </div>

        <div class=" flex flex-col">
            <span>Edit transaction Date</span>
            <input type="date" v-model="transaction.date" class=" p-3 "/>
        </div>
          <div class="flex flex-row gap-3 justify-end items-center">
          <Button variant="destructive" @click="[transaction_edit_modal = !transaction_edit_modal, error = '']">Close</Button>
          <Button @click="[editTransactionAmount(), transaction_edit_modal = !transaction_edit_modal]">Save Edit</Button>
        </div>
      </div>
    </div>

       <!-- DELTE TRANSACTION MODAL -->
    <div v-show="delete_transaction_modal" class=" fixed top-0 left-0 bg-black w-full min-h-screen z-50 backdrop-blur-sm  bg-opacity-50 flex justify-center items-center p-5">
      <div class=" max-w-[700px] bg-white rounded-lg flex flex-col gap-3 p-8 w-full">
        <h1 class=" font-bold text-2xl">Are your sure you want to delete the transaction? <br/> </h1>
        <div class=" flex flex-row gap-3">
            {{ transaction.type }}<br/>
            {{ transaction.date }}<br/>
            {{ transaction.amount }}
            
        </div>
          <div class="flex flex-row gap-3 justify-end items-center">
            <Button variant="destructive" @click="[delete_transaction_modal = !delete_transaction_modal, error = '']">Close</Button>
            <Button @click="[deleteTransaction(transaction.id), delete_transaction_modal = !delete_transaction_modal]">Yes Delete</Button>
            </div>
      </div>
    </div>


    <div id="table">
        <!-- <h1>All Record for {{ customer.name }}</h1>  -->

        <div class=" flex flex-row flex-wrap justify-between items-center border rounded-md p-5  mt-3">
            <div class=" flex flex-col">
                <span class=" font-bold text-4xl">{{ customer.name }}</span> <br/>
                <span>Group: {{ customer.group }} <br/> Phone: {{ customer.phone }} <br/> Address: {{ customer.address }} <br/> Registration Date: {{ new Date(customer.regDate).toLocaleDateString('en-GB') || customer.date }}</span>
            </div>
            
            <Button @click="printSheet()"> <i class="bi bi-printer"></i> Print Page</Button>
        </div>
        
        <!-- {{ transactions }} <br/> -->

        <div class=" flex flex-col gap-3 mt-12" >
            <!-- {{ summary }} -->
            
            <div class=" flex flex-col" 
            style=" display: flex;
            gap: 3px;
            flex-direction: column;"
            >
                <span>{{ customer.no_of_deposits }} Total Deposits = NGN {{ customer?.total_deposits?.toLocaleString() }} </span>
                <span>{{ customer.no_of_withdrawals }} Total Withdrawals = NGN {{ customer?.total_withdrawals?.toLocaleString() }} </span>
                <span>Current Balance = NGN {{ customer.balance?.toLocaleString() }}</span>
            </div>
            
            <span class=" font-bold text-xl">All Customer Transactions</span>
            <Table class=" border border-t mt-1 " ref="printable_table" style=" margin-top: 5px;">
                <!-- <TableCaption>A list of customers and transactions.</TableCaption> -->
                <TableHeader class="!text-black">
                <TableRow>
                    <TableHead class=" text-left border">Transaction type</TableHead>
                    <TableHead class=" text-right border">Amount (NGN)</TableHead>
                    <TableHead class=" text-right border">Date</TableHead>
                    <TableHead class=" text-right border">Action</TableHead>
                </TableRow>
                </TableHeader>
                <TableBody>
                <TableRow v-for="(item, index) in customer.transactions" :key="index" class=" cursor-pointer">
                    <TableCell class="text-left border">
                    {{  item.type }}
                    </TableCell>
    
                    <TableCell class="text-right border">
                    {{ item.amount.toLocaleString() }}
                    </TableCell>

                    <TableCell class="text-right border">
                    {{ new Date(item.date).toLocaleDateString('en-GB') }}
                    </TableCell>

                    <TableCell class=" text-right">
                        <!-- {{ item._id }} -->
                        <button @click="deleteCustomerData(item._id)" class="underline text-red-500 cursor-pointer">Delete</button>
                    </TableCell>
                </TableRow>
    
                </TableBody>
            </Table>
        </div>
       
       
    </div>
    <!-- {{ customer }} -->
</template>

<script>
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
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from '@/components/ui/dropdown-menu'

import { Button } from '@/components/ui/button'
import axios from 'axios';


    export default {
        name: "CustomerRecord",
        components: {
            Table,
            TableBody,
            TableCaption,
            TableCell,
            TableHead,
            TableHeader,
            TableRow,
            DropdownMenu,
        DropdownMenuContent,
        DropdownMenuItem,
        DropdownMenuLabel,
        DropdownMenuSeparator,
        DropdownMenuTrigger,
        Button,
        },
        data() {
            return {
                customer_id: this.$route.params.customer_id,
                transactions: [],
                customer: {
                    id: '',
                    name: '',
                    balance: '',
                },
                week: [],
        
                error: '',
                transaction_edit_modal: false,

                transaction: {
                    id:'',
                    type: '',
                    amount: '',
                    date: '',
                    customer_id: ''
                },
                delete_transaction_modal: false,
                loading: false,
            }
        },
        methods: {
        editTransactionAmount() {
            const transactionId = this.transaction.id;
            const newAmount = this.transaction.amount;
            const customerId = this.customer.id;
            // Retrieve all customers from localStorage
            const customers = JSON.parse(localStorage.getItem("customers")) || [];

            // Find the specific customer
            const customer = customers.find((c) => c.id === customerId);

            if (!customer) {
                console.error("Customer not found");
                return false;
            }

            // Find the specific transaction
            const transactionIndex = customer.transactions.findIndex((t) => t.id === transactionId);

            if (transactionIndex === -1) {
                console.error("Transaction not found");
                return false;
            }

            // Update the transaction amount
            const transaction = customer.transactions[transactionIndex];
            const previousAmount = transaction.amount;

            transaction.amount = newAmount;
            transaction.date = this.transaction.date;

            // Adjust the customer's balance
            if (transaction.type === "deposit") {
                customer.balance += newAmount - previousAmount;
            } else if (transaction.type === "withdrawal") {
                customer.balance -= newAmount - previousAmount;
            }

            // Save updated customers back to localStorage
            localStorage.setItem("customers", JSON.stringify(customers));

            // load data for refresh...
            this.getCustomerRecordsByWeek(this.customer_id);
            console.log(`Transaction ${transactionId} amount updated to ${newAmount}.`);
            return true;
        },


        printSheet(){
            const table = document.getElementById("table").outerHTML;
            const print_window = window.open("", "_blank");
            print_window.document.write(`
                <html>
                    <head>
                        <title>${this.customer.name} Ledger Account Statement</title>
                    </head>
                    <style>
                     @page {
                        size: landscape;
                    }
                        table{
                        width: 100%;
                        border-collapse: collapse;
                    }
                        th, td {
                        border: 1px solid black;
                        padding: 8px;
                    }
                    </style>
                    <body>
                        <h3>${this.customer.name} Account Statement</h3>
                        ${table}
                    </body>
                </html>
            `);
            print_window.document.close();
            print_window.focus();
            print_window.print();
            print_window.close();
        },

        convertToReadableDateTime(isoDate) {
            const date = new Date(isoDate);

            const options = {
                year: "numeric",
                month: "long",
                day: "numeric",
            };

            return date.toLocaleString("en-US", options);
        },

        async getCustomerData(){
            this.loading = true;
            try{
                const response = await axios.get(`/customers/${this.customer_id}`);
                console.log("customer data: ", response)
                this.customer = response.data.customer;
            }catch(error){
                console.log("error getting customer data: ", error);
            }
            this.loading = false;
        },

        async deleteCustomerData(id){
            try{
                const response = await axios.delete(`/txns/${id}/delete`);
                console.log("deleting txn: ", response);
                this.getCustomerData()
            }catch(error){
                console.log("error deleting txn: ", error)
            }
        }

          

        },

        mounted() {
            this.getCustomerData()
        },
    }
</script>

<style scoped>

</style>