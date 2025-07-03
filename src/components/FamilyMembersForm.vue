<script setup lang="ts">
import { defineProps, defineEmits, computed } from 'vue';

interface FamilyMember {
  name: string;
  relationship: string;
}

const props = defineProps({
  modelValue: {
    type: Array as () => FamilyMember[],
    required: true
  }
});

const emit = defineEmits<{
  'update:modelValue': [value: FamilyMember[]];
}>();

const updateMember = (index: number, field: keyof FamilyMember, value: string) => {
  const updatedMembers = [...props.modelValue];
  updatedMembers[index] = { ...updatedMembers[index], [field]: value };
  emit('update:modelValue', updatedMembers);
};

const maxFamilyMembers = 10;
const isMaxMembersReached = computed(() => props.modelValue.length >= maxFamilyMembers);

const addMember = () => {
  if (props.modelValue.length < maxFamilyMembers) {
    const newMember: FamilyMember = { name: '', relationship: '' };
    const updatedMembers = [...props.modelValue, newMember];
    emit('update:modelValue', updatedMembers);
  }
};

const removeMember = (index: number) => {
  if (props.modelValue.length > 1) {
    const updatedMembers: FamilyMember[] = [...props.modelValue];
    updatedMembers.splice(index, 1);
    emit('update:modelValue', updatedMembers);
  }
};
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Keluarga</h2>

    <div v-for="(member, index) in modelValue" :key="index" class="mb-6 p-4 border rounded-lg bg-gray-50">
      <div class="flex justify-between items-center mb-2">
        <h3 class="text-lg font-medium">Keluarga {{ index + 1 }}</h3>
        <button
          @click="removeMember(index)"
          class="text-red-500 hover:text-red-700"
          :disabled="modelValue.length === 1"
        >
          <span class="text-xl">×</span>
        </button>
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" :for="`name-${index}`">
          Nama
        </label>
        <input
          :id="`name-${index}`"
          type="text"
          :value="member.name"
          @input="updateMember(index, 'name', ($event.target as HTMLInputElement).value)"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Fulan"
        />
      </div>

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" :for="`relationship-${index}`">
          Hubungan dengan Almarhum/Almarhumah
        </label>
        <input
          :id="`relationship-${index}`"
          type="text"
          :value="member.relationship"
          @input="updateMember(index, 'relationship', ($event.target as HTMLInputElement).value)"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Cth: Suami/Anak/Kakak"
        />
      </div>
    </div>

    <button
      @click="addMember"
      :disabled="isMaxMembersReached"
      class="mt-4 w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span class="mr-2">+</span> Tambah Keluarga
    </button>
    <div v-if="isMaxMembersReached" class="mt-2 text-sm text-red-500 text-center">
      Maksimal 10 anggota keluarga
    </div>
  </div>
</template>
