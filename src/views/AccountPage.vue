<template>
<!-- LOADER -->
<div v-if="loading" class=" fixed h-screen w-screen bg-black/20 top-0 left-0 flex justify-center items-center z-10">
    <div class=" p-10 rounded-lg size-14 shadow-lg flex justify-center items-center bg-white relative">
    <div class="size-8 border-[6px] border-gray-200 border-t-gray-800 rounded-full animate-spin absolute" style="animation-duration: 0.4s;"></div>
    </div>
</div>


<h1 class=" font-bold text-2xl">Upload a Customer JSON file</h1>
  <div class=" flex flex-col flex-wrap mt-12 gap-3 justify-start items-start">

  
    <div class="grid w-full max-w-sm items-center gap-1.5">
      <Label for="picture">Customer File</Label>
      <Input id="picture" type="file" @change="handleFileUpload" />
    </div>
    <Button variant="secondary" @click="uploadFile" :disabled="!selectedFile">Upload</Button>
  </div>
  <p v-if="message" :class="error ? 'text-red-500':'text-blue-500'">{{ message }}</p>
</template>

<script>
import Button from "@/components/ui/button/Button.vue";
import Input from "@/components/ui/input/Input.vue";
import { Label } from "radix-vue";
import axios from "axios";

export default {
  components: {
    Button,
    Input,
    Label,
  },
  data() {
    return {
      selectedFile: null,
      message: "",
      error: false,
      loading: false,
    };
  },
  methods: {
    handleFileUpload(event) {
      this.selectedFile = event.target.files[0];
    },
    async uploadFile() {
    this.loading = true;
      if (!this.selectedFile) {
        this.message = "Please select a file first!";
        return;
      }

      const formData = new FormData();
      formData.append("file", this.selectedFile);

      try {
        const response = await axios.post(
          "/import-customers",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        this.message = response.data.message;
      } catch (error) {
        console.error("Upload error:", error);
        this.message = error
        this.error = true;
      }
      this.loading = false;
    },
  },
};
</script>

<style scoped></style>
