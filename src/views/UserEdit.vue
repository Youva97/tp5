<template>
    <div>
      <h1>Modification des Utilisateurs</h1>
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
        <div class="mb-3">
          <label for="userPassword" class="form-label">Mot de passe</label>
          <input type="password" class="form-control" id="userPassword" v-model="user.password">
        </div>
        <button type="submit" class="btn btn-primary">Enregistrer</button>
        <button type="button" @click="deleteUser" class="btn btn-danger">Supprimer</button>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';

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
          user.value = (await response.json()).data;
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
          const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/user/${userId}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
            }
          });
          if (response.ok) {
            router.push('/users/list');
          } else {
            console.error('Failed to delete user');
          }
      }
  
      onMounted(async () => {
        await loadUsers();
      });
  </script>
  