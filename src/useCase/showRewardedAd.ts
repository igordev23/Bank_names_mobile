import { Platform } from "react-native";
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";

const adUnitId = __DEV__ ? TestIds.REWARDED : "ca-app-pub-3940256099942544/5224354917"; // Use TestIds em desenvolvimento
const rewardedAd = RewardedAd.createForAdRequest(adUnitId);

export async function showRewardedAd(onFinish: () => void) {
  if (Platform.OS !== "android") {
    onFinish();
    return;
  }

  try {
    rewardedAd.addAdEventListener(RewardedAdEventType.LOADED, () => {
      rewardedAd.show();
    });

    rewardedAd.addAdEventListener(RewardedAdEventType.EARNED_REWARD, (reward) => {
      console.log("Usuário ganhou recompensa:", reward);
    });

    rewardedAd.addAdEventListener(AdEventType.CLOSED, () => {
      onFinish();
    });

    rewardedAd.load();
  } catch (error) {
    console.log("Erro no anúncio premiado:", error);
    onFinish();
  }
}
