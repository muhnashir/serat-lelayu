<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  formData: {
    type: Object,
    required: true
  }
});

const downloadPDF = () => {
  const element = document.getElementById('pdf-content');
  const opt = {
    margin: 0.5,
    filename: 'surat-lelayu.pdf',
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  window.html2pdf().set(opt).from(element).save();
};
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-4">Pratinjau Dokumen</h2>

    <div id="pdf-content" class="border p-8 bg-white">
      <div class="text-center mb-8">
        <div class="border-b-2 border-t-2 border-black py-2">
          <h1 class="text-3xl font-bold mb-2">SERAT LELAYU</h1>
        </div>
        <p class="text-lg mt-4">Innalillahi wa inna ilaihi roji'un</p>
      </div>

      <div class="mb-8">
        <p class="mb-3 text-center">Kanthi sedhih ing manah, kula ngabaraken bilih sampun kapundhut wangsul dhateng ngarsanipun Gusti Allah SWT:</p>
        <h2 class="text-2xl font-bold mb-3 text-center">{{ formData.deceased.name }}</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
          <p class="mb-2"><span class="font-semibold">Alamat:</span> {{ formData.deceased.address }}</p>
          <p class="mb-2"><span class="font-semibold">Yuswa:</span> {{ formData.deceased.age }} taun</p>
        </div>
        <p class="mb-2">
          <span class="font-semibold">Seda ing dinten:</span>
          {{ new Date(formData.deceased.dateOfDeath).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}
          tabuh {{ formData.deceased.timeOfDeath }} WIB
        </p>
        <p class="mb-2"><span class="font-semibold">Papan:</span> {{ formData.deceased.placeOfDeath }}</p>
      </div>

      <div class="mb-8">
        <p class="mb-3 text-center">Jenazah badhe kasareaken wonten ing:</p>
        <p class="mb-2"><span class="font-semibold">Dinten/Tanggal:</span> {{ formData.funeral.day }}, {{ new Date(formData.funeral.date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) }}</p>
        <p class="mb-2"><span class="font-semibold">Tabuh:</span> {{ formData.funeral.time }} WIB</p>
        <p class="mb-2"><span class="font-semibold">Papan:</span> {{ formData.funeral.location }}</p>
      </div>

      <div class="mb-8">
        <p class="mb-3 text-center font-semibold">Kulawarga ingkang dipuntilar:</p>
        <ul class="list-none pl-0">
          <li v-for="(member, index) in formData.familyMembers" :key="index" class="mb-2 text-center">
            {{ member.name }} ({{ member.relationship }})
          </li>
        </ul>
      </div>

      <div class="text-center mt-8 border-t-2 border-black pt-4">
        <p class="italic">"Mugi-mugi amal saha ibadahipun almarhum/almarhumah katampi wonten ing ngarsanipun Gusti Allah SWT lan kulawarga ingkang dipuntilar tansah dipunparingi kesabaran lan kekiyatan."</p>
      </div>
    </div>
  </div>
</template>
