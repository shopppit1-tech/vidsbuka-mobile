# Vids Buka HP

Aplikasi Android ringan untuk membuka Google Vids langsung di Chrome dan memilih tampilan Situs desktop. Aplikasi tidak memuat Google Vids dalam WebView tertanam. Halaman Vids hanya dimuat di Chrome setelah tombol ditekan, sehingga tidak menjadi konten WebView yang terus berjalan di dalam aplikasi.

## Cara menggunakan

1. Pasang APK dari halaman **Releases** di GitHub.
2. Tekan **Buka di Chrome**.
3. Di Chrome, tekan menu **⋮** lalu aktifkan **Situs desktop** agar mencoba tampilan seperti PC.

Login akun Google dilakukan langsung di Chrome. Google tetap menentukan akses akun dan fitur yang tersedia; Situs desktop tidak menjamin semua fitur Vids berfungsi penuh di HP.

## Kompatibilitas

APK rilis dioptimalkan untuk Android **ARM64 (64-bit)** agar ukuran unduhan lebih kecil. APK ini tidak cocok untuk perangkat Android 32-bit saja. Untuk berpindah dari v1.0.1, hapus versi lama sebelum memasang v1.0.2 karena build lama tidak menyertakan JavaScript bundle dan kunci debug antar-run dapat berbeda. Aplikasi tidak menyimpan sandi atau data login.

Aplikasi ini bukan produk resmi atau afiliasi Google dan tidak menyimpan sandi.

## Unduh dan build

Unduh APK mandiri langsung dari [GitHub Releases](https://github.com/shopppit1-tech/vidsbuka-mobile/releases). Artifact dari GitHub Actions tersedia sebagai ZIP yang perlu diekstrak sebelum memasang APK.

Push yang mengubah aplikasi pada branch `main` memicu workflow **Build Android APK**. Workflow membangun varian Gradle `release` agar JavaScript bundle disertakan dan memeriksa bundle sebelum mengunggah artifact. APK tersebut masih ditandatangani dengan kunci debug sementara, bukan signing key produksi Play Store.

## Menjalankan source

Proyek memakai Expo Router, React Native, dan TypeScript.

```sh
pnpm install
pnpm dev
```

Source mobile tetap memakai repo Manus sebagai repo kanonis; GitHub ini adalah salinan source dengan workflow build.
