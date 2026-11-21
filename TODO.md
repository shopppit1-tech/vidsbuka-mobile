# TODO

- [x] **Menampilkan Google Vids di dalam APK.** Di Android native, tautan `https://docs.google.com/videos/u/0/mobilecreate?pli=1` dimuat di WebView dengan user-agent desktop; tersedia kontrol login, cek/muat ulang, keluar sesi WebView, dan sembunyikan/tampilkan WebView. Aplikasi tidak menyimpan sandi atau mengklaim status akun terverifikasi.
- [x] **Menyediakan fallback browser eksternal.** Bila Google membatasi login di WebView, aplikasi memberi tahu pengguna dan menyediakan tombol membuka tautan yang sama di browser HP biasa.
- [x] **Menjelaskan batasan Google.** Aplikasi menyebut bahwa user-agent desktop tidak menjamin semua fitur Google Vids berjalan di HP dan Google dapat menolak login dari WebView.
- [x] **Menyimpan source di repo GitHub privat.** Source aplikasi tersimpan sebagai salinan privat di GitHub; repo Manus tetap kanonis untuk proyek mobile.
- [ ] **Membangun APK debug lewat GitHub Actions.** Workflow harus menghasilkan APK debug yang bisa dipasang dan mengunggahnya sebagai artifact unduhan; tandai selesai hanya setelah workflow berhasil dan artifact tersedia.
