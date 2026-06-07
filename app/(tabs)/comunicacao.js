import { ScrollView, View, StyleSheet } from "react-native";
import { useMissao } from "../../context/MissaoContext";
import { cores } from "../../constants/tema";
import CardIndicador from "../../components/CardIndicador";
import GraficoLinha from "../../components/GraficoLinha";

export default function Comunicacao() {
  const { dados, serie, alertas } = useMissao();
  const ehAlerta = (ids) => alertas.some((a) => ids.includes(a.id));
  const pontos = serie.map((l, i) => ({ i, valor: l.sinal }));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundo }}
      contentContainerStyle={s.cont}
    >
      <View style={s.linhaCards}>
        <CardIndicador
          icone="radio"
          rotulo="Sinal"
          valor={Math.round(dados.sinal)}
          unidade="%"
          emAlerta={ehAlerta(["sinal_fraco"])}
        />
        <CardIndicador
          icone="timer"
          rotulo="Latência"
          valor={Math.round(dados.latencia)}
          unidade="ms"
          emAlerta={false}
        />
        <CardIndicador
          icone="pulse"
          rotulo="Enlace"
          valor={Math.round(dados.enlace)}
          unidade="%"
          emAlerta={false}
        />
      </View>
      <GraficoLinha
        pontos={pontos}
        cor={cores.acento}
        titulo="Sinal (%) — tempo real"
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  cont: { padding: 16, gap: 12 },
  linhaCards: { flexDirection: "row", gap: 10 },
});
