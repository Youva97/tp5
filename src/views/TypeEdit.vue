<template>
  <div class="container">
    <div class="row justify-content-center mt-4">
      <div class="col-md-12">
        <div class="card border-primary">
          <div class="card-header bg-primary text-white">
            <h1 class="card-title">{{ isNewTypes ? 'Créer un nouveau type' : 'Modifier le type' }}
            </h1>
          </div>
          <div class="card-body">
            <form @submit.prevent="saveTypes">
              <div class="form-group mb-3">
                <label for="typeName" class="form-label">Nom du types de produits</label>
                <input type="text" class="form-control" id="typesName" v-model="type.name">
              </div>
              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">Enregistrer</button>
                <button type="button" @click="deleteType" class="btn btn-danger">Supprimer</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';


export default {
  setup() {
    const typeId = useRoute().params.id;
    const router = useRouter();

    const type = ref({});
    const types = ref([]);

    async function loadTypes() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/types`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
        }
      });
      const data = await response.json();
      types.value = data.data;
    }



    async function saveTypes() {
      const method = typeId ? 'PUT' : 'POST';
      const url = typeId ? `${import.meta.env.VITE_API_URL}/v1/types/${typeId}` : `${import.meta.env.VITE_API_URL}/v1/types`;
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
        },
        body: JSON.stringify(type.value)
      });
      if (response.ok) {
        router.push('/types/list');
      } else {
        console.error('Failed to save type');
      }
    }

    async function deleteType() {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/v1/types/${typeId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'e7fdc34b-2b19-4a1a-bbc5-16460d98717c'
        }
      });
      if (response.ok) {
        router.push('/types/list');
      } else {
        console.error('Failed to delete product');
      }
    }

    onMounted(async () => {
      await loadTypes();
    });

    return {
      type,
      saveTypes,
      deleteType
    };
  }
};
</script>