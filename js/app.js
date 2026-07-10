// ==========================================================================
// DATA KATALOG PRODUK (8 PRODUK DENGAN KATEGORI & WARNA PASTEL JALAN)
// ==========================================================================
const databaseProduk = [
    {
        id: 1,
        nama: "Classic Tee Black",
        kategori: "Kaos Polos",
        harga: 55000,
        deskripsi: "Kaos polos hitam esensial dengan potongan reguler. Menggunakan bahan premium 100% Cotton Combed 30s yang sangat adem, lembut, dan menyerap keringat dengan baik.",
        gambar: "images/kaos-hitam.jpg"
    },
    {
        id: 2,
        nama: "Classic Tee White",
        kategori: "Kaos Polos",
        harga: 55000,
        deskripsi: "Kaos polos putih bersih esensial. Ketebalan kain pas, rajutan rapat, dan dijamin tidak menerawang saat digunakan beraktivitas sehari-hari.",
        gambar: "images/kaos-putih.jpg"
    },
    {
        id: 3,
        nama: "Classic Tee Navy",
        kategori: "Kaos Polos",
        harga: 55000,
        deskripsi: "Kaos polos warna biru dongker (*navy blue*) yang memberikan kesan kasual namun tetap rapi. Mudah dipadupadankan dengan celana jins maupun chino.",
        gambar: "images/kaos-navy.jpg"
    },
    {
        id: 4,
        nama: "Classic Tee Dusty Pink",
        kategori: "Kaos Polos",
        harga: 55000,
        deskripsi: "Kaos polos dengan variasi warna merah muda pastel yang kalem dan trendi. Sangat cocok bagi kamu yang ingin tampil cerah, segar, dan kekinian.",
        gambar: "images/kaos-dustypink.jpg"
    },
    {
        id: 5,
        nama: "Premium Polo Black",
        kategori: "Kaos Polo",
        harga: 95000,
        deskripsi: "Kaos kerah minimalis warna hitam pekat. Dibuat menggunakan bahan Premium Cotton Pique rajutan rapi, memberikan kesan tampilan *smart-casual* yang berkelas.",
        gambar: "images/polo-hitam.jpg"
    },
    {
        id: 6,
        nama: "Premium Polo Navy",
        kategori: "Kaos Polo",
        harga: 95000,
        deskripsi: "Kaos kerah warna biru dongker elegan. Kerah dan manset lengan didesain kokoh serta tidak mudah melar setelah dicuci berkali-kali.",
        gambar: "images/polo-navy.jpg"
    },
    {
        id: 7,
        nama: "Premium Polo Maroon",
        kategori: "Kaos Polo",
        harga: 95000,
        deskripsi: "Kaos kerah berwarna merah marun mewah yang memberikan aura percaya diri dan gagah. Cocok dipakai untuk kuliah, kerja santai, maupun *hangout*.",
        gambar: "images/polo-marun.jpg"
    },
    {
        id: 8,
        nama: "Premium Polo Heather Grey",
        kategori: "Kaos Polo",
        harga: 95000,
        deskripsi: "Kaos kerah warna abu-abu misty (*heather grey*) kasual. Tekstur warna unik yang netral, sangat fleksibel dipasangkan dengan jaket luar atau blazer.",
        gambar: "images/polo-abuabu.jpg"
    }
];

// STATE APLIKASI (Mengambil data keranjang dari localStorage jika ada)
let keranjangBelanja = JSON.parse(localStorage.getItem('K_BASIC_CART')) || [];

// ==========================================================================
// INITIALIZATION / KETIKA WEBSITE DI-LOAD
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
    tampilkanKatalog(databaseProduk);
    perbaruiTampilanKeranjang();

    // Event Listener Filter Kategori & Pencarian
    document.getElementById("search-input").addEventListener("input", filterSistem);
    document.getElementById("category-filter").addEventListener("change", filterSistem);
});

// ==========================================================================
// FUNGSI RENDER KATALOG PRODUK
// ==========================================================================
function tampilkanKatalog(daftarProduk) {
    const wadahProduk = document.getElementById("products-display");
    wadahProduk.innerHTML = "";

    if (daftarProduk.length === 0) {
        wadahProduk.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: #888; padding: 40px 0;">Produk tidak ditemukan.</p>`;
        return;
    }

    daftarProduk.forEach(produk => {
        const kartuHtml = `
            <div class="product-card">
                <div class="product-img-wrapper" onclick="bukaModal(${produk.id})">
                    <img src="${produk.gambar}" alt="${produk.nama}">
                </div>
                <div class="product-info">
                    <span class="product-category">${produk.kategori}</span>
                    <h3 class="product-title">${produk.nama}</h3>
                    <p class="product-price">Rp ${produk.harga.toLocaleString('id-ID')}</p>
                    <button class="btn-primary" onclick="tambahKeKeranjang(${produk.id})">Tambah Keranjang</button>
                </div>
            </div>
        `;
        wadahProduk.innerHTML += kartuHtml;
    });
}

