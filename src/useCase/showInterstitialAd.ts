import { Platform } from "react-native";
import {
  InterstitialAd,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const interstitialAdUnitId = __DEV__
  ? TestIds.INTERSTITIAL
  : "ca-app-pub-3940256099942544/1033173712"; // Use TestIds em desenvolvimento
const interstitialAd = InterstitialAd.createForAdRequest(interstitialAdUnitId);






export async function showInterstitialAd(onFinish: () => void) {
  if (Platform.OS !== "android") {
    onFinish();
    return;
  }

  try {
    interstitialAd.addAdEventListener(AdEventType.LOADED, () => {
      interstitialAd.show();
    });

    interstitialAd.addAdEventListener(AdEventType.CLOSED, () => {
      onFinish();
    });

    interstitialAd.load();
  } catch (error) {
    console.log("Erro no anúncio intersticial:", error);
    onFinish();
  }
}
