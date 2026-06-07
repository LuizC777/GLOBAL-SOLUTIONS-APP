import { useEffect } from "react";
import { Pressable, Text, StyleSheet } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useMissao } from "../context/MissaoContext";
import { cores, severidadeCor } from "../constants/tema";

const ORDEM = { critico: 0, alerta: 1 };

export default function BannerAlerta() {
  const { alertas } = useMissao();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const pulso = useSharedValue(1);

  const ativo = alertas.length > 0;
  const principal = [...alertas].sort(
    (a, b) => ORDEM[a.severidade] - ORDEM[b.severidade],
  )[0];

  useEffect(() => {
    if (ativo) {
      pulso.value = withRepeat(withTiming(0.5, { duration: 700 }), -1, true);
    } else {
      cancelAnimation(pulso);
      pulso.value = 1;
    }
  }, [ativo]);

  const estiloPulso = useAnimatedStyle(() => ({ opacity: pulso.value }));

  if (!ativo) return null;

  const cor = severidadeCor[principal.severidade] || cores.alerta;

  return (
    <Pressable
      onPress={() => router.push("/alertas")}
      style={[
        styles.barra,
        { backgroundColor: cor, paddingTop: insets.top + 8 },
      ]}
    >
      <Animated.View style={estiloPulso}>
        <Ionicons name="warning" size={20} color="#1A1206" />
      </Animated.View>
      <Text style={styles.texto} numberOfLines={1}>
        {principal.titulo}: {principal.mensagem}
      </Text>
      <Ionicons name="chevron-forward" size={18} color="#1A1206" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  barra: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    paddingHorizontal: 14,
    paddingBottom: 10,
  },
  texto: { flex: 1, color: "#1A1206", fontWeight: "600", fontSize: 13 },
});
