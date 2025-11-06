// js/firebase-config.js

/**
 * @fileoverview Modul ini berisi konfigurasi inisialisasi Firebase menggunakan gaya Compat (v8).
 * Catatan: Variabel 'db' harus dideklarasikan dengan 'var' atau diakses secara global agar terlihat di modul lain.
 */

const firebaseConfig = {
  apiKey: "AIzaSyD4IKZXPy4OxX-7nq4pFOiF1glKaXS6SvU",
    authDomain: "aplikasiinputnilaimahasi-4360c.firebaseapp.com",
    projectId: "aplikasiinputnilaimahasi-4360c",
    storageBucket: "aplikasiinputnilaimahasi-4360c.firebasestorage.app",
    messagingSenderId: "537569921465",
    appId: "1:537569921465:web:9adbce6c59c2e719e60e68",
    measurementId: "G-G441T7FMVB"
};

// Inisialisasi Firebase (Gaya Compat)
firebase.initializeApp(firebaseConfig);

// Inisialisasi Cloud Firestore dan menjadikannya variabel global
var db = firebase.firestore();