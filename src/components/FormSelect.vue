<script setup>
import { defineProps } from 'vue';

const model = defineModel();

const props = defineProps({
    label: {
        type: String,
        required: true
    },
    options: {
        type: Array,
        required: true
    },
});


</script>

<template>
    <div>
        <label for="customer"
            class="form-label">{{ label }}</label>
        <select class="form-select"
            v-model="model"
            id="type">
            <option v-for="option in props.options"
                :key="option.id"
                :value="option.id">{{ option.name }}
            </option>
        </select>
    </div>
</template>