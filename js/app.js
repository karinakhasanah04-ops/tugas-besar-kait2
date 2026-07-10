// ==========================================================================
// DATA KATALOG PRODUK (8 PRODUK DENGAN KATEGORI & WARNA)
// ==========================================================================
const databaseProduk = [
    {
        id: 1,
        nama: "Classic Tee Black",
        kategori: "Kaos Polos",
        harga: 55000,
        rating: 4.9,
        terjual: 289,
        deskripsi: "Kaos polos hitam esensial dengan potongan reguler. Menggunakan bahan premium 100% Cotton Combed 30s yang sangat adem, lembut, dan menyerap keringat dengan baik.",
        gambar: "images/kaos-hitam.jpg"
    },
    {
        id: 2,
        nama: "Classic Tee White",
        kategori: "Kaos Polos",
        harga: 55000,
        rating: 4.9,
        terjual: 265,
        deskripsi: "Kaos polos putih bersih esensial. Ketebalan kain pas, rajutan rapat, dan dijamin tidak menerawang saat digunakan beraktivitas sehari-hari.",
        gambar: "images/kaos-putih.jpg"
    },
    {
        id: 3,
        nama: "Classic Tee Navy",
        kategori: "Kaos Polos",
        harga: 55000,
        rating: 4.9,
        terjual: 99,
        deskripsi: "Kaos polos warna biru dongker (navy blue) yang memberikan kesan kasual namun tetap rapi. Mudah dipadupadankan dengan celana jins maupun chino.",
        gambar: "images/kaos-navy.jpg"
    },
    {
        id: 4,
        nama: "Classic Tee Dusty Pink",
        kategori: "Kaos Polos",
        harga: 55000,
        rating: 4.9,
        terjual: 154,
        deskripsi: "Kaos polos dengan variasi warna merah muda pastel yang kalem dan trendi. Sangat cocok bagi kamu yang ingin tampil cerah, segar, dan kekinian.",
        gambar: "images/kaos-dustypink.jpg"
    },
    {
        id: 5,
        nama: "Premium Polo Black",
        kategori: "Kaos Polo",
        harga: 95000,
        rating: 4.9,
        terjual: 287,
        deskripsi: "Kaos kerah minimalis warna hitam pekat. Dibuat menggunakan bahan Premium Cotton Pique rajutan rapi, memberikan kesan tampilan smart-casual yang berkelas.",
        gambar: "images/polo-hitam.jpg"
    },
    {
        id: 6,
        nama: "Premium Polo Navy",
        kategori: "Kaos Polo",
        harga: 95000,
        rating: 4.9,
        terjual: 185,
        deskripsi: "Kaos kerah warna biru dongker elegan. Kerah dan manset lengan didesain kokoh serta tidak mudah melar setelah dicuci berkali-kali.",
        gambar: "images/polo-navy.jpg"
    },
    {
        id: 7,
        nama: "Premium Polo Maroon",
        kategori: "Kaos Polo",
        harga: 95000,
        rating: 4.9,
        terjual: 72,
        deskripsi: "Kaos kerah berwarna merah marun mewah yang memberikan aura percaya diri dan gagah. Cocok dipakai untuk kuliah, kerja santai, maupun hangout.",
        gambar: "images/polo-marun.jpg"
    },
    {
        id: 8,
        nama: "Premium Polo Heather Grey",
        kategori: "Kaos Polo",
        harga: 95000,
        rating: 4.9,
        terjual: 215,
        deskripsi: "Kaos kerah warna abu-abu misty (heather grey) kasual. Tekstur warna unik yang netral, sangat fleksibel dipasangkan dengan jaket luar atau blazer.",
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

    // Event Listener Filter Kategori, Pencarian, & Urutan Harga
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const priceSort = document.getElementById("price-sort");
    
    if (searchInput) searchInput.addEventListener("input", filterSistem);
    if (categoryFilter) categoryFilter.addEventListener("change", filterSistem);
    if (priceSort) priceSort.addEventListener("change", filterSistem);
});

