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
    dateOfDeath: value,
    dayOfDeath: dayName
  });
}
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Informasi Orang yang Meninggal</h2>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="name">
        Nama
      </label>
      <input
        id="name"
        type="text"
        :value="modelValue.name"
        @input="updateField('name', ($event.target as HTMLInputElement).value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Cth : Fulan"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="address">
        Alamat
      </label>
      <textarea
        id="address"
        :value="modelValue.address"
        @input="updateField('address', ($event.target as HTMLInputElement).value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Cth : Sedan, Sariharjo, Kec. Ngaglik, Kabupaten Sleman, Daerah Istimewa Yogyakarta 55581"
        rows="3"
      ></textarea>
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="age">
        Umur
      </label>
      <input
        id="age"
        type="number"
        :value="modelValue.age"
        @input="updateField('age', ($event.target as HTMLInputElement).value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Cth : 20"
      />
    </div>

    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="placeOfDeath">
        Tempat Meninggal <span class="text-gray-400 font-normal text-xs">(opsional)</span>
      </label>
      <input
        id="placeOfDeath"
        type="text"
        :value="modelValue.placeOfDeath"
        @input="updateField('placeOfDeath', ($event.target as HTMLInputElement).value)"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Cth : RS UII"
      />
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="dateOfDeath">
          Tanggal Meninggal
        </label>
        <input
          id="dateOfDeath"
          type="date"
          :value="modelValue.dateOfDeath"
          @input="handleDateChange(($event.target as HTMLInputElement).value)"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="timeOfDeath">
          Jam Meninggal
        </label>
        <input
          id="timeOfDeath"
          type="time"
          :value="modelValue.timeOfDeath"
          @input="updateField('timeOfDeath', ($event.target as HTMLInputElement).value)"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
    </div>
  </div>
</template>
