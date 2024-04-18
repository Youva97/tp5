<script setup>
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
    type: {
        type: String,
        required: true
    },
    total: {
        type: Number,
        required: true
    }
});

const emit = defineEmits(['reload']);
function reload() {
    emit('reload');
}

</script>

<template>
    <div class="mb-3">
        Nombre total de <strong>{{ props.type }}</strong> : {{ props.total }}
    </div>

    <button class="btn btn-info p-1 mt-2" @click="reload">Recharger</button>

</template>

<style scoped>
strong {
    color: rgb(101, 220, 180);
}
</style>