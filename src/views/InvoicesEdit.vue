<template>
    <div class="container">
        <div class="row justify-content-center mt-4">
            <div class="col-md-12">
                <div class="card border-primary">
                    <div class="card-header bg-primary text-white">
                        <h1 class="card-title">{{ isNewInvoices ? 'Créer une nouvelle facture' : 'Modifier la facture' }}
                        </h1>
                        <button type="button" class="btn btn-sm btn-success" @click="addLine()">Ajouter une
                            ligne</button>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveInvoice">
                            <div class="mb-3">
                                <label for="date" class="form-label">Date de la facture</label>
                                <input type="date" class="form-control" id="date" v-model="invoice.date" required>
                            </div>
                            <div class="mb-3">
                                <FormSelect label="Clients" :options="customers" v-model="invoice.customerId" />
                            </div>
                            <div class="mb-3">
                                <label for="totalHt" class="form-label">Total hors taxe</label>
                                <input type="text" id="totalHt" v-model="invoice.totalHt" required class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="totalTtc" class="form-label">Total toute taxe comprise</label>
                                <input type="text" class="form-control" rows="5" id="totalTtc"
                                    v-model="invoice.totalTtc" required>
                            </div>
                            <div v-for="(line, indexline) in lines" :key="indexline" class="mb-3 row">
                                <div class="col-4">
                                    <FormSelect label="Produit" :options="products" v-model="line.productId" />
                                </div>
                                <div class="col-4">
                                    <label for="quantity" class="form-label">Quantité</label>
                                    <input type="number" id="quantity" v-model="line.quantity" class="form-control"
                                        required>
                                </div>

                                <div class="col-4 d-flex align-items-end">
                                    <button type="button" class="btn btn-sm btn-outline-danger"
                                        @click="removeLine(line.id)">Effacer la ligne</button>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button type="submit" class="btn btn-primary">Enregistrer</button>
                                <button type="button" @click="deleteInvoice" class="btn btn-danger">Supprimer</button>
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


const invoiceId = useRoute().params.id;
const router = useRouter();

let lines = ref([]);
const products = ref([]);
const invoice = ref({});
const customers = ref([]);

async function loadCustomers() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/customers`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });
    customers.value = (await response.json()).data;

}

async function loadProducts() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/products`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });
    products.value = (await response.json()).data;

}

async function loadInvoice() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/invoices/${invoiceId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });
    if (response.ok) {
        invoice.value = (await response.json()).data;
        lines.value = invoice.value.lines
        console.log(invoice.value);
        console.log('Invoice loaded:', invoice.value);
        console.log('Lines:', lines.value);
    } else {
        console.error('Failed to load invoice');
    }

}

async function saveInvoice() {
    const method = invoiceId ? 'PUT' : 'POST';
    const url = invoiceId ? `${import.meta.env.VITE_API_URL}/v1/invoices/${invoiceId}` : `${import.meta.env.VITE_API_URL}/v1/invoices`;
    invoice.value.lines = lines.value;
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        },
        body: JSON.stringify(invoice.value)
    });
    if (response.ok) {
        router.push('/invoices/list');
    } else {
        console.error('Failed to save invoices');
    }
}

async function deleteInvoice() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/invoices/${invoiceId}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem('token')
        }
    });
    if (response.ok) {
        router.push('/invoices/list');
    } else {
        console.error('Failed to delete invoices');
    }
}

async function addLine() {
    lines.value.push({productId: 0 , quantity: 1, priceHt: 50})
}

async function removeLine(lineId) {
    lines.value = lines.value.filter(line => line.id !== lineId);
}


onMounted(async () => {
    await loadProducts();
    await loadCustomers();
    await loadInvoice();
});

</script>
