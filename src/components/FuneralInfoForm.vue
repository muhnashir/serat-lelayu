<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';

const props = defineProps({
  modelValue: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['update:modelValue']);

const updateField = (field: string, value: string) => {
  const updatedValue = { ...props.modelValue, [field]: value };
  emit('update:modelValue', updatedValue);
};
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Informasi Pamakaman</h2>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="day">
        Dinten
      </label>
      <select
        id="day"
        :value="modelValue.day"
        @change="updateField('day', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      >
        <option value="">Pilih Dinten</option>
        <option value="Senen">Senen</option>
        <option value="Selasa">Selasa</option>
        <option value="Rebo">Rebo</option>
        <option value="Kemis">Kemis</option>
        <option value="Jemuah">Jemuah</option>
        <option value="Setu">Setu</option>
        <option value="Minggu">Minggu</option>
      </select>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
        Tanggal Pamakaman
      </label>
      <input
        id="date"
        type="date"
        :value="modelValue.date"
        @input="updateField('date', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="time">
        Tabuh Pamakaman
      </label>
      <input
        id="time"
        type="time"
        :value="modelValue.time"
        @input="updateField('time', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="location">
        Papan Pamakaman
      </label>
      <input
        id="location"
        type="text"
        :value="modelValue.location"
        @input="updateField('location', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>
  </div>
</template>
