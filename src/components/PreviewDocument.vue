<script setup lang="ts">
import { defineProps } from 'vue'
import { formatTanggalIndo, getPasaran } from '@/utils/date';
defineProps({
  formData: {
    type: Object,
    required: true,
  },
  isPdfMode: {
    type: Boolean,
    default: false,
  }
})
</script>

<template>
  <div>
    <h2 class="text-xl font-semibold mb-2">Pratinjau Dokumen</h2>

    <div id="pdf-content" class="bg-white" style="padding: 0; max-height: 29.7cm; overflow: hidden">
      <!-- Each page is contained in its own div with border and padding -->
      <div
        class="bg-white"
        :style="{
          padding: isPdfMode ? '1cm 1.5cm' : '1cm 0cm',
          height: '27.7cm',
          boxSizing: 'border-box',
          pageBreakAfter: 'always',
          fontSize: '11pt',
          lineHeight: '1.4'
        }"
      >

        <!-- Header -->
        <div
          :class="[
            'text-center flex flex-col',
            isPdfMode ? 'gap-4 mb-4' : 'gap-2 mb-2'
          ]">
          <h1
            :class="[
                'font-extrabold',
                isPdfMode ? 'text-5xl mb-5' : 'text-2xl mb-2'
              ]">PAWARTOS LELAYU
          </h1>
          <p
            :class="[
              isPdfMode ? 'text-3xl mb-4' : 'text-xl mb-3'
            ]" style="font-family: 'Vazirmatn', sans-serif;">
            إِنَّا لِلّٰهِ وَإِنَّا إِلَيْهِ رَاجِعُوْنَ
          </p>

          <div class="flex flex-col text-left" style="font-size: 10pt;">
            <div class="flex gap-2">
              <p style="width: 120px;">Katur dhumateng</p>
              <p>:</p>
              <p>.............................</p>
            </div>
            <div class="flex gap-2">
              <p style="width: 120px;">Wonten ing</p>
              <p>:</p>
              <p>.............................</p>
            </div>
          </div>
        </div>

        <!-- Pembuka -->
        <div class="mb-3" style="font-size: 10pt;">
          <p class="mb-1 italic">Assalamu'alaikum wr. wb</p>
          <p class="mb-1">
            Sampun katimbalan sowan wonten ngarsanipun Allah SWT panjenenganipun :
          </p>
        </div>

        <!-- Nama Almarhum -->
        <div
          :class="[
             'text-center flex flex-col',
              isPdfMode ? 'gap-4 mb-4' : 'gap-2 mb-2'
          ]">
          <h2
            :class="[
                'font-extrabold italic',
                isPdfMode ? 'text-4xl' : 'text-xl'
              ]">{{ formData.deceased.name }}
          </h2>
          <p style="font-size: 10pt;">
            Yuswo : {{ formData.deceased.age }} Tahun
          </p>
        </div>

        <!-- Detail Kematian -->
        <div class="mb-3" style="font-size: 10pt;">
          <div class="flex gap-2 mb-0.5">
            <p style="width: 140px;">Pidalem wonten ing</p>
            <p>:</p>
            <p>{{ formData.deceased.address }}</p>
          </div>
          <div class="flex gap-2 mb-0.5">
            <p style="width: 140px;">Sedo rikolo dinten</p>
            <p>:</p>
            <p>{{ formData.deceased.dayOfDeath }} {{ getPasaran(formData.deceased.dateOfDeath) }}</p>
          </div>
          <div class="flex gap-2 mb-0.5">
            <p style="width: 140px;">Suryo Kaping</p>
            <p>:</p>
            <p>{{ formatTanggalIndo(formData.deceased.dateOfDeath) }}</p>
          </div>
          <div class="flex gap-2 mb-0.5">
            <p style="width: 140px;">Wanci tabuh</p>
            <p>:</p>
            <p>{{ formData.deceased.timeOfDeath }} WIB</p>
          </div>
        </div>

        <!-- Pemakaman -->
        <div class="mb-3" style="font-size: 10pt;">
          <p class="mb-1 font-semibold">Jenazah badhe kasarekaken wonten ing :</p>
          <div class="flex gap-2 mb-0.5">
            <p style="width: 140px;">Dinten</p>
            <p>:</p>
            <p>{{ formData.funeral.day }} {{ getPasaran(formData.funeral.date) }}</p>
          </div>
          <div class="flex gap-2 mb-0.5">
            <p style="width: 140px;">Tanggal</p>
            <p>:</p>
            <p>{{ formatTanggalIndo(formData.funeral.date) }}</p>
          </div>
          <div class="flex gap-2 mb-0.5">
            <p style="width: 140px;">Wanci Jam</p>
            <p>:</p>
            <p>{{ formData.funeral.time }} WIB</p>
          </div>
          <div class="flex gap-2">
            <p style="width: 140px;">Wonten Ing Makam</p>
            <p>:</p>
            <p>{{ formData.funeral.location }}</p>
          </div>
        </div>

        <!-- Penutup -->
        <div class="mb-3" style="font-size: 10pt;">
          <p class="mb-1">
            Mekaten Pawartos lelayu Meniko mugi andadosno Pamerikso.
          </p>
          <p class="italic">Wassalamu'alaikum wr. wb.</p>
        </div>

        <!-- Keluarga -->
        <div style="font-size: 10pt;">
          <p class="mb-1">Ingkang nandhang dhuhkito :</p>
          <table style="width: 100%; border-collapse: collapse;">
            <tbody>
            <tr v-for="(member, index) in formData.familyMembers" :key="index">
              <td style="width: 25px; vertical-align: top; padding-bottom: 2px;">{{ index + 1 }}.</td>
              <td style="width: 220px; vertical-align: top; padding-bottom: 2px;">{{ member.name }}</td>
              <td style="vertical-align: top; padding-bottom: 2px;">
                <span v-if="member.relationship">({{ member.relationship }})</span>
              </td>
            </tr>
            <tr>
              <td style="vertical-align: top; padding-bottom: 2px;">{{ formData.familyMembers.length + 1 }}.</td>
              <td style="vertical-align: top; padding-bottom: 2px;">Lan Sedoyo Keluarga</td>
              <td></td>
            </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  </div>
</template>
