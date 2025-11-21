<script setup lang="ts">
import { ref,nextTick, reactive,computed } from 'vue';
import DeceasedInfoForm from './components/DeceasedInfoForm.vue';
import FuneralInfoForm from './components/FuneralInfoForm.vue';
import FamilyMembersForm from './components/FamilyMembersForm.vue';
import PreviewDocument from './components/PreviewDocument.vue';

const isPdfMode = ref(false);
const isLoading = ref(false);

// Form state
const formState = reactive({
  deceased: {
    name: '',
    address: '',
    age: '',
    dayOfDeath: '',
    dateOfDeath: '',
    timeOfDeath: ''
  },
  funeral: {
    day: '',
    date: '',
    time: '',
    location: ''
  },
  familyMembers: [
    { name: '', relationship: '' }
  ]
});

// Current step
const currentStep = ref(1);
const totalSteps = 4;

// Navigation functions
const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++;
  }
};

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--;
  }
};

const isDisabledDeceased = computed(() => {
  const d = formState.deceased;
  return !d.name || !d.address || !d.age || !d.dateOfDeath || !d.dayOfDeath || !d.timeOfDeath;
});

const isDisabledFuneral= computed(() => {
  const f = formState.funeral;
  return !f.day || !f.date || !f.time || !f.location;
});

const hasValidFamilyMember = computed(() => {
  return formState.familyMembers.some(member =>
    member.name.trim() !== '' && member.relationship.trim() !== ''
  );
});

// Generate PDF function
const generatePDF = async () => {
  const element = document.getElementById('pdf-content');
  if (!element) return;

  const name = formState.deceased.name?.trim() || '';
  const safeName = name.replace(/\s+/g, '-').toLowerCase(); // nama jadi URL-safe

  isLoading.value = true;
  isPdfMode.value = true;

  await nextTick(); // Tunggu DOM update

  const opt = {
      margin: 1, // Set margin to 0 since we're using padding in the component
      filename: `berita-lelayu-${safeName}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'cm', format: 'a4', orientation: 'portrait' },
      pagebreak: { mode: 'avoid-all', before: '#page-break' } // Prevent border from continuing to next page
  };

  await window.html2pdf().set(opt).from(element).save();

  isLoading.value = false;
  isPdfMode.value = false;
};
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-3 sm:max-w-xl md:max-w-2xl lg:max-w-4xl mx-auto">
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20 border border-purple-100">
        <div class="max-w-md mx-auto">
          <div class="mb-6">
            <h1 class="text-2xl font-semibold text-center">Pembuatan Berita Lelayu</h1>
            <div class="flex justify-center mt-4">
              <div class="flex items-center">
                <div v-for="step in totalSteps" :key="step" class="flex items-center">
                  <div
                    :class="[
                      'rounded-full h-8 w-8 flex items-center justify-center',
                      currentStep >= step ? 'bg-purple-500 text-white' : 'bg-gray-300'
                    ]"
                  >
                    {{ step }}
                  </div>
                  <div
                    v-if="step < totalSteps"
                    :class="[
                      'h-1 w-10',
                      currentStep > step ? 'bg-purple-500' : 'bg-gray-300'
                    ]"
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <!-- Step 1: Deceased Information -->
          <div v-if="currentStep === 1">
            <DeceasedInfoForm v-model="formState.deceased" />
            <div class="mt-6 flex justify-end">
              <button
                @click="nextStep"
                :disabled="isDisabledDeceased"
                class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>

          <!-- Step 2: Funeral Information -->
          <div v-if="currentStep === 2">
            <FuneralInfoForm v-model="formState.funeral" />
            <div class="mt-6 flex justify-between">
              <button
                @click="prevStep"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Kembali
              </button>
              <button
                @click="nextStep"
                :disabled="isDisabledFuneral"
                class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Selanjutnya
              </button>
            </div>
          </div>

          <!-- Step 3: Family Members -->
          <div v-if="currentStep === 3">
            <FamilyMembersForm v-model="formState.familyMembers" />
            <div class="mt-6 flex justify-between">
              <button
                @click="prevStep"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Kembali
              </button>
              <button
                @click="nextStep"
                :disabled="!hasValidFamilyMember"
                class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Preview
              </button>
            </div>
          </div>

          <!-- Step 4: Preview -->
          <div v-if="currentStep === 4">
            <PreviewDocument :formData="formState" :isPdfMode="isPdfMode"  />
            <div class="mt-6 flex justify-between">
              <button
                @click="prevStep"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Kembali
              </button>
              <button
                @click="generatePDF"
                class="px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
              >
                Unduh PDF
              </button>
            </div>
          </div>


          <div
            v-if="isLoading"
            class="absolute inset-0 bg-white/80 flex items-center justify-center z-10 rounded-lg"
          >
            <div class="flex flex-col items-center gap-3">
              <svg
                class="animate-spin h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <p class="text-gray-600 font-medium">Membuat PDF...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <footer class="text-center py-4 text-gray-500 text-sm">
    <div class="flex justify-center items-center gap-2">
      <span>From us, with love</span>
      <a href="https://www.instagram.com/opetra_id" target="_blank" rel="noopener noreferrer" class="hover:text-pink-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M7.75 2A5.75 5.75 0 0 0 2 7.75v8.5A5.75 5.75 0 0 0 7.75 22h8.5A5.75 5.75 0 0 0 22 16.25v-8.5A5.75 5.75 0 0 0 16.25 2h-8.5Zm0 1.5h8.5A4.25 4.25 0 0 1 20.5 7.75v8.5a4.25 4.25 0 0 1-4.25 4.25h-8.5A4.25 4.25 0 0 1 3.5 16.25v-8.5A4.25 4.25 0 0 1 7.75 3.5Zm9.75 2a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5ZM12 7a5 5 0 1 0 0 10a5 5 0 0 0 0-10Zm0 1.5a3.5 3.5 0 1 1 0 7a3.5 3.5 0 0 1 0-7Z"/>
        </svg>
      </a>
    </div>
  </footer>

</template>
