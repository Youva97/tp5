<script setup>

</script>

<template>
  <main>
    <div class="container-fluid">
      <div class="row">
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Liste des Utilisateurs</h5>
              <p class="card-text">Accédez à la liste complète des utilisateurs enregistrés.</p>
              <button type="button" class="btn btn-success btn-lg btn-block"><a href="/users/list" class="nav-link badge-light">Accéder</a></button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Liste des Produits</h5>
              <p class="card-text">Découvrez notre catalogue de produits disponibles.</p>
              <button type="button" class="btn btn-primary btn-lg btn-block"><a href="/products/list" class="nav-link badge-light">Accéder</a></button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Liste des Types de produits</h5>
              <p class="card-text">Explorez les différentes catégories de produits disponibles.</p>
              <button type="button" class="btn btn-primary btn-lg btn-block"><a href="/types/list" class="nav-link badge-light">Accéder</a></button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Liste des Clients</h5>
              <p class="card-text">Consultez la liste de nos clients enregistrés.</p>
              <button type="button" class="btn btn-primary btn-lg btn-block"><a href="/customers/list" class="nav-link badge-light">Accéder</a></button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4" v-if="token">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Connexion</h5>
              <p class="card-text">Connectez-vous à votre compte utilisateur.</p>
              <button type="button" class="btn btn-primary btn-lg btn-block"><a href="/signin" class="nav-link badge-light">Accéder</a></button>
            </div>
          </div>
        </div>
        <div class="col-lg-4 col-md-6 mb-4" v-if="token">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Déconnexion</h5>
              <p class="card-text">Déconnectez-vous de votre compte utilisateur actuel.</p>
              <button type="button" class="btn btn-primary btn-lg btn-block"><a href="#" class="nav-link badge-light">Accéder</a></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <TheWelcome />
  </main>
</template>


