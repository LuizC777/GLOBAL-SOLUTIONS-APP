import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { cores } from "../constants/tema";

export default function CardIndicador({
  icone,
  rotulo,
  valor,
  unidade,
  emAlerta,
}) {
  return (
    <View style={[s.card, emAlerta && { borderColor: cores.critico }]}>
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
    </View>
  );
}

const s = StyleSheet.create({
  card: {
    flex: 1,
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
