import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoggedUserStore = defineStore('loggedUser', () => {
  const loggedUser = ref({})
  if (localStorage.getItem('loggedUser')) {
    loggedUser.value = JSON.parse(localStorage.getItem('loggedUser'));
  }
  function logIn(u) {
    loggedUser.value = u;
    localStorage.setItem('loggedUser', JSON.stringify(u));
  }

  return { loggedUser, logIn }
})