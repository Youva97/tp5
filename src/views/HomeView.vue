<script setup>

</script>

<template>
  <main>
    <button type="button" class="btn btn-success btn-lg btn-block"><a href="/users/list" class="nav-link badge-light">Liste des Utilisateurs</a></button>
    <button type="button" class="btn btn-primary btn-lg btn-block"><a href="/products/list" class="nav-link badge-light">Listes des Produits</a></button>
    <button type="button" class="btn btn-primary btn-lg btn-block"><a href="/types/list" class="nav-link badge-light">Listes des Types de produits</a></button>
    <button type="button" class="btn btn-primary btn-lg btn-block"><a href="/customers/list" class="nav-link badge-light">Listes des Clients</a></button>
    <button type="button" class="btn btn-primary btn-lg btn-block" v-if="token"><a href="/signin" class="nav-link badge-light">Connexion</a></button>
    <button type="button" class="btn btn-primary btn-lg btn-block" v-if="token"><a href="#" class="nav-link badge-light">Deconnexion</a></button>
    <TheWelcome />
  </main>
</template>
