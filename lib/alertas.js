export function avaliarAlertas(d, lim) {
  const out = [];
  if (d.bateria < lim.bateriaMin)
    out.push({
      id: "bateria_baixa",
      severidade: "critico",
      titulo: "Bateria baixa",
      mensagem: `Bateria em ${Math.round(d.bateria)}% (mín. ${lim.bateriaMin}%)`,
    });
  if (d.temperatura > lim.tempMax)
    out.push({
      id: "temp_alta",
      severidade: "critico",
      titulo: "Temperatura crítica",
      mensagem: `${Math.round(d.temperatura)}°C acima do limite de ${lim.tempMax}°C`,
    });
  if (d.temperatura < lim.tempMin)
    out.push({
      id: "temp_baixa",
      severidade: "alerta",
      titulo: "Temperatura baixa",
      mensagem: `${Math.round(d.temperatura)}°C abaixo de ${lim.tempMin}°C`,
    });
  if (d.sinal < lim.sinalMin)
    out.push({
      id: "sinal_fraco",
      severidade: "alerta",
      titulo: "Sinal fraco",
      mensagem: `Sinal em ${Math.round(d.sinal)}% (mín. ${lim.sinalMin}%)`,
    });
  if (d.radiacao > lim.radiacaoMax)
    out.push({
      id: "radiacao_alta",
      severidade: "critico",
      titulo: "Radiação elevada",
      mensagem: `Índice ${Math.round(d.radiacao)} acima de ${lim.radiacaoMax}`,
    });
  return out;
}
