import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import WebView, { type WebViewNavigation } from "react-native-webview";

import type { VidsBrowserHandle, VidsBrowserProps } from "./vids-browser.types";

const GOOGLE_VIDS_URL = "https://docs.google.com/videos/u/0/mobilecreate?pli=1";
const GOOGLE_LOGIN_URL = `https://accounts.google.com/ServiceLogin?continue=${encodeURIComponent(GOOGLE_VIDS_URL)}`;
const GOOGLE_LOGOUT_URL = `https://accounts.google.com/Logout?continue=${encodeURIComponent(GOOGLE_VIDS_URL)}`;
const DESKTOP_USER_AGENT =
  "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/138.0.0.0 Safari/537.36";

const VidsBrowser = forwardRef<VidsBrowserHandle, VidsBrowserProps>(
  function VidsBrowser({ onStatusChange }, ref) {
    const webViewRef = useRef<WebView>(null);
    const [sourceUrl, setSourceUrl] = useState(GOOGLE_VIDS_URL);

    const openVids = useCallback(() => {
      if (sourceUrl === GOOGLE_VIDS_URL) {
        webViewRef.current?.reload();
        return;
      }
      setSourceUrl(GOOGLE_VIDS_URL);
    }, [sourceUrl]);

    useImperativeHandle(
      ref,
      () => ({
        login: () => setSourceUrl(GOOGLE_LOGIN_URL),
        openVids,
        logout: () => setSourceUrl(GOOGLE_LOGOUT_URL),
      }),
      [openVids],
    );

    const handleNavigationChange = useCallback(
      (navigationState: WebViewNavigation) => {
        if (navigationState.url.includes("accounts.google.com")) {
          onStatusChange(
            "Halaman akun Google terbuka; aplikasi tidak memeriksa status login.",
          );
        } else if (navigationState.url.includes("docs.google.com/videos")) {
          onStatusChange(
            "Google Vids terbuka di WebView; akses akun dikelola Google.",
          );
        }
      },
      [onStatusChange],
    );

    return (
      <View style={styles.container}>
        <WebView
          ref={webViewRef}
          source={{ uri: sourceUrl }}
          userAgent={DESKTOP_USER_AGENT}
          originWhitelist={["https://*"]}
          javaScriptEnabled
          domStorageEnabled
          sharedCookiesEnabled
          thirdPartyCookiesEnabled
          setSupportMultipleWindows={false}
          onLoadStart={() =>
            onStatusChange("Memuat halaman Google di WebView…")
          }
          onLoadEnd={() =>
            onStatusChange(
              "Halaman selesai dimuat; status akun dikelola Google.",
            )
          }
          onNavigationStateChange={handleNavigationChange}
          onError={() =>
            onStatusChange(
              "WebView gagal memuat halaman. Coba buka di browser HP biasa.",
            )
          }
          onHttpError={(event) =>
            onStatusChange(
              `Google merespons HTTP ${event.nativeEvent.statusCode}. Login mungkin dibatasi untuk WebView.`,
            )
          }
          renderToHardwareTextureAndroid
          allowsBackForwardNavigationGestures
          style={styles.webView}
        />
      </View>
    );
  },
);

export default VidsBrowser;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },
  webView: { flex: 1, backgroundColor: "#FFFFFF" },
});
