# K-BasicThread Co. - E-Commerce Platform
Final Project Mata Kuliah: KAIT II (Administrasi Bisnis 2025/2026)

## 1. Profil Bisnis & Value Proposition
* **Nama Bisnis:** K-BasicThread Co.
* **Deskripsi:** E-commerce yang menyediakan pakaian esensial sehari-hari dengan fokus utama pada kaos polos (T-shirt) berkualitas tinggi dan kaos kerah (Polo Shirt) berdesain minimalis modern.
* **Value Proposition:** *"Premium Comfort for Everyday Essentials"*. Menggunakan bahan 100% Cotton Combed 30s untuk kaos polos (adem dan menyerap keringat) dan Cotton Pique premium untuk polo shirt, dengan harga yang tetap terjangkau bagi mahasiswa dan pekerja muda.

## 2. Target Market & Segmentasi Pelanggan
* **Demografis:** Pria dan wanita usia 17–30 tahun (mahasiswa, fresh graduates, pekerja kantoran muda).
* **Geografis:** Area perkotaan dan pinggiran kota (fokus awal pengiriman seluruh Indonesia).
* **Psikografis:** Individu yang menyukai gaya berpakaian kasual, minimalis, smart-casual, dan praktis (tidak suka baju bermotif terlalu ramai).

## 3. Analisis Pasar & Kompetitor Short-Analysis
* **Potensi Pasar:** Kebutuhan akan pakaian kasual (basic wear) selalu tinggi dan tidak musiman (timeless trend).
* **Kompetitor:** Brand besar seperti Uniqlo (sisi kualitas) atau toko kaos polos kiloan (sisi harga murah).
* **Strategi K-BasicThread Co:** Mengambil posisi di tengah—kualitas mendekati brand retail besar, namun dengan harga lokal yang kompetitif dan pengalaman belanja website yang sangat mudah.

## 4. Manajemen Produk & Strategi Harga
* **Katalog Produk Dinamis (Sinkronisasi LocalStorage):** Data produk dikelola secara terpusat dan dapat diperbarui secara *real-time* melalui panel administrasi (*Admin Dashboard*), yang otomatis mencakup sinkronisasi nama, kategori, harga, stok, deskripsi, jumlah terjual, dan rating produk.
* **Daftar Produk Awal (Default Database):**

| No | Kategori | Nama Produk | Harga | Stok | Deskripsi Singkat |
| :--- | :--- | :--- | :--- | :--- | :--- |
| 1 | Kaos Polos | Classic Tee Black | Rp 55.000 | 20 | Kaos polos hitam, 100% Cotton Combed 30s. |
| 2 | Kaos Polos | Classic Tee White | Rp 55.000 | 25 | Kaos polos putih bersih, bahan tebal tidak menerawang. |
| 3 | Kaos Polos | Classic Tee Navy | Rp 55.000 | 31 | Kaos polos warna biru dongker, cocok untuk santai. |
| 4 | Kaos Polos | Classic Tee Dusty Pink | Rp 55.000 | 27 | Kaos polos merah muda kalem, tren warna pastel. |
| 5 | Kaos Polo | Premium Polo Black | Rp 95.000 | 26 | Kaos kerah hitam, bahan Cotton Pique rajutan rapi. |
| 6 | Kaos Polo | Premium Polo Navy | Rp 95.000 | 28 | Kaos kerah biru dongker, tampilan smart-casual. |
| 7 | Kaos Polo | Premium Polo Maroon | Rp 95.000 | 29 | Kaos kerah merah marun, memberikan kesan elegan. |
| 8 | Kaos Polo | Premium Polo Heather Grey | Rp 95.000 | 22 | Kaos kerah abu-abu misty, kasual namun tetap rapi. |

* **Strategi Promosi:** Diskon otomatis sebesar 10% untuk pengguna baru pada simulasi checkout pertama.

## 5. Alur Transaksi, Manajemen Stok, & Integrasi Sistem
* **Metode Pengiriman:** Pelanggan dapat memilih opsi kurir pengiriman langsung pada form checkout (JNE Reguler - Rp 15.000, JNT Express - Rp 18.000, atau GoSend - Rp 25.000) yang secara otomatis memperbarui total tagihan pembayaran.
* **Payment Gateway & Simulasi QRIS:** Menyediakan berbagai pilihan metode pembayaran seperti Transfer Bank serta fitur interaktif simulasi scan barcode QRIS yang akan muncul secara dinamis jika metode QRIS dipilih.
* **Manajemen Inventaris Otomatis:** Ketika transaksi diselesaikan oleh pelanggan, sistem secara otomatis mengurangi jumlah ketersediaan stok produk dan menambahkan akumulasi jumlah produk terjual yang langsung diperbarui pada katalog utama serta dashboard admin.
* **Konfirmasi Pesanan via WhatsApp:** Setelah menekan tombol **"Konfirmasi Pesanan"**, sistem JavaScript secara otomatis memvalidasi data, memperbarui data inventaris lokal, dan mengarahkan pelanggan ke web/aplikasi WhatsApp dengan format pesan pesanan terstruktur ke nomor admin.
* **Rencana Data Analytics:** Menyertakan indikator pelacakan untuk memantau metrik performa toko:
  * **Conversion Rate:** Berapa persen pengunjung website yang akhirnya melakukan pembelian.
  * **Bounce Rate:** Mengukur persentase pengunjung yang langsung keluar setelah membuka halaman pertama (target < 40%).
  * **Shopping Cart Abandonment Rate:** Melacak pengguna yang memasukkan barang ke keranjang tetapi tidak melakukan checkout.