// FUNGSI FILTER DAN SEARCH (DIPANGGIL SETIAP INPUT BERUBAH)
function filterSistem() {
    const kataKunci = document.getElementById("search-input").value.toLowerCase();
    const kategoriDipilih = document.getElementById("category-filter").value;

    const hasilFilter = databaseProduk.filter(produk => {
        const cocokKataKunci = produk.nama.toLowerCase().includes(kataKunci) || produk.deskripsi.toLowerCase().includes(kataKunci);
        const cocokKategori = (kategoriDipilih === "all") || (produk.kategori === kategoriDipilih);
        return cocokKataKunci && cocokKategori;
    });

    tampilkanKatalog(hasilFilter);
}

// ==========================================================================
// INTERAKSI MODAL DETAIL PRODUK
// ==========================================================================
function bukaModal(idProduk) {
    const produk = databaseProduk.find(p => p.id === idProduk);
    if (!produk) return;

    document.getElementById("modal-img").src = produk.gambar;
    document.getElementById("modal-title").innerText = produk.nama;
    document.getElementById("modal-price").innerText = `Rp ${produk.harga.toLocaleString('id-ID')}`;
    document.getElementById("modal-desc").innerText = produk.deskripsi;
    
    // Set fungsi onclick tombol di dalam modal
    document.getElementById("modal-add-btn").onclick = () => {
        tambahKeKeranjang(produk.id);
        closeModal();
    };

    document.getElementById("product-modal").style.display = "flex";
}

function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}

// Menutup modal jika user klik area luar modal
window.onclick = function(event) {
    const modal = document.getElementById("product-modal");
    if (event.target === modal) {
        modal.style.display = "none";
    }
}

// ==========================================================================
// MANAJEMEN KERANJANG BELANJA & LOCALSTORAGE
// ==========================================================================
function toggleCart() {
    document.getElementById("cart-sidebar").classList.toggle("open");
}

function tambahKeKeranjang(idProduk) {
    const produkPilihan = databaseProduk.find(p => p.id === idProduk);
    const itemDiKeranjang = keranjangBelanja.find(item => item.id === idProduk);

    if (itemDiKeranjang) {
        itemDiKeranjang.jumlah += 1;
    } else {
        keranjangBelanja.push({
            id: produkPilihan.id,
            nama: produkPilihan.nama,
            harga: produkPilihan.harga,
            gambar: produkPilihan.gambar,
            jumlah: 1
        });
    }

    simpanDanPerbarui();
}

function ubahJumlahItem(idProduk, perubahan) {
    const item = keranjangBelanja.find(item => item.id === idProduk);
    if (!item) return;

    item.jumlah += perubahan;
    if (item.jumlah <= 0) {
        keranjangBelanja = keranjangBelanja.filter(item => item.id !== idProduk);
    }
    
    simpanDanPerbarui();
}

function hapusItemDariKeranjang(idProduk) {
    keranjangBelanja = keranjangBelanja.filter(item => item.id !== idProduk);
    simpanDanPerbarui();
}

function simpanDanPerbarui() {
    // Menyimpan data array keranjang belanja ke localStorage (Syarat Wajib)
    localStorage.setItem('K_BASIC_CART', JSON.stringify(keranjangBelanja));
    perbaruiTampilanKeranjang();
}

