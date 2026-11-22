import { useState } from "react";
import {
  Linking,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as IntentLauncher from "expo-intent-launcher";
import * as WebBrowser from "expo-web-browser";

import { ScreenContainer } from "@/components/screen-container";

const GOOGLE_VIDS_URL = "https://docs.google.com/videos/u/0/mobilecreate?pli=1";

export default function HomeScreen() {
  const [status, setStatus] = useState(
    "Siap membuka Google Vids di browser Chrome.",
  );

  const openGoogleVids = async () => {
    setStatus(
      "Membuka Google Vids. Untuk tampilan PC, pilih menu ⋮ Chrome lalu Situs desktop.",
    );

    if (Platform.OS === "android") {
      try {
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: GOOGLE_VIDS_URL,
          packageName: "com.android.chrome",
        });
        return;
      } catch {
        // Chrome is not installed; fall back to the default browser.
      }
    }

    try {
      await WebBrowser.openBrowserAsync(GOOGLE_VIDS_URL, { showTitle: true });
    } catch {
      try {
        await Linking.openURL(GOOGLE_VIDS_URL);
      } catch {
        setStatus("Chrome atau browser lain tidak dapat dibuka di perangkat ini.");
      }
    }
  };

  return (
    <ScreenContainer
      containerClassName="bg-[#06131E]"
      safeAreaClassName="bg-[#06131E]"
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.brandMark}>
            <Text style={styles.brandPlay}>▶</Text>
          </View>
          <View style={styles.brandText}>
            <Text style={styles.brandName}>Vids Buka HP</Text>
            <Text style={styles.brandCaption}>GOOGLE VIDS • MODE DESKTOP</Text>
          </View>
        </View>

        <View style={styles.heroCard}>
          <View style={styles.chromeBadge}>
            <Text style={styles.chromeBadgeText}>CHROME</Text>
          </View>
          <Text style={styles.title}>Buka Google Vids</Text>
          <Text style={styles.description}>
            Login dibuka di aplikasi Chrome asli, bukan WebView di dalam APK.
            Ini menghindari pembatasan login Google pada browser tertanam.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Buka Google Vids di Chrome"
            onPress={() => void openGoogleVids()}
            style={({ pressed }) => [styles.openButton, pressed && styles.pressed]}
          >
            <Text style={styles.openButtonIcon}>↗</Text>
            <Text style={styles.openButtonText}>Buka di Chrome</Text>
          </Pressable>
          <Text style={styles.status}>{status}</Text>
        </View>

        <View style={styles.stepsCard}>
          <Text style={styles.stepsTitle}>Agar tampil seperti PC</Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>1</Text> Tekan “Buka di Chrome”.
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>2</Text> Di Chrome, tekan menu ⋮.
          </Text>
          <Text style={styles.step}>
            <Text style={styles.stepNumber}>3</Text> Aktifkan “Situs desktop”.
          </Text>
          <Text style={styles.smallNote}>
            Situs desktop tidak menjamin semua fitur Vids tersedia di HP.
          </Text>
        </View>

        <Text style={styles.footer}>
          Aplikasi ini tidak menyimpan sandi dan bukan produk resmi Google.
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: { flexGrow: 1, padding: 18, paddingTop: 20, paddingBottom: 28, gap: 18 },
  header: { flexDirection: "row", alignItems: "center", gap: 12 },
  brandMark: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#102B3B",
    borderWidth: 1,
    borderColor: "#20475A",
    alignItems: "center",
    justifyContent: "center",
  },
  brandPlay: { color: "#1CE0B0", fontSize: 15, marginLeft: 2 },
  brandText: { gap: 3 },
  brandName: { color: "#F2F7F9", fontSize: 16, fontWeight: "800" },
  brandCaption: { color: "#7D99A9", fontSize: 9, fontWeight: "800", letterSpacing: 1 },
  heroCard: {
    borderRadius: 22,
    padding: 20,
    backgroundColor: "#0B1C29",
    borderWidth: 1,
    borderColor: "#203847",
    gap: 12,
  },
  chromeBadge: {
    alignSelf: "flex-start",
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#117F73",
    backgroundColor: "#0B302F",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  chromeBadgeText: { color: "#39D4B0", fontSize: 9, fontWeight: "900", letterSpacing: 1 },
  title: { color: "#F2F7F9", fontSize: 24, fontWeight: "900", marginTop: 3 },
  description: { color: "#A4B7C0", fontSize: 13, lineHeight: 20 },
  openButton: {
    minHeight: 54,
    borderRadius: 15,
    backgroundColor: "#0F806E",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
    marginTop: 5,
  },
  openButtonIcon: { color: "#FFFFFF", fontSize: 19, fontWeight: "800" },
  openButtonText: { color: "#FFFFFF", fontSize: 15, fontWeight: "900" },
  pressed: { opacity: 0.72 },
  status: { color: "#8FA3AF", fontSize: 11, lineHeight: 16 },
  stepsCard: {
    borderRadius: 18,
    padding: 18,
    backgroundColor: "#102330",
    borderWidth: 1,
    borderColor: "#294656",
    gap: 12,
  },
  stepsTitle: { color: "#E5EFF2", fontSize: 15, fontWeight: "800" },
  step: { color: "#C5D2D8", fontSize: 13, lineHeight: 19 },
  stepNumber: { color: "#39D4B0", fontWeight: "900" },
  smallNote: { color: "#8FA3AF", fontSize: 11, lineHeight: 16, marginTop: 1 },
  footer: { color: "#718692", fontSize: 10, lineHeight: 15, textAlign: "center", marginTop: "auto" },
});
