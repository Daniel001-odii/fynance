<template>

  <!-- extra details toggle -->
  <div class=" flex flex-row gap-2 my-3">
    <label for="toggle" class="font-bold">
      <Checkbox class=" " id="toggle" v-model:checked="extraDetails" @update:checked="updateTableShape"/>
      Show Full Customer Details
    </label>
  </div>


  <div class="max-h-screen overflow-auto">
    <table v-if="customers" class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr class="bg-gray-200">
          <th class="border px-4 py-2 text-left">S/N</th>
          <th class="border px-4 py-2 text-left">Name</th>
          <th v-if="extraDetails" class="border px-4 py-2 text-left">Group</th>
          <th v-if="extraDetails" class="border px-4 py-2 text-left">Reg. Date</th>
          <th v-if="extraDetails" class="border px-4 py-2 text-left">Address</th>
          <th v-if="extraDetails" class="border px-4 py-2 text-left">Phone</th>

          <th v-for="week in weekTotals" :key="week"
            class="border px-4 py-2 ">
            {{ week.date }}
          </th>
          <th class="border">W/D</th>
          <th class="border">W/D</th>
          <th class="border px-4 py-2">balance</th>
          <th class="border px-4 py-2">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(customer, index) in customers" :key="index" class="border">
          <!-- <td class="border px-4 py-2">{{ index + 1 }}</td> -->
          <td class="border px-4 py-2 text-left hover:bg-gray-100 cursor-pointer relative"
          @dblclick="updateCustomerCell($event.target, customer, 'group_index')">
            {{ customer.group_index }}
          </td>

          <td class="border px-4 py-2 text-left hover:bg-gray-100 cursor-pointer relative"
            @dblclick="updateCustomerCell($event.target, customer, 'name')">
            <RouterLink :to="`/customers/${customer._id}`" class="hover:underline hover:text-blue-500">
              {{ customer.name }}
            </RouterLink>
          </td>
          <td v-if="extraDetails" class="border px-4 py-2 text-left hover:bg-gray-100 cursor-pointer relative"
            @dblclick="updateCustomerCell($event.target, customer, 'group')">
            <RouterLink :to="`/groups/${customer.group}`" class="hover:underline hover:text-blue-500">
            {{ customer.group }}
            </RouterLink>
          </td>

          <!-- REGDATE - AdDDRESS - PHONE -->
          <td v-if="extraDetails" class="border px-4 py-2 text-left hover:bg-gray-100 cursor-pointer relative"
            @dblclick="updateCustomerCell($event.target, customer, 'regDate')">
            {{ customer.regDate
             }}
          </td>
          <td v-if="extraDetails"class="border px-4 py-2 text-left hover:bg-gray-100 cursor-pointer relative"
            @dblclick="updateCustomerCell($event.target, customer, 'address')">
            {{ customer.address
             }}
          </td>
          <td  v-if="extraDetails" class="border px-4 py-2 text-left hover:bg-gray-100 cursor-pointer relative"
            @dblclick="updateCustomerCell($event.target, customer, 'phone')">
            {{ customer.phone
             }}
          </td>
          

          <td v-for="txn in customer?.deposit_txn" :key="txn" class="border relative hover:bg-gray-100 min-w-[100px]">
            <span class="!w-full !h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer"
              v-if="txn.amount != 0" @dblclick="editCell($event.target, txn)">{{ txn.amount?.toLocaleString() }}</span>
            <span class="!w-full !h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer" v-else
              @dblclick="
                addNewTransactionToCell(
                  $event.target,
                  txn.date,
                  0,
                  'deposit',
                  customer._id
                )
                ">-</span>
          </td>

          <td v-for="txn in customer?.withdrawal_txn" :key="txn"
            class="border relative hover:bg-gray-100 min-w-[100px]">
            <span class="!w-full !h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer"
              v-if="txn.amount != 0" @dblclick="editCell($event.target, txn)">{{ txn.amount?.toLocaleString() }}</span>
            <span class="!w-full !h-full absolute top-0 left-0 flex justify-center items-center cursor-pointer" v-else
              @dblclick="
                addNewTransactionToCell(
                  $event.target,
                  txn.date,
                  0,
                  'withdrawal',
                  customer._id
                )
                ">-</span>
          </td>
          <td class="border px-4 py-2 cursor-not-allowed">
            {{ customer?.balance?.toLocaleString() }}
          </td>
          <td class="border px-4 py-2">
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <button class="underline text-red-500" @click="currentCustomer = customer">
                  Delete Customer
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent class="bg-white">
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure you want to delete this
                    customer?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    the customers records including all transactions for all
                    weeks across the ledger groups
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel class="!text-white">Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction class="!bg-red-500 !text-white" @click="deleteCustomer">Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </td>
        </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import { useToast } from "@/components/ui/toast/use-toast";
