<template>
    <div class="container mt-5">
        <h1>Liste des produits</h1>
        <div class="container mt-4 py-2">
            <div class="row justify-content-center">
                <div class="col-md-6">
                    <!-- Card Bootstrap pour un aspect élégant -->
                    <div class="card">
                        <div class="card-body">
                            <!-- Form Title -->
                            <h5 class="card-title">Recherche de Client</h5>
                            <!-- Input Field -->
                            <input type="text" class="form-control mb-3" placeholder="Rechercher par nom du client..."
                                v-model="search" @input="filterClients">
                            <!-- Button (optional) -->
                            <button class="btn btn-primary" @click="filterClients">Rechercher</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <table class="table table-striped table-bordered">
            <thead class="thead-dark">
                <tr>
                    <th scope="col">Date de facturation</th>
                    <th scope="col">Clients</th>
                    <th scope="col">Total hors taxe</th>
                    <th scope="col">Total toute taxe comprise</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="invoice in invoices" :key="invoice.id">
                    <td>{{ formatDate(invoice.date) }}</td>
                    <td>{{ invoice.customerId }}</td>
                    <td>{{ invoice.totalHt }}</td>
                    <td>{{ invoice.totalTtc }}</td>
                    <td>
                        <router-link :to="'/invoices/edit/' + invoice.id" class="btn btn-primary">Éditer</router-link>
                    </td>
                </tr>
            </tbody>
        </table>
        <total-records type="invoices" :total="invoices ? invoices.length : 0" @reload="loadInvoices">
        </total-records>
    </div>
</template>

<script setup>
import TotalRecords from '../components/TotalRecords.vue';
import { onMounted, ref } from 'vue';


let invoices = ref([]);

async function loadInvoices() {
    try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/invoices`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': localStorage.getItem('token'),
            }
        });
        if (response.ok) {
            const data = await response.json();
            console.log("🚀 ~ loadInvoices ~ data:", data)
            invoices.value = data.data;
        } else {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error loading invoices:', error);
    }
}

onMounted(async () => {
    await loadInvoices();
});
const formatDate = (date) => {
    // Convertir la date en objet Date
    const formattedDate = new Date(date);
    // Formater la date en format "dd/mm/yyyy"
    const day = formattedDate.getDate();
    const month = formattedDate.getMonth() + 1; // Les mois sont indexés à partir de 0
    const year = formattedDate.getFullYear();

    // Retourner la date formatée
    return `${day}/${month}/${year}`;
};

</script>

<style>
/* Styles spécifiques au composant */
</style>