// ==========================================================================
// FUNGSI RENDER KATALOG PRODUK
// ==========================================================================
function tampilkanKatalog(daftarProduk) {
    const wadahProduk = document.getElementById("products-display");
    if (!wadahProduk) return;
    
    wadahProduk.innerHTML = "";

    if (daftarProduk.length === 0) {
        wadahProduk.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px 0;">Produk tidak ditemukan.</p>`;
        return;
    }

  daftarProduk.forEach(produk => {
    // Simulasi data rating & terjual (bisa disesuaikan atau ditambah ke databaseProduk)
    const rating = produk.rating || 4.8; 
    const terjual = produk.terjual || 120;

    const kartuHtml = `
        <div class="product-card">
            <div class="product-img-wrapper" onclick="bukaModal(${produk.id})">
                <img src="${produk.gambar}" alt="${produk.nama}">
            </div>
            <div class="product-info">
                <span class="product-category">${produk.kategori}</span>
                <h3 class="product-title">${produk.nama}</h3>
                <p class="product-price">Rp ${produk.harga.toLocaleString('id-ID')}</p>
                
                <div class="product-meta">
                    <span class="product-rating">
                        <i class="star-icon">⭐</i> ${rating}
                    </span>
                    <span class="product-sold">| ${terjual} terjual</span>
                </div>

                <button class="btn-primary" onclick="tambahKeKeranjang(${produk.id})">Tambah Keranjang</button>
            </div>
        </div>
    `;
    wadahProduk.innerHTML += kartuHtml;
});
}

// FUNGSI FILTER, SEARCH, & SORTING HARGA
function filterSistem() {
    const searchInput = document.getElementById("search-input");
    const categoryFilter = document.getElementById("category-filter");
    const priceSort = document.getElementById("price-sort");
    
    const kataKunci = searchInput ? searchInput.value.toLowerCase() : "";
    const kategoriDipilih = categoryFilter ? categoryFilter.value : "all";
    const urutanHarga = priceSort ? priceSort.value : "default";

    let hasilFilter = databaseProduk.filter(produk => {
        const cocokKataKunci = produk.nama.toLowerCase().includes(kataKunci) || produk.deskripsi.toLowerCase().includes(kataKunci);
        const cocokKategori = (kategoriDipilih === "all") || (produk.kategori === kategoriDipilih);
        return cocokKataKunci && cocokKategori;
    });

    if (urutanHarga === "low-high") {
        hasilFilter.sort((a, b) => a.harga - b.harga);
    } else if (urutanHarga === "high-low") {
        hasilFilter.sort((a, b) => b.harga - a.harga);
    }

    tampilkanKatalog(hasilFilter);
}

// ==========================================================================
// INTERAKSI MODAL DETAIL PRODUK
// ==========================================================================
function bukaModal(idProduk) {
    const produk = databaseProduk.find(p => p.id === idProduk);
    if (!produk) return;

    const modalImg = document.getElementById("modal-img");
    const modalTitle = document.getElementById("modal-title");
    const modalPrice = document.getElementById("modal-price");
    const modalDesc = document.getElementById("modal-desc");
    const modalAddBtn = document.getElementById("modal-add-btn");

    if (modalImg) modalImg.src = produk.gambar;
    if (modalTitle) modalTitle.innerText = produk.nama;
    if (modalPrice) modalPrice.innerText = `Rp ${produk.harga.toLocaleString('id-ID')}`;
    if (modalDesc) modalDesc.innerText = produk.deskripsi;
    
    if (modalAddBtn) {
        modalAddBtn.onclick = () => {
            tambahKeKeranjang(produk.id);
            closeModal();
        };
    }

    const productModal = document.getElementById("product-modal");
    if (productModal) productModal.style.display = "flex";
}

function closeModal() {
    const productModal = document.getElementById("product-modal");
    if (productModal) productModal.style.display = "none";
}

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
    const cartSidebar = document.getElementById("cart-sidebar");
    if (cartSidebar) cartSidebar.classList.toggle("open");
}

function tambahKeKeranjang(idProduk) {
    const produkPilihan = databaseProduk.find(p => p.id === idProduk);
    if (!produkPilihan) return;

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
    tampilkanNotifikasi(`"${produkPilihan.nama}" berhasil masuk keranjang!`);
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
    localStorage.setItem('K_BASIC_CART', JSON.stringify(keranjangBelanja));
    perbaruiTampilanKeranjang();
}

