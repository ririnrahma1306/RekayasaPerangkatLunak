// js/dataService.js

/**
 * @fileoverview Modul ini berisi fungsi-fungsi untuk operasi CRUD (Data Layer) menggunakan Firebase Firestore.
 * Entitas mengacu pada ERD/Class Diagram: Mahasiswa dan Nilai.
 */

const COLLECTION_NILAI = "nilaiMahasiswa"; // Nama koleksi di Firestore

/**
 * Menyimpan data nilai mahasiswa baru ke Firestore.
 * @param {object} dataNilai - Objek data yang akan disimpan.
 * @returns {Promise<boolean>} Resolves true jika berhasil, false jika gagal.
 */
async function simpanData(dataNilai) {
    try {
        // Tambahkan timestamp dan id nilai secara otomatis
        // Pastikan variabel 'db' sudah dideklarasikan secara global di firebase-config.js
        const dataToSave = {
            ...dataNilai,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            // Menggunakan auto-generated ID Firestore sebagai id_nilai
            // id_nilai: db.collection(COLLECTION_NILAI).doc().id 
        };

        const docRef = await db.collection(COLLECTION_NILAI).add(dataToSave);
        console.log("Dokumen berhasil ditulis dengan ID: ", docRef.id);
        
        return true;
    } catch (error) {
        console.error("Error saat menyimpan dokumen: ", error);
        return false;
    }
}

/**
 * Mengambil dan menampilkan data nilai mahasiswa dari Firestore ke halaman web.
 * @returns {Promise<Array<object>>} Resolves dengan array data nilai.
 */
async function loadData() {
    try {
        // Pastikan variabel 'db' sudah dideklarasikan secara global di firebase-config.js
        const querySnapshot = await db.collection(COLLECTION_NILAI)
                                      .orderBy("timestamp", "desc") // Urutkan berdasarkan waktu simpan terbaru
                                      .get();

        const dataNilai = [];
        querySnapshot.forEach((doc) => {
            // Mengambil data dan menambahkan ID dokumen
            dataNilai.push({ id_nilai: doc.id, ...doc.data() });
        });

        // Panggil fungsi untuk menampilkan data di tabel (ini diimplementasikan di main.js)
        if (typeof tampilkanDataDiTabel === 'function') {
            tampilkanDataDiTabel(dataNilai);
        }

        return dataNilai;
    } catch (error) {
        console.error("Error saat memuat data: ", error);
        return [];
    }
}