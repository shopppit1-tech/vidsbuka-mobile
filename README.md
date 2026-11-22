# Vids Buka HP

Aplikasi Android ringan untuk membuka Google Vids langsung di Chrome dan memilih tampilan Situs desktop. Aplikasi tidak memuat Google Vids dalam WebView tertanam. Halaman Vids hanya dimuat di Chrome setelah tombol ditekan, sehingga tidak menjadi konten WebView yang terus berjalan di dalam aplikasi.

## Cara menggunakan

1. Pasang APK dari halaman **Releases** di GitHub.
2. Tekan **Buka di Chrome**.
3. Di Chrome, tekan menu **⋮** lalu aktifkan **Situs desktop** agar mencoba tampilan seperti PC.

Login akun Google dilakukan langsung di Chrome. Google tetap menentukan akses akun dan fitur yang tersedia; Situs desktop tidak menjamin semua fitur Vids berfungsi penuh di HP.

## Kompatibilitas

APK rilis dioptimalkan untuk Android **ARM64 (64-bit)** agar ukuran unduhan lebih kecil. APK ini tidak cocok untuk perangkat Android 32-bit saja. Jika Android menolak pembaruan APK debug karena tanda tangan berbeda, hapus versi debug lama terlebih dahulu lalu pasang APK baru.

Aplikasi ini bukan produk resmi atau afiliasi Google dan tidak menyimpan sandi.

## Unduh dan build

Unduh APK langsung dari [GitHub Releases](https://github.com/shopppit1-tech/vidsbuka-mobile/releases). Build dari tab GitHub Actions tersedia sebagai artifact ZIP yang perlu diekstrak sebelum memasang APK.

Push yang mengubah aplikasi pada branch `main` memicu workflow **Build Android APK**. APK debug hanya untuk pengujian; build Play Store bertanda tangan permanen memerlukan signing key/keystore yang aman.

## Menjalankan source

Proyek memakai Expo Router, React Native, dan TypeScript.

```sh
pnpm install
pnpm dev
```

Source mobile tetap memakai repo Manus sebagai repo kanonis; GitHub ini adalah salinan source dengan workflow build.