function perbaruiTampilanKeranjang() {
    const cartCountEl = document.getElementById("cart-count");
    if (cartCountEl) {
        const totalItem = keranjangBelanja.reduce((sum, item) => sum + item.jumlah, 0);
        cartCountEl.innerText = totalItem;
    }

    const wadahItemKeranjang = document.getElementById("cart-items-container");
    const wadahRingkasanCheckout = document.getElementById("summary-items");
    const cartTotalPriceEl = document.getElementById("cart-total-price");

    if (wadahItemKeranjang) wadahItemKeranjang.innerHTML = "";
    if (wadahRingkasanCheckout) wadahRingkasanCheckout.innerHTML = "";

    if (keranjangBelanja.length === 0) {
        if (wadahItemKeranjang) wadahItemKeranjang.innerHTML = `<p class="empty-cart-msg">Keranjangmu masih kosong.</p>`;
        if (wadahRingkasanCheckout) wadahRingkasanCheckout.innerHTML = `<p class="empty-cart-msg">Belum ada produk yang dipilih.</p>`;
        if (cartTotalPriceEl) cartTotalPriceEl.innerText = "Rp 0";
        updateNotaCheckout(0);
        return;
    }

    let subtotalHarga = 0;

    keranjangBelanja.forEach(item => {
        const hargaTotalItem = item.harga * item.jumlah;
        subtotalHarga += hargaTotalItem;

        if (wadahItemKeranjang) {
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
        }

        if (wadahRingkasanCheckout) {
            const HTMLRingkasan = `
                <div class="cart-item" style="margin-bottom: 12px; padding-bottom: 12px; border-bottom: 1px solid #f9f3d9; display: flex; gap: 12px; align-items: center;">
                    <img src="${item.gambar}" alt="${item.nama}" style="width: 50px; height: 60px; object-fit: cover; border-radius: 4px;">
                    <div class="cart-item-details" style="flex-grow: 1;">
                        <h4 class="cart-item-title" style="font-size: 13px; font-weight: 600;">${item.nama}</h4>
                        <p class="cart-item-price" style="font-size: 12px; color: var(--text-muted);">Rp ${hargaTotalItem.toLocaleString('id-ID')}</p>
                        <div class="cart-qty-controls" style="display: flex; align-items: center; gap: 8px; margin-top: 4px;">
                            <button class="cart-qty-btn" onclick="ubahJumlahItem(${item.id}, -1)">-</button>
                            <span style="font-size: 13px;">${item.jumlah}</span>
                            <button class="cart-qty-btn" onclick="ubahJumlahItem(${item.id}, 1)">+</button>
                            <button class="remove-item-btn" onclick="hapusItemDariKeranjang(${item.id})" style="margin-left: auto;">Hapus</button>
                        </div>
                    </div>
                </div>
            `;
            wadahRingkasanCheckout.innerHTML += HTMLRingkasan;
        }
    });

    if (cartTotalPriceEl) {
        cartTotalPriceEl.innerText = `Rp ${subtotalHarga.toLocaleString('id-ID')}`;
    }
    
    cekMetodePengiriman();
}

function updateNotaCheckout(subtotal) {
    cekMetodePengiriman();
}

// ==========================================================================
// TOAST NOTIFIKASI
// ==========================================================================
function tampilkanNotifikasi(pesan) {
    const toast = document.getElementById("toast-notification");
    const toastMsg = document.getElementById("toast-message");
    
    if (!toast || !toastMsg) return;
    
    toastMsg.innerText = pesan;
    toast.classList.remove("toast-hidden");
    toast.classList.add("toast-show");
    
    setTimeout(() => {
        toast.classList.remove("toast-show");
        toast.classList.add("toast-hidden");
    }, 2500);
}

