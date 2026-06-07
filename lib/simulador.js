function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}
function passo(v, delta, min, max) {
  return clamp(v + (Math.random() * 2 - 1) * delta, min, max);
}

export function leituraInicial() {
  return {
    temperatura: 22, // °C
    pressao: 101, // kPa
    radiacao: 30, // índice
    bateria: 95, // %
    geracaoSolar: 70, // %
    consumo: 55, // %
    sinal: 80, // %
    latencia: 600, // ms
    enlace: 100, // % estabilidade
  };
}

export function proximaLeitura(a) {
  return {
    temperatura: passo(a.temperatura, 3, -40, 90),
    pressao: passo(a.pressao, 1.5, 90, 110),
    radiacao: passo(a.radiacao, 6, 0, 100),
    bateria: passo(a.bateria, 2, 0, 100),
    geracaoSolar: passo(a.geracaoSolar, 5, 0, 100),
    consumo: passo(a.consumo, 4, 0, 100),
    sinal: passo(a.sinal, 6, 0, 100),
    latencia: passo(a.latencia, 80, 200, 2000),
    enlace: passo(a.enlace, 4, 0, 100),
  };
}
