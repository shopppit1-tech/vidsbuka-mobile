import { forwardRef, useImperativeHandle } from "react";
import { Linking, Pressable, StyleSheet, Text, View } from "react-native";

import type { VidsBrowserHandle, VidsBrowserProps } from "./vids-browser.types";

const GOOGLE_VIDS_URL = "https://docs.google.com/videos/u/0/mobilecreate?pli=1";
const GOOGLE_LOGIN_URL = `https://accounts.google.com/ServiceLogin?continue=${encodeURIComponent(GOOGLE_VIDS_URL)}`;

const VidsBrowser = forwardRef<VidsBrowserHandle, VidsBrowserProps>(
  function VidsBrowser({ onStatusChange }, ref) {
    const openGoogleVids = async () => {
      try {
        await Linking.openURL(GOOGLE_VIDS_URL);
        onStatusChange("Google Vids dibuka di browser default.");
      } catch {
        onStatusChange("Browser tidak dapat dibuka dari pratinjau ini.");
      }
    };

    useImperativeHandle(ref, () => ({
      login: () => {
        void Linking.openURL(GOOGLE_LOGIN_URL).catch(() =>
          onStatusChange(
            "Halaman login Google tidak dapat dibuka dari pratinjau ini.",
          ),
        );
      },
      openVids: () => {
        void openGoogleVids();
      },
      logout: () =>
        onStatusChange("Kontrol keluar sesi tersedia di APK Android WebView."),
    }));

    return (
      <View style={styles.container}>
        <Text style={styles.icon}>↗</Text>
        <Text style={styles.title}>WebView tersedia di APK Android</Text>
        <Text style={styles.body}>
          Pratinjau web tidak dapat menjalankan WebView native. Buat APK debug
          lewat GitHub Actions untuk mencoba tampilan Vids di dalam aplikasi.
        </Text>
        <Pressable
          onPress={openGoogleVids}
          accessibilityRole="button"
          style={styles.button}
        >
          <Text style={styles.buttonText}>Buka Google Vids di browser</Text>
        </Pressable>
      </View>
    );
  },
);

export default VidsBrowser;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
    backgroundColor: "#F2F5F5",
  },
  icon: { color: "#135A67", fontSize: 32, fontWeight: "800" },
  title: {
    color: "#18324B",
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
    marginTop: 12,
  },
  body: {
    color: "#5F6C76",
    fontSize: 13,
    lineHeight: 19,
    textAlign: "center",
    marginTop: 8,
  },
  button: {
    backgroundColor: "#18324B",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginTop: 16,
  },
  buttonText: { color: "#FFFFFF", fontSize: 13, fontWeight: "800" },
});
