import { ScrollView, View, Text, StyleSheet } from "react-native";
import { useMissao } from "../../context/MissaoContext";
import { cores } from "../../constants/tema";

function Mini({ rotulo, valor, unidade }) {
  return (
    <View style={s.mini}>
      <Text style={s.miniRot}>{rotulo}</Text>
      <Text style={s.miniVal}>
        {valor}
        <Text style={s.miniUni}> {unidade}</Text>
      </Text>
    </View>
  );
}

export default function VisaoGeral() {
  const { missao, dados, alertas } = useMissao();
  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundo }}
      contentContainerStyle={s.cont}
    >
      <View style={s.cardMissao}>
        <Text style={s.titulo}>{missao.nome}</Text>
        <Text style={s.sub}>
          {missao.status} · Dia {missao.diaMissao} · {missao.tripulacao}{" "}
          tripulantes
        </Text>
      </View>

      <Text style={s.secao}>Status</Text>
      <View
        style={[
          s.statusAlerta,
          { borderColor: alertas.length ? cores.critico : cores.ok },
        ]}
      >
        <Text
          style={{
            color: alertas.length ? cores.critico : cores.ok,
            fontWeight: "600",
          }}
        >
          {alertas.length
            ? `${alertas.length} alerta(s) ativo(s)`
            : "Todos os sistemas nominais"}
        </Text>
      </View>

      <Text style={s.secao}>Subsistemas</Text>
      <View style={s.grade}>
        <Mini
          rotulo="Temperatura"
          valor={Math.round(dados.temperatura)}
          unidade="°C"
        />
        <Mini rotulo="Bateria" valor={Math.round(dados.bateria)} unidade="%" />
        <Mini rotulo="Sinal" valor={Math.round(dados.sinal)} unidade="%" />
        <Mini rotulo="Radiação" valor={Math.round(dados.radiacao)} unidade="" />
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  cont: { padding: 16, gap: 8 },
  cardMissao: {
    backgroundColor: cores.superficie,
    borderRadius: 14,
    padding: 16,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  titulo: { color: cores.texto, fontSize: 22, fontWeight: "700" },
  sub: { color: cores.textoSec, marginTop: 4 },
  secao: {
    color: cores.textoSec,
    fontSize: 13,
    marginTop: 12,
    marginBottom: 4,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  statusAlerta: {
    backgroundColor: cores.superficie,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
  },
  grade: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  mini: {
    width: "47%",
    backgroundColor: cores.superficie,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: cores.borda,
  },
  miniRot: { color: cores.textoSec, fontSize: 12 },
  miniVal: {
    color: cores.texto,
    fontSize: 26,
    fontWeight: "700",
    marginTop: 4,
  },
  miniUni: { color: cores.textoSec, fontSize: 14, fontWeight: "400" },
});
