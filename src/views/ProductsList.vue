<template>
  <div>
    <h1>Liste des produits</h1>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Prix</th>
          <th scope="col">Type</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.name }}</td>
          <td>{{ product.priceHt / 100 }}</td>
          <td>{{ product.type.name }}</td>
          <td>
            <router-link :to="'/products/edit/' + product.id" class="btn btn-primary">Éditer</router-link>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
  
<script setup>
import { onMounted, ref } from 'vue';

    let products = ref([]);
    async function loadProducts() {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/products`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c',
          }
        });
        const data = await response.json();
        products.value = data.data;
      } catch (error) {
        console.error('Error loading products:', error);
      }
    }

    onMounted(async () => {
      await loadProducts();
    });

</script>
  
<style>
/* Styles spécifiques au composant */
</style>
