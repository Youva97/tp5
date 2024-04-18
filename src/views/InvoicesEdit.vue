<template>
    <div class="container">
        <div class="row justify-content-center mt-4">
            <div class="col-md-12">
                <div class="card border-primary">
                    <div class="card-header bg-primary text-white">
                        <h1 class="card-title">{{ isNewProduct ? 'Créer une nouvelle facture' : 'Modifier la facture' }}
                        </h1>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="saveInvoice">
                            <div class="mb-3">
                                <label for="date" class="form-label">Date de la facture</label>
                                <input type="date" class="form-control" id="date" v-model="invoice.date" required>
                            </div>
                            <div class="mb-3">
                                <FormSelect label="Type" :options="customers" v-model="invoice.customerId" />
                            </div>
                            <div class="mb-3">
                                <label for="totalHt" class="form-label">Total hors taxe</label>
                                <input type="text" id="totalHt" v-model="invoice.totalHt" required class="form-control">
                            </div>
                            <div class="mb-3">
                                <label for="totalTtc" class="form-label">Total toute taxe comprise</label>
                                <input type="text" class="form-control" rows="5" id="totalTtc" v-model="invoice.totalTtc" required>
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

const invoice = ref({});
const customers = ref([]);

async function loadCustomers() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/customers`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
        }
    });
    customers.value = (await response.json()).data;
    console.log(customers.value);

}

async function loadInvoice() {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/invoices/${invoiceId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
        }
    });
    invoice.value = (await response.json()).data;
    console.log(invoice.value);

}

async function saveInvoice() {
    const method = invoiceId ? 'PUT' : 'POST';
    const url = invoiceId ? `${import.meta.env.VITE_API_URL}/v1/invoices/${invoiceId}` : `${import.meta.env.VITE_API_URL}/v1/invoices`;
    const response = await fetch(url, {
        method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
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
            'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
        }
    });
    if (response.ok) {
        router.push('/invoices/list');
    } else {
        console.error('Failed to delete invoices');
    }
}

onMounted(async () => {
    await loadInvoice();
    await loadCustomers();
});

</script>