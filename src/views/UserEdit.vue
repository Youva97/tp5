<template>
  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-md-12">
        <div class="card border-primary">
          <div class="card-header bg-primary text-white">
            <h1 class="card-title">{{ isNewProduct ? 'Créer un nouveau Utilisateur' : 'Modification des Utilisateurs' }}
            </h1>
          </div>
          <div class="card-body">
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
                <input type="password" autocomplete="new-password" class="form-control" id="userPassword"
                  v-model="user.password">
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <button type="button" @click="deleteUser" class="btn btn-danger">Supprimer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
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
      'Authorization': localStorage.getItem('token')
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
      'Authorization': localStorage.getItem('token')
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/users/${userId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
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