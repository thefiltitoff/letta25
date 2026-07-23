import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported, logEvent } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

let analyticsPromise = null;

export function initAnalytics() {
  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => {
        if (!supported) return null;
        const app = initializeApp(firebaseConfig);
        return getAnalytics(app);
      })
      .catch(() => null);
  }
  return analyticsPromise;
}

// Coarse device info from the UA string — browsers don't expose an exact
// device model (Client Hints only cover Android Chrome, nothing on iOS/Safari),
// so this sticks to what's reliably available everywhere.
function getDeviceInfo() {
  if (typeof navigator === "undefined") return {};
  const ua = navigator.userAgent || "";

  const isTablet = /iPad/i.test(ua) || (/Android/i.test(ua) && !/Mobile/i.test(ua));
  const isMobile = !isTablet && /Mobi|iPhone|iPod|Android/i.test(ua);
  const device_type = isTablet ? "tablet" : isMobile ? "mobile" : "desktop";

  const os = /iPhone|iPad|iPod/i.test(ua)
    ? "iOS"
    : /Android/i.test(ua)
    ? "Android"
    : /Windows/i.test(ua)
    ? "Windows"
    : /Mac OS X/i.test(ua)
    ? "macOS"
    : /Linux/i.test(ua)
    ? "Linux"
    : "unknown";

  const browser = /Edg\//i.test(ua)
    ? "Edge"
    : /OPR\//i.test(ua)
    ? "Opera"
    : /Chrome\//i.test(ua)
    ? "Chrome"
    : /Firefox\//i.test(ua)
    ? "Firefox"
    : /Safari\//i.test(ua)
    ? "Safari"
    : "unknown";

  const screen_size =
    typeof window !== "undefined" && window.screen
      ? `${window.screen.width}x${window.screen.height}`
      : "unknown";

  return { device_type, os, browser, screen_size };
}

export async function trackEvent(name, params) {
  const analytics = await initAnalytics();
  if (!analytics) return;
  // debug_mode is always on (not just in dev) so events show up in DebugView
  // on the deployed site too — this is a low-traffic personal page, not a
  // product with a real prod/dev analytics split to protect.
  const eventParams = { ...getDeviceInfo(), ...params, debug_mode: true };
  logEvent(analytics, name, eventParams);
}
