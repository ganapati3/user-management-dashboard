import { ref } from 'vue';
import axios from 'axios';

const axiosInstance = ref(null);

// making axios setup to use interceptor if required in future
export function useAxios(){
  if (!axiosInstance.value) {
    const instance = axios.create({
      baseURL: "https://jsonplaceholder.typicode.com/" 
    });

    axiosInstance.value = instance;
  }

  return axiosInstance.value;
}