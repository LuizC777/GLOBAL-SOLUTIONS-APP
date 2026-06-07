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
  progresso,
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

  const corBarra = emAlerta ? cores.critico : cores.acento;
  const largura =
    progresso != null ? `${Math.max(0, Math.min(1, progresso)) * 100}%` : null;

  return (
    <Animated.View
      entering={FadeInDown.delay(indice * 120).duration(450)}
      style={s.wrapper}
    >
      <Animated.View style={[s.card, emAlerta && s.cardAlerta, estiloPulso]}>
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
        {largura != null && (
          <View style={s.trilho}>
            <View
              style={[
                s.preenchimento,
                { width: largura, backgroundColor: corBarra },
              ]}
            />
          </View>
        )}
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
    shadowColor: cores.acento,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 2,
  },
  cardAlerta: {
    borderColor: cores.critico,
    shadowColor: cores.critico,
    shadowOpacity: 0.4,
  },
  topo: { flexDirection: "row", alignItems: "center", gap: 6 },
  rotulo: { color: cores.textoSec, fontSize: 12 },
  valor: { fontSize: 22, fontWeight: "700", marginTop: 8 },
  unidade: { fontSize: 13, fontWeight: "400", color: cores.textoSec },
  trilho: {
    height: 5,
    borderRadius: 3,
    backgroundColor: cores.superficie2,
    marginTop: 10,
    overflow: "hidden",
  },
  preenchimento: { height: "100%", borderRadius: 3 },
});
