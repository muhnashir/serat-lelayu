import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import html2pdf from 'html2pdf.js'

// Make html2pdf available globally
window.html2pdf = html2pdf

createApp(App).mount('#app')
