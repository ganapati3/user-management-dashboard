<script setup>
import { ref, watch } from 'vue';

const props = defineProps(['isOpen']);
const emits = defineEmits(['update:isOpen']);

const isOpen = ref(false);

const togglePopup = () => {
  isOpen.value = !isOpen.value;
  emits('update:isOpen', isOpen.value);
};

watch(
  () => props.isOpen,
  (first) => {
    isOpen.value = first;
  }
);
</script>

<template>
  <div class="text-black flex justify-center">
    <transition name="slide">
      <div v-if="isOpen" class="fixed inset-0 z-50 flex">
        <!-- Overlay -->
        <div
          class="flex-1 bg-gray-800 bg-opacity-50"
          @click="togglePopup"
        ></div>

        <!-- Popup Content -->
        <div
          class="bg-white shadow-lg transform transition-transform w-full lg:w-1/3 flex flex-col"
        >
          <!-- Header -->
          <div class="p-4 flex justify-between items-center border-b">
            <h2 class="text-xl font-bold">
              <slot name="title"></slot>
            </h2>
            <button
              @click="togglePopup"
              class="text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
          </div>

          <!-- Body -->
          <div class="p-4 px-8 flex-grow overflow-auto">
            <slot></slot>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t bg-gray-100 flex justify-end space-x-2">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter-from {
  transform: translateX(100%);
  opacity: 0;
}
.slide-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-from {
  transform: translateX(0%);
  opacity: 1;
}
.slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
