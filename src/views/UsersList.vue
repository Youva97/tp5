<template>
  <div>
    <h1>Liste des utilisateurs</h1>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nom de famille</th>
          <th scope="col">Prénom</th>
          <th scope="col">Login</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.lastname }}</td>
          <td>{{ user.firstname }}</td>
          <td>{{ user.login }}</td>
          <td>
            <router-link :to="'/users/edit/' + user.id" class="btn btn-primary">Éditer</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
  <script>
  import { onMounted, ref } from 'vue';
  
  export default {
    setup() {
      let users = ref([]);

      async function loadUsers() {
        let json = await (await fetch(`${import.meta.env.VITE_API_URL}/v1/users`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c',
          }
        })).json();
        users.value = json.data;
      }
      
      onMounted(async () => {
        await loadUsers();
      });
  
      return { users };
    }
  }
  </script>
  
  <style>
  /* Styles spécifiques au composant */
  </style>
  