import { useState } from "react";
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

import { ScreenContainer } from "@/components/screen-container";

const GOOGLE_VIDS_URL = "https://docs.google.com/videos/u/0/mobilecreate?pli=1";

const steps = [
  { number: "01", title: "Buka menu browser", detail: "Di Chrome, ketuk ikon ⋮ di pojok kanan atas." },
  { number: "02", title: "Pilih Situs desktop", detail: "Aktifkan “Situs desktop” dari daftar menu." },
  { number: "03", title: "Muat ulang halaman", detail: "Jika belum berubah, refresh halaman Google Vids." },
];

export default function HomeScreen() {
  const [isOpening, setIsOpening] = useState(false);

  const openGoogleVids = async () => {
    if (isOpening) return;
    setIsOpening(true);
    try {
      await Linking.openURL(GOOGLE_VIDS_URL);
    } catch {
      Alert.alert(
        "Browser tidak dapat dibuka",
        "Pastikan ada browser seperti Chrome yang terpasang, lalu coba lagi.",
      );
    } finally {
      setIsOpening(false);
    }
  };

  return (
    <ScreenContainer
      containerClassName="bg-[#F4F1E8]"
      safeAreaClassName="bg-[#F4F1E8]"
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.brandRow}>
          <View style={styles.brandMark}>
            <Text style={styles.brandPlay}>▶</Text>
          </View>
          <View>
            <Text style={styles.brandName}>Vids Buka HP</Text>
            <Text style={styles.brandCaption}>PANDUAN AKSES</Text>
          </View>
        </View>

        <View style={styles.intro}>
          <Text style={styles.eyebrow}>GOOGLE VIDS · COBA DARI HP</Text>
          <Text style={styles.heading}>Coba buka{ "\n" }Vids di HP.</Text>
          <Text style={styles.introCopy}>
            Buka di browser, lalu coba tampilan desktop. Semoga cocok untuk perangkat Anda.
          </Text>
        </View>

        <View style={styles.launchCard}>
          <View style={styles.launchCardTop}>
            <View style={styles.liveDot} />
            <Text style={styles.launchOverline}>TAUTAN RESMI GOOGLE</Text>
          </View>
          <Text style={styles.launchTitle}>Mulai dari browser</Text>
          <Text style={styles.launchCopy}>
            Halaman dibuka di browser default agar login Google tetap memakai browser biasa. Google mungkin tetap meminta komputer.
          </Text>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Buka Google Vids di browser"
            onPress={openGoogleVids}
            disabled={isOpening}
            style={({ pressed }) => [
              styles.launchButton,
              pressed && styles.launchButtonPressed,
              isOpening && styles.launchButtonDisabled,
            ]}
          >
            <Text style={styles.launchButtonText}>
              {isOpening ? "Membuka browser…" : "Buka Google Vids"}
            </Text>
            <Text style={styles.launchArrow}>↗</Text>
          </Pressable>
          <Text style={styles.launchFootnote}>Akan berpindah ke aplikasi browser Anda</Text>
        </View>

        <View style={styles.sectionHeadingRow}>
          <Text style={styles.sectionHeading}>Coba tampilan desktop</Text>
          <Text style={styles.sectionHint}>DI CHROME</Text>
        </View>
        <View style={styles.stepsCard}>
          {steps.map((step, index) => (
            <View
              key={step.number}
              style={[styles.stepRow, index < steps.length - 1 && styles.stepDivider]}
            >
              <View style={styles.stepNumberBox}>
                <Text style={styles.stepNumber}>{step.number}</Text>
              </View>
              <View style={styles.stepTextGroup}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDetail}>{step.detail}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.notice}>
          <View style={styles.noticeIcon}>
            <Text style={styles.noticeIconText}>!</Text>
          </View>
          <View style={styles.noticeTextGroup}>
            <Text style={styles.noticeTitle}>Perlu diketahui</Text>
            <Text style={styles.noticeCopy}>
              APK ini hanya membuka tautan dan memberi petunjuk. Tampilan desktop tidak dapat melewati batasan Google; Vids mungkin tetap meminta komputer atau tidak berfungsi penuh di HP.
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>Aplikasi ini tidak berafiliasi dengan Google.</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 22,
    paddingTop: 14,
    paddingBottom: 32,
    gap: 22,
  },
  brandRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 11,
  },
  brandMark: {
    width: 42,
    height: 42,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#18324B",
  },
  brandPlay: {
    color: "#FF806F",
    fontSize: 16,
    marginLeft: 2,
  },
  brandName: {
    color: "#18324B",
    fontSize: 15,
    fontWeight: "800",
    letterSpacing: -0.2,
  },
  brandCaption: {
    marginTop: 2,
    color: "#77818A",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.35,
  },
  intro: {
    gap: 8,
    paddingTop: 7,
  },
  eyebrow: {
    color: "#D45E51",
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 1.6,
  },
  heading: {
    color: "#18324B",
    fontSize: 37,
    lineHeight: 42,
    fontWeight: "900",
    letterSpacing: -1.4,
  },
  introCopy: {
    maxWidth: 340,
    color: "#5F6C76",
    fontSize: 14,
    lineHeight: 21,
  },
  launchCard: {
    borderRadius: 24,
    backgroundColor: "#18324B",
    padding: 20,
    shadowColor: "#18324B",
    shadowOpacity: 0.13,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 3,
  },
  launchCardTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  liveDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: "#FF806F",
  },
  launchOverline: {
    color: "#B8C7D2",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.4,
  },
  launchTitle: {
    marginTop: 12,
    color: "#FFFFFF",
    fontSize: 21,
    fontWeight: "800",
    letterSpacing: -0.4,
  },
  launchCopy: {
    marginTop: 5,
    color: "#D2DBE2",
    fontSize: 12,
    lineHeight: 18,
  },
  launchButton: {
    minHeight: 52,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    marginTop: 17,
    borderRadius: 15,
    backgroundColor: "#FF806F",
  },
  launchButtonPressed: {
    opacity: 0.82,
    transform: [{ scale: 0.99 }],
  },
  launchButtonDisabled: {
    opacity: 0.65,
  },
  launchButtonText: {
    color: "#18324B",
    fontSize: 15,
    fontWeight: "800",
  },
  launchArrow: {
    color: "#18324B",
    fontSize: 20,
    fontWeight: "700",
    marginTop: -3,
  },
  launchFootnote: {
    marginTop: 9,
    color: "#B8C7D2",
    textAlign: "center",
    fontSize: 10,
  },
  sectionHeadingRow: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "space-between",
    marginBottom: -13,
  },
  sectionHeading: {
    color: "#18324B",
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: -0.25,
  },
  sectionHint: {
    color: "#89929A",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 1.25,
  },
  stepsCard: {
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E8E3D7",
  },
  stepRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 13,
    paddingVertical: 14,
  },
  stepDivider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E8E3D7",
  },
  stepNumberBox: {
    width: 34,
    height: 34,
    borderRadius: 12,
    backgroundColor: "#F4F1E8",
    alignItems: "center",
    justifyContent: "center",
  },
  stepNumber: {
    color: "#D45E51",
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 0.3,
  },
  stepTextGroup: {
    flex: 1,
    gap: 2,
  },
  stepTitle: {
    color: "#18324B",
    fontSize: 13,
    fontWeight: "800",
  },
  stepDetail: {
    color: "#68757F",
    fontSize: 11,
    lineHeight: 16,
  },
  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 15,
    borderRadius: 18,
    backgroundColor: "#FFF3E5",
    borderWidth: 1,
    borderColor: "#F2D8B6",
  },
  noticeIcon: {
    width: 23,
    height: 23,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F6D4A6",
  },
  noticeIconText: {
    color: "#80511C",
    fontSize: 14,
    fontWeight: "900",
  },
  noticeTextGroup: {
    flex: 1,
    gap: 3,
  },
  noticeTitle: {
    color: "#62431F",
    fontSize: 12,
    fontWeight: "900",
  },
  noticeCopy: {
    color: "#705A3D",
    fontSize: 11,
    lineHeight: 16,
  },
  footer: {
    color: "#8A928F",
    textAlign: "center",
    fontSize: 10,
    marginTop: -8,
  },
});
