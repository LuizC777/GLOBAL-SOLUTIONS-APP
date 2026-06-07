import { View, Text, StyleSheet } from "react-native";
import { useMissao } from "../../context/MissaoContext";
import { cores } from "../../constants/tema";

export default function Config() {
  const { limiares } = useMissao();
  return (
    <View style={s.cont}>
      <Text style={s.titulo}>Limiares atuais</Text>
      {Object.entries(limiares).map(([k, v]) => (
        <View key={k} style={s.linha}>
          <Text style={s.rot}>{k}</Text>
          <Text style={s.val}>{v}</Text>
        </View>
      ))}
      <Text style={s.nota}>O formulário de edição entra na próxima etapa.</Text>
    </View>
  );
}

const s = StyleSheet.create({
  cont: { flex: 1, padding: 16, gap: 10, backgroundColor: cores.fundo },
  titulo: {
    color: cores.texto,
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 4,
  },
  linha: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: cores.superficie,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  rot: { color: cores.textoSec },
  val: { color: cores.texto, fontWeight: "700" },
  nota: { color: cores.textoSec, fontStyle: "italic", marginTop: 8 },
});
