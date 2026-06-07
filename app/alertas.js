import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useMissao } from "../context/MissaoContext";
import { cores, severidadeCor } from "../constants/tema";

export default function Alertas() {
  const { alertas, historico } = useMissao();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundo }}
      contentContainerStyle={s.cont}
    >
      <Text style={s.secao}>Ativos</Text>
      {alertas.length === 0 && (
        <Text style={s.vazio}>Nenhum alerta ativo.</Text>
      )}
      {alertas.map((a) => (
        <View
          key={a.id}
          style={[s.card, { borderLeftColor: severidadeCor[a.severidade] }]}
        >
          <Text style={s.titulo}>{a.titulo}</Text>
          <Text style={s.msg}>{a.mensagem}</Text>
        </View>
      ))}

      <Text style={s.secao}>Histórico</Text>
      {historico.length === 0 && (
        <Text style={s.vazio}>Sem histórico ainda.</Text>
      )}
      {historico.map((a, i) => (
        <View
          key={i}
          style={[s.card, { borderLeftColor: severidadeCor[a.severidade] }]}
        >
          <Text style={s.titulo}>{a.titulo}</Text>
          <Text style={s.msg}>{a.mensagem}</Text>
          <Text style={s.hora}>{new Date(a.em).toLocaleTimeString()}</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  cont: { padding: 16, gap: 8 },
  secao: {
    color: cores.textoSec,
    fontSize: 13,
    marginTop: 12,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  vazio: { color: cores.textoSec, fontStyle: "italic" },
  card: {
    backgroundColor: cores.superficie,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: cores.borda,
    borderLeftWidth: 4,
  },
  titulo: { color: cores.texto, fontWeight: "700" },
  msg: { color: cores.textoSec, marginTop: 2 },
  hora: { color: cores.textoSec, fontSize: 11, marginTop: 6 },
});
