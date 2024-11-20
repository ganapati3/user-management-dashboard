<script setup>
import { onMounted, ref, watch } from 'vue';
import repository from '../api/repository';
import Loader from './ui/Loader.vue';

const props = defineProps(['userid']);
const emits = defineEmits(['save', 'close']);
const isLoading = ref(false)

// fetching specific user data and showing fake loader
onMounted(async() => {
  try {
      isLoading.value = true
        if (props.userid > 0) {
            const { data, status } = await repository.getUser(props.userid);
            if (status === 200) {
                userDetails.value = data
            }
        }
    } catch (e) {
      userDetails.value = {}
        alert(e)
  } finally {
    setTimeout(() => {
      isLoading.value = false          
    }, 1000);
  }
})

const userDetails = ref({
  name: "",
  username: "",
  email: "",
  address: {
    street: "",
    suite: "",
    city: "",
    zipcode: "",
  },
  phone: "",
  website: "",
});

// Validation errors
const errors = ref({
  name: "",
  username: "",
  email: "",
});

// Assuming username,name and email are required and making appropriate validations
const validateForm = () => {
  let valid = true;

  if (!userDetails.value.name.trim() ) {
    errors.value.name = "Name is required";
    valid = false;
  } else {
    errors.value.name = "";
  }

  if (!userDetails.value.username.trim()) {
    errors.value.username = "Username is required";
    valid = false;
  } else {
    errors.value.username = "";
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (userDetails.value.email && !userDetails.value.email || !emailRegex.test(userDetails.value.email)) {
    errors.value.email = "Please enter a valid email address.";
    valid = false;
  } else {
    errors.value.email = "";
  }

  return valid;
};

// validating form and emitting event to parent component
const submitForm = () => {
  if (validateForm() && Object.keys(userDetails.value).length > 0) {
    emits('save', userDetails.value);
  }
};

defineExpose({
  submitForm,
  userDetails
});

</script>

<template>
    <Loader v-if="isLoading" class="min-h-full min-w-full bg-transparent"/>
    <div v-else-if="Object.keys(userDetails).length > 0">
    <form @submit.prevent="submitForm" class="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
      <div>
        <label class="block mb-1 font-medium text-gray-700">Name <span class="text-red-500">*</span></label>
        <input
          v-model="userDetails.name"
          type="text"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p v-if="errors.name" class="text-sm text-red-500 mt-1">{{ errors.name }}</p>
      </div>

      <div>
        <label class="block mb-1 font-medium text-gray-700">Username <span class="text-red-500">*</span></label>
        <input
          v-model="userDetails.username"
          type="text"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p v-if="errors.username" class="text-sm text-red-500 mt-1">{{ errors.username }}</p>
      </div>

      <div class="lg:col-span-2">
        <label class="block mb-1 font-medium text-gray-700">Email <span class="text-red-500">*</span></label>
        <input
          v-model="userDetails.email"
          type="email"
          class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <p v-if="errors.email" class="text-sm text-red-500 mt-1">{{ errors.email }}</p>
      </div>

      <div class="lg:col-span-2">
        <label class="block mb-1 font-medium text-gray-700">Address</label>
        <div class="grid gap-2 grid-cols-2">
          <input
            v-model="userDetails.address.street"
            placeholder="Street"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            v-model="userDetails.address.suite"
            placeholder="Suite"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            v-model="userDetails.address.city"
            placeholder="City"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            v-model="userDetails.address.zipcode"
            placeholder="Zipcode"
            class="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>
    </form>
    </div>
    <div class="flex flex-col min-h-screen items-center justify-center" v-else>
      <h1 class="text-xl">Something went wrong,Try again</h1>
      <button
          type="button"
          @click="$emit('close')"
          class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mt-3"
        >
          Close
        </button>
    </div>
</template>
