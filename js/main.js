// js/main.js

/**
 * @fileoverview Modul utama untuk inisialisasi event dan menghubungkan UI dengan Logic Layer.
 */

// --- Fungsi untuk Halaman Form Input (index.html) ---

/**
 * Mengelola submit form input nilai.
 * Menerapkan alur logika: Validasi -> Simpan Data -> Tampilkan Pesan.
 * @param {Event} event - Event submit form.
 */
async function handleFormSubmit(event) {
    event.preventDefault(); // Mencegah reload halaman

    const nama = document.getElementById('namaLengkap').value;
    const nim = document.getElementById('nim').value;
    const mataKuliah = document.getElementById('mataKuliah').value;
    const nilai = document.getElementById('nilai').value;
    const messageElement = document.getElementById('message');

    // 1. Jalankan validasiInput()
    const validationResult = validasiInput(nama, nim, mataKuliah, nilai);

    if (!validationResult.isValid) {
        // 2. Tampilkan pesan simpan data gagal jika validasi gagal
        showMessage(messageElement, `Gagal: ${validationResult.message}`, 'alert-danger');
        return;
    }

    const dataToSave = {
        namaLengkap: nama,
        nim: nim,
        mataKuliah: mataKuliah,
        nilai: parseFloat(nilai) // Pastikan nilai disimpan sebagai number
    };

    // 3. Lanjut ke simpanData()
    const isSuccess = await simpanData(dataToSave);

    if (isSuccess) {
        showMessage(messageElement, "Data berhasil disimpan!", 'alert-success');
        document.getElementById('nilaiForm').reset(); // Bersihkan form
        // 4. Setelah penyimpanan berhasil, panggil loadData() (Opsional, karena di halaman input tidak perlu tampilkan data)
        // loadData(); 
    } else {
        showMessage(messageElement, "Penyimpanan data gagal. Terjadi error di database.", 'alert-danger');
    }
}

/**
 * Menampilkan pesan notifikasi di UI.
 * @param {HTMLElement} element - Elemen div untuk menampilkan pesan.
 * @param {string} msg - Isi pesan.
 * @param {string} typeClass - Kelas Bootstrap untuk styling (e.g., 'alert-success', 'alert-danger').
 */
function showMessage(element, msg, typeClass) {
    element.textContent = msg;
    element.className = `mt-3 alert ${typeClass} text-center`;
    element.style.display = 'block';
    // Sembunyikan pesan setelah 5 detik
    setTimeout(() => {
        element.style.display = 'none';
    }, 5000);
}

// Tambahkan event listener saat halaman selesai dimuat (untuk index.html)
if (document.getElementById('nilaiForm')) {
    document.getElementById('nilaiForm').addEventListener('submit', handleFormSubmit);
}

// --- Fungsi untuk Halaman Tampilkan Data (lihat_data.html) ---

/**
 * Memproses data yang diterima dari loadData() dan menampilkannya di tabel HTML.
 * @param {Array<object>} dataNilai - Array objek nilai mahasiswa.
 */
function tampilkanDataDiTabel(dataNilai) {
    const tableBody = document.getElementById('nilaiTableBody');
    if (!tableBody) return; // Keluar jika elemen tabel tidak ada

    tableBody.innerHTML = ''; // Kosongkan tabel sebelumnya

    if (dataNilai.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="5" class="text-center">Belum ada data nilai.</td></tr>';
        return;
    }

    let no = 1;
    dataNilai.forEach(data => {
        const row = tableBody.insertRow();
        
        row.insertCell().textContent = no++;
        row.insertCell().textContent = data.namaLengkap;
        row.insertCell().textContent = data.nim;
        row.insertCell().textContent = data.mataKuliah;
        row.insertCell().textContent = data.nilai;
    });
}


// Tambahkan inisialisasi untuk memuat data saat halaman lihat_data.html dimuat.
if (document.getElementById('nilaiTableBody')) {
    document.addEventListener('DOMContentLoaded', loadData);
}

// PENTING: Untuk memastikan loadData bisa diakses di lihat_data.html (seperti instruksi CodeLab)
// Di halaman lihat_data.html, kita memanggil loadData() di akhir body.