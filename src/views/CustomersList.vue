<template>
  <div>
    <h1>Liste des Clients</h1>
    <table class="table table-striped">
      <thead class="thead-dark">
        <tr>
          <th scope="col">Nom de famille</th>
          <th scope="col">Prénom</th>
          <th scope="col">Addresse 1</th>
          <th scope="col">Addresse 2</th>
          <th scope="col">Code Postal</th>
          <th scope="col">Email</th>
          <th scope="col">Téléphone</th>
          <th scope="col">Facture</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.name }}</td>
          <td>{{ customer.firstname }}</td>
          <td>{{ customer.adress1 }}</td>
          <td>{{ customer.adress2 }}</td>
          <td>{{ customer.zipCode }}</td>
          <td>{{ customer.email }}</td>
          <td>{{ customer.phone }}</td>
          <!-- <td v-for="invoice in invoices" :key="invoice.id">{{ invoice.totalHt }}</td> -->
          <td>
            <div v-if="customer.invoices && customer.invoices.length > 0">
              <div v-for="invoice in customer.invoices" :key="invoice.id">{{ invoice.totalTtc }}</div>
            </div>
            <div v-else>
              Pas de facture
            </div>
          </td>
          <td><router-link :to="'/customers/edit/' + customer.id" class="btn btn-primary">Éditer</router-link></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue';
let customers = ref([]);

async function loadCustomers() {
  let json = await (await fetch(`${import.meta.env.VITE_API_URL}/v1/customers`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'fee47481-28eb-4f46-b238-73ab82794121',
    }
  })).json();
  customers.value = json.data;
}

/* let invoices = ref([]);

async function loadInvoices() {
  let json = await (await fetch(`${import.meta.env.VITE_API_URL}/v1/invoices`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'fee47481-28eb-4f46-b238-73ab82794121',
    }
  })).json();
  invoices.value = json.data;
} */

onMounted(async () => {
  await loadCustomers();
  /* await loadInvoices(); */
});
</script>

<style>
/* Styles spécifiques au composant */
</style>