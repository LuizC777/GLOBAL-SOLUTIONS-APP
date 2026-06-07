import { View, Text, TextInput, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { cores } from "../constants/tema";

export default function CampoTexto({ rotulo, valor, aoMudar, erro, sufixo }) {
  return (
    <View>
      <Text style={s.rotulo}>{rotulo}</Text>
      <View style={[s.caixa, erro && { borderColor: cores.critico }]}>
        <TextInput
          style={s.input}
          value={valor}
          onChangeText={aoMudar}
          keyboardType="numbers-and-punctuation"
          placeholder="0"
          placeholderTextColor={cores.textoSec}
        />
        {sufixo ? <Text style={s.sufixo}>{sufixo}</Text> : null}
      </View>
      {erro ? (
        <Animated.Text entering={FadeIn.duration(250)} style={s.erro}>
          {erro}
        </Animated.Text>
      ) : null}
    </View>
  );
}

const s = StyleSheet.create({
  rotulo: { color: cores.textoSec, fontSize: 13, marginBottom: 6 },
  caixa: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: cores.superficie,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: cores.borda,
    paddingHorizontal: 14,
  },
  input: { flex: 1, color: cores.texto, fontSize: 16, paddingVertical: 12 },
  sufixo: { color: cores.textoSec, fontSize: 14, marginLeft: 6 },
  erro: { color: cores.critico, fontSize: 12, marginTop: 4 },
});
