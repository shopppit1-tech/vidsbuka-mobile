# TODO

- [x] **Buka Google Vids di Chrome asli.** Pada Android, aplikasi menjalankan intent `ACTION_VIEW` langsung ke Chrome dan memakai browser default sebagai fallback jika Chrome tidak tersedia. Pengguna dapat mengaktifkan Situs desktop dari menu Chrome.
- [x] **Kurangi pemakaian RAM.** Hapus WebView tertanam dan jangan muat Google Vids sampai pengguna membuka Chrome.
- [x] **Kurangi ukuran APK.** Hapus dependensi langsung media, gambar, dan notifikasi yang tidak digunakan; bangun target ARM64 saja. Perangkat Android 32-bit saja tidak didukung.
- [x] **Jaga privasi akun.** Login tetap dilakukan di Chrome. Aplikasi tidak meminta atau menyimpan sandi dan bukan produk resmi Google.
- [ ] **Buat rilis APK debug v1.0.1.** Selesaikan tes, build Android nyata, verifikasi artifact, lalu lampirkan APK pada GitHub Release.
