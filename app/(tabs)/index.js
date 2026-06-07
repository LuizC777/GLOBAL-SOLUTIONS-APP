import { useEffect, useState } from "react";
import { ScrollView, View, Text, StyleSheet } from "react-native";
import Animated, { FadeInDown } from "react-native-reanimated";
import { Ionicons } from "@expo/vector-icons";
import { useMissao } from "../../context/MissaoContext";
import { cores } from "../../constants/tema";

const INICIO = Date.now();

function formatarTempo(ms) {
  const total = Math.floor(ms / 1000);
  const h = String(Math.floor(total / 3600)).padStart(2, "0");
  const m = String(Math.floor((total % 3600) / 60)).padStart(2, "0");
  const sec = String(total % 60).padStart(2, "0");
  return `${h}:${m}:${sec}`;
}

function Mini({ rotulo, valor, unidade, indice }) {
  return (
    <Animated.View
      entering={FadeInDown.delay(indice * 100).duration(400)}
      style={st.mini}
    >
      <Text style={st.miniRot}>{rotulo}</Text>
      <Text style={st.miniVal}>
        {valor}
        <Text style={st.miniUni}> {unidade}</Text>
      </Text>
    </Animated.View>
  );
}

export default function VisaoGeral() {
  const { missao, dados, alertas } = useMissao();
  const [agora, setAgora] = useState(Date.now());

  useEffect(() => {
    const id = setInterval(() => setAgora(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const temAlerta = alertas.length > 0;
  const corStatus = temAlerta ? cores.critico : cores.ok;

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundo }}
      contentContainerStyle={st.cont}
    >
      <View style={st.hero}>
        <View style={st.heroTopo}>
          <View style={st.heroIcone}>
            <Ionicons name="planet" size={26} color={cores.acento} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={st.heroNome}>{missao.nome}</Text>
            <Text style={st.heroSub}>
              Dia {missao.diaMissao} · {missao.tripulacao} tripulantes
            </Text>
          </View>
          <View
            style={[
              st.pilula,
              { backgroundColor: corStatus + "22", borderColor: corStatus },
            ]}
          >
            <View style={[st.ponto, { backgroundColor: corStatus }]} />
            <Text style={[st.pilulaTexto, { color: corStatus }]}>
              {temAlerta ? "Atenção" : missao.status}
            </Text>
          </View>
        </View>
        <View style={st.cronoLinha}>
          <Text style={st.cronoRot}>TEMPO DE MISSÃO</Text>
          <Text style={st.crono}>T+ {formatarTempo(agora - INICIO)}</Text>
        </View>
      </View>

      <View style={st.secaoLinha}>
        <View style={st.tracinho} />
        <Text style={st.secao}>Subsistemas</Text>
      </View>

      <View style={st.grade}>
        <Mini
          rotulo="Temperatura"
          valor={Math.round(dados.temperatura)}
          unidade="°C"
          indice={0}
        />
        <Mini
          rotulo="Bateria"
          valor={Math.round(dados.bateria)}
          unidade="%"
          indice={1}
        />
        <Mini
          rotulo="Sinal"
          valor={Math.round(dados.sinal)}
          unidade="%"
          indice={2}
        />
        <Mini
          rotulo="Radiação"
          valor={Math.round(dados.radiacao)}
          unidade=""
          indice={3}
        />
      </View>
    </ScrollView>
  );
}

const st = StyleSheet.create({
  cont: { padding: 16, gap: 14, flexGrow: 1 },
  hero: {
    backgroundColor: cores.superficie,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: cores.borda,
    shadowColor: cores.acento,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 3,
  },
  heroTopo: { flexDirection: "row", alignItems: "center", gap: 12 },
  heroIcone: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: cores.superficie2,
    alignItems: "center",
    justifyContent: "center",
  },
  heroNome: { color: cores.texto, fontSize: 22, fontWeight: "700" },
  heroSub: { color: cores.textoSec, marginTop: 2, fontSize: 13 },
  pilula: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderWidth: 1,
  },
  ponto: { width: 7, height: 7, borderRadius: 4 },
  pilulaTexto: { fontSize: 12, fontWeight: "700" },
  cronoLinha: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: cores.borda,
  },
  cronoRot: { color: cores.textoSec, fontSize: 11, letterSpacing: 1 },
  crono: {
    color: cores.acento,
    fontSize: 16,
    fontWeight: "700",
    fontVariant: ["tabular-nums"],
  },
  secaoLinha: { flexDirection: "row", alignItems: "center", gap: 8 },
  tracinho: {
    width: 3,
    height: 16,
    borderRadius: 2,
    backgroundColor: cores.acento,
  },
  secao: {
    color: cores.textoSec,
    fontSize: 13,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  grade: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  mini: {
    width: "47%",
    backgroundColor: cores.superficie,
    borderRadius: 14,
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
