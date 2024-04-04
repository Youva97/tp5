<template>
  <div class="signin-form">
    <h2>Se connecter</h2>
    <form @submit.prevent="signin">
      <div class="form-group">
        <label for="login">Login:</label>
        <input type="text" v-model="login" class="form-control" id="login" placeholder="Entrez votre login">
      </div>
      <div class="form-group">
        <label for="password">Mot de passe:</label>
        <input type="password" v-model="password" class="form-control" id="password"
          placeholder="Entrez votre mot de passe">
      </div>
      <button type="submit" class="btn btn-primary">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const login = ref('');
const password = ref('');
let token = localStorage.getItem("token");

async function signin() {
  if (token) {
        // Le token est déjà présent, donc l'utilisateur est déjà connecté
        alert("Vous êtes déjà connecté.");
        return;
    }

    let json = await (await fetch(`${import.meta.env.VITE_API_URL}/v1/signin`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            login: login.value,
            password: password.value,
        })
    })).json();
    if (json.error) {
        alert(json.error);
        return;
    }
    if (json.data.token) {
        localStorage.setItem('token', json.data.token);
        router.push('/');
    }
}

</script>