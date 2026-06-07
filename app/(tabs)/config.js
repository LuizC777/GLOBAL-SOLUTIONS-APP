import { useEffect, useState } from "react";
import Animated, { FadeIn } from "react-native-reanimated";
import { ScrollView, View, Text, Pressable, StyleSheet } from "react-native";
import { useMissao } from "../../context/MissaoContext";
import { cores } from "../../constants/tema";
import CampoTexto from "../../components/CampoTexto";

function paraTexto(l) {
  return {
    bateriaMin: String(l.bateriaMin),
    tempMax: String(l.tempMax),
    tempMin: String(l.tempMin),
    sinalMin: String(l.sinalMin),
    radiacaoMax: String(l.radiacaoMax),
  };
}

function validar(f) {
  const e = {};
  const num = (v) => (v.trim() === "" || isNaN(Number(v)) ? null : Number(v));
  const bat = num(f.bateriaMin);
  const tmax = num(f.tempMax);
  const tmin = num(f.tempMin);
  const sin = num(f.sinalMin);
  const rad = num(f.radiacaoMax);

  if (bat === null) e.bateriaMin = "Informe um número válido.";
  else if (bat < 0 || bat > 100) e.bateriaMin = "Deve ficar entre 0 e 100.";

  if (tmin === null) e.tempMin = "Informe um número válido.";
  if (tmax === null) e.tempMax = "Informe um número válido.";
  if (tmax !== null && tmin !== null && tmax <= tmin)
    e.tempMax = "A máxima deve ser maior que a mínima.";

  if (sin === null) e.sinalMin = "Informe um número válido.";
  else if (sin < 0 || sin > 100) e.sinalMin = "Deve ficar entre 0 e 100.";

  if (rad === null) e.radiacaoMax = "Informe um número válido.";
  else if (rad < 0 || rad > 100) e.radiacaoMax = "Deve ficar entre 0 e 100.";

  return e;
}

export default function Config() {
  const { limiares, carregado, setLimiares } = useMissao();
  const [form, setForm] = useState(paraTexto(limiares));
  const [erros, setErros] = useState({});
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    setForm(paraTexto(limiares));
  }, [carregado]);

  const set = (chave, v) => {
    setForm((f) => ({ ...f, [chave]: v }));
    setSalvo(false);
  };

  const salvar = async () => {
    const e = validar(form);
    setErros(e);
    if (Object.keys(e).length > 0) {
      setSalvo(false);
      return;
    }
    await setLimiares({
      bateriaMin: Number(form.bateriaMin),
      tempMax: Number(form.tempMax),
      tempMin: Number(form.tempMin),
      sinalMin: Number(form.sinalMin),
      radiacaoMax: Number(form.radiacaoMax),
    });
    setSalvo(true);
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: cores.fundo }}
      contentContainerStyle={s.cont}
    >
      <Text style={s.titulo}>Limiares de alerta</Text>
      <Text style={s.descricao}>
        Defina os valores que disparam cada alerta. As mudanças valem na hora e
        ficam salvas.
      </Text>

      <CampoTexto
        rotulo="Bateria mínima"
        valor={form.bateriaMin}
        aoMudar={(v) => set("bateriaMin", v)}
        erro={erros.bateriaMin}
        sufixo="%"
      />
      <CampoTexto
        rotulo="Temperatura máxima"
        valor={form.tempMax}
        aoMudar={(v) => set("tempMax", v)}
        erro={erros.tempMax}
        sufixo="°C"
      />
      <CampoTexto
        rotulo="Temperatura mínima"
        valor={form.tempMin}
        aoMudar={(v) => set("tempMin", v)}
        erro={erros.tempMin}
        sufixo="°C"
      />
      <CampoTexto
        rotulo="Sinal mínimo"
        valor={form.sinalMin}
        aoMudar={(v) => set("sinalMin", v)}
        erro={erros.sinalMin}
        sufixo="%"
      />
      <CampoTexto
        rotulo="Radiação máxima"
        valor={form.radiacaoMax}
        aoMudar={(v) => set("radiacaoMax", v)}
        erro={erros.radiacaoMax}
        sufixo=""
      />

      <Pressable style={s.botao} onPress={salvar}>
        <Text style={s.botaoTexto}>Salvar limiares</Text>
      </Pressable>

      {salvo && (
        <Animated.Text entering={FadeIn.duration(300)} style={s.sucesso}>
          ✓ Limiares salvos com sucesso.
        </Animated.Text>
      )}
    </ScrollView>
  );
}

const s = StyleSheet.create({
  cont: { padding: 16, gap: 12 },
  titulo: { color: cores.texto, fontSize: 20, fontWeight: "700" },
  descricao: { color: cores.textoSec, marginBottom: 4 },
  botao: {
    backgroundColor: cores.acento,
    borderRadius: 12,
    padding: 16,
    alignItems: "center",
    marginTop: 8,
  },
  botaoTexto: { color: "#06121F", fontWeight: "700", fontSize: 16 },
  sucesso: { color: cores.ok, textAlign: "center", fontWeight: "600" },
});
