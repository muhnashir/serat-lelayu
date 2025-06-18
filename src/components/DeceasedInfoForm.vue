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
    <h2 class="text-xl font-semibold mb-4">Informasi Tiyang Ingkang Seda</h2>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Asma
      </label>
      <input
        id="name"
        type="text"
        :value="modelValue.name"
        @input="updateField('name', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
        Alamat
      </label>
      <textarea
        id="address"
        :value="modelValue.address"
        @input="updateField('address', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        rows="3"
      ></textarea>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
        Yuswa
      </label>
      <input
        id="age"
        type="number"
        :value="modelValue.age"
        @input="updateField('age', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="placeOfDeath">
        Papan Seda
      </label>
      <input
        id="placeOfDeath"
        type="text"
        :value="modelValue.placeOfDeath"
        @input="updateField('placeOfDeath', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="dateOfDeath">
          Tanggal Seda
        </label>
        <input
          id="dateOfDeath"
          type="date"
          :value="modelValue.dateOfDeath"
          @input="updateField('dateOfDeath', $event.target.value)"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeOfDeath">
          Tabuh Seda
        </label>
        <input
          id="timeOfDeath"
          type="time"
          :value="modelValue.timeOfDeath"
          @input="updateField('timeOfDeath', $event.target.value)"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  </div>
</template>
