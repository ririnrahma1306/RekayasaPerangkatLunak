// js/validation.js

/**
 * @fileoverview Modul ini berisi fungsi untuk memvalidasi input form.
 */

/**
 * Memeriksa apakah data nilai mahasiswa sudah lengkap dan sesuai format.
 * @param {string} nama - Nama lengkap.
 * @param {string} nim - NIM mahasiswa.
 * @param {string} mataKuliah - Mata kuliah yang dipilih.
 * @param {number} nilai - Nilai mahasiswa (antara 0-100).
 * @returns {object} Objek hasil validasi {isValid: boolean, message: string}.
 */
function validasiInput(nama, nim, mataKuliah, nilai) {
    if (!nama || !nim || !mataKuliah || nilai === null || nilai === undefined || nilai === '') {
        return { isValid: false, message: "Semua field harus diisi." };
    }

    if (nim.length < 8 || !/^\d+$/.test(nim)) {
        return { isValid: false, message: "NIM tidak valid. Harus berupa angka dan panjang minimal 8." };
    }

    const numericNilai = parseFloat(nilai);
    if (isNaN(numericNilai) || numericNilai < 0 || numericNilai > 100) {
        return { isValid: false, message: "Nilai harus berupa angka antara 0 hingga 100." };
    }

    // Jika semua validasi lolos
    return { isValid: true, message: "Validasi berhasil." };
}