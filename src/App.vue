<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">Youvastano</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
              <li class="nav-item">
                <RouterLink class="nav-link" to="/">Accueil</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/products/list">Liste des produits</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/users/list">Liste des utilisateurs</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/types/list">Liste des types de produits</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/customers/list">Liste des clients</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/invoices/list">Liste des factures</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink class="nav-link" to="/signin">Connexion</RouterLink>
              </li>
              <li class="nav-item" @click="signout">
                <a class="nav-link" href="#">Déconnexion</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <div class="wrapper">
      <RouterView />
    </div>
  </div>
</template>




<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { useRouter } from 'vue-router';

const router = useRouter();
let token = localStorage.getItem("token");

async function signout() {

  if (!token) {
        // Aucun token n'est présent, donc l'utilisateur n'est pas connecté
        alert("Vous n'êtes pas connecté.");
        return;
    }
  localStorage.removeItem("token");
  router.push('/signin');
}
</script>

<style scoped>
/* Vos styles ici */
</style>