<script setup lang="ts">
import { ref, reactive } from 'vue';
import DeceasedInfoForm from './components/DeceasedInfoForm.vue';
import FuneralInfoForm from './components/FuneralInfoForm.vue';
import FamilyMembersForm from './components/FamilyMembersForm.vue';
import PreviewDocument from './components/PreviewDocument.vue';

// Form state
const formState = reactive({
  deceased: {
    name: '',
    address: '',
    age: '',
    placeOfDeath: '',
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

// Generate PDF function
const generatePDF = () => {
  const element = document.getElementById('pdf-content');
  if (element) {
    const opt = {
      margin: 1,
      filename: 'berita-lelayu.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };

    window.html2pdf().set(opt).from(element).save();
  }
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
                class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
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
                class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
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
                class="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                Preview
              </button>
            </div>
          </div>

          <!-- Step 4: Preview -->
          <div v-if="currentStep === 4">
            <PreviewDocument :formData="formState" />
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
                Undhuh PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