import axios from "axios";
import Button from "@/components/ui/button/Button.vue";
import { Checkbox } from '@/components/ui/checkbox'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default {
  components: {
    Button,
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
    Checkbox,
  },
  props: {
    customers: Array,
    weekTotals: Array,
  },
  data() {
    return {
      toast: useToast().toast,
      currentCustomer: null,
      cell_values: {},
      extraDetails: false,
    };
  },
  methods: {

    updateTableShape(){
      localStorage.setItem('table_collapsed', this.extraDetails);
    },

    reloadTableData() {
      this.$emit("reloadData");
    },

    async editTransaction(txn) {
      // this.loading = true;
      try {
        const response = await axios.put(`/txns/${txn._id}/update`, {
          txnId: txn._id,
          amount: txn.amount,
        });
        console.log("response: ", response);
        this.reloadTableData();
      } catch (error) {
        console.log("error editing transaction: ", error);
        this.toast({
          title: "Error editing transaction",
          variant: "destructive",
          description: error.response.data.message,
        });
      }
      this.loading = false;
    },

    async newTransaction() {
      // this.loading = true;
      try {
        const response = await axios.post(
          `/txns?owner=${this.currentCustomer}`,
          this.currentTxn
        );
        console.log(response);
        this.reloadTableData();
      } catch (error) {
        console.log("error creating transaction: ", error);
        // this.error = error.response.data.message;
        this.toast({
          title: "Error editing transaction",
          variant: "destructive",
          description: error.response.data.message,
        });
      }
      this.loading = false;
    },

    async editCustomer() {
      this.loading = true;
      try {
        const response = await axios.put(
          `/customers/${this.currentCustomer._id}`,
          this.currentCustomer
        );
        console.log("updated customer: ", response);
        this.reloadTableData();
      } catch (error) {
        console.log("error updating customer: ", error);
        // this.error = error.response.data.message;
        this.toast({
          title: "Error editing transaction",
          variant: "destructive",
          description: error.response.data.message,
        });
      }
      this.loading = false;
    },

    async deleteCustomer() {
      try {
        const id = this.currentCustomer._id;
        const response = await axios.delete(`/customers/${id}`);
        console.log("deleted account: ", response);
        this.toast({
          description: response.data.message,
        });
        this.reloadTableData();
      } catch (error) {
        console.log("error in delete: ", error);
        // For the "variant" property, besides "destructive", possible values might be "default", "success", "warning", or "info".
        this.toast({
          title: "Error editing transaction",
          variant: "info", // Alternatives: 'default', 'success', 'warning', 'info'
          description: error.response.data.message,
        });
      }
    },

    addNewTransactionToCell(cell, date, amount, type, owner) {
      const formattedDate = date.split("/").reverse().join("-");
      this.currentTxn = { date: formattedDate, amount, type };
      this.currentCustomer = owner;

      const currentText = cell.textContent.replace(/[^0-9.]/g, "");
      const input = document.createElement("input");
      input.type = "number";
      input.min = "0";
      input.value = currentText;
      input.className =
        "w-full outline-none border-2 border-blue-500 !h-full absolute top-0 left-0 text-center";

      const real_value = currentText;

      input.onblur = () => {
        const newValue = parseFloat(input.value);
        cell.textContent = isNaN(newValue) ? "-" : newValue.toLocaleString();
        if (input.value !== "" && input.value !== null) {
          this.currentTxn.amount = Number(newValue);
        }
      };

      input.onkeydown = (event) => {
        if (event.key === "Enter") {
          input.blur();
          this.newTransaction();
          // this.moveToNextCell(cell);
        } else if (event.key === "Escape") {
          cell.textContent = "-";
        } else if (event.key === "Tab") {
          event.preventDefault();
          input.blur();
          this.moveToNextCell(cell);
        }
      };

      cell.textContent = "";
      cell.appendChild(input);
      input.focus();
    },

    // to edit a transaction cell...
    editCell(cell, txn) {
      this.currentTxn = txn;
      const currentText = cell.textContent.replace(/[^0-9.]/g, ""); // Remove everything except numbers
      const input = document.createElement("input");
      input.type = "number";
      input.min = "0"; // Only allow positive numbers
      input.value = currentText;
      input.className =
        "w-full outline-none border-2 border-blue-500 !h-full absolute top-0 left-0 text-center";

      input.onblur = () => {
        const newValue = parseFloat(input.value);
        cell.textContent = isNaN(newValue) ? "-" : newValue.toLocaleString();
        if (input.value !== "" && input.value !== null) {
          this.currentTxn.amount = Number(newValue);
        }
      };

      input.onkeydown = (event) => {
        if (event.key === "Enter") {
          input.blur();
          this.editTransaction(this.currentTxn);
          // this.moveToNextCell(cell);
        } else if (event.key === "Escape") {
          cell.textContent = currentText; // Revert to original value
        } else if (event.key === "Tab") {
          event.preventDefault();
          input.blur();
          this.moveToNextCell(cell);
        }
      };

      cell.textContent = "";
      cell.appendChild(input);
      input.focus();
    },

    updateCustomerCell(cell, customer, field) {
      this.currentCustomer = customer;

      const input = document.createElement("input");
      input.type = "text";
      input.value = customer[field];
      input.className =
        "w-full outline-none border-2 border-blue-500 !h-full absolute top-0 left-0 text-left uppercase px-3";

      input.onblur = () => {
        cell.textContent = input.value;
        if (input.value !== "" && input.value !== null) {
          this.currentCustomer[field] = input.value;
        }
      };

      input.onkeydown = (event) => {
        if (event.key === "Enter") {
          input.blur();
          this.editCustomer(this.currentCustomer);
        } else if (event.key === "Escape") {
          cell.textContent = input.value;
        } else if (event.key === "Tab") {
          event.preventDefault();
          input.blur();
          this.moveToNextCell(cell);
        }
      };

      cell.textContent = "";
      cell.appendChild(input);
      input.focus();
    },

    moveToNextCell(cell) {
      // Get the parent TD element (in case the cell is a span)
      const td = cell.closest("td");
      if (!td) return;

      const row = td.closest("tr");
      if (!row) return;

      const cells = Array.from(row.children); // Get all TDs in the row
      const currentIndex = cells.indexOf(td);

      if (currentIndex < cells.length - 1) {
        const nextTd = cells[currentIndex + 1];
        // Find the correct target element (span or td itself)
        const nextTarget = nextTd.querySelector("span") || nextTd;
        if (nextTarget) {
          nextTarget.dispatchEvent(new Event("dblclick", { bubbles: true }));
        }
      }
    },
  },

  created(){
    const shape = localStorage.getItem('table_collapsed') ? localStorage.getItem('table_collapsed') : false;

    if(shape == 'true'){
      this.extraDetails = true
    } else {
      this.extraDetails = false
    }

    console.log(this.extraDetails)
  }
};
</script>

<style scoped>
table{
  @apply !uppercase
}
</style>
