<script setup>
import { onMounted, ref } from 'vue';
import TotalRecords from '../components/TotalRecords.vue';

    let types = ref([]);

    async function loadTypes() {
      let json = await (await fetch(`${import.meta.env.VITE_API_URL}/v1/types`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        }
      })).json();

      for (let type of json.data) {
        type.productCount = await loadTypesCountByType(type.id);
      }
      
      
      types.value = json.data;
    }
    

    async function loadTypesCountByType(typeId) {
      let json = await (await fetch(`${import.meta.env.VITE_API_URL}/v1/products/count?typeId=${typeId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token'),
        }
      })).json();
      return json.data;
    }

    function getProductCount(typeId) {
      const type = types.value.find(t => t.id === typeId);
      return type ? type.productCount : 0;
    }

    onMounted(async () => {
      await loadTypes();
    });

    console.log(types);
    console.log(loadTypesCountByType());
    
    console.log(getProductCount());
</script>

<template>
  <div class="container mt-5">
    <h1>Liste des types de produits</h1>
    <table class="table table-striped table-bordered">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nom</th>
          <th scope="col">Nombre de Produits</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="type in types" :key="type.id">
          <td>{{ type.name }}</td>
          <td>{{ getProductCount(type.id) }}</td>
          <td>
            <router-link :to="'/types/edit/' + type.id" class="btn btn-primary">Éditer</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <total-records 
        type="types"
        :total="types.length"
        @reload="loadTypes">
    </total-records>
  </div>
</template>


<style>
/* Styles spécifiques au composant */
</style>