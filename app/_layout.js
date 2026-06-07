import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Stack } from "expo-router";
import { MissaoProvider } from "../context/MissaoContext";
import BannerAlerta from "../components/BannerAlerta";
import { cores } from "../constants/tema";

export default function LayoutRaiz() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <MissaoProvider>
          <StatusBar style="light" />
          <View style={{ flex: 1, backgroundColor: cores.fundo }}>
            <BannerAlerta />
            <Stack
              screenOptions={{
                headerStyle: { backgroundColor: cores.superficie },
                headerTintColor: cores.texto,
                contentStyle: { backgroundColor: cores.fundo },
              }}
            >
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="alertas" options={{ title: "Alertas" }} />
            </Stack>
          </View>
        </MissaoProvider>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}
