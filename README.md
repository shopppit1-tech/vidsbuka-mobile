# Vids Buka HP

APK pendamping yang mencoba membuka Google Vids di dalam WebView Android dengan user-agent desktop.

## Fitur

- Halaman Vids ditampilkan di dalam aplikasi native Android.
- Tombol untuk membuka halaman login Google, kembali ke Vids/muat ulang, dan mencoba keluar dari sesi Google di WebView.
- Tombol fallback ke browser HP biasa bila login di WebView ditolak.
- Aplikasi tidak meminta atau menyimpan sandi, dan tidak memeriksa atau mengklaim status akun secara otomatis.

Google dapat membatasi login di browser tertanam, dan mode desktop tidak menjamin semua fitur Vids berjalan penuh di HP. Aplikasi ini bukan produk resmi atau afiliasi Google.

## Build APK lewat GitHub Actions

Push yang mengubah aplikasi pada branch `main` memicu workflow **Build Android APK**. Workflow menghasilkan APK debug untuk pengujian. Setelah workflow berhasil, buka **Actions → Build Android APK → run terbaru → Artifacts → `vids-buka-hp-debug-apk`**. Artifact disimpan selama 14 hari.

APK debug bukan APK rilis Play Store. Build rilis memerlukan signing key/keystore dan konfigurasi signing yang aman.

## Menjalankan source

Proyek memakai Expo Router, React Native, dan TypeScript.

```sh
pnpm install
pnpm dev
```

Source mobile tetap memakai repo Manus sebagai repo kanonis; GitHub ini adalah salinan source dengan workflow build.
