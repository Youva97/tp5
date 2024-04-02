<template>
  <div>
    <h1>{{ isNewProduct ? 'Créer un nouveau produit' : 'Modifier le produit' }}</h1>
    <form @submit.prevent="saveProduct">
      <div class="form-group mb-3">
        <label for="productName" class="form-label">Nom du produits</label>
        <input type="text" class="form-control" id="productName" v-model="product.name" required>
      </div>
      <div class="form-group">
        <label for="price" class="form-label">Prix:</label>
        <input type="number" id="price" v-model="product.priceHt" required class="form-control">
      </div>
      <div class="form-group mb-3">
        <label for="productDescription" class="form-label">Description</label>
        <textarea class="form-control" rows="5" id="productDescription" v-model="product.description"
          required></textarea>
      </div>
      <div class="form-group mb-3">
        <label for="productType" class="form-label">Type</label>
        <select class="form-select form-select-sm" id="productType" v-model="product.typeId" required>
          <option v-for="type in types" :value="type.id" :key="type.id">{{ type.name }}</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">Enregistrer</button>
      <button type="button" @click="deleteProduct" class="btn btn-danger">Supprimer</button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


const productId = useRoute().params.id;
const router = useRouter();

const product = ref({});
const types = ref([]);

async function loadTypes() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/types`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'fee47481-28eb-4f46-b238-73ab82794121'
    }
  });
  const data = await response.json();
  types.value = data.data;
}

async function loadProduct() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/products/${productId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'fee47481-28eb-4f46-b238-73ab82794121'
    }
  });
  product.value = (await response.json()).data;
  console.log(product.value);
  
}

async function saveProduct() {
  const method = productId ? 'PUT' : 'POST';
  const url = productId ? `${import.meta.env.VITE_API_URL}/v1/products/${productId}` : `${import.meta.env.VITE_API_URL}/v1/products`;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'fee47481-28eb-4f46-b238-73ab82794121'
    },
    body: JSON.stringify(product.value)
  });
  if (response.ok) {
    router.push('/products/list');
  } else {
    console.error('Failed to save product');
  }
}

async function deleteProduct() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/products/${productId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'fee47481-28eb-4f46-b238-73ab82794121'
    }
  });
  if (response.ok) {
    router.push('/products/list');
  } else {
    console.error('Failed to delete product');
  }
}

onMounted(async () => {
  await loadTypes();
  await loadProduct();
});

</script>