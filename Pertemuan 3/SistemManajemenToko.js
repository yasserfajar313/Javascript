const fs = require("fs");

// Data produk awal
let produkToko = [
  { id: "P-001", nama: "Laptop", harga: 7000000, stok: 5 },
  { id: "P-002", nama: "Mouse", harga: 200000, stok: 10 },
  { id: "P-003", nama: "Keyboard", harga: 350000, stok: 7 },
];

let keranjang = [];

// Format Rupiah
const fmtRupiah = (n) => "Rp " + (Number(n) || 0).toLocaleString("id-ID");

// Tambah produk
function tambahProduk(id, nama, harga, stok) {
  if (produkToko.find((p) => p.id === id)) {
    console.log("❌ ID sudah ada!");
    return;
  }
  produkToko.push({ id, nama, harga, stok });
  console.log(`✅ Produk ${nama} berhasil ditambahkan!`);
}

// Edit produk
function editProduk(id, nama, harga, stok) {
  const produk = produkToko.find((p) => p.id === id);
  if (!produk) return console.log("❌ Produk tidak ditemukan.");
  if (nama) produk.nama = nama;
  if (harga) produk.harga = harga;
  if (stok !== undefined) produk.stok = stok;
  console.log(`✏️ Produk ${id} berhasil diperbarui!`);
}

// Hapus produk
function hapusProduk(id) {
  produkToko = produkToko.filter((p) => p.id !== id);
  console.log(`🗑️ Produk dengan ID ${id} dihapus.`);
}

// Tampilkan daftar produk
function tampilkanProduk() {
  console.log("\n📦 DAFTAR PRODUK:");
  produkToko.forEach((p) => {
    console.log(`${p.id} | ${p.nama} | ${fmtRupiah(p.harga)} | stok: ${p.stok}`);
  });
}

// Tambah ke keranjang
function tambahKeranjang(id, jumlah) {
  const produk = produkToko.find((p) => p.id === id);
  if (!produk) return console.log("❌ Produk tidak ditemukan.");
  if (jumlah > produk.stok) return console.log("❌ Stok tidak cukup.");
  produk.stok -= jumlah;
  let item = keranjang.find((k) => k.id === id);
  if (item) {
    item.jumlah += jumlah;
    item.total = item.jumlah * produk.harga;
  } else {
    keranjang.push({ ...produk, jumlah, total: jumlah * produk.harga });
  }
  console.log(`🛒 Ditambahkan ${jumlah} ${produk.nama} ke keranjang.`);
}

// Tampilkan isi keranjang & cetak struk
function tampilkanKeranjang(diskon = 0, bayar = 0, cetak = false) {
  let struk = "\n🛍️ KERANJANG BELANJA:\n";
  let grandTotal = 0;
  keranjang.forEach((k) => {
    struk += `${k.nama} x${k.jumlah} @ ${fmtRupiah(k.harga)} = ${fmtRupiah(k.total)}\n`;
    grandTotal += k.total;
  });
  struk += `Subtotal: ${fmtRupiah(grandTotal)}\n`;

  if (diskon > 0) {
    let potongan = grandTotal * (diskon / 100);
    grandTotal -= potongan;
    struk += `Diskon ${diskon}%: -${fmtRupiah(potongan)}\n`;
  }

  struk += `Total Bayar: ${fmtRupiah(grandTotal)}\n`;

  if (bayar > 0) {
    let kembalian = bayar - grandTotal;
    struk += `Bayar: ${fmtRupiah(bayar)} | Kembalian: ${fmtRupiah(kembalian)}\n`;
  }

  console.log(struk);

  if (cetak) {
    fs.writeFileSync("struk.txt", struk);
    console.log("🖨️ Struk berhasil dicetak ke file struk.txt");
  }
}

// === Contoh Penggunaan ===
tampilkanProduk();
tambahProduk("P-004", "Headset", 150000, 8);
tampilkanProduk();

editProduk("P-004", "Headset Gaming", 175000, 10);
tampilkanProduk();

tambahKeranjang("P-001", 1);
tambahKeranjang("P-002", 2);
tampilkanKeranjang(10, 8000000, true); // diskon 10%, bayar Rp 8 juta, cetak struk