// ==========================================================================
// VALIDASI FORM & KONFIRMASI PEMBAYARAN VIA WHATSAPP
// ==========================================================================
function processCheckout(event) {
    event.preventDefault();

    if (keranjangBelanja.length === 0) {
        alert("Gagal melakukan checkout! Keranjang belanja Anda masih kosong.");
        return;
    }

    const namaPelanggan = document.getElementById("nama") ? document.getElementById("nama").value : "Pelanggan";
    const alamatKirim = document.getElementById("alamat") ? document.getElementById("alamat").value : "Alamat";
    const kurir = document.getElementById("shipping-method") ? document.getElementById("shipping-method").value : "JNE";
    const metodeBayar = document.getElementById("payment-method") ? document.getElementById("payment-method").value : "Transfer";

    let subtotal = keranjangBelanja.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
    let nilaiDiskon = subtotal > 0 ? Math.round(subtotal * 0.10) : 0;
    let biayaOngkir = kurir === "JNT" ? 18000 : (kurir === "GoSend" ? 25000 : 15000);
    let totalAkhir = (subtotal - nilaiDiskon) + biayaOngkir;

    let daftarItemTeks = "";
    keranjangBelanja.forEach(item => {
        daftarItemTeks += `- ${item.nama} (x${item.jumlah}) : Rp ${(item.harga * item.jumlah).toLocaleString('id-ID')}\n`;
    });

    const nomorAdminWhatsApp = "6289531508088"; 

    const pesanWhatsApp = `Halo Admin K-BasicThread Co., saya ingin mengkonfirmasi pesanan saya:%0A%0A` +
        `*Nama Lengkap:* ${namaPelanggan}%0A` +
        `*Alamat Pengiriman:* ${alamatKirim}%0A` +
        `*Metode Pengiriman:* ${kurir} (Rp ${biayaOngkir.toLocaleString('id-ID')})%0A` +
        `*Metode Pembayaran:* ${metodeBayar}%0A%0A` +
        `*Detail Pesanan:*%0A${encodeURIComponent(daftarItemTeks)}%0A` +
        `*Subtotal:* Rp ${subtotal.toLocaleString('id-ID')}%0A` +
        `*Diskon (10%):* -Rp ${nilaiDiskon.toLocaleString('id-ID')}%0A` +
        `*Ongkir:* Rp ${biayaOngkir.toLocaleString('id-ID')}%0A` +
        `*Total Pembayaran:* Rp ${totalAkhir.toLocaleString('id-ID')}%0A%0A` +
        `Mohon segera diproses ya kak. Terima kasih!`;

    const urlWhatsApp = `https://wa.me/${nomorAdminWhatsApp}?text=${pesanWhatsApp}`;
    window.open(urlWhatsApp, '_blank');

    keranjangBelanja = [];
    simpanDanPerbarui();
    
    const formEl = document.getElementById("checkout-form");
    if (formEl) formEl.reset();
    
    tampilkanHalaman('home');
}

// ==========================================================================
// FUNGSI NAVIGASI ANTAR HALAMAN (HOME, KATALOG, CHECKOUT)
// ==========================================================================
function tampilkanHalaman(halaman) {
    const elHome = document.getElementById("page-home");
    const elKatalog = document.getElementById("page-katalog");
    const elCheckout = document.getElementById("page-checkout");

    if (elHome) elHome.classList.add("hidden");
    if (elKatalog) elKatalog.classList.add("hidden");
    if (elCheckout) elCheckout.classList.add("hidden");

    if (halaman === 'home') {
        if (elHome) elHome.classList.remove("hidden");
    } else if (halaman === 'katalog') {
        if (elKatalog) elKatalog.classList.remove("hidden");
    } else if (halaman === 'checkout') {
        if (elCheckout) elCheckout.classList.remove("hidden");
        perbaruiTampilanKeranjang();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function tampilkanSimulasiQRIS() {
    const elementMetode = document.getElementById("payment-method");
    const metode = elementMetode ? elementMetode.value : "";
    const qrisBox = document.getElementById("qris-container");
    
    if (!qrisBox) return;

    if (metode === "QRIS" || metode === "qris") {
        qrisBox.classList.remove("hidden");
    } else {
        qrisBox.classList.add("hidden");
    }
}

function cekMetodePengiriman() {
    const kurirEl = document.getElementById("shipping-method");
    const kurir = kurirEl ? kurirEl.value : "JNE";
    let biayaOngkir = 15000; 

    if (kurir === "JNT") {
        biayaOngkir = 18000;
    } else if (kurir === "GoSend") {
        biayaOngkir = 25000;
    }

    let subtotal = 0;
    if (typeof keranjangBelanja !== 'undefined' && keranjangBelanja.length > 0) {
        subtotal = keranjangBelanja.reduce((sum, item) => sum + (item.harga * item.jumlah), 0);
    }

    updateNotaCheckoutLengkap(subtotal, biayaOngkir);
}

function updateNotaCheckoutLengkap(subtotal, ongkir = 15000) {
    let nilaiDiskon = subtotal > 0 ? Math.round(subtotal * 0.10) : 0;
    let totalAkhir = (subtotal - nilaiDiskon) + ongkir;

    const subtotalEl = document.getElementById("summary-subtotal");
    const discountEl = document.getElementById("summary-discount");
    const shippingEl = document.getElementById("summary-shipping");
    const totalEl = document.getElementById("summary-total");

    if (subtotalEl) subtotalEl.innerText = `Rp ${subtotal.toLocaleString('id-ID')}`;
    if (discountEl) discountEl.innerText = `- Rp ${nilaiDiskon.toLocaleString('id-ID')}`;
    if (shippingEl) shippingEl.innerText = `Rp ${ongkir.toLocaleString('id-ID')}`;
    if (totalEl) totalEl.innerText = `Rp ${totalAkhir.toLocaleString('id-ID')}`;
}
