// datapegawai-node.js (versi CLI Node.js)

// Data pegawai awal
let pegawai = [
  { id: 1, nama: "Dodi Prayodi", jabatan: "Manajer", status: "menikah", gapok: 15000000 }
];

// Fungsi hitung total gaji
function hitungTotal(p) {
  const tj = (15 / 100) * p.gapok;
  const bpjs = (10 / 100) * p.gapok;
  const tunjkel = (p.status === "menikah") ? (20 / 100) * p.gapok : 0;
  return p.gapok + tj + bpjs + tunjkel;
}

// Tambah pegawai
function tambahPegawai(nama, jabatan, status, gapok) {
  const id = Date.now();
  const baru = { id, nama, jabatan, status, gapok };
  pegawai.push(baru);
  console.log(`✅ Pegawai ${nama} berhasil ditambahkan.`);
}

// Hapus pegawai
function hapusPegawai(id) {
  pegawai = pegawai.filter(p => p.id !== id);
  console.log(`🗑️ Pegawai dengan ID ${id} dihapus.`);
}

// Tampilkan data pegawai
function tampilkanPegawai() {
  console.log("\n📋 DATA PEGAWAI:");
  pegawai.forEach(p => {
    console.log(`${p.id} | ${p.nama} | ${p.jabatan} | ${p.status} | Gaji Total: Rp ${hitungTotal(p).toLocaleString("id-ID")}`);
  });
}

// === Contoh penggunaan ===
tampilkanPegawai();
tambahPegawai("Budi Santoso", "Staff", "belum menikah", 5000000);
tampilkanPegawai();
hapusPegawai(1);
tampilkanPegawai();
