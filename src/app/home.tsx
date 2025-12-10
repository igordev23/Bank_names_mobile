import React, { useEffect, useState } from "react";
import { View, Text, Button, ActivityIndicator } from "react-native";
import {
  RewardedAd,
  RewardedAdEventType,
  AdEventType,
  TestIds,
} from "react-native-google-mobile-ads";
import { router } from "expo-router";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  // ID de teste
  const rewarded = RewardedAd.createForAdRequest(TestIds.REWARDED);

  useEffect(() => {
    // Quando carrega
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        console.log("Reward carregado");
        setLoaded(true);
      }
    );

    // Quando ganha recompensa
    const unsubscribeReward = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      (reward) => {
        console.log("Usuário ganhou recompensa:", reward);
        // Aqui você coloca o que vai liberar no app
      }
    );

    // Quando dá erro
    const unsubscribeError = rewarded.addAdEventListener(
      AdEventType.ERROR,
      (error) => {
        console.log("Erro no Reward:", error);
      }
    );

    // Quando fecha
    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        console.log("Reward fechado");
        setLoaded(false);
        rewarded.load();
      }
    );

    // Carrega o anúncio
    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeReward();
      unsubscribeError();
      unsubscribeClosed();
    };
  }, []);

  const showReward = () => {
    if (loaded) {
      rewarded.show();
    } else {
      console.log("Reward não carregado");
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 24, marginBottom: 20 }}>Tela Home</Text>

      {loaded ? (
        <Button title="Assistir anúncio e ganhar recompensa" onPress={showReward} />
      ) : (
        <View style={{ alignItems: "center" }}>
          <ActivityIndicator size="large" />
          <Text style={{ marginTop: 10 }}>Carregando anúncio...</Text>
        </View>
      )}

      <View style={{ marginTop: 40 }}>
        <Button
          title="Ir para /bottomNames"
          onPress={() => router.push("/bottomNames")}
        />
      </View>
    </View>
  );
}
