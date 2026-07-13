# K-BasicThread Co. - E-Commerce Platform
Final Project Mata Kuliah: KAIT II (Administrasi Bisnis - Kelas 8)

## 1. Profil Bisnis & Value Proposition
* **Nama Bisnis:** K-BasicThread Co.
* **Deskripsi:** E-commerce yang menyediakan pakaian esensial sehari-hari dengan fokus utama pada kaos polos (T-shirt) berkualitas tinggi dan kaos kerah (Polo Shirt) berdesain minimalis modern.
* **Value Proposition:** *"Premium Comfort for Everyday Essentials"*. Menggunakan bahan 100% Cotton Combed 30s untuk kaos polos (adem dan menyerap keringat) serta Cotton Pique premium untuk polo shirt, dengan harga yang tetap terjangkau bagi mahasiswa dan pekerja muda.

## 2. Target Market & Segmentasi Pelanggan
* **Demografis:** Pria dan wanita usia 17–30 tahun (mahasiswa, fresh graduates, pekerja kantoran muda).
* **Geografis:** Area perkotaan dan pinggiran kota (fokus awal pengiriman seluruh Indonesia).
* **Psikografis:** Individu yang menyukai gaya berpakaian kasual, minimalis, smart-casual, dan praktis.

## 3. Analisis Pasar & Kompetitor Short-Analysis
* **Potensi Pasar:** Kebutuhan akan pakaian kasual (*basic wear*) selalu tinggi, berkelanjutan, dan tidak musiman (*timeless trend*).
* **Kompetitor:** Brand besar seperti Uniqlo (sisi kualitas) atau toko kaos polos curah (sisi harga murah).
* **Strategi K-BasicThread Co.:** Mengambil posisi di tengah—menyediakan kualitas premium mendekati brand besar namun dengan efisiensi harga operasional sehingga jauh lebih ramah di kantong target pasar lokal.

## 4. Struktur Arsitektur & Teknologi Web
Platform e-commerce K-BasicThread Co. dibangun menggunakan arsitektur web berbasis klien (*Client-Side Rendering*) yang responsif, terstruktur atas komponen berikut:
* **HTML5 (`index.html`, `admin.html`):** Menyediakan struktur semantik halaman utama pembeli serta dashboard administrasi toko.
* **CSS3 (`css/style.css`):** Mengatur visualisasi antarmuka bertema *Bright Gold, Cream, & Mahogany Vibe* yang mewah dan elegan, lengkap dengan *Media Queries* untuk optimasi tampilan penuh (*full responsive*) pada perangkat mobile (HP).
* **JavaScript (`js/app.js`, `js/admin.js`):** Mengelola logika bisnis dinamis seperti sistem filter/pencarian produk, keranjang belanja, kalkulasi nota otomatis, otentikasi login admin, dan integrasi data.
* **Web Storage API (localStorage):** Berfungsi sebagai basis data lokal yang persisten untuk mensinkronkan data katalog produk, jumlah stok, grafik produk terjual, serta data keranjang belanja antar halaman secara *real-time*.

## 5. Alur Transaksi, Manajemen Stok, & Integrasi Sistem
* **Metode Pengiriman Dinamis:** Pelanggan dapat memilih opsi kurir pengiriman langsung pada formulir checkout (**JNE Reguler - Rp 15.000** atau **JNT Express - Rp 18.000**) yang secara otomatis memperbarui total tagihan pembayaran dan nota checkout lengkap secara *real-time*.
* **Payment Gateway & Simulasi QRIS:** Menyediakan pilihan metode pembayaran interaktif seperti Transfer Bank dan simulasi dinamis *scan barcode QRIS* yang akan otomatis muncul di layar jika opsi QRIS dipilih oleh pelanggan.
* **Manajemen Inventaris Otomatis:** Begitu transaksi diselesaikan (klik konfirmasi), sistem secara otomatis mengurangi jumlah ketersediaan stok produk dan menambahkan akumulasi jumlah produk terjual (*sold counter*) secara akurat pada katalog utama serta dashboard admin.
* **Sistem Keamanan Halaman Admin (Access Control):** Untuk melindungi integritas data inventaris dari pembeli biasa, akses menuju halaman `admin.html` telah diproteksi menggunakan gerbang kata sandi dinamis (*Password Prompt Barrier*). Pengguna wajib memasukkan kata sandi admin yang benar agar bisa masuk ke halaman pengelolaan stok.
* **Konfirmasi Pesanan via WhatsApp:** Sistem JavaScript secara otomatis memvalidasi seluruh data formulir, merangkum detail item belanjaan, menghitung diskon pengguna baru (10%), menambahkan ongkir kurir terpilih, dan mengarahkan pembeli langsung ke WhatsApp Admin dengan format pesan pesanan yang rapi dan terstruktur.

## 6. Rencana Data Analytics
Menyertakan indikator pelacakan teknis pada repositori untuk memantau metrik performa toko:
* **Conversion Rate:** Mengukur persentase pengunjung website yang akhirnya melakukan aksi pembelian.
* **Bounce Rate:** Memantau persentase pengunjung yang langsung keluar setelah membuka halaman pertama (target efisiensi < 40%).
* **Shopping Cart Abandonment Rate:** Melacak perilaku pengguna yang memasukkan barang ke keranjang tetapi tidak melanjutkan proses transaksi hingga tahap akhir checkout.

---
**K-BasicThread Co. Co-Created Project**
*Designed by Karina Nurul Khasanah (NIM: 209250188)*
