<script setup lang="ts">
import { defineProps } from 'vue'
import { formatTanggalIndo } from '@/utils/date';
defineProps({
  formData: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Pratinjau Dokumen</h2>

    <div id="pdf-content" class="bg-white" style="padding: 0; max-height: 29.7cm; overflow: hidden">
      <!-- Each page is contained in its own div with border and padding -->
      <div
        class="border bg-white"
        style="padding: 0.5cm; height: 27.7cm; box-sizing: border-box; page-break-after: always"
      >
        <div class="text-center mb-4">
          <h1 class="text-xl font-bold">Pawartos Lelayu</h1>
          <div class="flex justify-center gap-2">
            <p>Katur dumateng :</p>
            <p>…</p>
          </div>
          <div class="flex justify-center gap-2">
            <p>Ing :</p>
            <p>…</p>
          </div>
        </div>

        <div class="mb-4">
          <p class="mb-1">Assalamu’alaikum Wr. Wb.</p>
          <p class="font-bold text-center uppercase">INNA LILLAAHI WA INNA ILAIHI ROJI’UN</p>
          <p class="text-center">
            Sampun katimbalan sowan wonten ngarsa dalem ALLAH SWT, panjenenganipun:
          </p>
          <h2 class="text-2xl font-bold text-center mt-2 underline">
            {{ formData.deceased.name }}
          </h2>
        </div>

        <div class="mb-6 leading-relaxed">
          <p><span class="font-semibold">Pidalem ing</span> : {{ formData.deceased.address }}</p>
          <p><span class="font-semibold">Yuswo</span> : {{ formData.deceased.age }} tahun</p>
          <p><span class="font-semibold">Wonten</span> : {{ formData.deceased.placeOfDeath }}</p>
          <p><span class="font-semibold">Dinten</span> : {{ formData.deceased.dayOfDeath }}, {{ formatTanggalIndo(formData.deceased.dateOfDeath) }}</p>
          <p><span class="font-semibold">Wanci</span> : {{ formData.deceased.timeOfDeath }} WIB</p>
        </div>

        <div class="mb-6">
          <p class="font-semibold text-center mb-2">Jenazah badhe kasareaken:</p>
          <p><span class="font-semibold">Dinten</span> : {{ formData.funeral.day }}, {{formatTanggalIndo(formData.funeral.date) }}</p>
          <p><span class="font-semibold">Wanci</span> : {{ formData.funeral.time }} WIB</p>
          <p><span class="font-semibold">Ing Makam</span> : {{ formData.funeral.location }}</p>
        </div>

        <div class="mb-6 text-justify text-sm">
          <p>
            Mekaten pawartos lelayu menika, mugi ndadosaken kawuningan dumateng Sedaya kanak kadang.
            Awit kawigatosan sedaya kulo warga ingkang tinilar ngaturaken agunge panuwun.
          </p>
        </div>

        <div class="mb-4">
          <p class="font-semibold text-center mb-2">Ingkang Nandang sungkowo:</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
            <tr v-for="(member, index) in formData.familyMembers" :key="index">
              <td style="width: 20px; vertical-align: top;">{{ index + 1 }}.</td>
              <td>
                {{ member.name }}
                <span v-if="member.relationship" style="color: #6b7280">({{ member.relationship }})</span>
              </td>
            </tr>
            <tr>
              <td>{{ formData.familyMembers.length + 1}}</td>
              <td>Lan Sedoyo Keluargo</td>
            </tr>
            </tbody>
          </table>
        </div>


        <div class="text-center mt-6 border-t border-black pt-4 text-sm italic">
          "Mugi-mugi amal saha ibadahipun almarhum/almarhumah katampi wonten ing ngarsanipun Gusti
          Allah SWT lan kulawarga ingkang dipuntilar tansah dipunparingi kesabaran lan kekiyatan."
        </div>
      </div>
    </div>
  </div>
</template>
