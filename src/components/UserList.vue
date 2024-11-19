<script setup>
const props = defineProps(["users"])
</script>


<template>
<div class="!w-full border-[1px] rounded-md overflow-x-auto flex bg-gray-100 border-gray-400 text-black">
  <table class="w-full table-auto  shadow-md rounded">
    <thead>
      <tr class="bg-gray-600/20">
        <th class="px-4 py-2 text-left">ID</th>
        <th class="px-4 py-2 text-left">Name</th>
        <th class="px-4 py-2 text-left">Email</th>
        <th class="px-4 py-2 ">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id" class="border-t">
        <td class="px-4 py-2 text-left">{{ user.id }}</td>
        <td class="px-4 py-2 text-left">{{ user.name }}</td>
        <td class="px-4 py-2 text-left">{{ user.email }}</td>
        <td class="px-4 py-2 flex space-x-2 justify-center text-sm">
          <button
            @click="$emit('edit', user.id)"
            class="bg-green-500 text-white px-2 py-1 rounded flex gap-2 items-center"
          >
          <i class="lni lni-file-pencil"></i>
            Edit
          </button>
          <button
            @click="$emit('delete', user.id)"
            class="bg-red-500 text-white px-2 py-1 rounded flex gap-2 items-center"
          >
          <i class="lni lni-trash-3"></i>
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
  </div>
</template>
