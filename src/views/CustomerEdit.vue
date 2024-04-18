<template>
  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-md-12">
        <div class="card border-primary">
          <div class="card-header bg-primary text-white">
            <h1 class="card-title">{{ isNewProduct ? 'Créer un nouveau client' : 'Modification des clients' }}</h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="saveCustomer">
              <div class="mb-3">
                <label for="customerName" class="form-label">Nom de Famille</label>
                <input type="text" class="form-control" id="customerName" v-model="customer.name">
              </div>
              <div class="mb-3">
                <label for="customerFirsname" class="form-label">Prénom</label>
                <input type="text" class="form-control" id="customerFirsname" v-model="customer.firstname">
              </div>
              <div class="mb-3">
                <label for="address1" class="form-label">Adresse 1</label>
                <input type="text" class="form-control" id="address1" v-model="customer.address1">
              </div>
              <div class="mb-3">
                <label for="address2" class="form-label">Adresse 2</label>
                <input type="text" class="form-control" id="address2" v-model="customer.address2">
              </div>
              <div class="mb-3">
                <label for="zipCode" class="form-label">Code Postal</label>
                <input type="text" class="form-control" id="zipCode" v-model="customer.zipCode">
              </div>
              <div class="mb-3">
                <label for="email" class="form-label">Email</label>
                <input type="email" class="form-control" id="email" v-model="customer.email">
              </div>
              <div class="mb-3">
                <label for="phone" class="form-label">Téléphone</label>
                <input type="phone" class="form-control" id="phone" v-model="customer.phone">
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <button type="button" @click="deleteCustomer" class="btn btn-danger">Supprimer</button>
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

const customerId = useRoute().params.id;
const router = useRouter();

const customer = ref({});

async function loadCustomers() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/customers/${customerId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
    }
  });
  customer.value = (await response.json()).data;
}

async function saveCustomer() {
  const method = customerId ? 'PUT' : 'POST';
  const url = customerId ? `${import.meta.env.VITE_API_URL}/v1/customers/${customerId}` : `${import.meta.env.VITE_API_URL}/v1/customers`;
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
    },
    body: JSON.stringify(customer.value)
  });
  if (response.ok) {
    router.push('/customers/list');
  } else {
    console.error('Failed to save customer');
  }
}

async function deleteCustomer() {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/customer/${customerId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
    }
  });
  if (response.ok) {
    router.push('/customers/list');
  } else {
    console.error('Failed to delete customer');
  }
}

onMounted(async () => {
  await loadCustomers();
});

</script>