const readline = require("readline");
const fs = require("fs");

// ===== Data Produk =====
let produkToko = [
  { id: "P-001", nama: "Laptop", harga: 7000000, stok: 5 },
  { id: "P-002", nama: "Mouse", harga: 200000, stok: 10 },
  { id: "P-003", nama: "Keyboard", harga: 350000, stok: 7 },
  { id: "P-004", nama: "Monitor", harga: 2500000, stok: 4 },
  { id: "P-005", nama: "Headphone", harga: 500000, stok: 8 },
];

let keranjang = [];

// ===== Format Rupiah =====
const fmtRupiah = (n) => "Rp " + (Number(n) || 0).toLocaleString("id-ID");

// ===== Fungsi Helper =====
function generateIdProduk() {
  if (produkToko.length === 0) return "P-001";
  let maxId = Math.max(...produkToko.map(p => Number(p.id.split("-")[1])));
  return `P-${String(maxId + 1).padStart(3, "0")}`;
}

// ===== Fungsi Produk =====
function tampilkanProduk() {
  console.log("\n=== Daftar Produk Toko ===");
  console.table(produkToko.map(p => ({
    ID: p.id,
    Nama: p.nama,
    Harga: fmtRupiah(p.harga),
    Stok: p.stok
  })));
}

function tambahProduk(nama, harga, stok) {
  if (!nama || harga <= 0 || stok < 0) {
    console.log("❌ Nama, harga, atau stok tidak valid!");
    return;
  }
  const id = generateIdProduk();
  produkToko.push({ id, nama, harga, stok });
  console.log(`✅ Produk ${nama} berhasil ditambahkan dengan ID ${id}!`);
}

function hapusProduk(id) {
  const produk = produkToko.find(p => p.id === id);
  if (!produk) return console.log("❌ Produk tidak ditemukan!");
  produkToko = produkToko.filter(p => p.id !== id);
  console.log(`🗑 Produk ${produk.nama} berhasil dihapus!`);
}

function editProduk(id, namaBaru, hargaBaru, stokBaru) {
  const produk = produkToko.find(p => p.id === id);
  if (!produk) return console.log("❌ Produk tidak ditemukan!");
  if (namaBaru) produk.nama = namaBaru;
  if (hargaBaru !== undefined) produk.harga = hargaBaru;
  if (stokBaru !== undefined) produk.stok = stokBaru;
  console.log(`✏️ Produk ${id} berhasil diperbarui!`);
}

// ===== Fungsi Keranjang =====
function tambahKeKeranjang(id, jumlah) {
  const produk = produkToko.find(p => p.id === id);
  if (!produk) return console.log("❌ Produk tidak ditemukan!");
  if (jumlah <= 0) return console.log("❌ Jumlah beli harus > 0!");
  if (jumlah > produk.stok) return console.log("❌ Stok tidak cukup!");

  produk.stok -= jumlah;
  let item = keranjang.find(k => k.id === id);
  if (item) {
    item.jumlah += jumlah;
    item.total = item.jumlah * produk.harga;
  } else {
    keranjang.push({ ...produk, jumlah, total: jumlah * produk.harga });
  }
  console.log(`🛒 ${jumlah} ${produk.nama} berhasil ditambahkan ke keranjang!`);
}

function tampilkanKeranjang(diskonPersen = 0, bayar = 0) {
  if (keranjang.length === 0) {
    console.log("\n🛒 Keranjang kosong!");
    return { totalAkhir: 0, kembalian: 0 };
  }

  console.log("\n=== Keranjang Belanja ===");
  console.table(keranjang.map(k => ({
    Nama: k.nama,
    Harga: fmtRupiah(k.harga),
    Jumlah: k.jumlah,
    Total: fmtRupiah(k.total),
  })));

  let grandTotal = keranjang.reduce((sum, k) => sum + k.total, 0);
  let diskon = grandTotal * (diskonPersen / 100);
  let totalAkhir = grandTotal - diskon;
  let kembalian = bayar - totalAkhir;

  console.log(`Subtotal: ${fmtRupiah(grandTotal)}`);
  if (diskonPersen > 0) console.log(`Diskon ${diskonPersen}%: -${fmtRupiah(diskon)}`);
  console.log(`Total: ${fmtRupiah(totalAkhir)}`);
  if (bayar > 0) {
    console.log(`Bayar: ${fmtRupiah(bayar)}`);
    console.log(`Kembalian: ${fmtRupiah(kembalian)}`);
  }

  return { totalAkhir, kembalian };
}

