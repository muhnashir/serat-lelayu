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

function getDayName(dateString : string) {
  const date = new Date(dateString);
  return date.toLocaleDateString('id-ID', { weekday: 'long' });
}

function handleDateChange(value: string) {
  const dayName = getDayName(value);
  emit('update:modelValue', {
    ...props.modelValue,
    date: value,
    day: dayName
  });
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Informasi Pamakaman</h2>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="date">
        Tanggal Pemakaman
      </label>
      <input
        id="date"
        type="date"
        :value="modelValue.date"
        @input="handleDateChange($event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="time">
        Jam Pemakaman
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
        Tempat Pemakaman
      </label>
      <input
        id="location"
        type="text"
        :value="modelValue.location"
        @input="updateField('location', $event.target.value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Cth : TPU Tegallayang 10"
      />
    </div>
  </div>
</template>
