<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <nav class="navbar navbar-dark bg-dark navbar-expand-lg">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">Youvastano</a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
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
          </ul>
        </div>
      </div>
    </nav>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped></style>