// ===== Fungsi Cetak Struk =====
function cetakStruk(namaPelanggan, diskonPersen = 0, bayar = 0) {
  if (keranjang.length === 0) {
    console.log("❌ Keranjang kosong, tidak bisa cetak struk!");
    return;
  }

  let grandTotal = keranjang.reduce((sum, k) => sum + k.total, 0);
  let diskon = grandTotal * (diskonPersen / 100);
  let totalAkhir = grandTotal - diskon;
  let kembalian = bayar - totalAkhir;

  let isiStruk = `=== STRUK BELANJA TOKO ===
Pelanggan : ${namaPelanggan}
Tanggal   : ${new Date().toLocaleString("id-ID")}
------------------------------
`;

  keranjang.forEach(k => {
    isiStruk += `${k.nama} x${k.jumlah} @ ${fmtRupiah(k.harga)} = ${fmtRupiah(k.total)}\n`;
  });

  isiStruk += `------------------------------
Subtotal   : ${fmtRupiah(grandTotal)}
Diskon     : ${fmtRupiah(diskon)}
Total      : ${fmtRupiah(totalAkhir)}
Bayar      : ${fmtRupiah(bayar)}
Kembalian  : ${fmtRupiah(kembalian)}
==============================
`;

  fs.writeFileSync("struk-belanja.txt", isiStruk, "utf-8");
  console.log("🖨 Struk berhasil dicetak ke file struk-belanja.txt!");
  keranjang = []; // reset keranjang setelah cetak
}

// ===== CLI Menu =====
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

function menu() {
  console.log(`
=== MENU TOKO ===
1. Lihat Produk
2. Tambah Produk
3. Edit Produk
4. Hapus Produk
5. Tambah ke Keranjang
6. Lihat Keranjang
7. Cetak Struk (.txt)
0. Keluar
`);

  rl.question("Pilih menu: ", (pilih) => {
    switch (pilih) {
      case "1":
        tampilkanProduk();
        menu();
        break;
      case "2":
        rl.question("Nama Produk: ", (nama) => {
          rl.question("Harga: ", (harga) => {
            rl.question("Stok: ", (stok) => {
              tambahProduk(nama, Number(harga), Number(stok));
              menu();
            });
          });
        });
        break;
      case "3":
        rl.question("ID Produk yang mau diedit: ", (id) => {
          rl.question("Nama baru (kosong = tidak diubah): ", (nama) => {
            rl.question("Harga baru (kosong = tidak diubah): ", (harga) => {
              rl.question("Stok baru (kosong = tidak diubah): ", (stok) => {
                editProduk(
                  id,
                  nama || undefined,
                  harga ? Number(harga) : undefined,
                  stok ? Number(stok) : undefined
                );
                menu();
              });
            });
          });
        });
        break;
      case "4":
        rl.question("ID Produk yang mau dihapus: ", (id) => {
          hapusProduk(id);
          menu();
        });
        break;
      case "5":
        rl.question("ID Produk: ", (id) => {
          rl.question("Jumlah beli: ", (jumlah) => {
            tambahKeKeranjang(id, Number(jumlah));
            menu();
          });
        });
        break;
      case "6":
        rl.question("Diskon (%): ", (diskon) => {
          rl.question("Jumlah bayar: ", (bayar) => {
            tampilkanKeranjang(Number(diskon), Number(bayar));
            menu();
          });
        });
        break;
      case "7":
        rl.question("Nama pelanggan: ", (nama) => {
          rl.question("Diskon (%): ", (diskon) => {
            rl.question("Jumlah bayar: ", (bayar) => {
              cetakStruk(nama, Number(diskon), Number(bayar));
              menu();
            });
          });
        });
        break;
      case "0":
        console.log("👋 Terima kasih sudah menggunakan aplikasi toko!");
        rl.close();
        break;
      default:
        console.log("❌ Pilihan tidak valid!");
        menu();
    }
  });
}

// Jalankan aplikasi
menu();
