<script setup>
import { ref,onMounted} from 'vue';
import UserList from '../components/UserList.vue';
import UserForm from '../components/UserForm.vue';
import repository from '../api/repository';
import Popup from '../components/ui/Popup.vue';
import Loader from '../components/ui/Loader.vue';

const users = ref([]);
const showForm = ref(false);
const selectedUserid = ref(null);
const isEditing = ref(false);
const userformRef = ref(null)
const isLoading = ref(false)
const isSubmitting = ref(false)

// Fetch users from the API
const fetchUsers = async () => {
    try {
        isLoading.value = true
        const { data } = await repository.getUsers();
        users.value = data;
    } catch (error) {
        console.error('Error fetching users:', error);
        alert(error)
    } finally {
        isLoading.value = false
    }
};

onMounted(async () => {
    await fetchUsers()
})

// Open form to add a new user
const showAddUser = () => {
    selectedUserid.value = 0;
    isEditing.value = false;
    showForm.value = true;
};

// Open form to edit an existing user
const editUser = (id) => {
    selectedUserid.value = id;
    isEditing.value = true;
    showForm.value = true;
};

// Delete a user
const deleteUserAction = async (id) => {
    try {
        const isApproved = confirm(
            "Do you really want to delete this record?"
        )
        if (!isApproved) {
            return
        }
    await repository.deleteUser(id);
    users.value = users.value.filter((user) => user.id !== id);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

// Save (add or edit) a user
const saveUser = async (user) => {
    try {
        isSubmitting.value = true
        if (isEditing.value) {
            await repository.updateUser(user.id, user);
            const index = users.value.findIndex((u) => u.id === user.id);
            users.value[index] = user;
            alert("User succefully updated.")
        } else {
            const { data } = await repository.addUser(user);
            users.value.push(data);
            alert("User succefully created.")
        }
        showForm.value = false;
    } catch (error) {
        console.error('Error saving user:', error);
        alert(error)
    } finally {
        isSubmitting.value = false
    }
};


const closeForm = () => {
    showForm.value = false;
    console.log('sdflj')
};

const handleReload = () => {
    window.location.reload()
}

</script>

<template>
    <Loader v-if="isLoading"/>
  <div class="container mx-auto p-4 flex flex-col min-h-screen justify-center">
    <h1 class="text-2xl font-bold mb-4 text-center">User Management Dashboard</h1>
    <template v-if="users.length > 0">
    <div class="self-end">
        <button
        @click="showAddUser"
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4 flex items-center text-sm gap-2 hover:bg-blue-800"
        >
        <i class="lni lni-plus text-base"></i>
        <span>Add User</span>
        </button>
    </div>
    <UserList :users="users" @edit="editUser" @delete="deleteUserAction" />
    <Popup v-model:isOpen="showForm">
        <template #title>
            {{ selectedUserid > 0 ? 'Edit User' : 'Add User' }}
        </template>
        <UserForm @save="saveUser" @close="closeForm" :userid="selectedUserid" ref="userformRef"/>
        <template #footer>
            <button
            @click="userformRef.submitForm"
            type="submit"
            :disabled="isSubmitting"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex gap-2 items-center"
            >
                <div v-if="isSubmitting" class="border-2 border-gray-200 h-5 w-5 rounded-full border-t-blue-500 animate-spin"></div>
                <span>Save</span>
            </button>
            <button
            type="button"
            @click="closeForm"
            class="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
            Cancel
            </button>
        </template>
    </Popup>
    </template>
    <div v-else-if="!isLoading" class="self-center text-center">
        <h1>Oops!, Something went wrong</h1>
        <button
            @click="handleReload"
            type="button"
            class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
            Retry
            </button>
    </div>
  </div>
</template>

