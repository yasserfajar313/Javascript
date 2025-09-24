// --- Fungsi Perhitungan ---
const luasPersegiPanjang = (p, l) => p * l;
const kelilingPersegiPanjang = (p, l) => 2 * (p + l);

const luasBujurSangkar = (s) => s * s;
const kelilingBujurSangkar = (s) => 4 * s;

const luasSegitiga = (a, t) => 0.5 * a * t;
const kelilingSegitiga = (a, b, c) => a + b + c;

// --- Nilai ---
const panjang = 10;
const lebar = 5;
const sisi = 7;
const alas = 8;
const tinggi = 6;
const sisiA = 5, sisiB = 7, sisiC = 9;

// --- Hasil Perhitungan ---
console.log("=== Persegi Panjang ===");
console.log(`Luas = ${panjang} × ${lebar} = ${luasPersegiPanjang(panjang, lebar)}`);
console.log(`Keliling = 2 × (${panjang} + ${lebar}) = ${kelilingPersegiPanjang(panjang, lebar)}`);

console.log("\n=== Bujur Sangkar ===");
console.log(`Luas = ${sisi} × ${sisi} = ${luasBujurSangkar(sisi)}`);
console.log(`Keliling = 4 × ${sisi} = ${kelilingBujurSangkar(sisi)}`);

console.log("\n=== Segitiga ===");
console.log(`Luas = 0.5 × ${alas} × ${tinggi} = ${luasSegitiga(alas, tinggi)}`);
console.log(`Keliling = ${sisiA} + ${sisiB} + ${sisiC} = ${kelilingSegitiga(sisiA, sisiB, sisiC)}`);
