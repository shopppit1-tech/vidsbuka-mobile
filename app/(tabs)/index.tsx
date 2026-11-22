import { useRef, useState } from "react";
import {
  Alert,
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
import VidsBrowser from "@/components/vids-browser";
import type { VidsBrowserHandle } from "@/components/vids-browser.types";

const GOOGLE_VIDS_URL = "https://docs.google.com/videos/u/0/mobilecreate?pli=1";

function ActionButton({
  label,
  icon,
  onPress,
  variant = "default",
}: {
  label: string;
  icon: string;
  onPress: () => void;
  variant?: "default" | "accent" | "danger";
}) {
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.actionButton,
        variant === "accent" && styles.actionButtonAccent,
        variant === "danger" && styles.actionButtonDanger,
        pressed && styles.actionButtonPressed,
      ]}
    >
      <Text style={styles.actionIcon}>{icon}</Text>
      <Text
        style={[
          styles.actionLabel,
          variant === "accent" && styles.actionLabelAccent,
        ]}
      >
        {label}
      </Text>
    </Pressable>
  );
}

export default function HomeScreen() {
  const browserRef = useRef<VidsBrowserHandle>(null);
  const [browserVisible, setBrowserVisible] = useState(true);
  const [browserStatus, setBrowserStatus] = useState(
    "Siap membuka Google Vids di dalam aplikasi",
  );

  const openExternalBrowser = async () => {
    setBrowserStatus(
      "Membuka Google Vids di Chrome. Pilih Situs desktop dari menu Chrome jika diperlukan.",
    );
    if (Platform.OS === "android") {
      try {
        await IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: GOOGLE_VIDS_URL,
          packageName: "com.android.chrome",
        });
        return;
      } catch {
        // Chrome is not installed or unavailable; use the system browser below.
      }
    }
    try {
      await WebBrowser.openBrowserAsync(GOOGLE_VIDS_URL, { showTitle: true });
    } catch {
      try {
        await Linking.openURL(GOOGLE_VIDS_URL);
      } catch {
        setBrowserStatus(
          "Browser tidak dapat dibuka. Pastikan Chrome atau browser lain terpasang, lalu coba lagi.",
        );
      }
    }
  };

  const openLogin = () => {
    void openExternalBrowser();
  };

  const checkVids = () => {
    browserRef.current?.openVids();
    setBrowserStatus(
      "Memuat ulang Google Vids. Status akun tetap ditentukan oleh halaman Google.",
    );
  };

  const performLogout = () => {
    browserRef.current?.logout();
  };

  const logOut = () => {
    const title = "Keluar dari sesi WebView?";
    const message =
      "Ini mencoba mengakhiri sesi Google di dalam WebView aplikasi ini. Sesi Google di Chrome dapat tetap terpisah.";
    if (Platform.OS === "web") {
      if (
        typeof window !== "undefined" &&
        window.confirm(`${title}\n\n${message}`)
      ) {
        performLogout();
      }
      return;
    }
    Alert.alert(title, message, [
      { text: "Batal", style: "cancel" },
      { text: "Keluar", style: "destructive", onPress: performLogout },
    ]);
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
          <View style={styles.brandGroup}>
            <View style={styles.brandMark}>
              <Text style={styles.brandPlay}>▶</Text>
            </View>
            <View>
              <Text style={styles.brandName}>Vids Buka HP</Text>
              <Text style={styles.brandCaption}>AKSES GOOGLE VIDS</Text>
            </View>
          </View>
          <View style={styles.freeBadge}>
            <Text style={styles.freeBadgeText}>WEBVIEW</Text>
          </View>
        </View>

        <View style={styles.sessionBar}>
          <View style={styles.sessionDot} />
          <Text style={styles.sessionText}>
            Sesi browser dalam aplikasi siap
          </Text>
        </View>

        <View style={styles.panel}>
          <View style={styles.panelHeader}>
            <View>
              <Text style={styles.panelTitle}>Akun Google</Text>
              <Text style={styles.panelSubTitle}>
                Login di WebView → sesi dan akun dikelola Google
              </Text>
            </View>
          </View>
          <View style={styles.actionRow}>
            <ActionButton
              label="Login Chrome"
              icon="↪"
              variant="accent"
              onPress={openLogin}
            />
            <ActionButton label="Cek" icon="⟳" onPress={checkVids} />
            <ActionButton
              label="Keluar"
              icon="↗"
              variant="danger"
              onPress={logOut}
            />
          </View>
          <View style={styles.statusLine}>
            <Text style={styles.statusLabel}>STATUS</Text>
            <Text style={styles.statusValue}>{browserStatus}</Text>
          </View>
        </View>

        <View style={styles.webViewHeader}>
          <Text style={styles.webViewTitle}>Tampilkan WebView</Text>
          <Pressable
            accessibilityRole="button"
            onPress={() => setBrowserVisible((value) => !value)}
            style={styles.visibilityButton}
          >
            <Text style={styles.visibilityIcon}>
              {browserVisible ? "◉" : "◎"}
            </Text>
            <Text style={styles.visibilityText}>
              {browserVisible ? "Sembunyikan" : "Tampilkan"}
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.browserFrame,
            !browserVisible && styles.browserFrameHidden,
          ]}
        >
          <VidsBrowser ref={browserRef} onStatusChange={setBrowserStatus} />
        </View>

        <View style={styles.noteCard}>
          <Text style={styles.noteTitle}>Buka melalui Chrome</Text>
          <Text style={styles.noteText}>
            Login Google di WebView tertanam dapat diblokir. Tombol ini membuka
            Google Vids di tab browser; dari menu ⋮ browser, aktifkan Situs
            desktop jika tampilan PC diperlukan. Google tetap menentukan akses
            akun dan fitur yang tersedia.
          </Text>
          <Pressable
            accessibilityRole="button"
            onPress={openExternalBrowser}
            style={({ pressed }) => [
              styles.externalButton,
              pressed && styles.actionButtonPressed,
            ]}
          >
            <Text style={styles.externalButtonText}>Buka Google Vids di Chrome ↗</Text>
          </Pressable>
        </View>

        <Text style={styles.footer}>
          Aplikasi ini bukan produk resmi Google. Aplikasi tidak menyimpan sandi
          atau memeriksa status akun secara otomatis.
        </Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 17,
    paddingTop: 12,
    paddingBottom: 28,
    gap: 15,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  brandGroup: { flexDirection: "row", alignItems: "center", gap: 11 },
  brandMark: {
    width: 43,
    height: 43,
    borderRadius: 14,
    backgroundColor: "#102B3B",
    borderWidth: 1,
    borderColor: "#20475A",
    alignItems: "center",
    justifyContent: "center",
  },
  brandPlay: { color: "#1CE0B0", fontSize: 15, marginLeft: 2 },
  brandName: {
    color: "#F2F7F9",
    fontSize: 16,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  brandCaption: {
    color: "#7D99A9",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.3,
    marginTop: 2,
  },
  freeBadge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: "#117F73",
    backgroundColor: "#0B302F",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  freeBadgeText: {
    color: "#39D4B0",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.1,
  },
  sessionBar: {
    minHeight: 42,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingHorizontal: 12,
    borderRadius: 13,
    backgroundColor: "#0B211F",
    borderWidth: 1,
    borderColor: "#153C37",
  },
  sessionDot: {
    width: 9,
    height: 9,
    borderRadius: 5,
    backgroundColor: "#24D6AA",
  },
  sessionText: { color: "#49D9B5", fontSize: 13, fontWeight: "700" },
  panel: {
    borderRadius: 21,
    padding: 16,
    backgroundColor: "#0B1C29",
    borderWidth: 1,
    borderColor: "#203847",
  },
  panelHeader: { flexDirection: "row", justifyContent: "space-between" },
  panelTitle: {
    color: "#F2F7F9",
    fontSize: 20,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  panelSubTitle: {
    color: "#8FA3AF",
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
  },
  actionRow: { flexDirection: "row", gap: 8, marginTop: 15 },
  actionButton: {
    flex: 1,
    minHeight: 49,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
    borderWidth: 1,
    borderColor: "#2A4555",
    backgroundColor: "#0E2230",
  },
  actionButtonAccent: { backgroundColor: "#103949", borderColor: "#155267" },
  actionButtonDanger: { borderColor: "#6E3B4C", backgroundColor: "#2A202A" },
  actionButtonPressed: { opacity: 0.7 },
  actionIcon: { color: "#A8BCC6", fontSize: 17, fontWeight: "700" },
  actionLabel: { color: "#C5D2D8", fontSize: 12, fontWeight: "800" },
  actionLabelAccent: { color: "#43D5B3" },
  statusLine: {
    borderTopWidth: 1,
    borderTopColor: "#203847",
    marginTop: 14,
    paddingTop: 11,
    gap: 4,
  },
  statusLabel: {
    color: "#638092",
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 1.4,
  },
  statusValue: { color: "#AFC1CA", fontSize: 11, lineHeight: 16 },
  webViewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 2,
  },
  webViewTitle: { color: "#D8E3E8", fontSize: 14, fontWeight: "800" },
  visibilityButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingVertical: 5,
    paddingLeft: 10,
  },
  visibilityIcon: { color: "#28D7B0", fontSize: 15 },
  visibilityText: { color: "#28D7B0", fontSize: 12, fontWeight: "800" },
  browserFrame: {
    height: 470,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#274352",
  },
  browserFrameHidden: { height: 1, opacity: 0 },
  noteCard: {
    borderRadius: 18,
    padding: 15,
    backgroundColor: "#102330",
    borderWidth: 1,
    borderColor: "#294656",
    gap: 8,
  },
  noteTitle: { color: "#E5EFF2", fontSize: 13, fontWeight: "800" },
  noteText: { color: "#A4B7C0", fontSize: 11, lineHeight: 17 },
  externalButton: {
    alignSelf: "flex-start",
    minHeight: 38,
    justifyContent: "center",
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: "#0F3740",
    borderWidth: 1,
    borderColor: "#1B6770",
    marginTop: 2,
  },
  externalButtonText: { color: "#61E1CB", fontSize: 11, fontWeight: "800" },
  footer: {
    color: "#718692",
    fontSize: 10,
    lineHeight: 15,
    textAlign: "center",
    paddingHorizontal: 8,
  },
});
