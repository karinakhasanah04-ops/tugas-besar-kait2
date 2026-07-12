// Mengambil data dari localStorage atau fallback ke databaseProduk/default bawaan
let dataKatalogAdmin = JSON.parse(localStorage.getItem("katalogProduk")) || (typeof defaultDatabaseProduk !== 'undefined' ? defaultDatabaseProduk : (typeof databaseProduk !== 'undefined' ? databaseProduk : []));

function simpanKeLocalStorage() {
    localStorage.setItem("katalogProduk", JSON.stringify(dataKatalogAdmin));
}

function renderTabelAdmin() {
    const tbody = document.getElementById("admin-table-body");
    if (!tbody) return;
    
    tbody.innerHTML = "";
    
    if (dataKatalogAdmin.length === 0) {
        tbody.innerHTML = `<tr><td colspan="8" style="text-align: center; color: var(--text-muted);">Belum ada data produk.</td></tr>`;
        return;
    }

    dataKatalogAdmin.forEach((item, index) => {
        tbody.innerHTML += `
            <tr>
                <td>${index + 1}</td>
                <td><strong>${item.nama}</strong><br><small style="color: var(--text-muted);">${item.deskripsi ? item.deskripsi.substring(0, 45) + '...' : ''}</small></td>
                <td>${item.kategori}</td>
                <td>
                    <input type="number" class="admin-input-edit" value="${item.harga}" 
                        onchange="updateHargaProduk(${item.id}, this.value)">
                </td>
                <td>
                    <input type="number" class="admin-input-edit" value="${item.stok !== undefined ? item.stok : 20}" 
                        onchange="updateStokProduk(${item.id}, this.value)">
                </td>
                <td>${item.terjual || 0} pcs</td>
                <td>&#9733; ${item.rating || 5.0}</td>
                <td>
                    <button class="btn-danger" onclick="hapusProduk(${item.id})">Hapus</button>
                </td>
            </tr>
        `;
    });
}

function updateHargaProduk(id, hargaBaru) {
    const produk = dataKatalogAdmin.find(p => p.id === id);
    if (produk) {
        produk.harga = parseInt(hargaBaru) || 0;
        simpanKeLocalStorage();
    }
}

function updateStokProduk(id, stokBaru) {
    const produk = dataKatalogAdmin.find(p => p.id === id);
    if (produk) {
        produk.stok = parseInt(stokBaru) || 0;
        simpanKeLocalStorage();
    }
}

function tambahProdukBaru(event) {
    event.preventDefault();
    
    const nama = document.getElementById("add-nama").value;
    const kategori = document.getElementById("add-kategori").value;
    const harga = parseInt(document.getElementById("add-harga").value) || 0;
    const stok = parseInt(document.getElementById("add-stok").value) || 0;
    const gambar = document.getElementById("add-gambar").value;
    const deskripsi = document.getElementById("add-deskripsi") ? document.getElementById("add-deskripsi").value : "Deskripsi produk baru yang ditambahkan melalui panel administrasi.";
    
    // Buat ID baru unik
    const newId = dataKatalogAdmin.length > 0 ? Math.max(...dataKatalogAdmin.map(p => p.id)) + 1 : 1;
    
    const produkBaru = {
        id: newId,
        nama: nama,
        kategori: kategori,
        harga: harga,
        deskripsi: deskripsi,
        gambar: gambar,
        rating: 5.0,
        terjual: 0,
        stok: stok
    };
    
    dataKatalogAdmin.push(produkBaru);
    simpanKeLocalStorage();
    renderTabelAdmin();
    
    // Reset form
    document.getElementById("form-tambah-produk").reset();
    alert("Produk berhasil ditambahkan!");
}

function hapusProduk(id) {
    if (confirm("Apakah kamu yakin ingin menghapus produk ini?")) {
        dataKatalogAdmin = dataKatalogAdmin.filter(p => p.id !== id);
        simpanKeLocalStorage();
        renderTabelAdmin();
    }
}

// Jalankan render saat halaman admin dimuat
document.addEventListener("DOMContentLoaded", () => {
    renderTabelAdmin();
});