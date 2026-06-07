import { ScrollView, View, StyleSheet } from "react-native";
import { useMissao } from "../../context/MissaoContext";
import { cores } from "../../constants/tema";
import CardIndicador from "../../components/CardIndicador";
import GraficoLinha from "../../components/GraficoLinha";

export default function Energia() {
  const { dados, serie, alertas } = useMissao();
  const ehAlerta = (ids) => alertas.some((a) => ids.includes(a.id));
  const pontos = serie.map((l, i) => ({ i, valor: l.bateria }));

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundo }}
      contentContainerStyle={s.cont}
    >
      <View style={s.linhaCards}>
        <CardIndicador
          icone="battery-charging"
          rotulo="Bateria"
          valor={Math.round(dados.bateria)}
          unidade="%"
          emAlerta={ehAlerta(["bateria_baixa"])}
        />
        <CardIndicador
          icone="sunny"
          rotulo="Geração solar"
          valor={Math.round(dados.geracaoSolar)}
          unidade="%"
          emAlerta={false}
        />
        <CardIndicador
          icone="flash"
          rotulo="Consumo"
          valor={Math.round(dados.consumo)}
          unidade="%"
          emAlerta={false}
        />
      </View>
      <GraficoLinha
        pontos={pontos}
        cor={cores.ok}
        titulo="Bateria (%) — tempo real"
      />
    </ScrollView>
  );
}

const s = StyleSheet.create({
  cont: { padding: 16, gap: 12 },
  linhaCards: { flexDirection: "row", gap: 10 },
});
