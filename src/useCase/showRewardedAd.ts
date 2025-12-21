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

export function showRewardedAd(onFinish: () => void) {
  if (Platform.OS !== "android") {
    onFinish();
    return;
  }

  const rewardedAd = RewardedAd.createForAdRequest(adUnitId);

  const unsubscribeLoaded = rewardedAd.addAdEventListener(
    RewardedAdEventType.LOADED,
    () => {
      rewardedAd.show();
    }
  );

  const unsubscribeClosed = rewardedAd.addAdEventListener(
    AdEventType.CLOSED,
    () => {
      // 🔥 remove listeners
      unsubscribeLoaded();
      unsubscribeClosed();

      onFinish();
    }
  );

  rewardedAd.load();
}
