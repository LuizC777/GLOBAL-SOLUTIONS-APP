import { ScrollView, View, StyleSheet } from "react-native";
import { useMissao } from "../../context/MissaoContext";
import { cores } from "../../constants/tema";
import CardIndicador from "../../components/CardIndicador";
import GraficoLinha from "../../components/GraficoLinha";

export default function Telemetria() {
  const { dados, serie, alertas } = useMissao();
  const ehAlerta = (ids) => alertas.some((a) => ids.includes(a.id));
  const pontos = serie.map((l, i) => ({ i, valor: l.temperatura }));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundo }}
      contentContainerStyle={s.cont}
    >
      <View style={s.linhaCards}>
        <CardIndicador
          icone="thermometer"
          rotulo="Temperatura"
          valor={Math.round(dados.temperatura)}
          unidade="°C"
          emAlerta={ehAlerta(["temp_alta", "temp_baixa"])}
        />
        <CardIndicador
          icone="speedometer"
          rotulo="Pressão"
          valor={dados.pressao.toFixed(1)}
          unidade="kPa"
          emAlerta={false}
        />
        <CardIndicador
          icone="nuclear"
          rotulo="Radiação"
          valor={Math.round(dados.radiacao)}
          unidade=""
          emAlerta={ehAlerta(["radiacao_alta"])}
        />
      </View>
      <GraficoLinha
        pontos={pontos}
        cor={cores.acento}
        titulo="Temperatura (°C) — tempo real"
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  cont: { padding: 16, gap: 12 },
  linhaCards: { flexDirection: "row", gap: 10 },
});
