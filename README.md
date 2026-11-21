# Vids Buka HP

Aplikasi Android sederhana yang membuka Google Vids di browser eksternal dan memberi petunjuk mencoba opsi **Situs desktop**.

## Fitur dan batasan

- Membuka tautan Google Vids yang diberikan pengguna di browser default.
- Petunjuk berbahasa Indonesia untuk mengaktifkan **Situs desktop** di Chrome dan memuat ulang halaman.
- Peringatan bahwa APK tidak dapat mengubah dukungan atau pembatasan Google; Vids mungkin tetap meminta komputer atau tidak berfungsi penuh di HP.
- Login Google tetap dilakukan di browser biasa; aplikasi ini tidak menyematkan halaman login di WebView.

Aplikasi ini bukan produk resmi atau afiliasi Google.

## Build APK lewat GitHub Actions

Setiap push yang mengubah aplikasi pada branch `main` memicu workflow **Build Android APK**. Workflow menghasilkan **APK debug** yang dapat dipasang untuk pengujian. Setelah workflow selesai, buka **Actions → Build Android APK → run terbaru → Artifacts → `vids-buka-hp-debug-apk`** untuk mengunduhnya. Artifact disimpan selama 14 hari.

Build debug bukan APK rilis untuk Google Play. APK rilis memerlukan signing key/keystore dan konfigurasi signing yang aman.

## Menjalankan source

Proyek memakai Expo Router, React Native, dan TypeScript.

```sh
pnpm install
pnpm dev
```

Source mobile tetap memakai repo Manus sebagai repo kanonis; GitHub ini merupakan salinan source dengan workflow build.
