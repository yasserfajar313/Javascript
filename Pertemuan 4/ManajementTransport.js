// transportasi.js

// =================== Class ===================
class Kendaraan {
  constructor(tipe, plat) {
    this.tipe = tipe;
    this.plat = plat;
  }
  infoKendaraan() {
    return this.tipe;
  }
}

class Pelanggan {
  constructor(nama, nomorTelepon, kendaraanDisewa, tanggalPinjam, durasi, status = "Dipinjam") {
    this.nama = nama;
    this.nomorTelepon = nomorTelepon;
    this.kendaraanDisewa = kendaraanDisewa;
    this.tanggalPinjam = tanggalPinjam; // string tanggal
    this.durasi = durasi; // dalam hari
    this.status = status;

    const now = new Date();
    const batasDate = new Date(now);
    batasDate.setDate(batasDate.getDate() + parseInt(durasi));
    this.batasPinjam = batasDate.toISOString().slice(0, 16).replace("T", " ");
  }

  infoPelanggan() {
    return {
      nama: this.nama,
      telepon: this.nomorTelepon,
      kendaraan: this.kendaraanDisewa.infoKendaraan(),
      plat: this.kendaraanDisewa.plat,
      tanggal: this.tanggalPinjam,
      durasi: this.durasi,
      batas: this.batasPinjam,
      status: this.status,
    };
  }
}

class SistemManajemenTransportasi {
  constructor() {
    this.daftarPelanggan = [];
  }

  tambahPelanggan(p) {
    this.daftarPelanggan.push(p);
  }

  hapusPelanggan(i) {
    this.daftarPelanggan.splice(i, 1);
  }

  editPelanggan(i, p) {
    this.daftarPelanggan[i] = p;
  }

  tandaiSelesai(i) {
    this.daftarPelanggan[i].status = "Selesai";
  }

  getAll() {
    return this.daftarPelanggan;
  }

  render() {
    console.log("\n📋 DAFTAR PELANGGAN");
    this.daftarPelanggan.forEach((p, i) => {
      const info = p.infoPelanggan();
      console.log(
        `${i + 1}. ${info.nama} (${info.telepon}) | ${info.kendaraan} ${info.plat} | Durasi: ${info.durasi} hari | Status: ${info.status}`
      );
    });
  }
}

// =================== Simulasi Penggunaan ===================
const sistem = new SistemManajemenTransportasi();

const kendaraan1 = new Kendaraan("Mobil", "B 1234 CD");
const pelanggan1 = new Pelanggan("Dodi", "08123456789", kendaraan1, "2025-09-23", 3);

const kendaraan2 = new Kendaraan("Motor", "F 9876 XY");
const pelanggan2 = new Pelanggan("Ani", "08987654321", kendaraan2, "2025-09-23", 2);

sistem.tambahPelanggan(pelanggan1);
sistem.tambahPelanggan(pelanggan2);

sistem.render();

// Tandai selesai untuk pelanggan pertama
sistem.tandaiSelesai(0);

console.log("\n✅ Setelah update status:");
sistem.render();