// PERHITUNGAN OTOMATIS & RENDER ELEMENT KERANJANG
function perbaruiTampilanKeranjang() {
    // Update lingkaran jumlah item di navbar
    const totalItem = keranjangBelanja.reduce((sum, item) => sum + item.jumlah, 0);
    document.getElementById("cart-count").innerText = totalItem;

    const wadahItemKeranjang = document.getElementById("cart-items-container");
    const wadahRingkasanCheckout = document.getElementById("summary-items");

    // Reset isi keranjang dan checkout
    wadahItemKeranjang.innerHTML = "";
    wadahRingkasanCheckout.innerHTML = "";

    if (keranjangBelanja.length === 0) {
        wadahItemKeranjang.innerHTML = `<p class="empty-cart-msg">Keranjangmu masih kosong.</p>`;
        document.getElementById("cart-total-price").innerText = "Rp 0";
        updateNotaCheckout(0);
        return;
    }

    let subtotalHarga = 0;

    keranjangBelanja.forEach(item => {
        const hargaTotalItem = item.harga * item.jumlah;
        subtotalHarga += hargaTotalItem;

        // Render HTML untuk Sidebar Keranjang
        const HTMLKeranjang = `
            <div class="cart-item">
                <img src="${item.gambar}" alt="${item.nama}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4 class="cart-item-title">${item.nama}</h4>
                    <p class="cart-item-price">Rp ${item.harga.toLocaleString('id-ID')} x ${item.jumlah}</p>
                    <div class="cart-qty-controls">
                        <button class="cart-qty-btn" onclick="ubahJumlahItem(${item.id}, -1)">-</button>
                        <span>${item.jumlah}</span>
                        <button class="cart-qty-btn" onclick="ubahJumlahItem(${item.id}, 1)">+</button>
                    </div>
                    <button class="remove-item-btn" onclick="hapusItemDariKeranjang(${item.id})">Hapus</button>
                </div>
            </div>
        `;
        wadahItemKeranjang.innerHTML += HTMLKeranjang;

        // Render HTML untuk List Ringkasan Pesanan di bagian Checkout
        const HTMLRingkasan = `
            <div class="summary-row">
                <span>${item.nama} (x${item.jumlah})</span>
                <span>Rp ${hargaTotalItem.toLocaleString('id-ID')}</span>
            </div>
        `;
        wadahRingkasanCheckout.innerHTML += HTMLRingkasan;
    });

    document.getElementById("cart-total-price").innerText = `Rp ${subtotalHarga.toLocaleString('id-ID')}`;
    updateNotaCheckout(subtotalHarga);
}

// PERHITUNGAN DISKON OTOMATIS & TOTAL AKHIR DI NOTA CHECKOUT
function updateNotaCheckout(subtotal) {
    // Strategi Promosi: Diskon 10% untuk simulasi transaksi pertama (Syarat Aspek Bisnis)
    let nilaiDiskon = subtotal > 0 ? Math.round(subtotal * 0.10) : 0;
    let totalAkhir = subtotal - nilaiDiskon;

    document.getElementById("summary-subtotal").innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    document.getElementById("summary-discount").innerText = `- Rp ${nilaiDiskon.toLocaleString('id-ID')}`;
    document.getElementById("summary-total").innerText = `Rp ${totalAkhir.toLocaleString('id-ID')}`;
}

// ==========================================================================
// VALIDASI FORM & SIMULASI PENYELESAIAN PEMBAYARAN (PAYMENT GATEWAY)
// ==========================================================================
function processCheckout(event) {
    event.preventDefault(); // Mencegah reload halaman saat klik submit

    if (keranjangBelanja.length === 0) {
        alert("Gagal melakukan checkout! Keranjang belanja Anda masih kosong.");
        return;
    }

    const namaPelanggan = document.getElementById("nama").value;
    const alamatKirim = document.getElementById("alamat").value;
    const metodeBayar = document.getElementById("payment-method").value;

    // Simulasi Pengiriman Payload Informasi Ke API Midtrans Sandbox/Dummy
    alert(`
        --- SIMULASI MIDTRANS PAYMENT GATEWAY SUCCESS ---
        
        Terima kasih, ${namaPelanggan}!
        Pesanan Anda sedang diproses melalui sistem pembayaran keamanan ${metodeBayar}.
        
        Barang akan dikirim ke alamat:
        ${alamatKirim}
        
        [Data Transaksi Sukses Tercatat di LocalStorage & Google Analytics Dummy]
    `);

    // Reset keranjang setelah transaksi sukses selesai dilakukan
    keranjangBelanja = [];
    simpanDanPerbarui();
    document.getElementById("checkout-form").reset();
    
    // Mengarahkan tampilan kembali ke halaman katalog atas secara smooth
    window.location.href = "#home";
}
// ==========================================================================
// FUNGSI NAVIGASI ANTAR HALAMAN (HOME, KATALOG, CHECKOUT)
// ==========================================================================
function tampilkanHalaman(halaman) {
    const elHome = document.getElementById("page-home");
    const elKatalog = document.getElementById("page-katalog");
    const elCheckout = document.getElementById("page-checkout");

    // Sembunyikan semua halaman terlebih dahulu
    elHome.classList.add("hidden");
    elKatalog.classList.add("hidden");
    elCheckout.classList.add("hidden");

    // Tampilkan halaman yang dipilih
    if (halaman === 'home') {
        elHome.classList.remove("hidden");
    } else if (halaman === 'katalog') {
        elKatalog.classList.remove("hidden");
    } else if (halaman === 'checkout') {
        elCheckout.classList.remove("hidden");
    }

    // Gulir ke atas secara halus saat berpindah halaman
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
