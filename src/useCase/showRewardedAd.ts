import { Platform } from "react-native";
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__
  ? TestIds.REWARDED
  : "ca-app-pub-4256068454909415/9802205490";

// 🔥 CONTROLE DE SESSÃO
let adAlreadyShown = false;
let rewardedAd: RewardedAd | null = null;

export function showRewardedAd(onFinish: () => void) {
  // Se não for Android, pula anúncio
  if (Platform.OS !== "android") {
    onFinish();
    return;
  }

  // 🔥 Se já mostrou o anúncio nessa sessão
  if (adAlreadyShown) {
    onFinish();
    return;
  }

  // Cria o anúncio apenas uma vez
  if (!rewardedAd) {
    rewardedAd = RewardedAd.createForAdRequest(adUnitId);
  }

  const unsubscribeLoaded = rewardedAd.addAdEventListener(
    RewardedAdEventType.LOADED,
    () => {
      rewardedAd?.show();
    }
  );

  const unsubscribeClosed = rewardedAd.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      adAlreadyShown = true; // 🔥 marca como já exibido

      unsubscribeLoaded();
      unsubscribeClosed();

      onFinish();
    }
  );

  rewardedAd.load();
}
