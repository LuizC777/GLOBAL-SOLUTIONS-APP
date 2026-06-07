import { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Animated, {
  FadeInDown,
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "../constants/tema";

export default function CardIndicador({
  icone,
  rotulo,
  valor,
  unidade,
  emAlerta,
  indice = 0,
}) {
  const pulso = useSharedValue(0);

  useEffect(() => {
    if (emAlerta) {
      pulso.value = withRepeat(withTiming(1, { duration: 700 }), -1, true);
    } else {
      cancelAnimation(pulso);
      pulso.value = withTiming(0, { duration: 200 });
    }
  }, [emAlerta]);

  const estiloPulso = useAnimatedStyle(() => ({
    transform: [{ scale: 1 + pulso.value * 0.04 }],
  }));

  return (
    <Animated.View
      entering={FadeInDown.delay(indice * 120).duration(450)}
      style={s.wrapper}
    >
      <Animated.View
        style={[
          s.card,
          emAlerta && { borderColor: cores.critico },
          estiloPulso,
        ]}
      >
        <View style={s.topo}>
          <Ionicons
            name={icone}
            size={18}
            color={emAlerta ? cores.critico : cores.acento}
          />
          <Text style={s.rotulo}>{rotulo}</Text>
        </View>
        <Text
          style={[s.valor, { color: emAlerta ? cores.critico : cores.texto }]}
        >
          {valor}
          <Text style={s.unidade}> {unidade}</Text>
        </Text>
      </Animated.View>
    </Animated.View>
  );
}

const s = StyleSheet.create({
  wrapper: { flex: 1 },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: 14,
    padding: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  topo: { flexDirection: "row", alignItems: "center", gap: 6 },
  rotulo: { color: cores.textoSec, fontSize: 12 },
  valor: { fontSize: 22, fontWeight: "700", marginTop: 8 },
  unidade: { fontSize: 13, fontWeight: "400", color: cores.textoSec },
});
