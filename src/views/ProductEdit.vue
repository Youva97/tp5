<template>
  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-md-12">
        <div class="card border-primary">
          <div class="card-header bg-primary text-white">
            <h1 class="card-title">{{ isNewProduct ? 'Créer un nouveau produit' : 'Modifier le produit' }}</h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="saveProduct">
              <div class="mb-3">
                <label for="productName" class="form-label">Nom du produit</label>
                <input type="text" class="form-control" id="productName" v-model="product.name" required>
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Prix :</label>
                <input type="number" id="price" v-model="product.priceHt" required class="form-control">
              </div>
              <div class="mb-3">
                <label for="productDescription" class="form-label">Description</label>
                <textarea class="form-control" rows="5" id="productDescription" v-model="product.description" required></textarea>
              </div>
              <div class="mb-3">
                <FormSelect label="Type" :options="types" v-model="product.typeId" />
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <button type="button" @click="deleteProduct" class="btn btn-danger">Supprimer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup>
import FormSelect from '@/components/FormSelect.vue';
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
      'Authorization': localStorage.getItem('token')
    }
  });
  const data = await response.json();
  types.value = data.data;
}

async function loadProduct() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/products/${productId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token')
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
      'Authorization': localStorage.getItem('token')
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
      'Authorization': localStorage.getItem('token')
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