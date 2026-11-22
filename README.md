# Vids Buka HP

APK Android pendamping untuk membuka Google Vids di browser Chrome atau browser default, dengan pilihan Situs desktop untuk tampilan PC.

## Cara menggunakan

1. Pasang APK dari halaman **Releases** di GitHub.
2. Tekan **Login Chrome** atau **Buka Google Vids di Chrome**.
3. Di browser yang terbuka, tekan menu **⋮** lalu aktifkan **Situs desktop** bila ingin tampilan seperti PC.

Login akun Google dilakukan di browser asli, bukan di WebView tertanam, karena Google dapat membatasi login di browser tertanam. Google tetap menentukan akses akun dan fitur yang tersedia.

Jika Android menolak pembaruan APK debug karena tanda tangan berbeda, hapus versi debug lama terlebih dahulu lalu pasang APK baru.

## Batasan

Aplikasi ini bukan produk resmi atau afiliasi Google. Situs desktop tidak menjamin seluruh fitur Google Vids berjalan di HP.

## Mengunduh APK

Unduh APK langsung dari [GitHub Releases](https://github.com/shopppit1-tech/vidsbuka-mobile/releases). Build dari tab GitHub Actions tersedia sebagai artifact ZIP dan perlu diekstrak sebelum memasang file APK.

## Build APK lewat GitHub Actions

Push yang mengubah aplikasi pada branch `main` memicu workflow **Build Android APK**. Workflow menghasilkan APK debug untuk pengujian. Setelah workflow berhasil, buka **Actions → Build Android APK → run terbaru → Artifacts → `vids-buka-hp-debug-apk`**. Artifact disimpan selama 14 hari.

APK debug bukan APK rilis Play Store. Build rilis bertanda tangan permanen memerlukan signing key/keystore yang aman.

## Menjalankan source

Proyek memakai Expo Router, React Native, dan TypeScript.

```sh
pnpm install
pnpm dev
```

Source mobile tetap memakai repo Manus sebagai repo kanonis; GitHub ini adalah salinan source dengan workflow build.
