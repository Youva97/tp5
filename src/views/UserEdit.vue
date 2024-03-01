<template>
    <div>
      <h1>Modification des produits</h1>
      <form @submit.prevent="saveUser">
        <div class="mb-3">
          <label for="userLastname" class="form-label">Nom de Famille</label>
          <input type="text" class="form-control" id="userLastname" v-model="user.lastname">
        </div>
        <div class="mb-3">
          <label for="userFirsname" class="form-label">Prénom</label>
          <input type="text" class="form-control" id="userFirsname" v-model="user.firstname">
        </div>
        <div class="mb-3">
          <label for="userLogin" class="form-label">Login</label>
          <input type="text" class="form-control" id="userLogin" v-model="user.login">
        </div>
        <button type="submit" class="btn btn-primary">Enregistrer</button>
        <button type="button" @click="deleteUser" class="btn btn-danger">Supprimer</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  
  export default {
    setup() {
      const userId = useRoute().params.id;
      const router = useRouter();
  
      const user = ref({});

      async function loadUsers() {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/users/${userId}`, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
            }
          });
          user.value = await response.json();
      }
  
      async function saveUser() {
          const method = userId ? 'PUT' : 'POST';
          const url = userId ? `${import.meta.env.VITE_API_URL}/v1/users/${userId}` : `${import.meta.env.VITE_API_URL}/v1/users`;
          const response = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
            },
            body: JSON.stringify(user.value)
          });
          if (response.ok) {
            router.push('/users/list');
          } else {
            console.error('Failed to save user');
          }
      }
  
      async function deleteUser() {
          const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/User/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
            }
          });
          if (response.ok) {
            router.push('/products/list');
          } else {
            console.error('Failed to delete user');
          }
      }
  
      onMounted(async () => {
        await loadUsers();
      });
  
      return {
        user,
        saveUser,
        deleteUser
      };
    }
  };
  </script>
  