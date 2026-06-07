import { createContext, useContext, useEffect, useReducer } from "react";
import { leituraInicial, proximaLeitura } from "../lib/simulador";
import { avaliarAlertas } from "../lib/alertas";
import { carregar, salvar } from "../lib/storage";
import { LIMIARES_PADRAO } from "../constants/limiaresPadrao";

const MissaoContext = createContext(null);

const MISSAO_INICIAL = {
  nome: "Aurora-1",
  tripulacao: 3,
  diaMissao: 1,
  status: "Em órbita",
};
const MAX_SERIE = 20;

const estadoInicial = {
  carregado: false,
  missao: MISSAO_INICIAL,
  dados: leituraInicial(),
  serie: [],
  limiares: LIMIARES_PADRAO,
  alertas: [],
  historico: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "HIDRATAR":
      return { ...state, ...action.payload, carregado: true };
    case "TICK": {
      const dados = proximaLeitura(state.dados);
      const serie = [...state.serie, { t: Date.now(), ...dados }].slice(
        -MAX_SERIE,
      );
      const alertas = avaliarAlertas(dados, state.limiares);
      const idsAntes = new Set(state.alertas.map((a) => a.id));
      const novos = alertas
        .filter((a) => !idsAntes.has(a.id))
        .map((a) => ({ ...a, em: Date.now() }));
      const historico = novos.length
        ? [...novos, ...state.historico].slice(0, 50)
        : state.historico;
      return { ...state, dados, serie, alertas, historico };
    }
    case "DEF_LIMIARES":
      return { ...state, limiares: action.payload };
    default:
      return state;
  }
}

export function MissaoProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, estadoInicial);

  useEffect(() => {
    (async () => {
      const limiares = await carregar("limiares", LIMIARES_PADRAO);
      const historico = await carregar("historico", []);
      dispatch({ type: "HIDRATAR", payload: { limiares, historico } });
    })();
  }, []);

  useEffect(() => {
    const id = setInterval(() => dispatch({ type: "TICK" }), 2000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (state.carregado) salvar("historico", state.historico);
  }, [state.historico, state.carregado]);

  const setLimiares = async (novos) => {
    dispatch({ type: "DEF_LIMIARES", payload: novos });
    await salvar("limiares", novos);
  };

  return (
    <MissaoContext.Provider value={{ ...state, setLimiares }}>
      {children}
    </MissaoContext.Provider>
  );
}

export function useMissao() {
  const ctx = useContext(MissaoContext);
  if (!ctx)
    throw new Error("useMissao deve ser usado dentro de <MissaoProvider>");
  return ctx;
}
