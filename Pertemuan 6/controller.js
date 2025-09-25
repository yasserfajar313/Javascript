// controller.js
let data = require("./data");

// 🔹 1. Melihat data (pakae map)
console.log("=== Data Awal ===");
data.map((item, index) => {
  console.log(`${index + 1}. Nama: ${item.nama}, Umur: ${item.umur}, Alamat: ${item.alamat}, Email: ${item.email}`);
});

// 🔹 2. Menambah data (pakai push, minimal 2 data)
data.push(
  { nama: "Lina", umur: 23, alamat: "Depok", email: "lina@mail.com" },
  { nama: "Tono", umur: 24, alamat: "Cirebon", email: "tono@mail.com" }
);

console.log("\n=== Setelah Menambah Data ===");
data.map((item, index) => {
  console.log(`${index + 1}. Nama: ${item.nama}, Umur: ${item.umur}, Alamat: ${item.alamat}, Email: ${item.email}`);
});

// 🔹 3. Menghapus data ( hapus index ke-2 → data ketiga)
data.splice(2, 1);

console.log("\n=== Setelah Menghapus Data (index ke-2) ===");
data.map((item, index) => {
  console.log(`${index + 1}. Nama: ${item.nama}, Umur: ${item.umur}, Alamat: ${item.alamat}, Email: ${item.email}`);
});
